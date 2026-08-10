# pages.json

## Prompt

The Hugo site has a separate plaintext build that runs nightly from the Hugo HTML
(`corp-node-packages/packages/html-to-mdoc`), which emits a `pages.json`. Achieve
parity in Astro: Astro should publish its own `pages.json` listing every
production route it controls **and renders as plaintext** (not just API routes —
the scope will grow). Build it statically for now. Build it so it can be extended
later for Cdocs (branch `jen.gilbert/astro-api-cdocs`), which may need custom
logic to supply all possible Cdocs routes to the function that builds
`pages.json`. Cdocs support itself is out of scope for now.

## Decisions (confirmed with user)

| Question | Decision |
| --- | --- |
| Schema fidelity | Match Hugo's shape, but **omit `htmlHash` and `astIsValid`**. Keep `metadata` + `mdocHash`, and **add a `source` key** (see below). |
| `source` key | Every entry carries `"source": "astro"`, so entries can be distinguished when this file is eventually blended with Hugo's `pages.json`. |
| `htmlHash` | Dropped. Astro has no HTML→mdoc source to hash. |
| `astIsValid` | Dropped. Astro builds plaintext from a Markdoc AST and formats it (Markdoc→Markdoc), so it is valid by construction; the flag would always be `true` and carries no signal. |
| Output location | Web root: `dist/client/pages.json`, served at `/pages.json`. |
| Locales | **English only.** Root `/api/...` routes; no `fr/ja/ko/es` entries. |

### Note on the location decision

Hugo already serves a `pages.json` at its web root. Once both deploy behind one
origin, an Astro `/pages.json` and a Hugo `/pages.json` occupy the same path — one
will win depending on routing/precedence. The user chose the web-root location
deliberately for direct parity. Flagging it here as a deployment concern to
resolve before this ships to a shared origin (options later: keep web-root and
have Astro's take precedence for the routes it owns, or aggregate both into one
file the way `writeAggregatedPagesListing` does today). Not a blocker for building
the artifact.

## Background: what Hugo's pages.json looks like

Built by `html-to-mdoc` (`htmlDirToMdoc`), validated against a **strict** Zod
schema (`PagesListingSchema`). It is a JSON object keyed by the full absolute URL
of each page's plaintext twin (ending in `.md`):

```jsonc
{
  "https://docs.datadoghq.com/api/latest/metrics/get-a-metric.md": {
    "metadata": {
      "title": "Get a metric's metadata",
      "description": "...",
      "breadcrumbs": ["Docs", "API Reference", "Metrics", "Get a metric's metadata"],
      "isPrivate": false          // optional
    },
    "mdocHash": "<32-char md5 of the .mdoc/.md body>",
    "htmlHash": "<32-char md5 of source HTML>",   // <-- dropped in Astro
    "astIsValid": true                            // <-- dropped in Astro
  }
}
```

Downstream in Hugo's world (`corp-node-packages`): `writeAggregatedPagesListing`
merges per-dir `pages.json` files; `writeLlmsTxtTree` consumes `breadcrumbs` and
`isPrivate`. We are **not** designing around that consumer — the user expects
llms.txt to change. We keep `breadcrumbs`/`isPrivate` because they're reasonable,
low-cost page metadata that gives us parity and keeps options open, not because
we're targeting the current llms.txt builder.

### Astro's target entry shape

```jsonc
{
  "https://docs.datadoghq.com/api/latest/metrics/get-a-metric.md": {
    "metadata": {
      "title": "...",
      "description": "...",
      "breadcrumbs": ["Docs", "API Reference", "Metrics", "Get a metric's metadata"],
      "isPrivate": false
    },
    "mdocHash": "<32-char md5>",
    "source": "astro"
  }
}
```

The `source` key is Astro-specific (Hugo's entries have no such field). It marks
provenance so that when this file is blended with Hugo's `pages.json`, Astro-owned
routes are identifiable. Today it is always the literal `"astro"`; keeping it as a
string (not a boolean) leaves room for finer-grained provenance later.

## What already exists in Astro (relevant)

- **Route/content enumeration:** `src/lib/api/viewsBuilder.ts` — `getCategoriesView(lang)`,
  `getCategoryStubsView(lang)`, `getCategoryViewBySlug`, `getOperationView`. This is
  the single source of truth for API routes; `getStaticPaths` and the sitemap both
  derive from it.
- **Plaintext rendering:** `src/lib/plaintext/helpers.ts` (`buildMarkdocStr`,
  `heading`, node builders) and per-component plaintext twins under
  `src/components/*/plaintext/` (e.g. `ApiEndpoint/plaintext/ApiEndpoint.ts` →
  `apiEndpointNodes`).
- **Plaintext routes (`.md`):** the pages whose content pages.json must index:
  - `src/pages/[...lang]/api/latest.md.ts` → `/api/latest.md`
  - `src/pages/[...lang]/api/latest/using-the-api.md.ts` → `/api/latest/using-the-api.md`
  - `src/pages/[...lang]/api/latest/scopes.md.ts` → `/api/latest/scopes.md`
  - `src/pages/[...lang]/api/latest/rate-limits.md.ts` → `/api/latest/rate-limits.md`
  - `src/pages/[...lang]/api/latest/[category].md.ts` → `/api/latest/{category}.md`
  - `src/pages/[...lang]/api/latest/[category]/[operation].md.ts` → `/api/latest/{category}/{operation}.md`
  - (`src/pages/dd_e2e/...md.ts` — test scaffolding, **excluded**, same as the sitemap filter.)
- **Precedent for a build-emitted JSON/text artifact via a route:** `plans/11_llms_txt.md`
  ships `llms.txt` as a static Astro route (`GET` handler, prerendered). The site
  URL comes from the APIRoute context (`site.origin`). pages.json follows the same
  pattern.
- **Sitemap filter:** `src/lib/sitemap/sitemapFilter.ts` (`isSitemapPage`) already
  encodes "which routes are real production routes" (excludes `/dd_e2e/`, root
  redirect). Reuse the same exclusion intent.

## Approach: metadata route + build-time hashing integration (implemented)

`pages.json` is built in two halves so that **no page body is ever built twice**
— a real concern at the eventual ~30K-page scale, where building every body once
for the `.md` route and again for `pages.json` would double build time, and
holding all bodies in memory to dedupe would blow up memory.

1. **`src/pages/pages-index.json.ts`** (prerendered route) — emits a cheap
   metadata *sidecar*: `[{ key, file, metadata }]` for every page, via
   `buildPageIndex(pageSources, site.origin)`. It **never calls `buildBody`**.
   `file` is the disk-relative path of the emitted `.md` (the `urlPath` minus its
   leading slash).
2. **`src/integrations/pagesJson.ts`** (`astro:build:done`) — reads the sidecar,
   streams each already-emitted `.md` from `dist/client` through md5 one at a
   time (`buildListingFromIndex` + `assemblePagesListing`), writes the final
   `dist/client/pages.json`, and deletes the sidecar.

The result: each body is materialized exactly once (by its `.md` route during the
static build), peak memory is one body regardless of page count, and the
`mdocHash` is the md5 of the exact bytes on disk — so it *cannot* drift from
served content (physics, not a shared-builder convention).

`pages.json` is **English-only and web-root** (`/pages.json`).

### Consequence: build-only artifact

Because hashing happens in `astro:build:done`, `pages.json` exists in
`astro build` / `astro preview` / production, **but not in `astro dev`**. It is a
machine-consumption artifact, so this is acceptable (confirmed with the owner).
`llms.txt` is unaffected — it only reads metadata, never bodies, so it stays a
live route in dev (see below).

### Why not a plain `pages.json.ts` route

A prerendered route can't reliably read other routes' emitted files (Astro gives
no route-ordering guarantee, and dev renders on demand), so a route would have to
build every body itself — the double-build we're avoiding. And an
`astro:build:done` hook runs in **Node, outside Vite's module graph**, so it
cannot resolve `@lib`/`@components` aliases: the integration and everything it
imports (`buildListingFromIndex` → `assemblePagesListing` → `schema` → zod) must
stay **alias-free** (relative + npm only). Metadata, which *does* need the
alias-laden source tree, is therefore produced by the route (in Vite's graph) and
handed to the integration through the on-disk sidecar. The sidecar is excluded
from the sitemap (`isSitemapPage`) and deleted every build.

## The Cdocs-extensible seam: a "plaintext page source" registry

The core abstraction is a list of **page sources**. Each source enumerates the
plaintext pages it owns and, for each, provides everything pages.json needs.

Add `src/lib/pagesListing/pageSources.ts` (name TBD):

```ts
export interface PlaintextPage {
  /** Path portion of the URL, ending in `.md`, e.g. "/api/latest/metrics/get-a-metric.md" */
  urlPath: string;
  metadata: PageMetadata;          // title, description, breadcrumbs, isPrivate?
  /** Returns the exact plaintext served at urlPath. Used only for hashing. */
  buildBody: () => Promise<string>;
}

export interface PlaintextPageSource {
  listPages: () => Promise<PlaintextPage[]>;
}

/** Ordered list of sources. Today: just the API source. Cdocs appends later. */
export const pageSources: PlaintextPageSource[] = [apiPageSource];
```

- **Today:** `apiPageSource` enumerates the API plaintext pages from
  `viewsBuilder.ts` (English only) — landing, each category, each operation, and
  the three special pages (`using-the-api`, `scopes`, `rate-limits`).
- **Later (Cdocs, out of scope):** a `cdocsPageSource` implements the same
  interface. Because Cdocs routes resolve per-request and can't prerender, this
  source's job is exactly the "custom logic to supply all possible Cdocs routes"
  the prompt calls out — it enumerates the route permutations and provides
  `buildBody` per route. `pages.json.ts` needs no change; it just iterates
  `pageSources`. **Open question for that future work:** how Cdocs enumerates "all
  possible routes" (filter permutations) — the known complexity, deferred.

### Shared-builder refactor (correctness-critical)

To guarantee `mdocHash` matches served `.md` content, extract each `.md.ts`
route's body construction into a shared function, and have **both** the route and
the API page source call it. For example, factor the endpoint body currently
inline in `[category]/[operation].md.ts` into a helper:

```ts
// e.g. src/lib/plaintext/pages/operationBody.ts
export function operationPlaintextBody(operation: OperationView): string;
```

Then `[operation].md.ts` and `apiPageSource.buildBody` both call it. Repeat for
category / landing / special pages. This refactor is the safeguard against the
served plaintext and the hashed plaintext diverging.

## The assembler (pure function)

Add `src/lib/pagesListing/buildPagesListing.ts`:

```ts
export async function buildPagesListing(
  sources: PlaintextPageSource[],
  siteOrigin: string,
): Promise<PagesListing>;
```

Logic:
- For every source, `listPages()`, then for every page:
  - `key = `${siteOrigin}${page.urlPath}``
  - `mdocHash = md5Hex(await page.buildBody())` (Node `crypto`, hex, 32 chars)
  - entry = `{ metadata: page.metadata, mdocHash, source: "astro" }`

The `source` is set by the assembler (not the individual sources) since every page
this build emits is Astro-owned. If a future source needs a different value, lift
`source` onto `PlaintextPage`.

### Private pages

Privacy is a **page property that lives in frontmatter** (the way Hugo does it,
e.g. `private: true`). It is not an API concept: the API specs carry no
operation-level privacy flag (verified — the only operation `x-` extensions are
`x-unstable`, `x-deprecated`, `x-menu-order`, `x-permission`, `x-sunset`, …; the
`hidden` fields in the specs are schema *property* names, not page flags). So the
API source always sets `isPrivate: false`. The concept becomes load-bearing only
once content sources (Cdocs, general docs) arrive, which read `private` from each
page's frontmatter.

Because privacy must be respected by **every** consumer, handle it once, in the
shared layer:

- `PlaintextPage.metadata.isPrivate` is populated by each source (API → always
  `false`; content sources → from frontmatter).
- **`pages.json` includes private pages, with `isPrivate: true` set** (Hugo
  parity). The assembler emits them like any other entry; the `isPrivate` flag is
  how downstream consumers know to treat them accordingly.
- **`llms.txt` excludes private pages entirely** — see the llms.txt fixes section.
  This split (list-with-flag in pages.json, drop in llms.txt) mirrors Hugo, where
  `pages.json` keeps private entries and `writeLlmsTxt` skips them.

Net effect today: no behavior change (no API page is private), but the filter is
in place before any private content can flow through.
- Return an object with **keys sorted** for stable, diff-friendly output.
- Throw on duplicate keys (two sources claiming one URL) — silent overwrite would
  hide bugs, especially once Cdocs is added.
- Throw on empty `siteOrigin` (mirror the llms.txt guard — silent fallback ships
  broken keys).

Pure and I/O-free apart from the injected sources → unit-testable in isolation.

### Astro-local schema

Define the entry type + a Zod validator locally in Astro (do **not** import from
`corp-node-packages`; stay inside `astro/`). Mirror only the kept subset:

```ts
// src/lib/pagesListing/schema.ts
export const PageMetadataSchema = z.object({
  title: z.string(),
  description: z.string(),
  breadcrumbs: z.array(z.string()),
  isPrivate: z.boolean().optional(),
}).partial({ /* match Hugo: all optional except as needed */ });

export const PagesListingEntrySchema = z.object({
  metadata: PageMetadataSchema,
  mdocHash: z.string().length(32),
  source: z.literal("astro"),
}).strict();

export const PagesListingSchema = z.record(PagesListingEntrySchema);
```

The assembler validates its output against this before returning, so a malformed
entry fails the build rather than shipping.

## The route handler

`src/pages/pages.json.ts`:

```ts
import type { APIRoute } from "astro";
import { pageSources } from "@lib/pagesListing/pageSources";
import { buildPagesListing } from "@lib/pagesListing/buildPagesListing";

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error("astro.config.mjs `site` must be set for pages.json to render canonical URLs.");
  }
  const listing = await buildPagesListing(pageSources, site.origin);
  return new Response(JSON.stringify(listing, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
```

- `site.origin` is environment-derived (`deriveSiteUrl()` in `astro.config.mjs`):
  prod in live builds, the branch URL in preview. **Minor decision:** this differs
  from `llms.txt`, which hard-codes prod. Environment-derived keys mean a preview
  `pages.json` points at preview URLs — recommended, but confirm.

## Metadata derivation (API source)

Propose the following, to be confirmed:

Breadcrumbs are **just breadcrumbs** — the navigational ancestor trail, excluding
the page's own title. The page's own name/description are carried in the separate
`title` / `description` fields, never appended as the final crumb.

| Page | title | breadcrumbs (ancestors only) | description | isPrivate |
| --- | --- | --- | --- | --- |
| `/api/latest.md` | "API Reference" | `["Docs"]` | short blurb | false |
| category | category name | `["Docs", "API Reference"]` | category description (if any) | false |
| operation | `operation.summary` | `["Docs", "API Reference", "<Category>"]` | `operation.description` (first line/sentence, trimmed) | false |
| using-the-api / scopes / rate-limits | page title | `["Docs", "API Reference"]` | short blurb | false |

Notes:
- **Breadcrumbs** are the ancestor trail only (no leaf title). Kept as general page
  metadata that gives a natural hierarchy if we later blend with Hugo's file.
  Confirm the "API Reference" root label. Not designed around any llms.txt grouping.
- `description` for the landing/special pages: hardcode short English strings in
  the source (these are data, not i18n keys, so this respects the "don't touch
  Hugo i18n" rule). Add a `TODO` if a localized/i18n string is wanted later.
- `isPrivate`: always `false` for API docs. Keep the field so future sources
  (Cdocs, etc.) can mark private pages; the assembler/llms.txt already respect it.

## Tests (red → green)

Write tests first and confirm they fail before implementing.

Unit (`yarn test:headless-ai`, uses frozen fixtures in `tests/fixtures/api`):
1. **API source enumeration** — `apiPageSource.listPages()` against the fixture
   spec returns the expected `urlPath`s (landing + each fixture category +
   operation + the 3 special pages), correct `breadcrumbs`, and titles. Ordering
   is stable.
2. **Assembler** — given fake sources, `buildPagesListing`:
   - keys are `siteOrigin + urlPath`, all ending `.md`;
   - each entry is `{ metadata, mdocHash, source: "astro" }` and validates against `PagesListingSchema`;
   - `mdocHash` is 32 hex chars and equals `md5` of the source's `buildBody()`;
   - keys are sorted;
   - duplicate `urlPath` across sources throws;
   - empty `siteOrigin` throws;
   - a source page with `isPrivate: true` **is** emitted, with the flag preserved
     (pages.json lists private pages; only llms.txt drops them).
3. **No hash drift** — for a sample operation, assert the API source's
   `buildBody()` output is byte-identical to what `[operation].md.ts` serves
   (both call the shared `operationPlaintextBody`). Guards the shared-builder
   refactor.
4. **Route smoke (headless)** — import the `pages.json.ts` handler, call with a
   mocked `{ site: new URL("https://docs.datadoghq.com") }`, assert
   `Content-Type: application/json`, body parses, every key ends in `.md`, and the
   parsed object validates against `PagesListingSchema`.

Integration (`yarn test:browser-ai` / vitest.integration, real upstream spec —
config does **not** redirect to fixtures):
5. **Coverage** — `buildPagesListing(pageSources, ...)` against the real spec
   contains one entry per category + one per operation + the special pages; count
   sanity vs. `getCategoriesView("en")`. Catches routes the fixture doesn't cover.

Run the full `yarn test-ai` once at the end for regressions.

## Manual verification

- Dev: `yarn dev`, then
  `curl -s localhost:4321/pages.json | jq 'keys | length'` and spot-check a few
  entries. Confirm the count matches (categories + operations + specials + landing).
- Prod build: **recommend the user run `yarn build`** (per `astro/CLAUDE.md`, do
  not run the prod build here) and confirm `dist/client/pages.json` exists, is
  valid JSON, and every key ends in `.md`.

## llms.txt: rebuilt on the same page-source registry (implemented)

`llms.txt` is now driven by the shared `PlaintextPageSource` registry — not
`getCategoriesView()` directly — so page enumeration and the privacy filter are
shared with `pages.json`.

**Sections are first-class on the source.** `PlaintextPageSource` gained
`title`, `listRootPages()`, and `listSections()`. A `PlaintextSection` is
`{ title, llmsTxtPath, pages }` — the unit of chunking + indexing for llms.txt.
The API source uses **one section per category** (each section = the category
overview page + its operation pages); landing + the three static pages are
`rootPages`. `pages.json` ignores sections and flattens everything (via
`collectPages`).

**Tree output, mirroring Hugo's `writeLlmsTxtTree` (`corp-node-packages`).**
`buildLlmsTree(sources, siteOrigin, hardCharLimit=50_000)` in
`src/lib/pagesListing/llmsTree.ts` produces:

- **Index** at `/llms.txt`: intro + per-source `## {title}` heading, listing
  root pages (direct `.md` links) and one link per section to its detail file.
- **Detail file** per section at `section.llmsTxtPath`
  (`/api/latest/{category}/llms.txt`): `# {title}` + a bullet per page.
- **Splitting**: a detail file over `hardCharLimit` becomes an index of
  numbered `part_N/llms.txt` files. Dormant today — the largest single category
  is ~29K chars (< 50K) — but exercised by unit tests and guarded by an
  integration test asserting no generated file exceeds the limit.

Routes: `src/pages/llms.txt.ts` (index) and the catch-all
`src/pages/[...llmsSection]/llms.txt.ts` (detail + parts). The detail route's
`getStaticPaths` rebuilds the tree with `deriveSiteOrigin()` (extracted to
`src/lib/site/siteUrl.ts`, shared with `astro.config.mjs`) so build-time paths
match the per-request `site.origin` and split boundaries agree. A browser test
confirms both routes resolve through Astro's router (not shadowed by
`[...slug].astro`).

**Private pages are dropped everywhere in llms.txt** (index + detail), and a
section left empty by the filter is omitted entirely. No active leak today (no
API page is private); the filter is in place before any private content flows in.

## Out of scope / follow-ups

- **Cdocs source** — the whole point of the `PlaintextPageSource` seam, but
  deferred. Enumerating "all possible Cdocs routes" is the known hard part.
- **Web-root collision with Hugo's `pages.json`** — resolve before shared-origin
  deploy (precedence, or aggregate both).
- **Blending with Hugo's `pages.json`** — the eventual goal (see the `source`
  key). Astro's file is standalone for now. When blended, note the current Hugo
  aggregator schema is `.strict()` and expects `htmlHash`/`astIsValid`; the blend
  step (or a relaxed schema) handles the difference. Not building that now.
- **llms.txt tree at web root** — the section detail files live under Astro's own
  `/api/latest/{category}/llms.txt`, so they don't collide with Hugo's own
  `llms.txt` tree. The top-level `/llms.txt` index, however, shares the web-root
  path with Hugo's — same precedence concern as `pages.json`, resolve before a
  shared-origin deploy.
- **Sitemap** — the new `…/llms.txt` files are not excluded from the sitemap
  (`isSitemapPage`); revisit if they should be.
- **Non-English locales** — excluded now; add locale entries by looping `LOCALES`
  in the API source if/when translated API plaintext is wanted.
```
