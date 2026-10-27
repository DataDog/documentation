# Astro docs

This file guides AI coding agents, such as Claude Code, Codex, and Cursor, when they work in the `astro/` folder. `CLAUDE.md` imports this file, so make all edits here, not in `CLAUDE.md`.

# Warning: This site is in development

These docs are not live yet, and updating them has no impact on [the production site](https://docs.datadoghq.com). 

If someone who has never contributed to the `astro` folder asks you to revise these docs, they might be in the wrong place. Ask them if they're trying to revise the content published on the docs site. If so, advise them to make revisions in [the `hugo` folder](../hugo/) instead. If the contributor is changing the `/api/` docs on Hugo, it may be appropriate for them to update the `astro` files as well, in order to avoid drift between the two.

## About the Astro site

We're migrating some of our docs content from Hugo (located in the `hugo` folder) to Astro. The site contains two types of docs:

| Doc type | Description | Status |
| --- | --- | --- |
| API docs | The API reference under `/api/`. Generated from the OpenAPI spec bundle and SDK code examples, and prerendered at build time. | In QA against the Hugo API docs. Not live. |
| Product docs | All other docs. `.mdoc` files in `src/content/en/`, rendered on demand (SSR). Pages with `content_filters` are filterable docs (cdocs). | Proof of concept. Only test fixtures in `dd_e2e/`. |

## The Hugo site

You may sometimes be asked to implement something "similar to the Hugo site" or "matching the Hugo site." Unless otherwise stated, this instruction does **not** require an exact cosmetic match to Hugo, and it does not represent a request to ignore any of the Astro-specific conventions below. 

Instead, aim to provide a similar layout and user experience, but use Astro conventions, such as BEM classes and design tokens. Even when an exact cosmetic match is requested, Astro conventions can still apply, but you may need to create special `--hugo` prefixed tokens to indicate legacy measurements.

If the user has built the Hugo site, the rendered Hugo HTML can be found in the [hugo/public](../hugo/public/) folder.

## Hugo dependencies

The Astro site is not fully decoupled from the Hugo site yet; it still loads resources from the `hugo` folder. These shared dependencies will gradually be migrated to a more appropriate location (for example, the `shared` folder).

Site code should only import `hugo` files through the `@hugo-site` alias, so these dependencies are easy to find. 

A few build scripts and the [`websites-modules` lookup](src/lib/site/websitesModulesPath.ts) read from `hugo/` directly, since the alias cannot be used in those contexts.

## Future site scope

This site will eventually have tens of thousands of pages, with most of them rendered using SSR (the API docs are an unusual exception since they're rendered statically). When designing solutions, keep this in mind, since many solutions are not performant at the scale of 30K+ pages being rendered.

## Disallowed actions: Do not do these

- Don't run the prod build. Instead, recommend running the prod build to the user as a next or final step. If `yarn build:en` will suffice, recommend that instead of the full build.
- Do not run irrelevant tests until you're finished with a feature and checking for all regressions.

## Global operating instructions

- Respond concisely. Be blunt.
- If you recommend a different approach than what was asked for, query the user before proceeding.
- Test red to green: Write tests first, and verify that they are failing before implementing the code that will make them pass. For cosmetic changes, like adjusting spacing or font sizes, snapshot coverage is preferred over programmatic tests, since snapshots are easier for humans to verify when they break.

## Formatting

- After editing code, run `yarn format` from `astro/` — but scope it to the files you touched (`npx prettier --write <paths>`) unless the user has asked for a project-wide sweep. Most of the tree is not yet Prettier-clean, so a bare `yarn format` rewrites hundreds of unrelated files.
- Run it from `astro/`, never from the repo root. Prettier resolves the *nearest* config to each file and uses it wholesale (there is no cascade or `extends`), so files here get `astro/.prettierrc` — 2-space, plus `prettier-plugin-astro`. The repo-root `prettier.config.js` is Hugo's (4-space, single quotes, 120 cols) and must not be applied to this project.
- Use `yarn format:check` to see what would change without writing.
- `astro/.prettierignore` exists because Prettier does not read `.gitignore`. Add generated or vendored trees there rather than letting Prettier walk them.

## Testing

- When possible, test files should be localized with the code they're testing.
- Use `yarn test:headless-ai` for the headless (Vitest, mostly unit) tests and `yarn test:browser-ai` for browser (Playwright) tests; `yarn test-ai` runs both. Don't run vitest directly, it will fail to set necessary env variables and will not suppress extraneous tokens.
- Scope your tests tightly. While developing, run only the tests relevant to your change — `yarn test:headless-ai <path>` for unit tests, or `yarn test:browser-ai <file>` for browser tests. Run the full `yarn test-ai` (both suites) once before considering the feature done, to catch broader regressions.
- Components should have both unit and browser tests, with browser tests covering just the cases that unit tests cannot.
- Where possible, use the stable (non-hashed) BEM class as a selector, and as a verification of the component state (for example, use the relevant stable BEM class to verify that the correct tab is active). When a non-BEM direct property is very straightforward to check (like visibility), you can check that too.

## CSS

- Where possible, use design tokens, not hardcoded values. This is to support dark mode (a planned feature), alternative views offering larger font sizes, etc.
- In terms of their names, design tokens should be reusable, not tightly coupled to a specific component. Follow the existing naming conventions.
- Only when an exact cosmetic match with the Hugo site is explicitly requested, use (or add) a legacy token with the `--hugo-` prefix in [src/styles/tokens/hugo.css](src/styles/tokens/hugo.css). These replicate Hugo's exact pixel values and will be deprecated along with Hugo, so don't use them otherwise.

## Stay inside `astro/`, aside from the listed exceptions

Everything outside this folder belongs to the live Hugo site. In the course of Astro docs development work, do not edit anything outside of the `astro` folder without permission, with the following exceptions, needed to route/deploy the Astro `/api` app alongside Hugo:

- Root `Caddyfile` (local dev router).
- `hugo/Makefile`: dev/deploy targets only (e.g. `start-proxied`), never content or build-script targets.
- `.github/workflows/preview_link.yml`.
- `hugo/local/bin/py/preview_links.py` and `hugo/local/bin/py/preview-links-template.mako`.
- `shared/i18n`, to add new translation labels used in components or other Astro objects.

If a task seems to require any other Hugo-side change, stop and ask first.

## No deploy code in this repo

This repository is public and holds no execution logic for deployment. Hugo's deploy is *declared* in `hugo/config/{preview,live}/config.yaml` and *executed* entirely by tooling from the CI image. Astro's deploy follows the same rule: it lives as job `script:` steps in `DataDog/documentation-ci`.

Nothing under `astro/` may contain:

- calls to the `aws` CLI or an AWS SDK
- S3 bucket names or key prefixes
- CloudFront distribution IDs, or invalidation logic
- IAM role ARNs, role assumption, or any credential handling

`astro/scripts/verifyDist.mjs` is the boundary: it verifies the *shape* of `dist/client` and knows nothing about where that output is uploaded. Build-output verification belongs here; anything that talks to a cloud provider does not.

One exception: `scripts/lib/websitesSourcesData.ts` reads two public tarballs from the `websites-sources` bucket — the data tarball, for the SDK versions `yarn fetch:examples` clones at, and the API docs bundle (`latest-api-docs.tar.gz`), which `yarn fetch:spec` stages into `api-spec/`. Keep those reads confined to this one file — nothing else under `astro/` should import `tar` or know a tarball's URL. Both are anonymous HTTPS GETs; everything above still applies.

## Commands

For local setup, see [README.md](README.md).

- `yarn dev` — Start dev server on port 4321
- `yarn build` — Production build to `dist/`
- `yarn preview` — Preview the production build locally
- `yarn format` — Prettier-format this project in place (project-wide; see Formatting)
- `yarn format:check` — Report unformatted files without writing

## Stack

- **Astro 7** — Static site generator
- **Markdoc** — Content authoring format (`.mdoc` files)
- **Preact** — UI components (TSX)
- **TypeScript** — Strict mode

## Coding guidelines

- Long var names are better than unclear var names. For example, when looping over an array of buttons, use `button` as the loop variable, not `b`.
- Type-mapped and attribute-mapped var names are helpful. For example, an array of `SomeType` could just be called `someTypes`. A record of `SomeType`s keyed by `id` could be `someTypesById`.
- When a component or function has deeply nested elements or loops, look for opportunities to break it up into subcomponents (especially in Preact, where subcomponents can be included in the same file) or private functions.
- When possible, aim for highly readable top-level driver code, which should mostly be invocations of clearly named functions that provide a narrative to a human reader.

## websites-modules icons

Some components need SVGs from the `websites-modules` icon font, which the Astro site doesn't load yet. Put these SVGs in [src/assets/images/websites-modules/](./src/assets/images/websites-modules/), named after the icon's font class (for example, `twitter-x.svg` for `icon-twitter-x`).

## Test fixtures

Test fixtures live under [tests/fixtures/](./tests/fixtures/). They are intentionally small, frozen snapshots of real upstream data, kept stable so unit tests don't churn every time the live source changes. For example, [tests/fixtures/api/](./tests/fixtures/api/) is a trimmed copy of the live Hugo API spec.

These fixtures are **frozen and hand-maintained** — there is no regeneration step. They were originally seeded from the live spec, then trimmed (only the audited tags/paths are kept, and explosive recursive `oneOf`s like `WidgetDefinition` are capped to a few representative variants). If a change needs spec data not present in the fixture, edit the fixture YAML directly to add it, then update snapshots with `yarn test:headless -u`. Treat the fixture as the source of truth, not a derived artifact.

The unit Vitest config redirects live spec imports to these fixtures via a plugin in [vitest.unit.config.ts](./vitest.unit.config.ts); the integration config deliberately does not, so it validates against the real upstream data.

[tests/fixtures/api/examples/](./tests/fixtures/api/examples/) is redirected differently — by overriding the `@api-examples` alias rather than by that plugin, because the consumer is an `import.meta.glob` in [codeExampleLoader.ts](./src/lib/api/codeExampleLoader.ts) and a glob resolves its alias before any `resolveId` hook sees a file path. These files are **test inputs only**: `yarn dev` and `yarn build` read the real staged tree in `api-code-examples/`, never the fixture. Each file carries a one-line provenance banner as its first line so a surprising snapshot diff names its own source.

Their language coverage is uneven on purpose. `aws-integration/ListAWSAccounts` carries all six languages in both `v1` and `v2`, which is what pins the `LANGUAGES` table in `codeExampleLoader.ts`; every other operation carries only `.pybeta` and `.go`, enough for a multi-tab render. Add languages to an operation only if a test needs them there.

## Components

- Use CSS modules with full BEM classes, for compatibility with `classListFactory` (which generates the `cl` function that applies hashed BEM classes automatically based on a static BEM class name). Name every class `block`, `block__element`, or `block__element--modifier` — never a shorthand or camelCase name.
- Use `i18n` to localize strings where possible, or use a `MISSING_TRANSLATION_LABEL` comment if Hugo does not yet have the desired i18n string. Pass `i18n` labels to Preact using a `labels` prop.
- Pass inline svgs to Preact using an `svgs` prop.
- If a component is static (not interactive, no JS needed), use vanilla Astro.
- If a component is interactive, use Preact.
- Where possible, each component should have its own isolated scope.
- In cases when giving a Preact component an isolated scope would require you to pass very large props (like the pre-rendered HTML of a tab, or a very large data blob for an API schema table), use a [hybrid approach](#hybrid-example) where a vanilla Astro component does most of the rendering, and a small Preact component controls interactivity. Do not do this unless the props would be large otherwise, because isolated JS scope is strongly preferred!
- Some components have a plaintext twin (found in their `plaintext` folder). Keep the plaintext twin in sync with the component. Any material change to a component's HTML content (adding, removing, renaming, or reordering headings, text, labels, or sections, as opposed to styling-only changes) likely needs the same change in its plaintext twin. Check the twin, and its tests, in the same change.

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
