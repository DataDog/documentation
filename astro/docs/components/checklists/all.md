# Components

When you create or update a component, read this checklist ahead of time so it can inform your design, then check it off once your design has been implemented. 

Query the user if you recommend another approach in any case.

## Checklist

### CSS

- All items in the [CSS checklist](../../css/checklists/all.md) have been verified.

### Non-interactive (static) components

- The items in the [static components checklist](./static.md) are satisfied.

### Interactive components

- The items in the [interactive components checklist](./interactive.md) are satisfied.

### Plaintext twin

- If the component has a plaintext twin (an AST renderer under `plaintext/` that feeds the `.md.ts` routes), the items in the [plaintext components checklist](./plaintext.md) are satisfied, and the twin stays in sync with this component's content.

### Internationalization

- All of the component's recurring display text (for example, the "warning" label on an alert component) is either translated using `i18n()` or has a `TODO` comment to add i18n translation functionality, when a new `i18n` key would be needed.

### Inline SVGs

- Inline SVG strings are passed as a single `svgs` prop (a keyed object), never as individual named props like `carrotSvg`. The svgs interface is exported from the component file. See [Passing inline SVGs into components](#passing-inline-svgs-into-components).

### SEO

- All of the component's content is rendered at build time. Light rehydration on the client is fine, but all of the content should be rendered at build time as well, even if it's not visible yet. For example, the content of all tabs should be rendered, not just the active tab.  

### Documentation (used in browser testing)

- The component's documentation page is up to date. Documentation pages live in `src/content/docs/test_pages/components/`, named after the component in kebab-case (e.g. `alert.mdoc`, `code-block.mdoc`).

- The test page includes a table of all of the component's properties, and their valid values (along with default values etc. where applicable). For example, the alert component might take a `level` property, in which case the valid values for `level` should be documented on the component page.

### General testing

- When possible, tests use the component's BEM class names as selectors. Use the stable BEM classes. See [the example](#accessing-components-in-tests). Use `data-testid` only where no stable class exists and adding one would be awkward (e.g. purely structural fixtures inside tests).

### Headless testing (Vitest)

- The component's headless tests are up to date. These live alongside the component in `src/components/<ComponentName>/` (e.g. `Alert.test.ts`). 

- Where applicable, test files are opted into the happy-dom environment with a docblock at the top: `// @vitest-environment happy-dom`.

### Playwright testing (browser testing)

- The component's browser tests are up to date. These live in `tests/browser/` (e.g. `alert.spec.ts`). Update screenshot baselines if the visual output changed (`npx playwright test --update-snapshots`).

- Playwright coverage is focused on what happy-dom can't verify: cross-browser rendering, visual layout, overflow/resize behavior, and end-to-end integration across islands. Don't duplicate every interactivity assertion in both layers.

- Screenshot baselines are up to date. You can update them with `npx playwright test --update-snapshots`.

- The component has at least one screenshot baseline per meaningful visual variant.

- Screenshot baselines are retina (2x `deviceScaleFactor`) and are captured at a fixed 1440×900 viewport with animations disabled.

- Screenshot baselines are Mac-only (`*-chromium-darwin.png`) because this project is in early stages and CI isn't wired up for Playwright yet.

### Markdoc compatibility

- Markdoc tag attributes are scalars — arrays and objects must be passed as JSON strings. When a component needs typed structured data, [a Markdoc adapter component](../reference/markdoc/adapter_components.md) is used to bridge the gap between attribute types and prop types.

## Examples

### Accessing components in tests

Use the stable BEM class names (not CSS-module hashes) in test assertions and Playwright selectors.

```ts
// Vitest — assert BEM modifier is applied
expect(html).toContain("alert--info");

// Playwright — locate by BEM class
await page.locator(".alert--warning").screenshot();
```
