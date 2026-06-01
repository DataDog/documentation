import { describe, it, expect, beforeAll } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
// @ts-ignore — Preact renderer is registered for SSR of islands in headless tests.
import preactRenderer from '@astrojs/preact/server.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { format as prettierFormat } from 'prettier';

import IndexPage from '../../src/pages/[...lang]/api/latest/index.astro';
import UsingTheApiPage from '../../src/pages/[...lang]/api/latest/using-the-api.astro';
import RateLimitsPage from '../../src/pages/[...lang]/api/latest/rate-limits.astro';
import ScopesPage from '../../src/pages/[...lang]/api/latest/scopes.astro';
import CategoryPage from '../../src/pages/[...lang]/api/latest/[category].astro';
import OperationPage from '../../src/pages/[...lang]/api/latest/[category]/[operation].astro';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SNAPSHOT_DIR = path.join(__dirname, 'api-html-snapshots');
const BASE_URL = 'http://localhost:4321';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PageComponent = any;

interface AuditPage {
  name: string;
  component: PageComponent;
  params: Record<string, string | undefined>;
  urlPath: string;
}

/**
 * Audit set per the README. Each entry covers a meaningful rendering
 * variation. Static pages and category landing pages are sampled at
 * the page level; representative operation pages exercise the per-op
 * route added by the shorter-API-pages migration.
 *
 * Pages render via AstroContainer against the frozen fixture in
 * tests/fixtures/api/ (wired by the frozen-api-spec plugin in
 * vitest.unit.config.ts), so snapshots are stable across live spec updates.
 */
const AUDIT_PAGES: AuditPage[] = [
  // 1-4: Static pages (no operations)
  { name: '01-api-latest-index', component: IndexPage, params: {}, urlPath: '/api/latest/' },
  { name: '02-using-the-api', component: UsingTheApiPage, params: {}, urlPath: '/api/latest/using-the-api/' },
  { name: '03-rate-limits', component: RateLimitsPage, params: {}, urlPath: '/api/latest/rate-limits/' },
  { name: '04-scopes', component: ScopesPage, params: {}, urlPath: '/api/latest/scopes/' },

  // 5-12: One landing page + one representative operation per dynamic category.
  { name: '05-authentication-landing', component: CategoryPage, params: { category: 'authentication' }, urlPath: '/api/latest/authentication/' },
  { name: '05-authentication-validate-api-key', component: OperationPage, params: { category: 'authentication', operation: 'validate-api-key' }, urlPath: '/api/latest/authentication/validate-api-key/' },

  { name: '06-dashboards-landing', component: CategoryPage, params: { category: 'dashboards' }, urlPath: '/api/latest/dashboards/' },
  { name: '06-dashboards-get-a-dashboard', component: OperationPage, params: { category: 'dashboards', operation: 'get-a-dashboard' }, urlPath: '/api/latest/dashboards/get-a-dashboard/' },

  { name: '07-incidents-landing', component: CategoryPage, params: { category: 'incidents' }, urlPath: '/api/latest/incidents/' },
  { name: '07-incidents-create-an-incident', component: OperationPage, params: { category: 'incidents', operation: 'create-an-incident' }, urlPath: '/api/latest/incidents/create-an-incident/' },

  // aws-integration: multi-version case — v1 and v2 share one page.
  { name: '08-aws-integration-landing', component: CategoryPage, params: { category: 'aws-integration' }, urlPath: '/api/latest/aws-integration/' },
  { name: '08-aws-integration-list', component: OperationPage, params: { category: 'aws-integration', operation: 'list-all-aws-integrations' }, urlPath: '/api/latest/aws-integration/list-all-aws-integrations/' },

  { name: '09-monitors-landing', component: CategoryPage, params: { category: 'monitors' }, urlPath: '/api/latest/monitors/' },
  { name: '09-monitors-create-a-monitor', component: OperationPage, params: { category: 'monitors', operation: 'create-a-monitor' }, urlPath: '/api/latest/monitors/create-a-monitor/' },

  // dashboard-lists: category-level deprecation (with endpoints).
  { name: '10-dashboard-lists-landing', component: CategoryPage, params: { category: 'dashboard-lists' }, urlPath: '/api/latest/dashboard-lists/' },
  { name: '10-dashboard-lists-get-all-dashboard-lists', component: OperationPage, params: { category: 'dashboard-lists', operation: 'get-all-dashboard-lists' }, urlPath: '/api/latest/dashboard-lists/get-all-dashboard-lists/' },

  // screenboards: empty deprecated category (no operations to sample).
  { name: '11-screenboards-landing', component: CategoryPage, params: { category: 'screenboards' }, urlPath: '/api/latest/screenboards/' },

  { name: '12-usage-metering-landing', component: CategoryPage, params: { category: 'usage-metering' }, urlPath: '/api/latest/usage-metering/' },
  { name: '12-usage-metering-get-hourly-usage-for-lambda', component: OperationPage, params: { category: 'usage-metering', operation: 'get-hourly-usage-for-lambda' }, urlPath: '/api/latest/usage-metering/get-hourly-usage-for-lambda/' },
];

/**
 * Slice the document down to its `<main>` element. The surrounding chrome
 * (side nav listing every operation, inline scripts/styles, footer) is
 * identical across pages and dwarfs the per-page content — keeping it would
 * mean every snapshot carries ~600KB of noise that never varies between the
 * pages we're auditing.
 */
function extractMain(html: string): string {
  const start = html.search(/<main\b/);
  const endTag = '</main>';
  const end = html.lastIndexOf(endTag);
  if (start === -1 || end === -1 || end < start) {
    throw new Error('Could not locate <main>...</main> in rendered page');
  }
  return html.slice(start, end + endTag.length);
}

/**
 * Canonicalize build-random tokens so the snapshot tracks semantic content,
 * not non-deterministic per-build identifiers. Each unique token gets replaced
 * with a sequential placeholder (`X1`, `X2`, ...) keyed by first appearance,
 * which preserves cross-references (e.g. `aria-controls` ↔ `id`) so a missing
 * pairing still shows up as a diff.
 *
 * The result is then run through Prettier's HTML parser so each tag lands on
 * its own line. Without that, a single-line minified HTML document produces a
 * unreadable single-line snapshot diff on any change.
 */
async function normalize(html: string): Promise<string> {
  let out = html.replace(
    /\/_astro\/([A-Za-z0-9_-]+)\.[A-Za-z0-9_-]{8}\.(js|css|woff2?|svg|png|jpg|jpeg|webp|map)/g,
    '/_astro/$1.HASH.$2',
  );

  const tokenMap = new Map<string, string>();
  const canonicalize = (raw: string): string => {
    let mapped = tokenMap.get(raw);
    if (!mapped) {
      mapped = `X${tokenMap.size + 1}`;
      tokenMap.set(raw, mapped);
    }
    return mapped;
  };

  // Astro-island uids
  out = out.replace(
    /(astro-island\b[^>]*?\buid=")([^"]+)(")/g,
    (_m, before, raw, after) => `${before}${canonicalize(raw)}${after}`,
  );

  // Component-generated IDs that include an 8-hex-char tail
  out = out.replace(/\b[a-f0-9]{8}\b/g, (raw) => canonicalize(raw));

  // CSS-module-hashed class names from Vite
  out = out.replace(
    /\b_([\w-]+?)_[a-z0-9]{5,6}_\d+\b/g,
    (_m, name) => `_${name}_MOD`,
  );

  return await prettierFormat(out, {
    parser: 'html',
    printWidth: 120,
  });
}

describe('API page HTML snapshots', () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>;

  beforeAll(async () => {
    container = await AstroContainer.create();
    container.addServerRenderer({ renderer: preactRenderer, name: '@astrojs/preact' });
  });

  for (const page of AUDIT_PAGES) {
    // Rendering complex pages and running Prettier can exceed the default 5s
    // timeout — especially for operation pages with large schema tables.
    it(
      `${page.name} (${page.urlPath}) matches snapshot`,
      async () => {
        const html = await container.renderToString(page.component, {
          params: page.params,
          request: new Request(`${BASE_URL}${page.urlPath}`),
        });
        const normalized = await normalize(extractMain(html));
        await expect(normalized).toMatchFileSnapshot(
          path.join(SNAPSHOT_DIR, `${page.name}.html`),
        );
      },
      60_000,
    );
  }
});
