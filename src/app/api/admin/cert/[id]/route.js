import { NextResponse } from 'next/server';
import { Certification } from '@/lib/db/models';
import { getOneData, updateData, deleteData } from '@/lib/crud';
import { z } from 'zod';
import { certSchema } from '@/schema';

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const isExisting = await getOneData(Certification, id);
    if (!isExisting) {
      return NextResponse.json(
        { error: 'Certification not found' },
        { status: 404 }
      );
    }

    const tech = await updateData(Certification, id, body, certSchema);
    if (!tech) {
      return NextResponse.json(
        { error: 'Certification not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Certification updated successfully', tech },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const response = await deleteData(Certification, id);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
