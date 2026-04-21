/**
 * $ref resolution and schema-to-SchemaField conversion for OpenAPI specs.
 *
 * This module reads parsed OpenAPI spec objects and converts them to a flat,
 * component-ready format. It does NOT read files — it works with the parsed
 * YAML objects already loaded by `src/data/api/index.ts`.
 */

import { renderMarkdownInline } from './markdown';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface SchemaField {
  name: string;
  /** Display string, e.g. "string", "integer", "[object]", "enum" */
  type: string;
  required: boolean;
  deprecated: boolean;
  readOnly: boolean;
  /** HTML string rendered from the spec's Markdown description */
  description: string;
  enumValues?: string[];
  defaultValue?: string;
  /** Nested objects/arrays (recursive) */
  children?: SchemaField[];
  /** oneOf / anyOf variant options */
  unionOptions?: { label: string; fields: SchemaField[] }[];
}

/* ------------------------------------------------------------------ */
/*  Module-level cache for resolved $ref schemas                       */
/* ------------------------------------------------------------------ */

const refCache = new Map<string, any>();

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
  if (refCache.has(refString)) {
    return refCache.get(refString);
  }

  const parts = refString.replace(/^#\//, '').split('/');
  let current: any = spec;

  for (const part of parts) {
    if (current == null || typeof current !== 'object') {
      return undefined;
    }
    // JSON Pointer escapes: ~1 → /, ~0 → ~
    const unescaped = part.replace(/~1/g, '/').replace(/~0/g, '~');
    current = current[unescaped];
  }

  refCache.set(refString, current);
  return current;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Maximum recursion depth for circular-reference protection. */
const MAX_DEPTH = 10;

/**
 * Build a display type string for a schema. Handles format annotations
 * (e.g. "string (date-time)") and enums.
 */
function displayType(schema: any): string {
  const base: string = schema.type ?? 'object';

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
  const parts = refString.split('/');
  return parts[parts.length - 1];
}

/* ------------------------------------------------------------------ */
/*  Schema → SchemaField[] conversion                                  */
/* ------------------------------------------------------------------ */

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
 * @returns A flat array of `SchemaField` objects, possibly with nested children.
 */
export function schemaToFields(
  spec: any,
  schema: any,
  visited: Set<string> = new Set()
): SchemaField[] {
  if (!schema) return [];

  // ── $ref resolution ──────────────────────────────────────────────
  if (schema.$ref) {
    const ref: string = schema.$ref;

    // Circular reference guard
    if (visited.has(ref) || visited.size >= MAX_DEPTH) {
      return [
        {
          name: '(recursive)',
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
    return schemaToFields(spec, resolved, nextVisited);
  }

  // ── oneOf / anyOf (union types) ──────────────────────────────────
  const unionKey = schema.oneOf ? 'oneOf' : schema.anyOf ? 'anyOf' : null;
  if (unionKey) {
    const variants: any[] = schema[unionKey];
    const unionOptions = variants.map((variant: any, idx: number) => {
      const label =
        variant.$ref ? refName(variant.$ref) : `Option ${idx + 1}`;
      return {
        label,
        fields: schemaToFields(spec, variant, new Set(visited)),
      };
    });

    // Return a single synthetic field that carries the union options
    return [
      {
        name: schema.title ?? '',
        type: unionKey,
        required: false,
        deprecated: schema.deprecated === true,
        readOnly: schema.readOnly === true,
        description: renderMarkdownInline(schema.description ?? ''),
        unionOptions,
      },
    ];
  }

  // ── allOf (merged schemas) ───────────────────────────────────────
  if (schema.allOf) {
    const merged = mergeAllOf(schema.allOf, spec, visited);
    return schemaToFields(spec, merged, visited);
  }

  // ── object type ──────────────────────────────────────────────────
  if (schema.type === 'object' || schema.properties) {
    const requiredSet = new Set<string>(schema.required ?? []);
    const properties: Record<string, any> = schema.properties ?? {};

    return Object.entries(properties).map(([propName, propSchema]: [string, any]) => {
      return propertyToField(spec, propName, propSchema, requiredSet.has(propName), visited);
    });
  }

  // ── array type ───────────────────────────────────────────────────
  if (schema.type === 'array') {
    const items = schema.items;
    if (!items) {
      return [
        {
          name: '',
          type: '[any]',
          required: false,
          deprecated: schema.deprecated === true,
          readOnly: schema.readOnly === true,
          description: renderMarkdownInline(schema.description ?? ''),
        },
      ];
    }

    const itemTypeName = resolveItemTypeName(spec, items);
    const children = schemaToFields(spec, items, new Set(visited));

    return [
      {
        name: '',
        type: `[${itemTypeName}]`,
        required: false,
        deprecated: schema.deprecated === true,
        readOnly: schema.readOnly === true,
        description: renderMarkdownInline(schema.description ?? ''),
        ...(children.length > 0 ? { children } : {}),
      },
    ];
  }

  // ── primitive types ──────────────────────────────────────────────
  const field: SchemaField = {
    name: '',
    type: displayType(schema),
    required: false,
    deprecated: schema.deprecated === true,
    readOnly: schema.readOnly === true,
    description: renderMarkdownInline(schema.description ?? ''),
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
/*  Internal helpers for schema conversion                             */
/* ------------------------------------------------------------------ */

/**
 * Convert a single named property into a `SchemaField`, recursing into
 * nested objects, arrays, and unions as needed.
 */
function propertyToField(
  spec: any,
  name: string,
  schema: any,
  required: boolean,
  visited: Set<string>
): SchemaField {
  if (!schema) {
    return {
      name,
      type: 'any',
      required,
      deprecated: false,
      readOnly: false,
      description: '',
    };
  }

  // Resolve $ref first so we can inspect the real schema
  let resolved = schema;
  let resolvedRef: string | undefined;
  if (schema.$ref) {
    const ref = schema.$ref;
    resolvedRef = ref;

    // Circular reference guard
    if (visited.has(ref) || visited.size >= MAX_DEPTH) {
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
  const unionKey = resolved.oneOf ? 'oneOf' : resolved.anyOf ? 'anyOf' : null;
  if (unionKey) {
    const variants: any[] = resolved[unionKey];
    const unionOptions = variants.map((variant: any, idx: number) => {
      const label =
        variant.$ref ? refName(variant.$ref) : `Option ${idx + 1}`;
      return {
        label,
        fields: schemaToFields(spec, variant, new Set(nextVisited)),
      };
    });

    return {
      name,
      type: unionKey,
      required,
      deprecated: resolved.deprecated === true,
      readOnly: resolved.readOnly === true,
      description: renderMarkdownInline(resolved.description ?? ''),
      unionOptions,
    };
  }

  // ── allOf ────────────────────────────────────────────────────────
  if (resolved.allOf) {
    const merged = mergeAllOf(resolved.allOf, spec, nextVisited);
    const children = schemaToFields(spec, merged, nextVisited);
    return {
      name,
      type: 'object',
      required,
      deprecated: resolved.deprecated === true,
      readOnly: resolved.readOnly === true,
      description: renderMarkdownInline(resolved.description ?? ''),
      ...(children.length > 0 ? { children } : {}),
    };
  }

  // ── object ───────────────────────────────────────────────────────
  if (resolved.type === 'object' || resolved.properties) {
    const children = schemaToFields(spec, resolved, nextVisited);
    return {
      name,
      type: 'object',
      required,
      deprecated: resolved.deprecated === true,
      readOnly: resolved.readOnly === true,
      description: renderMarkdownInline(resolved.description ?? ''),
      ...(children.length > 0 ? { children } : {}),
    };
  }

  // ── array ────────────────────────────────────────────────────────
  if (resolved.type === 'array') {
    const items = resolved.items;
    const itemTypeName = items ? resolveItemTypeName(spec, items) : 'any';
    const children = items ? schemaToFields(spec, items, new Set(nextVisited)) : [];

    return {
      name,
      type: `[${itemTypeName}]`,
      required,
      deprecated: resolved.deprecated === true,
      readOnly: resolved.readOnly === true,
      description: renderMarkdownInline(resolved.description ?? ''),
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
    description: renderMarkdownInline(resolved.description ?? ''),
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
function resolveItemTypeName(spec: any, items: any): string {
  if (items.$ref) {
    return refName(items.$ref);
  }
  if (items.oneOf || items.anyOf) {
    return 'oneOf';
  }
  if (items.type === 'object' || items.properties) {
    return 'object';
  }
  return items.type ?? 'any';
}

/**
 * Merge an `allOf` array into a single schema object by combining
 * `properties`, `required`, and top-level fields from each sub-schema.
 */
function mergeAllOf(schemas: any[], spec: any, visited: Set<string>): any {
  const merged: any = { type: 'object', properties: {}, required: [] };

  for (const sub of schemas) {
    let resolved = sub;
    if (sub.$ref) {
      resolved = resolveRef(spec, sub.$ref) ?? sub;
    }

    if (resolved.properties) {
      Object.assign(merged.properties, resolved.properties);
    }
    if (resolved.required) {
      merged.required.push(...resolved.required);
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
  merged.required = [...new Set<string>(merged.required)];
  return merged;
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

    const name: string = resolved.name ?? '';
    const required: boolean = resolved.required === true;
    const description: string = renderMarkdownInline(resolved.description ?? '');
    const deprecated: boolean = resolved.deprecated === true;

    // Resolve the parameter's inner schema
    let paramSchema = resolved.schema;
    if (paramSchema?.$ref) {
      paramSchema = resolveRef(spec, paramSchema.$ref) ?? paramSchema;
    }

    if (!paramSchema) {
      return {
        name,
        type: 'any',
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
