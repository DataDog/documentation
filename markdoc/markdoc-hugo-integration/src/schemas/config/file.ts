import { z } from 'zod';

export const FileConfigSchema = z
  .object({
    language: z.string(), // "en" etc.
    path: z.string()
  })
  .strict();

export type FileConfig = z.infer<typeof FileConfigSchema>;
