import { z } from 'zod';
import { FILTER_OPTIONS_ID_REGEX, SNAKE_CASE_REGEX } from './regexes';
import { FilterOptionsConfigSchema } from './yaml/filterOptions';
import { PageFilterConfigSchema } from './yaml/frontMatter';
import { CdocsCoreErrorSchema } from './errors';

/**
 * An option available in a resolved page filter
 * (see next schema).
 */
const ResolvedPageFilterOptionSchema = z
  .object({
    // The value of the option, to be used in routes and params
    id: z.string().regex(SNAKE_CASE_REGEX),
    // The display name of the option in the UI
    displayName: z.string()
  })
  .strict();

/**
 * A page filter that has been "resolved" into
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
export const ResolvedPageFilterSchema = z
  .object({
    // The unique ID of the variable
    id: z.string().regex(SNAKE_CASE_REGEX),
    // The display name of the filter in the UI
    displayName: z.string(),
    defaultValue: z.string().regex(SNAKE_CASE_REGEX),
    options: z.array(ResolvedPageFilterOptionSchema),
    currentValue: z.string().regex(SNAKE_CASE_REGEX)
  })
  .strict();

/**
 * A page filter that has been "resolved" into
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
export type ResolvedPageFilter = z.infer<typeof ResolvedPageFilterSchema>;

/**
 * A collection of ResolvedPageFilter objects, indexed by their
 * unique IDs.
 */
export const ResolvedPageFiltersSchema = z.record(ResolvedPageFilterSchema);

/**
 * A collection of ResolvedPageFilter objects, indexed by their
 * unique IDs.
 *
 * Page filters are resolved by combining data from
 * several sources, such as the page's URL, the frontmatter,
 * the default value for the filter,
 * and the user's stored filters.
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
export type ResolvedPageFilters = z.infer<typeof ResolvedPageFiltersSchema>;

/**
 * The manifest for a single page filter,
 * containing all of the configuration data necessary
 * to support the filter and its options.
 *
 * This is used to efficiently validate, resolve,
 * and re-resolve the filter.
 */
export const PageFilterManifestSchema = z
  .object({
    config: PageFilterConfigSchema,
    defaultValsByOptionsSetId: z.record(
      z.string().regex(FILTER_OPTIONS_ID_REGEX),
      z.string().regex(SNAKE_CASE_REGEX)
    ),
    possibleVals: z.array(z.string().regex(SNAKE_CASE_REGEX))
  })
  .strict();

/**
 * The manifest for a single page filter,
 * containing all of the configuration data necessary
 * to support the filter and its options.
 *
 * This is used to efficiently validate, resolve,
 * and re-resolve the filter.
 *
 * @example
 * // A manifest for a `host_type` filter
 * // whose options change depending on
 * // the user's previous selection of `host`.
 * {
 *   config: {
 *     id: 'host_type',
 *     options_source: 'aws_host_types',
 *     default_value: 'ec2'
 *   },
 *   defaultValsByOptionsSetId: {
 *     aws_host_types: 'ec2',
 *     gcp_host_types: 'gce',
 *     azure_host_types: 'vm'
 *   },
 *   possibleVals: ['ec2', 'gce', [... many more possible values here]]
 * }
 */
export type PageFilterManifest = z.infer<typeof PageFilterManifestSchema>;

/**
 * A object containing all of the potential page filter IDs
 * and option sets for a page, created by populating the front matter
 * placeholders with all possible values, then collecting all
 * configuration data necessary to support the resulting
 * filter and options set IDs.
 *
 * Useful for efficiently validating, resolving,
 * and re-resolving filters.
 */
export const PageFiltersManifestSchema = z
  .object({
    filtersById: z.record(z.string().regex(SNAKE_CASE_REGEX), PageFilterManifestSchema),
    optionSetsById: FilterOptionsConfigSchema,
    defaultValsByFilterId: z.record(
      z.string().regex(SNAKE_CASE_REGEX),
      z.string().regex(SNAKE_CASE_REGEX)
    ),
    errors: z.array(CdocsCoreErrorSchema)
  })
  .strict();

/**
 * A object containing all of the potential page filter IDs
 * and option sets for a page, created by populating the front matter
 * placeholders with all possible values, then collecting all
 * configuration data necessary to support the resulting
 * filter and options set IDs.
 *
 * Useful for efficiently validating, resolving,
 * and re-resolving filters.
 *
 * @example
 * {
 *   // a simple filter with no dependencies
 *   host: {
 *     config: {
 *       id: 'host',
 *       options_source: 'host_options',
 *       default_value: 'aws'
 *     },
 *     defaultValsByOptionsSetId: {
 *       host_options: 'aws',
 *     },
 *     possibleVals: ['aws', 'gcp', 'azure']
 *   },
 *
 *   // a filter that depends on the user's selection of `host`,
 *   // yielding different options for each host type
 *   // and a wide variety of possible values overall
 *   host_type: {
 *     config: {
 *       id: 'host_type',
 *       options_source: 'aws_host_types',
 *       default_value: 'ec2'
 *     },
 *     defaultValsByOptionsSetId: {
 *       aws_host_types: 'ec2',
 *       gcp_host_types: 'gce',
 *       azure_host_types: 'vm'
 *     },
 *     possibleVals: ['ec2', 'gce', [... many more possible values here]]
 *   }
 * }
 */
export type PageFiltersManifest = z.infer<typeof PageFiltersManifestSchema>;

/**
 * A lighter version of the PageFilterManifest schema,
 * designed to be used client-side.
 */
export const PageFilterClientSideManifestSchema = z
  .object({
    config: PageFilterConfigSchema,
    defaultValsByOptionsSetId: z.record(
      z.string().regex(FILTER_OPTIONS_ID_REGEX),
      z.string().regex(SNAKE_CASE_REGEX)
    )
  })
  .strict();

export type PageFilterClientSideManifest = z.infer<
  typeof PageFilterClientSideManifestSchema
>;

/**
 * A lighter version of the PageFiltersManifest schema,
 * designed to be used client-side.
 */
export const PageFiltersClientSideManifestSchema = z
  .object({
    filtersById: z.record(
      z.string().regex(SNAKE_CASE_REGEX),
      PageFilterClientSideManifestSchema
    ),
    optionSetsById: FilterOptionsConfigSchema,
    defaultValsByFilterId: z.record(
      z.string().regex(SNAKE_CASE_REGEX),
      z.string().regex(SNAKE_CASE_REGEX)
    )
  })
  .strict();

export type PageFiltersClientSideManifest = z.infer<
  typeof PageFiltersClientSideManifestSchema
>;
