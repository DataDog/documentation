import { z } from 'zod';
import { SNAKE_CASE_REGEX, OPTION_GROUP_ID_REGEX } from './regexes';

/**
 * The configuration of an individual page filter,
 * as defined in the front matter of a document.
 */
const ConditionalDisplaySchema = z
  .array(
    z
      .record(z.string(), z.array(z.string().regex(SNAKE_CASE_REGEX)))
      .refine((obj) => Object.keys(obj).length > 0, {
        message: 'Condition object must have at least one trait reference',
      }),
  )
  .min(1, 'Conditions array must have at least one condition')
  .optional();

export const RawFilterConfigSchema = z.strictObject({
  label: z.string().optional(), // The trait label will be used instead if missing
  trait_id: z.string().regex(SNAKE_CASE_REGEX),
  option_group_id: z.string().regex(OPTION_GROUP_ID_REGEX),
  default_value: z.string().regex(SNAKE_CASE_REGEX).optional(),
  show_if: ConditionalDisplaySchema,
  hide_if: ConditionalDisplaySchema,
});

/**
 * The configuration of an individual page filter,
 * as defined in the front matter of a document.
 */
export type RawFilterConfig = z.infer<typeof RawFilterConfigSchema>;

/**
 * The list of page filters, as defined in the front matter
 * of a document.
 */
export const RawFiltersConfigSchema = z.array(RawFilterConfigSchema);

/**
 * The list of page filters, as defined in the front matter
 * of a document.
 */
export type RawFiltersConfig = z.infer<typeof RawFiltersConfigSchema>;

/**
 * The configuration of an individual page filter,
 * as defined in the front matter of a document
 * and filled in with any defaults.
 */
export const FilterConfigSchema = z.strictObject({
  label: z.string(),
  trait_id: z.string().regex(SNAKE_CASE_REGEX),
  option_group_id: z.string().regex(OPTION_GROUP_ID_REGEX),
  default_value: z.string().regex(SNAKE_CASE_REGEX).optional(),
  show_if: ConditionalDisplaySchema,
  hide_if: ConditionalDisplaySchema,
});

/**
 * The configuration of an individual page filter,
 * as defined in the front matter of a document
 * and filled in with any defaults.
 *
 * @example
 * {
 *   label: "Database",
 *   trait_id: "database",
 *   option_group_id: "dbm_database_options",
 *   default_value: "postgres" // optional override
 * }
 */
export type FilterConfig = z.infer<typeof FilterConfigSchema>;

/**
 * The list of page filters, as defined in the front matter
 * of a document, populated with any default values
 * and validated as a whole.
 */
export const FiltersConfigSchema = z
  .array(FilterConfigSchema)
  .refine(
    (filtersConfig) => {
      // show_if and hide_if are mutually exclusive
      for (const filterConfig of filtersConfig) {
        if (filterConfig.show_if && filterConfig.hide_if) {
          console.error(
            `Filter '${filterConfig.trait_id}' has both show_if and hide_if; only one is allowed`,
          );
          return false;
        }
      }
      return true;
    },
    {
      error:
        'A filter cannot have both show_if and hide_if; they are mutually exclusive',
    },
  )
  .refine(
    (filtersConfig) => {
      // Filter labels must be unique within a page
      const filterLabels = filtersConfig.map((filterConfig) => filterConfig.label);
      const uniqueFilterLabels = new Set(filterLabels);
      if (filterLabels.length !== uniqueFilterLabels.size) {
        console.error('Duplicate filter labels found in list:', filterLabels);
        return false;
      }
      return true;
    },
    {
      error:
        'Duplicate filter labels found in filters configuration; each filter label must be unique',
    },
  )
  .refine(
    (filtersConfig) => {
      // Placeholders must refer to a valid trait name
      // that referenced earlier in the list
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
    },
    {
      error: 'Invalid placeholder references found in filters configuration',
    },
  );

/**
 * The list of page filters, as defined in the front matter
 * of a document, populated with any default values
 * and validated as a whole.
 */
export type FiltersConfig = z.infer<typeof FiltersConfigSchema>;

/**
 * The front matter of a document required by the integration
 * (additional keys are allowed in the front matter YAML,
 * but are ignored by the integration).
 */
export const FrontmatterSchema = z.object({
  title: z.string(),
  content_filters: RawFiltersConfigSchema.optional(),
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
 *       trait_id: "color",
 *       option_group_id: "color_options"
 *     },
 *     {
 *       label: "Finish",
 *       trait_id: "finish",
 *       option_group_id: "paint_finish_options"
 *     },
 *     {
 *       label: "Paint color",
 *       trait_id: "paint_color",
 *       option_group_id: "<FINISH>_<COLOR>_paint_options"
 *     }
 *   ]
 * }
 */
export type Frontmatter = z.infer<typeof FrontmatterSchema>;
