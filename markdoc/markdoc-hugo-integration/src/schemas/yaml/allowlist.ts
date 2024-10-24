import { z } from 'zod';
import { PREF_ID_REGEX } from '../regexes';

export const AllowlistEntrySchema = z
  .object({
    id: z.string().regex(PREF_ID_REGEX),
    display_name: z.string()
  })
  .strict();

export const AllowlistSchema = z.array(AllowlistEntrySchema).refine((entries) => {
  const ids = entries.map((entry) => entry.id);
  const uniqueIds = new Set(ids);
  if (ids.length !== uniqueIds.size) {
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    console.error(`Duplicate IDs found in allowlist: ${duplicates.join(', ')}`);
    return false;
  }
  return true;
});

export const RawAllowlistSchema = z.object({
  allowed: AllowlistSchema
});
export type RawAllowlist = z.infer<typeof RawAllowlistSchema>;

export type AllowlistEntry = z.infer<typeof AllowlistEntrySchema>;
export type Allowlist = z.infer<typeof AllowlistSchema>;

export const AllowlistsByTypeSchema = z
  .object({
    prefs: AllowlistSchema,
    options: AllowlistSchema
  })
  .strict();

export type AllowlistsByType = z.infer<typeof AllowlistsByTypeSchema>;
