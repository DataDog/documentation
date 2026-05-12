# Card Grid Shortcode Design

Replace ~100 one-off Hugo partials that render link card grids with a single parameterized `card-grid`/`card` shortcode pair.

## Problem

Every link card grid on the docs site is a bespoke partial with hardcoded HTML. Adding or modifying a card grid requires creating a new partial file in `layouts/partials/`. There are ~100 of these, all sharing the same CSS skeleton (`cards-dd` wrapper, Bootstrap row/col, `card h-100` per item, images via `img.html`). A parameterized shortcode lets authors define card grids directly in content files.

## Shortcode Syntax

### Parent: `card-grid`

Wraps one or more `card` child shortcodes in a flex container.

```
{{< card-grid min_width="150px" >}}
  {{< card href="/path/" src="integrations_logos/logo.svg" alt="Logo" >}}
  {{< card href="/path2/" src="integrations_logos/logo2.png" alt="Logo 2" >}}
{{< /card-grid >}}
```

**Parameters:**

| Param | Required | Default | Description |
|---|---|---|---|
| `min_width` | No | `150px` | Minimum card width before wrapping to fewer columns |

### Child: `card`

Renders a single card inside a `card-grid`.

```
{{< card href="/path/" src="integrations_logos/logo.svg" alt="Logo" img_width="200" >}}
```

Text-only card (no image):

```
{{< card href="/path/" title="Containers" subtitle="(Preview)" >}}
```

**Parameters:**

| Param | Required | Default | Description |
|---|---|---|---|
| `href` | Yes | — | Link target |
| `src` | No | — | Image path (omit for text-only cards) |
| `alt` | No | — | Image alt text (required when `src` is set) |
| `title` | No | — | Text label below the image, or primary content for text-only cards |
| `subtitle` | No | — | Secondary text below the title |
| `img_width` | No | `150` | Max display width for the image in pixels |

## HTML Output

### Image card

```html
<div class="card-grid" style="--card-min-width: 150px;">
  <a class="card-grid-card h-100" href="/path/">
    <div class="card-body text-center py-2 px-1 d-flex align-items-center justify-content-center">
      <!-- rendered by img.html partial -->
      <img src="...logo.svg" alt="Logo" class="img-fluid" style="max-width: 150px;" />
    </div>
  </a>
</div>
```

### Text-only card

```html
<a class="card-grid-card h-100" href="/path/">
  <div class="card-body text-center d-flex align-items-center justify-content-center">
    <div>
      <h5 class="m-0">Jobs</h5>
      <small>(Preview)</small>
    </div>
  </div>
</a>
```

## CSS

Flexbox layout with CSS custom property for the min-width. Cards grow to fill available space on full rows (`flex-grow: 1`), but are capped at a max-width so last-row cards don't stretch disproportionately. The `justify-content: center` centers the last row when it has fewer items.

New styles added to `assets/styles/components/_cards.scss`:

```scss
.card-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 14px;
}

.card-grid-card {
  flex: 1 1 var(--card-min-width, 150px);
  min-width: var(--card-min-width, 150px);
  max-width: calc(var(--card-min-width, 150px) * 1.5);
  text-decoration: none;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:hover {
    border-color: transparent;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.4);
  }
}
```

The `max-width: calc(min-width * 1.5)` prevents cards from growing more than 50% beyond their minimum — this keeps last-row cards from looking oversized while still allowing full rows to fill the container width.

## Template Implementation

### `layouts/shortcodes/card-grid.html`

```go-html-template
{{ $min_width := .Get "min_width" | default "150px" }}
<div class="card-grid" style="--card-min-width: {{ $min_width }};">
  {{ .Inner }}
</div>
```

### `layouts/shortcodes/card.html`

```go-html-template
{{ $href := .Get "href" }}
{{ $src := .Get "src" }}
{{ $alt := .Get "alt" | default "" }}
{{ $title := .Get "title" }}
{{ $subtitle := .Get "subtitle" }}
{{ $img_width := .Get "img_width" | default "150" }}

<a class="card-grid-card h-100" href="{{ $href }}">
  <div class="card-body text-center py-2 px-1 d-flex align-items-center justify-content-center">
    {{ with $src }}
      {{ partial "img.html" (dict "root" $.Page "src" . "class" "img-fluid" "alt" $alt "width" $img_width) }}
    {{ end }}
    {{ with $title }}
      <h5 class="m-0">{{ . }}</h5>
    {{ end }}
    {{ with $subtitle }}
      <small>{{ . }}</small>
    {{ end }}
  </div>
</a>
```

Note: the `img.html` partial's `root` parameter needs the page context for building Imgix URLs. In a shortcode, this is `$.Page`. Verify the exact `img.html` signature during implementation.

## Migration Scope

### In scope (~90 partials)

Hardcoded partials where each card is a static `<a class="card">` block with no conditional logic. These translate 1:1 into shortcode calls. For each page:

1. Extract each card's `href`, `src`, `alt`, and any `width`/`title`/`subtitle` from the partial.
2. Replace the `{{ partial }}` call in the content `.md` file with a `card-grid`/`card` shortcode block.
3. Delete the old partial file.

The ~10 data-driven partials (those using `slice`/`range`) also translate directly — each `dict` entry becomes a `card` shortcode call.

### Deferred (investigate later)

5 partials with conditional logic:
- `continuous_testing/ct-cicd-integrations.html` (3 conditionals)
- `continuous_delivery/cd-getting-started.html` (3 conditionals)
- `code_analysis/sca-getting-started.html` (1 conditional)
- `apm/apm-compatibility.html` (1 conditional)
- `actions/expressions.html` (1 conditional)

These need investigation to determine if the conditions can be expressed differently or if they should stay as partials.

### Out of scope

`platforms/platforms.html` — reads from YAML data files, supports i18n, has a mobile dropdown, groups cards by category. Too different to fit the generic shortcode.

## CSS Migration

The new `.card-grid` / `.card-grid-card` classes are additive. Existing `.cards-dd` styles remain untouched until all old partials are migrated, then can be cleaned up in a follow-up.

## Testing

- Run Hugo dev server and visually compare migrated pages against the current live site.
- Spot-check responsive behavior at different viewport widths (verify column count adjusts fluidly).
- Verify `img.html` partial works correctly from within shortcode context (`$.Page` vs `.`).
- Test text-only cards (no `src`), cards with title + subtitle, and image-only cards.
- Test edge case: single card in a grid (should be centered).
