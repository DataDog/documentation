/**
 * `apiOperations` collection loader.
 *
 * Emits one entry per `(lang, version, operationId)`. Each entry holds the
 * operation's raw OpenAPI object (with `$ref`s intact and path-level +
 * operation-level parameters merged into `raw.parameters`) plus per-locale
 * metadata: translated summary/description, slug, menu order, region URLs,
 * permissions, OAuth scopes, and references to translation overrides for the
 * request body.
 *
 * Resolution into a `SchemaField[]` tree, request-body extraction, and
 * response extraction happen at view-helper time, not in this loader. That
 * avoids duplicating shared schemas (which the spec heavily reuses across
 * operations) into each entry.
 *
 * Code examples + curl variants live in the sibling `apiCodeExamples`
 * collection.
 */

import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';
import { reference } from 'astro:content';
import { API_VERSIONS, getSpec } from '../spec';
import { LOCALES, type Locale } from '../../../lib/i18n/locale';
import { renderMarkdown, renderMarkdownInline } from '../markdown';
import { getRegions, buildApiUrlFromServers } from '../regions';
import { getOverlay, translateAction } from '../translations';
import {
  extractPermissions,
  extractOauthScopes,
} from '../operationData';

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'] as const;

const SLUG_OVERRIDES: Record<string, string> = {
  'case-management': 'cases',
  'scorecards': 'service-scorecards',
};

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const apiOperationsSchema = z.object({
  lang: z.enum(LOCALES),
  version: z.enum(['v1', 'v2']),
  operationId: z.string(),
  categorySlug: z.string(),
  summary: z.string(),
  slug: z.string(),
  method: z.string(),
  path: z.string(),
  description: z.string(),
  deprecated: z.boolean(),
  unstable: z.boolean(),
  unstableMessage: z.string().optional(),
  permissions: z.array(z.string()).optional(),
  oauthScopes: z.array(z.string()).optional(),
  regionUrls: z.record(z.string()),
  menuOrder: z.number(),
  /** Translated overrides applied to the request body at view time. */
  requestDescription: z.string().optional(),
  requestSchemaDescription: z.string().optional(),
  /** Raw OpenAPI operation object with merged `parameters`. `$ref`s intact. */
  raw: z.any(),
  codeExamplesId: reference('apiCodeExamples'),
});

export function apiOperationsLoader(): Loader {
  return {
    name: 'api-operations',
    load: async ({ store, parseData, logger }) => {
      store.clear();
      let count = 0;

      for (const lang of LOCALES) {
        for (const version of API_VERSIONS) {
          const spec = getSpec(version);
          const paths = spec?.paths;
          if (!paths || typeof paths !== 'object') continue;
          const overlay = getOverlay(version, lang as Locale);

          for (const [pathStr, pathItem] of Object.entries(paths) as [string, any][]) {
            if (!pathItem || typeof pathItem !== 'object') continue;

            for (const method of HTTP_METHODS) {
              const operation = pathItem[method];
              if (!operation || typeof operation !== 'object') continue;

              const tags: string[] = operation.tags;
              if (!tags || !Array.isArray(tags) || tags.length === 0) continue;

              const operationId: string = operation.operationId ?? '';
              if (!operationId) continue;

              const primaryTag = tags[0];
              const rawSlug = toSlug(primaryTag);
              const categorySlug = SLUG_OVERRIDES[rawSlug] ?? rawSlug;

              const action = translateAction(overlay, operationId);
              const summary: string = action.summary ?? operation.summary ?? '';
              const description: string = renderMarkdown(action.description ?? operation.description ?? '');
              const deprecated: boolean = operation.deprecated === true;
              const unstable: boolean = !!operation['x-unstable'];
              const unstableMessage: string | undefined =
                typeof operation['x-unstable'] === 'string'
                  ? renderMarkdownInline(operation['x-unstable'])
                  : undefined;

              const permissions = extractPermissions(operation);
              const oauthScopes = extractOauthScopes(operation.security);

              const regions = getRegions(spec, operation);
              const operationServers = operation?.servers ?? spec?.servers;
              const regionUrls: Record<string, string> = {};
              for (const region of regions) {
                regionUrls[region.key] = buildApiUrlFromServers(operationServers, region.site, pathStr);
              }

              const menuOrder: number = operation['x-menu-order'] ?? 999;

              // Slug derived from the untranslated English summary so deep
              // links survive locale switches (matches Hugo behavior).
              const slug = toSlug(operation.summary ?? '');

              // Merge path-level + operation-level parameters into the raw
              // operation object so the view helper has everything it needs
              // in a single place.
              const mergedParameters = [
                ...(pathItem.parameters ?? []),
                ...(operation.parameters ?? []),
              ];
              const raw = { ...operation, parameters: mergedParameters };

              // Action-level translation overrides for the request body.
              // The view helper applies these after extracting the request
              // body from `raw`.
              const requestDescription: string | undefined =
                action.request_description !== undefined
                  ? action.request_description
                    ? renderMarkdownInline(action.request_description)
                    : ''
                  : undefined;
              const requestSchemaDescription: string | undefined =
                action.request_schema_description ?? undefined;

              const id = `${lang}/${version}/${operationId}`;
              const data = await parseData({
                id,
                data: {
                  lang,
                  version,
                  operationId,
                  categorySlug,
                  summary,
                  slug,
                  method: method.toUpperCase(),
                  path: pathStr,
                  description,
                  deprecated,
                  unstable,
                  unstableMessage,
                  permissions,
                  oauthScopes,
                  regionUrls,
                  menuOrder,
                  requestDescription,
                  requestSchemaDescription,
                  raw,
                  codeExamplesId: `${version}/${operationId}`,
                },
              });
              store.set({ id, data });
              count++;
            }
          }
        }
      }

      logger.info(`Loaded ${count} API operation entries`);
    },
  };
}
