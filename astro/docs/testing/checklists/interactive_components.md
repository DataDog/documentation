# Interactive components testing checklist

When writing or updating tests for an interactive Preact component, read this checklist ahead of time so it can inform your approach, then check it off once your tests are implemented.

Also verify all items in the [general testing checklist](./all.md).

## Checklist

### Setup

- `cleanup()` from `@testing-library/preact` is called in an `afterEach` to prevent DOM leakage between tests.

- Test files that render components are opted into the happy-dom environment with a docblock at the top: `// @vitest-environment happy-dom`.

### Headless testing (Vitest)

- Preact components are rendered with `@testing-library/preact`.

- User interactions are driven with `@testing-library/user-event`.

- The tests cover any potential user interactions (clicking, typing, keyboard navigation).

- The tests cover the visibility states of any elements that can be revealed or hidden.

- The tests assert that the correct BEM modifier classes (e.g. `tabs__button--active`) are applied after interaction. These classes are the stable DOM hook for identifying component state; CSS-module hashes are not.
