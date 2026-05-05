/**
 * `apiSchemas` collection loader.
 *
 * Emits one entry per `(version, schemaName)` from `components.schemas` in
 * the v1 and v2 specs. Locale-agnostic — schemas aren't translated upstream.
 *
 * Each entry stores the schema's raw OpenAPI definition (with `$ref`s
 * intact). Consumers that need a resolved `SchemaField[]` tree call
 * `schemaToFields(getSpec(version), entry.data.raw)` at render time.
 * Storing the unresolved form avoids duplicating shared schemas across many
 * referencing operations.
 */

import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';
import { API_VERSIONS, getSpec } from '../spec';
import { renderMarkdown } from '../markdown';

export const apiSchemasSchema = z.object({
  version: z.enum(['v1', 'v2']),
  name: z.string(),
  /** Rendered HTML of the schema's top-level description (Markdown source). */
  description: z.string(),
  deprecated: z.boolean(),
  /** Raw OpenAPI schema object. `$ref`s are preserved. */
  raw: z.any(),
});

export function apiSchemasLoader(): Loader {
  return {
    name: 'api-schemas',
    load: async ({ store, parseData, logger }) => {
      store.clear();
      let count = 0;

      for (const version of API_VERSIONS) {
        const spec = getSpec(version);
        const schemas = spec?.components?.schemas;
        if (!schemas || typeof schemas !== 'object') continue;

        for (const [name, schema] of Object.entries(schemas) as [string, any][]) {
          const id = `${version}/${name}`;
          const data = await parseData({
            id,
            data: {
              version,
              name,
              description: schema?.description ? renderMarkdown(schema.description) : '',
              deprecated: schema?.deprecated === true,
              raw: schema,
            },
          });
          store.set({ id, data });
          count++;
        }
      }

      logger.info(`Loaded ${count} API schema entries`);
    },
  };
}
