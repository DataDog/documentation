# Page layout

## Prompt

We want to prepare to add global site elements — header, footer, and announcement banner — to the Astro site. Sourcing this content is complicated, so for now, we just want to add placeholders for these elements. Left and right TOC/side navs are out of scope.

Eventually, the user will be able to click between Hugo and Astro, and we don't want them to know that they're switching frameworks. So the page layout and elements need to be identical in a way we have not enforced until now, even if it means breaking other rules of our Astro design.

### Placeholder elements

- The placeholders should be obvious placeholders, light purple with a dark purple outline around them (not a border that could mess up their dimensions). In dark purple text that is centered vertically and horizontally, the placeholder's name should appear, such as "HEADER".
- Provide a dark-mode variant. The two purple colors can simply switch places.
- Add placeholders for the announcement banner, header, and footer. Hugo does show an announcement banner on API pages.
- Delete the existing `ApiHeader` component and replace it with the header placeholder. The current header is just a less-obvious placeholder than what we're going to use from now on.
- Each element must be the **exact** height, width, etc. that it is on Hugo. Even though these measurements should not really be tokens, add a section to the design tokens with these dimensions where necessary, so we're aware that we need to deprecate these later. Call the token section "Hugo-identical tokens" in the comments, with a note that these can be deprecated once Hugo is deprecated.
- Include responsive breakpoints if Hugo has them — measure at desktop plus any breakpoints present in the Hugo CSS.

### Layout

- Apply the new layout to `BaseLayout.astro`. `ApiLayout.astro` should inherit/compose from it where sensible, since more page types will be added later.
- Use these placeholdered elements to give Astro a page layout that imitates the Hugo layout, complete with any "sticky" scroll behavior etc. For example, the scroll bar currently shows up flush right with the content area on Astro. It should appear all the way on the right side of the entire page, as it does in Hugo.
- Use your best judgment to determine the Hugo scroll/sticky behavior; the goal is parity, not a specific implementation.

### Measuring Hugo

- The compiled Hugo HTML and CSS live in [public/](../../public/) — for example, [public/api/latest/authentication/index.html](../../public/api/latest/authentication/index.html). Use these files as the source of truth for dimensions and behavior rather than running the Hugo build.

## Claude's plan

### Hugo measurements (source of truth)

From inspecting [public/api/latest/authentication/index.html](../../public/api/latest/authentication/index.html) and its linked CSS:

- **Announcement banner** — `<div class="announcement-banner ...">`, `position: fixed; top: 0; left: 0; right: 0`, `height: 30px`, `z-index: 1080`, full viewport width, no responsive change.
- **Header** — `<div class="main-nav-wrapper"><nav class="main-nav">`, `position: fixed; top: 0`, pushed down 30px by `margin-top` so it sits below the banner, `z-index: 200`, full viewport width, box-shadow `0 0 8px 8px rgba(0,0,0,0.07)`. Height is **60px below 992px** and **130px at ≥992px**.
- **Footer** — `<footer>`, static flow, full width, no fixed height — height is content + padding, with padding changing at 768px and 992px. Placeholder will mirror Hugo's padding rather than a fixed pixel height.
- **Body** — gets `margin-top: 30px` when the banner is present so fixed-position content slides below it. Header's own `margin-top: 30px` stacks below that. Total fixed top space: 90px mobile, 160px desktop.
- **Scrolling** — no inner scroll container. The entire document scrolls on `<html>`/`<body>`, which puts the scrollbar at the far right of the viewport. No `position: sticky` is used on any of these three elements.
- **Key breakpoint** — 992px (header height change). 768px also exists but only affects footer padding.

### Placeholder component

Add a single reusable primitive, `Placeholder.astro` + `Placeholder.module.css`, that renders the light-purple / dark-purple box with a centered label. Three thin wrappers consume it so each placeholder owns its own dimensions, position, and BEM block name.

**Primitive props:**
- `name: string` — the label ("HEADER", "FOOTER", "ANNOUNCEMENT BANNER").
- `class?: string` — escape hatch so wrappers can add their own positioning/sizing class from their own CSS module.

**Styling:**
- `background: var(--color-placeholder-bg)` (light purple), `outline: 2px solid var(--color-placeholder-outline)` (dark purple). Outline, not border, so it doesn't affect box dimensions.
- Centered label in dark purple using flexbox (`display: flex; align-items: center; justify-content: center`).
- Dark mode swaps the two purples.

**New general-purpose tokens in `tokens.css`:**
- `--color-placeholder-bg: #e9d8f4;` (light mode), swapped in `[data-theme='dark']`.
- `--color-placeholder-outline: #632ca6;` (light mode), swapped in dark mode.
- `--color-placeholder-text: var(--color-placeholder-outline);`

These go in the normal token section — they may outlive the placeholders as generic "work-in-progress" styling.

### Hugo-identical tokens

Add a dedicated section at the bottom of `tokens.css`, flagged for eventual deprecation:

```css
/* Hugo-identical tokens — these replicate exact pixel values from the Hugo
   site so users can't tell when they switch frameworks. Deprecate these
   once Hugo itself is deprecated. */
--hugo-banner-height: 30px;
--hugo-header-height: 60px;              /* <992px */
--hugo-header-height-desktop: 130px;     /* ≥992px */
--hugo-breakpoint-desktop: 992px;        /* header height changes here */
--hugo-breakpoint-tablet: 768px;         /* footer padding changes here */
--hugo-footer-padding-y: 1rem;           /* <768px (pt-3 pb-3) */
--hugo-footer-padding-y-tablet: 9rem;    /* ≥768px (pt-md-36 pb-md-36) */
--hugo-footer-padding-y-desktop: 3rem;   /* ≥992px top (pt-lg-5) */
--hugo-footer-padding-bottom-desktop: 4rem; /* ≥992px bottom (pb-lg-16) */
--hugo-header-shadow: 0 0 8px 8px rgba(0, 0, 0, 0.07);
--hugo-header-z: 200;
--hugo-banner-z: 1080;
```

No dark mode overrides — these are structural, not cosmetic.

### Three placeholder wrappers

Each is a small `.astro` file with its own CSS module that positions and sizes a `<Placeholder>` using the Hugo-identical tokens.

- **`AnnouncementBannerPlaceholder.astro`** — `position: fixed; top: 0; left: 0; right: 0; height: var(--hugo-banner-height); z-index: var(--hugo-banner-z);` Label: "ANNOUNCEMENT BANNER".
- **`HeaderPlaceholder.astro`** — `position: fixed; top: 0; left: 0; right: 0; margin-top: var(--hugo-banner-height); height: var(--hugo-header-height); z-index: var(--hugo-header-z); box-shadow: var(--hugo-header-shadow);` Media query at `--hugo-breakpoint-desktop` bumps height to `--hugo-header-height-desktop`. Label: "HEADER".
- **`FooterPlaceholder.astro`** — normal flow, `width: 100%`, content-sized. Wraps a `<Placeholder>` in a container that applies Hugo's top/bottom padding at each breakpoint via the `--hugo-footer-padding-*` tokens. The inner `<Placeholder>` gets a small nominal min-height so the label has room to render. Label: "FOOTER".

BEM class on the root element of each (e.g. `placeholder__header`) for DOM identification, CSS module for rules.

### Layout restructure

**`BaseLayout.astro`** becomes the shared shell — it renders the banner, header, main slot, and footer, plus handles the top-spacer math for fixed elements:

```
<body>
  <AnnouncementBannerPlaceholder />
  <HeaderPlaceholder />
  <div class="base-layout__body">    ← padding-top equal to banner + header; responsive at 992px
    <slot />
  </div>
  <FooterPlaceholder />
  <theme toggles (unchanged)>
</body>
```

No inner scroll container — the whole page scrolls on the document, so the scrollbar lands flush with the viewport edge (matching Hugo).

**`ApiLayout.astro`** stops duplicating the `<html>`/`<head>`/`<body>` shell and instead composes `BaseLayout`:

```
<BaseLayout title={title}>
  <div class="api-shell">
    <ApiSideNav ... />
    <main class="api-main">
      <div class="api-toolbar"> ... </div>
      <slot />
    </main>
  </div>
</BaseLayout>
```

Key changes vs. today:
- Remove `height: calc(100vh - 70px)` and `overflow-y: auto` from `.api-main`. The whole document scrolls now; the side nav stickiness stays handled inside `ApiSideNav` via `position: sticky; top: <banner + header>`.
- Drop `<ApiHeader />` — replaced by the global `HeaderPlaceholder` in `BaseLayout`.
- Keep the `#theme-toggles` panel at `position: fixed; top: 0; right: 0`, but bump its `z-index` above `--hugo-banner-z` (e.g. 2000) so it floats on top of the banner and header. Still hidden unless hovered, so it doesn't obscure the placeholder labels in normal use.

### Remove `ApiHeader`

- Delete `src/components/ApiHeader/ApiHeader.astro` and `ApiHeader.module.css`.
- Delete the folder.
- Remove the import and `<ApiHeader />` usage from `ApiLayout.astro` (covered by the restructure above).
- Grep confirms the only remaining references after those edits will be in plan/README files, which is fine.

### Test page

Per CLAUDE.md's test-page convention, add a component showcase:

- `src/pages/components/placeholder.astro` (or wherever component demo pages live) renders a `<Placeholder>` primitive at a few sizes plus one live instance each of the banner, header, and footer wrappers, with a property table listing `name` and `class`.

### Tests

- **Headless** (Vitest, render-to-string): assert each placeholder renders with the expected label text, BEM class, and outline style.
- **Playwright**: load an API page at 1400px and at 500px, assert:
  - Banner is 30px tall, fixed to top-left edge, spans viewport width.
  - Header is 60px tall at 500px wide and 130px tall at 1400px wide, sits 30px below the top.
  - Document scrollbar is flush to the right edge of the viewport (scroll an overflowing page, assert `document.scrollingElement` scrolls, not an inner container).
  - Footer renders in normal flow below the content.
  - Dark-mode toggle swaps the two purples on each placeholder.

### Implementation order

1. Add new tokens (placeholder colors + Hugo-identical section) to `tokens.css`.
2. Create `Placeholder.astro` primitive + CSS module.
3. Create the three wrappers (`AnnouncementBannerPlaceholder`, `HeaderPlaceholder`, `FooterPlaceholder`).
4. Rewrite `BaseLayout.astro` to render banner + header + slot + footer with correct spacing math. Reposition theme toggles.
5. Rewrite `ApiLayout.astro` to compose from `BaseLayout`, drop its own `<html>`/`<head>`/`<body>` and its inner scroll container.
6. Delete `src/components/ApiHeader/` folder.
7. Add component test page.
8. Add headless tests.
9. Add Playwright tests for dimensions, scroll behavior, and dark-mode swap.
10. Run `npm run dev`, verify in Chrome at 1400px and at a mobile viewport that the layout visually matches the Hugo page at [public/api/latest/authentication/index.html](../../public/api/latest/authentication/index.html).

### Questions / risks

- **Current `--content-max-width: 1440px`** on `.api-shell` constrains the API content column, but Hugo's banner/header/footer all span the full viewport. The layout change already handles this correctly (banner/header/footer fixed full-width outside `.api-shell`), but worth flagging that the 1440px constraint on the inner shell stays.
- **Responsive breakpoint for header** — Hugo switches at 992px; the Astro codebase currently uses 768px in `ApiLayout` (`@media (max-width: 768px)`). Those are independent (768px is a side-nav layout breakpoint, 992px is the Hugo header height breakpoint), but they'll coexist on the same page. Not a conflict, just a heads-up.
- **`<head>` duplication** — `BaseLayout` and `ApiLayout` currently duplicate the font preloads, Google Fonts links, and theme-init script. Composing `ApiLayout` from `BaseLayout` eliminates that duplication as a side benefit.
