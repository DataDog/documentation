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
 * Extract request body schema and examples from the operation.
 */
export function extractRequestBody(
  spec: OpenAPIV3.Document,
  operation: OpenAPIV3.OperationObject,
): RequestBodyData | undefined {
  const rb = operation.requestBody;
  if (!rb) return undefined;

  const resolved: OpenAPIV3.RequestBodyObject = isReference(rb)
    ? (resolveRef(spec, rb.$ref) ?? rb)
    : rb;

  const content = resolved.content;
  if (!content) return undefined;

  // Hugo renders a body whatever its content type. Prefer JSON, then fall
  // back to the first declared type (e.g. `text/json`, `multipart/form-data`).
  const mediaType =
    "application/json" in content
      ? "application/json"
      : Object.keys(content)[0];
  if (!mediaType) return undefined;
  const bodyContent = content[mediaType];

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
    };
  }

  if (bodyContent.examples && typeof bodyContent.examples === "object") {
    for (const [name, exampleObj] of Object.entries(bodyContent.examples)) {
      const resolvedExample: OpenAPIV3.ExampleObject = isReference(exampleObj)
        ? (resolveRef(spec, exampleObj.$ref) ?? exampleObj)
        : exampleObj;

      if (resolvedExample?.value !== undefined) {
        examples.push({
          name: resolvedExample.summary ?? name,
          value: JSON.stringify(resolvedExample.value, null, 2),
        });
      }
    }
  } else if (bodyContent.example !== undefined) {
    examples.push({
      name: "Example",
      value: JSON.stringify(bodyContent.example, null, 2),
    });
  }

  if (examples.length === 0 && bodyContent.schema) {
    const generated = generateExampleFromSchema(spec, bodyContent.schema);
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
  };
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
  requestBodyJson?: string,
): Record<string, string> {
  const options = curlOptionsForOperation(
    spec,
    method,
    path,
    operation,
    splitParams,
    requestBodyJson,
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
  requestBodyJson?: string,
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
      requestBodyJson,
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
  requestBodyJson: string | undefined,
): GenerateCurlOptions {
  const servers = operation?.servers ?? spec?.servers;
  return {
    method,
    path,
    subdomain: servers?.[0]?.variables?.subdomain?.default ?? "api",
    pathParams: toCurlParams(spec, splitParams.path),
    queryParams: toCurlParams(spec, splitParams.query),
    headerParams: toCurlParams(spec, splitParams.header),
    requestBodyJson,
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
