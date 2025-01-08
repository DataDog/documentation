/**
 * The glossary is used to ensure consistency between docs pages.
 * For example, for the cloud provider GCP, we want to ensure that
 * on every page where GCP is an option for the host filter,
 * the same filter ID is used (e.g. `host`) to represent the host filter,
 * and the same option ID is used (e.g. `gcp`) to represent the GCP option
 * for that host filter.
 *
 * This ensures that once the customer chooses GCP once as their host,
 * that filter will apply correctly to every relevant page they visit.
 *
 * The glossary is defined in the filters configuration YAML.
 */
import { z } from 'zod';
import { SNAKE_CASE_REGEX } from '../regexes';

/**
 * A single entry in a glossary.
 */
export const GlossaryEntryConfigSchema = z
  .object({
    id: z.string().regex(SNAKE_CASE_REGEX),
    display_name: z.string(),
    description: z.string().optional()
  })
  .strict();

/**
 * A single entry in a glossary.
 *
 * @example
 * {
 *   id: 'host',
 *   display_name: 'Host'
 * }
 */
export type GlossaryEntryConfig = z.infer<typeof GlossaryEntryConfigSchema>;

/**
 * A glossary configuration (such as the allowed filter IDs)
 * as it is parsed directly from the YAML file.
 */
export const GlossaryConfigSchema = z
  .object({
    allowed: z.array(GlossaryEntryConfigSchema).refine((entries) => {
      const ids = entries.map((entry) => entry.id);
      const uniqueIds = new Set(ids);
      if (ids.length !== uniqueIds.size) {
        const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
        console.error(`Duplicate IDs found in glossary: ${duplicates.join(', ')}`);
        return false;
      }
      return true;
    })
  })
  .strict();

/**
 * A glossary configuration (such as the allowed filter IDs)
 * as it appears in the YAML file.
 */
export type GlossaryConfig = z.infer<typeof GlossaryConfigSchema>;

/**
 * A parsed-from-YAML glossary as it is used in the codebase.
 */
export const GlossarySchema = z
  .object({
    filtersById: z.record(GlossaryEntryConfigSchema),
    optionsById: z.record(GlossaryEntryConfigSchema)
  })
  .strict();

/**
 * A parsed-from-YAML glossary as it is used in the codebase.
 * The glossary enforces consistency between the filter IDs
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
export type Glossary = z.infer<typeof GlossarySchema>;
