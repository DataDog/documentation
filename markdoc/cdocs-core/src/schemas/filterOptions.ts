import { z } from 'zod';
import { SNAKE_CASE_REGEX, FILTER_OPTIONS_ID_REGEX } from './regexes';

/**
 * A single option for a filter,
 * as defined in the filter options configuration files
 * and parsed directly from that YAML.
 *
 * @example
 * {
 *   display_name: "Postgres",
 *   id: "postgres",
 *   default: true
 * }
 */
export const FilterOptionSchema = z
  .object({
    display_name: z.string(),
    default: z.boolean().optional(),
    id: z.string().regex(SNAKE_CASE_REGEX),
  })
  .strict();

/**
 * The filter options config as it is parsed from the config YAML,
 * without additional default values populated.
 * For example, the display value will be missing
 * from an option when the intention is to use the default
 * display name as defined in the options glossary.
 */
export const RawFilterOptionsConfigSchema = z.record(
  z.string().regex(FILTER_OPTIONS_ID_REGEX),
  z
    .array(
      FilterOptionSchema.omit({ display_name: true }).extend({
        display_name: z.string().optional(),
      }),
    )
    .refine((options) => {
      // Verify that only one default option is identified
      const defaultOptions = options.filter((option) => option.default);
      if (defaultOptions.length > 1) {
        console.error('Only one option can be marked as default');
        return false;
      } else if (defaultOptions.length === 0) {
        console.error('One option must be marked as default');
        return false;
      }

      // Verify that all options have unique IDs
      const ids = new Set<string>();
      for (const option of options) {
        if (ids.has(option.id)) {
          console.error('Duplicate option ID found:', option.id);
          return false;
        }
        ids.add(option.id);
      }

      return true;
    }),
);

/**
 * The filter options config as it is parsed from the config YAML,
 * without additional default values populated.
 * For example, the display value will be missing
 * from an option when the intention is to use the default
 * display name as defined in the options glossary.
 */
export type RawFilterOptionsConfig = z.infer<
  typeof RawFilterOptionsConfigSchema
>;

/**
 * The validated filter options configuration
 * as it is parsed directly from the YAML config files.
 */
export const FilterOptionsConfigSchema = z.record(
  z.string().regex(FILTER_OPTIONS_ID_REGEX),
  z
    .array(FilterOptionSchema)
    // verify that one and only one option is marked as default
    .refine((options) => {
      // Verify that only one default option is identified
      const defaultOptions = options.filter((option) => option.default);
      if (defaultOptions.length > 1) {
        console.error('Only one option can be marked as default');
        return false;
      } else if (defaultOptions.length === 0) {
        console.error('One option must be marked as default');
        return false;
      }

      // Verify that all options have unique IDs
      const ids = new Set<string>();
      for (const option of options) {
        if (ids.has(option.id)) {
          console.error('Duplicate option ID found:', option.id);
          return false;
        }
        ids.add(option.id);
      }
      return true;
    }),
);

/**
 * The validated filter options configuration
 * as it is parsed directly from the YAML config files.
 *
 * @example
 * {
 *  primary_color_options: [
 *   { id: 'red', display_name: 'Red', default: true },
 *   { id: 'blue', display_name: 'Blue' },
 *   { id: 'yellow', display_name: 'Yellow' }
 *  ],
 *  traffic_light_color_options: [
 *   { id: 'red', display_name: 'Red', default: true },
 *   { id: 'green', display_name: 'Green' },
 *   { id: 'yellow', display_name: 'Yellow' }
 *  ],
 * }
 */
export type FilterOptionsConfig = z.infer<typeof FilterOptionsConfigSchema>;
