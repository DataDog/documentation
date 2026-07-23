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
  ApiOperationView,
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
const operationViewCache = new Map<string, ApiOperationView>();

let _allOperations: RawOperation[] | null = null;
let _logicalGroups: Map<string, RawOperation[]> | null = null;

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
 * Aggregates one logical operation's detail. A logical operation collapses
 * every API version that shares a `(category, summary)` (e.g. v1 and v2 of
 * `list-all-aws-integrations`) into a single view with one variant per
 * version, ordered newest-first. The same OpenAPI keys feed each variant:
 *
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
export async function getOperationView(
  catSlug: string,
  opSlug: string,
  lang: Locale = DEFAULT_LOCALE,
): Promise<ApiOperationView | undefined> {
  if (!LOCALES.includes(lang)) lang = DEFAULT_LOCALE;
  const key = `${lang}:${catSlug}:${opSlug}`;
  const cached = operationViewCache.get(key);
  if (cached) return cached;

  const group = getLogicalOperationGroups().get(`${catSlug}:${opSlug}`);
  if (!group || group.length === 0) return undefined;

  const variants = group.map((op) => buildEndpoint(op, lang));
  const view: ApiOperationView = {
    slug: opSlug,
    summary: variants[0].summary,
    deprecated: variants.every((v) => v.deprecated),
    variants,
  };
  operationViewCache.set(key, view);
  return view;
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
/*  Operation slug + grouping helpers                                  */
/* ------------------------------------------------------------------ */

/**
 * Returns the URL slug for an operation, derived from its summary
 * (e.g. `list-all-aws-integrations`). When two operations in the same
 * category share a summary across versions (e.g. v1 + v2 of "List all
 * AWS integrations"), both produce the same slug — they're variants of
 * one logical operation and render as version tabs on a single page.
 */
function getOpSlug(op: RawOperation): string {
  return toSlug(op.operation.summary ?? "");
}

/** Compare versions newest-first: `v2 < v1` returns -1. */
function compareVersionsNewestFirst(a: ApiVersion, b: ApiVersion): number {
  return versionOrdinal(b) - versionOrdinal(a);
}

function versionOrdinal(v: ApiVersion): number {
  return Number(v.slice(1));
}

/**
 * Groups every `RawOperation` by its logical `<categorySlug>:<opSlug>` key.
 * Each group's operations are ordered newest version first. A group with
 * a single member is the common case; multi-member groups (v1 + v2 of the
 * same logical operation) drive the version-tabs UI on the operation page.
 */
function getLogicalOperationGroups(): Map<string, RawOperation[]> {
  if (_logicalGroups) return _logicalGroups;
  const groups = new Map<string, RawOperation[]>();
  for (const op of getAllOperations()) {
    const key = `${op.categorySlug}:${getOpSlug(op)}`;
    const list = groups.get(key);
    if (list) {
      list.push(op);
    } else {
      groups.set(key, [op]);
    }
  }
  for (const list of groups.values()) {
    list.sort((a, b) => compareVersionsNewestFirst(a.version, b.version));
  }
  _logicalGroups = groups;
  return groups;
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
 * Walks every logical operation group and groups stubs by category slug.
 * Each logical group becomes one stub regardless of how many version
 * variants it contains. Categories without operations don't appear as
 * keys. Caller is responsible for sorting each list.
 */
function groupOperationStubsByCategorySlug(
  lang: Locale,
): Map<string, ApiOperationStub[]> {
  const stubsByCategorySlug = new Map<string, ApiOperationStub[]>();
  for (const group of getLogicalOperationGroups().values()) {
    const stub = buildOperationStub(group, lang);
    const categorySlug = group[0].categorySlug;
    const list = stubsByCategorySlug.get(categorySlug);
    if (list) {
      list.push(stub);
    } else {
      stubsByCategorySlug.set(categorySlug, [stub]);
    }
  }
  return stubsByCategorySlug;
}

/**
 * Builds a stub for one logical operation. The latest variant supplies
 * the identifiers and labels; `versions` lists every variant ordered
 * newest-first. `menuOrder` takes the minimum across variants so a
 * lower-numbered v1 doesn't sink a v2-prominent operation in the nav.
 */
function buildOperationStub(group: RawOperation[], lang: Locale): ApiOperationStub {
  const latest = group[0];
  const overlay = getTranslationOverlay(latest.version, lang);
  const operationId: string = latest.operation.operationId;
  const action = translateAction(overlay, operationId);
  const menuOrder = group.reduce(
    (min, op) => Math.min(min, op.operation["x-menu-order"] ?? 999),
    Infinity,
  );
  // The category landing page summarizes each endpoint using its primary
  // (newest) version — the one shown as the active tab on the operation page.
  const spec = getOpenApiDocument(latest.version);
  return {
    operationId,
    summary: action.summary ?? latest.operation.summary ?? "",
    slug: getOpSlug(latest),
    menuOrder: Number.isFinite(menuOrder) ? menuOrder : 999,
    versions: group.map((op) => op.version),
    method: latest.method.toUpperCase(),
    deprecated: latest.operation.deprecated === true,
    unstable: !!latest.operation["x-unstable"],
    regionUrls: buildRegionUrlsForOperation(spec, latest),
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
