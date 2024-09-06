import { z } from 'zod';
import { HugoConfigSchema } from './hugoConfig';

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

/*
Example compilation result:
{
      hasErrors: this.#hasErrors(),
      parsingErrorReportsByFilePath: this.parsingErrorReportsByFilePath,
      validationErrorsByFilePath: this.validationErrorsByFilePath,
      compiledFiles: this.compiledFiles
    }
*/
export const CompilationResultSchema = z.object({
  hasErrors: z.boolean(),
  /*
  parsingErrorReportsByFilePath: z.record(
    z.array(
      z.object({
        message: z.string(),
        line: z.number()
      })
    )
  ),
  */
  // validationErrorsByFilePath: z.record(z.string()),
  compiledFiles: z.array(z.string())
});
