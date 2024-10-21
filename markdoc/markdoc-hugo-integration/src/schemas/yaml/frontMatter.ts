import { z } from 'zod';
import { SNAKE_CASE_REGEX, PREF_OPTIONS_ID_REGEX } from './../regexes';
import { PrefOptionSchema } from './prefOptions';

/**
 * The configuration of an individual page preference,
 * as defined in the front matter of a document.
 */
export const PagePrefConfigSchema = z
  .object({
    display_name: z.string(),
    id: z.string().regex(SNAKE_CASE_REGEX),
    options_source: z.string().regex(PREF_OPTIONS_ID_REGEX),
    default_value: z.string().regex(SNAKE_CASE_REGEX).optional()
  })
  .strict();

export const MinifiedPagePrefConfigSchema = z
  .object({
    n: z.string(), // display name
    i: z.string().regex(SNAKE_CASE_REGEX), // id
    o: z.string().regex(PREF_OPTIONS_ID_REGEX), // options source
    d: z.string().regex(SNAKE_CASE_REGEX).optional() // default value
  })
  .strict();

// Defining this type without Zod
// to keep Zod out of the browser bundle
export interface MinifiedPagePrefConfig {
  n: string; // display name
  i: string; // ID
  o: string; // options source
  d?: string; // default value
}

export const MinifiedPagePrefsConfigSchema = z.array(MinifiedPagePrefConfigSchema);

// Defining this type without Zod
// to keep Zod out of the browser bundle
export type MinifiedPagePrefsConfig = Array<MinifiedPagePrefConfig>;

/**
 * The configuration of an individual page preference,
 * as defined in the front matter of a document.
 *
 * @example
 * {
 *   display_name: "Database",
 *   id: "database",
 *   options_source: "dbm_database_options",
 *   default_value: "postgres" // optional override
 * }
 */
export type PagePrefConfig = z.infer<typeof PagePrefConfigSchema>;

/**
 * The list of page preferences, as defined in the front matter
 * of a document, validated as a whole.
 */
export const PagePrefsConfigSchema = z
  .array(PagePrefConfigSchema)
  .refine((prefsConfig) => {
    // Page preference names must be unique within a page
    const prefNames = prefsConfig.map((prefConfig) => prefConfig.display_name);
    const uniquePrefNames = new Set(prefNames);
    if (prefNames.length !== uniquePrefNames.size) {
      console.error('Duplicate page preference names found in list:', prefNames);
      return false;
    }

    // Placeholders must refer to a valid preference name
    // that is defined earlier in the list than the placeholder
    const definedParamNames = new Set();
    for (const prefConfig of prefsConfig) {
      definedParamNames.add(prefConfig.display_name);
      const bracketedPlaceholders = prefConfig.display_name.match(/<([a-z0-9_]+)>/g);
      if (bracketedPlaceholders) {
        for (const placeholder of bracketedPlaceholders) {
          const paramName = placeholder.slice(1, -1);
          if (!definedParamNames.has(paramName)) {
            console.error(`Invalid placeholder reference found: ${placeholder}`);
            return false;
          }
        }
      }
    }

    return true;
  });

/**
 * The list of page preferences, as defined in the front matter
 * of a document.
 */
export type PagePrefsConfig = z.infer<typeof PagePrefsConfigSchema>;

export const FrontmatterSchema = z.object({
  title: z.string(),
  page_preferences: PagePrefsConfigSchema.optional()
});

/**
 * The front matter of a document required by the integration
 * (additional keys are allowed in the front matter YAML,
 * but are ignored by the integration).
 *
 * @example
 * {
 *   title: "Decorative Painting Tips",
 *   page_preferences: [
 *     {
 *       display_name: "Color",
 *       id: "color",
 *       options_source: "color_options"
 *     },
 *     {
 *       display_name: "Finish",
 *       id: "finish",
 *       options_source: "paint_finish_options"
 *     },
 *     {
 *       display_name: "Paint color",
 *       id: "paint_color",
 *       options_source: "<FINISH>_<COLOR>_paint_options"
 *     }
 *   ]
 * }
 */
export type Frontmatter = z.infer<typeof FrontmatterSchema>;

/**
 * A object containing all of the potential pref IDs
 * and option sets for a page, created by populating the front matter
 * placeholders with all possible values, then combining the front matter
 * and the prefs configuration files into one object.
 *
 * Useful for efficiently validating, resolving,
 * and re-resolving preferences.
 */
export const PagePrefManifestSchema = z
  .object({
    referencedPrefIds: z.array(z.string().regex(SNAKE_CASE_REGEX)),
    referencedOptionSetsByPrefId: z.record(
      z.string().regex(SNAKE_CASE_REGEX),
      z.array(z.string().regex(SNAKE_CASE_REGEX))
    ),
    defaultValuesByOptionsSetId: z.record(
      z.string().regex(SNAKE_CASE_REGEX),
      z.string().regex(SNAKE_CASE_REGEX)
    ),
    optionsByOptionsSetId: z.record(
      z.string().regex(SNAKE_CASE_REGEX),
      z.array(PrefOptionSchema)
    )
  })
  .strict();

export type PagePrefManifest = z.infer<typeof PagePrefManifestSchema>;
