import { z } from 'zod';
import { SNAKE_CASE_REGEX } from '../regexes';

const PrefOptionSchema = z
  .object({
    display_name: z.union([z.number(), z.string()]),
    default: z.boolean().optional(),
    identifier: z.union([z.number(), z.string().regex(SNAKE_CASE_REGEX)])
  })
  .strict();

/**
 * Preference options schema:
 * Validates the parsed YAML ingested from
 * the preference options configuration files.
 */
export const PrefOptionsConfigSchema = z.record(
  z
    .array(PrefOptionSchema)
    // verify that one and only one option is marked as default
    .refine((options) => {
      const defaultOptions = options.filter((option) => option.default);
      if (defaultOptions.length > 1) {
        console.error('Only one option can be marked as default');
        return false;
      } else if (defaultOptions.length === 0) {
        console.error('One option must be marked as default');
        return false;
      }
      return true;
    })
);

export type PrefOptionsConfig = z.infer<typeof PrefOptionsConfigSchema>;
