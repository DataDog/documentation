# Plaintext components

Many components have a **plaintext twin** that emits the same content as a Markdoc AST instead of HTML. These power the `.md.ts` page routes (the plaintext/`llms.txt`-style variant of the API docs). A plaintext twin lives
alongside its component at `src/components/<Name>/plaintext/<Name>.ts`, with tests at `src/components/<Name>/plaintext/<Name>.test.ts`.

When you create or update a plaintext twin — or change the HTML component it mirrors — read this checklist ahead of time so it can inform your design, then check it off once your change is implemented.

## Checklist

### It is a twin, not a new renderer

- The plaintext twin mirrors the behavior of its HTML/Astro/Preact counterpart. Its module docblock names the twin (e.g. "AST twin of `ApiSchemaTable.tsx`"). When the HTML component's content or structure changes, the twin changes in the same way, and vice versa.

- The twin respects the same responsibility boundary as its counterpart. It emits the content the component owns and leaves page-level structure to the route. For example, `apiEndpointNodes` does not emit the operation summary heading — the `.md.ts` route composes the `# Summary` and per-variant headings around it. Don't duplicate page-level structure inside a component twin.

### Build the AST, don't concatenate strings

- Nodes are built with the helpers in [src/lib/plaintext/helpers.ts](../../../src/lib/plaintext/helpers.ts) (`heading`, `paragraph`, `list`, `tableMd`, `tag`, `fence`, `link`, etc.), not by concatenating Markdoc/Markdown strings. The formatter handles attribute escaping, table alignment, and tag wrapping — string building reintroduces the bugs the helpers exist to avoid.

- Free-form markdown content (descriptions and other text whose structure isn't known up front) is turned into nodes with `nodesFromMd`, not hand-built.

- Markdoc tags (e.g. `{% alert %}`, `{% tabs %}`) are produced with the `tag()` helper. Tag attributes are scalars — pass structured data as JSON strings, matching the [Markdoc adapter rule](../reference/markdoc/adapter_components.md).

### Naming

- A function returning a single node is named `<thing>Node` and returns `MarkdocNode | null` (null when there's nothing to render). A function returning a list is named `<thing>Nodes` and returns `MarkdocNode[]`.

- A local array being assembled for output is named `contents` (a `MarkdocNode[]`), not `nodes`.

- An "empty" return for a block-list function is the shared `NO_CONTENT` constant from the helpers, not a fresh `[]`.

### Markdoc imports

- `Ast`, `format`, and `parse` are imported from [src/lib/plaintext/helpers.ts](../../../src/lib/plaintext/helpers.ts), which re-exports them from Markdoc's default export. Don't import these as named exports directly from `@markdoc/markdoc` — that path doesn't round-trip cleanly under Node's ESM loader during the SSG build.

### Testing

- The test asserts the built node has no errors (`expect(node.errors).toHaveLength(0)`).

- The test serializes the node(s) and asserts on the formatted output — a single node with `format(node)`, or a list by wrapping it: `format(documentNode(contents))`. Assert on the Markdoc the twin is responsible for (e.g. the `{% alert %}` wrapper and `level="warning"` attribute), not on incidental whitespace.

- Where the component has meaningful variants, a representative sample is exercised (e.g. all four alert levels).
