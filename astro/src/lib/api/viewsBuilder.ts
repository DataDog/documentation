/**
 * Page-time view helpers for the API docs. These convert the API spec
 * data into the shapes needed by the rendering components.
 *
 * Walks the parsed OpenAPI specs directly and assembles the `EndpointData`
 * and `ApiCategory` view shapes that rendering components consume. Results
 * are memoized per-locale (categories) and per `(locale, slug)` pair
 * (endpoints) to avoid re-walking on each call within a build.
 *
 * The private helpers below follow a naming convention designed to make
 * the spec-to-view relationships explicit:
 *
 *   - `collect<Entity>From<Source>` — walks `<Source>` to produce a list
 *     of `<Entity>`. The looped entity is `<Source>`; the entity being
 *     built is `<Entity>`. e.g. `collectCategoryMetadataFromSpecTags` walks
 *     a spec's `tags[]` and builds `CategoryMetadata` records.
 *
 *   - `group<Entity>By<Key>` — walks `<Entity>` once and returns a
 *     `<Key> -> <Entity>[]` map. e.g. `groupOperationStubsByCategorySlug`
 *     walks every raw operation and groups stubs by their category slug.
 *
 *   - `build<View>` / `extract<X>For<Y>` — single-record assembly.
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
import type { ActionTranslation } from "./schemas/translation";
import type { SplitParams } from "./schemas/params";
import type { SchemaField } from "./schemas/schemaField";
import type {
  ApiOperationStub,
  ApiCategory,
  ApiCategoryStub,
  EndpointData,
  RequestBodyData,
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
 * Lightweight variant of `getCategoriesView` that drops each category's
 * `operations` array. Use for callers that render only the category list
 * (e.g. the side nav on pages outside any category, or the side nav's
 * always-visible category links). Reads the same memoized result as
 * `getCategoriesView`, so calling both in the same build is free.
 */
export async function getCategoryStubsView(
  lang: Locale = DEFAULT_LOCALE,
): Promise<ApiCategoryStub[]> {
  const all = await getCategoriesView(lang);
  return all.map(({ operations: _operations, ...stub }) => stub);
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
/*  Types                                                              */
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

interface CategoryMetadata {
  name: string;
  slug: string;
  description: string;
  deprecated: boolean;
}

/* ------------------------------------------------------------------ */
/*  Raw operation collection                                           */
/* ------------------------------------------------------------------ */

/**
 * Memoized entry point. Returns every operation across every version of
 * the spec as a flat list of `RawOperation` records.
 */
function getAllOperations(): RawOperation[] {
  if (_allOperations) return _allOperations;
  _allOperations = collectRawOperationsFromAllSpecs();
  return _allOperations;
}

/** Walks every API version's spec and collects their operations. */
function collectRawOperationsFromAllSpecs(): RawOperation[] {
  const result: RawOperation[] = [];
  for (const version of API_VERSIONS) {
    result.push(...collectRawOperationsFromSpec(version));
  }
  return result;
}

/**
 * Walks every `paths.{path}.{method}` in a single spec and emits a
 * `RawOperation` for each well-formed operation. Skips operations that
 * lack tags or an `operationId` (they can't be linked or categorized).
 */
function collectRawOperationsFromSpec(version: ApiVersion): RawOperation[] {
  const spec = getOpenApiDocument(version);
  const paths = spec.paths;
  if (!paths) return [];

  const result: RawOperation[] = [];
  for (const [pathStr, pathItem] of Object.entries(paths)) {
    if (!pathItem) continue;
    result.push(...collectRawOperationsFromPathItem(version, pathStr, pathItem));
  }
  return result;
}

/**
 * Walks the HTTP methods on a single path item and emits a `RawOperation`
 * for each one that's defined and well-formed.
 */
function collectRawOperationsFromPathItem(
  version: ApiVersion,
  pathStr: string,
  pathItem: OpenAPIV3.PathItemObject,
): RawOperation[] {
  const result: RawOperation[] = [];
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
  return result;
}

/* ------------------------------------------------------------------ */
/*  Operation slug helpers                                             */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Category assembly                                                  */
/* ------------------------------------------------------------------ */

function buildCategories(lang: Locale): ApiCategory[] {
  const allMetadata = collectAllCategoryMetadata(lang);
  const stubsByCategorySlug = groupOperationStubsByCategorySlug(lang);

  const categories: ApiCategory[] = allMetadata.map((meta) => {
    const operations = stubsByCategorySlug.get(meta.slug) ?? [];
    operations.sort(compareOperationStubsByMenuOrder);
    return {
      name: meta.name,
      slug: meta.slug,
      description: meta.description,
      operations,
      deprecated: meta.deprecated,
    };
  });
  categories.sort(compareCategoriesByName);
  return categories;
}

/**
 * Returns one `CategoryMetadata` per known category. The primary source is
 * `tags[]` across every spec; operations whose tag never appears in
 * `tags[]` produce a minimal implicit meta so they still get a category
 * page.
 */
function collectAllCategoryMetadata(lang: Locale): CategoryMetadata[] {
  const bySlug = new Map<string, CategoryMetadata>();

  for (const version of API_VERSIONS) {
    for (const meta of collectCategoryMetadataFromSpecTags(version, lang)) {
      if (!bySlug.has(meta.slug)) {
        bySlug.set(meta.slug, meta);
      }
    }
  }

  for (const meta of collectImplicitCategoryMetadataFromOperations(bySlug, lang)) {
    bySlug.set(meta.slug, meta);
  }

  return Array.from(bySlug.values());
}

/**
 * Walks `tags[]` in one spec and emits a `CategoryMetadata` for each tag,
 * applying the translation overlay.
 */
function collectCategoryMetadataFromSpecTags(
  version: ApiVersion,
  lang: Locale,
): CategoryMetadata[] {
  const spec = getOpenApiDocument(version);
  const overlay = getTranslationOverlay(version, lang);
  type ApiTagObject = OpenAPIV3.TagObject & { "x-deprecated"?: boolean };
  const tags = (spec.tags ?? []) as ApiTagObject[];

  const result: CategoryMetadata[] = [];
  for (const tag of tags) {
    const rawSlug = toSlug(tag.name);
    const slug = SLUG_OVERRIDES[rawSlug] ?? rawSlug;
    const translated = translateTag(overlay, slug, {
      name: tag.name,
      description: tag.description,
    });
    result.push({
      name: translated.name,
      slug,
      description: translated.description ?? "",
      deprecated: tag["x-deprecated"] === true,
    });
  }
  return result;
}

/**
 * Walks every operation and emits a minimal `CategoryMetadata` for any
 * category slug not already in `alreadyDefined`. This covers categories
 * referenced by an operation's first tag that have no matching entry in
 * any spec's `tags[]`.
 */
function collectImplicitCategoryMetadataFromOperations(
  alreadyDefined: Map<string, CategoryMetadata>,
  lang: Locale,
): CategoryMetadata[] {
  const seen = new Set<string>(alreadyDefined.keys());
  const result: CategoryMetadata[] = [];
  for (const op of getAllOperations()) {
    if (seen.has(op.categorySlug)) continue;
    seen.add(op.categorySlug);
    const overlay = getTranslationOverlay(op.version, lang);
    const translated = translateTag(overlay, op.categorySlug, {
      name: op.primaryTag,
    });
    result.push({
      name: translated.name,
      slug: op.categorySlug,
      description: "",
      deprecated: false,
    });
  }
  return result;
}

/**
 * Walks every raw operation once and groups stubs by their primary tag's
 * category slug. Categories without operations don't appear as keys.
 * Caller is responsible for sorting each list.
 */
function groupOperationStubsByCategorySlug(
  lang: Locale,
): Map<string, ApiOperationStub[]> {
  const stubsByCategorySlug = new Map<string, ApiOperationStub[]>();
  for (const op of getAllOperations()) {
    const stub = buildOperationStub(op, lang);
    const list = stubsByCategorySlug.get(op.categorySlug);
    if (list) {
      list.push(stub);
    } else {
      stubsByCategorySlug.set(op.categorySlug, [stub]);
    }
  }
  return stubsByCategorySlug;
}

function buildOperationStub(op: RawOperation, lang: Locale): ApiOperationStub {
  const overlay = getTranslationOverlay(op.version, lang);
  const operationId: string = op.operation.operationId;
  const action = translateAction(overlay, operationId);
  return {
    operationId,
    summary: action.summary ?? op.operation.summary ?? "",
    slug: getOpSlug(op),
    menuOrder: op.operation["x-menu-order"] ?? 999,
    version: op.version,
    method: op.method.toUpperCase(),
  };
}

function compareOperationStubsByMenuOrder(
  a: ApiOperationStub,
  b: ApiOperationStub,
): number {
  return a.menuOrder - b.menuOrder || a.summary.localeCompare(b.summary);
}

function compareCategoriesByName(a: ApiCategory, b: ApiCategory): number {
  return a.name.localeCompare(b.name);
}

/* ------------------------------------------------------------------ */
/*  Endpoint assembly                                                  */
/* ------------------------------------------------------------------ */

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

  const regionUrls = buildRegionUrlsForOperation(spec, op);

  const params = collectParametersForOperation(spec, op);
  const requestBody = buildLocalizedRequestBodyForOperation(spec, op, action);
  const responses = extractResponses(spec, op.operation);

  const codeExamples = buildCodeExamplesForOperation(
    spec,
    op,
    params.split,
    requestBody?.examples?.[0]?.value,
    summary,
  );

  return {
    operationId,
    summary,
    slug: getOpSlug(op),
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
    pathParams: params.pathFields,
    queryParams: params.queryFields,
    headerParams: params.headerFields,
    requestBody,
    responses,
    codeExamples,
  };
}

/**
 * Walks the regions resolved for this operation and builds a `key -> URL`
 * map. Region resolution falls back to the spec's top-level `servers`
 * when the operation doesn't declare its own.
 */
function buildRegionUrlsForOperation(
  spec: OpenAPIV3.Document,
  op: RawOperation,
): Record<string, string> {
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
  return regionUrls;
}

/**
 * Merges `paths.{path}.parameters` with `paths.{path}.{method}.parameters`,
 * splits them by `in` location (path / query / header / cookie / body),
 * and converts each non-empty group into the field tree the renderer
 * consumes. Returns both forms because the split parameters are also
 * needed downstream for curl assembly.
 */
function collectParametersForOperation(
  spec: OpenAPIV3.Document,
  op: RawOperation,
): {
  split: SplitParams;
  pathFields: SchemaField[] | undefined;
  queryFields: SchemaField[] | undefined;
  headerFields: SchemaField[] | undefined;
} {
  const mergedParameters = [
    ...(op.pathItem.parameters ?? []),
    ...(op.operation.parameters ?? []),
  ];
  const split = splitParameters(spec, mergedParameters);
  return {
    split,
    pathFields:
      split.path.length > 0 ? paramsToFields(spec, split.path) : undefined,
    queryFields:
      split.query.length > 0 ? paramsToFields(spec, split.query) : undefined,
    headerFields:
      split.header.length > 0 ? paramsToFields(spec, split.header) : undefined,
  };
}

/**
 * Extracts the operation's request body and applies any `action`-level
 * translation overrides for the body description and the top-level
 * schema description.
 */
function buildLocalizedRequestBodyForOperation(
  spec: OpenAPIV3.Document,
  op: RawOperation,
  action: ActionTranslation,
): RequestBodyData | undefined {
  const requestBody = extractRequestBody(spec, op.operation);
  if (!requestBody) return undefined;

  if (action.request_description !== undefined) {
    requestBody.description = action.request_description || undefined;
  }
  if (
    action.request_schema_description !== undefined &&
    requestBody.schema.length > 0
  ) {
    requestBody.schema[0].description = action.request_schema_description;
  }
  return requestBody;
}

/**
 * Assembles the code-examples panel: a curl block (one entry with per-
 * region variants) followed by any SDK examples discovered for this
 * operation.
 */
function buildCodeExamplesForOperation(
  spec: OpenAPIV3.Document,
  op: RawOperation,
  params: SplitParams,
  requestBodyJson: string | undefined,
  summary: string,
): CodeExampleSet[] {
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
    op.operation.operationId,
    op.version,
    op.categorySlug,
  );

  return [
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
}
