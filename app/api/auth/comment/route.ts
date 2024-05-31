import { addComment, getAllComment } from '@/lib/action';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const { name, content, slug, email } = data;
  await addComment(slug, name, content, email);
  return NextResponse.json({ message: 'Comment created' }, { status: 201 });
};
export const GET = async () => {
  const comments = await getAllComment();
  return NextResponse.json(comments, { status: 200 });
};
