# Astro Docs

This is the next-generation Datadog documentation site, built with Astro 5, Markdoc, and Preact.

## Prerequisites

- Node.js >= 20

## Getting started

```bash
cd astro
npm install
npm run dev
```

The dev server starts at **http://localhost:4321**.

## Running alongside the Hugo site (Caddy proxy)

The Astro site only serves API docs. To browse it inside the full Hugo site (header, footer, non-API pages), run both behind the Caddy proxy at [Caddyfile](../Caddyfile). The proxy listens on **http://localhost:1314** and routes `/api/*` (and Vite's dev paths) to Astro, everything else to Hugo.

In three terminals, from the repo root:

```bash
make start-proxied        # Hugo on :1313, baseURL set to :1314
```

```bash
cd astro && npm run dev:proxied   # Astro on :4321, HMR through :1314
```

```bash
caddy run                 # Proxy on :1314
```

Then visit **http://localhost:1314**. `npm run dev:proxied` differs from `npm run dev` only in that it points Vite's HMR client and asset origin at the proxy port so hot reload works through Caddy.

## Component documentation

Each component has a dedicated page showing its properties and visual permutations. After running `npm run build`, browse the index at [http://localhost:4322/docs/test_pages/](http://localhost:4322/docs/test_pages/) (via `npm run preview`). The pages are also reachable under `npm run dev`, but client-side hydration only behaves correctly in a production build.

## Other commands

| Command              | Description                          |
|----------------------|--------------------------------------|
| `npm run build`      | Production build to `dist/`          |
| `npm run preview`    | Preview the production build locally |
| `npm run test`       | Run unit tests (Vitest)              |
| `npm run test:browser` | Run browser tests (Playwright)     |

## Testing

### Unit tests (Vitest)

Fast, runs in Node with happy-dom. No dev server required.

```bash
npm test
```

### Browser tests (Playwright)

Runs against a dev server. Playwright starts one automatically via the config's `webServer`; if you already have `npm run dev` on port 4321, it reuses it.

```bash
npm run test:browser
```

Useful flags (pass them after `--`):

| Flag | Purpose |
|------|---------|
| `-- tabs.spec.ts` | Run a single spec file |
| `-- --ui` | Interactive UI mode — time-travel, re-run individual tests, inspect DOM |
| `-- --headed` | Watch tests run in a real Chromium window |
| `-- --debug` | Step through with the Playwright Inspector |
| `-- --update-snapshots` | Regenerate screenshot baselines after an intentional visual change |

After a failed run, open the HTML report for side-by-side diffs of expected vs. actual PNGs:

```bash
npx playwright show-report
```

Screenshot baselines are captured at 2x retina (1440×900 viewport, `deviceScaleFactor: 2`, `scale: 'device'`) and currently live under `tests/browser/*-snapshots/` with a `-chromium-darwin.png` suffix. They need to be regenerated on the CI platform once CI is wired up; Playwright's per-platform suffix lets Mac and CI baselines coexist.

## How API docs are rendered from YAML

The API reference pages are generated at build time from the v1 and v2 OpenAPI specs — parsed, ref-resolved, built into view shapes, overlaid with translations, and rendered to static pages (plus a plaintext `.md` / `llms.txt` variant). For the full stage-by-stage walkthrough, see [docs/api/reference/pipeline.md](docs/api/reference/pipeline.md).

## Auditing guidelines

To manually audit the Astro API docs against the Hugo API docs, you don't need to review every category page — a representative set covers every rendering path. For the page inventory, the minimum audit set, and the per-endpoint checklist, see [docs/api/reference/audit_cases.md](docs/api/reference/audit_cases.md).

## Claude Code commands

This project includes a custom Claude Code slash command for code review.

### `/staged-code-review`

Reviews staged changes using the relevant checklists. To run it, open Claude Code in the `astro/` directory and type `/staged-code-review`.
