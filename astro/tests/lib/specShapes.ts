/**
 * Spec shape detector.
 *
 * A shape is a short tag for one structural feature an operation shows in the
 * spec: `param:bracket-name-required`, `req:oneOf-primitive-variant`,
 * `res:map-of-arrays`, `op-desc:table`. Each tag is prefixed with where it was
 * found, because the same feature renders through different code paths in the
 * parameter, request and response sections.
 *
 * Reads only the parsed spec, never rendered output. `shapeClasses.ts` maps
 * every shape to a rendering class, and the shape snapshot cases cover one
 * operation per class.
 */

import type { ApiVersion } from "@lib/api/schemas/version";

export interface OperationShapes {
  version: ApiVersion;
  operationId: string;
  method: string;
  path: string;
  shapes: Set<string>;
}

type AddShape = (shape: string) => void;

const METHODS = ["get", "post", "put", "patch", "delete"] as const;

/** Extensions read elsewhere in this file, or known to have no shape of their own. */
const HANDLED_EXTENSIONS = [
  "x-permission",
  "x-unstable",
  "x-menu-order",
  "x-codegen-request-body-name",
  "x-pagination",
  "x-given",
  "x-hidden",
  "x-undo",
];

const SCHEMA_FLAGS = [
  "readOnly",
  "writeOnly",
  "nullable",
  "deprecated",
  "uniqueItems",
];

const SCHEMA_BOUNDS = [
  "minimum",
  "maximum",
  "exclusiveMinimum",
  "exclusiveMaximum",
  "minLength",
  "maxLength",
  "minItems",
  "maxItems",
  "pattern",
  "multipleOf",
  "minProperties",
  "maxProperties",
];

/** Lists the shapes of every operation in one spec version. */
export function detectOperationShapes(
  spec: any,
  version: ApiVersion,
): OperationShapes[] {
  const operationShapes: OperationShapes[] = [];
  for (const [path, pathItem] of Object.entries<any>(spec.paths ?? {})) {
    for (const method of METHODS) {
      const operation = pathItem[method];
      if (!operation) continue;
      operationShapes.push({
        version,
        operationId: operation.operationId ?? `${method} ${path}`,
        method,
        path,
        shapes: shapesOfOperation(spec, method, pathItem, operation),
      });
    }
  }
  return operationShapes;
}

/** Spec-level shapes the renderer reads outside operations, on category pages. */
export function detectTagShapes(spec: any): Set<string> {
  const shapes = new Set<string>();
  const add: AddShape = (shape) => shapes.add(shape);
  for (const tag of spec.tags ?? []) {
    addMarkdownShapes(tag.description, "tag-desc", add);
    if (tag.externalDocs) add("tag:externalDocs");
  }
  return shapes;
}

function shapesOfOperation(
  spec: any,
  method: string,
  pathItem: any,
  operation: any,
): Set<string> {
  const shapes = new Set<string>();
  const add: AddShape = (shape) => shapes.add(shape);
  add(`method:${method}`);
  addOperationShapes(operation, add);
  addParameterShapes(spec, pathItem, operation, add);
  addRequestBodyShapes(spec, operation, add);
  addResponseShapes(spec, operation, add);
  return shapes;
}

function addOperationShapes(operation: any, add: AddShape) {
  if (operation.deprecated) add("op:deprecated");
  if (operation["x-unstable"]) add("op:x-unstable");
  if (operation["x-hidden"]) add("op:x-hidden");
  if (!operation.description) add("op:no-description");
  addMarkdownShapes(operation.description, "op-desc", add);

  const permission = operation["x-permission"];
  if (permission) {
    const count = (permission.permissions ?? []).length > 1 ? "many" : "one";
    add(`op:x-permission:${permission.operator ?? "none"}:${count}`);
  } else {
    add("op:no-x-permission");
  }

  if (operation.servers) add("op:servers-override");
  if (operation.servers?.some(hasExtraServerVariables))
    add("op:servers-extra-variables");
  // Only servers[0] is read, and `api` is the global default.
  const subdomain = operation.servers?.[0]?.variables?.subdomain?.default;
  if (subdomain !== undefined && subdomain !== "api")
    add("op:servers-subdomain");

  addSecurityShapes(operation.security, add);

  if (operation["x-pagination"]) add("op:x-pagination");
  if (operation["x-given"]) add("op:x-given");
  if (operation["x-menu-order"] !== undefined) add("op:x-menu-order");
  if ((operation.tags ?? []).length > 1) add("op:multiple-tags");
  for (const key of Object.keys(operation)) {
    if (key.startsWith("x-") && !HANDLED_EXTENSIONS.includes(key))
      add(`op:${key}`);
  }
}

function hasExtraServerVariables(server: any): boolean {
  return Object.keys(server.variables ?? {}).some(
    (name) => name !== "site" && name !== "subdomain",
  );
}

function addSecurityShapes(security: any[] | undefined, add: AddShape) {
  if (security === undefined) return add("op:security-default");
  if (security.length === 0) return add("op:security-none");
  const schemeNames = security.flatMap((requirement) =>
    Object.keys(requirement),
  );
  for (const schemeName of new Set(schemeNames))
    add(`op:security:${schemeName}`);
  if (security.some((requirement) => Object.keys(requirement).length > 1))
    add("op:security-and-combo");
  if (security.some((requirement) => Object.keys(requirement).length === 0))
    add("op:security-optional");
  const hasScopes = security.some((requirement) =>
    Object.values<string[]>(requirement).some((scopes) => scopes.length),
  );
  if (hasScopes) add("op:oauth-scopes");
}

function addParameterShapes(
  spec: any,
  pathItem: any,
  operation: any,
  add: AddShape,
) {
  const parameters = [
    ...(pathItem.parameters ?? []),
    ...(operation.parameters ?? []),
  ].map((parameter) => resolve(spec, parameter));
  if (pathItem.parameters) add("param:path-level");
  if (!parameters.length) add("param:none");
  for (const parameter of parameters) {
    add(`param:in:${parameter.in}`);
    if (parameter.required && parameter.in !== "path")
      add(`param:required-${parameter.in}`);
    if (parameter.deprecated) add("param:deprecated");
    if (parameter.style) add(`param:style:${parameter.style}`);
    if (parameter.explode !== undefined)
      add(`param:explode:${parameter.explode}`);
    if (parameter.example !== undefined) add(`param:example-${parameter.in}`);
    if (parameter.examples) add("param:examples");
    if (parameter.content) add("param:content");
    if (/[[\]]/.test(parameter.name))
      add(`param:bracket-name-${parameter.required ? "required" : "optional"}`);
    if (parameter.description)
      addMarkdownShapes(parameter.description, "param-desc", add);
    else add("param:no-description");
    if (parameter.schema) addSchemaShapes(spec, parameter.schema, "param", add);
  }
}

function addRequestBodyShapes(spec: any, operation: any, add: AddShape) {
  if (operation["x-codegen-request-body-name"])
    add("req:x-codegen-request-body-name");
  const body = operation.requestBody && resolve(spec, operation.requestBody);
  if (!body) return add("req:none");
  // `body-` keeps these apart from a schema's own `required` list, which is `req:required`.
  add(body.required ? "req:body-required" : "req:body-optional");
  if (body.description) add("req:description");
  const contentTypes = Object.keys(body.content ?? {});
  for (const contentType of contentTypes)
    add(`req:content-type:${contentType}`);
  if (contentTypes.length > 1) add("req:multiple-content-types");
  for (const media of Object.values<any>(body.content ?? {})) {
    const root = resolve(spec, media.schema);
    if (root.type === "array") add("req:top-level-array");
    if (root.oneOf) add("req:top-level-oneOf");
    if (root.allOf) add("req:top-level-allOf");
    if (root.type === "string") add("req:top-level-string");
    if (media.examples) add(`req:examples:${countLabel(media.examples)}`);
    if (media.example) add("req:media-example");
    if (media.encoding) add("req:encoding");
    if (media.schema) addSchemaShapes(spec, media.schema, "req", add);
  }
}

function addResponseShapes(spec: any, operation: any, add: AddShape) {
  const responses = Object.entries<any>(operation.responses ?? {});
  const successCount = responses.filter(([code]) => isSuccess(code)).length;
  if (successCount > 1) add("res:multiple-2xx");
  if (!successCount) add("res:no-2xx");
  for (const [code, rawResponse] of responses) {
    const response = resolve(spec, rawResponse);
    add(`res:code:${code}`);
    if (rawResponse.$ref) add("res:ref-response");
    if (response.headers) add("res:headers");
    if (!response.content)
      add(`res:no-content-${isSuccess(code) ? "2xx" : "error"}`);
    for (const [contentType, media] of Object.entries<any>(
      response.content ?? {},
    )) {
      add(`res:content-type:${contentType}`);
      if (isSuccess(code)) addSuccessMediaShapes(spec, media, add);
      if (media.examples) add(`res:examples:${countLabel(media.examples)}`);
      if (media.example) add("res:media-example");
    }
  }
}

function addSuccessMediaShapes(spec: any, media: any, add: AddShape) {
  if (!media.schema) return add("res:no-schema");
  const root = resolve(spec, media.schema);
  if (root.type === "array") add("res:top-level-array");
  if (root.oneOf) add("res:top-level-oneOf");
  if (root.type === "string") add("res:top-level-string");
  if (root.type === "object" && !root.properties && !root.additionalProperties)
    add("res:top-level-empty-object");
  addSchemaShapes(spec, media.schema, "res", add);
}

/** Markdown features in a description. */
function addMarkdownShapes(
  text: string | undefined,
  prefix: string,
  add: AddShape,
) {
  if (!text) return;
  if (/^\s*\|.*\|\s*$/m.test(text)) add(`${prefix}:table`);
  if (/^\s*[-*] /m.test(text)) add(`${prefix}:bullet-list`);
  if (/^\s*\d+\. /m.test(text)) add(`${prefix}:numbered-list`);
  if (/```/.test(text)) add(`${prefix}:code-fence`);
  if (/`[^`]+`/.test(text)) add(`${prefix}:inline-code`);
  if (/\[[^\]]+\]\([^)]+\)/.test(text)) add(`${prefix}:link`);
  if (/\*\*[^*]+\*\*/.test(text)) add(`${prefix}:bold`);
  if (/<[a-z][^>]*>/i.test(text)) add(`${prefix}:raw-html`);
  if (/\{\{[<%]/.test(text)) add(`${prefix}:hugo-shortcode`);
  if (/^#{1,6} /m.test(text)) add(`${prefix}:heading`);
  if (/\n\s*\n/.test(text)) add(`${prefix}:multi-paragraph`);
}

/** Walks a schema. `where` is `param`, `req` or `res`. */
function addSchemaShapes(spec: any, root: any, where: string, add: AddShape) {
  const visitingRefs = new Set<string>();
  const walk = (node: any, depth: number, parentKind: string | null) => {
    if (!node || typeof node !== "object") return;
    if (node.$ref) {
      if (visitingRefs.has(node.$ref)) return add(`${where}:recursive-ref`);
      if (!node.$ref.startsWith("#/")) return add(`${where}:external-ref`);
      visitingRefs.add(node.$ref);
      if (Object.keys(node).some((key) => key !== "$ref"))
        add(`${where}:ref-with-siblings`);
      walk(resolve(spec, node), depth, parentKind);
      visitingRefs.delete(node.$ref);
      return;
    }
    if (depth > 12) return add(`${where}:depth>12`);

    const type = Array.isArray(node.type) ? "type-array" : node.type;
    addTypeShapes(node, type, where, add);
    addCompositionShapes(spec, node, where, add, (variant, kind) =>
      walk(variant, depth + 1, kind),
    );
    addValueShapes(node, where, add);
    addObjectShapes(node, type, where, add);
    for (const child of Object.values(node.properties ?? {}))
      walk(child, depth + 1, "object");
    if (
      node.additionalProperties &&
      typeof node.additionalProperties === "object"
    ) {
      addMapShapes(spec, node, where, add);
      walk(node.additionalProperties, depth + 1, "map");
    }
    if (node.items) {
      addArrayItemShapes(spec, node.items, where, add);
      walk(node.items, depth + 1, "array");
    }
    if (type === "array" && !node.items) add(`${where}:array-no-items`);
    if (parentKind === "map" && type === "array") add(`${where}:map-of-arrays`);
  };
  walk(root, 0, null);
}

function addTypeShapes(node: any, type: any, where: string, add: AddShape) {
  if (Array.isArray(node.type)) add(`${where}:type-is-array(3.1)`);
  if (
    !node.type &&
    !node.oneOf &&
    !node.anyOf &&
    !node.allOf &&
    !node.properties
  )
    add(`${where}:no-type`);
  if (type) add(`${where}:type:${type}`);
  if (node.format) add(`${where}:format:${node.format}`);
}

function addCompositionShapes(
  spec: any,
  node: any,
  where: string,
  add: AddShape,
  walkVariant: (variant: any, kind: string) => void,
) {
  for (const key of ["oneOf", "anyOf", "allOf"]) {
    const variants: any[] | undefined = node[key];
    if (!variants) continue;
    add(`${where}:${key}`);
    if (variants.length === 1) add(`${where}:${key}-single`);
    if (node.type) add(`${where}:${key}+type`);
    if (node.properties) add(`${where}:${key}+properties`);
    if (node.additionalProperties !== undefined)
      add(`${where}:${key}+additionalProperties`);
    if (variants.some((variant) => !variant.$ref))
      add(`${where}:${key}-inline-variant`);
    const variantTypes = variants.map((variant) => resolve(spec, variant).type);
    if (variantTypes.some((type) => type && type !== "object"))
      add(`${where}:${key}-primitive-variant`);
    if (variantTypes.includes("array")) add(`${where}:${key}-array-variant`);
    for (const variant of variants) walkVariant(variant, key);
  }
  if (node.discriminator)
    add(
      `${where}:discriminator${node.discriminator.mapping ? "+mapping" : ""}`,
    );
}

function addValueShapes(node: any, where: string, add: AddShape) {
  if (node.enum) {
    add(`${where}:enum`);
    if (node.enum.length === 1) add(`${where}:enum-single`);
    if (node.enum.some((value: unknown) => typeof value !== "string"))
      add(`${where}:enum-non-string`);
    if (node.enum.includes(null)) add(`${where}:enum-null`);
    if (node["x-enum-varnames"]) add(`${where}:x-enum-varnames`);
  }
  if (node.const !== undefined) add(`${where}:const`);
  if (node.default !== undefined)
    add(`${where}:default:${valueKind(node.default)}`);
  if (node.example !== undefined)
    add(`${where}:example:${valueKind(node.example)}`);
  if (node.examples) add(`${where}:schema-examples`);
  for (const flag of SCHEMA_FLAGS) if (node[flag]) add(`${where}:${flag}`);
  for (const bound of SCHEMA_BOUNDS)
    if (node[bound] !== undefined) add(`${where}:${bound}`);
  if (node.title) add(`${where}:title`);
  if (node.description)
    addMarkdownShapes(node.description, `${where}-field-desc`, add);
  if (node.description === "") add(`${where}:empty-description`);
}

function addObjectShapes(node: any, type: any, where: string, add: AddShape) {
  if (node.required?.length) add(`${where}:required`);
  if (node.required?.some((name: string) => !node.properties?.[name]))
    add(`${where}:required-not-in-properties`);
  if (node.properties) {
    const names = Object.keys(node.properties);
    if (!names.length) add(`${where}:empty-properties`);
    if (names.some((name) => /[^A-Za-z0-9_]/.test(name)))
      add(`${where}:prop-name-special-chars`);
    if (names.some((name) => /^[0-9]/.test(name)))
      add(`${where}:prop-name-leading-digit`);
  }
  if (
    type === "object" &&
    !node.properties &&
    node.additionalProperties === undefined &&
    !node.oneOf &&
    !node.anyOf &&
    !node.allOf
  )
    add(`${where}:bare-object`);
  if (node.additionalProperties === true)
    add(`${where}:additionalProperties:true`);
  if (node.additionalProperties === false)
    add(`${where}:additionalProperties:false`);
}

function addMapShapes(spec: any, node: any, where: string, add: AddShape) {
  const valueSchema = resolve(spec, node.additionalProperties);
  const valueKindLabel =
    valueSchema.type ??
    (valueSchema.oneOf
      ? "oneOf"
      : Object.keys(valueSchema).length
        ? "untyped"
        : "empty");
  add(`${where}:additionalProperties:${valueKindLabel}`);
  if (node.properties) add(`${where}:additionalProperties+properties`);
}

function addArrayItemShapes(
  spec: any,
  items: any,
  where: string,
  add: AddShape,
) {
  const itemSchema = resolve(spec, items);
  if (itemSchema.type === "array") add(`${where}:array-of-arrays`);
  if (
    !itemSchema.type &&
    !itemSchema.oneOf &&
    !itemSchema.properties &&
    !itemSchema.allOf &&
    !itemSchema.anyOf
  )
    add(`${where}:array-items-untyped`);
  if (itemSchema.oneOf) add(`${where}:array-of-oneOf`);
}

/** Follows local `$ref`s. A cyclic or external ref resolves to a marker object. */
function resolve(spec: any, node: any): any {
  const seenRefs = new Set<string>();
  while (node && node.$ref) {
    if (!node.$ref.startsWith("#/") || seenRefs.has(node.$ref))
      return { __unresolved: node.$ref };
    seenRefs.add(node.$ref);
    node = node.$ref
      .slice(2)
      .split("/")
      .reduce(
        (current: any, key: string) =>
          current?.[key.replace(/~1/g, "/").replace(/~0/g, "~")],
        spec,
      );
  }
  return node ?? {};
}

function isSuccess(code: string): boolean {
  return /^2/.test(code);
}

function countLabel(examples: object): "one" | "many" {
  return Object.keys(examples).length > 1 ? "many" : "one";
}

function valueKind(value: unknown): string {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  if (typeof value === "object") return "object";
  return typeof value;
}
