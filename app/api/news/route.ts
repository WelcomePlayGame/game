import type { NextApiRequest, NextApiResponse } from 'next';
import { findAllArticle as get } from '@/lib/action';
export const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    get(1, 10);
  }
};