import { z } from 'zod';

const techStackSchema = z.array(z.string()).nullish();

const projectSchema = z.object({
  companyId: z.string(),
  name: z.string(),
  description: z.string(),
  techStack: techStackSchema,
});

const roleSchema = z.object({
  title: z.string(),
  date: z.string(),
  companyId: z.string(),
  isPromotion: z.boolean(),
});

const workSchema = z.object({
  company: z.string(),
  startDate: z.number(),
  endDate: z.number().nullish(),
});

export { workSchema, projectSchema, roleSchema };
