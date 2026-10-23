# Cdocs plaintext rendering

We recently implemented a proof of concept for Cdocs (see the [plan file](./20_cdocs.md)). Now I want to build plaintext rendering for Cdocs.

The Astro API docs (which are not in production yet) already have plaintext rendering; each API route also has an `.md` URL that renders the content in plain text.

The Hugo docs (the production docs) also have plaintext rendering, but in a strange way. The compiled Hugo HTML is processed into a Markdoc AST with the `html-to-mdoc` package, which is available locally at `/Users/jen.gilbert/dd/corp-node-packages/packages/html-to-mdoc`. We don't want to use this package in Astro; it's definitely a Band-Aid. But the package is a good source of truth for how we prefer to render Cdocs elements to plain text, in terms of what the resulting content looks like.

For plaintext rendering for Cdocs in Astro, I want it to work similarly to plaintext rendering for the API docs, where the relevant components have plaintext equivalents, and where `.md` URLs render plaintext. But we have an advantage in Cdocs that we don't have in Astro: Each Cdoc is already an `.mdoc` file, which means we can render it with a custom Markdoc renderer, invoking the plaintext versions of the components wherever we want.

This is just a proof of concept. Here's what's in scope:

- If the URL has an `.md` (`some/path.md?some=param`), it returns plaintext (`text/markdown` content type).
- The non-plaintext page has a link to the plaintext version at the top, just for our testing purposes.
- The non-plaintext page has a Copy button that works similarly to the current Copy button for the API docs.

## Claude's plan

### Confirmed decisions

- **Filtered content**: emit only the resolved single state — identical to what the HTML page shows for the current filter values.
- **Component syntax**: keep Markdoc tags (`{% alert %}`, `{% tab %}`, fenced code) per html-to-mdoc conventions.
- **Twin scope**: build only what the two current fixtures exercise (standard markdown, partials, `alert`); stub tabs/codeblock/whatsNext/regionSelector to establish the convention.

### Core idea

Cdocs are `.mdoc` files, so we skip the API-docs approach of hand-building an AST per component. Instead we run the raw `.mdoc` body through Markdoc ourselves:

`parse(body)` → `transform(ast, plaintextConfig)` → **custom plaintext renderer** → markdown string.

`transform` does the important work for free: it evaluates `$prog_lang`/`$api_type` variables, resolves `if`/`equals`/`includes`, drops non-matching branches, and expands `{% partial %}` includes — exactly the same server-side content-dropping the HTML page already relies on. The only thing we write is a renderer that walks the resulting renderable tree and emits markdown, delegating custom tags (`alert`, `tabs`, `fence`, `whatsNext`) to per-component plaintext twins. Output shapes follow `html-to-mdoc`'s conventions (that package stays unused — it's just the reference for what the text should look like).

Filter resolution reuses the existing `resolveCdocRender` unchanged, so the `.md` route and the HTML route resolve filters identically (URL param > cookie > default).

### 1. `.md` routing

Add a catch-all endpoint **`src/pages/[...slug].md.ts`** (sibling of `[...slug].astro`, mirrors the API docs' `[operation].md.ts` pattern):

- `prerender = false`.
- `slug = params.slug`; `getEntry('docs', slug)`; 404 if not a cdoc (`!entry.data.content_filters`).
- Call `resolveCdocRender({ contentFilters, searchParams, cookieRaw, now })` — same shared logic as the HTML route.
- Render plaintext (section 2) from `entry.body` + `valsByTraitId`.
- Return `new Response(text, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } })`.

**Verify during implementation:** that `[...slug].md.ts` wins over `[...slug].astro` for `foo.md` URLs (literal `.md` segment should make it more specific). Empirical check on the dev server. Fallback if Astro won't route an extension on a rest param: fold `.md` detection into the single `[...slug].astro` (strip suffix, branch on it, return a `Response`).

### 2. Plaintext rendering pipeline (`src/lib/cdocs/plaintext/`)

- **`plaintextConfig.ts`** — a Markdoc config for our own `transform`, separate from `markdoc.config.mjs` (whose tag `render` values are Astro component paths, useless to a text renderer). Re-declares: the `includes` function (import/duplicate the tiny impl), and custom tags mapped to **plain string names** (`alert`, `tabs`, `tab`, `fence`, `whatsNext`, `nextLink`, `regionSelector`) so transformed nodes carry a switchable `.name`. Built-in `if`/`else`/`equals`/`and`/`or`/`not`/`partial` come for free.
- **`loadPartials.ts`** — the fixtures use `{% partial file="@partials/..." /%}`, so `config.partials` must be populated or transform drops them. Resolve the `@partials/` alias to `src/cdocs/partials/en/`, read + `parse` each referenced partial file, key it by the `file` attribute. For the POC, eager-load the partials tree under `src/cdocs/partials/en/` (small) rather than lazily following references.
- **`renderCdocPlaintext.ts`** — top-level driver: `parse` → `transform` (variables = `valsByTraitId`) → `renderTree`. Prepends `# {title}\n\n`.
- **`renderer.ts`** — walks the renderable tree to markdown. Handles the standard nodes the fixtures produce (headings→`##`, paragraph, `strong`/`em`, `a`→`[text](href)`, inline `code`, `fence`→```` ```lang ````, `ul`/`ol`/`li`, tables). Text nodes pass through. Unknown tags: recurse into children so nothing is silently dropped. Kept pure and unit-testable (string in, string out).

### 3. Component plaintext twins

Honor the CLAUDE.md plaintext-twin convention: each custom component gets a `plaintext/` module the central renderer dispatches to.

- `src/components/Alert/plaintext/Alert.ts` → `{% alert level="…" %}\n…\n{% /alert %}`
- `src/components/Tabs/plaintext/Tabs.ts` (+ tab) → `{% tab title="…" %}…{% /tab %}` grouping (html-to-mdoc shape; maps Astro's `label` → `title`)
- `src/components/CodeBlock/plaintext/CodeBlock.ts` → fenced block, carrying `filename` if present
- `src/components/WhatsNext/plaintext/WhatsNext.ts` (+ NextLink) → list of links
- `src/components/RegionSelector/plaintext/RegionSelector.ts` → emits nothing (interactive-only) for the POC

Each is `(node, renderChildren) => string`. The two current fixtures mainly exercise `alert` + partials + standard markdown; the others are stubbed to the convention so the pattern is established.

### 4. HTML page changes (`src/pages/[...slug].astro`)

- **Plaintext link at top** (testing aid): a small link to the current path + `.md`, preserving current query params, e.g. `View as plaintext`. Placed above `<h1>` or just under it.
- **Copy button**: drop in the existing `CopyPageButtonIsland` (`client:idle`). Its `pageTextLoader` already fetches `currentURL + '.md'`, which now resolves to our endpoint. Because the HTML route sets the `cdocs_prefs` cookie on load and the `.md` fetch is same-origin, filters resolve identically even though `getMdUrl()` drops the query string. Optional nicety (note, not required): extend `getMdUrl()` to append `window.location.search` so a shared filtered URL copies the matching plaintext without relying on the cookie. i18n: reuse existing keys if present, else hardcode English with a `TODO` (no Hugo-side key additions).

### Files

New:
- `src/pages/[...slug].md.ts`
- `src/lib/cdocs/plaintext/{plaintextConfig,loadPartials,renderCdocPlaintext,renderer}.ts` + `renderer.test.ts` / `renderCdocPlaintext.test.ts`
- `src/components/{Alert,Tabs,CodeBlock,WhatsNext,RegionSelector}/plaintext/*.ts`

Edited:
- `src/pages/[...slug].astro` (plaintext link + Copy button island)
- possibly `src/components/CopyPageButton/pageTextLoader.ts` (optional query-string pass-through)

### Testing (red → green)

- **Unit**: `renderCdocPlaintext` against the `custom_instrumentation.mdoc` body with `{prog_lang, api_type}` variants — assert (a) `text/markdown`-shaped output, (b) dropped branches absent (e.g. python/dd_api output has no java content, no otel content), (c) partials expanded, (d) alert rendered as `{% alert %}`. Renderer unit tests per node type. Twin unit tests. Write failing first, confirm red, implement.
- **Browser**: on the e2e cdoc page — plaintext link present and points to `.md`; fetching the `.md` URL returns `text/markdown` with correctly filtered content; Copy button copies plaintext to clipboard (extend `tests/browser/cdocs-filters.spec.ts` or a new spec).
- Run scoped suites while developing (`npm run test:headless-ai -- <path>`, `npm run test:browser-ai -- <file>`); full `npm run test-ai` once before done. Vale only if any `.md`/`.mdoc` content changes (none expected).

### Risks / open questions

1. **Route precedence** of `[...slug].md.ts` vs `[...slug].astro` — verify empirically; fallback noted above.
2. **`entry.body` availability** — assumes the content collection exposes the raw `.mdoc` body to the endpoint. Verify; if not, read the source file directly by entry id or use `render()`-adjacent APIs.
3. **Partial resolution** is the fiddliest piece (alias + config.partials); eager-loading the small partials dir de-risks it for the POC.
4. **Config duplication** — a second Markdoc config (plaintext) duplicates tag/function declarations from `markdoc.config.mjs`. Acceptable for a POC; note as tech-debt to consolidate later.