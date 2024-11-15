import { z } from 'zod';
import { PREF_OPTIONS_ID_REGEX, SNAKE_CASE_REGEX } from './regexes';
import { PrefOptionsConfigSchema } from './yaml/prefOptions';
import { PagePrefConfigSchema } from './yaml/frontMatter';

/**
 * An option available in a resolved page pref
 * (see next schema).
 */
const ResolvedPagePrefOptionSchema = z
  .object({
    // The value of the option, to be used in routes and params
    id: z.string().regex(SNAKE_CASE_REGEX),
    // The display name of the option in the UI
    displayName: z.string()
  })
  .strict();

/**
 * A page preference that has been "resolved" into
 * its current value and available options.
 * The current value can be derived from default values
 * or user selections, and the available options
 * can sometimes be narrowed by previous user selections
 * that this selection depends on.
 *
 * For example, assume the user must select dbm_host (such as `aws`)
 * before they can select a dbm_host_type (such as `ec2`).
 * The options for dbm_host_type will be
 * "resolved" (narrowed) based on the user's selection of dbm_host,
 * since not every possible host type option is valid for all hosts.
 */
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
 * A page preference that has been "resolved" into
 * its current value and available options.
 * The current value can be derived from default values
 * or user selections, and the available options
 * can sometimes be narrowed by previous user selections
 * that this selection depends on.
 *
 * For example, assume the user must select dbm_host (such as `aws`)
 * before they can select a dbm_host_type (such as `ec2`).
 * The options for dbm_host_type will be
 * "resolved" (narrowed) based on the user's selection of dbm_host,
 * since not every possible host type option is valid for all hosts.
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

/**
 * A collection of ResolvedPagePref objects, indexed by their
 * unique IDs.
 */
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

/**
 * The manifest for a single page preference,
 * containing all of the configuration data necessary
 * to support the preference and its options.
 *
 * This is used to efficiently validate, resolve,
 * and re-resolve the preference.
 */
export const PagePrefManifestSchema = z
  .object({
    config: PagePrefConfigSchema,
    defaultValuesByOptionsSetId: z.record(
      z.string().regex(PREF_OPTIONS_ID_REGEX),
      z.string().regex(SNAKE_CASE_REGEX)
    ),
    possibleValues: z.array(z.string().regex(SNAKE_CASE_REGEX))
  })
  .strict();

/**
 * The manifest for a single page preference,
 * containing all of the configuration data necessary
 * to support the preference and its options.
 *
 * This is used to efficiently validate, resolve,
 * and re-resolve the preference.
 *
 * @example
 * // A manifest for a `host_type` preference
 * // whose options change depending on
 * // the user's previous selection of `host`.
 * {
 *   config: {
 *     id: 'host_type',
 *     options_source: 'aws_host_types',
 *     default_value: 'ec2'
 *   },
 *   defaultValuesByOptionsSetId: {
 *     aws_host_types: 'ec2',
 *     gcp_host_types: 'gce',
 *     azure_host_types: 'vm'
 *   },
 *   possibleValues: ['ec2', 'gce', [... many more possible values here]]
 * }
 */
export type PagePrefManifest = z.infer<typeof PagePrefManifestSchema>;

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
    defaultValsByPrefId: z.record(
      z.string().regex(SNAKE_CASE_REGEX),
      z.string().regex(SNAKE_CASE_REGEX)
    ),
    errors: z.array(z.string())
  })
  .strict();

/**
 * A object containing all of the potential pref IDs
 * and option sets for a page, created by populating the front matter
 * placeholders with all possible values, then collecting all
 * configuration data necessary to support the resulting
 * pref and options set IDs.
 *
 * Useful for efficiently validating, resolving,
 * and re-resolving preferences.
 *
 * @example
 * {
 *   // a simple preference with no dependencies
 *   host: {
 *     config: {
 *       id: 'host',
 *       options_source: 'host_options',
 *       default_value: 'aws'
 *     },
 *     defaultValuesByOptionsSetId: {
 *       host_options: 'aws',
 *     },
 *     possibleValues: ['aws', 'gcp', 'azure']
 *   },
 *
 *   // a preference that depends on the user's selection of `host`,
 *   // yielding different options for each host type
 *   // and a wide variety of possible values overall
 *   host_type: {
 *     config: {
 *       id: 'host_type',
 *       options_source: 'aws_host_types',
 *       default_value: 'ec2'
 *     },
 *     defaultValuesByOptionsSetId: {
 *       aws_host_types: 'ec2',
 *       gcp_host_types: 'gce',
 *       azure_host_types: 'vm'
 *     },
 *     possibleValues: ['ec2', 'gce', [... many more possible values here]]
 *   }
 * }
 */
export type PagePrefsManifest = z.infer<typeof PagePrefsManifestSchema>;
