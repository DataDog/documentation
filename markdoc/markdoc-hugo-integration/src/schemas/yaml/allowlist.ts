/**
 * The allowlist is used to ensure consistency between docs pages.
 * For example, for the cloud provider GCP, we want to ensure that
 * on every page where GCP is an option for the host filter,
 * the same pref ID is used (e.g. `host`) to represent the host filter,
 * and the same option ID is used (e.g. `gcp`) to represent the GCP option
 * for that host filter.
 *
 * This ensures that once the customer chooses GCP once as their host,
 * that preference will apply correctly to every relevant page they visit.
 *
 * The allowlist is defined in the preferences configuration YAML.
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
 * An allowlist configuration (such as the allowed pref IDs)
 * as it appears in the YAML file.
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
 * An allowlist configuration (such as the allowed pref IDs)
 * as it appears in the YAML file.
 */
export type AllowlistConfig = z.infer<typeof AllowlistConfigSchema>;

/**
 * A parsed-from-YAML allowlist as it is used in the codebase.
 */
export const AllowlistSchema = z
  .object({
    prefsById: z.record(AllowlistConfigEntrySchema),
    optionsById: z.record(AllowlistConfigEntrySchema)
  })
  .strict();

/**
 * A parsed-from-YAML allowlist as it is used in the codebase.
 * The allowlist enforces consistency between the pref IDs
 * and option IDs used in the docs pages, so that any given
 * customer preference only needs to be selected once
 * in order to be applied across every relevant page.
 *
 * @example
 * {
 *   prefsById: {
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
