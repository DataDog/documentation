# Markdoc tag / node

When you add or change a Markdoc tag (`{% … %}`) or node override (e.g. `fence`), read this checklist ahead of time so it can inform your design, then check it off once implemented. 

For the underlying mechanics, see the [Registering a tag](../reference/markdoc/registering_a_tag.md).

## Checklist

### Registration is split correctly

- The attribute shape is declared in [markdoc.schema.mjs](../../../markdoc.schema.mjs) (`type`, `default`, `required`, `matches`, `render`), and the wiring (`render`, `transform`, `selfClosing`) is in [markdoc.config.mjs](../../../markdoc.config.mjs), with the schema entry spread in (`...schema.tags.<name>`). See [Registering a tag](../reference/markdoc/registering_a_tag.md).

### Attributes

- All attributes are scalars (`String`/`Number`/`Boolean`). Structured data is passed as a JSON string and parsed by a [Markdoc adapter component](../reference/markdoc/adapter_components.md), never declared as an array/object attribute. See [Attributes](../reference/markdoc/attributes.md).

- Constrained values use `matches` rather than being validated inside the component when possible. Any `default` is mirrored in the component's prop default.

### Self-closing

- A tag with no children sets `selfClosing: true` (see `regionSelector`).

### Transforms

- A `transform` is added **only** if the node tree must be restructured before render. It does not introduce a helper component as a `render` target from inside the transform (such imports don't resolve). See [Transforms](../reference/markdoc/transforms.md).

- If a `transform` is present, it carries a comment stating what breaks without it, at the transform.

- The component does not re-parse rendered slot HTML (`Astro.slots.render()` + cheerio) — restructuring happens at the AST level in the transform.

### Plaintext twin

- If the rendered component has a [plaintext twin](./plaintext.md), the twin emits the same tag via the `tag()` helper with matching attributes, and stays in sync.
