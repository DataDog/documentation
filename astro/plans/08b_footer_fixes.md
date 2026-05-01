# Footer fixes

## Prompt

Recently, we added a footer to the Astro site (see the [plan file](./08_footer.md) for the feature). But the Astro version doesn't quite match the Hugo version.

1. The "CONTACT US" button should have bolder text.
2. The "CONTACT US" button is the wrong color purple.
3. The "FREE TRIAL" button should have bolder text.
4. The four columns (product, resources, about, blog) should have a bit of space between them. Right now, the rule under the column titles goes across the footer unbroken, but that's not how it looks in Hugo.
5. In Hugo, the Product column is wider than the others, maybe 2x wider. In Astro, the Product column appears to be the same width as the others, so its contents are smashed together.

Fix these issues by comparing the Hugo styles and components to the Astro styles and components.

## Claude's plan

### Root causes (one per issue)

1. **"CONTACT US" text weight.** The Astro `.ctaPrimary` rule in [Footer.module.css:124-143](../src/components/Footer/Footer.module.css#L124-L143) sets `font-size: 18px` but never sets `font-weight`, so the button falls back to 400. Hugo's `.btn` rule in [websites-modules/assets/styles/components/_buttons.scss:7-36](../../../dd/websites-modules/assets/styles/components/_buttons.scss#L7-L36) sets `font-weight: 600`, which propagates to every `.btn`-classed CTA including `.btn-primary`.
2. **"CONTACT US" wrong purple.** The Astro token `--hugo-footer-cta-primary-bg: #774aa4` in [tokens.css:208](../src/styles/tokens.css#L208) is a guess; the Hugo button uses `$btn-primary-bg: $brand-primary`, which resolves to `#632ca6` ([base/_colors.scss:20](../../../dd/websites-modules/assets/styles/base/_colors.scss#L20)). Same wrong value is set for `--hugo-footer-cta-primary-border`.
3. **"FREE TRIAL" text weight.** Same root cause as #1 — `.ctaOutline` in [Footer.module.css:363-402](../src/components/Footer/Footer.module.css#L363-L402) is missing `font-weight: 600`.
4. **Four-column rule runs unbroken.** Hugo's columns live inside a Bootstrap `.row` (negative 12px side margins) with each `.col-*` carrying 12px side padding, so the per-column `border-bottom` stops short of the neighbor's border — creating a visible gap. The Astro `.mainRow` uses flex with `gap: 0` and `.column` has no horizontal padding ([Footer.module.css:168-186](../src/components/Footer/Footer.module.css#L168-L186)), so each column's `.divider--desktop` butts directly against the next column's divider and reads as one continuous rule.
5. **Product column narrowed to match others.** The width rules for the four section columns are keyed on `.mainRow > :nth-child(2..5)` ([Footer.module.css:212-233](../src/components/Footer/Footer.module.css#L212-L233)). `FooterAccordion` is mounted with `client:load`, which wraps its four `<div class="column">` outputs inside an `<astro-island>` custom element. The sections are therefore not direct children of `.mainRow` — the nth-child selectors never match, so every column falls back to `.column`'s default `width: 100%`, which flex-shrinks them all to roughly equal widths inside the main row. Product contains two side-by-side sub-columns, so losing ~17pp of its Hugo width is where the "smashed" effect comes from.

### Fixes

**Issues 1 & 3 — button weight.** Add `font-weight: 600` to `.ctaPrimary` and `.ctaOutline` in `Footer.module.css`. Nothing else changes.

**Issue 2 — button color.** Change both CTA tokens in `tokens.css`:
```css
--hugo-footer-cta-primary-bg: #632ca6;
--hugo-footer-cta-primary-border: #632ca6;
```
Resolved from `$brand-primary` in the Hugo sources; matches the existing `--hugo-nav-brand-primary: #632ca6` already in [tokens.css:163](../src/styles/tokens.css#L163). Consolidating those two tokens into a single `--hugo-brand-primary` is worth a follow-up but out of scope here.

**Issue 4 — per-column gutter.** Port Bootstrap's `.row`/`.col-*` gutter explicitly so the existing per-column `.divider--desktop` visuals match Hugo:

- Add `padding-left: 12px; padding-right: 12px;` to `.column` (already `box-sizing: border-box`, so column widths stay correct).
- Add `margin-left: -12px; margin-right: -12px;` to `.mainRow` so the leftmost column's padding doesn't compound with `.container`'s 12px padding and the row stays flush with the rest of the page.
- Mobile (<992px): `.mainRow` is `flex-direction: column` and the per-column `.divider--mobile` is what shows there, so adding horizontal padding is cosmetically neutral. Confirm the trial block's existing `.divider--mobile { padding-top: 0.75rem }` still reads as Hugo does.

`gap` was considered instead, but Hugo's border visually ends at the padding edge (inside the column) — not at the gutter edge — so matching with padding is closer to Hugo than matching with `gap`.

**Issue 5 — Product column width (same fix for Resources/About/Blog).** The nth-child selectors are unreliable while `FooterAccordion` is an island. Replace them with explicit modifier classes keyed on the section id:

1. In `FooterAccordion.tsx`, extend the `classes` prop with `columnByKey: Record<SectionKey, string>` and apply `classes.columnByKey[s.id]` alongside `classes.column` on each section wrapper `<div>`.
2. In `Footer.astro`, pass a `columnByKey` object wired to CSS-module classes:
   ```ts
   columnByKey: {
     product: styles['column--product'],
     resources: styles['column--resources'],
     about: styles['column--about'],
     blog: styles['column--blog'],
   }
   ```
3. In `Footer.module.css`, replace the four `.mainRow > :nth-child(N)` rules with four modifier-class rules (`.column--product`, `.column--resources`, `.column--about`, `.column--blog`) carrying the same widths/flex/order values. Keep `.column--trial` as-is.
4. Delete the nth-child rules so there's one source of truth per column width.

An alternative — swapping `client:load` for `client:only="preact"`, or dropping the island wrapper — was considered and rejected: it'd change SSR/hydration semantics to fix what's really a CSS-scoping problem, and any future change to hydration directives would silently break layout again. Modifier classes are the durable fix.

### Verification

- `npm run dev` at port 4321 and compare side-by-side against Hugo at 1313 at 1400px and at 500px: Product column occupies 33.33% of the row; Resources 16.67%; About 14.58%; Blog 10.42%; trial 25%. Dividers under each column header break at the gutter. Both CTAs read as semibold uppercase. Contact Us background matches Hugo (eyedropper → `#632ca6`).
- Update [Footer.test.ts](../src/components/Footer/Footer.test.ts) / add Playwright coverage:
  - Assert computed `font-weight` is `600` on the Contact Us and Free trial CTAs.
  - Assert computed `background-color` on the Contact Us CTA is `rgb(99, 44, 166)`.
  - Assert each section column's computed `width` at a 1400px viewport matches the target percentages within 1px.
  - Assert the desktop divider under "Product" does not visually connect to the divider under "Resources" (measure `getBoundingClientRect` on each; require ≥ 12px gap between `.right` of one and `.left` of the next).

### Risks / follow-ups

- **Other consumers of `--hugo-footer-cta-primary-*`.** Grep result: only `.ctaPrimary` in `Footer.module.css` uses these tokens. Changing the values is side-effect-free.
- **Token consolidation.** Leaving `--hugo-nav-brand-primary` and `--hugo-footer-cta-primary-bg` as two tokens both pointing at `#632ca6` duplicates the truth. Worth a follow-up to introduce a single `--hugo-brand-primary` and point both at it — out of scope here.
- **`FooterAccordion` classes contract grows.** Adding `columnByKey` enlarges the `classes` prop surface. The alternative is `[data-testid="footer-section-product"]` attribute selectors (no prop change needed) — but CSS-module classes stay scoped and attribute selectors don't. Keeping the prop expansion.
- **Hugo's `:lang(ja)` / `:lang(ko)` button overrides.** The Hugo `.btn` rule has language-specific `font-size: 16px` overrides; the Astro CTAs don't. Not in scope for this set of fixes (site is English-only today), but the language-override port from plan 08 is incomplete and worth flagging.
