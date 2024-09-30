import { z } from 'zod';
import { PREF_ID_REGEX } from '../regexes';

const allowListEntrySchema = z.object({
  id: z.string().regex(PREF_ID_REGEX),
  display_name: z.string()
});

export const allowlistSchema = z.array(allowListEntrySchema);

export type AllowlistEntry = z.infer<typeof allowListEntrySchema>;
export type Allowlist = z.infer<typeof allowlistSchema>;
