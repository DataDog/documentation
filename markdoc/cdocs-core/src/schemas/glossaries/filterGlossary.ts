/**
 * Glossaries used to ensure consistency in content filter
 * names and options between docs pages.
 */
import { z } from 'zod';
import { SNAKE_CASE_REGEX } from '../regexes';

/**
 * A single entry in a filter glossary.
 */
export const FilterGlossaryEntrySchema = z
  .object({
    id: z.string().regex(SNAKE_CASE_REGEX),
    label: z.string(),
    description: z.string().optional(),
  })
  .strict();

/**
 * A single entry in a filter glossary.
 *
 * @example
 * {
 *   id: 'host',
 *   label: 'Host',
 *   description: 'The host of a service or Datadog Agent',
 * }
 */
export type FilterGlossaryEntry = z.infer<typeof FilterGlossaryEntrySchema>;

/**
 * A glossary of all filters that can be used on a site.
 */
export const FilterGlossarySchema = z.record(FilterGlossaryEntrySchema);

/**
 * A glossary of all filters that can be used on a site.
 *
 * @example
 * {
 *   host: {
 *     id: 'host',
 *     label: 'Host',
 *     description: 'A cloud hosting provider, such as AWS', // optional
 *   },
 *   operating_system: {
 *     id: 'os',
 *     label: 'Operating system'
 *   }
 * }
 */
export type FilterGlossary = z.infer<typeof FilterGlossarySchema>;

/**
 * A glossary of all filters that can be used on a site,
 * as it is parsed directly from the YAML file.
 */
export const RawFilterGlossarySchema = z
  .object({
    allowed: z.array(FilterGlossaryEntrySchema).refine((entries) => {
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

export type RawFilterGlossary = z.infer<typeof RawFilterGlossarySchema>;
