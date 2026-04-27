# llms.txt

## Prompt

`localhost:4321/llms.txt` should provide a plaintext listing of all the pages. It should look something like the file below. `https://docs.datadoghq.com` is the correct base URL.

```
## Datadog API Reference

- [Action Connection](https://docs.datadoghq.com/api/latest/action-connection.md)
- [Actions Datastores](https://docs.datadoghq.com/api/latest/actions-datastores.md)
- [Agentless Scanning](https://docs.datadoghq.com/api/latest/agentless-scanning.md)
- [API Management](https://docs.datadoghq.com/api/latest/api-management.md)
- [APM Retention Filters](https://docs.datadoghq.com/api/latest/apm-retention-filters.md)
- [APM](https://docs.datadoghq.com/api/latest/apm.md)
- [App Builder](https://docs.datadoghq.com/api/latest/app-builder.md)
- [Application Security](https://docs.datadoghq.com/api/latest/application-security.md)
- [Audit](https://docs.datadoghq.com/api/latest/audit.md)
- [Authentication](https://docs.datadoghq.com/api/latest/authentication.md)
```

... etc.

## Claude's plan

### Approach: a single static route at `src/pages/llms.txt.ts`

Astro routes pages by file path. A file at [src/pages/llms.txt.ts](../src/pages/llms.txt.ts) with an exported `GET` handler builds to `dist/llms.txt` and is served at `localhost:4321/llms.txt` in dev. No dynamic params, no `getStaticPaths` — one URL, one file.

The handler returns `Content-Type: text/plain; charset=utf-8` and a string body. Same APIRoute shape used by [\[category\].md.ts](../src/pages/api/latest/[category].md.ts), but without the `[param]` route segment.

### Source of truth

[`getApiCategories()`](../src/data/api/index.ts) returns one `ApiCategory` per OpenAPI tag, already sorted alphabetically by name. That's the listing — every category becomes one bullet. The three hard-coded special pages ([rate-limits.astro](../src/pages/api/latest/rate-limits.astro), [scopes.astro](../src/pages/api/latest/scopes.astro), [using-the-api.astro](../src/pages/api/latest/using-the-api.astro)) are intentionally out of scope for this plan; add them in a follow-up once they're enumerable from a shared module.

### Plan

#### 1. Configure the site URL

Set `site: 'https://docs.datadoghq.com'` in [astro.config.mjs](../astro.config.mjs). The handler reads it via the `site` property on the APIRoute context (`Astro.site` equivalent for endpoints), so the production URL isn't hard-coded inside the renderer. The `site` config is also load-bearing for sitemap, RSS, and canonical-URL features down the line — set it once.

The URLs in the body are always production URLs, even when serving from `localhost:4321`. That matches the prompt: `llms.txt` is a pointer file for AI agents, and the canonical targets are prod regardless of where the file is served from.

#### 2. Render function

Add [src/data/api/renderLlmsTxt.ts](../src/data/api/renderLlmsTxt.ts) exporting a pure function:

```ts
export function renderLlmsTxt(categories: ApiCategory[], siteUrl: string): string;
```

Logic:

- Iterate `categories` in the order received (already sorted by name in `getApiCategories()`).
- Emit:
  ```
  ## Datadog API Reference
  
  - [{name}](${siteUrl}/api/latest/${slug}.md)
  - …
  ```
- Trailing newline at end of file.
- If `siteUrl` is empty, throw — silent fallback would ship broken links.

Pure function, no I/O — testable in isolation.

#### 3. Route handler

[src/pages/llms.txt.ts](../src/pages/llms.txt.ts):

```ts
import type { APIRoute } from 'astro';
import { getApiCategories } from '../data/api/index';
import { renderLlmsTxt } from '../data/api/renderLlmsTxt';

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    throw new Error('astro.config.mjs `site` must be set for llms.txt to render canonical URLs.');
  }
  const body = renderLlmsTxt(getApiCategories(), site.origin);
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
```

Use `site.origin` (e.g. `https://docs.datadoghq.com`) rather than `site.toString()` to avoid the trailing slash that `URL#toString()` adds.

#### 4. Tests

Add [src/data/api/renderLlmsTxt.test.ts](../src/data/api/renderLlmsTxt.test.ts) — pure function, vitest, no happy-dom:

- **Header**: output starts with `## Datadog API Reference\n\n`.
- **Format**: each line matches `- [<name>](https://docs.datadoghq.com/api/latest/<slug>.md)`.
- **Order preserved**: a fixture in input order `[B, A]` emits in input order — the renderer doesn't re-sort, that's `getApiCategories`'s job.
- **Empty categories list**: emits just the heading and a trailing newline (no crash, no stray bullet).
- **Missing `site`**: passing an empty string throws.

Add a build-smoke test: a vitest that imports the route handler, calls it with a mocked context (`{ site: new URL('https://docs.datadoghq.com') }`), and asserts the response has `Content-Type: text/plain; charset=utf-8` and a body whose first line matches the heading. Mirrors the build-smoke pattern from plan 10 step 7 but stays headless — Playwright would be overkill for a static text route.

#### 5. Manual verification

Run `npm run dev` and `curl localhost:4321/llms.txt`. Sanity-check the output:

```bash
curl -s localhost:4321/llms.txt | grep -c '^- \['
```

Confirm the count matches the number of categories returned by `getApiCategories()`.

### Open questions / risks

- **Coverage of `.md` targets.** The links in `llms.txt` only resolve once plan 10 ships `[category].md.ts`. If `llms.txt` ships before plan 10, every link 404s. Sequence accordingly.
- **Special pages excluded.** `Rate Limits`, `Authorization Scopes`, and `Using the API` appear in the prompt's example but are intentionally out of scope for this plan (per user direction). Track as a follow-up — also depends on `.md` plaintext for those pages, which plan 10 doesn't currently cover.
- **`latest` vs versioned.** The example uses `/api/latest/`, which currently aliases v2. If we later expose `/api/v1/` and `/api/v2/` as separate trees, `llms.txt` needs a strategy (one section per version, or stay `latest` only). Out of scope here.
- **No category description.** The `llms.txt` standard supports a short blurb per link; the prompt's example doesn't include one. Match the example, don't add descriptions speculatively.
