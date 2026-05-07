import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { format as prettierFormat } from 'prettier';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../../dist');
const SNAPSHOT_DIR = path.join(__dirname, 'api-html-snapshots');

interface AuditPage {
  name: string;
  url: string;
}

/**
 * Audit set per the README. Each entry covers a meaningful rendering
 * variation. Static pages and category landing pages are sampled at
 * the page level; representative operation pages exercise the per-op
 * route added by the shorter-API-pages migration.
 */
const AUDIT_PAGES: AuditPage[] = [
  // 1-4: Static pages (no operations)
  { name: '01-api-latest-index', url: '/api/latest/' },
  { name: '02-using-the-api', url: '/api/latest/using-the-api/' },
  { name: '03-rate-limits', url: '/api/latest/rate-limits/' },
  { name: '04-scopes', url: '/api/latest/scopes/' },

  // 5-12: One landing page + one representative operation per dynamic category.
  // Operation choice per category captures a meaningful variant (deprecated,
  // unstable, mixed v1+v2, etc.) so a regression in any rendering path shows
  // up in at least one operation snapshot.
  { name: '05-authentication-landing', url: '/api/latest/authentication/' },
  { name: '05-authentication-validate-api-key', url: '/api/latest/authentication/validate-api-key/' },

  { name: '06-dashboards-landing', url: '/api/latest/dashboards/' },
  { name: '06-dashboards-get-a-dashboard', url: '/api/latest/dashboards/get-a-dashboard/' },

  { name: '07-incidents-landing', url: '/api/latest/incidents/' },
  { name: '07-incidents-create-an-incident', url: '/api/latest/incidents/create-an-incident/' },

  // aws-integration: collision case — same summary in v1 and v2 produces two
  // distinct pages (`-v1` and `-v2` suffixes). Capture both.
  { name: '08-aws-integration-landing', url: '/api/latest/aws-integration/' },
  { name: '08-aws-integration-list-v1', url: '/api/latest/aws-integration/list-all-aws-integrations-v1/' },
  { name: '08-aws-integration-list-v2', url: '/api/latest/aws-integration/list-all-aws-integrations-v2/' },

  { name: '09-monitors-landing', url: '/api/latest/monitors/' },
  { name: '09-monitors-create-a-monitor', url: '/api/latest/monitors/create-a-monitor/' },

  // dashboard-lists: category-level deprecation (with endpoints).
  { name: '10-dashboard-lists-landing', url: '/api/latest/dashboard-lists/' },
  { name: '10-dashboard-lists-get-all-dashboard-lists', url: '/api/latest/dashboard-lists/get-all-dashboard-lists/' },

  // screenboards: empty deprecated category (no operations to sample).
  { name: '11-screenboards-landing', url: '/api/latest/screenboards/' },

  { name: '12-usage-metering-landing', url: '/api/latest/usage-metering/' },
  { name: '12-usage-metering-get-hourly-usage-for-lambda', url: '/api/latest/usage-metering/get-hourly-usage-for-lambda/' },
];

function distFile(urlPath: string): string {
  return path.join(DIST, urlPath.replace(/^\//, ''), 'index.html');
}

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
    throw new Error('Could not locate <main>...</main> in built page');
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

  // Component-generated IDs that include an 8-hex-char tail, e.g.:
  //   id="api-response-accf4936"   id="api-response-accf4936-panel-0"
  //   aria-controls="..."   data-foo="..."
  out = out.replace(/\b[a-f0-9]{8}\b/g, (raw) => canonicalize(raw));

  return await prettierFormat(out, {
    parser: 'html',
    printWidth: 120,
  });
}

describe('API page HTML snapshots', () => {
  beforeAll(() => {
    if (!existsSync(DIST)) {
      throw new Error(
        `dist/ not found at ${DIST}. Run \`npm run build\` before running this test suite.`,
      );
    }
  });

  for (const page of AUDIT_PAGES) {
    // Some operation pages (notably dashboards/get-a-dashboard) generate
    // very large HTML documents; Prettier's HTML formatter on those takes
    // well past the default 5s timeout.
    it(
      `${page.name} (${page.url}) matches snapshot`,
      async () => {
        const filepath = distFile(page.url);
        if (!existsSync(filepath)) {
          throw new Error(`Built page not found at ${filepath}`);
        }
        const html = readFileSync(filepath, 'utf-8');
        const normalized = await normalize(extractMain(html));
        await expect(normalized).toMatchFileSnapshot(
          path.join(SNAPSHOT_DIR, `${page.name}.html`),
        );
      },
      30_000,
    );
  }
});
