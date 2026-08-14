# Site footer

## Prompt

The Hugo site has a footer that it sources from `websites-modules`. These files are written as Go templates, which won't be useful to us in Astro. These Go templates reference data that is also kept in `websites-modules`. For example, `websites-modules/layouts/partials/nav/main-nav.html` references `websites-modules/data/menu_data`.

We recently implemented the site header (see the [plan file](./07_header.md) for that feature). The footer is under very similar constraints: needing to be identical to Hugo, but needing to be formatted as an Astro template, etc.

The data you need is probably already in [the mocked_dependencies folder](../src/mocked_dependencies/), since you needed to add the data to support the header. But if not, you can create new mocked dependencies as needed.

## Claude's plan

### Scope

Port only the **docs-default footer** — the `{{- else -}}` branch of [layouts/partials/footer.html](../../../dd/websites-modules/layouts/partials/footer.html). Skip `footer-small`, `footer-nycactivities`, `aws-reinvent-2020/footer`, `molecules/footer-slim`, and all the trailing `corp-hugo`-gated modal/script blocks (lines 346-418 of `footer.html`) — none of it applies to the docs site.

Keep:
- The docs-only intro row (`footer_blurb_heading` + Contact Us CTA, gated on `repo_name == "documentation"`).
- The five-column main section (Free trial + app download | Product | Resources | About | Blog).
- The bottom row (language selector | legal/copyright | social icons).
- The `sign-up-trigger` "Free trial" CTA, ported as an actual Astro modal (see **Modals** below).

### Source files in `websites-modules`

The Hugo docs footer is assembled from these files. These are the sources of truth for data, markup, and styles:

- **Markup (Go templates)**
  - [layouts/partials/footer.html](../../../dd/websites-modules/layouts/partials/footer.html) — the dispatcher + the default-variant markup (lines 62-325 are what we port).
  - [layouts/partials/footer_link.html](../../../dd/websites-modules/layouts/partials/footer_link.html) — URL-resolution logic for menu links (prepends `https://www.datadoghq.com/` + lang prefix when `repo_name != "corp-hugo"`). Inlined into the loader rather than a sub-component.
  - [layouts/partials/language-selector-docs.html](../../../dd/websites-modules/layouts/partials/language-selector-docs.html) — the language toggle dropdown used on docs. Alpine-driven popup with per-page translations.
  - [layouts/partials/svg.html](../../../dd/websites-modules/layouts/partials/svg.html) — resolves SVG inlines (used for social icons, app-store badges, `world.svg`, `arrow.svg`).
- **Data (YAML)**
  - [config/_default/menus/menus.en.yaml](../../../dd/websites-modules/config/_default/menus/menus.en.yaml) — `footer_resources`, `footer_about`, `footer_blog`, `footer_sub`, `footer_social`. Per-language menus exist (`menus.ja.yaml`, etc.) for future i18n.
  - [data/menu_data/products.yaml](../../../dd/websites-modules/data/menu_data/products.yaml) — already mocked; the Product column reads from this.
  - [data/language_names.yaml](../../../dd/websites-modules/data/language_names.yaml) — per-language label dictionary for the language selector (`English in English`, `English in Japanese`, etc.).
  - [i18n/en.yaml](../../../dd/websites-modules/i18n/en.yaml) — already mocked; needs to be extended with the keys referenced by the footer (`footer_blurb_heading`, `footer_blurb_desc`, `contact_us`, `free_trial`, `download_mobile_app`, `product`, `resources`, `about`, `blog`, `personalized_demo`).
- **Styles (SCSS)**
  - [assets/styles/components/_footer.scss](../../../dd/websites-modules/assets/styles/components/_footer.scss) — all 438 lines ported, minus the `.footer--small` and `.footer--logo` blocks (those belong to variants we're dropping).
- **Site-level params (this repo)**
  - [config/_default/params.en.yaml](../../config/_default/params.en.yaml) — `social.{twitter,linkedin,youtube,instagram}` URLs override the defaults from `footer_social`.

### Mocked dependencies to add

Extending the two-root convention from [plan 07](./07_header.md):

```
src/mocked_dependencies/
  websites_modules/
    config/_default/menus/
      menus.en.yaml                             ← copied verbatim
                                                  (future: menus.ja.yaml, etc. when i18n lands)
    data/
      language_names.yaml                       ← copied verbatim, for language-selector labels
    i18n/
      en.yaml                                   ← EXTENDED with footer keys (see list above)
    static/icons/
      world.svg                                 ← language-selector globe
      arrow.svg                                 ← language-selector caret
      app-store-badge.svg                       ← mobile download badges
      google-play-badge.svg                     ← mobile download badges
      apple.svg                                 ← desktop download icons
      google-play.svg                           ← desktop download icons
      twitter-x.svg, linkedin-new.svg,
      youtube.svg, instagram.svg                ← social links (replacing icon-font glyphs)
```

No new `hugo_site/` entries — the docs footer doesn't pull anything else from this repo that isn't already mocked.

Loader helpers (colocated under `src/lib/`):
- `footerMenus.ts` — parses `menus.en.yaml`, inlines the URL-resolution logic from `footer_link.html` (prefix external URLs with `https://www.datadoghq.com/` + lang prefix when the URL is relative), exposes typed `FooterMenu` shapes.
- `languageNames.ts` — typed loader for `language_names.yaml`.
- The existing `i18n.ts` helper covers the label lookups.

```ts
type FooterMenuItem = { name: string; url: string; target?: '_blank'; weight: number }
type FooterSocialItem = FooterMenuItem & { pre: string /* icon key, e.g. 'twitter-x' */ }
type LanguageNames = Record<string /* currentLang */, Record<string /* targetLang */, string>>
```

The menu-order sentinel: Hugo sorts by `weight` ascending. The loader sorts explicitly so we don't depend on YAML key order.

### Component breakdown

```
src/components/
  Footer/
    Footer.astro                      ← SSR shell: <footer>, two-row layout, all menu sections
    Footer.module.css                 ← ported from _footer.scss
    FooterMenuSection.tsx (Preact)    ← one collapsible column (title + split-in-half link lists),
                                        owns the mobile accordion open/close state
    LanguageSelector.tsx (Preact)     ← ported from language-selector-docs.html;
                                        popup dropdown with current language + alternates
    FreeTrialModal.tsx (Preact)       ← Astro-native modal for the "Free trial" CTA
    SocialIcon.astro                  ← maps `pre` (e.g. 'twitter-x') → inlined SVG
    FooterBlurb.astro                 ← the docs-only intro row (blurb + Contact Us CTA)
```

Rationale for the split:
- **`.astro` for skeletons.** The menu lists, logo badges, copyright, the blurb row — all static, all known at build time. SSR-render them.
- **Preact for interactive state.** Each column's mobile accordion toggle, the language selector popup, the free-trial modal.
- **`FooterMenuSection`** owns the accordion state the way Alpine's `openSection` does in Hugo — a shared `openSection` value driven by `useState` in the parent `Footer.tsx` island wrapper… *wait.* Reconsider: the five sections share one `openSection` state (only one expands at a time on mobile), so the wrapper needs to be a single island or the sections need to communicate. Simplest: a small `FooterAccordion.tsx` Preact component wraps the five sections and owns the single `openSection` value; each section receives `isOpen` and `onToggle` props. Kept flat — no context, no pub/sub.

### Modals

The Hugo free-trial CTA (`.sign-up-trigger`) opens a Bootstrap modal wired to a Marketo-hosted signup iframe. Port the *feature*, not the Marketo plumbing:

- **`FreeTrialModal.tsx`** — Preact dialog using the native `<dialog>` element for focus trapping + escape-to-close (no Bootstrap dependency, no Alpine). Opens when any element with `data-trigger="free-trial"` is clicked; closes on backdrop click, escape, or the close button.
- **Modal contents** — for now, an `<iframe src="https://app.datadoghq.com/signup">` matching Hugo's current behavior. The iframe URL lives in `footerConfig.ts` so swapping to a real form (Marketo or otherwise) is a one-line change.
- **Hugo-identical dimensions.** Modal width, header styling, close-button position match `.demo-request-modal.modal-signup` in the existing Bootstrap theme. Resolve values by inspecting the Hugo site at `localhost:1313` rather than porting all of Bootstrap's `.modal` SCSS.
- **`FreeTrialModalTrigger.astro`** — a thin `<button>` wrapper that emits `data-trigger="free-trial"` so the CTA stays server-rendered and accessible without JS (falls back to a direct `https://app.datadoghq.com/signup` link).

The "Contact Us" CTA in the docs-only blurb is a plain `<a href="/help/">` — no modal on Hugo, no modal here.

The rest of the Hugo footer's modal stack (`modal-header-demo-signup`, signup-modal, webinar-banner, video-modal) is corp-hugo-only and gets skipped.

### Language selector

The Astro site is English-only for now, but the footer has a prominent language dropdown and we don't want to ship a broken control. Plan:

- Render the full `LanguageSelector` component with the same markup Hugo produces.
- Populate it from the mocked `language_names.yaml` — English is always present; additional languages come from a `footerConfig.availableLanguages: string[]` set (ships as `['en']`).
- Each alternate-language link resolves to `/${lang}/${currentPath}?lang_pref=${lang}`. Build-time we emit the links, but the dropdown only shows alternates when `availableLanguages.length > 1`.
- `?lang_pref=` cookie-setting is handled by the same client script Hugo uses (small inline script; port as `LanguageSelector.tsx` side effect on click).

When non-English pages land, the contributor flips `availableLanguages` and adds the translated `.mdoc` files — no component change. This is the "don't work against future i18n" constraint in action.

### CSS strategy: porting without Bootstrap or Alpine

The SCSS leans on the same Bootstrap/Alpine stack as the header (`d-flex`, `col-lg-3`, `pt-3`, `x-data`, `x-show`, `border-bottom border-gray`, etc.). Same approach as header:

- **Semantic elements + BEM classes.** `<div class="col-12 col-lg-3">` → `<div class={styles.footer__column}>` with CSS Grid in `Footer.module.css`. The `col-lg-2-about` / `col-lg-1-blog` custom widths (14.583% / 10.417%) move into tokens.
- **Resolve Bootstrap variables to literals.** `$gray-dark`, `border-gray-darker`, `#110617` (background), `rgba(255, 255, 255, 0.5)` (text), `#616161` (selector border), `#323232` (popup bg) all become Hugo-identical tokens.
- **Language-specific sizing.** The SCSS has extensive `:lang(ja)` / `:lang(ko)` overrides (smaller fonts, `word-break: keep-all`). Port them verbatim so the design is ready when JP/KR translations land — don't strip "unused" rules just because we're English-only today.
- **Padding tokens.** We already have `--hugo-footer-padding-y`, `--hugo-footer-padding-y-tablet`, `--hugo-footer-padding-top-desktop`, `--hugo-footer-padding-bottom-desktop` in `tokens.css`. Use them.
- **Accordion.** Replace `x-show.important="desktop || openSection === 'product'"` with CSS: sections default to `display: none` below 992px; add `.footer__column--open { display: block }` toggled by Preact. Above 992px, `@media (min-width: 992px)` forces `display: block` on all sections.
- **Icons.** Hugo's social links use `<i class="icon-twitter-x">` (icon font). Replace with inlined SVGs via `SocialIcon.astro` — `name="twitter-x"` → imports `mocked_dependencies/websites_modules/static/icons/twitter-x.svg?raw`. Matches the header's icon-handling pattern.

### Hugo-identical tokens to add

Extend the Hugo-identical section in [tokens.css](../src/styles/tokens.css):

```css
/* Footer colors */
--hugo-footer-bg: #110617;
--hugo-footer-text: rgba(255, 255, 255, 0.5);
--hugo-footer-text-strong: #ffffff;
--hugo-footer-border-gray: #616161;           /* language selector border */
--hugo-footer-border-gray-darker: #2a1f30;    /* bottom-row divider — confirm on trace */
--hugo-footer-popup-bg: #323232;              /* language selector dropdown */
--hugo-footer-popup-hover: #616161;
--hugo-footer-popup-secondary: #c7c7c7;       /* lang-secondary text */

/* Footer typography */
--hugo-footer-link-font-size: 16px;
--hugo-footer-link-line-height: 16px;
--hugo-footer-section-header-font-size: 18px;       /* <992px */
--hugo-footer-section-header-font-size-desktop: 16px;
--hugo-footer-copyright-font-size: 14px;
--hugo-footer-copyright-font-size-desktop: 16px;

/* Footer column widths (custom Bootstrap grid overrides from _footer.scss) */
--hugo-footer-col-about: 14.583%;   /* col-lg-2-about */
--hugo-footer-col-blog: 10.417%;    /* col-lg-1-blog */

/* Language selector */
--hugo-lang-toggle-height: 32px;
--hugo-lang-toggle-min-width: 120px;
--hugo-lang-toggle-max-width: 166px;

/* Footer CTA button */
--hugo-footer-btn-height: 42px;
--hugo-footer-btn-min-height-tablet: 50px;
--hugo-footer-btn-min-width-desktop: 165px;
```

Comment header kept — "these can be deprecated once Hugo is deprecated."

### `BaseLayout` changes

`BaseLayout.astro` currently renders `<FooterPlaceholder />`. Replace with the real component:

```astro
<body>
  <AnnouncementBanner />
  <Header />
  <div class="base-layout__body">
    <slot />
  </div>
  <Footer />
  <theme toggles…>
</body>
```

No other BaseLayout changes — the scroll-shrink listener lives in `Header` (from plan 07), the footer has no global-state dependencies.

### Placeholder to delete

- `src/components/FooterPlaceholder/` (component + CSS module + any colocated test).
- The `FooterPlaceholder` import/usage in `BaseLayout.astro`.
- Any `src/pages/components/*placeholder*` showcase entry that still references the footer placeholder.

### Test pages

Per the CLAUDE.md test-page convention:

- `src/pages/components/footer.astro` — renders `<Footer />` in full with the live mocked menu data. Below it, isolated showcases for `FooterAccordion` (mobile-width frame demonstrating single-open behavior), `LanguageSelector` (one English-only variant, one multi-language variant with mocked `availableLanguages: ['en', 'ja', 'fr']`), `FreeTrialModal` (trigger button + open state), `SocialIcon` (grid of every `pre` → SVG mapping, for gap-checking). Property tables per component as usual.

### Tests

- **Headless (Vitest, render-to-string)**
  - Footer: renders all five column headers in order (`Product`, `Resources`, `About`, `Blog` + the free-trial block), emits every `footer_resources` / `footer_about` / `footer_blog` / `footer_sub` / `footer_social` link from the mocked menus, copyright shows current year, docs-only blurb renders when `repoName === 'documentation'`.
  - `FooterAccordion`: only one section open at a time; clicking an open section closes it; above 992px (viewport-mocked) all sections render open regardless.
  - `LanguageSelector`: closed by default, opens on button click, shows current language; with `availableLanguages: ['en']` no alternates render; with `['en', 'ja']` the Japanese link renders with `?lang_pref=ja`.
  - `FreeTrialModal`: hidden by default, opens on `data-trigger="free-trial"` click, emits the signup iframe `src`, closes on escape.
- **Playwright**
  - Footer background is `#110617`, text color is `rgba(255, 255, 255, 0.5)`.
  - At 1400px: all five columns render side-by-side, each at the expected width (`col-lg-3` / `col-lg-4` / `col-lg-2` / `col-lg-2-about` / `col-lg-1-blog`).
  - At 500px: columns stack; only one accordion section open at a time; tapping a header expands it, tapping again collapses.
  - Hover over a footer link → opacity drops to 0.5.
  - Click "Free trial" button → modal opens, overlay covers viewport, escape closes it, backdrop click closes it.
  - Click language selector → popup appears above the button, first item is the current language.
  - Social icons render as SVGs (not icon-font glyphs) and point at the URLs from `params.en.yaml` `social.*`.
  - Dark mode toggle: footer stays on its Hugo palette (dark purple-black, white text) — no placeholder colors bleeding through.
  - Diff-style parity: screenshot the Astro footer at 1400px and 500px against the Hugo-rendered `public/api/latest/authentication/index.html` footer. Pixel-parity not required; dimensions + landmarks must match.

### Implementation order

1. **Mocks.**
   - Copy `~/dd/websites-modules/config/_default/menus/menus.en.yaml` → `mocked_dependencies/websites_modules/config/_default/menus/menus.en.yaml`.
   - Copy `~/dd/websites-modules/data/language_names.yaml` → `mocked_dependencies/websites_modules/data/language_names.yaml`.
   - Copy the referenced SVGs (`world`, `arrow`, `app-store-badge`, `google-play-badge`, `apple`, `google-play`, `twitter-x`, `linkedin-new`, `youtube`, `instagram`) into `mocked_dependencies/websites_modules/static/icons/`.
   - Extend `mocked_dependencies/websites_modules/i18n/en.yaml` with the footer i18n keys.
   - Update `mocked_dependencies/README.md` inventory.
2. **Loaders.** Add `src/lib/footerMenus.ts` (with inlined URL-resolution from `footer_link.html`) and `src/lib/languageNames.ts`. Extend `src/lib/i18n.ts` only if it doesn't already auto-pick up the new keys.
3. **Tokens.** Extend the Hugo-identical section in `tokens.css` with the footer colors, typography, and custom column widths. Resolve the last two "confirm on trace" values (`--hugo-footer-border-gray-darker` and anything else flagged `?`) by reading `~/dd/websites-modules/assets/styles/abstracts/_variables.scss`.
4. **`SocialIcon.astro`.** Thin SVG inliner keyed by `pre` (e.g. `twitter-x`). Used by the bottom row.
5. **`FooterBlurb.astro`.** Static docs-only intro row (blurb heading + desc + Contact Us link). Reads from i18n.
6. **`Footer.astro` skeleton.** Five-column main section + bottom row, no interactivity yet. Port `_footer.scss` → `Footer.module.css`.
7. **`FooterAccordion` + `FooterMenuSection` (Preact).** Shared `openSection` state; below 992px collapses to single-open accordion, above 992px all open.
8. **`LanguageSelector` (Preact).** Popup toggle, current language + alternates (alternates empty while `availableLanguages === ['en']`), `?lang_pref=` cookie-setting on click.
9. **`FreeTrialModal` (Preact) + `FreeTrialModalTrigger.astro`.** Native `<dialog>` with escape/backdrop close; trigger button emits `data-trigger`.
10. **`BaseLayout` rewire.** Swap `FooterPlaceholder` for `Footer`.
11. **Delete `FooterPlaceholder/`** (component, tests, showcase).
12. **Test page** (`src/pages/components/footer.astro`).
13. **Headless tests** (Vitest).
14. **Playwright tests** — dimensions, accordion behavior, modal, language popup, dark mode, parity screenshots.
15. **Manual parity check.** Open `localhost:1313` (Hugo docs) and Astro side-by-side at 1400px and 500px; confirm footer parity.

### Questions / risks

- **Social icon gaps.** Hugo's social icons come from an icon font (`.icon-twitter-x`, `.icon-linkedin-new`, `.icon-youtube`, `.icon-instagram`). Not all of these have SVG counterparts in `~/dd/websites-modules/static/icons/`. Plan: extract the missing glyphs from the icon font (or grab equivalent brand SVGs from the vendor sites) and commit them as mocks. Document the source of each in `mocked_dependencies/websites_modules/static/icons/README.md`. Flag before we ship if I can't find a clean SVG for any one of them.
- **`footer_sub` and `footer_social` are defined in `menus.en.yaml` only for corp-hugo-style sites.** The docs repo imports `websites-modules` as a Hugo module, so at Hugo runtime the docs site inherits those menus — but the *docs repo* doesn't override them in its own `config/_default/`. Confirmed by grep: no `footer_*` menu defs in `documentation/config/_default/`. So the `menus.en.yaml` we copy is the truth. If the docs repo ever starts overriding these, we'll need to merge the two — flag for future.
- **`border-gray-darker` literal.** This is a Bootstrap-extended gray that I haven't traced yet. Placeholder token value above is a guess; resolve during step 3.
- **Marketo iframe in the free-trial modal.** Hugo's "Free trial" button on docs pages goes through `app.datadoghq.com/signup` (cloud signup), not a Marketo form. Matching that behavior with an iframe is simple. But if the user actually wants a Marketo lead-capture form in the modal (matching corp-hugo behavior), we'd need to mock the Marketo JS + a form ID. Plan assumes the former; confirm before step 9.
- **Accordion vs. `<details>`.** Accepted Preact per confirmation; flagging that the Hugo behavior (only one section open at a time) is exactly what `<details name="...">` now provides natively. If reactivity requirements stay this simple, we could swap to pure-HTML accordions post-launch and drop the island. Not doing it now — keeping the split consistent with the header pattern.
- **Language selector cookie.** Hugo sets `lang_pref` via a tiny inline script on click. Porting this verbatim means the Astro site writes a cookie that Hugo reads (and vice versa) — which is correct as long as docs users bounce between the two sites. Worth a note in the implementation PR so a reviewer can confirm the cookie name and scope (`/`, domain `.datadoghq.com`) match.
- **Scroll behavior.** The header has `--hugo-header-shrink`; the footer has no equivalent. But the body-padding math in `BaseLayout` needs to account for footer height so fixed-position elements (side-nav) don't overlap — same issue we'd have if we added any fixed-position chrome. Footer is not fixed-position, so this is moot. Noting so nobody adds a `position: fixed` to the footer CSS later without thinking through the layout impact.