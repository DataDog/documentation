# Component simplification

## Prompt

The component test pages (src/content/docs/test_pages) are all in .mdoc, but this adds unnecessary complexity to our component architecture and our Markdoc schema, because many components will never actually need to be used in Markdoc. The API docs are not built in Markdoc, they are rendered directly from memory into `.astro` components.

These components must be usable in Markdoc:

- Alert
- Tabs/Tab
- RegionSelector
- CodeBlock
- WhatsNext

These are general-purpose components, so once we're adding more docs beyond the API pages, we will likely need to use them in the `.mdoc` files creating any non-API docs.

Everything else is only used in Astro components to build the API pages.

Make the following changes:

- Use `.astro` files instead of `.mdoc` files for the test pages of any components that do not require `.mdoc` rendering support.
- Remove non-mdoc components from the Markdoc schema.
- Remove any shims that are no longer necessary, such as `ApiSchemaTableMarkdoc.astro`, which is just a type safety shim for Markdoc (which will never be used to render the schema table.)
- Update tests as needed to use the `.astro` pages (if that changes anything about the tests).

## Claude's plan

### Goal

Reduce the Markdoc surface to only the components that will be authored in `.mdoc` files (Alert, Tabs/Tab, RegionSelector, CodeBlock, WhatsNext/NextLink). Everything else becomes pure `.astro` — no Markdoc tag, no schema entry, no `*Markdoc.astro` shim.

### Components staying in Markdoc

| Markdoc tag | Component | Notes |
|---|---|---|
| `fence` (code blocks) | `CodeBlock` | unchanged |
| `alert` | `Alert` | unchanged |
| `tabs` / `tab` | `Tabs` / `Tab` | unchanged; transform stays |
| `regionSelector` | `RegionSelector` | unchanged |
| `whatsNext` / `nextLink` | `WhatsNext` / `NextLink` | unchanged; paragraph-unwrap transform stays |

### Components leaving Markdoc

| Markdoc tag (to remove) | Component | Shim to delete |
|---|---|---|
| `apiMethodBadge` | `ApiMethodBadge` | — (no shim) |
| `schemaTable` | `ApiSchemaTable` | `ApiSchemaTableMarkdoc.astro` |
| `apiResponse` | `ApiResponse` | `ApiResponseMarkdoc.astro` |
| `apiCodeExample` | `ApiCodeExample` | `ApiCodeExampleMarkdoc.astro` |
| `apiEndpoint` | `ApiEndpoint` | — (no shim) |
| `placeholder` | `Placeholder` | — (no shim) |

### Changes by file

**1. `markdoc.config.mjs`**
- Remove `apiMethodBadge`, `schemaTable`, `apiResponse`, `apiCodeExample`, `apiEndpoint`, `placeholder` from the `tags` map.
- Keep `fence`, `alert`, `tabs`, `tab`, `regionSelector`, `whatsNext`, `nextLink`.

**2. `markdoc.schema.mjs`**
- Remove the same six tag entries.

**3. Delete shim files**
- `src/components/ApiSchemaTable/ApiSchemaTableMarkdoc.astro`
- `src/components/ApiResponse/ApiResponseMarkdoc.astro`
- `src/components/ApiCodeExample/ApiCodeExampleMarkdoc.astro`

Before deletion, grep to confirm nothing else imports them. The typed `.astro` component in each folder stays — API pages already use it directly.

**4. Convert `.mdoc` test pages → `.astro` test pages**

Move each of the following from `src/content/docs/test_pages/components/<name>.mdoc` to `src/pages/docs/test_pages/components/<name>.astro` (kebab-case, mirroring the existing `search-bar.astro` convention):

- `announcement-banner`
- `api-code-example`
- `api-endpoint`
- `api-method-badge`
- `api-response`
- `api-schema-table`
- `copy-page-button`
- `footer`
- `header`
- `placeholder`
- `select`

Each converted page wraps the existing prose + examples in the same shell used by `search-bar.astro`:

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
// component imports + example data

export const title = '...';
export const description = '...';
export const type = 'static' | 'interactive';
---

<BaseLayout title={title}>
  <div class="docs-page">
    <nav><a href="/docs/test_pages/">&larr; Test Pages</a></nav>
    <div class="prose">
      <!-- prose + rendered examples using real components -->
    </div>
  </div>
</BaseLayout>

<style>
  /* same .docs-page / h1 / h2 styles as search-bar.astro */
</style>
```

Examples that were `{% tabs %}` / `{% apiMethodBadge ... /%}` blocks in `.mdoc` become real Astro component invocations (`<Tabs>`, `<ApiMethodBadge>`, etc.). The "Markdoc" syntax example tabs are dropped from pages whose components no longer ship as Markdoc tags; they remain on the kept-in-Markdoc pages (alert, tabs, codeblock, region-selector, whats-next).

The `title` / `description` / `type` module exports drive the index page (option B).

Pages **kept as `.mdoc`** (no change):
- `test_pages/components/alert.mdoc`
- `test_pages/components/codeblock.mdoc`
- `test_pages/components/region-selector.mdoc`
- `test_pages/components/tabs.mdoc`
- `test_pages/components/whats-next.mdoc`
- `test_pages/integration/nested-content.mdoc`
- `test_pages/integration/typography.mdoc`

**5. `src/pages/docs/test_pages/index.astro`**

Split the Components table into two sections so the source of each test page is visible from the index:

- **Markdoc components** — `getCollection('docs')` filtered to `test_pages/components/` (the five remaining `.mdoc` pages). Links to `/docs/<entry.id>/`.
- **Astro components** — `import.meta.glob<{ title; description?; type? }>('./components/*.astro', { eager: true })`, sorted by title, linking to `/docs/test_pages/components/<slug>/`.

```ts
const modules = import.meta.glob<{ title: string; description?: string; type?: string }>(
  './components/*.astro',
  { eager: true },
);
const astroComponents = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.match(/\.\/components\/(.+)\.astro$/)![1];
    return { slug, ...mod };
  })
  .sort((a, b) => a.title.localeCompare(b.title));
```

Drop the hardcoded `SearchBar` row — the glob picks it up.

**6. Tests**

Audit and update:
- Any test importing a deleted `*Markdoc.astro` shim — switch to the typed component or delete the test if it was shim-specific.
- Any test asserting Markdoc rendering for a removed tag — delete or rewrite against the typed `.astro` component.
- Existing component tests for the typed components should be unaffected; I'll re-run them once changes are in.
- Playwright baselines for the converted test pages need regeneration (`npx playwright test --update-snapshots`) — the route changes from the `[...slug].astro`-rendered Markdoc layout to a hand-built `.astro` page using the same prose styling, so snapshots will be close but not byte-identical.

Per CLAUDE.md, I won't automatically run tests — I'll remind you what's pending after the implementation.

### Order of operations

1. Convert each `.mdoc` test page to its `.astro` equivalent.
2. Update `index.astro` to the two-section layout.
3. Strip the six tags from `markdoc.config.mjs` and `markdoc.schema.mjs`.
4. Delete the three `*Markdoc.astro` shims.
5. Grep for stray references; update or delete affected tests.
6. `npm run build` to confirm the site still builds.

### Things I'll flag if I hit them

- If any typed `ApiX.astro` component silently depends on Markdoc-transformed children, I'll surface it rather than work around it.
- If a converted test page needs fixture data, I'll source it from `src/mocked-dependencies/api/` — no new fixtures invented.
- I won't touch anything outside `astro/`.

