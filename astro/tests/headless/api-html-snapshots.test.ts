import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../../dist');
const SNAPSHOT_DIR = path.join(__dirname, 'api-html-snapshots');

interface AuditPage {
  name: string;
  url: string;
}

const AUDIT_PAGES: AuditPage[] = [
  { name: '01-api-latest-index', url: '/api/latest/' },
  { name: '02-using-the-api', url: '/api/latest/using-the-api/' },
  { name: '03-rate-limits', url: '/api/latest/rate-limits/' },
  { name: '04-scopes', url: '/api/latest/scopes/' },
  { name: '05-authentication', url: '/api/latest/authentication/' },
  { name: '06-dashboards', url: '/api/latest/dashboards/' },
  { name: '07-incidents', url: '/api/latest/incidents/' },
  { name: '08-aws-integration', url: '/api/latest/aws-integration/' },
  { name: '09-monitors', url: '/api/latest/monitors/' },
  { name: '10-dashboard-lists', url: '/api/latest/dashboard-lists/' },
  { name: '11-screenboards', url: '/api/latest/screenboards/' },
  { name: '12-usage-metering', url: '/api/latest/usage-metering/' },
];

function distFile(urlPath: string): string {
  return path.join(DIST, urlPath.replace(/^\//, ''), 'index.html');
}

/**
 * Canonicalize build-random tokens so the snapshot tracks semantic content,
 * not non-deterministic per-build identifiers. Each unique token gets replaced
 * with a sequential placeholder (`X1`, `X2`, ...) keyed by first appearance,
 * which preserves cross-references (e.g. `aria-controls` ↔ `id`) so a missing
 * pairing still shows up as a diff.
 */
function normalize(html: string): string {
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
  // We match the 8-hex chunk and canonicalize it.
  out = out.replace(/\b[a-f0-9]{8}\b/g, (raw) => canonicalize(raw));

  return out;
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
    it(`${page.name} (${page.url}) matches snapshot`, async () => {
      const filepath = distFile(page.url);
      if (!existsSync(filepath)) {
        throw new Error(`Built page not found at ${filepath}`);
      }
      const html = readFileSync(filepath, 'utf-8');
      const normalized = normalize(html);
      await expect(normalized).toMatchFileSnapshot(
        path.join(SNAPSHOT_DIR, `${page.name}.html`),
      );
    });
  }
});
