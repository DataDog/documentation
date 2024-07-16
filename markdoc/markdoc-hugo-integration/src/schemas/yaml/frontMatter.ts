import { z } from 'zod';
import { SNAKE_CASE_REGEX, PREF_OPTIONS_ID_REGEX } from './../regexes';

/**
 * The configuration of an individual page preference,
 * as defined in the front matter of a document.
 *
 * @example
 * display_name: Color
 * identifier: color
 * options_source: primary_color_options
 * default_value: blue  # optional override
 */
export const PagePrefConfigSchema = z
  .object({
    display_name: z.string(),
    identifier: z.string().regex(SNAKE_CASE_REGEX),
    options_source: z.string().regex(PREF_OPTIONS_ID_REGEX),
    default_value: z.string().regex(SNAKE_CASE_REGEX).optional()
  })
  .strict();

/**
 * The configuration of an individual page preference,
 * as defined in the front matter of a document.
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
 * The front matter of a document required for Markdoc
 * (other keys are allowed but ignored by Markdoc).
 */
export type Frontmatter = z.infer<typeof FrontmatterSchema>;
