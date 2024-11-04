import { z } from 'zod';

/**
 * Any Hugo config that applies to the entire site,
 * such as the list of supported languages.
 */
export const HugoGlobalConfigSchema = z
  .object({
    siteParams: z.object({
      img_url: z.string().url(),
      branch: z.string().optional() // required if env is "preview"
    }),
    siteConfig: z.object({ baseURL: z.string().url() }),
    env: z.union([z.literal('development'), z.literal('preview'), z.literal('live')]),
    languages: z.array(z.string()),
    dirs: z
      .object({
        content: z.string().min(1),
        partials: z.string().min(1),
        prefsConfig: z.string().min(1),
        images: z.string().min(1)
      })
      .strict()
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
 * Any Hugo config that applies to the entire site,
 * such as the list of supported languages.
 */
export type HugoGlobalConfig = z.infer<typeof HugoGlobalConfigSchema>;

/**
 * Any Hugo-specific config data needed for transforming and rendering
 * a Hugo .mdoc file with Markdoc.
 *
 * For example, there's no concept of "supported languages" or
 * "current language" in the Markdoc config, but the compilation process
 * needs to know the language of the file being compiled
 * in order to build URLs correctly.
 */
export const HugoConfigSchema = z
  .object({
    global: HugoGlobalConfigSchema
    // page config will go here
  })
  .strict();

/**
 * Any Hugo-specific config data needed for transforming and rendering
 * a Hugo .mdoc file with Markdoc.
 *
 * For example, there's no concept of "supported languages" or
 * "current language" in the Markdoc config, but the compilation process
 * needs to know the language of the file being compiled
 * in order to build URLs correctly.
 */
export type HugoConfig = z.infer<typeof HugoConfigSchema>;
