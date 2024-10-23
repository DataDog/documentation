import { z } from 'zod';
import { PREF_OPTIONS_ID_REGEX, SNAKE_CASE_REGEX } from './regexes';
import { PrefOptionsConfigSchema } from './yaml/prefOptions';
import { PagePrefConfigSchema } from './yaml/frontMatter';

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
    id: z.string().regex(SNAKE_CASE_REGEX),
    // The display name of the preference in the UI
    displayName: z.string(),
    defaultValue: z.string().regex(SNAKE_CASE_REGEX),
    options: z.array(ResolvedPagePrefOptionSchema),
    currentValue: z.string().regex(SNAKE_CASE_REGEX)
  })
  .strict();

/**
 * A ResolvedPagePref object contains the current value
 * and the current available options for a page pref.
 * Page prefs are resolved by combining data from
 * several sources, such as the page's URL, the frontmatter,
 * the default value for the pref,
 * and the user's stored preferences.
 *
 * @example
 * {
 *   id: 'category',
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
 * unique IDs.
 *
 * Page prefs are resolved by combining data from
 * several sources, such as the page's URL, the frontmatter,
 * the default value for the pref,
 * and the user's stored preferences.
 *
 * @example
 * {
 *   category: {
 *      id: 'category',
 *      displayName: 'Category',
 *      defaultValue: 'all',
 *      options: [
 *        { id: 'all', displayName: 'All' },
 *        { id: 'news', displayName: 'News' },
 *        { id: 'events', displayName: 'Events' }
 *      ]
 *   }
 * }
 */
export type ResolvedPagePrefs = z.infer<typeof ResolvedPagePrefsSchema>;

export const PagePrefManifestSchema = z
  .object({
    config: PagePrefConfigSchema,
    initialValue: z.string().regex(SNAKE_CASE_REGEX),
    defaultValuesByOptionsSetId: z.record(
      z.string().regex(PREF_OPTIONS_ID_REGEX),
      z.string().regex(SNAKE_CASE_REGEX)
    )
  })
  .strict();

export type PagePrefManifest = z.infer<typeof PagePrefManifestSchema>;

export const DraftPagePrefManifestSchema = PagePrefManifestSchema.omit({
  initialValue: true
}).extend({
  initialValue: z.string().optional()
});

export type DraftPagePrefManifest = z.infer<typeof DraftPagePrefManifestSchema>;

/**
 * A object containing all of the potential pref IDs
 * and option sets for a page, created by populating the front matter
 * placeholders with all possible values, then collecting all
 * configuration data necessary to support the resulting
 * pref and options set IDs.
 *
 * Useful for efficiently validating, resolving,
 * and re-resolving preferences.
 */
export const PagePrefsManifestSchema = z
  .object({
    prefsById: z.record(z.string().regex(SNAKE_CASE_REGEX), PagePrefManifestSchema),
    optionSetsById: PrefOptionsConfigSchema,
    errors: z.array(z.string()).length(0)
  })
  .strict();

export type PagePrefsManifest = z.infer<typeof PagePrefsManifestSchema>;

export const DraftPagePrefsManifestSchema = PagePrefsManifestSchema.omit({
  prefsById: true,
  errors: true
}).extend({
  prefsById: z.record(z.string().regex(SNAKE_CASE_REGEX), DraftPagePrefManifestSchema),
  errors: z.array(z.string())
});

export type DraftPagePrefsManifest = z.infer<typeof DraftPagePrefsManifestSchema>;
