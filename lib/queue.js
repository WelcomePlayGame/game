// lib/queue.js
import { getVideos as get } from './action';

let queue = [];
let isProcessing = false;

const addToQueue = (videoUrl, fbStreamKey) => {
  queue.push({ videoUrl, fbStreamKey });
  processQueue();
};

const processQueue = async () => {
  if (isProcessing || queue.length === 0) return;

  isProcessing = true;
  const { videoUrl, fbStreamKey } = queue.shift();
  a;

  try {
    await streamVideoToFacebook(videoUrl, fbStreamKey);
  } catch (error) {
    console.error('Failed to stream video:', error);
  } finally {
    isProcessing = false;
    processQueue();
  }
};

const streamVideoToFacebook = async (url, fbStreamKey) => {
  try {
    // Простой подход к симуляции процесса стриминга
    const liveStreamUrl = `rtmp://live-api-s.facebook.com:80/rtmp/${fbStreamKey}`;

    console.log(`Streaming video from ${url} to ${liveStreamUrl}`);

    // В реальности, здесь должен быть поток данных
    await new Promise((resolve) => setTimeout(resolve, 5000));
  } catch (error) {
    throw new Error(`Failed to stream video: ${error.message}`);
  }
};

const addVideosToQueue = async (fbStreamKey) => {
  const videos = await get();

  videos.forEach((video) => {
    addToQueue(video.url, fbStreamKey);
  });
};

export { addToQueue, addVideosToQueue };
