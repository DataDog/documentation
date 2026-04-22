# Astro Docs

We intend to eventually deprecate Hugo, having moved all of its content into this Astro site. For now, to avoid breaking existing CI/CD while we build the site, we've left the repo intact and simply added an Astro folder. Prompts will often refer to the "Hugo docs", which is referring either to the general Hugo site setup or the API docs specifically, depending on the context of the request.

The scope of this new Astro site is just the API docs. In Hugo, the HTML for the API docs can be found in [public/api](../public/api/). Those docs are generated from [the spec YAML in this folder](./../data/api). We've made a copy of that data to use for development of the Astro API docs.

## Operating instructions

- Never assume I know what I'm talking about. If you have a better idea, raise it. If there is a security concern or other concern with what I'm doing, raise it. If I left gaps in my instructions, ask questions.
- When you update a component, be sure to update its tests and documentation page.
- After you implement something, list any best practices you used that aren't well known, such as using `data-testid` as a flexible ID for Playwright tests.

## Commands

- `npm run dev` — Start dev server on port 4321
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview the production build locally

## Stack

- **Astro 5** — Static site generator
- **Markdoc** — Content authoring format (`.mdoc` files)
- **Preact** — UI components (TSX)
- **TypeScript** — Strict mode

## SEO

Render as much content at build time as possible. Light rehydration on the client is fine, but all of the content should be rendered at build time as well, even if it's not visible yet. For example, the content of all tabs should be rendered, not just the active tab.

## Mocked dependencies

The [mocked_dependencies folder](./src/mocked_dependencies/) contains any external resources that are not yet available to us. For example, [mocked_dependencies/api](./src/mocked_dependencies/api/) contains a copy of the API data available to Hugo ([folder in the Hugo site](../data/api)).

Anytime you're building a feature that depends on some external resource, add a mock/snapshot of that external resource to the `mocked_dependencies` folder, and update the inventory section of the [README](./src/mocked_dependencies/README.md).

## CSS architecture

### Tokenized design

Use a tokenized design, where fonts, white space, colors, and so on are controlled by top-level design tokens that could be changed at runtime to support dark mode etc.

Design tokens should not be tied to a particular element, with the exception of very high-level layout tokens. For example, colors should just be colors, not tokens for "breadcrumb color" or "footer background color." If the token is not reusable across a variety of components, it's probably not a good token.

#### Token naming conventions

Token names describe appearance or role, never a specific component:

| Category | Prefix | Examples |
|---|---|---|
| Status indicators | `--color-{info,caution,warning,accent}[-emphasis]` | `--color-info`, `--color-warning-emphasis` |
| Panels (bordered boxes) | `--color-panel-*` | `--color-panel-bg`, `--color-panel-accent` |
| Surfaces (data layers) | `--color-surface-*` | `--color-surface-header`, `--color-surface-border` |
| Inline highlights | `--color-highlight-*` | `--color-highlight-bg`, `--color-highlight-text` |
| Named colors (badge pairs) | `--color-{name}[-tint]` | `--color-teal`, `--color-crimson-tint` |
| Spacing | `--space-{size}` | `--space-2xs`, `--space-xs`, `--space-sm` |
| Border radius | `--border-radius[-size]` | `--border-radius-sm`, `--border-radius-md` |

Every token defined in `:root` must have a corresponding dark mode override in `[data-theme='dark']` if the value would look wrong on a dark background.

### Global styles

Aside from design tokens, limit global styles as much as possible to allow components to be viewed and tested in isolation. Use global styles when avoiding them would result in significant bloat of the component CSS. For example, the default font for the site makes sense as a global style.

In designing the global styles, assume the component will only have access to the `body` tag that encloses it, and maybe a basic `head` tag containing a few global items where absolutely necessary.

### Component CSS

Use the design tokens instead of hard-coding values for spacing etc.

Use CSS modules for component CSS unless specifically directed to use BEM. When directed to use BEM, use the same file structure you would use for CSS modules (one CSS file per component, colocated).

Regardless of whether CSS modules or BEM is used for the CSS rules themselves, give the HTML of each component a BEM class, such as (`tabs__tab--active`), just for DOM identification purposes.

## Component design and testing

Verify components both headlessly (in vitest) and in Chrome (using Playwright).

### Headless tests (vitest)

- **Non-interactive components** (`.astro`, or Preact components that are pure render): render to an HTML string with `preact-render-to-string` or equivalent and assert on the output. Runs in node env — fast.
- **Interactive components** (Preact components with state, effects, or event handlers): render with `@testing-library/preact`, drive interactions with `@testing-library/user-event`, and assert on resulting DOM state. Every interactive component's headless test must cover:
  1. **Interactivity** — simulate the key user interactions (click, type, keyboard navigation) and verify the DOM updates.
  2. **Visibility** — assert the correct element becomes visible / hidden after interaction.
  3. **BEM class state** — assert the correct BEM modifier classes (e.g. `tabs__button--active`) are applied after interaction. These classes are the stable DOM hook for identifying component state; CSS-module hashes are not.

Opt a test file into the happy-dom environment with a docblock at the top:

```ts
// @vitest-environment happy-dom
```

Call `cleanup()` from `@testing-library/preact` in an `afterEach` to prevent DOM leakage between tests.

### Browser tests (Playwright)

Keep Playwright coverage focused on what happy-dom can't verify: cross-browser rendering, visual layout, overflow/resize behavior, and end-to-end integration across islands. Don't duplicate every interactivity assertion in both layers — pick the one the interaction actually depends on.

## Component documentation

Provide a dedicated test page for each component that displays its permutations. These folders should be centralized in a content folder that can be suppressed in production.

The test page should include a table of all of the component's properties, and their valid values (along with default values etc. where applicable). For example, the alert component might take a `level` property, in which case the valid values for `level` should be documented on the component page.

### Components not requiring client-side interactivity

Use `.astro` components. Test per the "Non-interactive components" section above.

### Components requiring client-side interactivity

Use Preact. Test per the "Interactive components" section above.

