import { NextResponse } from 'next/server';
import { getAllGames as get } from '@/lib/action';

export async function GET(req: Request) {
  const games = await get();
  return NextResponse.json(games);
}
