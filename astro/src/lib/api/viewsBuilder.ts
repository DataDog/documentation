/**
 * Page-time view helpers for the API docs. These convert the API spec
 * data into the shapes needed by the rendering components.
 *
 * Walks the parsed OpenAPI specs directly and assembles the `EndpointData`
 * and `ApiCategory` view shapes that rendering components consume. Results
 * are memoized per-locale (categories) and per `(locale, slug)` pair
 * (endpoints) to avoid re-walking on each call within a build.
 */

import { DEFAULT_LOCALE, LOCALES, type Locale } from "@lib/i18n/locale";
import { API_VERSIONS, getOpenApiDocument } from "./specParser";
import type { OpenAPIV3 } from "openapi-types";
import { getRegions, buildApiUrlFromServers } from "./regionResolver";
import {
  getTranslationOverlay,
  translateAction,
  translateTag,
} from "./translationsLoader";
import {
  splitParameters,
  extractRequestBody,
  extractResponses,
  extractPermissions,
  extractOauthScopes,
  buildCurlByRegion,
} from "./operationBuilder";
import { paramsToFields } from "./refResolver";
import { getCodeExamplesForOperation } from "./codeExampleLoader";
import type { CodeExampleSet } from "./schemas/codeExamples";
import type { ApiVersion } from "./schemas/version";
import type {
  ApiOperationStub,
  ApiCategory,
  EndpointData,
} from "./schemas/views";

const HTTP_METHODS = [
  "get",
  "post",
  "put",
  "patch",
  "delete",
  "head",
  "options",
] as const;

const SLUG_OVERRIDES: Record<string, string> = {
  "case-management": "cases",
  scorecards: "service-scorecards",
};

const categoriesCache = new Map<Locale, ApiCategory[]>();
const endpointCache = new Map<string, EndpointData>();

let _allOperations: RawOperation[] | null = null;
let _slugByOp: Map<RawOperation, string> | null = null;

/**
 * Aggregates categories from these OpenAPI spec keys:
 *   - `tags[].name`
 *   - `tags[].description`
 *   - `tags[].x-deprecated`
 *   - `paths.{path}.{method}.tags` (first tag → category slug)
 *   - `paths.{path}.{method}.operationId`
 *   - `paths.{path}.{method}.summary`
 *   - `paths.{path}.{method}.x-menu-order`
 */
export async function getCategoriesView(
  lang: Locale = DEFAULT_LOCALE,
): Promise<ApiCategory[]> {
  if (!LOCALES.includes(lang)) lang = DEFAULT_LOCALE;
  const cached = categoriesCache.get(lang);
  if (cached) return cached;
  const built = buildCategories(lang);
  categoriesCache.set(lang, built);
  return built;
}

/**
 * Filters the category list from `getCategoriesView` by slug. Reads the
 * same OpenAPI keys as `getCategoriesView`.
 */
export async function getCategoryViewBySlug(
  slug: string,
  lang: Locale = DEFAULT_LOCALE,
): Promise<ApiCategory | undefined> {
  const all = await getCategoriesView(lang);
  return all.find((c) => c.slug === slug);
}

/**
 * Aggregates a single endpoint's detail from these OpenAPI spec keys:
 *   - `servers` (top-level, fallback for region URLs)
 *   - `paths.{path}.parameters` and `paths.{path}.{method}.parameters`
 *     (with `in`, `name`, `required`, `schema`, `example`, `$ref`)
 *   - `paths.{path}.{method}.operationId`
 *   - `paths.{path}.{method}.summary`
 *   - `paths.{path}.{method}.description`
 *   - `paths.{path}.{method}.deprecated`
 *   - `paths.{path}.{method}.tags` (first tag → category slug)
 *   - `paths.{path}.{method}.servers`
 *   - `paths.{path}.{method}.security` (AuthZ → OAuth scopes)
 *   - `paths.{path}.{method}.x-unstable`
 *   - `paths.{path}.{method}.x-permission.permissions`
 *   - `paths.{path}.{method}.requestBody`
 *     (`content['application/json'].{schema, example, examples}`,
 *      `required`, `description`)
 *   - `paths.{path}.{method}.responses.{statusCode}`
 *     (`description`, `content['application/json'].{schema, example, examples}`)
 */
export async function getEndpointView(
  catSlug: string,
  opSlug: string,
  lang: Locale = DEFAULT_LOCALE,
): Promise<EndpointData | undefined> {
  if (!LOCALES.includes(lang)) lang = DEFAULT_LOCALE;
  const key = `${lang}:${catSlug}:${opSlug}`;
  const cached = endpointCache.get(key);
  if (cached) return cached;

  const match = getAllOperations().find(
    (op) => op.categorySlug === catSlug && getOpSlug(op) === opSlug,
  );
  if (!match) return undefined;

  const built = buildEndpoint(match, lang);
  endpointCache.set(key, built);
  return built;
}

/* ------------------------------------------------------------------ */
/*  Private helpers                                                    */
/* ------------------------------------------------------------------ */

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Operation extensions used to drive the docs UI. None are part of the
 * OpenAPI 3.x base type, so we widen `OperationObject` here. `operationId`
 * is also narrowed to required because `getAllOperations` filters out any
 * operation that lacks one.
 */
type ApiOperationObject = Omit<OpenAPIV3.OperationObject, 'operationId'> & {
  operationId: string;
  'x-permission'?: { permissions?: string[]; operator?: string };
  'x-unstable'?: boolean | string;
  'x-menu-order'?: number;
};

interface RawOperation {
  version: ApiVersion;
  pathStr: string;
  method: string;
  operation: ApiOperationObject;
  pathItem: OpenAPIV3.PathItemObject;
  primaryTag: string;
  categorySlug: string;
}

function getAllOperations(): RawOperation[] {
  if (_allOperations) return _allOperations;
  const result: RawOperation[] = [];

  for (const version of API_VERSIONS) {
    const spec = getOpenApiDocument(version);
    const paths = spec.paths;
    if (!paths) continue;

    for (const [pathStr, pathItem] of Object.entries(paths)) {
      if (!pathItem) continue;

      for (const method of HTTP_METHODS) {
        const operation = pathItem[method];
        if (!operation) continue;
        if (!operation.tags || operation.tags.length === 0) continue;
        if (!operation.operationId) continue;

        const primaryTag = operation.tags[0];
        const rawSlug = toSlug(primaryTag);
        const categorySlug = SLUG_OVERRIDES[rawSlug] ?? rawSlug;

        result.push({
          version,
          pathStr,
          method,
          operation: operation as ApiOperationObject,
          pathItem,
          primaryTag,
          categorySlug,
        });
      }
    }
  }

  _allOperations = result;
  return result;
}

/**
 * Build a `RawOperation -> slug` map, disambiguating colliding summary slugs
 * within a category by appending the API version. Two operations in the
 * same category can share an operation summary across v1/v2 (e.g.
 * `aws-integration` exposes "List all AWS integrations" in both versions),
 * so we keep slugs unique by category to guarantee one page per operation.
 */
function getSlugByOp(): Map<RawOperation, string> {
  if (_slugByOp) return _slugByOp;
  const ops = getAllOperations();
  const counts = new Map<string, number>();
  for (const op of ops) {
    const key = `${op.categorySlug}:${toSlug(op.operation.summary ?? "")}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const map = new Map<RawOperation, string>();
  for (const op of ops) {
    const baseSlug = toSlug(op.operation.summary ?? "");
    const key = `${op.categorySlug}:${baseSlug}`;
    const slug =
      (counts.get(key) ?? 0) > 1 ? `${baseSlug}-${op.version}` : baseSlug;
    map.set(op, slug);
  }
  _slugByOp = map;
  return map;
}

/**
 * Returns the URL slug for an operation
 * (e.g. `list-all-aws-integrations`
 * in `/api/aws-integration/list-all-aws-integrations/`).
 */
function getOpSlug(op: RawOperation): string {
  const slug = getSlugByOp().get(op);
  if (slug === undefined)
    throw new Error(`No slug found for operation: ${op.operation.operationId}`);
  return slug;
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
    const spec = getOpenApiDocument(version);
    const overlay = getTranslationOverlay(version, lang);

    type ApiTagObject = OpenAPIV3.TagObject & { "x-deprecated"?: boolean };
    const tags = (spec.tags ?? []) as ApiTagObject[];
    for (const tag of tags) {
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
        description: translated.description ?? "",
        deprecated: tag["x-deprecated"] === true,
      });
    }
  }

  for (const op of getAllOperations()) {
    const overlay = getTranslationOverlay(op.version, lang);

    if (!categoryMap.has(op.categorySlug)) {
      const translated = translateTag(overlay, op.categorySlug, {
        name: op.primaryTag,
      });
      categoryMap.set(op.categorySlug, {
        name: translated.name,
        slug: op.categorySlug,
        description: "",
        deprecated: false,
      });
    }

    const operationId: string = op.operation.operationId;
    const action = translateAction(overlay, operationId);
    const summary: string = action.summary ?? op.operation.summary ?? "";
    const menuOrder: number = op.operation["x-menu-order"] ?? 999;
    const slug = getOpSlug(op);

    const list = opsByCategory.get(op.categorySlug) ?? [];
    list.push({
      operationId,
      summary,
      slug,
      menuOrder,
      version: op.version,
      method: op.method.toUpperCase(),
    });
    opsByCategory.set(op.categorySlug, list);
  }

  const result: ApiCategory[] = [];
  for (const meta of Array.from(categoryMap.values())) {
    const ops = opsByCategory.get(meta.slug) ?? [];
    ops.sort(
      (a, b) => a.menuOrder - b.menuOrder || a.summary.localeCompare(b.summary),
    );
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

function buildEndpoint(op: RawOperation, lang: Locale): EndpointData {
  const spec = getOpenApiDocument(op.version);
  const overlay = getTranslationOverlay(op.version, lang);
  const operationId: string = op.operation.operationId;
  const action = translateAction(overlay, operationId);

  const summary: string = action.summary ?? op.operation.summary ?? "";
  const description: string =
    action.description ?? op.operation.description ?? "";
  const deprecated: boolean = op.operation.deprecated === true;
  const unstable: boolean = !!op.operation["x-unstable"];
  const unstableMessage: string | undefined =
    typeof op.operation["x-unstable"] === "string"
      ? op.operation["x-unstable"]
      : undefined;

  const permissions = extractPermissions(op.operation);
  const oauthScopes = extractOauthScopes(op.operation.security);

  const regions = getRegions(spec, op.operation);
  const operationServers = op.operation?.servers ?? spec?.servers;
  const regionUrls: Record<string, string> = {};
  for (const region of regions) {
    regionUrls[region.key] = buildApiUrlFromServers(
      operationServers,
      region.site,
      op.pathStr,
    );
  }

  const opSlug = getOpSlug(op);

  const mergedParameters = [
    ...(op.pathItem.parameters ?? []),
    ...(op.operation.parameters ?? []),
  ];
  const params = splitParameters(spec, mergedParameters);
  const pathParams =
    params.path.length > 0 ? paramsToFields(spec, params.path) : undefined;
  const queryParams =
    params.query.length > 0 ? paramsToFields(spec, params.query) : undefined;
  const headerParams =
    params.header.length > 0 ? paramsToFields(spec, params.header) : undefined;

  const requestBody = extractRequestBody(spec, op.operation);
  if (requestBody) {
    if (action.request_description !== undefined) {
      requestBody.description = action.request_description || undefined;
    }
    if (
      action.request_schema_description !== undefined &&
      requestBody.schema.length > 0
    ) {
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
  const defaultRegionKey = regionKeys[0] ?? "us";
  const defaultCurl = curlByRegion[defaultRegionKey] ?? "";
  const curlVariants: Record<string, { code: string }> = {};
  for (const [key, code] of Object.entries(curlByRegion)) {
    curlVariants[key] = { code };
  }

  const sdkExamples = getCodeExamplesForOperation(
    operationId,
    op.version,
    op.categorySlug,
  );

  const codeExamples: CodeExampleSet[] = [
    {
      language: "curl",
      label: "Curl",
      entries: [
        {
          description: `${summary} curl example`,
          code: defaultCurl,
          syntax: "bash",
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
}
