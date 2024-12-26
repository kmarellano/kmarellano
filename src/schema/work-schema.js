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

const baseWorkSchema = z.object({
  company: z.string(),
  startDate: z.string().date(),
  endDate: z
    .union([
      z.string().refine((val) => val === '', 'Invalid date'),
      z.string().date(),
    ])
    .nullable()
    .optional(),
});

const workSchema = baseWorkSchema.refine(
  (data) => {
    if (!data.endDate) {
      return true;
    }
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    return start < end;
  },
  {
    message: 'startDate must be earlier than endDate',
    path: ['startDate'],
  }
);

export {
  workSchema,
  baseWorkSchema as updateWorkSchema,
  projectSchema,
  roleSchema,
};
