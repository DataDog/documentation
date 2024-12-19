import { z } from 'zod';
import { HugoEnvSchema } from './hugo';

/**
 * The configuration object that is passed to the integration
 * when it is instantiated by the site build process.
 * The integration unpacks it into a HugoGlobalConfig object.
 */
export const IntegrationConfigSchema = z.object({
  baseSiteDir: z.string().min(1),
  env: HugoEnvSchema
});

/**
 * The configuration object that is passed to the integration
 * when it is instantiated by the site build process.
 * The integration unpacks it into a HugoGlobalConfig object.
 */
export type IntegrationConfig = z.infer<typeof IntegrationConfigSchema>;
