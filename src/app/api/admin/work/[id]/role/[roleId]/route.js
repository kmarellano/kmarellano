import { NextResponse } from 'next/server';
import { Role, Company } from '@/lib/db/models';
import { updateData, deleteData } from '@/lib/crud';
import { z } from 'zod';
import { roleSchema } from '@/schema';

export async function PUT(req, { params }) {
  try {
    const { id, roleId } = await params;
    const body = await req.json();

    const roleData = {
      ...body,
      companyId: id,
    };

    const response = await updateData(Role, roleId, roleData, roleSchema);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id, roleId } = await params;

    const response = await deleteData(Role, roleId);
    await Company.findByIdAndUpdate(id, {
      $pull: { roles: roleId },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
