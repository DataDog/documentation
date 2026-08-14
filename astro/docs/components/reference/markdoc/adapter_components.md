## Markdoc adapter components

Markdoc tag attributes are scalars — arrays and objects must be passed as JSON strings. When a component needs typed structured data, write a thin `*Markdoc.astro` wrapper that takes the JSON-string prop, parses it, and forwards the typed value to the real component. Register the wrapper (not the typed component) in `markdoc.config.mjs`.

Naming: suffix Markdoc adapters with `Markdoc` (e.g. `ApiResponseMarkdoc.astro`), not `Island` — they don't hydrate anything. Reserve the `Island` suffix for files that actually use `client:*` directives to mount a Preact component.

Keep the typed component free of JSON-string handling so direct Astro consumers (e.g. another `.astro` component composing it) get a clean typed prop contract.