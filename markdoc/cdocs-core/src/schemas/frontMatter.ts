import { z } from 'zod';
import { SNAKE_CASE_REGEX, FILTER_OPTIONS_ID_REGEX } from './regexes';

/**
 * The configuration of an individual page filter,
 * as defined in the front matter of a document.
 */
export const PageFilterConfigSchema = z
  .object({
    label: z.string(),
    id: z.string().regex(SNAKE_CASE_REGEX),
    option_group: z.string().regex(FILTER_OPTIONS_ID_REGEX),
    default_value: z.string().regex(SNAKE_CASE_REGEX).optional(),
  })
  .strict();

/**
 * The configuration of an individual page filter,
 * as defined in the front matter of a document.
 *
 * @example
 * {
 *   label: "Database",
 *   id: "database",
 *   option_group: "dbm_database_options",
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
    const filterNames = filtersConfig.map((filterConfig) => filterConfig.label);
    const uniqueFilterNames = new Set(filterNames);
    if (filterNames.length !== uniqueFilterNames.size) {
      console.error('Duplicate page filter display names found in list:', filterNames);
      return false;
    }

    // Placeholders must refer to a valid filter name
    // that is defined earlier in the list than the placeholder
    const definedParamNames = new Set();
    for (const filterConfig of filtersConfig) {
      definedParamNames.add(filterConfig.label);
      const bracketedPlaceholders = filterConfig.label.match(/<([a-z0-9_]+)>/g);
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
 * The list of page filters, as defined in the front matter
 * of a document.
 */
export type PageFiltersConfig = z.infer<typeof PageFiltersConfigSchema>;

/**
 * The front matter of a document required by the integration
 * (additional keys are allowed in the front matter YAML,
 * but are ignored by the integration).
 */
export const FrontmatterSchema = z.object({
  title: z.string(),
  content_filters: PageFiltersConfigSchema.optional(),
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
 *       label: "Color",
 *       id: "color",
 *       option_group: "color_options"
 *     },
 *     {
 *       label: "Finish",
 *       id: "finish",
 *       option_group: "paint_finish_options"
 *     },
 *     {
 *       label: "Paint color",
 *       id: "paint_color",
 *       option_group: "<FINISH>_<COLOR>_paint_options"
 *     }
 *   ]
 * }
 */
export type Frontmatter = z.infer<typeof FrontmatterSchema>;
