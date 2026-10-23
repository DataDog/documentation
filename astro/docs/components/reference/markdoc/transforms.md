# Markdoc transforms

Most tags just need `render` — Markdoc maps the tag to a component and passes attributes through. Reach for a `transform(node, config)` only when you need to **restructure the node tree** before it renders: rewrite children, compute derived attributes, or split children into parallel arrays.

Both registered transforms in [markdoc.config.mjs](../../../../markdoc.config.mjs) exist to work around real rendering bugs. Read them before writing a new one.

## Mechanics

- `node.transformChildren(config)` returns the rendered child array; `node.transformAttributes(config)` returns the resolved attributes. Pass both into the `Markdoc.Tag(render, attributes, children)` you return.
- Read the `render` target off `config.tags.<name>.render` rather than re-importing it.
- Computed attributes (like a generated group id from `generateElementId`) are added to the attributes object you pass to `Markdoc.Tag`, then read as props in the component.
