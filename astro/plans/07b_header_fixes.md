# Header fixes

## Prompt

We recently implemented the site header on the Astro site (see the [plan doc](./07_header.md)). But the resulting header still has some flaws, so we need to fix those. The header does not look exactly the same as the Hugo site, though its proportions are the same.

The Hugo site can be accessed locally at `localhost:1313`.

### Problems list

1. The text on the announcement banner in Astro is not the same size as on Hugo; it appears much larger.
2. The Datadog logo on Hugo is much clearer. It looks strangely blurry on Astro.
3. On scrolldown, the Datadog logo does not behave correctly. In Hugo, the word "Datadog" disappears from the logo. In Astro, the word "Datadog" is still there.
4. The "Get Started Free" button is not styled correctly at all. Its proportions are different, its hover style background color seems to be applied no matter what (so the button is in a permanent hover state in terms of the background), and probably some other issues.
5. Navigation often have bullets when they shouldn't, that look like hyphens (`-`). This is true for both the top-level nav items and the nav items that are only shown on hover.

## Claude's plan

### Problem 1 — Banner text is too large

**Root cause.** The Hugo banner has two layers of font-size rules. The base rule in [`_announcement-banner.scss`](../../../dd/websites-modules/assets/styles/components/_announcement-banner.scss) is `.announcement-banner a { font-size: 20px }`, but the docs config uses `custom_classes: 'dash-announcement-banner'`, which adds a more specific override at the bottom of that same SCSS file:

- Mobile (< 992px): `span.banner-title-mobile { font-size: 16px; line-height: 26px }` (with inner spans at 14px/18px).
- Desktop (≥ 992px): `span.banner-title-desktop span { font-size: 16px; line-height: 20px }`.

Astro ports only the base 20px rule — [`AnnouncementBanner.module.css`](../src/components/AnnouncementBanner/AnnouncementBanner.module.css) sets `font-size: var(--hugo-banner-font-size) /* 20px */` on `.banner` and `.banner a`, and the `dash-announcement-banner` override is missing entirely. The inner `<span>` inside the message (the config wraps the message in `<span>…</span>`) inherits 20px.

**Fix.**

1. Keep `--hugo-banner-font-size: 20px` as the base token in [`tokens.css`](../src/styles/tokens.css) (it still matches Hugo's default for banners that don't use `dash-announcement-banner`).
2. Add variant rules to [`AnnouncementBanner.module.css`](../src/components/AnnouncementBanner/AnnouncementBanner.module.css) keyed on `.dash-announcement-banner` — since `custom_classes` is applied to the outer `<div>`, these selectors resolve without touching the CSS module scoping:

   ```css
   :global(.dash-announcement-banner) .banner__titleMobile {
     font-size: 16px;
     line-height: 26px;
   }
   :global(.dash-announcement-banner) .banner__titleDesktop span {
     font-size: 14px;
     line-height: 18px;
   }
   @media (min-width: 992px) {
     :global(.dash-announcement-banner) .banner__titleDesktop span {
       font-size: 16px;
       line-height: 20px;
     }
   }
   ```

   (Use the `:global()` escape because `dash-announcement-banner` is a Hugo-semantic class, not a CSS-modules class.)

### Problem 2 — Datadog logo is blurry

**Root cause.** Hugo's `<img>` tags ship with a `srcset` for retina displays — see [`main-nav.html:184-185`](../../../dd/websites-modules/layouts/partials/nav/main-nav.html):

```html
<img class="bits-logo-lg" src="…dd_logo_n_70x75.png?w=70&h=75"
     srcset="…?w=70&h=75 1x, …?w=70&h=75&dpr=2 2x">
```

[`Header.astro`](../src/components/Header/Header.astro) sets only `src` (no `srcset`), so on a 2× display the browser upscales the 70×75 PNG and the result is blurry. The mobile logo has the same issue.

**Fix.** In [`Header.astro`](../src/components/Header/Header.astro), add `srcset` to the three logo `<img>` elements, mirroring Hugo exactly:

```astro
<img
  height="75"
  class={styles.logoBits}
  src={bitsLogoUrl}
  srcset={`${bitsLogoUrl} 1x, ${bitsLogoUrl}&dpr=2 2x`}
  alt="Datadog"
/>
<img
  class={styles.logoText}
  height="14"
  src={textLogoUrl}
  srcset={`${textLogoUrl} 1x, ${textLogoUrl}&dpr=2 2x`}
  alt="Datadog"
/>
```

Same treatment for `mobileLogoUrl` (append `&dpr=2` for 2x). The existing base URL strings already include query params, so `&dpr=2` appends cleanly.

### Problem 3 — "Datadog" wordmark doesn't disappear on scroll

**Root cause.** Hugo collapses the wordmark at scroll ≥ 65px using a class toggle — see [`_main-nav.scss:408-433`](../../../dd/websites-modules/assets/styles/components/_main-nav.scss):

```scss
&.main-nav-scrolled {
  .datadog-text-logo-lg {
    display: none;
    opacity: 0;
  }
  .bits-logo-lg { height: 50px; }
}
```

[`HeaderScroll.astro`](../src/components/Header/HeaderScroll.astro) already adds/removes `main-nav-scrolled` on the root when `scrollY ≥ 65px`. But [`Header.module.css`](../src/components/Header/Header.module.css) never reads that class — it tries to fade the text via:

```css
.logoText {
  opacity: calc(1 - var(--hugo-header-shrink) / 65);
}
```

This calc is invalid: `var(--hugo-header-shrink)` is `65px` (has a unit), and CSS can't divide a length by a unitless 65 to produce a unitless result. The `calc()` resolves to `invalid`, the browser discards it, and `opacity` falls back to its inherited value of 1 — so the wordmark never fades.

**Fix.** Replace the continuous-fade math with Hugo's class-toggle rule in [`Header.module.css`](../src/components/Header/Header.module.css):

```css
.logoText {
  width: 93px;
  height: 14px;
  margin-top: 5px;
  transition: opacity 200ms ease-in-out;
}

:global(.main-nav-scrolled) .logoText {
  display: none;
}

:global(.main-nav-scrolled) .logoBits {
  height: 50px;
}
```

Remove the broken `calc()` rules. Because the bits-logo transitions `height: 200ms ease-in-out` (already in place), the snap from 75px → 50px stays smooth. This is exactly what Hugo does and sidesteps the units-in-calc issue entirely.

### Problem 4 — "Get Started Free" button is stuck in its hover state

**Root cause — stacking context trap.** Hugo's `.btn-gradient` uses a `::before` pseudo-element with `z-index: -2` to paint the gradient border *behind* the white element, and the element itself has a white background:

```scss
.btn-gradient {
  position: relative;   // <-- no z-index; no stacking context.
  background: #fff;
  color: #632ca6;
  &:before { z-index: -2; background-image: linear-gradient(…); }
}
```

Because `.btn-gradient` has `position: relative` but **no** `z-index`, it does not form a stacking context. The `::before` at `z-index: -2` escapes upward and paints behind the nearest stacking-context ancestor's content — hidden behind `.btn-gradient`'s own white background.

Astro's [`Header.module.css`](../src/components/Header/Header.module.css) adds `z-index: 1` to `.btnGradient`:

```css
.btnGradient {
  position: relative;
  background: #ffffff;
  z-index: 1;     /* <-- this is the bug */
}
.btnGradient::before { z-index: -2; …gradient… }
```

That `z-index: 1` forms a new stacking context. Per CSS 2.1 Appendix E painting order, inside that context the element's own background paints in step 1 and negative-z-index descendants paint in step 2 — i.e., the ::before gradient paints **on top of** the white background. The button looks gradient-filled at rest; that's the "permanent hover" the user is seeing.

**Root cause — li padding and hyphen.** The global rules in [`global.css:152-166`](../src/styles/global.css#L152-L166) apply to every `<ul>` on the page:

```css
ul { list-style: none; padding-left: 1.222rem; }
ul li::before { content: '\2013'; position: absolute; left: -1.111rem; }
```

These shift every nav `<ul>` right by ~22px and inject an en-dash before every `<li>` — including the `<li>` that holds `GET STARTED FREE`. So even with the gradient issue fixed, the button is proportioned wrong because its `<li>` sits at `padding-left: 1.222rem` from the list and has a hyphen pseudo next to it. (Problem 5 is the same root cause; fixing it there fixes the button's alignment here too.)

**Fix.**

1. Remove `z-index: 1` from `.btnGradient` in [`Header.module.css`](../src/components/Header/Header.module.css). Leave `position: relative` — matching Hugo's rule exactly.
2. Trust the Problem 5 fix to kill the `<ul>` padding and `li::before` hyphen for the nav.
3. Keep the existing `min-width: 120px`, `margin-left: 10px`, `padding: 8.5px 28px 9.5px`, `border-radius: 4px`, hover-gradient rules — those match Hugo.
4. Verify visually at 992px, 1200px, 1400px that proportions match. If padding still looks off, confirm the `<li>` has no residual padding-left by inspecting DOM vs. Hugo.

### Problem 5 — Nav items show hyphen bullets

**Root cause.** [`global.css:152-166`](../src/styles/global.css#L152-L166):

```css
ul { list-style: none; padding-left: 1.222rem; }
ul li { position: relative; padding-left: 0; }
ul li::before { content: '\2013'; position: absolute; left: -1.111rem; }
```

These are intentional for body-content lists (they render a custom en-dash bullet), but they're unscoped and leak into the header `<ul>` trees: `.main-left`, `.main-right`, dropdown menus, solutions grid, product mega-menu's `ul.category-toggle-list`, `ul.product-list`, and the `aboutChildren` / `blogChildren` dropdown lists. Every `<li>` in the nav gets a hyphen and every `<ul>` gets 1.222rem of left padding.

**Fix — scope the global rules to content.** Wrap body content in a well-known container class and restrict the list rules to that container. `BaseLayout.astro` already wraps the slot in `<div class="base-layout__body">` — use that as the scoping selector:

In [`global.css`](../src/styles/global.css), change:

```css
ul { list-style: none; padding-left: 1.222rem; }
ul li { position: relative; padding-left: 0; }
ul li::before { content: '\2013'; position: absolute; left: -1.111rem; }
ul ul { padding-left: 1.111rem; }
ol ol { list-style-type: lower-alpha; }
ol ol ol { list-style-type: lower-roman; }
```

to:

```css
.base-layout__body ul { list-style: none; padding-left: 1.222rem; }
.base-layout__body ul li { position: relative; padding-left: 0; }
.base-layout__body ul li::before { content: '\2013'; position: absolute; left: -1.111rem; }
.base-layout__body ul ul { padding-left: 1.111rem; }
.base-layout__body ol ol { list-style-type: lower-alpha; }
.base-layout__body ol ol ol { list-style-type: lower-roman; }
```

This preserves the en-dash bullet for docs content (inside `<div class="base-layout__body">`) but spares the header and banner, which sit outside that div. It's a single-file, four-line change and doesn't require adding resets to every nav CSS module.

**Alternative considered, rejected.** Adding `ul { padding-left: 0 }` / `ul li::before { content: none }` resets inside each component's CSS module would work but spreads the fix across 3–4 files (`Header.module.css`, `ProductMegaMenu.css`, and any future nav components), is easier to forget when adding a new nav element, and reverses the default in component land rather than fixing the global scope issue. Scoping the globals is tighter.

**Side effect.** The en-dash rule being scoped means any future component authored as a direct child of `<body>` (outside `.base-layout__body`) won't get the en-dash bullet by default. That's correct — components should be styleable in isolation per [`astro/CLAUDE.md`](../CLAUDE.md)'s "limit global styles" guidance.

### Implementation order

1. **Problem 5** — edit [`global.css`](../src/styles/global.css) to scope the `ul`/`li` list-style rules to `.base-layout__body`. Verify the content pages (e.g., [`placeholder.mdoc`](../src/content/docs/components/placeholder.mdoc)) still show en-dash bullets.
2. **Problem 4a** — remove `z-index: 1` from `.btnGradient` in [`Header.module.css`](../src/components/Header/Header.module.css). Visual-check the button.
3. **Problem 3** — replace the broken `calc()` opacity rules in [`Header.module.css`](../src/components/Header/Header.module.css) with `:global(.main-nav-scrolled) .logoText { display: none }` and `:global(.main-nav-scrolled) .logoBits { height: 50px }`. Scroll-test at ≥ 992px.
4. **Problem 2** — add `srcset` to all three logo `<img>` elements in [`Header.astro`](../src/components/Header/Header.astro). Compare sharpness against Hugo at 2× zoom.
5. **Problem 1** — add `.dash-announcement-banner` overrides to [`AnnouncementBanner.module.css`](../src/components/AnnouncementBanner/AnnouncementBanner.module.css). Compare banner text size against Hugo at mobile and desktop widths.
6. **Parity verification.** Open `localhost:1313` (Hugo) and `localhost:4321` (Astro) side-by-side at 500px, 992px, and 1400px. Scroll both and confirm:
   - Banner text size matches at all breakpoints.
   - Logo is crisp on retina.
   - Wordmark disappears at ≥ 65px scroll (Hugo-identical).
   - GET STARTED FREE button is white at rest, gradient on hover, 120px min-width, 10px left margin.
   - No hyphens next to nav items or dropdown items.
7. **Test updates.** Update [`Header.test.ts`](../src/components/Header/Header.test.ts) and [`AnnouncementBanner.test.ts`](../src/components/AnnouncementBanner/AnnouncementBanner.test.ts) to assert the new behaviors: `srcset` on logo images, `.main-nav-scrolled` hides `.logoText` (jsdom-simulate), inner banner span font-size resolves to 14/16px under `dash-announcement-banner`. Add a Playwright test that scrolls past 65px and asserts the wordmark `img` has `display: none`.

### Questions / risks

- **Scroll-mode interaction.** [`BaseLayout.astro`](../src/layouts/BaseLayout.astro) has a `data-scroll` mode that's toggled via a button. If that mode renders content outside `.base-layout__body`, the scoped list-style rules won't apply to it — flag when testing. A quick grep shows scroll-mode only affects styling, not DOM structure, so this should be safe.
- **Other pages using `<ul>`.** Skimming the codebase for `<ul>` in components: `ApiSideNav`, `Breadcrumbs`, `Tabs`, etc. all render inside `.base-layout__body`, so they keep the en-dash. The API component pages (the test pages under `src/pages/components/`) also render inside `BaseLayout`, so they're unaffected. Only header/banner markup sits outside the scoped div, which is the intended exclusion.
- **`:global()` in CSS modules.** Astro/Vite's CSS modules support `:global()` natively — confirmed in use elsewhere (e.g. `HeaderScroll.astro` toggles `main-nav-scrolled` and the Header module would read it via `:global()`). No extra configuration needed.
- **Font-size token vs. hard-coded values for Problem 1.** I'm intentionally hard-coding 14/16/20 px in the `.dash-announcement-banner` overrides rather than adding three new tokens — the values are tied to that specific custom-class variant, not site-wide, so they don't meet the "reusable across components" bar in [`astro/CLAUDE.md`](../CLAUDE.md). If a second `custom_classes` banner lands later with its own font scale, revisit.
- **Blurriness on non-retina displays.** Adding `srcset` is a no-op on 1× displays (browser picks the 1x source), so Problem 2's fix is strictly additive — no regression risk on lower-DPI monitors.

