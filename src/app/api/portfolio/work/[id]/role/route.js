import { NextResponse } from 'next/server';
import { Role, Company } from '@/lib/db/models';
import { createData, getData } from '@/lib/crud';
import { z } from 'zod';
import { roleSchema } from '@/schema';

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const roles = await getData(Role, null, { companyId: id });

    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching roles' },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const roleData = {
      ...body,
      companyId: id,
    };

    const response = await createData(Role, roleData, null, roleSchema);
    await Company.findByIdAndUpdate(id, {
      $push: { roles: response.id },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
