import { NextResponse } from 'next/server';
import { Certification } from '@/lib/db/models';
import { getData, createData } from '@/lib/crud';
import { z } from 'zod';
import { certSchema } from '@/schema';

export async function GET() {
  try {
    const certs = await getData(Certification, null, null, { title: 1 });
    return NextResponse.json(certs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const response = await createData(Certification, body, 'title', certSchema);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
