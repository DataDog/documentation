/**
 * Page-time view helpers for the API docs.
 *
 * Walks the parsed OpenAPI specs directly and assembles the `EndpointData`
 * and `ApiCategory` view shapes that rendering components consume. Results
 * are memoized per-locale (categories) and per `(locale, slug)` pair
 * (endpoints) to avoid re-walking on each call within a build.
 */

import { DEFAULT_LOCALE, LOCALES, type Locale } from '../../lib/i18n/locale';
import { API_VERSIONS, getSpec, type ApiVersion } from './spec';
import { renderMarkdown, renderMarkdownInline } from './markdown';
import { getRegions, buildApiUrlFromServers } from './regions';
import { getOverlay, translateAction, translateTag } from './translations';
import {
  splitParameters,
  extractRequestBody,
  extractResponses,
  extractPermissions,
  extractOauthScopes,
  buildCurlByRegion,
} from './operationData';
import { paramsToFields, type SchemaField } from './resolver';
import { getCodeExamplesForOperation, type CodeExampleSet } from './examples';

export interface ApiOperationStub {
  operationId: string;
  summary: string;
  slug: string;
  menuOrder: number;
  version: 'v1' | 'v2';
}

export interface ApiCategory {
  name: string;
  slug: string;
  description: string;
  operations: ApiOperationStub[];
  deprecated: boolean;
}

export interface ResponseData {
  statusCode: string;
  description: string;
  schema?: SchemaField[];
  examples?: Array<{ name: string; value: string; highlightedValue?: string }>;
}

export interface RequestBodyData {
  required: boolean;
  description?: string;
  schema: SchemaField[];
  examples: Array<{ name: string; value: string; highlightedValue?: string }>;
}

export interface EndpointData {
  operationId: string;
  summary: string;
  slug: string;
  method: string;
  path: string;
  description: string;
  version: 'v1' | 'v2';
  deprecated: boolean;
  unstable: boolean;
  unstableMessage?: string;
  newerVersionUrl?: string;
  permissions?: string[];
  oauthScopes?: string[];
  regionUrls?: Record<string, string>;
  pathParams?: SchemaField[];
  queryParams?: SchemaField[];
  headerParams?: SchemaField[];
  requestBody?: RequestBodyData;
  responses: ResponseData[];
  codeExamples: CodeExampleSet[];
}

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

const categoriesCache = new Map<Locale, ApiCategory[]>();
const endpointsCache = new Map<string, EndpointData[]>();

interface RawOperation {
  version: ApiVersion;
  pathStr: string;
  method: string;
  operation: any;
  pathItem: any;
  primaryTag: string;
  categorySlug: string;
}

let _allOperations: RawOperation[] | null = null;

function getAllOperations(): RawOperation[] {
  if (_allOperations) return _allOperations;
  const result: RawOperation[] = [];

  for (const version of API_VERSIONS) {
    const spec = getSpec(version);
    const paths = spec?.paths;
    if (!paths || typeof paths !== 'object') continue;

    for (const [pathStr, pathItem] of Object.entries(paths) as [string, any][]) {
      if (!pathItem || typeof pathItem !== 'object') continue;

      for (const method of HTTP_METHODS) {
        const operation = pathItem[method];
        if (!operation || typeof operation !== 'object') continue;

        const tags: string[] = operation.tags;
        if (!tags || !Array.isArray(tags) || tags.length === 0) continue;
        if (!operation.operationId) continue;

        const primaryTag = tags[0];
        const rawSlug = toSlug(primaryTag);
        const categorySlug = SLUG_OVERRIDES[rawSlug] ?? rawSlug;

        result.push({ version, pathStr, method, operation, pathItem, primaryTag, categorySlug });
      }
    }
  }

  _allOperations = result;
  return result;
}

function buildCategories(lang: Locale): ApiCategory[] {
  interface CategoryMeta {
    name: string;
    slug: string;
    description: string;
    deprecated: boolean;
  }

  const categoryMap = new Map<string, CategoryMeta>();
  const opsByCategory = new Map<string, ApiOperationStub[]>();

  for (const version of API_VERSIONS) {
    const spec = getSpec(version);
    const overlay = getOverlay(version, lang);

    for (const tag of spec?.tags ?? []) {
      const rawSlug = toSlug(tag.name);
      const slug = SLUG_OVERRIDES[rawSlug] ?? rawSlug;
      if (categoryMap.has(slug)) continue;

      const translated = translateTag(overlay, slug, {
        name: tag.name,
        description: tag.description,
      });
      categoryMap.set(slug, {
        name: translated.name,
        slug,
        description: translated.description ? renderMarkdown(translated.description) : '',
        deprecated: tag['x-deprecated'] === true,
      });
    }
  }

  for (const op of getAllOperations()) {
    const overlay = getOverlay(op.version, lang);

    if (!categoryMap.has(op.categorySlug)) {
      const translated = translateTag(overlay, op.categorySlug, { name: op.primaryTag });
      categoryMap.set(op.categorySlug, {
        name: translated.name,
        slug: op.categorySlug,
        description: '',
        deprecated: false,
      });
    }

    const operationId: string = op.operation.operationId;
    const action = translateAction(overlay, operationId);
    const summary: string = action.summary ?? op.operation.summary ?? '';
    const menuOrder: number = op.operation['x-menu-order'] ?? 999;
    const slug = toSlug(op.operation.summary ?? '');

    const list = opsByCategory.get(op.categorySlug) ?? [];
    list.push({
      operationId,
      summary,
      slug,
      menuOrder,
      version: op.version,
    });
    opsByCategory.set(op.categorySlug, list);
  }

  const result: ApiCategory[] = [];
  for (const meta of Array.from(categoryMap.values())) {
    const ops = opsByCategory.get(meta.slug) ?? [];
    ops.sort((a, b) => a.menuOrder - b.menuOrder || a.summary.localeCompare(b.summary));
    result.push({
      name: meta.name,
      slug: meta.slug,
      description: meta.description,
      operations: ops,
      deprecated: meta.deprecated,
    });
  }

  result.sort((a, b) => a.name.localeCompare(b.name));
  return result;
}

export async function getCategoriesView(lang: Locale = DEFAULT_LOCALE): Promise<ApiCategory[]> {
  if (!LOCALES.includes(lang)) lang = DEFAULT_LOCALE;
  const cached = categoriesCache.get(lang);
  if (cached) return cached;
  const built = buildCategories(lang);
  categoriesCache.set(lang, built);
  return built;
}

export async function getCategoryViewBySlug(
  slug: string,
  lang: Locale = DEFAULT_LOCALE,
): Promise<ApiCategory | undefined> {
  const all = await getCategoriesView(lang);
  return all.find((c) => c.slug === slug);
}

function buildEndpoints(slug: string, lang: Locale): EndpointData[] {
  const matches: RawOperation[] = getAllOperations().filter(
    (op) => op.categorySlug === slug,
  );

  matches.sort((a, b) => {
    const ao: number = a.operation['x-menu-order'] ?? 999;
    const bo: number = b.operation['x-menu-order'] ?? 999;
    if (ao !== bo) return ao - bo;
    const aSummary: string = a.operation.summary ?? '';
    const bSummary: string = b.operation.summary ?? '';
    return aSummary.localeCompare(bSummary);
  });

  return matches.map((op) => {
    const spec = getSpec(op.version);
    const overlay = getOverlay(op.version, lang);
    const operationId: string = op.operation.operationId;
    const action = translateAction(overlay, operationId);

    const summary: string = action.summary ?? op.operation.summary ?? '';
    const description: string = renderMarkdown(action.description ?? op.operation.description ?? '');
    const deprecated: boolean = op.operation.deprecated === true;
    const unstable: boolean = !!op.operation['x-unstable'];
    const unstableMessage: string | undefined =
      typeof op.operation['x-unstable'] === 'string'
        ? renderMarkdownInline(op.operation['x-unstable'])
        : undefined;

    const permissions = extractPermissions(op.operation);
    const oauthScopes = extractOauthScopes(op.operation.security);

    const regions = getRegions(spec, op.operation);
    const operationServers = op.operation?.servers ?? spec?.servers;
    const regionUrls: Record<string, string> = {};
    for (const region of regions) {
      regionUrls[region.key] = buildApiUrlFromServers(operationServers, region.site, op.pathStr);
    }

    const opSlug = toSlug(op.operation.summary ?? '');

    const mergedParameters = [
      ...(op.pathItem.parameters ?? []),
      ...(op.operation.parameters ?? []),
    ];
    const params = splitParameters(spec, mergedParameters);
    const pathParams = params.path.length > 0 ? paramsToFields(spec, params.path) : undefined;
    const queryParams = params.query.length > 0 ? paramsToFields(spec, params.query) : undefined;
    const headerParams = params.header.length > 0 ? paramsToFields(spec, params.header) : undefined;

    const requestBody = extractRequestBody(spec, op.operation);
    if (requestBody) {
      if (action.request_description !== undefined) {
        requestBody.description = action.request_description
          ? renderMarkdownInline(action.request_description)
          : undefined;
      }
      if (action.request_schema_description !== undefined && requestBody.schema.length > 0) {
        requestBody.schema[0].description = action.request_schema_description;
      }
    }

    const responses = extractResponses(spec, op.operation);

    const requestBodyJson = requestBody?.examples?.[0]?.value;
    const curlByRegion = buildCurlByRegion(
      spec,
      op.method,
      op.pathStr,
      op.operation,
      params,
      requestBodyJson,
    );
    const regionKeys = Object.keys(curlByRegion);
    const defaultRegionKey = regionKeys[0] ?? 'us';
    const defaultCurl = curlByRegion[defaultRegionKey] ?? '';
    const curlVariants: Record<string, { code: string }> = {};
    for (const [key, code] of Object.entries(curlByRegion)) {
      curlVariants[key] = { code };
    }

    const sdkExamples = getCodeExamplesForOperation(operationId, op.version, op.primaryTag);

    const codeExamples: CodeExampleSet[] = [
      {
        language: 'curl',
        label: 'Curl',
        entries: [
          {
            description: `${summary} curl example`,
            code: defaultCurl,
            syntax: 'bash',
            regionVariants: curlVariants,
          },
        ],
      },
      ...sdkExamples,
    ];

    return {
      operationId,
      summary,
      slug: opSlug,
      method: op.method.toUpperCase(),
      path: op.pathStr,
      description,
      version: op.version,
      deprecated,
      unstable,
      unstableMessage,
      permissions,
      oauthScopes,
      regionUrls,
      pathParams,
      queryParams,
      headerParams,
      requestBody,
      responses,
      codeExamples,
    };
  });
}

export async function getEndpointsView(
  slug: string,
  lang: Locale = DEFAULT_LOCALE,
): Promise<EndpointData[]> {
  if (!LOCALES.includes(lang)) lang = DEFAULT_LOCALE;
  const key = `${lang}:${slug}`;
  const cached = endpointsCache.get(key);
  if (cached) return cached;
  const built = buildEndpoints(slug, lang);
  endpointsCache.set(key, built);
  return built;
}
