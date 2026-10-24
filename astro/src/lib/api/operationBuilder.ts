/**
 * Operation-level extraction helpers used by the `views.ts` builder.
 *
 * Pure helper functions: take a parsed spec and an operation object, return
 * structured data. No caching, no I/O.
 */

import type { OpenAPIV3 } from "openapi-types";
import {
  resolveRef,
  topLevelSchemaToFields,
  stripReadOnlyFields,
  stripWriteOnlyFields,
} from "./refResolver";
import { buildCurlCommand } from "./curlBuilder";
import { buildSchemaExample } from "./schemaExampleBuilder";
import { buildRunCommand } from "./runCommandBuilder";
import type { LanguageRunInfo } from "./codeExampleLoader";
import { getRegionHosts, getRegions } from "./regionResolver";
import type { SchemaField } from "./schemas/schemaField";
import type {
  CurlFormField,
  CurlParam,
  CurlSecurityScheme,
  GenerateCurlOptions,
} from "./schemas/curl";
import type { ResponseData, RequestBodyData } from "./schemas/views";
import type { RequestFileExamples } from "./requestFileLoader";
import type { SplitParams } from "./schemas/params";

type ParameterOrRef = OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject;
type OperationWithExtensions = OpenAPIV3.OperationObject & {
  "x-permission"?: { permissions?: string[]; operator?: string };
};

function isReference(o: unknown): o is OpenAPIV3.ReferenceObject {
  return (
    typeof o === "object" &&
    o !== null &&
    "$ref" in o &&
    typeof (o as { $ref: unknown }).$ref === "string"
  );
}

/**
 * Split an array of OpenAPI parameter objects by their `in` field,
 * resolving any $ref pointers along the way.
 */
export function splitParameters(
  spec: OpenAPIV3.Document,
  params?: ParameterOrRef[],
): SplitParams {
  const result: SplitParams = { path: [], query: [], header: [] };

  if (!params || !Array.isArray(params)) return result;

  for (const param of params) {
    const resolved: OpenAPIV3.ParameterObject = isReference(param)
      ? (resolveRef(spec, param.$ref) ?? param)
      : param;
    const location = resolved.in;

    if (location === "path") result.path.push(resolved);
    else if (location === "query") result.query.push(resolved);
    else if (location === "header") result.header.push(resolved);
  }

  return result;
}

/**
 * Extract permission names from the `x-permission` extension.
 *
 * Structure: `{ operator: 'AND' | 'OR', permissions: string[] }`
 */
export function extractPermissions(
  operation: OperationWithExtensions,
): string[] | undefined {
  const xPerm = operation["x-permission"];
  if (!xPerm?.permissions || !Array.isArray(xPerm.permissions))
    return undefined;
  return xPerm.permissions;
}

/**
 * Whether a caller needs `any` or `all` of an operation's permissions. Only
 * meaningful with more than one permission. Hugo treats every operator other
 * than `OR` as `all`.
 */
export function extractPermissionsMatch(
  operation: OperationWithExtensions,
): "any" | "all" | undefined {
  const permissions = extractPermissions(operation);
  if (!permissions || permissions.length < 2) return undefined;
  return operation["x-permission"]?.operator === "OR" ? "any" : "all";
}

/**
 * Extract OAuth scopes from the `security` block's AuthZ requirements.
 *
 * Each `security` entry is an alternative, and the scopes inside one entry
 * are all required. When every AuthZ entry holds a single scope, the entries
 * are alternative scopes, so this lists them all (see
 * `extractOauthScopesMatch`). Otherwise it returns the first entry's scopes.
 * Hugo keeps only the last entry, which hides the alternatives.
 */
export function extractOauthScopes(
  security?: OpenAPIV3.SecurityRequirementObject[],
): string[] | undefined {
  const authZEntries = extractAuthZEntries(security);
  if (authZEntries.length === 0) return undefined;
  return hasAlternativeScopes(authZEntries)
    ? authZEntries.flat()
    : authZEntries[0];
}

/**
 * `"any"` when the scopes from `extractOauthScopes` are alternatives, so any
 * one of them is enough. `undefined` when they're all required.
 */
export function extractOauthScopesMatch(
  security?: OpenAPIV3.SecurityRequirementObject[],
): "any" | undefined {
  return hasAlternativeScopes(extractAuthZEntries(security))
    ? "any"
    : undefined;
}

function extractAuthZEntries(
  security?: OpenAPIV3.SecurityRequirementObject[],
): string[][] {
  if (!security || !Array.isArray(security)) return [];
  return security
    .map((requirement) => requirement.AuthZ)
    .filter(
      (scopes): scopes is string[] =>
        Array.isArray(scopes) && scopes.length > 0,
    );
}

function hasAlternativeScopes(authZEntries: string[][]): boolean {
  return (
    authZEntries.length > 1 &&
    authZEntries.every((scopes) => scopes.length === 1)
  );
}

function isJsonMediaType(mediaType: string): boolean {
  return /[/+]json\b/.test(mediaType);
}

/**
 * The operation's request body object and the media type its examples use.
 * Hugo renders a body whatever its content type. Prefer JSON, then fall back
 * to the first declared type (e.g. `text/json`, `multipart/form-data`).
 */
function resolveRequestBodyContent(
  spec: OpenAPIV3.Document,
  operation: OpenAPIV3.OperationObject,
):
  | {
      resolved: OpenAPIV3.RequestBodyObject;
      mediaType: string;
      bodyContent: OpenAPIV3.MediaTypeObject;
    }
  | undefined {
  const rb = operation.requestBody;
  if (!rb) return undefined;

  const resolved: OpenAPIV3.RequestBodyObject = isReference(rb)
    ? (resolveRef(spec, rb.$ref) ?? rb)
    : rb;

  const content = resolved.content;
  if (!content) return undefined;

  const mediaType =
    "application/json" in content
      ? "application/json"
      : Object.keys(content)[0];
  if (!mediaType) return undefined;
  return { resolved, mediaType, bodyContent: content[mediaType] };
}

/**
 * Extract request body schema and examples from the operation.
 */
export function extractRequestBody(
  spec: OpenAPIV3.Document,
  operation: OpenAPIV3.OperationObject,
  requestFileExamples: RequestFileExamples = {
    examples: [],
    showTitles: false,
    isFallbackFile: false,
  },
): RequestBodyData | undefined {
  const requestBodyContent = resolveRequestBodyContent(spec, operation);
  if (!requestBodyContent) return undefined;
  const { resolved, mediaType, bodyContent } = requestBodyContent;

  // Read-only fields are omitted from request bodies: a client cannot send
  // them. Responses keep theirs, so the filter belongs here rather than in
  // `topLevelSchemaToFields`.
  const schema = bodyContent.schema
    ? stripReadOnlyFields(topLevelSchemaToFields(spec, bodyContent.schema))
    : [];

  const examples: Array<{ name: string; value: string }> = [];

  // A JSON example would misrepresent a non-JSON body (and feed a JSON `-d`
  // into the generated curl command), so those bodies show the schema only.
  if (!isJsonMediaType(mediaType)) {
    return {
      required: resolved.required === true,
      description: resolved.description || undefined,
      schema,
      examples,
      showExampleTitles: false,
    };
  }

  // Prod's Example tab shows Hugo's request files when the operation has any,
  // and otherwise the example Hugo builds from the schema. It never shows the
  // spec's examples.
  const hasRequestFiles = requestFileExamples.examples.length > 0;
  if (hasRequestFiles) {
    examples.push(...requestFileExamples.examples);
  } else if (bodyContent.schema) {
    const generated = buildSchemaExample(spec, "request", bodyContent.schema);
    if (generated !== undefined) {
      examples.push({
        name: "Example",
        value: JSON.stringify(generated, null, 2),
      });
    }
  }

  return {
    required: resolved.required === true,
    description: resolved.description || undefined,
    schema,
    examples,
    showExampleTitles: hasRequestFiles && requestFileExamples.showTitles,
  };
}

/**
 * One curl command: the body it sends, the comment lines above it, and the
 * encoding it compresses the body with, if any.
 */
export interface CurlBody {
  requestBodyJson: string | undefined;
  commentLines: string[];
  contentEncoding?: CurlContentEncoding;
}

type CurlContentEncoding = NonNullable<GenerateCurlOptions["contentEncoding"]>;

/**
 * One entry in the Curl tab. `title` is the request file's CodeExamples
 * description, or `undefined` for the fallback request file and the
 * operation's own entry.
 */
export interface CurlExample {
  title: string | undefined;
  bodies: CurlBody[];
}

/**
 * The Curl tab's entries. Prod's curl repeats every spec example in every
 * request-file card (decision A treats that as a mistake), so Astro builds one
 * curl per request file, sending that file. Without request files, there's
 * one entry with a curl per spec example, as on prod.
 */
export function extractCurlExamples(
  spec: OpenAPIV3.Document,
  operation: OpenAPIV3.OperationObject,
  requestFileExamples: RequestFileExamples = {
    examples: [],
    showTitles: false,
    isFallbackFile: false,
  },
): CurlExample[] {
  const requestBodyContent = resolveRequestBodyContent(spec, operation);
  if (!requestBodyContent || !isJsonMediaType(requestBodyContent.mediaType)) {
    return [{ title: undefined, bodies: [curlBody(undefined)] }];
  }
  const encodingForTitle = (cardTitle: string | undefined) =>
    curlContentEncoding(spec, operation, cardTitle ?? "");
  if (requestFileExamples.examples.length > 0) {
    return requestFileExamples.examples.map((example) => ({
      title: requestFileExamples.isFallbackFile ? undefined : example.name,
      bodies: [
        withContentEncoding(
          curlBody(example.value),
          encodingForTitle(example.name),
        ),
      ],
    }));
  }
  const contentEncoding = encodingForTitle(operation.summary);
  return [
    {
      title: undefined,
      bodies: specExampleCurlBodies(spec, requestBodyContent.bodyContent).map(
        (body) => withContentEncoding(body, contentEncoding),
      ),
    },
  ];
}

function withContentEncoding(
  body: CurlBody,
  contentEncoding: CurlContentEncoding | undefined,
): CurlBody {
  return contentEncoding ? { ...body, contentEncoding } : body;
}

/**
 * Hugo's curl.html reads the encoding from the card's title (the request
 * file's description, else the operation's summary): the last
 * `Content-Encoding` enum value the title contains, else the header's example
 * when the header is required or the title says "compression". Hugo has a
 * curl shape only for gzip and deflate. For any other value, it sends the
 * header but no body, so other values are ignored.
 */
function curlContentEncoding(
  spec: OpenAPIV3.Document,
  operation: OpenAPIV3.OperationObject,
  cardTitle: string,
): CurlContentEncoding | undefined {
  const header = splitParameters(spec, operation.parameters).header.find(
    (param) => param.name === "Content-Encoding",
  );
  if (!header) return undefined;
  const schema = resolveSchema(spec, header.schema);
  const enumValues: unknown[] = schema?.enum ?? [];
  const encodingInTitle = enumValues
    .filter(
      (enumValue): enumValue is string =>
        typeof enumValue === "string" && cardTitle.includes(enumValue),
    )
    .at(-1);
  let encoding: unknown = encodingInTitle;
  if (
    encoding === undefined &&
    ((schema?.example !== undefined && header.required) ||
      cardTitle.includes("compression"))
  ) {
    encoding = header.example ?? schema?.example;
  }
  return encoding === "gzip" || encoding === "deflate" ? encoding : undefined;
}

function curlBody(requestBodyJson: string | undefined): CurlBody {
  return { requestBodyJson, commentLines: [] };
}

/**
 * One curl per inline spec example, in key order, as Hugo ranges over the
 * examples map. With several, each is headed by its summary (or id) and its
 * description lines, as on prod. A lone example gets no heading, since that
 * would add prod's `## default` line to most operations (K21).
 */
function specExampleCurlBodies(
  spec: OpenAPIV3.Document,
  bodyContent: OpenAPIV3.MediaTypeObject,
): CurlBody[] {
  const inlineExamples = Object.entries(bodyContent.examples ?? {})
    .sort(([idA], [idB]) => (idA < idB ? -1 : idA > idB ? 1 : 0))
    .flatMap(([exampleId, exampleObj]) => {
      const resolvedExample: OpenAPIV3.ExampleObject = isReference(exampleObj)
        ? (resolveRef(spec, exampleObj.$ref) ?? exampleObj)
        : exampleObj;
      return resolvedExample?.value === undefined
        ? []
        : [{ exampleId, example: resolvedExample }];
    });
  if (inlineExamples.length === 0) {
    return [curlBody(fallbackRequestExampleJson(spec, bodyContent))];
  }
  return inlineExamples.map(({ exampleId, example }) => ({
    requestBodyJson: JSON.stringify(example.value, null, 2),
    commentLines:
      inlineExamples.length > 1 ? exampleCommentLines(exampleId, example) : [],
  }));
}

/** Hugo's `## <summary or id>`, then a `# <line>` per description line. */
function exampleCommentLines(
  exampleId: string,
  example: OpenAPIV3.ExampleObject,
): string[] {
  const descriptionLines = example.description
    ? example.description.split("\n").map((line) => `# ${line}`)
    : [];
  return [`## ${example.summary || exampleId}`, ...descriptionLines];
}

/**
 * The spec's `example`, then one generated from the schema's `example` fields.
 */
function fallbackRequestExampleJson(
  spec: OpenAPIV3.Document,
  bodyContent: OpenAPIV3.MediaTypeObject,
): string | undefined {
  const example =
    bodyContent.example ?? generateExampleFromSchema(spec, bodyContent.schema);
  return example === undefined ? undefined : JSON.stringify(example, null, 2);
}

/**
 * The description of a (possibly `$ref`'d) schema. Hugo shows it above the
 * response's Model table.
 */
function resolveSchemaDescription(
  spec: OpenAPIV3.Document,
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
): string | undefined {
  const resolved: OpenAPIV3.SchemaObject | undefined = isReference(schema)
    ? resolveRef(spec, schema.$ref)
    : schema;
  return resolved?.description || undefined;
}

/**
 * Extract response data for all status codes defined on the operation.
 */
export function extractResponses(
  spec: OpenAPIV3.Document,
  operation: OpenAPIV3.OperationObject,
): ResponseData[] {
  const responses = operation.responses;
  if (!responses || typeof responses !== "object") return [];

  const result: ResponseData[] = [];

  for (const [statusCode, responseObj] of Object.entries(responses)) {
    const resolved: OpenAPIV3.ResponseObject = isReference(responseObj)
      ? (resolveRef(spec, responseObj.$ref) ?? responseObj)
      : responseObj;

    const description: string = resolved?.description ?? "";

    let schema: SchemaField[] | undefined;
    let schemaDescription: string | undefined;
    // As with request bodies, prefer JSON, then fall back to the first
    // declared type (e.g. `application/json;datetime-format=rfc3339`,
    // `text/csv`).
    const content = resolved?.content ?? {};
    const mediaType =
      "application/json" in content
        ? "application/json"
        : Object.keys(content)[0];
    const mediaContent = mediaType ? content[mediaType] : undefined;
    if (mediaContent?.schema) {
      // Write-only fields are omitted from responses: the server accepts them
      // but never returns them. Requests keep theirs, so the filter belongs
      // here rather than in `topLevelSchemaToFields`.
      schema = stripWriteOnlyFields(
        topLevelSchemaToFields(spec, mediaContent.schema),
      );
      schemaDescription = resolveSchemaDescription(spec, mediaContent.schema);
    }

    // A JSON example would misrepresent a non-JSON response, so those show
    // the schema only.
    const jsonContent =
      mediaType && isJsonMediaType(mediaType) ? mediaContent : undefined;

    // Like Hugo, build the example from the schema and ignore the spec's
    // `examples`, so fields without an example show a type placeholder.
    let examples: Array<{ name: string; value: string }> | undefined;
    const generated = jsonContent?.schema
      ? buildSchemaExample(spec, "response", jsonContent.schema)
      : undefined;
    if (generated !== undefined) {
      examples = [
        { name: "Example", value: JSON.stringify(generated, null, 2) },
      ];
    }

    result.push({
      statusCode,
      description,
      ...(schemaDescription ? { schemaDescription } : {}),
      schema,
      examples,
    });
  }

  result.sort((a, b) => a.statusCode.localeCompare(b.statusCode));

  return result;
}

/**
 * Generate curl commands for the given operation, one per supported region.
 * Returns a map keyed by region.key (e.g. `us`, `eu`) so the UI can render
 * a `[data-region]` wrapper per variant.
 */
export function buildCurlByRegion(
  spec: OpenAPIV3.Document,
  method: string,
  path: string,
  operation: OpenAPIV3.OperationObject,
  splitParams: SplitParams,
  body: CurlBody = curlBody(undefined),
): Record<string, string> {
  const options = curlOptionsForOperation(
    spec,
    method,
    path,
    operation,
    splitParams,
    body,
  );
  const hostsByRegion = getRegionHosts(spec, operation);
  const result: Record<string, string> = {};
  for (const region of getRegions(spec, operation)) {
    result[region.key] = buildCurlCommand({
      ...options,
      site: region.site,
      host: hostsByRegion.get(region.key),
    });
  }
  return result;
}

/**
 * The curl command for the .md, which can't switch sites: it uses the first
 * region's site, and lists the operation's other sites (or, for per-region
 * hosts, their hosts) in a comment.
 */
export function buildPlaintextCurl(
  spec: OpenAPIV3.Document,
  method: string,
  path: string,
  operation: OpenAPIV3.OperationObject,
  splitParams: SplitParams,
  body: CurlBody = curlBody(undefined),
): string {
  const [defaultRegion, ...otherRegions] = getRegions(spec, operation);
  const hostsByRegion = getRegionHosts(spec, operation);
  return buildCurlCommand({
    ...curlOptionsForOperation(
      spec,
      method,
      path,
      operation,
      splitParams,
      body,
    ),
    site: defaultRegion?.site,
    otherSites: otherRegions.map((region) => region.site),
    host: defaultRegion ? hostsByRegion.get(defaultRegion.key) : undefined,
    otherHosts: otherRegions.flatMap((region) => {
      const host = hostsByRegion.get(region.key);
      return host ? [{ site: region.site, host }] : [];
    }),
  });
}

/** Everything `buildCurlCommand` needs except the site. */
function curlOptionsForOperation(
  spec: OpenAPIV3.Document,
  method: string,
  path: string,
  operation: OpenAPIV3.OperationObject,
  splitParams: SplitParams,
  body: CurlBody,
): GenerateCurlOptions {
  const servers = operation?.servers ?? spec?.servers;
  return {
    method,
    path,
    commentLines: body.commentLines,
    subdomain: servers?.[0]?.variables?.subdomain?.default ?? "api",
    pathParams: toCurlParams(spec, splitParams.path),
    queryParams: toCurlParams(spec, splitParams.query),
    headerParams: toCurlParams(spec, splitParams.header),
    requestBodyJson: body.requestBodyJson,
    contentEncoding: body.contentEncoding,
    hasRequestBody: operation.requestBody !== undefined,
    multipartFormFields: multipartFormFields(spec, operation),
    hasNoContentResponse: "204" in (operation.responses ?? {}),
    security: operation.security,
    globalSecurity: spec.security,
    securitySchemes: toCurlSecuritySchemes(spec.components?.securitySchemes),
  };
}

/**
 * The `-F` fields of a `multipart/form-data` body, or `undefined` when the
 * body isn't multipart. Hugo ranges over the properties map, which Go
 * iterates in key order.
 */
function multipartFormFields(
  spec: OpenAPIV3.Document,
  operation: OpenAPIV3.OperationObject,
): CurlFormField[] | undefined {
  const requestBody = operation.requestBody as
    OpenAPIV3.RequestBodyObject | undefined;
  const multipart = requestBody?.content?.["multipart/form-data"];
  if (!multipart) return undefined;

  const schema = resolveSchema(spec, multipart.schema);
  const properties = schema?.properties ?? {};
  return Object.keys(properties)
    .sort()
    .map((name) => {
      const property = resolveSchema(spec, properties[name]);
      return {
        name,
        type: String(property?.type ?? ""),
        binary: property?.format === "binary",
      };
    });
}

function resolveSchema(
  spec: OpenAPIV3.Document,
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined,
): OpenAPIV3.SchemaObject | undefined {
  return isReference(schema) ? resolveRef(spec, schema.$ref) : schema;
}

/** SDK run commands for the given operation, keyed by region like curl. */
export function buildRunCommandByRegion(
  spec: OpenAPIV3.Document,
  operation: OpenAPIV3.OperationObject,
  language: Pick<LanguageRunInfo, "runCommand" | "canUseBearerToken">,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const region of getRegions(spec, operation)) {
    result[region.key] = buildRunCommand({
      site: region.site,
      ...language,
      security: operation.security,
      globalSecurity: spec.security,
      securitySchemes: toCurlSecuritySchemes(spec.components?.securitySchemes),
    });
  }
  return result;
}

/* ------------------------------------------------------------------ */
/*  Private helpers                                                    */
/* ------------------------------------------------------------------ */

/** Maximum structural depth (objects/arrays) for example generation. */
const EXAMPLE_MAX_DEPTH = 10;

/**
 * Attempt to build a sample JSON value from a schema by using `example`
 * fields on properties. Returns `undefined` if no useful example can
 * be constructed.
 *
 * `depth` tracks structural nesting (object properties, array items).
 * `$ref` resolution does not increment depth — circular refs are guarded
 * by a `seen` set of ref paths instead.
 */
function generateExampleFromSchema(
  spec: OpenAPIV3.Document,
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined,
  depth = 0,
  seen: Set<string> = new Set(),
): unknown {
  if (!schema || depth > EXAMPLE_MAX_DEPTH) return undefined;

  if (isReference(schema)) {
    if (seen.has(schema.$ref)) return undefined;
    seen.add(schema.$ref);
    const resolved = resolveRef(spec, schema.$ref);
    if (!resolved) return undefined;
    return generateExampleFromSchema(spec, resolved, depth, seen);
  }

  if (schema.example !== undefined) return schema.example;

  if (schema.allOf) {
    const merged: Record<string, unknown> = {};
    let hasValue = false;
    for (const sub of schema.allOf) {
      const val = generateExampleFromSchema(spec, sub, depth, seen);
      if (val !== undefined && typeof val === "object" && !Array.isArray(val)) {
        Object.assign(merged, val);
        hasValue = true;
      }
    }
    return hasValue ? merged : undefined;
  }

  const unionKey: "oneOf" | "anyOf" | null = schema.oneOf
    ? "oneOf"
    : schema.anyOf
      ? "anyOf"
      : null;
  if (unionKey) {
    const variants = schema[unionKey];
    if (Array.isArray(variants) && variants.length > 0) {
      return generateExampleFromSchema(spec, variants[0], depth, seen);
    }
    return undefined;
  }

  if (schema.type === "object" || schema.properties) {
    const properties = schema.properties;
    if (!properties) return undefined;

    const obj: Record<string, unknown> = {};
    let hasValue = false;

    for (const [propName, propSchema] of Object.entries(properties)) {
      const val = generateExampleFromSchema(spec, propSchema, depth + 1, seen);
      if (val !== undefined) {
        obj[propName] = val;
        hasValue = true;
      }
    }

    return hasValue ? obj : undefined;
  }

  if (schema.type === "array" && schema.items) {
    const itemExample = generateExampleFromSchema(
      spec,
      schema.items,
      depth + 1,
      seen,
    );
    if (itemExample !== undefined) return [itemExample];
    return undefined;
  }

  if (schema.enum && schema.enum.length > 0) {
    return schema.enum[0];
  }

  if (schema.default !== undefined) return schema.default;

  return undefined;
}

/**
 * Build curl params from resolved parameter objects. As in Hugo's curl, a
 * parameter with no example never falls back to its schema default, so it
 * exports `"CHANGE_ME"` instead. Hugo reads the spec with every `$ref`
 * resolved, so a schema reference's example counts too.
 */
function toCurlParams(
  spec: OpenAPIV3.Document,
  params: OpenAPIV3.ParameterObject[],
): CurlParam[] {
  return params.map((p) => {
    const schema = resolveSchema(spec, p.schema);
    const example = p.example ?? schema?.example;
    // Hugo splits an array only when `explode` is set explicitly.
    const explodedItemCount =
      p.explode === true && Array.isArray(example) ? example.length : undefined;
    return {
      name: p.name,
      example: example !== undefined ? String(example) : undefined,
      explodedItemCount,
      // Hugo's curl also treats `x-docs-curl-required` as required.
      required:
        p.required === true ||
        (p as { "x-docs-curl-required"?: boolean })["x-docs-curl-required"] ===
          true,
    };
  });
}

/** Drop `$ref` entries; returns undefined so the curl builder uses its defaults. */
function toCurlSecuritySchemes(
  securitySchemes: OpenAPIV3.ComponentsObject["securitySchemes"],
): Record<string, CurlSecurityScheme> | undefined {
  if (!securitySchemes) return undefined;
  const curlSecuritySchemesByName: Record<string, CurlSecurityScheme> = {};
  for (const [name, securityScheme] of Object.entries(securitySchemes)) {
    if (!isReference(securityScheme)) {
      curlSecuritySchemesByName[name] = securityScheme as CurlSecurityScheme;
    }
  }
  return curlSecuritySchemesByName;
}
