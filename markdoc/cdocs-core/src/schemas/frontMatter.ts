import { z } from 'zod';
import { SNAKE_CASE_REGEX, FILTER_OPTIONS_ID_REGEX } from './regexes';

/**
 * The configuration of an individual page customization,
 * as defined in the front matter of a document.
 */
export const CustomizationConfigSchema = z
  .object({
    label: z.string(),
    trait_id: z.string().regex(SNAKE_CASE_REGEX),
    option_group_id: z.string().regex(FILTER_OPTIONS_ID_REGEX),
    default_value: z.string().regex(SNAKE_CASE_REGEX).optional(),
  })
  .strict();

/**
 * The configuration of an individual page customization,
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
export type CustomizationConfig = z.infer<typeof CustomizationConfigSchema>;

/**
 * The list of page filters, as defined in the front matter
 * of a document, validated as a whole.
 */
export const CustomizationsConfigSchema = z
  .array(CustomizationConfigSchema)
  .refine((customizationsConfig) => {
    // Page filter names must be unique within a page
    const customizationLabels = customizationsConfig.map(
      (customizationConfig) => customizationConfig.label,
    );
    const uniqueCustomizationLabels = new Set(customizationLabels);
    if (customizationLabels.length !== uniqueCustomizationLabels.size) {
      console.error('Duplicate customization labels found in list:', customizationLabels);
      return false;
    }

    // Placeholders must refer to a valid filter name
    // that is defined earlier in the list than the placeholder
    const definedParamNames = new Set();
    for (const filterConfig of customizationsConfig) {
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
 * The list of page customizations, as defined in the front matter
 * of a document.
 */
export type CustomizationsConfig = z.infer<typeof CustomizationsConfigSchema>;

/**
 * The front matter of a document required by the integration
 * (additional keys are allowed in the front matter YAML,
 * but are ignored by the integration).
 */
export const FrontmatterSchema = z.object({
  title: z.string(),
  customizations: CustomizationsConfigSchema.optional(),
});

/**
 * The front matter of a document required by the integration
 * (additional keys are allowed in the front matter YAML,
 * but are ignored by the integration).
 *
 * @example
 * {
 *   title: "Decorative Painting Tips",
 *   customizations: [
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
