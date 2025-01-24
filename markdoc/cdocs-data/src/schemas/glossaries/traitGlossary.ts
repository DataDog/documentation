/**
 * Glossaries used to ensure consistency in content filter
 * attributes and options between docs pages.
 */
import { z } from 'zod';
import { SNAKE_CASE_REGEX } from '../regexes';

/**
 * A single entry in an attribute glossary.
 */
export const TraitGlossaryEntrySchema = z
  .object({
    id: z.string().regex(SNAKE_CASE_REGEX),
    label: z.string(),
    internal_notes: z.string().optional(),
  })
  .strict();

/**
 * A single entry in an attribute glossary.
 *
 * @example
 * {
 *   id: 'host',
 *   label: 'Host',
 *   internal_notes: 'The host of a service or Datadog Agent',
 * }
 */
export type TraitGlossaryEntry = z.infer<typeof TraitGlossaryEntrySchema>;

/**
 * A glossary of all attributes that can be used on a site.
 */
export const TraitGlossarySchema = z.record(TraitGlossaryEntrySchema);

/**
 * A glossary of all user traits that can be used in customization.
 *
 * @example
 * {
 *   host: {
 *     id: 'host',
 *     label: 'Host',
 *     internal_notes: 'A cloud hosting provider, such as AWS', // optional
 *   },
 *   operating_system: {
 *     id: 'os',
 *     label: 'Operating system'
 *   }
 * }
 */
export type TraitGlossary = z.infer<typeof TraitGlossarySchema>;

/**
 * A glossary of all attributes that can be used on a site,
 * as it is parsed directly from the YAML file.
 */
export const RawTraitGlossarySchema = z
  .object({
    traits: z.array(TraitGlossaryEntrySchema).refine((entries) => {
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

export type RawTraitGlossary = z.infer<typeof RawTraitGlossarySchema>;
