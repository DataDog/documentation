/**
 * Maps every spec shape (see `tests/lib/specShapes.ts`) to the rendering class
 * that covers it. Shapes that render through the same code path share a class,
 * and each class gets one trimmed case in the shape snapshot test.
 *
 * Two buckets aren't classes and get no case:
 *
 * - `NO_RENDER_EFFECT`: the renderer never reads the keyword, so no fragment
 *   changes with it. Every entry is a reviewed decision, not a gap.
 * - `PAGE_SNAPSHOT`: rendered only on category landings, which the remaining
 *   whole-page snapshots in `api-html-snapshots` cover.
 */

export const NO_RENDER_EFFECT = "no-render-effect";
export const PAGE_SNAPSHOT = "page-snapshot";

/** Every rendering class, with the code path that renders it. */
export const SHAPE_CLASS_PATHS = {
  // ── Operation ─────────────────────────────────────────────────────
  "operation-method":
    "ApiMethodBadge text, and curlBuilder's `-X` for non-GET methods",
  "operation-deprecated":
    "viewsBuilder `deprecated` → deprecation notice and nav label",
  "operation-unstable":
    "viewsBuilder `x-unstable` → ApiEndpoint warning Alert, with the string as the message when it is one",
  "operation-no-description":
    "ApiEndpoint hides the description eyebrow when there's no description, permissions or scopes",
  "operation-display-name":
    "displayNames `x-displayName` → the operation's label in place of its summary",
  "operation-permissions-single":
    "operationBuilder `x-permission` with one permission → permissions list, no any/all wording",
  "operation-permissions-all":
    "operationBuilder `x-permission` AND with several permissions → \"all of\" wording",
  "operation-permissions-any":
    "operationBuilder `x-permission` OR with several permissions → \"any of\" wording",
  "operation-no-permissions":
    "ApiEndpoint omits the permissions block without `x-permission`",
  "operation-auth-api-keys":
    "curlBuilder auth: DD-API-KEY and DD-APPLICATION-KEY headers from an AND requirement",
  "operation-auth-default":
    "curlBuilder auth from the spec's global `security` when the operation has none",
  "operation-auth-none":
    "curlBuilder with `security: []` → no auth headers",
  "operation-auth-bearer":
    "curlBuilder bearerAuth scheme → Authorization: Bearer header",
  "operation-oauth-scopes":
    "operationBuilder AuthZ requirement → OAuth scopes list, and curlBuilder's token note for AuthZ-only operations",
  "operation-no-sdk-examples":
    "ApiCodeExample with no SDK example files → curl only. Not a spec shape: covered by every trimmed case's tag",

  // ── Operation description (Markdoc, rendered as the page's slot) ─
  "op-desc-inline": "Markdoc inline marks and paragraphs: bold, inline code, several paragraphs",
  "op-desc-link": "Markdoc links, plus doc-link rewriting in the plaintext twin",
  "op-desc-list": "Markdoc bullet and numbered lists",
  "op-desc-table": "Markdoc table",
  "op-desc-code-fence": "Markdoc fenced code block",
  "op-desc-heading": "Markdoc heading inside a description",
  "op-desc-raw-html":
    "Angle brackets in a description. The live spec has them only inside inline code, which escapes them",

  // ── Regions ──────────────────────────────────────────────────────
  "region-servers-override":
    "regionResolver `servers[0].variables.site.enum` → per-region hosts and \"Not supported\" rows",
  "region-servers-subdomain":
    "`servers[0].variables.subdomain.default` → every region's host, and curlBuilder's",

  // ── Parameters (paramsToFields, ApiEndpoint parameter tables, curl) ─
  "param-location-path":
    "Path parameters table; curlBuilder substitutes the parameter example or CHANGE_ME into the path",
  "param-location-query":
    "Query strings table; curlBuilder appends required query parameters",
  "param-location-header":
    "Headers table; curlBuilder adds the header parameter as `-H`",
  "param-none": "ApiEndpoint omits every parameter table",
  "param-required-query": "[required] marker, and the query parameter in curl",
  "param-required-header": "[required] marker, and the header in curl",
  "param-bracket-name-required":
    "curlBuilder quoting of a required `filter[x]`-style query name",
  "param-explode":
    "curlBuilder repeats an exploded array parameter once per example item",
  "param-schema-example":
    "curlBuilder falls back to the schema's `example` when the parameter has none",
  "param-type": "parameterType: the schema's bare `type`, ignoring `format`",
  "param-enum": "parameterType `enum`, plus the allowed values line",
  "param-default": "paramsToFields `defaultValue` → Default: line",
  "param-ref-with-siblings":
    "paramsToFields resolves a parameter schema `$ref` and drops its siblings",

  // ── Request body (extractRequestBody, ApiRequestBodyTabs, curl) ──
  "request-none": "ApiEndpoint omits the request body section, curl has no `-d`",
  "request-required": "Body Data (required) heading",
  "request-optional": "Body Data heading without (required)",
  "request-description": "ApiEndpoint renders the body description inline above the tabs",
  "request-json": "JSON body: Model table, generated Example tab, curl `-d`",
  "request-json-variant":
    "JSON-like media type (`text/json`) picked as the first declared type",
  "request-multipart":
    "multipartFormExamples → curl `-F` fields as the example, binary fields as `@file`",
  "request-multipart-encoding": "multipartFormExamples reads the media `encoding`",
  "request-multiple-content-types":
    "resolveRequestBodyContent prefers JSON over the other types. `text/plain`, `application/logplex-1` and `application/json;simple` only occur beside JSON, so they never render",
  "request-curl-examples-one": "specExampleCurlBodies: one inline example → curl body, no heading",
  "request-curl-examples-many":
    "specExampleCurlBodies: several examples → one curl each, with ## summary comment lines",
  "request-readonly-strip":
    "stripReadOnlyFields and the request example skip readOnly fields; writeOnly fields stay",

  // ── Responses (extractResponses, ApiResponse) ────────────────────
  "response-success": "2xx tab with Model and generated Example",
  "response-no-content":
    "204 or bodiless 2xx: no Model, and curlBuilder drops the Accept header for 204",
  "response-multiple-2xx": "Several success tabs, sorted by status code",
  "response-error": "4xx/5xx tabs, usually a `$ref` to a shared error response",
  "response-error-no-content": "Error response with no body",
  "response-empty-body": "emptyBody: an empty object still gets a Model tab saying there's no body",
  "response-json-variant":
    "JSON-like media type picked as the first declared type (`application/json;datetime-format=rfc3339`, `text/json`)",
  "response-non-json-text":
    "textResponseExamples: CSV or YAML body, the spec's example in a code block of its language",
  "response-non-json-file":
    "Binary or file body (zip, octet-stream, multipart): content type label, no example",
  "response-readonly-writeonly":
    "Response Model keeps readOnly fields (row modifier) and stripWriteOnlyFields drops writeOnly ones, in the table and the example",

  // ── Schema (refResolver → SchemaFieldRow, schemaExampleBuilder) ──
  // Shared by request and response bodies.
  "schema-scalar-types":
    "displayType for string, integer, number, boolean; outputValueType placeholders in the example",
  "schema-nested-object": "propertyToField recursion into object children",
  "schema-array": "Array rows `[type]`, and the example's array wrapping",
  "schema-array-of-arrays": "resolveItemTypeName reports a nested array as `[array]`",
  "schema-array-items-untyped": "Array items with no type → `[any]`",
  "schema-array-of-oneOf": "arrayChildFields lifts the items' options onto the array row, `[<oneOf>]`",
  "schema-top-level-array": "topLevelSchemaToFields renders the items' fields at level 0",
  "schema-top-level-oneOf": "topLevelOptionFields: one Option row per branch at level 0",
  "schema-no-type": "displayType `any` for a schema with no type",
  "schema-format": "displayType reports `format` in place of `type`",
  "schema-format-date-time": "outputValueType's fixed placeholder date for date-time fields",
  "schema-format-binary": "Binary fields in multipart forms and file responses",
  "schema-enum": "displayType `enum`, plus the allowed values line",
  "schema-enum-non-string": "enumValues stringifies numeric enum values",
  "schema-default": "formatDefault → Default: line for scalar defaults (and null)",
  "schema-example-scalar": "schemaExampleBuilder uses a field's scalar `example`",
  "schema-example-array": "schemaExampleBuilder's array-example unwrapping quirk",
  "schema-example-object":
    "schemaExampleBuilder returns an object example as is (responses, and maps with an example)",
  "schema-deprecated": "SchemaFieldRow DEPRECATED label and row modifier",
  "schema-required": "SchemaFieldRow [required] marker",
  "schema-prop-name-special-chars": "Field names with dots, dashes or slashes in rows and anchors",
  "schema-bare-object": "Object with no properties, or an empty `additionalProperties`: no children",
  "schema-map-of-scalars": "`<any-key>` row for an additionalProperties of a scalar type",
  "schema-map-of-objects": "`<any-key>` row with nested children",
  "schema-map-of-arrays": "`<any-key>` row of array type",
  "schema-map-of-oneOf": "`<any-key>` row carrying union options",
  "schema-map-untyped": "`<any-key>` row of type `any`",
  "schema-map-with-properties": "properties win: additionalProperties is ignored beside them",
  "schema-oneOf": "Union option rows, with discriminant labels from getBestDiscriminant",
  "schema-oneOf-single": "A one-branch union still renders an option row",
  "schema-oneOf-inline-variant": "Inline (non-$ref) branch: fallback `Object N` label",
  "schema-oneOf-primitive-variant": "Scalar branch: option carries its own type and no fields",
  "schema-oneOf-array-variant": "Array branch: optionFields uses the items' fields",
  "schema-oneOf-with-type": "unionFieldType `object <oneOf>`",
  "schema-oneOf-with-additionalProperties": "Union beside additionalProperties",
  "schema-recursive-ref":
    "Circular `$ref` guard: the repeated schema gets no rows, and an empty example (Hugo's `[Circular]` sentinel)",
  "schema-depth-cap": "MAX_DEPTH 10 cuts off rows and the example",
  "schema-ref-with-siblings": "Siblings of a `$ref` override the target in the example and description",

  // ── Field descriptions (SchemaFieldRow renderMarkdown, plaintext twin) ─
  // Shared by parameter, request and response rows.
  "field-desc-inline": "marked inline marks and paragraphs in a row: bold, inline code, several paragraphs",
  "field-desc-link": "marked links in a row, plus doc-link rewriting in the plaintext twin",
  "field-desc-list": "marked bullet and numbered lists in a row",
  "field-desc-raw-html":
    "Angle brackets in a row description. The live spec has them only inside inline code, which escapes them",
} as const;

export type ShapeClassId = keyof typeof SHAPE_CLASS_PATHS;
export type ShapeBucket =
  | ShapeClassId
  | typeof NO_RENDER_EFFECT
  | typeof PAGE_SNAPSHOT;

/** Shapes the request and response schema walkers share. */
function schemaShapes(
  shapesByName: Record<string, ShapeBucket>,
): Record<string, ShapeBucket> {
  const prefixed: Record<string, ShapeBucket> = {};
  for (const [name, bucket] of Object.entries(shapesByName)) {
    prefixed[`req:${name}`] = bucket;
    prefixed[`res:${name}`] = bucket;
  }
  return prefixed;
}

/** Description Markdown shapes, for each prefix that renders through `SchemaFieldRow`. */
function fieldDescriptionShapes(
  prefixes: string[],
): Record<string, ShapeBucket> {
  const shapes: Record<string, ShapeBucket> = {};
  for (const prefix of prefixes) {
    shapes[`${prefix}:bold`] = "field-desc-inline";
    shapes[`${prefix}:inline-code`] = "field-desc-inline";
    shapes[`${prefix}:multi-paragraph`] = "field-desc-inline";
    shapes[`${prefix}:link`] = "field-desc-link";
    shapes[`${prefix}:bullet-list`] = "field-desc-list";
    shapes[`${prefix}:numbered-list`] = "field-desc-list";
    shapes[`${prefix}:raw-html`] = "field-desc-raw-html";
  }
  return shapes;
}

export const SHAPE_CLASSES: Record<string, ShapeBucket> = {
  // ── Operation ─────────────────────────────────────────────────────
  "method:get": "operation-method",
  "method:post": "operation-method",
  "method:put": "operation-method",
  "method:patch": "operation-method",
  "method:delete": "operation-method",
  "op:deprecated": "operation-deprecated",
  "op:x-unstable": "operation-unstable",
  "op:no-description": "operation-no-description",
  "op:x-displayName": "operation-display-name",
  "op:x-permission:AND:one": "operation-permissions-single",
  "op:x-permission:OR:one": "operation-permissions-single",
  "op:x-permission:OPEN:one": "operation-permissions-single",
  "op:x-permission:AND:many": "operation-permissions-all",
  "op:x-permission:OR:many": "operation-permissions-any",
  "op:no-x-permission": "operation-no-permissions",
  "op:security:apiKeyAuth": "operation-auth-api-keys",
  "op:security:appKeyAuth": "operation-auth-api-keys",
  "op:security-and-combo": "operation-auth-api-keys",
  "op:security-default": "operation-auth-default",
  "op:security-none": "operation-auth-none",
  "op:security:bearerAuth": "operation-auth-bearer",
  "op:security:AuthZ": "operation-oauth-scopes",
  "op:oauth-scopes": "operation-oauth-scopes",
  "op:servers-override": "region-servers-override",
  "op:servers-subdomain": "region-servers-subdomain",
  // Only servers[0] is read, and extra variables only occur in later blocks.
  "op:servers-extra-variables": NO_RENDER_EFFECT,
  // Read for nav order only, which the category view snapshots cover.
  "op:x-menu-order": NO_RENDER_EFFECT,
  "op:x-pagination": NO_RENDER_EFFECT,
  "op:x-sunset": NO_RENDER_EFFECT,
  "op:x-terraform-resource": NO_RENDER_EFFECT,

  // ── Operation description ────────────────────────────────────────
  "op-desc:bold": "op-desc-inline",
  "op-desc:inline-code": "op-desc-inline",
  "op-desc:multi-paragraph": "op-desc-inline",
  "op-desc:link": "op-desc-link",
  "op-desc:bullet-list": "op-desc-list",
  "op-desc:numbered-list": "op-desc-list",
  "op-desc:table": "op-desc-table",
  "op-desc:code-fence": "op-desc-code-fence",
  "op-desc:heading": "op-desc-heading",
  "op-desc:raw-html": "op-desc-raw-html",

  // ── Category landings ────────────────────────────────────────────
  "tag-desc:bold": PAGE_SNAPSHOT,
  "tag-desc:bullet-list": PAGE_SNAPSHOT,
  "tag-desc:inline-code": PAGE_SNAPSHOT,
  "tag-desc:link": PAGE_SNAPSHOT,
  "tag-desc:multi-paragraph": PAGE_SNAPSHOT,
  "tag-desc:raw-html": PAGE_SNAPSHOT,
  "tag:externalDocs": NO_RENDER_EFFECT,

  // ── Parameters ───────────────────────────────────────────────────
  "param:in:path": "param-location-path",
  "param:example-path": "param-location-path",
  "param:in:query": "param-location-query",
  "param:example-query": "param-location-query",
  // An optional parameter never reaches curl, so a bracketed name is just a name.
  "param:bracket-name-optional": "param-location-query",
  "param:in:header": "param-location-header",
  "param:example-header": "param-location-header",
  "param:none": "param-none",
  "param:required-query": "param-required-query",
  "param:required-header": "param-required-header",
  "param:bracket-name-required": "param-bracket-name-required",
  "param:explode:true": "param-explode",
  "param:example:array": "param-explode",
  // Only an explicit `explode: true` changes curl.
  "param:explode:false": NO_RENDER_EFFECT,
  "param:style:form": NO_RENDER_EFFECT,
  "param:style:simple": NO_RENDER_EFFECT,
  "param:example:boolean": "param-schema-example",
  "param:example:number": "param-schema-example",
  "param:example:string": "param-schema-example",
  "param:type:string": "param-type",
  "param:type:integer": "param-type",
  "param:type:number": "param-type",
  "param:type:boolean": "param-type",
  "param:type:array": "param-type",
  "param:enum": "param-enum",
  "param:enum-single": "param-enum",
  "param:x-enum-varnames": NO_RENDER_EFFECT,
  "param:default:boolean": "param-default",
  "param:default:number": "param-default",
  "param:default:string": "param-default",
  "param:ref-with-siblings": "param-ref-with-siblings",
  // parameterType ignores `format`, and parameter rows ignore bounds.
  "param:format:date": NO_RENDER_EFFECT,
  "param:format:date-time": NO_RENDER_EFFECT,
  "param:format:double": NO_RENDER_EFFECT,
  "param:format:int32": NO_RENDER_EFFECT,
  "param:format:int64": NO_RENDER_EFFECT,
  "param:format:uuid": NO_RENDER_EFFECT,
  "param:minimum": NO_RENDER_EFFECT,
  "param:maximum": NO_RENDER_EFFECT,
  "param:exclusiveMinimum": NO_RENDER_EFFECT,
  "param:exclusiveMaximum": NO_RENDER_EFFECT,
  "param:minLength": NO_RENDER_EFFECT,
  "param:maxLength": NO_RENDER_EFFECT,
  "param:pattern": NO_RENDER_EFFECT,
  "param:nullable": NO_RENDER_EFFECT,
  ...fieldDescriptionShapes(["param-desc"]),
  // A parameter row shows the parameter's description, never its schema's.
  "param-field-desc:bullet-list": NO_RENDER_EFFECT,
  "param-field-desc:inline-code": NO_RENDER_EFFECT,
  "param-field-desc:link": NO_RENDER_EFFECT,
  "param-field-desc:raw-html": NO_RENDER_EFFECT,

  // ── Request body ─────────────────────────────────────────────────
  "req:none": "request-none",
  "req:body-required": "request-required",
  "req:body-optional": "request-optional",
  "req:description": "request-description",
  "req:content-type:application/json": "request-json",
  "req:content-type:text/json": "request-json-variant",
  "req:content-type:multipart/form-data": "request-multipart",
  // These three only occur beside `application/json`, which wins.
  "req:content-type:application/json;simple": "request-multiple-content-types",
  "req:content-type:application/logplex-1": "request-multiple-content-types",
  "req:content-type:text/plain": "request-multiple-content-types",
  // A string body is `text/plain`, so it never renders either.
  "req:top-level-string": "request-multiple-content-types",
  "req:encoding": "request-multipart-encoding",
  "req:multiple-content-types": "request-multiple-content-types",
  "req:examples:one": "request-curl-examples-one",
  "req:examples:many": "request-curl-examples-many",
  "req:readOnly": "request-readonly-strip",
  "req:writeOnly": "request-readonly-strip",
  "req:x-codegen-request-body-name": NO_RENDER_EFFECT,

  // ── Responses ────────────────────────────────────────────────────
  "res:code:200": "response-success",
  "res:code:201": "response-success",
  "res:code:202": "response-success",
  "res:code:206": "response-success",
  "res:code:204": "response-no-content",
  "res:no-content-2xx": "response-no-content",
  "res:multiple-2xx": "response-multiple-2xx",
  "res:code:400": "response-error",
  "res:code:401": "response-error",
  "res:code:402": "response-error",
  "res:code:403": "response-error",
  "res:code:404": "response-error",
  "res:code:405": "response-error",
  "res:code:408": "response-error",
  "res:code:409": "response-error",
  "res:code:410": "response-error",
  "res:code:412": "response-error",
  "res:code:413": "response-error",
  "res:code:415": "response-error",
  "res:code:422": "response-error",
  "res:code:429": "response-error",
  "res:code:500": "response-error",
  "res:code:502": "response-error",
  "res:code:503": "response-error",
  "res:code:504": "response-error",
  "res:ref-response": "response-error",
  "res:no-content-error": "response-error-no-content",
  "res:top-level-empty-object": "response-empty-body",
  "res:content-type:application/json": "response-success",
  "res:content-type:application/json;datetime-format=rfc3339":
    "response-json-variant",
  "res:content-type:text/json": "response-json-variant",
  "res:content-type:text/csv": "response-non-json-text",
  "res:content-type:application/yaml": "response-non-json-text",
  "res:content-type:application/zip": "response-non-json-file",
  "res:content-type:application/octet-stream": "response-non-json-file",
  "res:content-type:multipart/form-data": "response-non-json-file",
  // String responses are all text or file downloads.
  "res:top-level-string": "response-non-json-text",
  "res:readOnly": "response-readonly-writeonly",
  "res:writeOnly": "response-readonly-writeonly",
  // A JSON response's example is built from the schema; the spec's examples
  // are read only for text responses, which response-non-json-text covers.
  "res:examples:one": NO_RENDER_EFFECT,
  "res:examples:many": NO_RENDER_EFFECT,
  "res:media-example": NO_RENDER_EFFECT,
  "res:headers": NO_RENDER_EFFECT,

  // ── Schema, request and response ─────────────────────────────────
  ...schemaShapes({
    "type:string": "schema-scalar-types",
    "type:integer": "schema-scalar-types",
    "type:number": "schema-scalar-types",
    "type:boolean": "schema-scalar-types",
    "type:object": "schema-nested-object",
    "type:array": "schema-array",
    "array-of-arrays": "schema-array-of-arrays",
    "array-items-untyped": "schema-array-items-untyped",
    "array-of-oneOf": "schema-array-of-oneOf",
    "top-level-array": "schema-top-level-array",
    "top-level-oneOf": "schema-top-level-oneOf",
    "no-type": "schema-no-type",
    "format:int32": "schema-format",
    "format:int64": "schema-format",
    "format:double": "schema-format",
    "format:uuid": "schema-format",
    "format:date-time": "schema-format-date-time",
    "format:binary": "schema-format-binary",
    enum: "schema-enum",
    "enum-single": "schema-enum",
    "enum-non-string": "schema-enum-non-string",
    "x-enum-varnames": NO_RENDER_EFFECT,
    "default:string": "schema-default",
    "default:number": "schema-default",
    "default:boolean": "schema-default",
    "default:null": "schema-default",
    // Array rows never show a default, and the example builder returns the
    // items' example first.
    "default:array": NO_RENDER_EFFECT,
    "example:string": "schema-example-scalar",
    "example:number": "schema-example-scalar",
    "example:boolean": "schema-example-scalar",
    "example:null": "schema-example-scalar",
    "example:array": "schema-example-array",
    "example:object": "schema-example-object",
    deprecated: "schema-deprecated",
    required: "schema-required",
    // Only listed properties are checked against `required`.
    "required-not-in-properties": NO_RENDER_EFFECT,
    // Only a union's own `title` names its row, and no live union has one.
    title: NO_RENDER_EFFECT,
    "prop-name-special-chars": "schema-prop-name-special-chars",
    "bare-object": "schema-bare-object",
    "additionalProperties:empty": "schema-bare-object",
    "additionalProperties:string": "schema-map-of-scalars",
    "additionalProperties:integer": "schema-map-of-scalars",
    "additionalProperties:number": "schema-map-of-scalars",
    "additionalProperties:boolean": "schema-map-of-scalars",
    "additionalProperties:object": "schema-map-of-objects",
    "additionalProperties:array": "schema-map-of-arrays",
    "map-of-arrays": "schema-map-of-arrays",
    "additionalProperties:oneOf": "schema-map-of-oneOf",
    "additionalProperties:untyped": "schema-map-untyped",
    "additionalProperties+properties": "schema-map-with-properties",
    // `false` adds nothing a bare object doesn't already render.
    "additionalProperties:false": NO_RENDER_EFFECT,
    oneOf: "schema-oneOf",
    "oneOf-single": "schema-oneOf-single",
    "oneOf-inline-variant": "schema-oneOf-inline-variant",
    "oneOf-primitive-variant": "schema-oneOf-primitive-variant",
    "oneOf-array-variant": "schema-oneOf-array-variant",
    "oneOf+type": "schema-oneOf-with-type",
    "oneOf+additionalProperties": "schema-oneOf-with-additionalProperties",
    "recursive-ref": "schema-recursive-ref",
    "depth>12": "schema-depth-cap",
    "ref-with-siblings": "schema-ref-with-siblings",
    // No renderer reads bounds, patterns or these flags.
    nullable: NO_RENDER_EFFECT,
    uniqueItems: NO_RENDER_EFFECT,
    minimum: NO_RENDER_EFFECT,
    maximum: NO_RENDER_EFFECT,
    exclusiveMinimum: NO_RENDER_EFFECT,
    exclusiveMaximum: NO_RENDER_EFFECT,
    minLength: NO_RENDER_EFFECT,
    maxLength: NO_RENDER_EFFECT,
    minItems: NO_RENDER_EFFECT,
    maxItems: NO_RENDER_EFFECT,
    minProperties: NO_RENDER_EFFECT,
    maxProperties: NO_RENDER_EFFECT,
    pattern: NO_RENDER_EFFECT,
  }),
  ...fieldDescriptionShapes(["req-field-desc", "res-field-desc"]),
};

/**
 * Fallbacks for open-ended shape families, checked by prefix after an exact
 * match fails. A shape matched only by a wildcard still deserves a look: it
 * means the spec has a value the mapping hasn't seen.
 */
export const SHAPE_CLASS_WILDCARDS: Array<[prefix: string, bucket: ShapeBucket]> =
  [
    ["res:code:2", "response-success"],
    ["res:code:4", "response-error"],
    ["res:code:5", "response-error"],
    ["param:format:", NO_RENDER_EFFECT],
    ["req:format:", "schema-format"],
    ["res:format:", "schema-format"],
    ["method:", "operation-method"],
  ];

/** The bucket for a shape, or `undefined` when nothing maps it. */
export function shapeBucket(shape: string): ShapeBucket | undefined {
  if (shape in SHAPE_CLASSES) return SHAPE_CLASSES[shape];
  return SHAPE_CLASS_WILDCARDS.find(([prefix]) => shape.startsWith(prefix))?.[1];
}
