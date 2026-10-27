# Astro docs

This folder contains the Astro-rendered portion of the docs site. The Astro docs are in development.

> [!IMPORTANT]
> These docs are not live. Changing something in this folder does not update the Datadog documentation site. To revise the live docs, update the [`hugo`][1] folder instead.
>
> If you revise the API Reference docs on Hugo, we recommend revising the unpublished Astro version as well, to avoid losing your changes in the upcoming migration.

## Build the Astro docs locally

### Prerequisites

- Node.js >= 24 (see [`.nvmrc`][2]; `nvm use` picks it up)
- Yarn 4 via Corepack (pinned by the `packageManager` field). Enable it once with `corepack enable`.

### Getting started

```bash
cd astro
yarn install
yarn playwright install chromium   # browser tests only
yarn dev
```

The dev server starts at **http://localhost:4321**. The first page you visit will take several seconds to load, but the site should behave normally after that.

### Component documentation and testing

You can view the component test pages at [http://localhost:4321/dd_e2e/][3].

`yarn dev` is not an accurate representation of how JavaScript will run on the production site. If you need to preview interactive behavior:

1. Run `yarn build:en` (for English only) or `yarn build` (all languages) to create an accurate `dist` folder.
2. Run `yarn preview`. The component test pages will be at [http://localhost:4322/dd_e2e/][4].

### Other commands

| Command              | Description                                 |
| -------------------- | ------------------------------------------- |
| `yarn build`         | Production build to `dist/`                 |
| `yarn preview`       | Preview the production build locally        |
| `yarn typecheck`     | Type-check the project                      |
| `yarn format`        | Format files with Prettier                  |
| `yarn test`          | Type-check, then run unit and browser tests |
| `yarn test:headless` | Run unit tests (Vitest)                     |
| `yarn test:browser`  | Run browser tests (Playwright)              |

### Testing

#### Unit tests (Vitest)

```bash
yarn test:headless
```

#### Browser tests (Playwright)

Playwright starts a dev server automatically. If you already have `yarn dev` running on port 4321, it reuses it.

```bash
yarn test:browser
```

Useful flags:

| Flag                 | Purpose                                                                |
| -------------------- | ---------------------------------------------------------------------- |
| `Tabs/tests`         | Run only the spec files whose path matches                             |
| `--ui`               | Interactive UI mode: time-travel, re-run individual tests, inspect DOM |
| `--headed`           | Watch tests run in a real Chromium window                              |
| `--debug`            | Step through with the Playwright Inspector                             |
| `--update-snapshots` | Regenerate screenshot baselines after an intentional visual change     |

After a failed run, open the HTML report for side-by-side diffs of expected vs. actual screenshots:

```bash
yarn playwright show-report
```

### Preview the blended Hugo/Astro site locally

NOTE: This is not necessary for most development work. It's mainly useful for testing view transitions between the sites, to verify that navigation between them is seamless.

To test a blended version of the docs site that contains both Astro and Hugo pages, similar to how the sites are blended in production, you can run both sites behind the Caddy proxy at [Caddyfile][5].

Before you start:

- Install [Caddy][6].
- Install Hugo's dependencies with `cd hugo && make dependencies`.

In three terminal tabs, from the repo root:

```bash
cd hugo && make start-proxied   # Hugo on :1313, baseURL set to :1314
```

```bash
cd astro && yarn dev:proxied   # Astro on :4321, HMR through :1314
```

```bash
caddy run # Proxy on :1314
```

Then visit **http://localhost:1314** to view the blended site.

[1]: ../hugo
[2]: .nvmrc
[3]: http://localhost:4321/dd_e2e/
[4]: http://localhost:4322/dd_e2e/
[5]: ../Caddyfile
[6]: https://caddyserver.com/docs/install
