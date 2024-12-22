import { NextResponse } from 'next/server';
const { json } = NextResponse;

export async function GET() {
  return json({
    hello: 'world',
  });
}

export async function POST() {
  return json({
    post: 'POST',
  });
}
