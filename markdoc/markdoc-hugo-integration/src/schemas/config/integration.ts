import { z } from 'zod';

/**
 * The configuration object that is passed to the integration
 * when it is instantiated. The integration unpacks it
 * into a HugoGlobalConfig object.
 */
export const IntegrationConfigSchema = z.object({
  siteParams: z.object({
    img_url: z.string().url(),
    branch: z.string().optional() // required if env is "preview"
  }),
  siteConfig: z.object({ baseURL: z.string().url() }),
  env: z.union([z.literal('development'), z.literal('preview'), z.literal('live')]),
  languages: z.array(z.string()),
  siteDir: z.string().min(1),
  i18n: z.record(
    z.record(
      z.object({
        other: z.string()
      })
    )
  )
});

/**
 * The configuration object that is passed to the integration
 * when it is instantiated. The integration unpacks it
 * into a HugoGlobalConfig object.
 */
export type IntegrationConfig = z.infer<typeof IntegrationConfigSchema>;
