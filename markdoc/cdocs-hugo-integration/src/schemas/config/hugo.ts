import { z } from 'zod';

/**
 * A mapping of commonly accessed Hugo subdirectories
 * to their types, enabling quick access by functions
 * requiring file access.
 */
export const HugoSubdirsByTypeSchema = z
  .object({
    content: z.string().min(1),
    partials: z.string().min(1),
    customizationConfig: z.string().min(1),
    images: z.string().min(1),
    static: z.string().min(1)
  })
  .strict();

/**
 * A mapping of commonly accessed Hugo subdirectories
 * to their types, enabling quick access by functions
 * requiring file access.
 */
export type HugoSubdirsByType = z.infer<typeof HugoSubdirsByTypeSchema>;

export const HugoSiteParamsSchema = z.object({
  img_url: z.string().url(),
  branch: z.string().optional() // required if env is "preview"
});

export type HugoSiteParams = z.infer<typeof HugoSiteParamsSchema>;

export const HugoSiteConfigSchema = z.object({
  baseURL: z.string().url()
});

export type HugoSiteConfig = z.infer<typeof HugoSiteConfigSchema>;

export const HugoEnvSchema = z.union([
  z.literal('development'),
  z.literal('preview'),
  z.literal('live')
]);

export type HugoEnv = z.infer<typeof HugoEnvSchema>;

export const HugoLanguagesConfigSchema = z.array(z.string());

export type HugoLanguagesConfig = z.infer<typeof HugoLanguagesConfigSchema>;

export const i18nConfigSchema = z.record(
  z.record(
    z.object({
      other: z.string()
    })
  )
);

export type i18nConfig = z.infer<typeof i18nConfigSchema>;

/**
 * Any Hugo config that applies to the entire site,
 * such as the list of supported languages and the base URL.
 *
 * This typically represents the information in
 * Hugo's `config` directory, but can also include
 * other site-wide configuration data, such as the
 * i18n translation data.
 */
export const HugoGlobalConfigSchema = z
  .object({
    siteParams: HugoSiteParamsSchema,
    siteConfig: HugoSiteConfigSchema,
    env: HugoEnvSchema,
    languages: HugoLanguagesConfigSchema,
    siteDir: z.string().min(1),
    i18n: i18nConfigSchema,
    dirs: HugoSubdirsByTypeSchema
  })
  .refine((config) => {
    // If we're in preview mode, we need to know the branch name
    // to build the correct URLs
    if (config.env === 'preview' && !config.siteParams.branch) {
      console.error(
        'hugoVars.siteParams.branch is required when hugoVars.env is "preview"'
      );
      return false;
    }
    // English is the failover language for i18n data,
    // so the English i18n data must be present
    if (!config.i18n.en) {
      console.error(
        'No i18n data ingested for English, does <SITE_DIR>/i18n/en.json exist?'
      );
      return false;
    }
    return true;
  });

/**
 * Any Hugo config that applies to the entire site,
 * such as the list of supported languages and the base URL.
 *
 * This typically represents the information in
 * Hugo's `config` directory, but can also include
 * other site-wide configuration data, such as the
 * i18n translation data.
 */
export type HugoGlobalConfig = {
  siteParams: HugoSiteParams;
  siteConfig: HugoSiteConfig;
  env: HugoEnv;
  languages: HugoLanguagesConfig;
  siteDir: string;
  i18n: i18nConfig;
  dirs: HugoSubdirsByType;
};

/**
 * Any Hugo config that applies to a single page,
 * such as the language currently being processed.
 */
export const PageConfigSchema = z
  .object({
    lang: z.string(), // "en" etc.
    path: z.string()
  })
  .strict();

/**
 * Any Hugo config that applies to a single page,
 * such as the language currently being processed.
 */
export type PageConfig = z.infer<typeof PageConfigSchema>;

/**
 * Any Hugo-specific config data needed for transforming and rendering
 * a Hugo .mdoc.md file with Markdoc.
 *
 * For example, there's no concept of "supported languages" or
 * "current language" in the Markdoc config, but the compilation process
 * needs to know the language of the file being compiled
 * in order to build URLs correctly.
 */
export const HugoConfigSchema = z
  .object({
    global: HugoGlobalConfigSchema,
    page: PageConfigSchema
  })
  .strict();

/**
 * Any Hugo-specific config data needed for transforming and rendering
 * a Hugo .mdoc.md file with Markdoc.
 *
 * For example, there's no concept of "supported languages" or
 * "current language" in the Markdoc config, but the compilation process
 * needs to know the language of the file being compiled
 * in order to build URLs correctly.
 */
export type HugoConfig = z.infer<typeof HugoConfigSchema>;
