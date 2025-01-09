/**
 * Glossaries used to ensure consistency in content filter
 * names and options between docs pages.
 */
import { z } from 'zod';
import { SNAKE_CASE_REGEX } from '../regexes';

/**
 * A single entry in an option glossary,
 */
export const OptionGlossaryEntrySchema = z
  .object({
    id: z.string().regex(SNAKE_CASE_REGEX),
    display_name: z.string(),
    description: z.string().optional(),
  })
  .strict();

/**
 * A single entry in an option glossary.
 *
 * @example
 * {
 *   id: 'linux',
 *   display_name: 'Linux',
 *   description: 'Optional additional information on what this option represents',
 * }
 */
export type OptionGlossaryEntry = z.infer<typeof OptionGlossaryEntrySchema>;

/**
 * A glossary of all options that can be used on a site.
 */
export const OptionGlossarySchema = z.record(OptionGlossaryEntrySchema);

/**
 * A glossary of all the options that can be used on a site,
 * regardless of which filters they are associated with.
 *
 * @example
 * {
 *   linux: {
 *     id: 'linux',
 *     display_name: 'Linux',
 *     description: 'Optional additional information on what this option represents',
 *   },
 *   windows: {
 *     id: 'windows',
 *     display_name: 'Windows',
 *   },
 *   ios: {
 *     id: 'ios',
 *     display_name: 'iOS',
 *   }
 * }
 */
export type OptionGlossary = z.infer<typeof OptionGlossarySchema>;

/**
 * A glossary of all options that can be used on a site,
 * as it is parsed directly from the YAML file.
 *
 * The data is wrapped in an "allowed" key because
 * site generators such as Hugo require a top-level key
 * in any configuration YAML.
 */
export const RawOptionGlossarySchema = z
  .object({
    allowed: z.array(OptionGlossaryEntrySchema).refine((entries) => {
      const ids = entries.map((entry) => entry.id);
      const uniqueIds = new Set(ids);
      if (ids.length !== uniqueIds.size) {
        const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
        console.error(`Duplicate IDs found in glossary: ${duplicates.join(', ')}`);
        return false;
      }
      return true;
    }),
  })
  .strict();

export type RawOptionGlossary = z.infer<typeof RawOptionGlossarySchema>;
