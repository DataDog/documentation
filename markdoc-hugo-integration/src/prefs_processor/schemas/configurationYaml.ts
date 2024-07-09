import { z } from 'zod';
import { PagePrefOptionSchema, PagePrefSchema } from './pagePrefs';
import { SNAKE_CASE_REGEX } from './regexes';

/**
 * YAML variable config schema:
 * Validates the parsed YAML ingested from
 * the preference configuration files.
 */
export const PagePrefOptionsConfigSchema = z.record(
  PagePrefSchema.omit({ id: true, default_value: true })
    .extend({
      options: z
        .array(
          PagePrefOptionSchema.extend({
            display_name: z.union([z.number(), z.string()]),
            default: z.boolean().optional(),
            id: z.union([z.number(), z.string().regex(SNAKE_CASE_REGEX)])
          })
        )
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
    })
    .strict()
);

export type PagePrefOptionsConfig = z.infer<typeof PagePrefOptionsConfigSchema>;
