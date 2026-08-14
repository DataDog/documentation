/**
 * Operation-level extraction helpers used by the `views.ts` builder.
 *
 * Pure helper functions: take a parsed spec and an operation object, return
 * structured data. No caching, no I/O.
 */

import type { OpenAPIV3 } from "openapi-types";
import { resolveRef, topLevelSchemaToFields } from "./refResolver";
import { buildCurlCommand } from "./curlBuilder";
import { getRegions } from "./regionResolver";
import type { SchemaField } from "./schemas/schemaField";
import type { CurlParam } from "./schemas/curl";
import type { ResponseData, RequestBodyData } from "./schemas/views";
import type { SplitParams } from "./schemas/params";

type ParameterOrRef = OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject;
type OperationWithExtensions = OpenAPIV3.OperationObject & {
  "x-permission"?: { permissions?: string[]; operator?: string };
};

function isReference(o: unknown): o is OpenAPIV3.ReferenceObject {
  return typeof o === "object" && o !== null && "$ref" in o && typeof (o as { $ref: unknown }).$ref === "string";
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
 * Extract OAuth scopes from the `security` block's AuthZ requirement.
 */
export function extractOauthScopes(
  security?: OpenAPIV3.SecurityRequirementObject[],
): string[] | undefined {
  if (!security || !Array.isArray(security)) return undefined;

  for (const requirement of security) {
    if (
      requirement.AuthZ &&
      Array.isArray(requirement.AuthZ) &&
      requirement.AuthZ.length > 0
    ) {
      return requirement.AuthZ;
    }
  }

  return undefined;
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

  const jsonContent = content["application/json"];
  if (!jsonContent) return undefined;

  const schema = jsonContent.schema
    ? topLevelSchemaToFields(spec, jsonContent.schema)
    : [];

  const examples: Array<{ name: string; value: string }> = [];

  if (jsonContent.examples && typeof jsonContent.examples === "object") {
    for (const [name, exampleObj] of Object.entries(jsonContent.examples)) {
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
  } else if (jsonContent.example !== undefined) {
    examples.push({
      name: "Example",
      value: JSON.stringify(jsonContent.example, null, 2),
    });
  }

  if (examples.length === 0 && jsonContent.schema) {
    const generated = generateExampleFromSchema(spec, jsonContent.schema);
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
    const jsonContent = resolved?.content?.["application/json"];
    if (jsonContent?.schema) {
      schema = topLevelSchemaToFields(spec, jsonContent.schema);
    }

    let examples: Array<{ name: string; value: string }> | undefined;
    if (jsonContent?.examples && typeof jsonContent.examples === "object") {
      examples = [];
      for (const [name, exampleObj] of Object.entries(jsonContent.examples)) {
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
      if (examples.length === 0) examples = undefined;
    } else if (jsonContent?.example !== undefined) {
      examples = [
        {
          name: "Example",
          value: JSON.stringify(jsonContent.example, null, 2),
        },
      ];
    }

    if (!examples && jsonContent?.schema) {
      const generated = generateExampleFromSchema(spec, jsonContent.schema);
      if (generated !== undefined) {
        examples = [
          {
            name: "Example",
            value: JSON.stringify(generated, null, 2),
          },
        ];
      }
    }

    result.push({ statusCode, description, schema, examples });
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
  const regions = getRegions(spec, operation);
  const servers = operation?.servers ?? spec?.servers;
  const subdomain: string =
    servers?.[0]?.variables?.subdomain?.default ?? "api";

  const result: Record<string, string> = {};
  for (const region of regions) {
    result[region.key] = buildCurlCommand({
      method,
      path,
      site: region.site,
      subdomain,
      pathParams: toCurlParams(splitParams.path),
      queryParams: toCurlParams(splitParams.query),
      requestBodyJson,
      security: operation.security,
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
 * Build curl params from resolved parameter objects.
 */
function toCurlParams(params: OpenAPIV3.ParameterObject[]): CurlParam[] {
  return params.map((p) => {
    const schema: OpenAPIV3.SchemaObject | undefined =
      p.schema && !isReference(p.schema) ? p.schema : undefined;
    const example = p.example ?? schema?.example ?? schema?.default;
    return {
      name: p.name,
      example: example !== undefined ? String(example) : undefined,
      required: p.required === true,
    };
  });
}
