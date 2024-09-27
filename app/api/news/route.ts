import type { NextApiRequest, NextApiResponse } from 'next';
import { findAllArticle as get } from '@/lib/action';
import { NextResponse } from 'next/server';
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const news = await get(1, 10);
  return NextResponse.json(news);
};
