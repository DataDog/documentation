/**
 * Page-time view helpers built on top of the API content collections.
 *
 * The `apiOperations` and `apiSchemas` collections store raw OpenAPI data
 * with `$ref`s preserved. These helpers re-resolve refs and assemble the
 * `EndpointData` / `ApiCategory` view shapes that the rendering components
 * (`ApiEndpoint`, `ApiSideNav`, the plaintext renderers) expect.
 *
 * Resolution at render time avoids duplicating shared schemas across many
 * referencing operations in the collection store.
 */

import { getCollection, getEntry } from 'astro:content';
import { DEFAULT_LOCALE, type Locale } from '../../lib/i18n/locale';
import { getSpec } from './spec';
import type { CodeExampleSet } from './examples';
import type { SchemaField } from './resolver';
import { paramsToFields } from './resolver';
import {
  splitParameters,
  extractRequestBody,
  extractResponses,
  buildCurlByRegion,
} from './operationData';

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

/**
 * Build the per-locale category list. Each category's `operations` is
 * populated from `apiOperations` entries (filtered by lang + categorySlug).
 * Sort matches Hugo: categories alphabetical by name, operations by menu
 * order then summary.
 */
export async function getCategoriesView(lang: Locale = DEFAULT_LOCALE): Promise<ApiCategory[]> {
  const [categories, operations] = await Promise.all([
    getCollection('apiCategories', (e) => e.data.lang === lang),
    getCollection('apiOperations', (e) => e.data.lang === lang),
  ]);

  const opsByCategory = new Map<string, ApiOperationStub[]>();
  for (const op of operations) {
    const list = opsByCategory.get(op.data.categorySlug) ?? [];
    list.push({
      operationId: op.data.operationId,
      summary: op.data.summary,
      slug: op.data.slug,
      menuOrder: op.data.menuOrder,
      version: op.data.version,
    });
    opsByCategory.set(op.data.categorySlug, list);
  }

  const result: ApiCategory[] = categories.map((cat) => {
    const ops = opsByCategory.get(cat.data.slug) ?? [];
    ops.sort((a, b) => a.menuOrder - b.menuOrder || a.summary.localeCompare(b.summary));
    return {
      name: cat.data.name,
      slug: cat.data.slug,
      description: cat.data.description,
      operations: ops,
      deprecated: cat.data.deprecated,
    };
  });

  result.sort((a, b) => a.name.localeCompare(b.name));
  return result;
}

export async function getCategoryViewBySlug(
  slug: string,
  lang: Locale = DEFAULT_LOCALE,
): Promise<ApiCategory | undefined> {
  const all = await getCategoriesView(lang);
  return all.find((c) => c.slug === slug);
}

/**
 * Resolve all endpoints for a category into the `EndpointData` view shape.
 * Walks each operation's raw OpenAPI object, resolves `$ref`s, runs
 * `extractRequestBody` / `extractResponses` / `paramsToFields`, generates
 * curl variants, and stitches in SDK examples from `apiCodeExamples`.
 */
export async function getEndpointsView(
  slug: string,
  lang: Locale = DEFAULT_LOCALE,
): Promise<EndpointData[]> {
  const operations = await getCollection(
    'apiOperations',
    (e) => e.data.lang === lang && e.data.categorySlug === slug,
  );

  operations.sort((a, b) => {
    if (a.data.menuOrder !== b.data.menuOrder) return a.data.menuOrder - b.data.menuOrder;
    return a.data.summary.localeCompare(b.data.summary);
  });

  const codeExampleEntries = await Promise.all(
    operations.map((op) => getEntry(op.data.codeExamplesId)),
  );

  return operations.map((op, i) => {
    const spec = getSpec(op.data.version);
    const operation = op.data.raw;

    // --- Parameters ---
    const params = splitParameters(spec, operation.parameters);
    const pathParams = params.path.length > 0 ? paramsToFields(spec, params.path) : undefined;
    const queryParams = params.query.length > 0 ? paramsToFields(spec, params.query) : undefined;
    const headerParams = params.header.length > 0 ? paramsToFields(spec, params.header) : undefined;

    // --- Request body (with translated overrides applied) ---
    const requestBody = extractRequestBody(spec, operation);
    if (requestBody) {
      if (op.data.requestDescription !== undefined) {
        requestBody.description = op.data.requestDescription || undefined;
      }
      if (op.data.requestSchemaDescription !== undefined && requestBody.schema.length > 0) {
        requestBody.schema[0].description = op.data.requestSchemaDescription;
      }
    }

    // --- Responses ---
    const responses = extractResponses(spec, operation);

    // --- Curl variants per region ---
    const requestBodyJson = requestBody?.examples?.[0]?.value;
    const curlByRegion = buildCurlByRegion(
      spec,
      op.data.method.toLowerCase(),
      op.data.path,
      operation,
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

    // --- SDK examples from sibling collection ---
    const sdkExamples = (codeExampleEntries[i]?.data.examples ?? []) as CodeExampleSet[];

    const codeExamples: CodeExampleSet[] = [
      {
        language: 'curl',
        label: 'Curl',
        entries: [
          {
            description: `${op.data.summary} curl example`,
            code: defaultCurl,
            syntax: 'bash',
            regionVariants: curlVariants,
          },
        ],
      },
      // Deep-clone the SDK examples — `highlightEndpoints` mutates these and
      // collection-entry data is frozen.
      ...(structuredClone(sdkExamples) as CodeExampleSet[]),
    ];

    return {
      operationId: op.data.operationId,
      summary: op.data.summary,
      slug: op.data.slug,
      method: op.data.method,
      path: op.data.path,
      description: op.data.description,
      version: op.data.version,
      deprecated: op.data.deprecated,
      unstable: op.data.unstable,
      unstableMessage: op.data.unstableMessage,
      permissions: op.data.permissions,
      oauthScopes: op.data.oauthScopes,
      regionUrls: op.data.regionUrls,
      pathParams,
      queryParams,
      headerParams,
      requestBody,
      responses,
      codeExamples,
    };
  });
}
