# Testing checklist

When writing or updating tests, read this checklist ahead of time so it can inform your approach, then check it off once your tests are implemented.

## Checklist

### Test runner selection

- Headless unit and component tests use Vitest. Browser tests use Playwright.

- Playwright is used only for what Vitest/happy-dom can't verify: cross-browser rendering, visual layout, overflow/resize behavior, and end-to-end integration across islands. Don't duplicate interactivity assertions in both layers.

### Test colocation

- Tests are colocated when possible. For example, `someProcessingFile.test.ts` would live alongside `someProcessingFile.ts`. 

- If a component is being tested, the tests are in `<COMPONENT_FOLDER>/tests` as `unit.test.ts` and `browser.test.ts`, respectively. 

- When a component is made up of multiple subcomponents, include the component names in the tests (`SomeComponent.unit.test.ts`, etc.).

### Selectors

- Use stable BEM class names as selectors in both Vitest assertions and Playwright locators. CSS-module hashes change on rebuild and are not stable selectors. See the [selectors in tests example](#selectors-in-tests).

- Use `data-testid` only where no stable BEM class exists and adding one would be awkward (e.g., purely structural fixtures inside tests). Generally, `data-testid` should not be necessary.

### Playwright testing (browser testing)

- Screenshot baselines are up to date. Regenerate with `npx playwright test --update-snapshots` after an intentional visual change.

- The component has at least one screenshot baseline per meaningful visual variant.

- Screenshot baselines are retina (2x `deviceScaleFactor`), captured at a fixed 1440×900 viewport with animations disabled.

- Screenshot baselines are Mac-only (`*-chromium-darwin.png`) because CI isn't wired up for Playwright yet.

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
