# Astro Docs

This is the next-generation Datadog documentation site, built with Astro 7, Markdoc, and Preact.

## Prerequisites

- Node.js >= 22.12 (see [`.nvmrc`](.nvmrc); `nvm use` picks it up)
- Yarn 4 via Corepack (pinned by the `packageManager` field). Enable it once with `corepack enable`.

## Getting started

```bash
cd astro
yarn install
yarn dev
```

The dev server starts at **http://localhost:4321**.

## Running alongside the Hugo site (Caddy proxy)

The Astro site only serves API docs. To browse it inside the full Hugo site (header, footer, non-API pages), run both behind the Caddy proxy at [Caddyfile](../Caddyfile). The proxy listens on **http://localhost:1314** and routes `/api/*` (and Vite's dev paths) to Astro, everything else to Hugo.

In three terminals, from the repo root:

```bash
make start-proxied        # Hugo on :1313, baseURL set to :1314
```

```bash
cd astro && yarn dev:proxied   # Astro on :4321, HMR through :1314
```

```bash
caddy run                 # Proxy on :1314
```

Then visit **http://localhost:1314**. `yarn dev:proxied` differs from `yarn dev` only in that it points Vite's HMR client and asset origin at the proxy port so hot reload works through Caddy.

## Component documentation

Each component has a dedicated page showing its properties and visual permutations. After running `yarn build`, browse the index at [http://localhost:4322/docs/test_pages/](http://localhost:4322/docs/test_pages/) (via `yarn preview`). The pages are also reachable under `yarn dev`, but client-side hydration only behaves correctly in a production build.

## Other commands

| Command            | Description                          |
|--------------------|--------------------------------------|
| `yarn build`       | Production build to `dist/`          |
| `yarn preview`     | Preview the production build locally |
| `yarn test`        | Run unit tests (Vitest)              |
| `yarn test:browser` | Run browser tests (Playwright)      |

## Testing

### Unit tests (Vitest)

Fast, runs in Node with happy-dom. No dev server required.

```bash
yarn test
```

### Browser tests (Playwright)

Runs against a dev server. Playwright starts one automatically via the config's `webServer`; if you already have `yarn dev` on port 4321, it reuses it.

```bash
yarn test:browser
```

Useful flags (pass them after `--`):

| Flag | Purpose |
|------|---------|
| `-- tabs.spec.ts` | Run a single spec file |
| `-- --ui` | Interactive UI mode — time-travel, re-run individual tests, inspect DOM |
| `-- --headed` | Watch tests run in a real Chromium window |
| `-- --debug` | Step through with the Playwright Inspector |
| `-- --update-snapshots` | Regenerate screenshot baselines after an intentional visual change |

After a failed run, open the HTML report for side-by-side diffs of expected vs. actual PNGs:

```bash
yarn playwright show-report
```

Screenshot baselines are captured at 2x retina (1440×900 viewport, `deviceScaleFactor: 2`, `scale: 'device'`) and currently live under `tests/browser/*-snapshots/` with a `-chromium-darwin.png` suffix. They need to be regenerated on the CI platform once CI is wired up; Playwright's per-platform suffix lets Mac and CI baselines coexist.

## How API docs are rendered from YAML

The API reference pages are generated at build time from the v1 and v2 OpenAPI specs — parsed, ref-resolved, built into view shapes, overlaid with translations, and rendered to static pages (plus a plaintext `.md` / `llms.txt` variant). For the full stage-by-stage walkthrough, see [docs/api/reference/pipeline.md](docs/api/reference/pipeline.md).

## How filterable docs (Cdocs) work

"Cdocs" are docs whose content is filtered by reader-selected traits (for example: programming language, API type). In Hugo these are `.mdoc.md` files compiled ahead of time by `cdocs-hugo-integration`. In Astro they are rendered **on demand (SSR)**: the reader's filter selections resolve per request, and non-matching content is dropped server-side by vanilla Markdoc `if` tags before the HTML is sent — so the response contains only the content that applies.

### Request lifecycle

1. **Route (SSR).** All cdocs are served by one on-demand catch-all page, [src/pages/[...slug].astro](src/pages/%5B...slug%5D.astro) (`export const prerender = false`). It looks up the URL path in the `docs` content collection and renders it only if the entry is a cdoc (has `content_filters`); anything else 404s. Being the lowest-priority route, it never shadows more specific ones (`/docs/…`, `/[...lang]/api/…`). Adding a cdoc is therefore just dropping a `.mdoc` into the collection — no new page file. The proof-of-concept fixtures are `/dd_e2e/cdocs/custom_instrumentation/` (under `/dd_e2e/`, mirroring Hugo's e2e fixtures, so it can't collide with a real docs URL) and `/opentelemetry/instrument/dd_sdks/api_support/`. Filter values are read from the URL query string and the persisted cookie.
2. **Resolve filters.** [src/lib/cdocs/resolveCdocRender.ts](src/lib/cdocs/resolveCdocRender.ts) is the single shared per-request resolver (used by both the HTML route and the `.md` route below). It wraps [src/lib/cdocs/filters.ts](src/lib/cdocs/filters.ts), which in turn wraps the real [`cdocs-data`](package.json) package (the same package Hugo uses via `cdocs-hugo-integration`): `loadCustomizationConfig` → `buildFiltersManifest` → `resolveFilters`, owning the precedence **URL param > cookie > option-group default** (skipping invalid candidates). It returns UI-ready filters plus the active value per trait.
3. **Persist.** The resolved values are written back to the `cdocs_prefs` cookie by [src/lib/cdocs/cookiePrefs.ts](src/lib/cdocs/cookiePrefs.ts) (trait-keyed JSON, oldest entry evicted past a cap — the SSR analog of Hugo's client-side storage), so a selection survives navigation to other cdocs.
4. **Render + drop.** The resolved values are passed to `<Content {...valsByTraitId} />` as Markdoc variables (`$prog_lang`, `$api_type`, …). Because `@astrojs/markdoc` re-transforms per request, the built-in `if` tags evaluate against these variables and drop the branches that don't match.
5. **Filter UI.** [src/components/CdocsFilterBar/CdocsFilterBar.tsx](src/components/CdocsFilterBar/CdocsFilterBar.tsx) is a Preact island rendering a labeled radiogroup of "pills" per filter (selected pill in Datadog purple, mirroring the Hugo customization menu). Selecting one updates the URL param and does a client-side view-transition navigation (`<ClientRouter />`), swapping in freshly server-rendered content without a full reload.

### Plaintext rendering (`.md`)

Every cdoc has a plaintext twin at the same path with a `.md` extension (for example `/dd_e2e/cdocs/custom_instrumentation.md?prog_lang=python`), returning `text/markdown`. Like the API docs' `.md` pages, this is what the **Copy page** button copies and what LLM/agent consumers can fetch. It is served by a second catch-all, the endpoint [src/pages/[...slug].md.ts](src/pages/%5B...slug%5D.md.ts) (a literal `.md` segment makes it win over the HTML catch-all; the same-named slug 404s if it isn't a cdoc).

Unlike the API docs — which hand-build a Markdoc AST per component — a cdoc is *already* Markdoc, so we render it directly. The pipeline (all under [src/lib/cdocs/plaintext/](src/lib/cdocs/plaintext/)) is:

1. **Resolve filters.** The endpoint calls the same `resolveCdocRender` as the HTML route, so the `.md` reflects the identical filter state (URL param > cookie > default).
2. **Parse → filter → format** ([renderCdocPlaintext.ts](src/lib/cdocs/plaintext/renderCdocPlaintext.ts)). Parse the raw `.mdoc` body, then walk the AST ([filterMarkdocAst.ts](src/lib/cdocs/plaintext/filterMarkdocAst.ts)): evaluate each `{% if %}`/`{% else /%}` against the resolved variables and keep only the matching branch (the same server-side dropping the HTML page does, via `Function.resolve` with the built-in functions plus `includes` — see [plaintextConfig.ts](src/lib/cdocs/plaintext/plaintextConfig.ts)); inline `{% partial /%}` includes ([loadPartial.ts](src/lib/cdocs/plaintext/loadPartial.ts) reads them from `@partials`); rewrite internal doc links to their `.md` twin ([rewriteDocLink.ts](src/lib/cdocs/plaintext/rewriteDocLink.ts), so following a link in plaintext stays in plaintext — external, asset, and anchor links are left alone); strip explicit heading IDs (both the `{% #id %}` tag form Markdoc lifts into a heading's `id` attribute and the `{#id}` text form that survives as literal text — anchors for in-page links in HTML, clutter in plaintext); strip HTML comments (including multi-line ones, which Markdoc tokenizes across `softbreak`-separated text nodes); drop orphaned link reference definitions (`[id]: url` lines that survive as literal text once filtering removes their usages — genuinely-used references are inlined by markdown-it at parse time). Then `Markdoc.format()` serializes the pruned AST back to text.
3. **Title.** The frontmatter title is prepended as an H1.

Because the input is Markdoc, `format()` round-trips custom tags (`{% alert %}`, tabs, fences with `{% filename %}`) and standard nodes (tables, links, lists) in the shape [`html-to-mdoc`](../../corp-node-packages/packages/html-to-mdoc) produces for the Hugo site — so **no per-component plaintext code is needed**. A component would only need bespoke plaintext handling if its desired text differed from `format()`'s default serialization (for example an interactive-only widget like `regionSelector`); none of the current fixtures do.

The pure functions (`renderCdocPlaintext`, the AST filter) take an injected partial resolver, so they unit-test without disk access; the endpoint supplies a disk-backed resolver. The **Copy page** button loader ([pageTextLoader.ts](src/components/CopyPageButton/pageTextLoader.ts)) appends the current query string to the `.md` URL, so it copies the plaintext for the selected filters (the fetch omits credentials, so the cookie can't carry the selection — the query string must).

### Supporting pieces

- **Customization config** ([src/cdocs/customization_config/en/](src/cdocs/customization_config/en/)) — the traits, options, and option groups (with defaults), in per-language subdirectories, mirroring Hugo's top-level `customization_config/`.
- **Frontmatter schema** ([src/content.config.ts](src/content.config.ts)) — the `content_filters` array on the `docs` collection declares which traits a cdoc filters on.
- **Partials** ([src/cdocs/partials/en/](src/cdocs/partials/en/)) — reusable `.mdoc` fragments referenced via the `@partials` alias (see [astro.config.mjs](astro.config.mjs)). They live outside `src/content/` because Astro's glob loader would otherwise pick them up as pages.
- **Custom Markdoc function** ([markdoc.config.mjs](markdoc.config.mjs)) — adds `includes($trait, [...])` on top of Markdoc's built-ins, for list-membership conditionals.
- **Component-facing types** ([src/lib/cdocs/types.ts](src/lib/cdocs/types.ts)) — the trimmed `ResolvedFilter` shape the filter UI consumes.

### Notes / current limitations

- **Adapter.** On-demand rendering runs under `npm run dev` without an adapter. A production `astro build` needs a server adapter (deferred pending an Astro upgrade), so `npm run build` / `npm run preview` do not yet serve cdocs.
- **`cdocs-data` install.** The package is installed from an S3 tarball declared in [package.json](package.json) (same mechanism as `cdocs-hugo-integration`). Its bare name collides with a security-holding public-npm squat, so the supply-chain firewall flags it; scoping the internal package (e.g. `@datadog/cdocs-data`) is the durable fix.

## Auditing guidelines

To manually audit the Astro API docs against the Hugo API docs, you don't need to review every category page — a representative set covers every rendering path. For the page inventory, the minimum audit set, and the per-endpoint checklist, see [docs/api/reference/audit_cases.md](docs/api/reference/audit_cases.md).

## Claude Code commands

This project includes a custom Claude Code slash command for code review.

### `/staged-code-review`

Reviews staged changes using the relevant checklists. To run it, open Claude Code in the `astro/` directory and type `/staged-code-review`.
