import { NextResponse } from 'next/server';
import { Tech } from '@/lib/db/models';
import { getData, createData } from '@/lib/crud';
import { z } from 'zod';
import { techSchema } from '@/schema';

export async function GET() {
  try {
    const techs = await getData(Tech, null, null, { name: 1 });
    return NextResponse.json(techs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const response = await createData(Tech, body, 'name', techSchema);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
