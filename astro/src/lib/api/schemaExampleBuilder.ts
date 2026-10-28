/**
 * Builds a JSON example from a schema the way Hugo does, so response examples
 * match the live site.
 *
 * A port of `filterExampleJson` and its helpers in Hugo's
 * `hugo/assets/scripts/build-api-pages.js`. Hugo ignores the spec's
 * `examples`, so this does too. Each field uses its schema `example` when it
 * has one, and a type placeholder (`"string"`, `"integer"`, `false`, ...)
 * when it doesn't.
 *
 * Hugo builds the example as a JSON string and parses it at the end. The port
 * keeps that shape on purpose: several of Hugo's quirks (for example, how an
 * array example is unwrapped) only make sense as string building, and
 * matching prod means keeping them.
 *
 * Hugo runs on a fully dereferenced spec. Astro reads the raw spec, so
 * `deref` resolves each `$ref` as the walk reaches it. In Hugo's spec, a
 * `$ref` back to a schema on the current path is the string `"[Circular]"`,
 * so the walk tracks the `$ref`s on its path and stops at the same place.
 */

import type { OpenAPIV3 } from "openapi-types";
import { resolveRef } from "./refResolver";

export type ExampleActionType = "request" | "response";

/** Hugo's recursion limit (`if(level > 10)`). */
const MAX_LEVEL = 10;

/** Hugo skips a oneOf with this many variants or more. */
const ONE_OF_LIMIT = 50;

/** What Hugo's dereferenced spec holds where a `$ref` cycle closes. */
const CIRCULAR = "[Circular]";

/** The date Hugo writes for every `date-time` field without an example. */
const PLACEHOLDER_DATE_TIME = new Date("19 September 2019 10:00 UTC");

type Schema = Record<string, any>;

/**
 * The example for one request or response schema, or `undefined` when the
 * built string isn't valid JSON (Hugo logs those and shows an empty string).
 */
export function buildSchemaExample(
  spec: OpenAPIV3.Document,
  actionType: ExampleActionType,
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
): unknown {
  const data = deref(spec, schema);
  if (!data) return undefined;

  if (
    (data.additionalProperties && data.example) ||
    (data.example && actionType === "response")
  ) {
    return data.example;
  }

  const [prefix, suffix] = jsonWrapChars(spec, data);
  const jsonString = filterJson(
    spec,
    actionType,
    initialJsonData(spec, data),
    initialExample(spec, data),
    0,
    initialRefPath(spec, schema, data),
  );

  try {
    return JSON.parse(`${prefix}${jsonString}${suffix}`);
  } catch {
    return undefined;
  }
}

/* ------------------------------------------------------------------ */
/*  Private helpers                                                    */
/* ------------------------------------------------------------------ */

/**
 * Resolves a `$ref`, following chains. Keys beside a `$ref` win over the
 * referenced schema's, as in the `json-schema-ref-parser` version Hugo uses.
 */
function deref(spec: OpenAPIV3.Document, node: any): any {
  let current = node;
  const seen = new Set<string>();
  while (
    current &&
    typeof current === "object" &&
    typeof current.$ref === "string"
  ) {
    if (seen.has(current.$ref)) return undefined;
    seen.add(current.$ref);
    const { $ref, ...siblings } = current;
    const resolved = resolveRef(spec, $ref);
    if (!resolved || typeof resolved !== "object") return resolved;
    current =
      Object.keys(siblings).length > 0
        ? { ...resolved, ...siblings }
        : resolved;
  }
  return current;
}

/** The `$ref`s that `deref` follows from `node`, in order. */
function refChain(spec: OpenAPIV3.Document, node: any): string[] {
  const refs: string[] = [];
  let current = node;
  while (
    current &&
    typeof current === "object" &&
    typeof current.$ref === "string" &&
    !refs.includes(current.$ref)
  ) {
    refs.push(current.$ref);
    current = resolveRef(spec, current.$ref);
  }
  return refs;
}

/**
 * `deref`, but `"[Circular]"` when the `$ref` points back to a schema on the
 * current path. Also returns the path to use below the resolved schema.
 */
function derefOnPath(
  spec: OpenAPIV3.Document,
  node: any,
  refPath: ReadonlySet<string>,
): { schema: any; refPath: ReadonlySet<string> } {
  const refs = refChain(spec, node);
  if (refs.length === 0) return { schema: deref(spec, node), refPath };
  if (refs.some((ref) => refPath.has(ref))) {
    return { schema: CIRCULAR, refPath };
  }
  return { schema: deref(spec, node), refPath: new Set([...refPath, ...refs]) };
}

/** The `$ref`s on the path to the properties the walk starts from. */
function initialRefPath(
  spec: OpenAPIV3.Document,
  schema: unknown,
  data: Schema,
): ReadonlySet<string> {
  const refs = refChain(spec, schema);
  if (data.type === "array") {
    refs.push(...refChain(spec, data.items));
    const items = deref(spec, data.items);
    if (items?.type === "array") refs.push(...refChain(spec, items.items));
  } else if (Array.isArray(data.oneOf) && data.oneOf.length > 0) {
    refs.push(...refChain(spec, data.oneOf[0]));
  }
  return new Set(refs);
}

/** Hugo's `getJsonWrapChars`: the brackets around the top-level string. */
function jsonWrapChars(
  spec: OpenAPIV3.Document,
  data: Schema,
): [string, string] {
  if (data.type !== "array") return ["{", "}"];
  const items = deref(spec, data.items);
  if (items?.type === "array") return ["[[{", "}]]"];
  if (items?.properties) return ["{", "}"];
  return ["[", "]"];
}

/** Hugo's `getInitialJsonData`: the properties the walk starts from. */
function initialJsonData(spec: OpenAPIV3.Document, data: Schema): any {
  if (data.type === "array") {
    const items = deref(spec, data.items);
    if (items?.type === "array") return deref(spec, items.items)?.properties;
    if (items?.properties) return items.properties;
    return undefined;
  }
  if (Array.isArray(data.oneOf) && data.oneOf.length > 0) {
    return deref(spec, data.oneOf[0])?.properties;
  }
  return data.properties;
}

/** Hugo's `getInitialExampleJsonData`: the example the walk starts with. */
function initialExample(spec: OpenAPIV3.Document, data: Schema): unknown {
  if (data.type === "array") {
    const items = deref(spec, data.items);
    if (items?.type === "array") return deref(spec, items.items)?.example;
    if (items?.properties) return items.example;
  }
  return data.example;
}

/**
 * Hugo's `filterJson`: the comma-separated `"key": value` pairs for one
 * level of properties.
 */
function filterJson(
  spec: OpenAPIV3.Document,
  actionType: ExampleActionType,
  data: any,
  parentExample: unknown = null,
  level = 0,
  refPath: ReadonlySet<string> = new Set(),
): string {
  if (level > MAX_LEVEL) return "";

  if (!data || typeof data !== "object") {
    return outputExample(parentExample);
  }

  const pairs: string[] = [];
  for (const [key, rawValue] of Object.entries(data)) {
    // A oneOf variant without properties is walked as if it were the
    // property list, so a value can be a plain string, as in Hugo.
    const { schema: derefValue, refPath: valuePath } = derefOnPath(
      spec,
      rawValue,
      refPath,
    );
    const value: Schema = derefValue ?? {};
    const isObject = typeof value === "object";
    const shouldSkip =
      (actionType === "request" && value.readOnly) ||
      (actionType === "response" && value.writeOnly);
    if (shouldSkip) continue;

    const { schema: items, refPath: itemsPath } = derefOnPath(
      spec,
      value.items,
      valuePath,
    );
    let prefixType = "";
    let suffixType = "";

    if (
      value.example &&
      typeof value.example === "object" &&
      (value.type === "array" || Array.isArray(value.example))
    ) {
      prefixType = "[";
      suffixType = "]";
    }

    let childData: any = null;
    let childPath = valuePath;
    if (value.type === "array") {
      if (items && typeof items === "object") {
        if (items.properties) {
          childData = items.properties;
          childPath = itemsPath;
          prefixType = "[{";
          suffixType = "}]";
        }
        if (
          Array.isArray(items.oneOf) &&
          items.oneOf.length < ONE_OF_LIMIT &&
          !parentExample &&
          items.oneOf.length !== 0
        ) {
          const firstVariant = deref(spec, items.oneOf[0]) ?? {};
          childData =
            "properties" in firstVariant
              ? firstVariant.properties
              : firstVariant;
          childPath = new Set([
            ...itemsPath,
            ...refChain(spec, items.oneOf[0]),
          ]);
          prefixType = "[{";
          suffixType = "}]";
        }
      }
    } else if (isObject && "properties" in value) {
      childData = value.properties;
      prefixType = "{";
      suffixType = "}";
    } else if (isObject && "additionalProperties" in value) {
      const additional = value.additionalProperties;
      if (
        additional &&
        typeof additional === "object" &&
        Object.keys(additional).length !== 0
      ) {
        childData = { "<any-key>": additional };
        prefixType = "{";
        suffixType = "}";
      }
    } else if (
      isObject &&
      "oneOf" in value &&
      !parentExample &&
      Object.keys(value.oneOf).length !== 0
    ) {
      const firstVariant = deref(spec, value.oneOf[0]) ?? {};
      childData =
        "properties" in firstVariant ? firstVariant.properties : firstVariant;
      childPath = new Set([...valuePath, ...refChain(spec, value.oneOf[0])]);
      prefixType = "{";
      suffixType = "}";
    }

    if (childData) {
      const childString = filterJson(
        spec,
        actionType,
        childData,
        value.example,
        level + 1,
        childPath,
      );
      pairs.push(`"${key}": ${prefixType}${childString}${suffixType}`);
      continue;
    }

    let example = "";
    if (value.example !== undefined) {
      example = Array.isArray(value.example)
        ? outputExample(value.example, key)
        : JSON.stringify(value.example, null, 2);
    } else if (
      items?.example !== undefined &&
      items.example !== null &&
      Object.keys(items.example).length !== 0
    ) {
      example = outputExample(items.example, key);
      prefixType = "[";
      suffixType = "]";
    } else {
      example = outputExample(parentExample, key);
    }
    example = example || outputValueType(value.type, value.format);
    pairs.push(`"${key}": ${prefixType}${example}${suffixType}`);
  }

  return pairs.join(",");
}

/** Hugo's `outputValueType`: the placeholder for a field with no example. */
function outputValueType(valueType: unknown, format: unknown = ""): string {
  switch (valueType) {
    case "array":
      return "[]";
    case "object":
      return "{}";
    case "boolean":
      return "false";
    default:
      return format === "date-time"
        ? `"${PLACEHOLDER_DATE_TIME.toISOString()}"`
        : `"${valueType}"`;
  }
}

/** Hugo's `outputValue`: one value, quoted when it's a string. */
function outputValue(value: unknown, trailingComma = false): string {
  let out: string;
  switch (typeof value) {
    case "boolean":
    case "bigint":
    case "number":
      out = `${value}`;
      break;
    case "string":
      out = `"${value
        .replace(/\r?\n|\r/g, "\\n")
        .replace(/^\[|\]$/g, "")
        .replace(/^"|"$/g, "")}"`;
      break;
    default:
      out = `"${value}"`;
  }
  return trailingComma ? `${out},` : out;
}

/**
 * Hugo's `outputExample`: formats an example, or picks `inputKey` out of a
 * parent's example. Returns `""` when there's nothing to use.
 */
function outputExample(chosenExample: unknown, inputKey?: string): string {
  if (chosenExample === undefined || chosenExample === null) return "";

  if (Array.isArray(chosenExample)) {
    let example = "";
    chosenExample.forEach((item, index, array) => {
      if (Array.isArray(item)) {
        example = `[${outputExample(item, inputKey)}]`;
      } else if (typeof item === "object") {
        if (inputKey && item !== null && inputKey in item) {
          example = Array.isArray(item[inputKey])
            ? `[${outputExample(item[inputKey])}]`
            : outputExample(item[inputKey]);
        }
      } else {
        example += outputValue(item, index !== array.length - 1);
      }
    });
    return example;
  }

  if (typeof chosenExample === "object") {
    const exampleObject = chosenExample as Record<string, unknown>;
    if (Array.isArray(exampleObject.value)) {
      return exampleObject.value.map((item) => outputValue(item)).join(",");
    }
    if (Object.keys(exampleObject).length !== 0 && !inputKey) {
      return JSON.stringify(exampleObject, null, 2);
    }
    return "";
  }

  return outputValue(chosenExample);
}
