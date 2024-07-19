import { z } from 'zod';
import { SNAKE_CASE_REGEX } from './regexes';

const ResolvedPagePrefOptionSchema = z
  .object({
    // The value of the option, to be used in routes and params
    id: z.string().regex(SNAKE_CASE_REGEX),
    // The display name of the option in the UI
    displayName: z.string()
  })
  .strict();

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

/**
 * A ResolvedPagePref object represents all of the available data
 * for a single page preference. Page prefs are resolved by
 * combining the frontmatter, configured options, and default or user-selected values
 * in order to populate an object that has a current value,
 * correctly populated options based on any placeholders that were
 * used in the frontmatter, and so on.
 *
 * @example
 * {
 *   identifier: 'category',
 *   displayName: 'Category',
 *   defaultValue: 'all',
 *   options: [
 *     { id: 'all', displayName: 'All' },
 *     { id: 'news', displayName: 'News' },
 *     { id: 'events', displayName: 'Events' }
 *   ]
 * }
 */
export type ResolvedPagePref = z.infer<typeof ResolvedPagePrefSchema>;

export const ResolvedPagePrefsSchema = z.record(ResolvedPagePrefSchema);

/**
 * A collection of ResolvedPagePref objects, indexed by their
 * unique identifiers.
 */
export type ResolvedPagePrefs = z.infer<typeof ResolvedPagePrefsSchema>;
