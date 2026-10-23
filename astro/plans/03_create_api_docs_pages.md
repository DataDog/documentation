# Create the API docs pages

## Prompt

Recently we started working on migrating the API docs, currently built in Hugo, to this Astro site. Read [the plan](./02_create_api_docs_shell.md) for that work in order to build context.

Now, we want to do three things:

### Create all required components for the API docs pages. 

These components do not need to match the HTML of the Hugo components, or use the same tags or classes. They should use what makes the most sense according to our [CLAUDE.md](./../CLAUDE.md) rules for the Astro site, and according to modern web development standards.

These components should each get their own component demo page. The components index (home) page should list them all in a separate section from the more general purpose site components.

These components should avoid heavy data manipulation. Instead, they should take whatever props make sense for the component, structured however makes sense for what the component needs to do. We'll handle the data separately (see the next section).

### Provide the necessary data to the components

In a separate data processing step before the components are used, modify the API data so that it is broken into the pieces needed to support the components.

### Combine the above in order to generate the API docs

Put it all together in order to populate the API docs, reaching content parity with the Hugo pages.

## Claude's plan

### Part 1: Components

Seven new API-specific components. Each gets its own CSS module, demo page (`.mdoc`), headless test, and Playwright test.

#### a. `HttpMethodBadge` (Astro, static)

Color-coded pill badge showing the HTTP method (GET, POST, PUT, PATCH, DELETE).

```ts
interface Props {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options';
}
```

- Renders: `<span class="http-method-badge" data-method="get" data-testid="http-method-badge">GET</span>`
- Each method has a distinct text + background color pair defined as design tokens
- Uppercase display, semibold, small pill shape with `border-radius`

#### b. `SchemaTable` (Preact, interactive)

The workhorse component — a hierarchical table for displaying API parameters, request body fields, or response fields. Reused across arguments, request body, and response sections.

```ts
interface SchemaField {
  name: string;
  type: string;              // display string, e.g. "string", "integer", "[object]", "enum"
  required: boolean;
  deprecated: boolean;
  readOnly: boolean;
  description: string;       // pre-rendered HTML (markdown already converted)
  enumValues?: string[];
  defaultValue?: string;
  children?: SchemaField[];  // nested objects/arrays (recursive)
  unionOptions?: { label: string; fields: SchemaField[] }[]; // oneOf/anyOf
}

interface Props {
  fields: SchemaField[];
  title?: string;            // e.g. "Path Parameters", "Query Strings"
  showExpandAll?: boolean;   // default true
}
```

Features:
- Three-column layout: Name (col-4) | Type (col-2) | Description (col-6)
- Collapsible nested rows — click a toggle arrow to expand/collapse children
- "Expand All" / "Collapse All" button (top-right)
- `[required]` badge on field names
- `DEPRECATED` label on deprecated fields
- Enum values display — inline for ≤10 values, `<details>/<summary>` for >10
- Read-only field styling (muted/italicized)
- Union types (oneOf/anyOf) rendered as "Option 1", "Option 2", each collapsible
- **SEO**: all nested rows rendered in the DOM at build time (hidden via CSS, toggled by Preact)

#### c. `ApiStatusAlert` (Astro, static)

Alert banners for deprecated, unstable, or beta endpoints. Follows the existing Alert component's visual pattern but with API-specific messaging and coloring.

```ts
interface Props {
  type: 'deprecated' | 'unstable' | 'beta';
  newerVersionUrl?: string;  // link to newer API version, if applicable
  message?: string;          // custom message override
}
```

- `deprecated`: red/warning style, default message links to newer version if URL provided
- `unstable`: yellow/caution style, notes the endpoint may change
- `beta`: blue/info style, notes the endpoint is in beta

#### d. `RegionSelector` (Preact, interactive)

Dropdown for selecting the API region. Affects which base URLs and code examples are visible on the page.

```ts
interface Region {
  key: string;       // 'us1', 'eu', 'ap1', 'ap2', 'us3', 'us5', 'gov'
  label: string;     // 'US1', 'EU', etc.
  site: string;      // 'datadoghq.com', 'datadoghq.eu', etc.
}

interface Props {
  regions: Region[];
  defaultRegion?: string;  // default: 'us1'
}
```

- Renders as a compact dropdown/select in the page toolbar area
- Persists selection in `localStorage` (key: `dd-api-region`)
- Sets a `data-region` attribute on a parent element so child components can react via CSS or event listeners
- Dispatches a `regionchange` custom event on the document for components that need it

#### e. `ApiResponse` (Preact, interactive)

Response section with status code tabs, each containing a Model/Example toggle.

```ts
interface ResponseData {
  statusCode: string;       // '200', '400', '403', '404', '429', etc.
  description: string;      // HTML
  schema?: SchemaField[];   // for the "Model" view (uses SchemaTable)
  examples?: Array<{
    name: string;
    value: string;          // JSON string, syntax-highlighted at build time
  }>;
}

interface Props {
  responses: ResponseData[];
}
```

Features:
- Status code tabs across the top (200, 400, 403, 404, 429, etc.)
- First status code active by default
- Within each tab: Model / Example toggle (two-tab switcher)
- Model view renders `SchemaTable` with response fields
- Example view renders syntax-highlighted JSON via `CodeBlock`
- **SEO**: all status code content and both Model/Example views rendered at build time

#### f. `ApiCodeExample` (Preact, interactive)

Language-tabbed code example section. Composes the existing CodeBlock for syntax highlighting and copy functionality.

```ts
interface CodeExampleSet {
  language: string;         // 'curl', 'python', 'ruby', 'go', 'java', 'typescript'
  label: string;            // display name: 'Curl', 'Python', etc.
  entries: Array<{
    description: string;    // accordion header text, e.g. "Create a dashboard returns 'OK' response"
    code: string;           // source code
    syntax: string;         // syntax highlight language ('bash', 'python', 'ruby', 'go', 'java', 'typescript')
  }>;
}

interface Props {
  examples: CodeExampleSet[];
}
```

Features:
- Language tabs across the top (curl always first)
- When a language has multiple examples, render them as an accordion (first expanded, rest collapsed)
- Each code block uses the existing `CodeBlock` component for highlighting + copy button
- **SEO**: all language examples rendered at build time

#### g. `ApiEndpoint` (Astro, static wrapper)

The main composition component — renders a complete endpoint section by assembling all other API components. This is what the page template iterates over.

```ts
interface EndpointData {
  operationId: string;
  summary: string;
  slug: string;
  method: string;
  path: string;
  description: string;         // HTML
  version: 'v1' | 'v2';
  deprecated: boolean;
  unstable: boolean;
  newerVersionUrl?: string;
  permissions?: string[];
  oauthScopes?: string[];
  pathParams?: SchemaField[];
  queryParams?: SchemaField[];
  headerParams?: SchemaField[];
  requestBody?: {
    required: boolean;
    description?: string;      // HTML
    schema: SchemaField[];
    examples: Array<{ name: string; value: string }>;
  };
  responses: ResponseData[];
  codeExamples: CodeExampleSet[];
  regions: Array<{
    key: string;
    site: string;
    supported: boolean;
  }>;
}

interface Props {
  endpoint: EndpointData;
}
```

Renders, in order:
1. `ApiStatusAlert` (if deprecated/unstable/beta)
2. `<h2 id={slug}>` with the endpoint summary (anchor target for side nav)
3. `HttpMethodBadge` + URL path (with region-aware base URL)
4. Overview paragraph (description HTML + permissions/scopes list)
5. Arguments section — up to three `SchemaTable` instances (path params, query params, header params), each with its own title. Section omitted if no params.
6. Request body section — Model/Example tabs using `SchemaTable` for model + `CodeBlock` for example JSON. Section omitted if no request body.
7. `ApiResponse` — status code tabs with model/example
8. `ApiCodeExample` — language-tabbed code examples. Section omitted if no examples available.
9. Visual divider (`<hr>`) between endpoints

### Part 2: New design tokens

Add general-purpose color tokens to `tokens.css` that happen to be needed by the API components (but are named generically so they can be reused elsewhere):

```css
/* Colors — Semantic status */
--color-blue: #1a73e8;
--color-blue-tint: rgba(26, 115, 232, 0.1);
--color-green: #2e7d32;
--color-green-tint: rgba(46, 125, 50, 0.1);
--color-orange: #e65100;
--color-orange-tint: rgba(230, 81, 0, 0.1);
--color-yellow: #f9a825;
--color-yellow-tint: rgba(249, 168, 37, 0.1);
--color-red: #c62828;
--color-red-tint: rgba(198, 40, 40, 0.1);

/* Colors — Surface variants */
--color-bg-hover: rgba(0, 0, 0, 0.02);
```

Plus corresponding dark mode overrides. The component CSS modules map these generic tokens to their elements (e.g., `HttpMethodBadge.module.css` maps `--color-blue` / `--color-blue-tint` to GET badges, `--color-red` to the required field badge in `SchemaTable`, etc.).

### Part 3: Data layer enhancements

The current `src/data/api/index.ts` only extracts nav-level data (operationId, summary, slug, menuOrder, version). We need to expand it significantly to provide the full `EndpointData` objects that `ApiEndpoint` consumes.

#### New files

- `src/data/api/resolver.ts` — `$ref` resolution and schema-to-`SchemaField` conversion
- `src/data/api/endpoints.ts` — full endpoint data extraction (builds `EndpointData[]` per category)
- `src/data/api/curl.ts` — curl code example generation from spec data
- `src/data/api/regions.ts` — region/server URL extraction from the spec's `servers` block
- `src/data/api/examples.ts` — loads SDK code examples from copied data files

The existing `src/data/api/index.ts` remains the nav-level data source. A new top-level function `getEndpointsForCategory(slug)` in `endpoints.ts` returns the fully-processed `EndpointData[]` ready for the page template.

#### `$ref` resolution (`resolver.ts`)

The OpenAPI specs use `$ref` references extensively (`#/components/schemas/DashboardCreateRequest`, etc.). Schemas reference other schemas, creating deep nesting. Some can be circular (e.g., a recursive tree structure).

Approach:
- `resolveRef(spec, refString)` — follows a `$ref` to its target in the spec
- `schemaToFields(spec, schema, visited?)` — converts an OpenAPI schema object to a `SchemaField[]` tree
  - Handles `object` (properties + required array), `array` (items), primitives
  - Handles `oneOf`/`anyOf` → `unionOptions`
  - Handles `allOf` → merge all sub-schemas
  - Handles `enum`, `format`, `example`, `default`, `readOnly`, `deprecated`
  - Tracks visited `$ref`s to break circular references (stops at depth ~5, inserts a "Recursive" placeholder)
- Cache resolved schemas by `$ref` string for performance

#### Markdown in descriptions

OpenAPI descriptions contain markdown (links, bold, code spans, etc.). Add `marked` as a dependency and use it to convert description markdown to HTML during data processing, so components receive pre-rendered HTML strings.

#### Curl generation (`curl.ts`)

Build curl commands from the spec for each operation:
- Method, base URL (with region variants), path (with `${PARAM_NAME}` placeholders)
- Auth headers (`DD-API-KEY`, `DD-APP-KEY`)
- Content-Type and Accept headers
- Request body JSON (from spec examples or generated from schema defaults)
- Output one curl example per request body example in the spec

#### Region data (`regions.ts`)

Extract from the spec's `servers[].variables.site.enum`:
- Map each `site` value to a region key and label
- For each operation, determine supported regions (default: all)
- Build the `regions` array used by `ApiEndpoint` and `RegionSelector`

#### SDK code examples (`examples.ts`)

- Copy `data/api/v1/CodeExamples.json` and `data/api/v2/CodeExamples.json` into `astro/src/data/api/`
- Copy SDK example files from `content/en/api/v{1,2}/` (the `.py`, `.rb`, `.go`, `.java`, `.ts` files plus `request.*.json`) into `astro/src/data/api/examples/v{1,2}/`
- `examples.ts` reads `CodeExamples.json` to map operationId → example metadata, then loads the corresponding source files
- Builds `CodeExampleSet[]` for each operation (curl generated, SDK files loaded)

### Part 4: Additional data files to copy

| Source | Destination | Notes |
|--------|-------------|-------|
| `data/api/v1/CodeExamples.json` | `astro/src/data/api/v1/CodeExamples.json` | Example metadata |
| `data/api/v2/CodeExamples.json` | `astro/src/data/api/v2/CodeExamples.json` | Example metadata |
| `content/en/api/v1/*/` (SDK files) | `astro/src/data/api/examples/v1/` | `.py`, `.rb`, `.go`, `.java`, `.ts`, `request.*.json` files |
| `content/en/api/v2/*/` (SDK files) | `astro/src/data/api/examples/v2/` | Same as above |
| `content/en/api/v1/*/examples.json` | `astro/src/data/api/examples/v1/` | Pre-built response examples + schema HTML |
| `content/en/api/v2/*/examples.json` | `astro/src/data/api/examples/v2/` | Same as above |

The `examples.json` files from Hugo contain pre-rendered schema HTML and JSON response examples. We won't use the pre-rendered HTML (we'll render our own with `SchemaTable`), but the JSON examples are useful as response example data.

### Part 5: Markdoc-first page generation

The API docs are **Markdoc pages** that go through the normal content rendering pipeline, not `.astro` templates that programmatically compose components.

#### Architecture

1. A **pre-processing script** (`scripts/generate-api-mdoc.ts`) reads the OpenAPI specs, resolves all `$ref`s, and generates one `.mdoc` file per API category under `src/content/docs/api/latest/`.
2. Each `.mdoc` file contains frontmatter + Markdoc tags (`{% api-endpoint %}`, etc.) with **all data baked into JSON string attributes**. The files are large but fully self-contained.
3. The **existing content collection pipeline** (`src/content.config.ts` + `src/pages/docs/[...slug].astro`) renders these `.mdoc` files like any other docs page, but API pages use `ApiLayout` instead of `BaseLayout`.
4. All API components are registered as **Markdoc tags** in `markdoc.config.mjs`.

#### Generated `.mdoc` structure

```mdoc
---
title: "Dashboards"
layout: api
---

{% api-endpoint data='{ full JSON blob with all endpoint data }' /%}

{% api-endpoint data='{ another endpoint }' /%}
```

Each `api-endpoint` tag receives a JSON string in its `data` attribute containing the full `EndpointData` object. The `ApiEndpoint` component parses this JSON and renders all sub-components.

#### Content collection changes

Add an `api` collection (or extend `docs`) in `content.config.ts` to handle the generated `.mdoc` files. The `[...slug].astro` page route already catches these via the glob pattern. API pages are distinguished by their `layout: api` frontmatter and rendered with `ApiLayout`.

#### Pre-processing script

`scripts/generate-api-mdoc.ts`:
- Import and use the data layer modules (resolver, regions, curl, examples, endpoints)
- For each category, call `getEndpointsForCategory(slug)` to get fully-processed `EndpointData[]`
- Write a `.mdoc` file with frontmatter + one `{% api-endpoint %}` tag per endpoint
- Run via `npm run generate:api` (add to package.json scripts)

Also add a `RegionSelector` to the `ApiLayout` (in the toolbar area above the main content).

### Part 6: Component demo pages

Each new component gets a demo page under `src/content/docs/components/`:

| Component | Demo page | Contents |
|-----------|-----------|----------|
| HttpMethodBadge | `http-method-badge.mdoc` | Properties table, one example per method |
| SchemaTable | `schema-table.mdoc` | Properties table, examples: flat fields, nested fields, union types, enum overflow, deprecated/readonly fields |
| ApiStatusAlert | `api-status-alert.mdoc` | Properties table, one example per type |
| RegionSelector | `region-selector.mdoc` | Properties table, default region, persisted selection |
| ApiResponse | `api-response.mdoc` | Properties table, multi-status-code example with model + example views |
| ApiCodeExample | `api-code-example.mdoc` | Properties table, multi-language example with accordion |
| ApiEndpoint | `api-endpoint.mdoc` | Properties table, full endpoint example with all sections populated |

Update `PrototypeHomePage.astro` to add an **API Components** section below the existing Component gallery section:

```html
<h2>API components</h2>
<ul>
  <li><a href="/docs/components/http-method-badge">HttpMethodBadge</a></li>
  <li><a href="/docs/components/schema-table">SchemaTable</a></li>
  <li><a href="/docs/components/api-status-alert">ApiStatusAlert</a></li>
  <li><a href="/docs/components/region-selector">RegionSelector</a></li>
  <li><a href="/docs/components/api-response">ApiResponse</a></li>
  <li><a href="/docs/components/api-code-example">ApiCodeExample</a></li>
  <li><a href="/docs/components/api-endpoint">ApiEndpoint</a></li>
</ul>
```

### Part 7: Testing

Follow the established two-tier pattern:

**Headless tests** (`tests/headless/`):
- `http-method-badge.test.ts` — renders each method, verifies correct text, `data-method` attribute
- `schema-table.test.ts` — renders flat fields, nested fields, required badges, deprecated labels, enum values
- `api-status-alert.test.ts` — renders each type with correct message and link
- `api-endpoint.test.ts` — renders a full endpoint, verifies all sub-sections present

**Playwright tests** (`tests/browser/`):
- `schema-table.spec.ts` — expand/collapse nested rows, "Expand All" button
- `region-selector.spec.ts` — select region, verify localStorage persistence, verify URL display changes
- `api-response.spec.ts` — click status code tabs, toggle Model/Example
- `api-code-example.spec.ts` — switch language tabs, expand/collapse accordion items
- `api-endpoint.spec.ts` — full endpoint page interaction (navigate, verify sections, interact with all sub-components)

**Data layer tests** (`tests/headless/`):
- `resolver.test.ts` — `$ref` resolution, circular reference handling, schema-to-fields conversion
- `curl.test.ts` — curl generation for GET, POST with body, auth headers, region URLs
- `regions.test.ts` — region extraction from spec servers block

### Part 8: Implementation order

1. **Install `marked`** for markdown-to-HTML conversion in the data layer
2. **Add new design tokens** to `tokens.css` (method colors, schema table tokens)
3. **`HttpMethodBadge`** — simplest component, good warm-up
   - Component + CSS module + demo page + tests
4. **`ApiStatusAlert`** — simple static component
   - Component + CSS module + demo page + tests
5. **Data: `resolver.ts`** — `$ref` resolution + `schemaToFields()` conversion
   - This is the most complex data processing piece; get it right with tests before building components that consume it
6. **Data: `regions.ts`** — region extraction from spec servers block
7. **`SchemaTable`** — the core interactive component
   - Preact component + CSS module + island wrapper + demo page + tests
8. **`RegionSelector`** — standalone interactive component
   - Preact component + CSS module + island wrapper + demo page + tests
9. **`ApiResponse`** — uses SchemaTable + CodeBlock
   - Preact component + CSS module + island wrapper + demo page + tests
10. **`ApiCodeExample`** — language tabs + CodeBlock
    - Preact component + CSS module + island wrapper + demo page + tests
11. **Copy data files** — CodeExamples.json + SDK code examples
12. **Data: `curl.ts`** — curl generation
13. **Data: `examples.ts`** — SDK example loading
14. **Data: `endpoints.ts`** — full endpoint data extraction, wires together resolver + curl + examples + regions
15. **`ApiEndpoint`** — composition component, wires all sub-components
    - Astro component + CSS module + demo page + tests
16. **Update `[category].astro`** — replace placeholder with full page template
17. **Update `ApiLayout.astro`** — add `RegionSelector` to toolbar
18. **Update `PrototypeHomePage.astro`** — add API Components section
19. **Verify** — `npm run build`, `npm run dev`, visual comparison with Hugo output
20. **Register new Markdoc tags** — if any API components need to be usable from `.mdoc` files (for demo pages), register them in the Markdoc config

### Part 9: Risks and open questions

- **Spec parse time**: The v2 spec is ~4 MB. Full `$ref` resolution and schema flattening across hundreds of operations will add build time. Mitigation: aggressive caching in the data layer (cache by `$ref` string, cache by operationId). If build times become a problem, we can pre-process the spec into a cached JSON file.

- **Circular `$ref` references**: Some schemas reference themselves (e.g., recursive tree structures). The resolver tracks visited refs and stops at a configurable depth (~5), inserting a "Recursive — see {SchemaName}" placeholder. This mirrors how Hugo handles it.

- **SDK code example freshness**: Copying SDK examples from Hugo's content tree gives us a snapshot. For production, we'll need an automated fetch mechanism (similar to Hugo's build scripts) that pulls latest examples from the `datadog-api-client-*` repos. This is a follow-up concern, not a blocker for content parity.

- **v1/v2 version tabs**: Hugo shows version tabs when an endpoint exists in both v1 and v2. Plan 02 merged operations under a single category. For this plan, endpoints from different versions are rendered as separate `ApiEndpoint` sections (grouped together, with a version badge on each). A unified version-tab UI within a single endpoint section can be a follow-up enhancement.

- **`examples.json` from Hugo**: These files contain pre-rendered schema HTML (Bootstrap-based). We discard the HTML and use only the `json` fields for response examples. Our `SchemaTable` renders its own HTML from the spec schemas.

- **Markdown rendering**: Operation descriptions in the spec use markdown. We use `marked` to convert to HTML. Some descriptions contain links to other endpoints (e.g., `[Get a dashboard](/api/latest/dashboards/#get-a-dashboard)`) — these should resolve correctly since our URL structure matches Hugo's.

- **Request body examples**: The spec includes `examples` objects on request bodies (e.g., `examples.add_log_integration`). Each example has a `summary`, `description`, and `value`. We use the `value` as the JSON example and the `description` as the accordion header. Operations without spec examples get a generated example from schema defaults.

- **Unsupported regions**: Some endpoints don't support all regions. The spec's `servers` block lists all possible regions at the top level, but individual operations may have `x-given-server` or `servers` overrides. For the initial implementation, we show all regions and mark unsupported ones. Refinement can come later.

- **Component registration for Markdoc**: The API components will primarily be used programmatically from `.astro` page templates, not from `.mdoc` content files. However, the demo pages are `.mdoc` files. For demo pages, we can either register each component as a Markdoc tag, or create dedicated `.astro` demo pages instead of `.mdoc`. The latter is simpler and avoids bloating the Markdoc config with components that are only used on demo pages. Decision: **use `.astro` demo pages** for API components (under `src/pages/docs/components/`), rather than `.mdoc` in the content collection.
