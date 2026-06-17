# Registering a Markdoc tag or node

A Markdoc tag (`{% alert %}`) or node override (the `fence` for code blocks) is registered across **two** files. Keep the split:

- **Shape** lives in [markdoc.schema.mjs](../../../../markdoc.schema.mjs) — the attribute contract Markdoc validates against: `type`, `default`, `required`, `matches`, and `render`.
- **Wiring** lives in [markdoc.config.mjs](../../../../markdoc.config.mjs) — what the tag renders to (`render`), any `transform`, and `selfClosing`. The config entry spreads the schema entry in: `...schema.tags.alert`.

This keeps the schema readable as a flat catalog of attribute shapes while the config holds the behavior.

## Adding a tag

1. Add the attribute shape to `markdoc.schema.mjs` under `tags.<name>`:

   ```js
   alert: {
     attributes: {
       level: { type: String, default: "info", matches: ["info", "danger", "warning", "tip"] },
     },
   },
   ```

2. Wire it in `markdoc.config.mjs` under `tags.<name>`, spreading the schema entry:

   ```js
   alert: {
     render: component("./src/components/Alert/Alert.astro"),
     ...schema.tags.alert,
   },
   ```

3. If the tag takes no children, set `selfClosing: true` (see `regionSelector`).

4. If the tag needs typed/structured data, register a [Markdoc adapter component](./adapter_components.md), not the typed component.

5. If the tag needs to restructure its children or children's attributes before render, add a [`transform`](./transforms.md).

## Notes

- The render target is a `component("./src/...")` path **relative to the project root**, not to the config file.
- `nodes` (like `fence`) override built-in Markdown constructs; `tags` add new `{% %}` constructs. A `fence` override must spread the built-in `nodes.fence.attributes` so it keeps Markdown's own attributes alongside the custom ones.
