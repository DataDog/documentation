import { z } from 'zod';
import { SNAKE_CASE_REGEX, PREF_OPTIONS_ID_REGEX } from '../regexes';

/**
 * An option for a preference,
 * as defined in the preference options configuration files.
 *
 * @example
 * display_name: Postgres
 * id: postgres
 * default: true
 */
export const PrefOptionSchema = z
  .object({
    display_name: z.string(),
    default: z.boolean().optional(),
    id: z.string().regex(SNAKE_CASE_REGEX)
  })
  .strict();

/**
 * The pref options config as it appears in the YAML,
 * without additional default values populated.
 * For example, the display value will be missing
 * from most of the options.
 */
export const RawPrefOptionsConfigSchema = z.record(
  z.string().regex(PREF_OPTIONS_ID_REGEX),
  z
    .array(
      PrefOptionSchema.omit({ display_name: true }).extend({
        display_name: z.string().optional()
      })
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
    })
);

/**
 * The pref options config as it appears in the YAML,
 * without additional default values populated.
 */
export type RawPrefOptionsConfig = z.infer<typeof RawPrefOptionsConfigSchema>;

const MinifiedPrefOptionSchema = z
  .object({
    n: z.string(), // display name
    d: z.boolean().optional(), // default
    i: z.string().regex(SNAKE_CASE_REGEX) // ID
  })
  .strict();

interface MinifiedPrefOption {
  n: string; // display name
  d?: boolean; // default
  i: string; // ID
}

export const MinifiedPrefOptionsConfigSchema = z.record(
  z.string().regex(PREF_OPTIONS_ID_REGEX),
  z.array(MinifiedPrefOptionSchema)
);

/**
 * A minified version of the PrefOptionsConfigSchema.
 */
export interface MinifiedPrefOptionsConfig {
  [key: string]: MinifiedPrefOption[];
}

/**
 * The validated preference options configuration
 * ingested from YAML files.
 */
export const PrefOptionsConfigSchema = z.record(
  z.string().regex(PREF_OPTIONS_ID_REGEX),
  z
    .array(PrefOptionSchema)
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
    })
);

/**
 * The validated preference options configuration
 * ingested from YAML files.
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
export type PrefOptionsConfig = z.infer<typeof PrefOptionsConfigSchema>;
