// app/api/auth/start-stream/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import ytdl from 'ytdl-core';
import fs from 'fs-extra';
import path from 'path';
import { addVideo as add, getVideos as get } from '@/lib/action';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const downloadVideo = async (url: string, filepath: string) => {
  return new Promise((resolve, reject) => {
    ytdl(url)
      .pipe(fs.createWriteStream(filepath))
      .on('finish', resolve)
      .on('error', reject);
  });
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const data = await req.json();
    let { title, url } = data as { title: string; url: string };

    // Удаление пробелов из начала и конца строки
    title = title.trim();

    // Проверка, можем ли мы получить ID видео из URL
    if (!ytdl.validateURL(url)) {
      throw new Error(`Invalid YouTube URL: ${url}`);
    }

    // Временный путь для скачивания видео
    const tmpDir = path.resolve('public/tmp');
    await fs.ensureDir(tmpDir);
    const filepath = path.join(tmpDir, `${title}.mp4`);

    console.log('Downloading video:', url);

    // Скачивание видео на сервер
    await downloadVideo(url, filepath);

    console.log('Video downloaded:', filepath);

    // Загрузка видео на Cloudinary
    const result = await cloudinary.uploader.upload(filepath, {
      resource_type: 'video',
      public_id: title,
    });

    console.log('Video uploaded to Cloudinary:', result.secure_url);

    // Сохранение информации о видео в базе данных
    await add(title, result.secure_url);

    console.log('Video added to database:', title);

    // Удаление временного файла
    await fs.unlink(filepath);

    return NextResponse.json(
      { message: 'Video added and uploaded successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error adding video:', error);
    return NextResponse.json(
      { message: 'Failed to add video', error: error.message },
      { status: 500 }
    );
  }
};

export const GET = async (): Promise<NextResponse> => {
  try {
    const videos = await get();
    return NextResponse.json(videos, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to get videos', error: error.message },
      { status: 500 }
    );
  }
};
