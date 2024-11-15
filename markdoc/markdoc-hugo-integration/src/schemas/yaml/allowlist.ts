/**
 * The allowlist is used to ensure consistency between docs pages.
 * For example, for the cloud provider GCP, we want to ensure that
 * on every page where GCP is an option for the host filter,
 * the same filter ID is used (e.g. `host`) to represent the host filter,
 * and the same option ID is used (e.g. `gcp`) to represent the GCP option
 * for that host filter.
 *
 * This ensures that once the customer chooses GCP once as their host,
 * that filter will apply correctly to every relevant page they visit.
 *
 * The allowlist is defined in the filters configuration YAML.
 */
import { z } from 'zod';
import { SNAKE_CASE_REGEX } from '../regexes';

/**
 * A single entry in an allowlist.
 */
export const AllowlistConfigEntrySchema = z
  .object({
    id: z.string().regex(SNAKE_CASE_REGEX),
    display_name: z.string()
  })
  .strict();

/**
 * A single entry in an allowlist.
 *
 * @example
 * {
 *   id: 'host',
 *   display_name: 'Host'
 * }
 */
export type AllowlistConfigEntry = z.infer<typeof AllowlistConfigEntrySchema>;

/**
 * An allowlist configuration (such as the allowed filter IDs)
 * as it is parsed directly from the YAML file.
 */
export const AllowlistConfigSchema = z
  .object({
    allowed: z.array(AllowlistConfigEntrySchema).refine((entries) => {
      const ids = entries.map((entry) => entry.id);
      const uniqueIds = new Set(ids);
      if (ids.length !== uniqueIds.size) {
        const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
        console.error(`Duplicate IDs found in allowlist: ${duplicates.join(', ')}`);
        return false;
      }
      return true;
    })
  })
  .strict();

/**
 * An allowlist configuration (such as the allowed filter IDs)
 * as it appears in the YAML file.
 */
export type AllowlistConfig = z.infer<typeof AllowlistConfigSchema>;

/**
 * A parsed-from-YAML allowlist as it is used in the codebase.
 */
export const AllowlistSchema = z
  .object({
    filtersById: z.record(AllowlistConfigEntrySchema),
    optionsById: z.record(AllowlistConfigEntrySchema)
  })
  .strict();

/**
 * A parsed-from-YAML allowlist as it is used in the codebase.
 * The allowlist enforces consistency between the filter IDs
 * and option IDs used in the docs pages, so that any given
 * selection only needs to be made once
 * in order to be applied across every relevant page.
 *
 * @example
 * {
 *   filtersById: {
 *     host: {
 *       id: 'host',
 *       display_name: 'Host'
 *     }
 *   },
 *   optionsById: {
 *     gcp: {
 *       id: 'gcp',
 *       display_name: 'Google Cloud Platform'
 *     },
 *     aws: {
 *       id: 'aws',
 *       display_name: 'Amazon Web Services'
 *     }
 *   }
 * }
 */
export type Allowlist = z.infer<typeof AllowlistSchema>;
