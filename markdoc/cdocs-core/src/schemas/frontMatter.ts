import { z } from 'zod';
import { SNAKE_CASE_REGEX, FILTER_OPTIONS_ID_REGEX } from './regexes';

/**
 * The configuration of an individual page filter,
 * as defined in the front matter of a document.
 */
export const PageFilterConfigSchema = z
  .object({
    display_name: z.string(),
    id: z.string().regex(SNAKE_CASE_REGEX),
    options_source: z.string().regex(FILTER_OPTIONS_ID_REGEX),
    default_value: z.string().regex(SNAKE_CASE_REGEX).optional(),
  })
  .strict();

/**
 * The configuration of an individual page filter,
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
export type PageFilterConfig = z.infer<typeof PageFilterConfigSchema>;

/**
 * The list of page filters, as defined in the front matter
 * of a document, validated as a whole.
 */
export const PageFiltersConfigSchema = z
  .array(PageFilterConfigSchema)
  .refine((filtersConfig) => {
    // Page filter names must be unique within a page
    const filterNames = filtersConfig.map(
      (filterConfig) => filterConfig.display_name,
    );
    const uniqueFilterNames = new Set(filterNames);
    if (filterNames.length !== uniqueFilterNames.size) {
      console.error(
        'Duplicate page filter display names found in list:',
        filterNames,
      );
      return false;
    }

    // Placeholders must refer to a valid filter name
    // that is defined earlier in the list than the placeholder
    const definedParamNames = new Set();
    for (const filterConfig of filtersConfig) {
      definedParamNames.add(filterConfig.display_name);
      const bracketedPlaceholders =
        filterConfig.display_name.match(/<([a-z0-9_]+)>/g);
      if (bracketedPlaceholders) {
        for (const placeholder of bracketedPlaceholders) {
          const paramName = placeholder.slice(1, -1);
          if (!definedParamNames.has(paramName)) {
            console.error(
              `Invalid placeholder reference found: ${placeholder}`,
            );
            return false;
          }
        }
      }
    }

    return true;
  });

/**
 * The list of page filters, as defined in the front matter
 * of a document.
 */
export type PageFiltersConfig = z.infer<typeof PageFiltersConfigSchema>;

/**
 * The list of further reading links, as parsed directly from
 * the front matter YAML of a given file.
 */
export const FurtherReadingConfigSchema = z
  .array(
    z
      .object({
        link: z.string(),
        text: z.string(),
        tag: z.string().optional(),
      })
      .strict(),
  )
  .min(1);

/**
 * The list of further reading links, as parsed directly from
 * the front matter YAML of a given file.
 *
 * @example
 * [
 *   {
 *     link: "https://exampleblogpost.com",
 *     text: "Example blog post",
 *     tag: "blog"
 *   },
 *   {
 *     link: "https://random.com",
 *     text: "Some random link with no applicable tag"
 *   }
 * ]
 */
export type FurtherReadingConfig = z.infer<typeof FurtherReadingConfigSchema>;

/**
 * The front matter of a document required by the integration
 * (additional keys are allowed in the front matter YAML,
 * but are ignored by the integration).
 */
export const FrontmatterSchema = z.object({
  title: z.string(),
  content_filters: PageFiltersConfigSchema.optional(),
  further_reading: FurtherReadingConfigSchema.optional(),
});

/**
 * The front matter of a document required by the integration
 * (additional keys are allowed in the front matter YAML,
 * but are ignored by the integration).
 *
 * @example
 * {
 *   title: "Decorative Painting Tips",
 *   content_filters: [
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
