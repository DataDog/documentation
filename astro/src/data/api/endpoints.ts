/**
 * Main endpoint data extraction module for API documentation.
 *
 * Wires together spec parsing, schema resolution, region data, curl
 * generation, and SDK code examples to produce a complete EndpointData
 * array for each API category.
 */

import { parse as parseYaml } from 'yaml';

// @ts-ignore — Vite raw import
import v1Raw from './v1/full_spec.yaml?raw';
// @ts-ignore — Vite raw import
import v2Raw from './v2/full_spec.yaml?raw';

import { resolveRef, schemaToFields, paramsToFields } from './resolver';
import type { SchemaField } from './resolver';
import { generateCurl } from './curl';
import type { CurlParam } from './curl';
import { getCodeExamplesForOperation } from './examples';
import type { CodeExampleSet } from './examples';
import { renderMarkdown, renderMarkdownInline } from './markdown';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ResponseData {
  statusCode: string;
  description: string;
  schema?: SchemaField[];
  examples?: Array<{ name: string; value: string }>;
}

export interface RequestBodyData {
  required: boolean;
  description?: string;
  schema: SchemaField[];
  examples: Array<{ name: string; value: string }>;
}

export interface EndpointData {
  operationId: string;
  summary: string;
  slug: string;
  method: string;
  path: string;
  /** HTML description rendered from the spec's Markdown */
  description: string;
  version: 'v1' | 'v2';
  deprecated: boolean;
  unstable: boolean;
  /** URL to a newer version of this endpoint, if one exists */
  newerVersionUrl?: string;
  /** Required permissions from x-permission */
  permissions?: string[];
  /** OAuth scopes from the AuthZ security requirement */
  oauthScopes?: string[];
  pathParams?: SchemaField[];
  queryParams?: SchemaField[];
  headerParams?: SchemaField[];
  requestBody?: RequestBodyData;
  responses: ResponseData[];
  codeExamples: CodeExampleSet[];
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function operationSlug(summary: string): string {
  return toSlug(summary);
}

/* ------------------------------------------------------------------ */
/*  Spec parsing                                                       */
/* ------------------------------------------------------------------ */

const specRaw: Record<'v1' | 'v2', string> = { v1: v1Raw, v2: v2Raw };

/** Cache of parsed spec objects, keyed by version. */
const specCache = new Map<string, any>();

function getSpec(version: 'v1' | 'v2'): any {
  if (specCache.has(version)) return specCache.get(version);
  const parsed = parseYaml(specRaw[version]);
  specCache.set(version, parsed);
  return parsed;
}

/* ------------------------------------------------------------------ */
/*  Parameter splitting                                                */
/* ------------------------------------------------------------------ */

interface SplitParams {
  path: any[];
  query: any[];
  header: any[];
}

/**
 * Split an array of OpenAPI parameter objects by their `in` field,
 * resolving any $ref pointers along the way.
 */
function splitParameters(spec: any, params?: any[]): SplitParams {
  const result: SplitParams = { path: [], query: [], header: [] };

  if (!params || !Array.isArray(params)) return result;

  for (const param of params) {
    const resolved = param.$ref ? resolveRef(spec, param.$ref) ?? param : param;
    const location = resolved.in as string;

    if (location === 'path') result.path.push(resolved);
    else if (location === 'query') result.query.push(resolved);
    else if (location === 'header') result.header.push(resolved);
  }

  return result;
}

/* ------------------------------------------------------------------ */
/*  Permission / OAuth extraction                                      */
/* ------------------------------------------------------------------ */

/**
 * Extract permission names from the `x-permission` extension.
 *
 * Structure: `{ operator: 'AND' | 'OR', permissions: string[] }`
 */
function extractPermissions(operation: any): string[] | undefined {
  const xPerm = operation['x-permission'];
  if (!xPerm?.permissions || !Array.isArray(xPerm.permissions)) return undefined;
  return xPerm.permissions;
}

/**
 * Extract OAuth scopes from the `security` block's AuthZ requirement.
 */
function extractOauthScopes(security?: any[]): string[] | undefined {
  if (!security || !Array.isArray(security)) return undefined;

  for (const requirement of security) {
    if (requirement.AuthZ && Array.isArray(requirement.AuthZ) && requirement.AuthZ.length > 0) {
      return requirement.AuthZ;
    }
  }

  return undefined;
}

/* ------------------------------------------------------------------ */
/*  Request body extraction                                            */
/* ------------------------------------------------------------------ */

/**
 * Extract request body schema and examples from the operation.
 */
function extractRequestBody(spec: any, operation: any): RequestBodyData | undefined {
  const rb = operation.requestBody;
  if (!rb) return undefined;

  // Resolve $ref on the requestBody itself
  const resolved = rb.$ref ? resolveRef(spec, rb.$ref) ?? rb : rb;

  const content = resolved.content;
  if (!content) return undefined;

  // Prefer application/json
  const jsonContent = content['application/json'];
  if (!jsonContent) return undefined;

  // Schema
  const schema = jsonContent.schema
    ? schemaToFields(spec, jsonContent.schema)
    : [];

  // Examples — named examples or a single example
  const examples: Array<{ name: string; value: string }> = [];

  if (jsonContent.examples && typeof jsonContent.examples === 'object') {
    for (const [name, exampleObj] of Object.entries(jsonContent.examples) as [string, any][]) {
      const resolved = exampleObj?.$ref
        ? resolveRef(spec, exampleObj.$ref) ?? exampleObj
        : exampleObj;

      if (resolved?.value !== undefined) {
        examples.push({
          name: resolved.summary ?? name,
          value: JSON.stringify(resolved.value, null, 2),
        });
      }
    }
  } else if (jsonContent.example !== undefined) {
    examples.push({
      name: 'Example',
      value: JSON.stringify(jsonContent.example, null, 2),
    });
  }

  // If no explicit examples, try to generate one from the schema
  if (examples.length === 0 && jsonContent.schema) {
    const generated = generateExampleFromSchema(spec, jsonContent.schema);
    if (generated !== undefined) {
      examples.push({
        name: 'Example',
        value: JSON.stringify(generated, null, 2),
      });
    }
  }

  return {
    required: resolved.required === true,
    description: resolved.description ? renderMarkdownInline(resolved.description) : undefined,
    schema,
    examples,
  };
}

/* ------------------------------------------------------------------ */
/*  Response extraction                                                */
/* ------------------------------------------------------------------ */

/**
 * Extract response data for all status codes defined on the operation.
 */
function extractResponses(spec: any, operation: any): ResponseData[] {
  const responses = operation.responses;
  if (!responses || typeof responses !== 'object') return [];

  const result: ResponseData[] = [];

  for (const [statusCode, responseObj] of Object.entries(responses) as [string, any][]) {
    const resolved = responseObj?.$ref
      ? resolveRef(spec, responseObj.$ref) ?? responseObj
      : responseObj;

    const description: string = renderMarkdownInline(resolved?.description ?? '');

    // Schema
    let schema: SchemaField[] | undefined;
    const jsonContent = resolved?.content?.['application/json'];
    if (jsonContent?.schema) {
      schema = schemaToFields(spec, jsonContent.schema);
    }

    // Examples
    let examples: Array<{ name: string; value: string }> | undefined;
    if (jsonContent?.examples && typeof jsonContent.examples === 'object') {
      examples = [];
      for (const [name, exampleObj] of Object.entries(jsonContent.examples) as [string, any][]) {
        const resolvedExample = exampleObj?.$ref
          ? resolveRef(spec, exampleObj.$ref) ?? exampleObj
          : exampleObj;

        if (resolvedExample?.value !== undefined) {
          examples.push({
            name: resolvedExample.summary ?? name,
            value: JSON.stringify(resolvedExample.value, null, 2),
          });
        }
      }
      if (examples.length === 0) examples = undefined;
    } else if (jsonContent?.example !== undefined) {
      examples = [{
        name: 'Example',
        value: JSON.stringify(jsonContent.example, null, 2),
      }];
    }

    result.push({ statusCode, description, schema, examples });
  }

  // Sort by status code (2xx first, then 4xx, then 5xx)
  result.sort((a, b) => a.statusCode.localeCompare(b.statusCode));

  return result;
}

/* ------------------------------------------------------------------ */
/*  Example generation from schema                                     */
/* ------------------------------------------------------------------ */

/** Maximum depth for example generation to prevent infinite recursion. */
const EXAMPLE_MAX_DEPTH = 6;

/**
 * Attempt to build a sample JSON value from a schema by using `example`
 * fields on properties. Returns `undefined` if no useful example can
 * be constructed.
 */
function generateExampleFromSchema(spec: any, schema: any, depth = 0): any {
  if (!schema || depth > EXAMPLE_MAX_DEPTH) return undefined;

  // Resolve $ref
  if (schema.$ref) {
    const resolved = resolveRef(spec, schema.$ref);
    if (!resolved) return undefined;
    return generateExampleFromSchema(spec, resolved, depth + 1);
  }

  // Direct example on the schema
  if (schema.example !== undefined) return schema.example;

  // allOf — merge
  if (schema.allOf) {
    const merged: any = {};
    let hasValue = false;
    for (const sub of schema.allOf) {
      const val = generateExampleFromSchema(spec, sub, depth + 1);
      if (val !== undefined && typeof val === 'object' && !Array.isArray(val)) {
        Object.assign(merged, val);
        hasValue = true;
      }
    }
    return hasValue ? merged : undefined;
  }

  // oneOf / anyOf — use first option
  const unionKey = schema.oneOf ? 'oneOf' : schema.anyOf ? 'anyOf' : null;
  if (unionKey) {
    const variants = schema[unionKey];
    if (Array.isArray(variants) && variants.length > 0) {
      return generateExampleFromSchema(spec, variants[0], depth + 1);
    }
    return undefined;
  }

  // Object with properties
  if (schema.type === 'object' || schema.properties) {
    const properties = schema.properties;
    if (!properties) return undefined;

    const obj: any = {};
    let hasValue = false;

    for (const [propName, propSchema] of Object.entries(properties) as [string, any][]) {
      const val = generateExampleFromSchema(spec, propSchema, depth + 1);
      if (val !== undefined) {
        obj[propName] = val;
        hasValue = true;
      }
    }

    return hasValue ? obj : undefined;
  }

  // Array
  if (schema.type === 'array' && schema.items) {
    const itemExample = generateExampleFromSchema(spec, schema.items, depth + 1);
    if (itemExample !== undefined) return [itemExample];
    return undefined;
  }

  // Enum — use the first value
  if (schema.enum && schema.enum.length > 0) {
    return schema.enum[0];
  }

  // Default value
  if (schema.default !== undefined) return schema.default;

  return undefined;
}

/* ------------------------------------------------------------------ */
/*  Curl generation bridge                                             */
/* ------------------------------------------------------------------ */

/**
 * Build curl params from resolved parameter objects.
 */
function toCurlParams(params: any[]): CurlParam[] {
  return params.map((p) => {
    const schema = p.schema;
    const example = p.example ?? schema?.example ?? schema?.default;
    return {
      name: p.name,
      example: example !== undefined ? String(example) : undefined,
      required: p.required === true,
    };
  });
}

/**
 * Generate a curl command for the given operation.
 */
function buildCurl(
  spec: any,
  method: string,
  path: string,
  operation: any,
  splitParams: SplitParams,
  requestBodyJson?: string
): string {
  return generateCurl({
    method,
    path,
    site: 'datadoghq.com',
    pathParams: toCurlParams(splitParams.path),
    queryParams: toCurlParams(splitParams.query),
    requestBodyJson,
    security: operation.security,
  });
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

/** Cache of endpoint data per category slug. */
const endpointCache = new Map<string, EndpointData[]>();

/**
 * Get all endpoint data for a given API category slug.
 *
 * Parses both v1 and v2 specs, extracts operations matching the category
 * (by first tag), resolves all schemas, loads code examples, and generates
 * curl commands.
 *
 * Results are cached after the first call for each slug.
 */
export function getEndpointsForCategory(slug: string): EndpointData[] {
  if (endpointCache.has(slug)) return endpointCache.get(slug)!;

  const endpoints: EndpointData[] = [];

  for (const version of ['v1', 'v2'] as const) {
    const spec = getSpec(version);
    const paths = spec.paths;

    if (!paths || typeof paths !== 'object') continue;

    for (const [pathStr, pathItem] of Object.entries(paths) as [string, any][]) {
      if (!pathItem || typeof pathItem !== 'object') continue;

      for (const method of ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']) {
        const operation = pathItem[method];
        if (!operation || typeof operation !== 'object') continue;

        // Check if this operation belongs to the requested category
        const tags: string[] = operation.tags;
        if (!tags || !Array.isArray(tags) || tags.length === 0) continue;

        const primaryTag = tags[0];
        const categorySlug = toSlug(primaryTag);
        if (categorySlug !== slug) continue;

        // --- Core fields ---
        const operationId: string = operation.operationId ?? '';
        const summary: string = operation.summary ?? '';
        const description: string = renderMarkdown(operation.description ?? '');
        const deprecated: boolean = operation.deprecated === true;
        const unstable: boolean = !!operation['x-unstable'];

        // --- Parameters ---
        // Merge path-level and operation-level parameters
        const allParams = [
          ...(pathItem.parameters ?? []),
          ...(operation.parameters ?? []),
        ];
        const params = splitParameters(spec, allParams);

        const pathParams = params.path.length > 0 ? paramsToFields(spec, params.path) : undefined;
        const queryParams = params.query.length > 0 ? paramsToFields(spec, params.query) : undefined;
        const headerParams = params.header.length > 0 ? paramsToFields(spec, params.header) : undefined;

        // --- Request body ---
        const requestBody = extractRequestBody(spec, operation);

        // --- Responses ---
        const responses = extractResponses(spec, operation);

        // --- Permissions and OAuth ---
        const permissions = extractPermissions(operation);
        const oauthScopes = extractOauthScopes(operation.security);

        // --- Code examples (SDK) ---
        const sdkExamples = getCodeExamplesForOperation(operationId, version, primaryTag);

        // --- Curl ---
        const requestBodyJson = requestBody?.examples?.[0]?.value;
        const curlCode = buildCurl(spec, method, pathStr, operation, params, requestBodyJson);

        // Prepend curl as the first code example
        const codeExamples: CodeExampleSet[] = [
          {
            language: 'curl',
            label: 'Curl',
            entries: [
              {
                description: `${summary} curl example`,
                code: curlCode,
                syntax: 'bash',
              },
            ],
          },
          ...sdkExamples,
        ];

        endpoints.push({
          operationId,
          summary,
          slug: operationSlug(summary),
          method: method.toUpperCase(),
          path: pathStr,
          description,
          version,
          deprecated,
          unstable,
          permissions,
          oauthScopes,
          pathParams,
          queryParams,
          headerParams,
          requestBody,
          responses,
          codeExamples,
        });
      }
    }
  }

  // Sort by menu order (from the spec), then by summary
  endpoints.sort((a, b) => {
    const orderA = getMenuOrder(a);
    const orderB = getMenuOrder(b);
    if (orderA !== orderB) return orderA - orderB;
    return a.summary.localeCompare(b.summary);
  });

  endpointCache.set(slug, endpoints);
  return endpoints;
}

/**
 * Look up the x-menu-order for an endpoint from the spec.
 * Used for sorting. Returns 999 for operations without a menu order.
 */
function getMenuOrder(endpoint: EndpointData): number {
  const spec = getSpec(endpoint.version);
  const pathItem = spec.paths?.[endpoint.path];
  if (!pathItem) return 999;

  const operation = pathItem[endpoint.method.toLowerCase()];
  if (!operation) return 999;

  return operation['x-menu-order'] ?? 999;
}
