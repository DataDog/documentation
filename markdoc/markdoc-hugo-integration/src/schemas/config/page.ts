import { z } from 'zod';

export const PageConfigSchema = z
  .object({
    language: z.string(), // "en" etc.
    path: z.string()
  })
  .strict();

export type PageConfig = z.infer<typeof PageConfigSchema>;
