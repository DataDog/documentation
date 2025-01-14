/**
 * Glossaries used to ensure consistency in content filter
 * names and options between docs pages.
 */
import { z } from 'zod';
import { SNAKE_CASE_REGEX, FILTER_OPTIONS_ID_REGEX } from '../regexes';

/**
 * A single option in an option group.
 */
export const OptionGroupItemSchema = z
  .object({
    label: z.string(),
    default: z.boolean().optional(),
    id: z.string().regex(SNAKE_CASE_REGEX),
  })
  .strict();

export type OptionGroupItem = z.infer<typeof OptionGroupItemSchema>;

/**
 * A single entry in an option group glossary.
 */
export const OptionGroupGlossaryEntrySchema = z.array(OptionGroupItemSchema);

/**
 * A single entry in an option group glossary.
 *
 * @example
 * [
 *   {
 *     label: "Postgres",
 *     id: "postgres",
 *     default: true
 *   },
 *   {
 *     label: "MySQL",
 *     id: "mysql"
 *   }
 * ]
 */
export type OptionGroupGlossaryEntry = z.infer<typeof OptionGroupGlossaryEntrySchema>;

/**
 * The option groups as they are parsed from the config YAML,
 * without additional default values populated.
 * For example, an options' display value will be missing
 * when the intention is to use the default
 * display name defined in the option glossary.
 */
export const RawOptionGroupGlossarySchema = z.record(
  z.string().regex(FILTER_OPTIONS_ID_REGEX),
  z
    .array(
      OptionGroupItemSchema.omit({ label: true }).extend({
        label: z.string().optional(),
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

export type RawOptionGroupGlossary = z.infer<typeof RawOptionGroupGlossarySchema>;

// TODO: Do the validations run in the raw schema above
// also need to run below?

/**
 * A glossary of all the option groups that can be used on a site,
 * regardless of which filters they are associated with.
 */
export const OptionGroupGlossarySchema = z.record(
  z.string().regex(FILTER_OPTIONS_ID_REGEX),
  z
    .array(OptionGroupItemSchema)
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
 * A glossary of all the option groups that can be used on a site,
 * regardless of which filters they are associated with.
 *
 * @example
 * {
 *  primary_color_options: [
 *   { id: 'red', label: 'Red', default: true },
 *   { id: 'blue', label: 'Blue' },
 *   { id: 'yellow', label: 'Yellow' }
 *  ],
 *  traffic_light_color_options: [
 *   { id: 'red', label: 'Red', default: true },
 *   { id: 'green', label: 'Green' },
 *   { id: 'yellow', label: 'Yellow' }
 *  ],
 * }
 */
export type OptionGroupGlossary = z.infer<typeof OptionGroupGlossarySchema>;
