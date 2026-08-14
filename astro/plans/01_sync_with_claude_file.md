# Sync the Astro site with the CLAUDE.md file

## Prompt

I just updated the `CLAUDE.md` file in this folder. But this Astro site doesn't follow the guidelines.

Fill out the plan section below with a plan for updating the site code to follow the guidelines.

## Claude's plan

### Summary of gaps

The CLAUDE.md defines standards for CSS architecture, component design, testing, and documentation. The current site deviates in several ways:

| Guideline | Current state | What needs to change |
|---|---|---|
| Tokenized design system | All colors, spacing, and fonts are hardcoded values | Create design tokens as CSS custom properties |
| Minimal global styles | Global styles duplicated inline in both `index.astro` and `[...slug].astro` | Extract to a single shared global stylesheet |
| CSS modules for component CSS | Inline JS styles in Alert and Counter | Move to `.module.css` files colocated with components |
| BEM classes on HTML elements | No BEM classes anywhere | Add BEM classes to all component HTML for DOM identification |
| Non-interactive components use `.astro` | Alert is a Preact `.tsx` component despite having no interactivity | Convert Alert to an `.astro` component |
| Component tests (headless + Playwright) | No tests exist | Add headless render tests and Playwright browser tests |
| Component documentation pages | No test/demo pages | Create a test page per component showing permutations and a property table |

---

### Step 1: Create the design token system

Create `src/styles/tokens.css` with CSS custom properties for:
- **Colors**: brand purple, text colors, border colors, alert-level colors (info, warning, error, success), link colors
- **Spacing**: a scale (e.g., `--space-xs` through `--space-xl`)
- **Typography**: font family stack, font sizes, line heights
- **Borders**: border widths, radii

Import this file in a shared global stylesheet so all components can reference the tokens.

### Step 2: Create a minimal global stylesheet

Create `src/styles/global.css` that:
- Imports `tokens.css`
- Sets the base font family on `body` using the font token
- Sets base text color and background using tokens
- Sets a max-width container and auto margins (currently duplicated in both pages)
- Styles links using the brand color token
- Avoids anything component-specific

### Step 3: Create a shared layout

Create `src/layouts/BaseLayout.astro` that:
- Includes the `<head>` with the global stylesheet import
- Wraps page content in a `<body>` and container `<div>`
- Replaces the duplicated HTML boilerplate in `index.astro` and `[...slug].astro`

Update both pages to use this layout.

### Step 4: Convert Alert from Preact to Astro

Since Alert has no client-side interactivity (it just renders colored boxes with content), it should be an `.astro` component per the guidelines:

- Create `src/components/Alert.astro` using an Astro component with a `<slot>` for children
- Create `src/components/Alert.module.css` with styles using design tokens
- Add BEM class: `alert alert--info`, `alert--warning`, `alert--error`, `alert--success`
- Update `markdoc.config.mjs` to point the `alert` tag at the new Astro component
- Delete the old `Alert.tsx`

### Step 5: Restyle Counter with CSS modules and BEM

Counter is interactive (uses `useState`), so it correctly uses Preact. But it needs styling changes:

- Create `src/components/Counter.module.css` with styles using design tokens
- Replace inline styles in `Counter.tsx` with CSS module class references
- Add BEM classes: `counter`, `counter__button`, `counter__display`

### Step 6: Add component tests

Install testing dependencies:
- `@playwright/test` for browser tests
- A suitable library for headless Astro component rendering (e.g., `astro-component-tester` or a custom approach using Astro's `renderToString` API)

**Alert tests:**
- Headless: render each alert type to HTML, verify correct BEM class and content
- Playwright: navigate to the Alert test page, verify each variant renders visually

**Counter tests:**
- Headless: render Counter to HTML, verify initial state markup
- Playwright: navigate to the Counter test page, click +/- buttons, verify count updates

### Step 7: Create component documentation pages

Create a content directory for component demos (e.g., `src/content/docs/components/`) with:

**`alert.mdoc`** — Alert component test page:
- Property table listing `type` prop with valid values (`info`, `warning`, `error`, `success`) and default (`info`)
- Live examples of each alert type with sample content

**`counter.mdoc`** — Counter component test page:
- Property table listing `initialCount` prop, type (number), default (0)
- Live examples: default counter, counter starting at 10

Add a components index page or section linking to these from the homepage, with a note that these pages are for development/testing and should be suppressed in production.

---

### Execution order

Steps 1–3 (tokens, global styles, layout) should be done first since everything else depends on them. Steps 4–5 (component restyling) come next. Steps 6–7 (tests and docs) can follow in either order.

