# Component CSS

When you create or update CSS for an Astro or Preact component, read this checklist ahead of time so it can inform your design, then check it off once your design has been implemented. 

## Checklist

- Every meaningful HTML chunk inside a component should have a BEM class (e.g. `tabs__button--active`) for stable DOM identification. See [BEM class usage](../reference/bem_class_usage.md).

- CSS modules are used where possible. CSS module class names must use the full BEM name including the block prefix (e.g. `.api-method-badge--get`, not `.badge--get`). This is required for the `classListFactory` / `cl()` helper (in `src/utils/classListFactory.ts`) to work: it derives the module class from the BEM name automatically, which only works when they match exactly.
