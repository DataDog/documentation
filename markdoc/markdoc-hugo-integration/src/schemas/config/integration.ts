import { z } from 'zod';
import { HugoConfigSchema } from './hugo';

/**
 * The schema for the config object passed to the MarkdocHugoIntegration class
 * from outside the module.
 */
export const IntegrationConfigSchema = z.object({
  hugoConfig: HugoConfigSchema
});

/**
 * The type of the config object passed to the MarkdocHugoIntegration class
 * from outside the module.
 */
export type IntegrationConfig = z.infer<typeof IntegrationConfigSchema>;
