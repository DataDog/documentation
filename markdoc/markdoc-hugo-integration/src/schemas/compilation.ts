import { z } from 'zod';
import { HugoConfigSchema } from './hugoConfig';
import { ParsingErrorReport } from './errors';

/**
 * The schema for the config object passed to the MarkdocHugoIntegration class
 * from outside the module.
 */
export const CompilationConfigSchema = z.object({
  directories: z
    .object({
      content: z.string(),
      partials: z.string(),
      options: z.string()
    })
    .strict(),
  hugoConfig: HugoConfigSchema
});

/**
 * The type of the config object passed to the MarkdocHugoIntegration class
 * from outside the module.
 */
export type CompilationConfig = z.infer<typeof CompilationConfigSchema>;

export type CompilationResult = {
  hasErrors: boolean;
  parsingErrorReportsByFilePath: Record<string, ParsingErrorReport[]>;
  validationErrorsByFilePath: Record<string, string>;
  compiledFiles: string[];
};
