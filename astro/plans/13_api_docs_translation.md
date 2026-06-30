# API docs translation

## Prompt

The Hugo API docs are translated. We want to achieve the same thing in Astro, using a similar approach (unless anything about the Hugo implementation is a bad practice).

Similar to how it appears in the Hugo docs, we should have a language dropdown next to the Datadog site dropdown. When the user selects a language other than English, the translated content should appear.

## Research: The API docs translation mechanism in Hugo

### Two-layer translation: spec stays English, JSON overlays carry translations

The OpenAPI specs at [data/api/v1/full_spec.yaml](../../data/api/v1/full_spec.yaml) and [data/api/v2/full_spec.yaml](../../data/api/v2/full_spec.yaml) are English-only and never duplicated per language. Translations live in sibling JSON files:

- `data/api/v{1,2}/translate_tags.{fr,ja,ko,es}.json` — localized tag (category) names and descriptions, keyed by tag slug (e.g., `"dashboards"`).
- `data/api/v{1,2}/translate_actions.{fr,ja,ko,es}.json` — localized operation summaries, descriptions, and parameter/response field labels, keyed by operation ID (e.g., `"ListAPIKeys"`).

**Translated**: tag names/descriptions, endpoint summaries and descriptions, parameter and response field descriptions, error message descriptions, static UI chrome (via `i18n/*.json`).

**Not translated**: HTTP paths, schema field names, enum values, code samples (curl/Python/Go/etc.).

The English title frontmatter in `content/{fr,es,ja,ko}/api/latest/{section}/_index.md` is minimal — actual endpoint docs are generated at render time from the spec + JSON overlay.

### Routing uses Hugo's built-in i18n

Languages are declared in [config/_default/languages.yaml](../../config/_default/languages.yaml) (en, fr, ja, ko, es). Content mounts in [config/_default/config.yaml:120-173](../../config/_default/config.yaml#L120-L173) map `content/{lang}/` → `content/` per language. With `defaultContentLanguageInSubdir: false` ([config/_default/config.yaml:28](../../config/_default/config.yaml#L28)), English is canonical at `/api/latest/...` and other languages prefix with `/{lang}/api/latest/...`.

`hreflang` tags are emitted from [layouts/partials/hreflang.html:20-40](../../layouts/partials/hreflang.html#L20-L40); pages flagged `placeholder: true` canonicalize to English via [layouts/partials/canonical.html](../../layouts/partials/canonical.html), allowing partial translation coverage.

### Language dropdown UI

The dropdown lives in [layouts/partials/language-region-select.html](../../layouts/partials/language-region-select.html) and is included in the API toolbar at [layouts/partials/api/api-toolbar.html:6](../../layouts/partials/api/api-toolbar.html#L6). Selecting a language is a full page navigation to the prefixed URL.

Async page loads complicate this: [assets/scripts/components/async-loading.js:231-244](../../assets/scripts/components/async-loading.js#L231-L244) rewrites the dropdown's `href`s after navigation by stripping/re-adding the language prefix on the current pathname. This is brittle string manipulation that we should not replicate.

### Render-time merging

[layouts/api/list.html:44-53](../../layouts/api/list.html#L44-L53) is the load point: when `$.Page.Lang != "en"` and the matching `translate_tags.{lang}.json` / `translate_actions.{lang}.json` exists, the file is loaded into `Scratch`. Partials like [layouts/api/intro.html](../../layouts/api/intro.html), [layouts/api/arguments.html](../../layouts/api/arguments.html), [layouts/api/response.html](../../layouts/api/response.html), `request-body.html`, `permissions.html`, and `code-example.html` then read the translated value and fall back to the English spec via Hugo's `| default` filter (e.g., `$translate_action.description | default $endpoint.action.description`).

Static UI labels ("Arguments", "Response", etc.) come from [i18n/*.json](../../i18n/) via Hugo's `i18n` function — separate surface from the API description translations.

### Translation pipeline (the gap)

Prose translations under `content/{lang}/...` are managed by an external translator workflow (per repo CLAUDE.md). API translation JSON files have **no visible pipeline**: no Makefile target, no script under `local/bin/py/build/`, no validation tying them to a spec version. They appear to be hand-maintained or updated by an undocumented process. There is no build-time check that a translated key exists for every spec field, so missing translations silently render as English.

### Things not to replicate in Astro

1. **Client-side dropdown URL rewriting** — use Astro's i18n routing instead of post-hoc pathname manipulation.

## Claude's plan

### Goal

Reach URL and behavioral parity with Hugo: English at `/api/latest/...`, other languages at `/{lang}/api/latest/...`, with a language dropdown in the header. Reuse the existing `translate_tags.{lang}.json` and `translate_actions.{lang}.json` overlay format so the same translation files can feed both sites during the cutover.

### Decisions

- **Locales**: match Hugo exactly — `en`, `fr`, `ja`, `ko`, `es`. The `pt` entry in [astro/src/lib/languageNames.ts](../src/lib/languageNames.ts) is scaffolding and stays disabled until Hugo also supports it.
- **Locale enablement**: a locale is only registered if its `translate_*.{lang}.json` overlay files exist. Whole-locale absence is a build-time configuration error.
- **Missing keys within a locale**: silently fall back to English. The translation JSON files are owned by another team — gaps in coverage are their responsibility, not something this site warns or fails on.

### Step 1 — Configure Astro i18n routing

In [astro/astro.config.mjs](../astro.config.mjs), add:

```js
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'fr', 'ja', 'ko', 'es'],
  routing: { prefixDefaultLocale: false },
}
```

This matches Hugo's `defaultContentLanguageInSubdir: false` — English stays at `/api/latest/...`, other locales prefix with `/{lang}/`. Astro's built-in routing handles the prefix; no client-side pathname rewriting.

### Step 2 — Restructure the API routes under `[lang]`

Move the API pages so the language is part of the path:

- `astro/src/pages/api/latest/index.astro` → `astro/src/pages/[...lang]/api/latest/index.astro`
- `astro/src/pages/api/latest/[category].astro` → `astro/src/pages/[...lang]/api/latest/[category].astro`
- Same for `rate-limits.astro`, `scopes.astro`, `using-the-api.astro`, `[category].md.ts`.

Use a rest param (`[...lang]`) so the English variant matches an empty segment (canonical `/api/latest/...`) and localized variants match `/fr`, `/ja`, etc. `getStaticPaths` returns one entry per `(lang, category)` pair. Validate `lang` against the configured locales and 404 on anything else.

A small helper — `astro/src/lib/locale.ts` — should export `LOCALES`, `DEFAULT_LOCALE`, `localePrefix(lang)` (returns `''` for en, `/{lang}` otherwise), and `localizedHref(lang, path)` for use in nav and the dropdown.

### Step 3 — Make the data loader language-aware

[astro/src/data/api/index.ts:108](../src/data/api/index.ts#L108) currently exposes `getApiCategories()` with a module-level cache. Change to:

```ts
export function getApiCategories(lang: LangCode = 'en'): ApiCategory[]
export function getCategoryBySlug(slug: string, lang: LangCode = 'en'): ApiCategory | undefined
```

- Cache becomes `Map<LangCode, ApiCategory[]>`.
- For `lang !== 'en'`, load the matching `translate_tags.{lang}.json` and `translate_actions.{lang}.json` from `mocked_dependencies/hugo_site/data/api/v{1,2}/` via Vite raw imports (mirroring how `full_spec.yaml` is loaded today at [astro/src/data/api/index.ts:8-10](../src/data/api/index.ts#L8-L10)).
- When merging, look up by tag slug / operation ID and use the translated `name`/`description`/`summary` if present; otherwise keep the English value (silent fallback — see Decisions).
- Apply the same change to `getEndpointsForCategory` so endpoint summaries, parameter descriptions, response descriptions, request bodies, and permissions are all translated by the same lookup.

What stays English by design (matching Hugo): HTTP paths, schema field names, enum values, code samples.

### Step 4 — Thread `lang` through the components

API rendering components ([ApiEndpoint](../src/components/ApiEndpoint/ApiEndpoint.astro), [ApiResponse](../src/components/ApiResponse/ApiResponse.astro), [ApiRequestBodyTabs](../src/components/ApiRequestBodyTabs/ApiRequestBodyTabs.astro), [ApiSchemaTable](../src/components/ApiSchemaTable/ApiSchemaTable.tsx), [ApiCodeExample](../src/components/ApiCodeExample/ApiCodeExample.astro)) are nearly all `.astro` and already render whatever string they're handed. They should not need to know the current locale — the loader hands them already-translated strings. Verify this by spot-checking each component for hardcoded English fragments and replacing with `i18n()` calls if found.

Static UI labels ("Arguments", "Response", "Request", etc.) come from [astro/src/lib/i18n.ts](../src/lib/i18n.ts), which today loads only `websites_modules/i18n/en.yaml`. Extend it to:

- Take a `lang` argument (or read it from a per-request context).
- Load `websites_modules/i18n/{lang}.yaml` if present, fall back to English entry-by-entry.

Pass `Astro.currentLocale` into the layout and any component that calls `i18n()`.

### Step 5 — Move the language dropdown into the header

The Hugo dropdown lives in the API toolbar, next to the site (region) selector. The Astro [LanguageSelector.tsx](../src/components/Footer/LanguageSelector.tsx) component is already shaped for this — it takes `currentLang` + `alternates` props and pre-rendered icon HTML.

- Render a new instance inside [Header.astro](../src/components/Header/Header.astro) next to the existing region selector, mirroring the BEM/CSS-module pattern used by [RegionSelector](../src/components/RegionSelector/RegionSelector.tsx).
- Build the `alternates` list server-side from `LOCALES` and `localizedHref(lang, Astro.url.pathname)` so each link is a real localized URL — no `?lang_pref=` query params and no client-side rewriting.
- Decide whether to keep the footer instance. Default proposal: keep both, since Hugo also has the footer selector; they share the component.

Drop the existing `?lang_pref=` href construction from the footer instance at the same time, since with real localized routes it's no longer needed.

### Step 6 — Tests

- **Unit (vitest)**: add `astro/src/data/api/index.test.ts` covering: English unchanged, `ja` returns translated tag names where keys exist, missing keys fall back silently to English. Use a small fixture overlay rather than the full mocked file.
- **Headless component (vitest + happy-dom)**: extend [LanguageSelector.test.ts](../src/components/Footer/LanguageSelector.test.ts) to cover the header instance (BEM classes, alternate links point to localized URLs, current-locale link points to current path).
- **Browser (Playwright)**: one spec that loads `/ja/api/latest/{category}/`, asserts the localized tag name renders, and asserts the language dropdown highlights `日本語`. Capture a Mac screenshot baseline per locale for one representative endpoint page.
- **Routing**: a Playwright check that `/api/latest/...` is the canonical English URL (no redirect to `/en/...`) and that an unknown locale 404s.

### Step 7 — Validate against Hugo

Side-by-side compare a handful of pages — one per locale, one with deprecated tag, one with sparse translation coverage — between the Hugo-rendered output and the Astro output to confirm the same strings are translated and the same strings stay English. This is mostly a sanity check that the JSON overlay format is being interpreted the same way.

### Out of scope for this plan

- The translation JSON ingestion pipeline (mocked files only).
- Anything about `i18n/*.yaml` for non-API site chrome beyond what API pages use.
- Translation completeness validation — owned by the team that maintains the JSON files.
