import { z } from 'zod';
import { FileConfigSchema } from './file';
import { HugoConfigSchema } from './hugo';

export const CompilationConfigSchema = z.object({
  fileConfig: FileConfigSchema,
  hugoConfig: HugoConfigSchema
});

export type CompilationConfig = z.infer<typeof CompilationConfigSchema>;
