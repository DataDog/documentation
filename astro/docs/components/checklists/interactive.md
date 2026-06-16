# Interactive components

When you create or update an interactive component, read this checklist ahead of time so it can inform your design, then check it off once your design has been implemented.

## Checklist

### Architecture

- Components with client-side interactivity are implemented in Preact, not vanilla Astro.

- Very large props are not being serialized and passed from an Astro island to a Preact component -- for example, extensive pre-rendered HTML or a very large data structure. If you detect large serialized props, query the user for whether they want to use the [Astro-Preact island pattern](../reference/preact/avoiding_large_props.md).

- When possible, the component functions in a completely isolated scope.

### Testing

- `cleanup()` from `@testing-library/preact` is called in an `afterEach` to prevent DOM leakage between tests.

### Headless testing (Vitest)

- Preact components are rendered with `@testing-library/preact`.

- User interactions are driven with `@testing-library/user-event`.

- The tests cover any potential user interactions (clicking, typing, keyboard navigations).

- The tests cover the visibility states of any elements that can be revealed or hidden.

- The tests assert that the correct BEM modifier classes (e.g. `tabs__button--active`) are applied after interaction. These classes are the stable DOM hook for identifying component state; CSS-module hashes are not.

### Translation

- All translated strings passed to Preact islands are passed through a single `labels` prop resolved in the `.astro` frontmatter. Preact islands run on the client and have no access to the build-time-only `i18n()` helper. Export the labels interface from the component file so callers can type-check their values. See [the example](../reference/preact/passing_i18n_labels.md).

### Inline SVGs

- Inline SVG strings are passed to Preact components as a single `svgs` prop (a keyed object), never as individual named props like `carrotSvg`. See [the example](../reference/preact/passing_inline_svgs.md).

- The `svgs` interface is exported from the component file.
