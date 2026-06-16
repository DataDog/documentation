# Components

When you create or update a component, read this checklist ahead of time so it can inform your design, then check it off once your design has been implemented. 

## Checklist

### Markdoc vs. vanilla Astro

- The component is only configured as a Markdoc component if it would logically be used inside `.mdoc` files. For example, the site header does not need to be a Markdoc component; that would just complicate the implementation and clutter the Markdoc schema for no benefit.

### CSS

- All items in the [CSS checklist](../../css/checklists/all.md) have been verified.

### Documentation page

- The component has a documentation page at `src/content/docs/test_pages/components/<component-name>.mdoc` (kebab-case). Documentation pages are used to drive Playwright browser tests.

- The documentation page includes a table of all the component's properties, their valid values, and default values.

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

### Testing

- All items in the [testing checklist](../../testing/checklists/all.md) have been verified.

### Markdoc compatibility

- Markdoc tag attributes are scalars — arrays and objects must be passed as JSON strings. When a component needs typed structured data, [a Markdoc adapter component](../reference/markdoc/adapter_components.md) is used to bridge the gap between attribute types and prop types.

