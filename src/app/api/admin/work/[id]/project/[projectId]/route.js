import { NextResponse } from 'next/server';
import { Company, Project } from '@/lib/db/models';
import { updateData, deleteData } from '@/lib/crud';
import { z } from 'zod';
import { projectSchema } from '@/schema';

export async function PUT(req, { params }) {
  try {
    const { id, projectId } = await params;
    const body = await req.json();

    const projectData = {
      ...body,
      companyId: id,
    };

    const response = await updateData(
      Project,
      projectId,
      projectData,
      projectSchema
    );

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
    const { id, projectId } = await params;

    const response = await deleteData(Project, projectId);
    await Company.findByIdAndUpdate(id, {
      $pull: { projects: projectId },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
