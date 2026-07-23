# Avoiding large serialized Preact props

We prefer that Preact islands do not reach outside their own scope to manipulate elements. Where you can, enclose everything inside of the Preact component so that the component can be fully isolated and contained. 

But sometimes this is not possible without bloating the HTML too severely, because the parent Astro island may need to pass large serialized props to the Preact component, such as pre-rendered HTML or a very large data object. This doubles page weight for content-heavy components. It also forces Preact to re-render content that Astro already produced at build time.

For example, if rendered HTML were passed as a prop to a Preact component, the browser would receive that HTML twice: once serialized into the component's prop attributes and once in the static DOM. 

Avoid design patterns that require large chunks of rendered HTML to be serialized as props.

Instead, wrapper components like `CodeBlock` and `Tabs` render their content in the Astro parent, not inside the Preact island. The Preact island is kept small and interacts with already-rendered DOM elements via IDs, so it can avoid requiring large props.

## Implementation steps

1. Render the actual content in the `.astro` file using `<slot />` or `set:html`.
2. Pass DOM references to the Preact island using the `externalContext` prop (typed as `ExternalContext<E>` from `src/utils/loadExternalContext.ts`). This prop carries a `scope` ID (the root element) and an `entries` map of named element IDs. Call `loadExternalContext(externalContext)` inside the island to resolve them to `HTMLElement` references at runtime.
3. The Preact island reads and manipulates the already-rendered DOM nodes (show/hide, copy text, toggle classes) using those references.

## Code example

This example is drawn from `CodeBlock` and its `CollapseToggle` island.

**Step 1 — render content in the `.astro` file, assign IDs, pass references to the island:**

```astro
---
// Disclosure.astro
import { DisclosureToggle } from "./DisclosureToggle";

const rootId = "disclosure-1";
const contentId = `${rootId}-content`;
---

<div id={rootId}>
  <DisclosureToggle
    client:idle
    externalContext={{
      scope: rootId,
      entries: { contentEl: contentId },
    }}
  />
  <div id={contentId}>
    <slot />
  </div>
</div>
```

**Step 2 — resolve references at runtime inside the island:**

```tsx
// DisclosureToggle.tsx
import { useEffect, useRef, useState } from "preact/hooks";
import {
  loadExternalContext,
  type ExternalContext,
} from "@lib/componentUtils/loadExternalContext";

interface Props {
  externalContext: ExternalContext<{ contentEl: string }>;
}

export function DisclosureToggle({ externalContext }: Props) {
  const [open, setOpen] = useState(true);
  const contentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const loaded = loadExternalContext(externalContext);
    if (!loaded) return;
    contentRef.current = loaded.contentEl;
  }, []);

  const handleToggle = () => {
    const next = !open;
    setOpen(next);
    if (contentRef.current) {
      contentRef.current.hidden = next;
    }
  };

  return (
    <button onClick={handleToggle} aria-expanded={open}>
      {open ? "Collapse" : "Expand"}
    </button>
  );
}
```

**Step 3 — the island reads and manipulates the already-rendered DOM node** (`contentRef.current.hidden = next`) without the content ever crossing the island prop boundary.

