# Astro Docs

We intend to eventually deprecate Hugo, having moved all of its content into this Astro site. For now, to avoid breaking existing CI/CD while we build the site, we've left the repo intact and simply added an Astro folder.

## Commands

- `npm run dev` — Start dev server on port 4321
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview the production build locally

## Stack

- **Astro 5** — Static site generator
- **Markdoc** — Content authoring format (`.mdoc` files)
- **Preact** — UI components (TSX)
- **TypeScript** — Strict mode

## CSS architecture

### Tokenized design

Use a tokenized design, where fonts, white space, colors, and so on are controlled by top-level design tokens that could be changed at runtime to support dark mode etc.

### Global styles

Aside from design tokens, limit global styles as much as possible to allow components to be viewed and tested in isolation. Use global styles when avoiding them would result in significant bloat of the component CSS. For example, the default font for the site makes sense as a global style.

In designing the global styles, assume the component will only have access to the `body` tag that encloses it, and maybe a basic `head` tag containing a few global items where absolutely necessary.

### Component CSS

Use the design tokens instead of hard-coding values for spacing etc.

Use CSS modules for component CSS unless specifically directed to use BEM. When directed to use BEM, use the same file structure you would use for CSS modules (one CSS file per component, colocated).

Regardless of whether CSS modules or BEM is used for the CSS rules themselves, give the HTML of each component a BEM class, such as (`tabs__tab--active`), just for DOM identification purposes.

## Component design and testing

Verify components both headlessly (by rendering it to an HTML string using the appropriate library) and in Chrome (using Playwright).

## Component documentation

Provide a dedicated test page for each component that displays its permutations. These folders should be centralized in a content folder that can be suppressed in production.

The test page should include a table of all of the component's properties, and their valid values (along with default values etc. where applicable). For example, the alert component might take a `level` property, in which case the valid values for `level` should be documented on the component page.

### Components not requiring client-side interactivity

Use `.astro` components.

Add tests that verify it both headlessly (by rendering it to HTML) and in Chrome (using Playwright).

### Components requiring client-side interactivity

Use Preact.

