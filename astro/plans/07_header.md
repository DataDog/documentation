# Site header and announcement banner

## Prompt

The Hugo site has a site header and announcement banner that it sources from `websites-modules`. These files are written as Go templates, which won't be useful to us in Astro. These Go templates reference data that is also kept in `websites-modules`. For example, `websites-modules/layouts/partials/nav/main-nav.html` references `websites-modules/data/menu_data`.

The `websites-modules` repo is cloned into `~/dd/websites-modules`.

We need to create Astro templates for the site header and announcement banner. The dimensions of everything in this header must match the corresponding Hugo dimensions **exactly**, even if it means breaking some of the rules in [CLAUDE.md](../CLAUDE.md). When you must use exact hard-coded values in order to match Hugo, do still use tokens that are labeled as Hugo-specific tokens, according to the existing convention in [the design tokens file](../src/styles/tokens.css).

We need to create an identical header because the user will be navigating between Hugo and Astro, and we don't want the user to feel as though they're navigating to a different site, even though they are. Behavior must be identical too — hoverable dropdowns, the product mega-menu's category switching, the mobile hamburger and its overlay, the search toggle, the logo-download panel, the scroll-shrink effect on the header, and the announcement banner's geo-targeted webinar swap must all work the way they do in Hugo.

Do not pull in Bootstrap or Alpine.js. Keep the Astro stack clean: port over the style rules and behaviors we need, in tokenized component CSS and Preact islands. Mark any Hugo-specific values (dimensions, colors, shadows, z-indexes) as Hugo-identical tokens in [tokens.css](../src/styles/tokens.css) so they can be deprecated or folded into the theme once Hugo itself is deprecated.

These Astro templates will rely on data that is not yet available to us. Add the contents of `~/dd/websites-modules/data/menu_data` in the [mocked_dependencies](../src/mocked_dependencies/) folder so we can reference the data there for now. Do the same for any other resource we need from `websites-modules` or the Hugo config — for example, the i18n label file, the site-level `announcement_banner` params (currently in [config/_default/params.en.yaml](../../config/_default/params.en.yaml)), the `webinars.yaml` data that powers geo-targeting, and any icon SVGs the nav depends on. Treat `mocked_dependencies` as if it will be kept current: code should read banner content from the mock, not hard-code it, so that swapping the mock for a live source later is a data-layer change only.

Delete the existing `HeaderPlaceholder` and `AnnouncementBannerPlaceholder` components (and their test pages and tests) and replace them with the real components wired into `BaseLayout.astro`. `FooterPlaceholder` stays for now.

For your reference, the Hugo site is live and accessible to you at `localhost:1313`. Its compiled HTML is also available in [Hugo's public folder](../public).

## Claude's plan

### Source files in `websites-modules`

The Hugo header is assembled from these files under `~/dd/websites-modules/` (plus site-level config in this repo). These are the sources of truth for data, markup, and styles:

- **Markup (Go templates)**
  - [layouts/partials/announcement_banner.html](../../../dd/websites-modules/layouts/partials/announcement_banner.html) — banner markup + inline geo-targeting script.
  - [layouts/partials/nav/main-nav.html](../../../dd/websites-modules/layouts/partials/nav/main-nav.html) — desktop nav, Product/Solutions/About/Blog dropdowns, logo, right-side CTAs, hamburger.
  - [layouts/partials/nav/menu-mobile.html](../../../dd/websites-modules/layouts/partials/nav/menu-mobile.html) — router that selects the docs-specific variant for `repo_name == "documentation"`.
  - [layouts/partials/nav/mobile-documentation.html](../../../dd/websites-modules/layouts/partials/nav/mobile-documentation.html) — docs mobile nav (home/docs/api shortcut row, search, API sub-menu, rest of nav tree).
  - [layouts/partials/nav/nav-logo-download.html](../../../dd/websites-modules/layouts/partials/nav/nav-logo-download.html) — hidden "Looking for Datadog logos?" panel that appears on the logo.
- **Data (YAML)**
  - [data/menu_data/menus.yaml](../../../dd/websites-modules/data/menu_data/menus.yaml) — `main_left` and `main_right` menu trees.
  - [data/menu_data/product_categories.yaml](../../../dd/websites-modules/data/menu_data/product_categories.yaml) — mega-menu category groupings, gradients, icons.
  - [data/menu_data/products.yaml](../../../dd/websites-modules/data/menu_data/products.yaml) — per-product `lang_key`/`url`/`icon`.
  - [i18n/en.yaml](../../../dd/websites-modules/i18n/en.yaml) — all nav label translations (Hugo go-i18n format).
- **Styles (SCSS)**
  - [assets/styles/components/_main-nav.scss](../../../dd/websites-modules/assets/styles/components/_main-nav.scss)
  - [assets/styles/components/_mobile-nav.scss](../../../dd/websites-modules/assets/styles/components/_mobile-nav.scss)
  - [assets/styles/components/_announcement-banner.scss](../../../dd/websites-modules/assets/styles/components/_announcement-banner.scss)
- **Site-level params (this repo)**
  - [config/_default/params.en.yaml](../../config/_default/params.en.yaml) — `announcement_banner.desktop_message`, `mobile_message`, `background_color`, `custom_classes`, `external_link`.

### Mocked dependencies to add

Everything the nav/banner depends on gets a snapshot under [astro/src/mocked_dependencies/](../src/mocked_dependencies/). Treat the mock like a live feed — components read from it, they don't inline it.

**Structure convention:** mocked folders mirror the source path so traceability is automatic. Two top-level roots — `websites_modules/` for files sourced from `~/dd/websites-modules/`, and `hugo_site/` for files sourced from this documentation repo. Under each root, the subpath exactly matches the upstream.

```
src/mocked_dependencies/
  websites_modules/                         ← mirrors ~/dd/websites-modules/
    data/menu_data/
      menus.yaml                            ← copied verbatim
      product_categories.yaml               ← copied verbatim
      products.yaml                         ← copied verbatim
    i18n/
      en.yaml                               ← subset covering keys referenced by the nav/banner
    static/icons/
      <icon>.svg …                          ← subset copied verbatim, one per `icon:` value referenced
      README.md                             ← lists which icons are included and any gaps/fallbacks
  hugo_site/                                ← mirrors the documentation repo root
    config/_default/
      params.en.yaml                        ← copied whole (code reads only the `announcement_banner:` block)
    data/
      api/                                  ← MOVED from current src/mocked_dependencies/api/
                                              so the existing API mock fits the new convention
      en/
        webinars.yaml                       ← `{ webinars: [] }` — matches current live behavior,
                                              where Hugo renders `webinarList = null` and the banner
                                              falls back to `site_params` copy. The shape is documented
                                              via the `Webinar` TS type below so future swaps are trivial.
  README.md                                 ← inventory updated to reflect the new two-root layout
```

With this layout, anyone asking "where does this file come from?" strips `mocked_dependencies/<root>/` and prepends either `~/dd/websites-modules/` or the docs-repo root to get the upstream path. No lookup table needed.

The existing `src/mocked_dependencies/api/` folder moves to `src/mocked_dependencies/hugo_site/data/api/` as part of step 1 — it already mirrors `documentation/data/api/` in the docs repo, it was just at the wrong depth. All imports that currently reference `mocked_dependencies/api/...` get updated in the same step.

Loader helpers (colocated under `src/lib/menuData.ts` or similar) parse the YAML at build time and expose typed shapes:

```ts
type MenuItem = { identifier: string; langKey: string; url?: string; children?: MenuItem[]; params?: { disabled?: string[] } }
type ProductCategory = { identifier: string; langKey: string; descriptionKey: string; gradient: [string, string]; icon: string; mobile?: boolean; children?: Subcategory[]; mobileProducts?: string[] }
type Subcategory = { identifier: string; langKey: string; products?: string[]; sections?: { langKey: string; products: string[] }[] }
type Product = { identifier: string; langKey: string; icon?: string; url: string }
type BannerParams = { desktopMessage: string; mobileMessage: string; backgroundColor?: string; gradientColorOne?: string; gradientColorTwo?: string; externalLink?: string; link?: string; customClasses?: string; iconColor?: string; icon?: string }
type Webinar = { codes: string[]; startDate: string; endDate: string; supportedLanguage: string; desktopTitle: string; mobileTitle: string; link?: string; lpLink?: string; testMessage?: boolean }
```

An `i18n(key)` helper resolves `lang_key` → English string from the copied `en.yaml`. (Multi-language support is out of scope; the Astro site is English-only for now, matching the API-docs scope.)

### Component breakdown

Port one element per Hugo partial, with hover/toggle state extracted into Preact islands so Astro can static-render everything above the fold.

```
src/components/
  AnnouncementBanner/
    AnnouncementBanner.astro        ← SSR markup from site_params
    AnnouncementBanner.module.css   ← ported from _announcement-banner.scss
    GeoTargetScript.astro           ← <script is:inline> port of Hugo's inline JS
  Header/
    Header.astro                    ← layout shell: logo, main-left <ul>, main-right <ul>, hamburger, mobile bits
    Header.module.css               ← ported from _main-nav.scss (desktop portions)
    NavDropdown.tsx (Preact)        ← generic hover-open dropdown (Solutions, About, Blog, plain children menus)
    ProductMegaMenu.tsx (Preact)    ← the "Product" dropdown with category hover + 160ms debounce + MutationObserver reset
    SearchToggle.tsx (Preact)       ← the magnifying-glass button + search bar open/close (for the API mobile variant; desktop disables on docs)
    LogoDownloadPanel.astro         ← static markup, shown/hidden by a tiny JS island (matches Hugo's `.js-logo-download` / `.js-logo-download-div`)
    HeaderScroll.astro              ← <script is:inline> that sets `--hugo-header-shrink` from `min(scrollY, 65px)`, replaces the existing scroll listener in BaseLayout
  MobileNav/
    MobileNav.tsx (Preact)          ← the hamburger-triggered overlay (`#mobile-nav-bg` + `#mobile-nav`), docs variant
    MobileNav.module.css            ← ported from _mobile-nav.scss
```

Rationale for the split:
- **`.astro` for skeletons.** Nav items, labels, URLs, product lists are known at build time. Render them to HTML so the nav is usable and SEO-visible with JS disabled.
- **Preact islands for hover/toggle state.** `NavDropdown` manages `open`/`closed` on mouseenter/leave with the Hugo timings; `ProductMegaMenu` manages `openCategory` (defaults to `observability`, flips on category hover with a 160ms timeout, resets on close); `MobileNav` manages open/closed and the body-overlay class. These are the only parts that need client JS, so the rest of the header stays static.
- **Inline scripts for one-off effects.** Geo-targeting (banner) and scroll-shrink (header) are procedural, global, and tiny — `<script is:inline>` keeps them off the hydration graph.

### CSS strategy: porting without Bootstrap or Alpine

The SCSS leans on Bootstrap 5 utilities (`d-flex`, `container`, `col-4`, `position-relative`, etc.), Bootstrap variables (`$gray-dark`, `$brand-primary`, `$shadow-nav`, `$main-nav-height`, `$large-announcement-banner-sm-height`, `$speaker-2`), breakpoint mixins (`media-breakpoint-up(lg)`, `media-breakpoint-down(xxl)`, etc.), and Alpine directives (`x-data`, `x-show`, `@mouseover`). None of that comes into Astro. Instead:

- **Rewrite the HTML to use semantic elements + BEM classes.** `<ul class="d-flex ...">` becomes `<ul class={styles.nav__left}>`. The Bootstrap layout utilities (`d-flex`, `flex-row`, `align-items-center`, `justify-content-between`) are absorbed into the CSS module's own `display: flex` etc. The Bootstrap grid classes in the product mega-menu (`row`, `col-4`, `col-8`) become CSS Grid or flex columns in `Header.module.css`.
- **Resolve Bootstrap variables to their literal values and make them Hugo-identical tokens.** I'll trace each `$var` through the Hugo variables file (`~/dd/websites-modules/assets/styles/abstracts/_variables.scss` or the site's own overrides) and inline the resolved hex/px into new tokens. Example: `$brand-primary` → `#632ca6` (we already have `--color-brand`, so reuse), `$main-nav-height` → `60px` (we have `--hugo-header-height`), `$main-nav-height-desktop` → `130px` (we have `--hugo-header-height-desktop`), `$speaker-2` → the second gradient stop (look up; likely `#2f80ed` per the banner tailwind snippet), `$shadow-nav` → `0 0 8px 8px rgba(0,0,0,0.07)` (we have `--hugo-header-shadow`), `$gray-dark` → look up, probably `#333` or `#555`.
- **Rewrite Bootstrap breakpoints as Hugo-identical tokens.** We already have `--hugo-breakpoint-tablet: 768px` (md) and `--hugo-breakpoint-desktop: 992px` (lg). Add `--hugo-breakpoint-xl: 1200px` and `--hugo-breakpoint-xxl: 1400px` to cover the mega-menu width rules (`width: 1300px` @xxl down to `820px` below lg). No `@media-breakpoint-up()` mixin — plain `@media (min-width: var(--hugo-breakpoint-xxl))` (with the value duplicated in the media query since CSS custom properties don't work in media queries — document this explicitly in tokens.css).
- **Port Alpine behaviors to Preact.** `ProductMegaMenu` holds `openCategory` state with `useState('observability')`; each category button's `onMouseEnter` sets a 160ms timeout that updates state, `onMouseLeave` clears it. A `useEffect` watches for the dropdown closing and resets to `observability`. `NavDropdown`'s `open` state toggles a class that matches Bootstrap's `.show`, and a `MutationObserver` isn't needed because Preact owns the state.
- **Icons.** Copy the referenced SVGs from `~/dd/websites-modules/static/icons/` into `mocked_dependencies/websites_modules/static/icons/` (same relative path as upstream). Add a small `<NavIcon name="..." />` `.astro` wrapper that inlines the SVG (via Astro's `?raw` import or an `astro:assets` glob) and applies color/size via CSS. No icon font.
- **Scroll-shrink math.** The existing `--hugo-header-shrink` token and the `tokens.css` note say "set by BaseLayout scroll listener: min(scrollY, 65px)". Keep that contract. `Header.module.css` uses it: `height: calc(var(--hugo-header-height-desktop) - var(--hugo-header-shrink))` above 992px; logo image scales + moves with the same variable. Below 992px the header is fixed at `--hugo-header-height` (60px), no shrink.

### Hugo-identical tokens to add

Extend the "Hugo-identical" section at the bottom of [tokens.css](../src/styles/tokens.css):

```css
/* Breakpoints */
--hugo-breakpoint-xl: 1200px;   /* Bootstrap xl — mega-menu width shrink */
--hugo-breakpoint-xxl: 1400px;  /* Bootstrap xxl — full mega-menu width */

/* Nav colors (resolved Bootstrap vars) */
--hugo-nav-text: #333;                   /* $gray-dark */
--hugo-nav-hover: #7700ff;               /* hard-coded in _main-nav.scss */
--hugo-nav-border: #e2e2e2;              /* category-toggle-list-column border */
--hugo-nav-btn-hover-bg: rgba(0, 0, 0, 0.05);

/* Nav typography */
--hugo-nav-item-font-size: 18px;
--hugo-nav-item-font-weight: 600;
--hugo-nav-item-padding: 8.5px 8px 9.5px;
--hugo-nav-item-padding-xxl: 8.5px 12px 9.5px;

/* Product mega-menu */
--hugo-mega-menu-width: 1300px;
--hugo-mega-menu-width-xxl-down: 1200px;
--hugo-mega-menu-width-xl-down: 1000px;
--hugo-mega-menu-width-lg-down: 820px;
--hugo-mega-menu-min-height: 630px;
--hugo-mega-menu-offset-left: 13px;      /* dropdown-menu.product-menu left */

/* Announcement banner */
--hugo-banner-text-color: #ffffff;
--hugo-banner-font-size: 20px;
--hugo-banner-gradient-end: #2f80ed;     /* $speaker-2, used when no custom bg */

/* Dropdown shadow */
--hugo-dropdown-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);  /* $shadow-nav — confirm exact value when tracing */
```

Comment header kept — "these can be deprecated once Hugo is deprecated."

### `BaseLayout` changes

`BaseLayout.astro` currently renders `<AnnouncementBannerPlaceholder />` and `<HeaderPlaceholder />`. Replace with the real components:

```astro
<body>
  <AnnouncementBanner />
  <Header />
  <div class="base-layout__body">
    <slot />
  </div>
  <FooterPlaceholder />
  <theme toggles…>
</body>
```

The `--hugo-header-shrink` scroll listener already baked into `BaseLayout` moves to `HeaderScroll.astro` (colocated with `Header`) so the header owns its own behavior. Top-padding math on `.base-layout__body` stays identical — banner height + header height, responsive at 992px.

### Placeholders to delete

- `src/components/HeaderPlaceholder/` (component + CSS module + any colocated test)
- `src/components/AnnouncementBannerPlaceholder/` (same)
- Any `src/pages/components/*placeholder*` showcase entries that reference these two
- Any Playwright / Vitest tests that assert on the placeholders
- Imports / usages in `BaseLayout.astro`

`FooterPlaceholder` stays per the prompt.

### Test pages

Per the CLAUDE.md test-page convention:

- `src/pages/components/announcement-banner.astro` — renders the banner with (a) the default mocked `site_params`, (b) a gradient-override variant, (c) a custom-event no-link variant. Property table documents `desktopMessage`, `mobileMessage`, `backgroundColor`, `gradientColorOne`/`gradientColorTwo`, `externalLink`/`link`, `customClasses`, `iconColor`, `icon`.
- `src/pages/components/header.astro` — renders a full `<Header />` with the live mocked menu data. Below it, individual showcases for `NavDropdown` (one Solutions-style, one simple children list), `ProductMegaMenu` (rendered standalone), `MobileNav` (rendered standalone + an "Open" trigger). Property tables as usual.

### Tests

- **Headless (Vitest, render-to-string)**
  - Banner: renders the desktop and mobile copy from mock site params, applies `background-color` style, emits the external-link `<a>` when `externalLink` is set.
  - Header: static markup contains every top-level menu item from `menus.yaml` in order, Product/Solutions/About/Blog have the expected child-item counts, logo `<a>` points at `/`, "GET STARTED FREE" CTA renders.
  - `NavDropdown`: opens on `mouseenter`, closes on `mouseleave` after delay (use fake timers).
  - `ProductMegaMenu`: defaults to `observability`, switches after 160ms hover on another category, reverts to `observability` when the surrounding dropdown closes.
  - `MobileNav`: closed by default, opens on hamburger click, overlay element appears.
- **Playwright**
  - Banner is 30px tall, fixed to top, spans viewport.
  - Header is 60px tall below 992px, 130px at ≥992px, shrinks to 65px after scrolling 65px+.
  - Hover over "Product" → `.product-menu` becomes visible, width matches `--hugo-mega-menu-width` (or the appropriate variant at a given viewport).
  - Hover over a category button → after ~160ms its column becomes visible.
  - Hover on "Solutions" → solutions dropdown appears, contains all industry/technology/use-case columns.
  - Tap hamburger at 500px → mobile overlay opens, covers viewport.
  - Toggle dark mode → banner and header keep their Hugo colors (banner still white-on-black, header unchanged); nothing switches into the placeholder purple palette.
  - Diff-style check: render the Astro header + banner at 1400px and 500px, screenshot-compare against the Hugo-rendered HTML in [public/api/latest/authentication/index.html](../../public/api/latest/authentication/index.html) loaded headless. Pixel-parity isn't required, but dimensions and major landmarks must match.

### Implementation order

1. **Mocks + folder restructure.**
   - Move the existing `src/mocked_dependencies/api/` to `src/mocked_dependencies/hugo_site/data/api/` and update any imports that reference the old path.
   - Create `src/mocked_dependencies/websites_modules/` and copy in `data/menu_data/*.yaml`, `i18n/en.yaml` (subset), and the referenced `static/icons/*.svg` files from `~/dd/websites-modules/`, preserving the relative paths.
   - Create `src/mocked_dependencies/hugo_site/config/_default/params.en.yaml` (copy from the docs repo) and `src/mocked_dependencies/hugo_site/data/en/webinars.yaml` (seeded with `{ webinars: [] }`).
   - Update `mocked_dependencies/README.md` with the new two-root inventory layout.
2. **Loader.** Add `src/lib/menuData.ts` (and `i18n.ts`, `bannerData.ts`) with typed YAML imports.
3. **Tokens.** Extend the Hugo-identical section in `tokens.css` with the new breakpoint/color/typography/mega-menu variables.
4. **`AnnouncementBanner`.** Port markup + `_announcement-banner.scss` → `AnnouncementBanner.module.css`. Port the inline geo-target script into `GeoTargetScript.astro`.
5. **`Header` skeleton.** Render `<nav class="main-nav">` with main-left, logo, main-right, hamburger, all statically from menu data. Port desktop CSS from `_main-nav.scss`.
6. **`NavDropdown` (Preact).** Handle Solutions/About/Blog and plain children dropdowns.
7. **`ProductMegaMenu` (Preact).** Category hover with 160ms debounce, reset-on-close, gradients, subcategories/sections, `pricing-link`.
8. **`LogoDownloadPanel`.** Static hidden panel + small toggle script.
9. **`HeaderScroll`.** Inline script for `--hugo-header-shrink`.
10. **`MobileNav` (Preact).** Hamburger → overlay + `#mobile-nav` contents, port `mobile-documentation.html`.
11. **`BaseLayout` rewire.** Swap placeholders for real components, remove placeholder imports, keep `FooterPlaceholder`.
12. **Delete `HeaderPlaceholder/` and `AnnouncementBannerPlaceholder/`** (components, tests, showcase entries).
13. **Test pages** for banner, header, each sub-island.
14. **Headless tests** (Vitest).
15. **Playwright tests** — dimensions, hover behavior, mobile overlay, dark mode, scroll-shrink.
16. **Manual parity check.** Open `localhost:1313` (Hugo) side-by-side with the Astro page at 1400px and 500px and confirm pixel-level parity of banner + header.

### Questions / risks

- **Search.** `mobile-documentation.html` uses `{{ partial "search-mobile" $dot }}`, which is Algolia DocSearch. For the docs repo, the desktop `search` menu item is disabled (`params.disabled: [documentation]` in `menus.yaml`), so desktop doesn't render it — but mobile does. Plan: render a static search input in the mobile nav that calls a stub for now (search wiring is a separate future prompt). The plan ships without live search; flag this before merging so the user can confirm.
- **Icon-font parity.** Hugo uses an icon-font for many nav icons (`icon-eye-4`, `icon-right-carrot-normal-2`, etc.), which maps to SVGs via `fantasticon`. Some of these exist under `static/icons/` (e.g. `bits-ai.svg`, `apm.svg`), but not all (e.g. there's no `eye-4.svg` — the font glyph only). For icons without an SVG counterpart, I'll need to pick a reasonable replacement from the `static/icons/` set or extract the glyph. Plan: on first pass, fall back to a generic dot/circle for missing icons and document the gaps in a `README.md` note in `mocked_dependencies/nav_icons/`. Confirm before we ship.
- **Bootstrap `.dropdown-toggle` semantics.** Hugo's dropdown behavior partly relies on Bootstrap JS adding/removing `.show`. We're replacing that with Preact state. The `MutationObserver` in Hugo's `ProductMegaMenu` exists specifically to watch that external class toggle; in the Astro port the menu owns its own open/close state so the observer becomes a plain `useEffect` cleanup — simpler, but worth noting the semantics change.
- **`$gray-dark` and `$shadow-nav` literals.** I'll need to confirm the resolved values by reading `~/dd/websites-modules/assets/styles/abstracts/_variables.scss` (or the site's own variable overrides) before finalizing tokens. Placeholders in the token list above are my best guesses; plan is to resolve exactly during implementation step 3.
- **`sign-up-trigger` modal.** The "GET STARTED FREE" button on Hugo opens a Bootstrap modal wired to a signup iframe (`modals/signup-iframe.html`). For now, keep the button as a plain external `<a>` pointing at `https://www.datadoghq.com/` (matching the `get_started.url: '#'` entry's lack of a real URL — Hugo also currently uses `#` + JS modal). Flagging because "GET STARTED" not opening a modal is a visible behavior change vs. Hugo — may or may not matter for this iteration.
- **Multi-language.** The Hugo nav goes through `i18n` for every label. The Astro site is English-only for now, so we ship with `en.yaml` only and treat the `i18n(key)` helper as `key → en`. When non-English pages land, the helper swaps implementations — no markup change needed.
- **Scroll-shrink interaction with already-deployed BaseLayout.** The current `BaseLayout` sets `--hugo-header-shrink` on scroll to support the placeholder. Moving that listener into `Header` means any future non-API page that uses `BaseLayout` but doesn't render `Header` would lose the effect. Since `Header` becomes unconditional in `BaseLayout`, this is fine, but worth noting for anyone looking at the diff.
