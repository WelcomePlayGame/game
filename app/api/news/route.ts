import { findAllArticle as get } from '@/lib/action';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = 10;

  const news = await get(page, limit);
  return NextResponse.json(news);
};
