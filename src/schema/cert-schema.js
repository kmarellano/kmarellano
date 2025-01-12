import { z } from 'zod';

const certSchema = z.object({
  title: z.string(),
  issuer: z.string(),
  image: z.string().optional(),
  link: z.string().optional(),
  date: z.string().date(),
});

export { certSchema };
