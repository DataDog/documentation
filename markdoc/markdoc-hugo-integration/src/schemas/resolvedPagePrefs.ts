import { z } from 'zod';
import { SNAKE_CASE_REGEX } from './regexes';

/**
 * PagePref schemas:
 * These define what a page preference object looks like,
 * including the default value of the preference,
 * options for the preference, and so on.
 * The data in this object is derived from several sources,
 * such as front matter and the relevant configuration files.
 * This object is used to populate menu options in the UI,
 * display the name of the preference on the page, and so on.
 */

export const ResolvedPagePrefOptionSchema = z
  .object({
    // The value of the option, to be used in routes and params
    id: z.string().regex(SNAKE_CASE_REGEX),
    // The display name of the option in the UI
    displayName: z.string()
  })
  .strict();

export type ResolvedPagePrefOption = z.infer<typeof ResolvedPagePrefOptionSchema>;

export const ResolvedPagePrefSchema = z
  .object({
    // The unique ID of the variable
    identifier: z.string().regex(SNAKE_CASE_REGEX),
    // The display name of the preference in the UI
    displayName: z.string(),
    defaultValue: z.string().regex(SNAKE_CASE_REGEX),
    options: z.array(ResolvedPagePrefOptionSchema)
  })
  .strict();

export type ResolvedPagePref = z.infer<typeof ResolvedPagePrefSchema>;

export const ResolvedPagePrefsSchema = z.record(ResolvedPagePrefSchema);
export type ResolvedPagePrefs = z.infer<typeof ResolvedPagePrefsSchema>;
