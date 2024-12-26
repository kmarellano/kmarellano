import { z } from 'zod';
import { workSchema } from '@/schema';
import { NextResponse } from 'next/server';
import { Company } from '@/lib/db/models';
import { getData, createData } from '@/lib/crud';

export async function GET() {
  try {
    const companies = await getData(Company, 'projects roles');
    return NextResponse.json(companies, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const { company, startDate, endDate } = body;
    const companyData = {
      company,
      startDate,
      endDate,
    };

    const response = await createData(
      Company,
      companyData,
      'company',
      workSchema
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
