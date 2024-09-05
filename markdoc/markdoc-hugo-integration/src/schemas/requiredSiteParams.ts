import { z } from 'zod';

/**
 * The site params that must be present in the Markdoc-Hugo integration
 * initialization config for content to render correctly.
 */
export const RequiredSiteParamsSchema = z.object({
  img_url: z.string().url()
});

/**
 * The site params that must be present in the Markdoc-Hugo integration
 * initialization config for content to render correctly.
 */
export type RequiredSiteParams = z.infer<typeof RequiredSiteParamsSchema>;
