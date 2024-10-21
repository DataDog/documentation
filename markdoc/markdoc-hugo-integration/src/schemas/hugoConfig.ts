import { z } from 'zod';

/**
 * The Hugo data used by the Markdoc-Hugo integration,
 * such as siteParams.
 */
export const HugoConfigSchema = z
  .object({
    siteParams: z.object({
      img_url: z.string().url(),
      branch: z.string().optional() // required if env is "preview"
    }),
    env: z.union([z.literal('development'), z.literal('preview'), z.literal('live')]),
    languages: z.array(z.string())
  })
  .refine((hugoVars) => {
    if (hugoVars.env === 'preview' && !hugoVars.siteParams.branch) {
      console.error(
        'hugoVars.siteParams.branch is required when hugoVars.env is "preview"'
      );
      return false;
    }
    return true;
  });

/**
 * The Hugo variables used by the Markdoc-Hugo integration,
 * such as siteParams.
 */
export type HugoConfig = z.infer<typeof HugoConfigSchema>;
