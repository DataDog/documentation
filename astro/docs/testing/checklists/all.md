# Testing checklist

When writing or updating tests, read this checklist ahead of time so it can inform your approach, then check it off once your tests are implemented.

## Checklist

### Test runner selection

- Headless unit and component tests use Vitest. Browser tests use Playwright.

- Playwright is used only for what Vitest/happy-dom can't verify: cross-browser rendering, visual layout, overflow/resize behavior, and end-to-end integration across islands. Don't duplicate interactivity assertions in both layers.

### Test colocation

- Vitest tests live alongside the code they test (e.g., `src/components/<ComponentName>/<ComponentName>.test.ts`).

- Playwright browser tests are centralized in `tests/browser/` (e.g., `alert.spec.ts`), because they test the rendered page rather than a single source file.

### Selectors

- Use stable BEM class names as selectors in both Vitest assertions and Playwright locators. CSS-module hashes change on rebuild and are not stable selectors.

- Use `data-testid` only where no stable BEM class exists and adding one would be awkward (e.g., purely structural fixtures inside tests).

### Playwright testing (browser testing)

- The component's browser tests are up to date. These live in `tests/browser/` (e.g. `alert.spec.ts`).

- Screenshot baselines are up to date. Regenerate with `npx playwright test --update-snapshots` after an intentional visual change.

- The component has at least one screenshot baseline per meaningful visual variant.

- Screenshot baselines are retina (2x `deviceScaleFactor`), captured at a fixed 1440×900 viewport with animations disabled.

- Screenshot baselines are Mac-only (`*-chromium-darwin.png`) because CI isn't wired up for Playwright yet.

### Documentation page

- The component has a documentation page at `src/content/docs/test_pages/components/<component-name>.mdoc` (kebab-case). Documentation pages are used to drive Playwright browser tests.

- The documentation page includes a table of all the component's properties, their valid values, and default values.

### Interactive components

- All items in the [interactive components testing checklist](./interactive_components.md) have been verified.

## Examples

### Selectors in tests

Use the stable BEM class names (not CSS-module hashes) in test assertions and Playwright selectors.

```ts
// Vitest — assert BEM modifier is applied
expect(html).toContain("alert--info");

// Playwright — locate by BEM class
await page.locator(".alert--warning").screenshot();
```
