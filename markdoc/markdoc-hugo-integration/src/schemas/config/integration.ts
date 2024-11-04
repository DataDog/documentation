import { z } from 'zod';
import { HugoConfigSchema } from './hugo';
import { FileConfigSchema } from './file';

/**
 * Any Hugo-specific config data needed for transforming and rendering
 * a Hugo .mdoc file with Markdoc.
 *
 * For example, there's no concept of "supported languages" or
 * "current language" in the Markdoc config, but the compilation process
 * needs to know the language of the file being compiled
 * in order to build URLs correctly.
 */
export const IntegrationConfigSchema = z.object({
  hugoConfig: HugoConfigSchema
  // fileConfig: FileConfigSchema
});

/**
 * Any Hugo-specific config data needed for transforming and rendering
 * a Hugo .mdoc file with Markdoc.
 *
 * For example, there's no concept of "supported languages" or
 * "current language" in the Markdoc config, but the compilation process
 * needs to know the language of the file being compiled
 * in order to build URLs correctly.
 */
export type IntegrationConfig = z.infer<typeof IntegrationConfigSchema>;
