import { NextResponse } from 'next/server';
import { Project, Company } from '@/lib/db/models';
import { getData, createData } from '@/lib/crud';
import { z } from 'zod';
import { projectSchema } from '@/schema';

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const projects = await getData(Project, null, { companyId: id });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching projects' },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const projectData = {
      ...body,
      companyId: id,
    };

    const response = await createData(
      Project,
      projectData,
      null,
      projectSchema
    );
    await Company.findByIdAndUpdate(id, {
      $push: { projects: response.id },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
