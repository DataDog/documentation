import { z } from 'zod';
import { GlossarySchema } from './yaml/glossary';
import { CompilationErrorSchema } from './compilationResults';

export const AuthorConsoleDataSchema = z.object({
  glossary: GlossarySchema,
  buildStatus: z.object({
    timestamp: z.number(),
    hasErrors: z.boolean(),
    errorsByFilePath: z.record(z.array(CompilationErrorSchema))
  })
});

/**
 * The data required to render the author console
 * at localhost:1313/markdoc/console.
 */
export type AuthorConsoleData = z.infer<typeof AuthorConsoleDataSchema>;
