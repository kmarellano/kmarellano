import { NextResponse } from 'next/server';
import { Tech } from '@/lib/db/models';
import { createData, updateData, deleteData } from '@/lib/crud';
import { z } from 'zod';
import { techSchema } from '@/schema';

export async function POST(req) {
  try {
    const body = await req.json();

    const { name } = body;
    const response = await createData(Tech, body, { name }, techSchema);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();

    const { name, field } = body;
    const tech = await updateData(Tech, { name, field }, body, techSchema);

    if (!tech) {
      return NextResponse.json({ error: 'Tech not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Tech updated successfully', tech },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();

    const { name, field } = body;
    const tech = await deleteData(Tech, { name, field });

    if (!tech) {
      return NextResponse.json({ error: 'Tech not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Tech deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
