# Astro Docs

## About this project

We intend to eventually deprecate Hugo, having moved all of its content into this Astro site. For now, to avoid breaking existing CI/CD while we build the site, we've left the repo intact and simply added an Astro folder. 

The scope of this new Astro site is just the API docs. In Hugo, the HTML for the API docs can be found in [public/api](../public/api/). Those docs are generated from [the spec YAML in this folder](./../data/api). We've made a copy of that data to use for development of the Astro API docs.

Prompts often refer to the "Hugo docs". This refers either to the general Hugo site setup (footer, header, etc.) or the API docs content specifically, depending on the context of the request.

## Disallowed actions: Do not do these

- Don't run the prod build. Instead, recommend running the prod build to the user as a next or final step.
- Don't read anything in `astro/docs`. That's for humans.
- Do not run irrelevant tests until you're finished with a feature and checking for all regressions.

## Global operating instructions

- Respond concisely. Be blunt.
- If you recommend a different approach than what was asked for, query the user before proceeding.
- Test red to green: Write tests first, and verify that they are failing before implementing the code that will make them pass.

## Testing

- When possible, test files should be localized with the code they're testing.
- Use `npm run test:headless-ai` for the headless (Vitest, mostly unit) tests and `npm run test:browser-ai` for browser (Playwright) tests; `npm run test-ai` runs both. Don't run vitest directly, it will fail to set necessary env variables and will not suppress extraneous tokens.
- Scope your tests tightly. While developing, run only the tests relevant to your change — `npm run test:headless-ai -- <path>` for unit tests, or `npm run test:browser-ai -- <file>` for browser tests. Run the full `npm run test-ai` (both suites) once before considering the feature done, to catch broader regressions.
- Components should have both unit and browser tests, with browser tests covering just the cases that unit tests cannot.
- Where possible, use the stable (non-hashed) BEM class as a selector, and as a verification of the component state (for example, use the relevant stable BEM class to verify that the correct tab is active). When a non-BEM direct property is very straightforward to check (like visibility), you can check that too.

## CSS

- Where possible, use design tokens, not hardcoded values. This is to support dark mode, alternative views offering larger font sizes, etc.
- Where applicable, provide a dark mode style for an element using the design tokens.
- In terms of their names, design tokens should be reusable, not tightly coupled to a specific component. Follow the existing naming conventions.

## Stay inside `astro/`

Do not edit any files outside the `astro/` directory. Everything outside this folder belongs to the live Hugo site.

This applies even when the Astro work would benefit from it. For example: if an Astro component needs a translation key that doesn't yet exist in `i18n/en.json`, **do not add it**. Hardcode the English string with a `TODO` comment so the key can be added authoritatively later.

If a task seems to require a Hugo-side change, stop and ask first.

## Commands

- `npm run dev` — Start dev server on port 4321
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview the production build locally

## Stack

- **Astro 5** — Static site generator
- **Markdoc** — Content authoring format (`.mdoc` files)
- **Preact** — UI components (TSX)
- **TypeScript** — Strict mode

## Coding guidelines

- Long var names are better than unclear var names. For example, when looping over an array of buttons, use `button` as the loop variable, not `b`.
- Type-mapped and attribute-mapped var names are helpful. For example, an array of `SomeType` could just be called `someTypes`. A record of `SomeType`s keyed by `id` could be `someTypesById`.
- When a component or function has deeply nested elements or loops, look for opportunities to break it up into subcomponents (especially in Preact, where subcomponents can be included in the same file) or private functions.
- When possible, aim for highly readable top-level driver code, which should mostly be invocations of clearly named functions that provide a narrative to a human reader.

## Mocked dependencies vs. test fixtures

These are two different things, both used to decouple this site from external state. Don't conflate them.

### Mocked dependencies — dev-time placeholders

The [mocked-dependencies folder](./src/mocked-dependencies/) contains stand-ins for external resources that aren't yet available to us at runtime. For example, [mocked-dependencies/websites_modules/](./src/mocked-dependencies/websites_modules/) holds placeholder data the dev server reads when the real `websites-modules` source isn't wired up.

Anytime you're building a feature that depends on some external resource that isn't yet plumbed in, add a placeholder for it to `mocked-dependencies/` so the dev server and build can run.

### Test fixtures — frozen test inputs

Test fixtures live under [tests/fixtures/](./tests/fixtures/), **not** in `mocked-dependencies/`. They are intentionally small, frozen snapshots of real upstream data, kept stable so unit tests don't churn every time the live source changes. For example, [tests/fixtures/api/](./tests/fixtures/api/) is a trimmed copy of the live Hugo API spec.

These fixtures are **frozen and hand-maintained** — there is no regeneration step. They were originally seeded from the live spec, then trimmed (only the audited tags/paths are kept, and explosive recursive `oneOf`s like `WidgetDefinition` are capped to a few representative variants). If a change needs spec data not present in the fixture, edit the fixture YAML directly to add it, then update snapshots with `npm test -- -u`. Treat the fixture as the source of truth, not a derived artifact.

The unit Vitest config redirects live spec imports to these fixtures via a plugin in [vitest.unit.config.ts](./vitest.unit.config.ts); the integration config deliberately does not, so it validates against the real upstream data.

## Components

- Use CSS modules with full BEM classes, for compatibility with `classListFactory` (which generates the `cl` function that applies hashed BEM classes automatically based on a static BEM class name).
- Use `i18n` to localize strings where possible, or use a `TODO` comment if Hugo does not yet have the desired i18n string. Pass `i18n` labels to Preact using a `labels` prop.
- Pass inline svgs to Preact using an `svgs` prop.
- If a component is static (not interactive, no JS needed), use vanilla Astro.
- If a component is interactive, use Preact.
- Where possible, each component should have its own isolated scope.
- In cases when giving a Preact component an isolated scope would require you to pass very large props (like the pre-rendered HTML of a tab, or a very large data blob for an API schema table), use a [hybrid approach](#hybrid-example) where a vanilla Astro component does most of the rendering, and a small Preact component controls interactivity. Do not do this unless the props would be large otherwise, because isolated JS scope is strongly preferred!

### `cl()` usage example

`cl` applies both the hashed CSS module class and the plain static class, so both are present in the rendered HTML.

```astro
---
import styles from "./Alert.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";

const cl = classListFactory(styles);
---

<div class={cl("alert", `alert--${level}`)}>
  <strong class={cl("alert__label")}>{label}</strong>
  <slot />
</div>
```

### Hybrid example

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
