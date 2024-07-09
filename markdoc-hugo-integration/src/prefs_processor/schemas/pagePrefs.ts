import { z } from 'zod';
import { SNAKE_CASE_REGEX } from './regexes';

/**
 * PagePref schemas:
 * These define what a page preference object looks like,
 * including the default value of the preference,
 * options for the preference, and so on.
 * This object is used to populate menu options in the UI,
 * display the name of the preference on the page, and so on.
 */

export const PagePrefOptionSchema = z
  .object({
    // The value of the option, to be used in routes and params
    id: z.string().regex(SNAKE_CASE_REGEX),
    // The display name of the option in the UI
    display_name: z.string()
  })
  .strict();

export type PagePrefOption = z.infer<typeof PagePrefOptionSchema>;

export const PagePrefSchema = z
  .object({
    // The unique ID of the variable
    id: z.string().regex(SNAKE_CASE_REGEX),
    // The display name of the variable in the UI
    display_name: z.string(),
    default_value: z.string().regex(SNAKE_CASE_REGEX),
    options: z.array(PagePrefOptionSchema)
  })
  .strict();

export type PagePref = z.infer<typeof PagePrefSchema>;

export const PagePrefsSchema = z.record(PagePrefSchema);
export type PagePrefs = z.infer<typeof PagePrefsSchema>;
