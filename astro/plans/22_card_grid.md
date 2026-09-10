# Card-grid component prompt

> **Note**: Claude's plan below refers to this prompt as "the tempdoc".

Migrate the card-grid component from Hugo to Astro. See the Hugo Example section below for a full run-down.

I've built a mock document at `src/content/en/dd_e2e/components/card-grid.mdoc`. We'll test against this document.

## Design

The component should retain all of the properties of the hugo card grid. There is one difference - Hugo calls for the writer to include a unit for width (example `px`). The Astro component should accept a number and always use pixels.

The component should consist of a parent `card-grid` component with a child `image-card` component. Use a hybrid approach to offload functions to controller Preact.

The only JS needed should be for the hover tooltip, which isn't included in all image cards. Keep tooltip logic separate, similar to the `img` lightbox, and don't hydrate tooltips unless required to keep them out of the client bundle.

## Plaintext build (Written by Claude after a separate investigation)

The existing Hugo-to-plaintext converter (`html-to-mdoc`) already implements this component's plaintext twin. Reference: `corp-node-packages/packages/html-to-mdoc/src/elementProcessing/processors/card/cardGrid.ts` and `.../utils/cardGridLink.ts`. The Astro plaintext twin should reproduce this logic exactly, not reinvent it.

**Output shape**: a `card-grid` (with its `image-card` children) collapses to a single flat Markdoc `list` (unordered), one `item` per card, each item containing one `link` node. No nested structure, no image markup — the grid becomes a plain link list. Example, from `mcp_server`'s tooltip grid (Example 3 above):

```md
- [cursor](https://docs.datadoghq.com/mcp_server/setup.md?tab=cursor)
- [claudecode](https://docs.datadoghq.com/mcp_server/setup.md?tab=claudecode)
- [geminicli](https://docs.datadoghq.com/mcp_server/setup.md?tab=geminicli)
```

**Per-card fields kept**: only `href` and display text (plus subtitle) survive into plaintext. `src`, `alt`, `image_width`, and `tooltip` are dropped entirely — none of them affect the plaintext output. This means the Astro plaintext twin only needs `href`, `title`, and `subtitle` as inputs; it can ignore image and tooltip props completely.

**Href resolution** (`cardGridLink.ts:15-17`, `buildCardGridHref`): relative hrefs (e.g. `/mcp_server/setup/`) are resolved against the base site URL, then normalized to end in `.md` (query strings and fragments survive that normalization unchanged).

**Display text priority** (`cardGridLink.ts:93-115`, `buildCardGridDisplayText`) — in order:
1. The card's title (`<h5>` or `<p class="card-grid-card-title">`), if present.
2. Else, the href's `tab` query param, if present (`cardGridLink.ts:35-37`) — this is the "same page, different tab" case: cards that all link to the same path but different `?tab=` values would otherwise collapse to identical text, so the tab value substitutes for a title.
3. Else, the final non-empty path segment of the href (e.g. `/database_monitoring/setup_postgres/rds/` → `rds`).

If a subtitle (`<small>`) is present, it's appended as `" - <subtitle>"` regardless of which branch produced the base text.

**Escaping**: link text escapes `[` and `]` (`escapeLinkText`); link URLs escape `(` and `)` as `%28`/`%29` (`escapeLinkUrl`) — needed because Markdoc's `[text](url)` link syntax breaks on unescaped brackets/parens.

**Needed logic for the Astro port**: the plaintext twin (`Img`'s `plaintext/` folder is the precedent — see `src/components/Img/plaintext/Img.ts`) should implement the same three-tier display-text fallback (title → tab param → final path segment) and the same subtitle-append and escaping rules, operating on the component's resolved props rather than raw HTML. Since Astro's `card-grid` takes a numeric `card_width` (unitless, per the Design section above) rather than Hugo's string-with-unit, the plaintext twin doesn't need to touch `card_width`/`image_width` at all — those only affect grid layout, not plaintext output.

## Hugo example

### Templates

- Container: hugo/layouts/shortcodes/card-grid.html:1-5
- Card (child): hugo/layouts/shortcodes/image-card.html:1-21

```go
{{ $min_width := .Get "card_width" | default "150px" }}
{{ $inner := .Inner }}
<div class="card-grid" style="--card-min-width: {{ $min_width }};">
  {{ $inner }}
</div>
```

image-card (used inside card-grid) supports params: `href`, `src`, `alt`, `title`, `subtitle`, `image_width` (falls back to the parent's `image_width`), tooltip.

### Example 1 — image-only cards (with image_width)

Disk: `hugo/content/en/client_sdks/_index.md:22-33`
URL: `https://docs.datadoghq.com/client_sdks/`

```go
{{< card-grid image_width="200" >}}
  {{< image-card href="/client_sdks/setup/?platform=browser" src="integrations_logos/javascript_large.svg" alt="browser" >}}
  {{< image-card href="/client_sdks/setup/?platform=android" src="integrations_logos/android_large.svg" alt="android" >}}
  ...
{{< /card-grid >}}
```

Rendered HTML (one card, unprettified):
```html
<div class=card-grid style=--card-min-width:150px><a class=card-grid-card href="https://docs.datadoghq.com/client_sdks/setup/?platform=browser"><div class="card-body text-center py-2 px-1 d-flex flex-column align-items-center justify-content-center"><picture class=img-fluid><source srcset="https://docs.dd-static.net/images/integrations_logos/javascript_large.svg?fit=max&auto=format&w=807 1x, https://docs.dd-static.net/images/integrations_logos/javascript_large.svg?fit=max&auto=format&w=807&dpr=2 2x" media="(min-width: 1200px)">...<img width=200 height class=img-fluid srcset="https://docs.dd-static.net/images/integrations_logos/javascript_large.svg?fit=max&auto=format&w=807" loading=lazy alt=browser></picture></div></a>...</div>
```

(Full image markup uses the img.html partial, generating a <picture> with responsive srcset breakpoints.)

### Example 2 — title/subtitle cards, no images (with card_width)

Disk: `hugo/content/en/serverless/google_cloud_run/_index.md:32-37`
URL: `https://docs.datadoghq.com/serverless/google_cloud_run/`

```go
{{< card-grid card_width="350px" >}}
  {{< image-card href="/serverless/google_cloud_run/containers" title="Containers" >}}
  {{< image-card href="/serverless/google_cloud_run/jobs" title="Jobs" subtitle="(Preview)" >}}
  {{< image-card href="/serverless/google_cloud_run/functions" title="Functions" >}}
  {{< image-card href="/serverless/google_cloud_run/functions_1st_gen" title="Functions" subtitle="(1st generation)" >}}
{{< /card-grid >}}
```

Rendered HTML:
```html
<div class=card-grid style=--card-min-width:350px><a class="card-grid-card has-title" href=https://docs.datadoghq.com/serverless/google_cloud_run/containers><div class="card-body text-center py-2 px-1 d-flex flex-column align-items-center justify-content-center"><h5 class=m-0>Containers</h5></div></a><a class="card-grid-card has-title" href=https://docs.datadoghq.com/serverless/google_cloud_run/jobs><div class="card-body text-center py-2 px-1 d-flex flex-column align-items-center justify-content-center"><h5 class=m-0>Jobs</h5><small>(Preview)</small></div></a>...</div>
```

Note: when `title` is set without an image, it renders as `<h5>`; when both `src` and `title` are set, `title` renders as `<p class="card-grid-card-title">` instead (`image-card.html:15`).

### Example 3 — image cards with hover tooltips

Disk: `hugo/content/en/mcp_server/_index.md:46-62`
URL: `https://docs.datadoghq.com/mcp_server/`

```go
{{< card-grid card_width="100px" >}}
  {{< image-card href="/mcp_server/setup/?tab=cursor" src="integrations_logos/cursor_avatar.svg" alt="Cursor" tooltip="Cursor" >}}
  {{< image-card href="/mcp_server/setup/?tab=claudecode" src="integrations_logos/claude-code_avatar.svg" alt="Claude Code" tooltip="Claude Code" >}}
  {{< image-card href="/mcp_server/setup/?tab=geminicli" src="integrations_logos/google-gemini_avatar.svg" alt="Gemini CLI" tooltip="Gemini CLI" >}}
  ...
{{< /card-grid >}}
```

Rendered HTML (one card, unprettified):
```html
<div class=card-grid style=--card-min-width:100px><a class=card-grid-card href="https://docs.datadoghq.com/mcp_server/setup/?tab=cursor" title=Cursor data-bs-toggle=tooltip data-bs-placement=top><div class="card-body text-center py-2 px-1 d-flex flex-column align-items-center justify-content-center"><picture class=img-fluid><source srcset="https://docs.dd-static.net/images/integrations_logos/cursor_avatar.svg?fit=max&auto=format&w=807 1x, ..." media="(min-width: 1200px)">...<img width=150 height class=img-fluid srcset="..." loading=lazy alt=Cursor></picture></div></a>...</div>
```

Note: `tooltip` only adds `title="{{ . }}" data-bs-toggle="tooltip" data-bs-placement="top"` to the card's anchor (`image-card.html:9`) — Bootstrap's JS then upgrades the native `title` attribute into a styled hover tooltip on `mouseenter`/`focus`. There's no dedicated tooltip markup in the shortcode itself; all of the rendering and positioning is handled by Bootstrap's tooltip plugin at runtime. This is the one param that requires JS in the Astro port, since a plain `title` attribute alone would only get the browser's native (unstyled) tooltip.

Other examples found (71 files total use card-grid): hugo/content/en/database_monitoring/_index.md (multiple grids, one per DB flavor — image + title combos), hugo/content/en/feature_flags/server/_index.md, hugo/content/en/security/code_security/software_composition_analysis/_index.md, hugo/content/en/tracing/trace_collection/dd_libraries/_index.md, hugo/content/en/source_code/service-mapping/_index.md, hugo/content/en/dd_e2e/card_grid.md.

## Claude / Superpowers plan

Migrate the `card-grid` component (and its `image-card` child) from Hugo to Astro.

The source notes for this migration — Hugo templates, live rendered HTML for three real examples, and how the current plaintext build handles card grids — are in [the tempdoc](./tempdocs/card-grid.md). Read that first for background; this plan assumes it.

There are three existing implementations to draw on, and they disagree in useful ways:

- **Hugo** (`hugo/layouts/shortcodes/card-grid.html`, `image-card.html`) — the production shortcodes. Uses `.Parent.Get` for `image_width` inheritance and Bootstrap for tooltips.
- **cdocs** (`corp-node-packages/packages/cdocs-hugo-integration/src/markdocCustomization/tags/{cardGrid,imageCard}.tsx`) — the closest precedent, because it is already a Markdoc tag pair with a parent/child relationship and a validation suite. Its test fixture is the same document as our mock.
- **html-to-mdoc** (`corp-node-packages/packages/html-to-mdoc/src/elementProcessing/processors/card/cardGrid.ts`) — the current plaintext build. Source of truth for what a card grid should look like as plain text.

We test against the mock document at `src/content/en/dd_e2e/components/card-grid.mdoc`, which is a copy of the cdocs fixture and exercises all seven parameter combinations.

### Confirmed decisions

- **Plaintext output**: a plain Markdown link list, byte-compatible with what `html-to-mdoc` produces today — *not* a `{% card-grid %}` tag. The grid carries no semantic value once images are stripped, and parity means the Hugo→Astro cutover produces no diff in the already-published `.md` twins.
- **Tooltip hydration**: one grid-level Preact island, mounted only when at least one child has a tooltip — not one island per card. Real grids are large (15 cards on `mcp_server`), and "only one tooltip visible at a time" is free with shared state.
- **Images**: card images do **not** route through the `Img` component. Only the CDN URL/srcset construction is shared, extracted to a helper.
- **Widths are unitless numbers** (`card_width="225"`, not `"225px"`), diverging from Hugo. Matches cdocs, which already made this change.

### Core idea

The parent tag's `transform()` in `markdoc.config.mjs` does the coordination work that Hugo does with `.Parent.Get` and cdocs does by mutating children before rendering: it merges inherited `image_width` down into each child, assigns stable ids, and collects which cards need tooltips. `CardGrid.astro` then renders a plain wrapper and conditionally mounts a single island; `ImageCard.astro` renders static markup per card.

This follows the `stepper`/`step` pattern (`markdoc.config.mjs:109-161`), which is the only existing parent/child pair whose children are themselves registered components.

Two constraints from that existing code, documented at `markdoc.config.mjs:44-53`, both apply here:

1. **Do not have the parent render its slot and scrape the HTML.** `Astro.slots.render()` + HTML extraction silently drops the hydration-script prefix Astro emits on the first island, breaking `<astro-island>` registration in production builds.
2. **`@astrojs/markdoc` only resolves component imports for tags that literally appear in the `.mdoc` AST.** `image-card` does appear, so unlike `tab` it gets a real `render` entry and the transform re-emits it via `config.tags["image-card"].render`.

### 1. Schema (`markdoc.schema.mjs`)

```js
"card-grid": {
  card_width:  { type: Number, default: 150 },
  image_width: { type: Number },                 // deliberately no default
},
"image-card": {
  selfClosing: true,
  href:        { type: String, required: true },
  src:         { type: String },
  alt:         { type: String, default: "" },
  title:       { type: String },
  subtitle:    { type: String },
  tooltip:     { type: String },
  image_width: { type: Number },                 // deliberately no default
},
```

**The missing defaults are load-bearing.** The transform reads `child.attributes` off the raw AST, which reflects only what the author literally typed. If `image-card.image_width` had a schema default, every child would look like it set the value explicitly and the parent could never win. The `150` default is applied at render time in `ImageCard.astro` instead — the same reasoning as cdocs (`imageCard.tsx:97`). `card_width` is unaffected by inheritance, so it keeps its schema default.

`validate(node)` enforces four errors, following the `img` validator precedent (`markdoc.schema.mjs:105-126`). The first three are ported from cdocs (`cardGrid.tsx:23-35`), each of which has a corresponding cdocs test fixture:

| id | condition |
|---|---|
| `card-grid-empty` | no `image-card` children |
| `card-grid-invalid-child` | a tag child that isn't `image-card` (names the offending tag) |
| `card-grid-text-child` | a non-whitespace text child |
| `image-card-no-content` | a card with neither `src` nor `title` (renders as an empty clickable box) |

Whitespace-only text between tags is skipped, not treated as a child — same as `html-to-mdoc`'s `getCardLink`.

### 2. Transform (`markdoc.config.mjs`)

Modeled on the `stepper` transform:

```js
transform(node, config) {
  const gridRender = config.tags["card-grid"].render;
  const cardRender = config.tags["image-card"].render;
  const attributes = node.transformAttributes(config);
  const gridId = generateElementId("card-grid");
  const parentImageWidth = attributes.image_width;

  const cards = [];
  const tooltipCardIds = [];

  for (const child of node.children) {
    if (child.type !== "tag" || child.tag !== "image-card") continue;
    const cardId = `${gridId}-card-${cards.length}`;
    if (child.attributes.tooltip) tooltipCardIds.push(cardId);
    cards.push(new Markdoc.Tag(cardRender, {
      ...child.attributes,
      id: cardId,
      // Child wins; parent fills in; ImageCard.astro applies the 150 default.
      image_width: child.attributes.image_width ?? parentImageWidth,
    }, child.transformChildren(config)));
  }

  return new Markdoc.Tag(gridRender, {
    ...attributes, id: gridId, tooltipCardIds,
  }, cards);
}
```

### 3. Components

```
src/components/CardGrid/
  CardGrid.astro              parent wrapper + conditional island
  CardGrid.module.css
  ImageCard.astro             one card (vanilla Astro — no interactivity)
  ImageCard.module.css
  CardGridTooltips.tsx        Preact island, one per grid
  CardGridTooltips.module.css
  cardGridTypes.ts            shared cross-boundary types
  plaintext/CardGrid.ts
  plaintext/tests/unit.test.ts
  tests/{CardGrid,ImageCard,CardGridTooltips}.unit.test.ts
  tests/browser.test.ts
```

`CardGrid.astro` renders `<div class={cl("card-grid")} style={`--card-min-width: ${card_width}px`}>` with a `<slot />`, and mounts the island only when `tooltipCardIds.length > 0`:

```astro
{tooltipCardIds.length > 0 && (
  <CardGridTooltips
    client:idle
    externalContext={{ scope: gridId, entries: { cardEls: tooltipCardIds } }}
    tooltips={tooltipLabels}
  />
)}
```

`ImageCard.astro` renders the four branches Hugo does (`image-card.html:9-21`):

- `src` → `<picture><img></picture>` at `image_width ?? 150`
- `title` **with** `src` → `<p class="image-card__title">`
- `title` **without** `src` → `<h5>`
- `subtitle` → `<small class="image-card__subtitle">`
- `title` present → `image-card--has-title` modifier on the anchor

### 4. Images: a shared URL helper, not a shared component

`ImageCard.astro` must **not** render `Img`. `ImgController.tsx:82-99` wraps every non-inline image in a `<figure>` and, by default, a `Lightbox` — an `<a>`. A card is already an `<a>` to another page, so that would nest anchors (invalid HTML) and hijack the navigation click. Passing `inline={true}` to suppress it would be using a flag to mean something it wasn't designed for.

What *is* shared is the CDN URL construction currently inline at `Img.astro:21-24`. Extract it:

```
src/lib/images/buildImageUrl.ts   →  { imageUrl, srcset }
```

Both `Img.astro` and `ImageCard.astro` call it. This is the one genuine cross-boundary contract — the same lesson the `Img` build landed on when it reverted `SizingProps`: extract a shared thing only when it is a real contract, not because fields repeat. A `<picture><img>` wrapper is six lines and stays duplicated.

Refactoring `Img.astro` to use the helper must not move its existing snapshots; the helper returns identical strings.

Note Astro already diverges from Hugo/cdocs here: `Img.astro` emits a single `srcset` capped at 850px, where Hugo and cdocs emit seven `<source>` breakpoints. We keep Astro's simpler form.

### 5. Tooltips

Hugo used Bootstrap's `Tooltip` plugin (`hugo/assets/scripts/components/card-grid.js`). There is no Bootstrap and no tooltip primitive in the Astro site, so this is written from scratch.

The island resolves its card anchors through `loadExternalContext` (the hybrid pattern in CLAUDE.md), renders one bubble element it reuses for every card, and attaches `mouseenter`/`mouseleave`/`focus`/`blur`. Positioned with `getBoundingClientRect()` on show, so there is no layout work while idle. Placement is `top`, centered — matching Bootstrap's default so the port looks unchanged. Escape hides it.

**Accessibility — a deliberate divergence.** Bootstrap moves the `title` attribute into its own markup, leaving the anchor with no accessible name. Instead: `aria-label={tooltip}` on the anchor, and `aria-hidden="true"` on the bubble. Screen readers announce the card from its label; the bubble is decorative. Using `aria-describedby` here would double-announce text identical to the label. **Comment this in the code** so a future reader doesn't "fix" it into a `role="tooltip"` — the same practice the `Img` lightbox used for its focus trap.

**`data-bs-*` attributes are dropped.** They existed only so Bootstrap could find the elements; the island gets its elements from `externalContext`. This is an intentional, documented divergence from both the Hugo and cdocs HTML.

### 6. CSS and tokens

Full BEM per CLAUDE.md, so `classListFactory` works: `card-grid`, and `image-card` / `image-card__body` / `image-card__title` / `image-card__subtitle` / `image-card--has-title`.

**Class names will not match Hugo's.** Hugo uses `.card-grid-card`, `.card-grid-card-title`, and Bootstrap's `.card-body` — none of which are valid BEM. The child block becomes `image-card`, matching its tag name. Hugo's nine Bootstrap utility classes on the card body (`text-center py-2 px-1 d-flex …`) become four real CSS properties.

Translating `hugo/assets/styles/components/_cards.scss:37-84`:

| Hugo | Astro |
|---|---|
| `gap: 1rem`, margins | existing `--space-*` |
| `border: 1px solid #dee2e6` | **new** `--color-border-card` |
| `border-radius: 0.25rem` | existing `--radius-sm` |
| hover `box-shadow: 0 2px 4px 2px rgba(0,0,0,.4)` | **new** `--shadow-card-hover` |
| `h5 + small` → `$ddpurple` | existing `--color-brand` (already `#632ca6`) |
| `.card-grid-card-title` → `#000` | existing `--color-text` |
| `min-height: 100px` / `has-title: 140px` | **new** `--card-grid-card-min-height`, `--card-grid-card-min-height-titled` |
| — | **new** `--color-tooltip-bg`, `--color-tooltip-text` |

Tooltip tokens are named as a general primitive, not `--card-grid-tooltip-*`, since other components will want tooltips. The two card heights are the one place a component-scoped name is right — they are specific to this layout. `--card-min-width` stays an inline style: it is a per-instance author value, not a theme token.

### 7. Plaintext twin

Emits a flat unordered list, one item per card, each a single link — matching `html-to-mdoc` (`cardGrid.ts:63-82`). No images, no nesting.

```md
- [cursor](https://docs.datadoghq.com/mcp_server/setup.md?tab=cursor)
- [claudecode](https://docs.datadoghq.com/mcp_server/setup.md?tab=claudecode)
```

Only `href`, title, and subtitle survive; `src`, `alt`, `image_width`, and `tooltip` are dropped entirely.

Display text, in priority order (from `html-to-mdoc` in the corp-node-packages repo: `packages/html-to-mdoc/src/elementProcessing/processors/utils/cardGridLink.ts`, `buildCardGridDisplayText`):

1. `title`
2. else the href's `tab` query param — the "same path, different tab" case. Without this, every card in the `mcp_server` grid collapses to `setup`, since they share a pathname.
3. else the final non-empty path segment

A `subtitle` appends as `" - <subtitle>"` regardless of branch. Escape `[` and `]` in link text and `(` / `)` as `%28` / `%29` in URLs (`escapeLinkText` / `escapeLinkUrl`) — Markdoc's `[text](url)` syntax breaks otherwise.

### 8. Testing

Test red to green: every test written and confirmed failing before the code that satisfies it.

**Unit** (`yarn test:headless-ai`):

- *Transform* (highest value — inheritance lives here): child inherits parent `image_width`; child overrides parent; neither set falls through to 150; `tooltipCardIds` holds only tooltip-bearing cards; whitespace text nodes skipped.
- *Validation*: one test per error id, including the `image-card` with neither `src` nor `title`.
- *`ImageCard.astro`*: the four rendering branches, asserted via stable BEM classes; `image-card--has-title` applied exactly when `title` is set.
- *`CardGridTooltips.tsx`*: show/hide, one-at-a-time, Escape, `aria-label` present.
- *`buildImageUrl`*: URL and srcset shape.
- *Plaintext twin*: the full fallback chain, subtitle append, and both escaping rules.

**Browser** (`yarn test:browser-ai`) — only what unit tests cannot reach:

- Tooltip appears on hover, disappears on mouseleave.
- Tooltip appears on keyboard focus.
- Clicking a card navigates (proves the tooltip doesn't swallow the click).
- A grid with no tooltips hydrates no island.
- Visual snapshots: basic, titled/subtitled, tooltip open.

Generate snapshots last — they are rebase-fragile, a lesson from the `Img` build.

Run the full `yarn test-ai` once at the end to catch regressions, not during development.

**Reference output.** The cdocs snapshot (`cdocs-hugo-integration/test/__snapshots__/validSite/content/en/tags_and_elements/card_grid/_index.md`) renders the same source document our mock uses. Class names and srcset breakpoints will differ for the reasons in sections 4 and 6, but the *branching* — which title element, which width, which cards get tooltip attributes — should agree case for case. Use it to check semantics, not bytes.

We also need a demo page at `src/pages/dd_e2e/components/card-grid.astro`, following the existing component demo pages.
