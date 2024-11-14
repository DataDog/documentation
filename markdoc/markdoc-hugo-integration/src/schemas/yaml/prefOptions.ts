import { z } from 'zod';
import { SNAKE_CASE_REGEX, PREF_OPTIONS_ID_REGEX } from '../regexes';

/**
 * A single option for a preference,
 * as defined in the preference options configuration files
 * and parsed directly from that YAML.
 *
 * @example
 * {
 *   display_name: "Postgres",
 *   id: "postgres",
 *   default: true
 * }
 */
export const PrefOptionSchema = z
  .object({
    display_name: z.string(),
    default: z.boolean().optional(),
    id: z.string().regex(SNAKE_CASE_REGEX)
  })
  .strict();

/**
 * The pref options config as it is parsed from the config YAML,
 * without additional default values populated.
 * For example, the display value will be missing
 * from an option when the intention is to use the default
 * display name as defined in the options allowlist.
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
 * The pref options config as it is parsed from the config YAML,
 * without additional default values populated.
 * For example, the display value will be missing
 * from an option when the intention is to use the default
 * display name as defined in the options allowlist.
 */
export type RawPrefOptionsConfig = z.infer<typeof RawPrefOptionsConfigSchema>;

/**
 * A minified version of the PrefOptionSchema.
 * This is used to reduce the size of the preference options
 * configuration when it is embedded in HTML.
 */
const MinifiedPrefOptionSchema = z
  .object({
    n: z.string(), // display name
    d: z.boolean().optional(), // default
    i: z.string().regex(SNAKE_CASE_REGEX) // ID
  })
  .strict();

/**
 * A minified version of the PrefOptionSchema.
 * This is used to reduce the size of the preference options
 * configuration when it is embedded in HTML.
 *
 * @example
 * {
 *   n: "Postgres", // option display name
 *   d: true,       // this option is the default
 *   i: "postgres"  // option ID
 * }
 */
interface MinifiedPrefOption {
  n: string; // display name
  d?: boolean; // default
  i: string; // ID
}

/**
 * A minified version of the PrefOptionsConfigSchema.
 */
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
 * as it is parsed directly from the YAML config files.
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
export type PrefOptionsConfig = z.infer<typeof PrefOptionsConfigSchema>;
