# Markdoc tag attributes

Tag attributes are declared in [markdoc.schema.mjs](../../../../markdoc.schema.mjs) and validated by Markdoc before the tag renders. See [Registering a tag](./registering_a_tag.md) for where the declaration lives.

## Attributes are scalars

A Markdoc attribute can be a `String`, `Number`, or `Boolean` — **not** an array or object. When a component needs structured data, pass it as a JSON string and parse it in a thin [adapter component](./adapter_components.md) that forwards the typed value to the real component. This rule applies identically to [plaintext twins](../../checklists/plaintext.md), which produce tags with the `tag()` helper.

## Declaring the shape

```js
level: {
  type: String,
  default: "info",            // value used when the author omits the attribute
  matches: ["info", "danger", "warning", "tip"],  // allowed values; others fail validation
  required: true,             // validation error when omitted
  render: true,               // pass this attribute through to the rendered component
},
```

- `default` makes the attribute optional and supplies a fallback. Mirror the default in the component's prop default so direct (`.astro`) consumers behave the same.
- `matches` enumerates allowed values (or takes a regex). Prefer it over validating inside the component — authors get an error at build time, near the content.
- `required` and `default` are mutually exclusive in practice; a required attribute has no default.
- For node overrides like `fence`, spread the built-in attributes (`...nodes.fence.attributes`) before your custom ones so Markdown's native attributes survive.

## Keep the typed contract clean

The real component should receive a typed prop (`level: "info" | "danger" | …`, `regions: ClientRegion[]`), never a raw JSON string. The JSON-string handling belongs in the adapter so that another `.astro` component composing the typed component gets a clean prop contract. See [adapter components](./adapter_components.md).
