import { z } from 'zod';
import { PREF_ID_REGEX } from '../regexes';

/**
 * A single entry in an allowlist.
 *
 * @example
 * {
 *  id: 'gcp',
 *  display_name: 'Google Cloud Platform'
 * }
 */
export const AllowlistConfigEntrySchema = z
  .object({
    id: z.string().regex(PREF_ID_REGEX),
    display_name: z.string()
  })
  .strict();

/**
 * A single entry in an allowlist.
 *
 * @example
 * {
 *  id: 'gcp',
 *  display_name: 'Google Cloud Platform'
 * }
 */
export type AllowlistConfigEntry = z.infer<typeof AllowlistConfigEntrySchema>;

export const AllowlistConfigSchema = z
  .object({
    allowed: z.array(AllowlistConfigEntrySchema).refine((entries) => {
      const ids = entries.map((entry) => entry.id);
      const uniqueIds = new Set(ids);
      if (ids.length !== uniqueIds.size) {
        const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
        console.error(`Duplicate IDs found in allowlist: ${duplicates.join(', ')}`);
        return false;
      }
      return true;
    })
  })
  .strict();

export type AllowlistConfig = z.infer<typeof AllowlistConfigSchema>;

export const AllowlistSchema = z
  .object({
    prefsById: z.record(AllowlistConfigEntrySchema),
    optionsById: z.record(AllowlistConfigEntrySchema)
  })
  .strict();

export type Allowlist = z.infer<typeof AllowlistSchema>;
