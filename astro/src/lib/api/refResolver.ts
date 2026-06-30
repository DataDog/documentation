/**
 * $ref resolution and schema-to-SchemaField conversion for OpenAPI specs.
 *
 * This module reads parsed OpenAPI spec objects and converts them to a flat,
 * component-ready format. It does NOT read files — it works with the parsed
 * YAML objects already loaded by `src/lib/api/specParser.ts`.
 */

import type { SchemaField } from "./schemas/schemaField";

/**
 * Maximum row-nesting level emitted in the schema table, matching Hugo's
 * `assets/scripts/build-api-pages.js` (`if (level > 10) return ''`).
 *
 * Counts only parent → child row descents (the same boundary Hugo's
 * `rowRecursive` uses). $ref resolution, `allOf` merging, and `oneOf`/
 * `anyOf` unwrapping at the same property level do NOT increment.
 *
 * Cycle detection is handled separately by the `visited` set of $ref
 * strings; Hugo dodges this by replacing circular `items` with the
 * literal `[Circular]` sentinel upstream, but Astro reads the raw spec
 * and so still needs an in-pass cycle check.
 */
const MAX_DEPTH = 10;

/* ------------------------------------------------------------------ */
/*  Module-level cache for resolved $ref schemas                       */
/*                                                                     */
/*  Keyed by the spec object itself so v1 and v2 don't share entries — */
/*  both specs use overlapping ref strings (e.g. `#/components/schemas */
/*  /APIErrorResponse`) that resolve to different schemas.             */
/* ------------------------------------------------------------------ */

const refCache = new WeakMap<object, Map<string, any>>();

/* ------------------------------------------------------------------ */
/*  $ref resolution                                                    */
/* ------------------------------------------------------------------ */

/**
 * Follow a `$ref` string (e.g. `#/components/schemas/Foo`) to its target
 * object within the given spec. Uses JSON Pointer semantics: split on `/`,
 * skip the leading `#`.
 *
 * @param spec  The full parsed OpenAPI spec object.
 * @param refString  A JSON Pointer reference string starting with `#/`.
 * @returns The resolved object, or `undefined` if the path is invalid.
 */
export function resolveRef(spec: any, refString: string): any {
  let perSpec = refCache.get(spec);
  if (perSpec) {
    const cached = perSpec.get(refString);
    if (cached !== undefined || perSpec.has(refString)) return cached;
  }

  const parts = refString.replace(/^#\//, "").split("/");
  let current: any = spec;

  for (const part of parts) {
    if (current == null || typeof current !== "object") {
      return undefined;
    }
    // JSON Pointer escapes: ~1 → /, ~0 → ~
    const unescaped = part.replace(/~1/g, "/").replace(/~0/g, "~");
    current = current[unescaped];
  }

  if (!perSpec) {
    perSpec = new Map();
    refCache.set(spec, perSpec);
  }
  perSpec.set(refString, current);
  return current;
}

/* ------------------------------------------------------------------ */
/*  Schema → SchemaField[] conversion                                  */
/* ------------------------------------------------------------------ */

/**
 * Top-level entry point for converting a request or response body schema
 * into rows.
 *
 * Mirrors the unwrap performed by `schemaTable` in
 * `assets/scripts/build-api-pages.js` before it calls `rowRecursive`:
 *
 * - Top-level array → render the items' fields directly at level 0,
 *   no wrapping `[Foo]` row.
 * - Top-level array of arrays → unwrap to the innermost items.
 * - Top-level array of primitives → no rows (Hugo hides the table).
 * - Anything else → equivalent to `schemaToFields`.
 *
 * `$ref` and `allOf` are resolved before the array check, matching
 * Hugo's pre-flattened input.
 */
export function topLevelSchemaToFields(
  spec: any,
  schema: any,
): SchemaField[] {
  if (!schema) return [];

  const visited = new Set<string>();

  let resolved: any = schema;
  while (resolved && resolved.$ref) {
    if (visited.has(resolved.$ref)) break;
    visited.add(resolved.$ref);
    const next = resolveRef(spec, resolved.$ref);
    if (!next) return [];
    resolved = next;
  }
  if (resolved.allOf) {
    resolved = mergeAllOf(resolved.allOf, spec);
  }

  if (resolved.type !== "array") {
    return schemaToFields(spec, schema);
  }

  const items = resolved.items;
  if (!items) return [];

  let resolvedItems: any = items;
  while (resolvedItems && resolvedItems.$ref) {
    if (visited.has(resolvedItems.$ref)) break;
    visited.add(resolvedItems.$ref);
    const next = resolveRef(spec, resolvedItems.$ref);
    if (!next) return [];
    resolvedItems = next;
  }
  if (resolvedItems.allOf) {
    resolvedItems = mergeAllOf(resolvedItems.allOf, spec);
  }

  if (resolvedItems.type === "array") {
    return topLevelSchemaToFields(spec, resolvedItems);
  }

  if (
    resolvedItems.properties ||
    resolvedItems.oneOf ||
    resolvedItems.anyOf
  ) {
    // Pass the already-resolved schema, not the original $ref wrapper:
    // we've added the resolved $refs to `visited` for cycle protection
    // on later descents, so re-resolving here would self-trigger.
    return schemaToFields(spec, resolvedItems, visited);
  }

  return [];
}

/**
 * Convert an OpenAPI schema object into a `SchemaField[]` tree suitable for
 * rendering in UI components.
 *
 * Handles:
 * - `$ref` resolution
 * - `object` with `properties`
 * - `array` with `items`
 * - `oneOf` / `anyOf` (union options)
 * - `allOf` (merged properties)
 * - Primitives (`string`, `integer`, `number`, `boolean`)
 * - `enum` values
 * - `format`, `example`, `default`, `readOnly`, `deprecated`
 * - Circular reference detection via a visited set
 *
 * @param spec     The full parsed OpenAPI spec object.
 * @param schema   The schema object (or object with `$ref`) to convert.
 * @param visited  Set of `$ref` strings already seen on this path (for cycle detection).
 * @param level    Hugo-equivalent row-nesting level (0 at the schema root).
 * @returns A flat array of `SchemaField` objects, possibly with nested children.
 */
export function schemaToFields(
  spec: any,
  schema: any,
  visited: Set<string> = new Set(),
  level: number = 0,
): SchemaField[] {
  if (!schema) return [];
  if (level > MAX_DEPTH) return [];

  // ── $ref resolution ──────────────────────────────────────────────
  if (schema.$ref) {
    const ref: string = schema.$ref;

    if (visited.has(ref)) {
      return [
        {
          name: "(recursive)",
          type: refName(ref),
          required: false,
          deprecated: false,
          readOnly: false,
          description: `Circular reference to ${refName(ref)}.`,
        },
      ];
    }

    const resolved = resolveRef(spec, ref);
    if (!resolved) return [];

    const nextVisited = new Set(visited);
    nextVisited.add(ref);
    return schemaToFields(spec, resolved, nextVisited, level);
  }

  // ── oneOf / anyOf (union types) ──────────────────────────────────
  const unionKey = schema.oneOf ? "oneOf" : schema.anyOf ? "anyOf" : null;
  if (unionKey) {
    const variants: any[] = schema[unionKey];
    const unionOptions = variants.map((variant: any, idx: number) => {
      const label = variant.$ref ? refName(variant.$ref) : `Option ${idx + 1}`;
      return {
        label,
        fields: schemaToFields(spec, variant, new Set(visited), level + 2),
      };
    });

    // Return a single synthetic field that carries the union options
    return [
      {
        name: schema.title ?? "",
        type: unionKey,
        required: false,
        deprecated: schema.deprecated === true,
        readOnly: schema.readOnly === true,
        description: schema.description ?? "",
        unionOptions,
      },
    ];
  }

  // ── allOf (merged schemas) ───────────────────────────────────────
  if (schema.allOf) {
    const merged = mergeAllOf(schema.allOf, spec);
    return schemaToFields(spec, merged, visited, level);
  }

  // ── object type ──────────────────────────────────────────────────
  if (schema.type === "object" || schema.properties) {
    const requiredSet = new Set<string>(schema.required ?? []);
    const properties: Record<string, any> = schema.properties ?? {};

    return Object.entries(properties).map(
      ([propName, propSchema]: [string, any]) => {
        return propertyToField(
          spec,
          propName,
          propSchema,
          requiredSet.has(propName),
          visited,
          level,
        );
      },
    );
  }

  // ── array type ───────────────────────────────────────────────────
  if (schema.type === "array") {
    const items = schema.items;
    if (!items) {
      return [
        {
          name: "",
          type: "[any]",
          required: false,
          deprecated: schema.deprecated === true,
          readOnly: schema.readOnly === true,
          description: schema.description ?? "",
        },
      ];
    }

    const itemTypeName = resolveItemTypeName(items);
    const children = arrayItemsHaveChildren(items, spec)
      ? schemaToFields(spec, items, new Set(visited), level + 1)
      : [];

    return [
      {
        name: "",
        type: `[${itemTypeName}]`,
        required: false,
        deprecated: schema.deprecated === true,
        readOnly: schema.readOnly === true,
        description: schema.description ?? "",
        ...(children.length > 0 ? { children } : {}),
      },
    ];
  }

  // ── primitive types ──────────────────────────────────────────────
  const field: SchemaField = {
    name: "",
    type: displayType(schema),
    required: false,
    deprecated: schema.deprecated === true,
    readOnly: schema.readOnly === true,
    description: schema.description ?? "",
  };

  if (schema.enum) {
    field.enumValues = schema.enum.map(String);
  }
  if (schema.default !== undefined) {
    field.defaultValue = String(schema.default);
  }

  return [field];
}

/* ------------------------------------------------------------------ */
/*  Parameter → SchemaField[] conversion                               */
/* ------------------------------------------------------------------ */

/**
 * Convert an array of OpenAPI parameter objects (path, query, header)
 * into `SchemaField[]`.
 *
 * Each parameter typically has `name`, `required`, `description`, and a
 * `schema` sub-object (which may itself contain a `$ref`).
 *
 * @param spec    The full parsed OpenAPI spec object.
 * @param params  Array of OpenAPI parameter objects.
 * @returns An array of `SchemaField` objects (one per parameter).
 */
export function paramsToFields(spec: any, params: any[]): SchemaField[] {
  if (!params || !Array.isArray(params)) return [];

  return params.map((param) => {
    // Parameters themselves can be $ref pointers
    let resolved = param;
    if (param.$ref) {
      resolved = resolveRef(spec, param.$ref) ?? param;
    }

    const name: string = resolved.name ?? "";
    const required: boolean = resolved.required === true;
    const description: string = resolved.description ?? "";
    const deprecated: boolean = resolved.deprecated === true;

    // Resolve the parameter's inner schema
    let paramSchema = resolved.schema;
    if (paramSchema?.$ref) {
      paramSchema = resolveRef(spec, paramSchema.$ref) ?? paramSchema;
    }

    if (!paramSchema) {
      return {
        name,
        type: "any",
        required,
        deprecated,
        readOnly: false,
        description,
      };
    }

    const field: SchemaField = {
      name,
      type: displayType(paramSchema),
      required,
      deprecated,
      readOnly: paramSchema.readOnly === true,
      description,
    };

    if (paramSchema.enum) {
      field.enumValues = paramSchema.enum.map(String);
    }
    if (paramSchema.default !== undefined) {
      field.defaultValue = String(paramSchema.default);
    }

    return field;
  });
}

/* ------------------------------------------------------------------ */
/*  Private helpers                                                    */
/* ------------------------------------------------------------------ */

/**
 * Build a display type string for a schema. Handles format annotations
 * (e.g. "string (date-time)") and enums.
 */
function displayType(schema: any): string {
  const base: string = schema.type ?? "object";

  if (schema.enum) {
    // Show the underlying type; callers also set `enumValues`
    return schema.format ? `${base} (${schema.format})` : base;
  }

  if (schema.format) {
    return `${base} (${schema.format})`;
  }

  return base;
}

/**
 * Extract the human-readable name from a `$ref` string.
 * e.g. `#/components/schemas/DashboardCreateRequest` → `DashboardCreateRequest`
 */
function refName(refString: string): string {
  const parts = refString.split("/");
  return parts[parts.length - 1];
}

/**
 * Convert a single named property into a `SchemaField`, recursing into
 * nested objects, arrays, and unions as needed.
 */
function propertyToField(
  spec: any,
  name: string,
  schema: any,
  required: boolean,
  visited: Set<string>,
  level: number,
): SchemaField {
  if (!schema) {
    return {
      name,
      type: "any",
      required,
      deprecated: false,
      readOnly: false,
      description: "",
    };
  }

  // Resolve $ref first so we can inspect the real schema
  let resolved = schema;
  let resolvedRef: string | undefined;
  if (schema.$ref) {
    const ref = schema.$ref;
    resolvedRef = ref;

    if (visited.has(ref)) {
      return {
        name,
        type: refName(ref),
        required,
        deprecated: false,
        readOnly: false,
        description: `Circular reference to ${refName(ref)}.`,
      };
    }

    resolved = resolveRef(spec, ref) ?? schema;
  }

  const nextVisited = new Set(visited);
  if (resolvedRef) nextVisited.add(resolvedRef);

  // ── oneOf / anyOf ────────────────────────────────────────────────
  const unionKey = resolved.oneOf ? "oneOf" : resolved.anyOf ? "anyOf" : null;
  if (unionKey) {
    const variants: any[] = resolved[unionKey];
    const unionOptions = variants.map((variant: any, idx: number) => {
      const label = variant.$ref ? refName(variant.$ref) : `Option ${idx + 1}`;
      return {
        label,
        fields: schemaToFields(spec, variant, new Set(nextVisited), level + 2),
      };
    });

    return {
      name,
      type: unionKey,
      required,
      deprecated: resolved.deprecated === true,
      readOnly: resolved.readOnly === true,
      description: resolved.description ?? "",
      unionOptions,
    };
  }

  // ── allOf ────────────────────────────────────────────────────────
  if (resolved.allOf) {
    const merged = mergeAllOf(resolved.allOf, spec);
    const children = schemaToFields(spec, merged, nextVisited, level + 1);
    return {
      name,
      type: "object",
      required,
      deprecated: resolved.deprecated === true,
      readOnly: resolved.readOnly === true,
      description: resolved.description ?? "",
      ...(children.length > 0 ? { children } : {}),
    };
  }

  // ── object ───────────────────────────────────────────────────────
  if (resolved.type === "object" || resolved.properties) {
    const children = schemaToFields(spec, resolved, nextVisited, level + 1);
    return {
      name,
      type: "object",
      required,
      deprecated: resolved.deprecated === true,
      readOnly: resolved.readOnly === true,
      description: resolved.description ?? "",
      ...(children.length > 0 ? { children } : {}),
    };
  }

  // ── array ────────────────────────────────────────────────────────
  if (resolved.type === "array") {
    const items = resolved.items;
    const itemTypeName = items ? resolveItemTypeName(items) : "any";
    const children =
      items && arrayItemsHaveChildren(items, spec)
        ? schemaToFields(spec, items, new Set(nextVisited), level + 1)
        : [];

    return {
      name,
      type: `[${itemTypeName}]`,
      required,
      deprecated: resolved.deprecated === true,
      readOnly: resolved.readOnly === true,
      description: resolved.description ?? "",
      ...(children.length > 0 ? { children } : {}),
    };
  }

  // ── primitive / enum ─────────────────────────────────────────────
  const field: SchemaField = {
    name,
    type: displayType(resolved),
    required,
    deprecated: resolved.deprecated === true,
    readOnly: resolved.readOnly === true,
    description: resolved.description ?? "",
  };

  if (resolved.enum) {
    field.enumValues = resolved.enum.map(String);
  }
  if (resolved.default !== undefined) {
    field.defaultValue = String(resolved.default);
  }

  return field;
}

/**
 * Determine the display type name for array items.
 */
function resolveItemTypeName(items: any): string {
  if (items.$ref) {
    return refName(items.$ref);
  }
  if (items.oneOf || items.anyOf) {
    return "oneOf";
  }
  if (items.type === "object" || items.properties) {
    return "object";
  }
  return items.type ?? "any";
}

/**
 * Decide whether an array's `items` should expand into child rows.
 *
 * Mirrors Hugo's `rowRecursive` array branch in
 * `assets/scripts/build-api-pages.js`, which sets `childData` only when
 * `items.properties` or `items.oneOf` exists. Primitive items, nested
 * arrays, and enums get no child row.
 *
 * Hugo's upstream pipeline pre-resolves `$ref` and `allOf`, so we do the
 * same locally before applying that check.
 */
function arrayItemsHaveChildren(items: any, spec: any): boolean {
  if (!items || typeof items !== "object") return false;

  let resolved = items;
  if (items.$ref) {
    const r = resolveRef(spec, items.$ref);
    if (!r) return false;
    resolved = r;
  }

  if (resolved.allOf) {
    resolved = mergeAllOf(resolved.allOf, spec);
  }

  return !!(resolved.properties || resolved.oneOf || resolved.anyOf);
}

/**
 * Merge an `allOf` array into a single schema object by combining
 * `properties`, `required`, and top-level fields from each sub-schema.
 */
function mergeAllOf(schemas: any[], spec: any): any {
  const merged: Record<string, unknown> = {
    type: "object",
    properties: {},
    required: [],
  };

  for (const sub of schemas) {
    let resolved = sub;
    if (sub.$ref) {
      resolved = resolveRef(spec, sub.$ref) ?? sub;
    }

    if (resolved.properties) {
      Object.assign(
        merged.properties as Record<string, unknown>,
        resolved.properties,
      );
    }
    if (resolved.required) {
      (merged.required as string[]).push(...resolved.required);
    }
    // Preserve top-level metadata from the first schema that has it
    if (resolved.description && !merged.description) {
      merged.description = resolved.description;
    }
    if (resolved.deprecated === true) {
      merged.deprecated = true;
    }
    if (resolved.readOnly === true) {
      merged.readOnly = true;
    }
  }

  // Deduplicate required array
  merged.required = [...new Set<string>(merged.required as string[])];
  return merged;
}
