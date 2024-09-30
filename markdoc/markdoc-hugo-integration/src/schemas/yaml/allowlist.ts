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
  return ids.length === uniqueIds.size;
});

export type AllowlistEntry = z.infer<typeof AllowlistEntrySchema>;
export type Allowlist = z.infer<typeof AllowlistSchema>;

export const AllowlistsByTypeSchema = z
  .object({
    prefs: AllowlistSchema,
    options: AllowlistSchema
  })
  .strict();

export type AllowlistsByType = z.infer<typeof AllowlistsByTypeSchema>;
