/**
 * `apiCodeExamples` collection loader.
 *
 * Emits one entry per `(version, operationId)` carrying the operation's
 * SDK code examples (Python, Ruby, Go, Java, TypeScript). Locale-agnostic —
 * code examples aren't translated upstream.
 *
 * Curl variants are NOT generated here. They're produced at view-helper time
 * (`getEndpointsView`) from the operation's raw spec object, so curl
 * generation can resolve `$ref`s on demand without forcing the loader to do
 * heavy schema work.
 *
 * Syntax highlighting is also not done here — it runs at page render time.
 */

import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';
import { API_VERSIONS, getSpec } from '../spec';
import { getCodeExamplesForOperation } from '../examples';

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'] as const;

const CodeExampleEntrySchema = z.object({
  description: z.string(),
  code: z.string(),
  syntax: z.string(),
  highlightedCode: z.string().optional(),
  regionVariants: z
    .record(
      z.object({
        code: z.string(),
        highlightedCode: z.string().optional(),
      }),
    )
    .optional(),
});

const CodeExampleSetSchema = z.object({
  language: z.string(),
  label: z.string(),
  entries: z.array(CodeExampleEntrySchema),
});

export const apiCodeExamplesSchema = z.object({
  version: z.enum(['v1', 'v2']),
  operationId: z.string(),
  examples: z.array(CodeExampleSetSchema),
});

export function apiCodeExamplesLoader(): Loader {
  return {
    name: 'api-code-examples',
    load: async ({ store, parseData, logger }) => {
      store.clear();
      let count = 0;

      for (const version of API_VERSIONS) {
        const spec = getSpec(version);
        const paths = spec?.paths;
        if (!paths || typeof paths !== 'object') continue;

        for (const pathItem of Object.values(paths) as any[]) {
          if (!pathItem || typeof pathItem !== 'object') continue;

          for (const method of HTTP_METHODS) {
            const operation = pathItem[method];
            if (!operation || typeof operation !== 'object') continue;

            const operationId: string = operation.operationId ?? '';
            if (!operationId) continue;

            const tags: string[] = operation.tags ?? [];
            const primaryTag = tags[0] ?? '';

            const examples = getCodeExamplesForOperation(operationId, version, primaryTag);

            const id = `${version}/${operationId}`;
            const data = await parseData({
              id,
              data: { version, operationId, examples },
            });
            store.set({ id, data });
            count++;
          }
        }
      }

      logger.info(`Loaded ${count} API code-example entries`);
    },
  };
}
