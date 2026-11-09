import { z } from 'zod';
import { OPTION_GROUP_ID_REGEX, SNAKE_CASE_REGEX } from './regexes.js';
import { FilterConfigSchema } from './frontmatter.js';
import { CdocsErrorSchema } from './errors.js';
import { OptionGroupGlossarySchema } from './glossaries/optionGroupGlossary.js';
import { CDOCS_NOOP } from './constants.js';

/**
 * An option available in a resolved page filter
 * (see next schema).
 */
const ResolvedFilterOptionSchema = z.strictObject({
  // The value of the option, to be used in routes and params
  id: z.string().regex(SNAKE_CASE_REGEX),
  // The display name of the option in the UI
  label: z.string(),
});

/**
 * A page filter that has been "resolved" into
 * its current value and available options.
 *
 * When `isShown` is true, the filter is fully resolved with
 * current value, default value, and available options.
 *
 * When `isShown` is false, the filter is hidden based on
 * its show_if / hide_if conditions, and only contains
 * the filter's id and label.
 */
export const ResolvedFilterSchema = z.union([
  z.strictObject({
    id: z.string().regex(SNAKE_CASE_REGEX),
    label: z.string(),
    isShown: z.literal(true),
    defaultValue: z.string().regex(SNAKE_CASE_REGEX),
    options: z.array(ResolvedFilterOptionSchema),
    currentValue: z.string().regex(SNAKE_CASE_REGEX),
  }),
  z.strictObject({
    id: z.string().regex(SNAKE_CASE_REGEX),
    label: z.string(),
    isShown: z.literal(false),
    defaultValue: z.literal(CDOCS_NOOP),
    options: z.tuple([
      z.strictObject({
        id: z.literal(CDOCS_NOOP),
        label: z.literal(CDOCS_NOOP),
      }),
    ]),
    currentValue: z.literal(CDOCS_NOOP),
  }),
]);

/**
 * A page filter that has been "resolved" into
 * its current value and available options.
 *
 * @example
 * // Displayed filter:
 * {
 *   id: 'category',
 *   label: 'Category',
 *   isShown: true,
 *   defaultValue: 'all',
 *   currentValue: 'news',
 *   options: [
 *     { id: 'all', label: 'All' },
 *     { id: 'news', label: 'News' },
 *     { id: 'events', label: 'Events' }
 *   ]
 * }
 *
 * @example
 * // Hidden filter:
 * {
 *   id: 'runtime',
 *   label: 'Runtime',
 *   isShown: false,
 *   defaultValue: 'cdocs_noop',
 *   currentValue: 'cdocs_noop',
 *   options: [{ id: 'cdocs_noop', label: 'cdocs_noop' }]
 * }
 */
export type ResolvedFilter = z.infer<typeof ResolvedFilterSchema>;

/**
 * A collection of ResolvedFilter objects, indexed by their
 * unique IDs.
 */
export const ResolvedFiltersSchema = z.record(
  z.string().regex(SNAKE_CASE_REGEX),
  ResolvedFilterSchema,
);

/**
 * A collection of ResolvedFilter objects, indexed by their
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
 *      label: 'Category',
 *      defaultValue: 'all',
 *      options: [
 *        { id: 'all', label: 'All' },
 *        { id: 'news', label: 'News' },
 *        { id: 'events', label: 'Events' }
 *      ]
 *   }
 * }
 */
export type ResolvedFilters = z.infer<typeof ResolvedFiltersSchema>;

/**
 * The manifest for a single page filter,
 * containing all of the configuration data necessary
 * to support the filter and its options.
 *
 * This is used to efficiently validate, resolve,
 * and re-resolve the filter's current value
 * and available options.
 */
export const FilterManifestSchema = z.strictObject({
  config: FilterConfigSchema,
  defaultValsByOptionGroupId: z.record(
    z.string().regex(OPTION_GROUP_ID_REGEX),
    z.string().regex(SNAKE_CASE_REGEX),
  ),
  possibleVals: z.array(z.string().regex(SNAKE_CASE_REGEX)),
  optionLabelsByOptionId: z.record(z.string().regex(SNAKE_CASE_REGEX), z.string()),
});

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
 *     trait_id: 'host_type',
 *     option_group_id: 'aws_host_types',
 *     default_value: 'ec2'
 *   },
 *   defaultValsByOptionGroupId: {
 *     aws_host_types: 'ec2',
 *     gcp_host_types: 'gce',
 *     azure_host_types: 'vm'
 *   },
 *   possibleVals: ['ec2', 'gce', [... many more possible values here]]
 * }
 */
export type FilterManifest = z.infer<typeof FilterManifestSchema>;

/**
 * A object containing all of the potential page filter IDs
 * and option groups for a page, created by populating the front matter
 * placeholders with all possible values, then collecting all
 * configuration data necessary to support the resulting
 * filter and options set IDs.
 *
 * Useful for efficiently validating, resolving,
 * and re-resolving filters.
 */
export const FiltersManifestSchema = z.strictObject({
  filtersByTraitId: z.record(z.string().regex(SNAKE_CASE_REGEX), FilterManifestSchema),
  optionGroupsById: OptionGroupGlossarySchema,
  defaultValsByTraitId: z.record(
    z.string().regex(SNAKE_CASE_REGEX),
    z.string().regex(SNAKE_CASE_REGEX),
  ),
  errors: z.array(CdocsErrorSchema),
});

/**
 * A object containing all of the potential trait IDs
 * and option groups for a page, created by populating the front matter
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
 *       trait_id: 'host',
 *       option_group_id: 'host_options',
 *       default_value: 'aws'
 *     },
 *     defaultValsByOptionGroupId: {
 *       host_options: 'aws',
 *     },
 *     possibleVals: ['aws', 'gcp', 'azure']
 *   },
 *
 *   // a filter whose options depend on the user's selection of `host`,
 *   // yielding different options for each host type
 *   // and a wide variety of possible values overall
 *   host_type: {
 *     config: {
 *       trait_id: 'host_type',
 *       option_group_id: 'aws_host_types',
 *       default_value: 'ec2'
 *     },
 *     defaultValsByOptionGroupId: {
 *       aws_host_types: 'ec2',
 *       gcp_host_types: 'gce',
 *       azure_host_types: 'vm'
 *     },
 *     possibleVals: ['ec2', 'gce', [... many more possible values here]]
 *   }
 * }
 */
export type FiltersManifest = z.infer<typeof FiltersManifestSchema>;

/**
 * A lighter version of the FilterManifest schema,
 * designed to be used client-side.
 */
export const ClientSideFilterManifestSchema = z.strictObject({
  config: FilterConfigSchema,
  defaultValsByOptionGroupId: z.record(
    z.string().regex(OPTION_GROUP_ID_REGEX),
    z.string().regex(SNAKE_CASE_REGEX),
  ),
});

/**
 * A lighter version of the FilterManifest schema,
 * designed to be used client-side.
 */
export type ClientSideFilterManifest = z.infer<typeof ClientSideFilterManifestSchema>;

/**
 * A lighter version of the FiltersManifest schema,
 * designed to be used client-side.
 */
export const ClientSideFiltersManifestSchema = z.strictObject({
  filtersByTraitId: z.record(
    z.string().regex(SNAKE_CASE_REGEX),
    ClientSideFilterManifestSchema,
  ),
  optionGroupsById: OptionGroupGlossarySchema,
  defaultValsByTraitId: z.record(
    z.string().regex(SNAKE_CASE_REGEX),
    z.string().regex(SNAKE_CASE_REGEX),
  ),
});

/**
 * A lighter version of the FiltersManifest schema,
 * designed to be used client-side.
 */
export type ClientSideFiltersManifest = z.infer<typeof ClientSideFiltersManifestSchema>;
