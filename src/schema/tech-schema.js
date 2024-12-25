import { z } from 'zod';

const techSchema = z.object({
  name: z.string(),
  field: z.enum([
    'Frontend',
    'Backend',
    'DevOps',
    'Testing & Quality Assurance',
    'Monitoring & Logging',
  ]),
});

export { techSchema };
