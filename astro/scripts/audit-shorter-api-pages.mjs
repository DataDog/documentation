#!/usr/bin/env node
/**
 * Audit: verify each operation section from the legacy single-page HTML
 * appears (semantically) on the new per-operation page.
 *
 * "Before" snapshots: scripts/audit-baseline/NN-<slug>.html
 *   (saved before this change; one HTML page per category, all operations
 *    on one page under <h2 id="...">)
 *
 * "After" pages: dist/api/latest/<cat>/<op>/index.html (one operation per
 *    page, under <h1 id="..."> via the headingLevel=1 prop)
 *
 * For each operation in each audited category:
 * - Locate the <section class="api-endpoint*" data-operation-id="..."> block
 *   in both files.
 * - Strip the heading-level mismatch (h2 vs h1) and the trailing
 *   <hr class="api-endpoint__divider">.
 * - Hash the inner section content and compare.
 *
 * Reports a pass/fail summary plus per-operation diffs (truncated).
 */

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASTRO_ROOT = resolve(__dirname, '..');

const AUDIT = [
  { file: '05-authentication.html', slug: 'authentication' },
  { file: '06-dashboards.html', slug: 'dashboards' },
  { file: '07-incidents.html', slug: 'incidents' },
  { file: '08-aws-integration.html', slug: 'aws-integration' },
  { file: '09-monitors.html', slug: 'monitors' },
  { file: '10-dashboard-lists.html', slug: 'dashboard-lists' },
  { file: '11-screenboards.html', slug: 'screenboards' },
  { file: '12-usage-metering.html', slug: 'usage-metering' },
];

/**
 * Pull every <section ... data-operation-id="..."> block (including all
 * nested HTML) out of `html`. The endpoint section ends right before the
 * next sibling section or before the closing main wrapper.
 *
 * Returns a flat array since one operationId can appear multiple times in
 * the legacy single-page output (v1 and v2 share IDs in some categories).
 */
function extractEndpointSections(html) {
  const out = [];
  const re = /<section\b[^>]*\bdata-operation-id="([^"]+)"[^>]*>/g;
  const opens = [];
  for (let m; (m = re.exec(html)); ) {
    opens.push({ id: m[1], start: m.index, openEnd: m.index + m[0].length });
  }
  for (let i = 0; i < opens.length; i++) {
    const { id, start, openEnd } = opens[i];
    const limit = i + 1 < opens.length ? opens[i + 1].start : html.length;
    const slice = html.slice(start, limit);
    const close = slice.lastIndexOf('</section>');
    if (close === -1) continue;
    const inner = html.slice(openEnd, start + close);
    const slugMatch = /<h[12]\s[^>]*\bid="([^"]+)"/.exec(inner);
    const slug = slugMatch ? slugMatch[1] : null;
    out.push({ id, slug, body: inner });
  }
  return out;
}

/**
 * Apply the same canonicalization as
 * `tests/headless/api-html-snapshots.test.ts::normalize`:
 *  - replace per-build asset hashes (`/_astro/Foo.X8charhash.ext`) with
 *    `/_astro/Foo.HASH.ext`
 *  - canonicalize astro-island `uid="..."` values
 *  - canonicalize 8-hex-char tokens (used in component-generated IDs and
 *    cross-references)
 *
 * The token map is per-call, so identical raw tokens map to the same `Xn`.
 */
function canonicalize(html) {
  let out = html.replace(
    /\/_astro\/([A-Za-z0-9_-]+)\.[A-Za-z0-9_-]{8}\.(js|css|woff2?|svg|png|jpg|jpeg|webp|map)/g,
    '/_astro/$1.HASH.$2',
  );

  const tokenMap = new Map();
  const tok = (raw) => {
    let m = tokenMap.get(raw);
    if (!m) { m = `X${tokenMap.size + 1}`; tokenMap.set(raw, m); }
    return m;
  };

  out = out.replace(
    /(astro-island\b[^>]*?\buid=")([^"]+)(")/g,
    (_m, b, raw, a) => `${b}${tok(raw)}${a}`,
  );
  out = out.replace(/\b[a-f0-9]{8}\b/g, (raw) => tok(raw));
  return out;
}

/**
 * Normalize a section body for comparison:
 *  - strip the operation heading (h1 or h2) — its level differs by design.
 *  - strip the <hr class="api-endpoint__divider"> divider (legacy multi-op
 *    page used it between siblings; not meaningful per-operation).
 *  - collapse whitespace runs to single spaces.
 */
function normalize(body) {
  return canonicalize(body)
    .replace(/<h[12]\b[^>]*?>[\s\S]*?<\/h[12]>/, '')
    .replace(/<hr\s+class="[^"]*api-endpoint__divider[^"]*"[^>]*\/?>(\s*)/g, '')
    // After canonicalization the placeholder counter is file-relative (so
    // the 56th operation's tabs in a multi-op page become e.g. X776, while
    // the same operation rendered alone becomes X11). Collapse the
    // sequence numbers to a single sentinel so we compare structure, not
    // file position.
    .replace(/\bX\d+\b/g, 'XID')
    // Drop Astro's per-page hydration bootstrap scripts and styles. Where
    // these end up inside the section depends on which island is the first
    // one to use a given client directive on the page — it's not a content
    // difference.
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function hash(s) {
  return createHash('sha256').update(s).digest('hex').slice(0, 12);
}

function loadDist(catSlug, opSlug) {
  const path = resolve(ASTRO_ROOT, 'dist/api/latest', catSlug, opSlug, 'index.html');
  if (!existsSync(path)) return null;
  return readFileSync(path, 'utf8');
}

function listOperationDirs(catSlug) {
  const dir = resolve(ASTRO_ROOT, 'dist/api/latest', catSlug);
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function shortDiff(a, b, maxLen = 240) {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  const startA = Math.max(0, i - 30);
  const startB = Math.max(0, i - 30);
  const sliceA = a.slice(startA, startA + maxLen);
  const sliceB = b.slice(startB, startB + maxLen);
  return { divergeAt: i, before: a.slice(startA, i), expected: sliceA, actual: sliceB };
}

let total = 0;
let mismatches = 0;
let missing = 0;

for (const { file, slug: catSlug } of AUDIT) {
  const beforePath = resolve(ASTRO_ROOT, 'scripts/audit-baseline', file);
  if (!existsSync(beforePath)) {
    console.log(`SKIP  ${catSlug}: no before-snapshot at ${beforePath}`);
    continue;
  }
  const beforeHtml = readFileSync(beforePath, 'utf8');
  const beforeSections = extractEndpointSections(beforeHtml);

  if (beforeSections.length === 0) {
    console.log(`SKIP  ${catSlug}: 0 operations on legacy page (empty deprecated category)`);
    continue;
  }

  // Multimap legacy sections by operationId so we can iterate candidates
  // when v1 and v2 share an operationId (e.g. aws-integration).
  const byOpId = new Map();
  for (const sec of beforeSections) {
    const list = byOpId.get(sec.id) ?? [];
    list.push({ ...sec, normalized: normalize(sec.body) });
    byOpId.set(sec.id, list);
  }

  const opDirs = listOperationDirs(catSlug);
  console.log(`\n=== ${catSlug} (${beforeSections.length} legacy sections, ${opDirs.length} new pages) ===`);

  for (const opDir of opDirs) {
    total++;
    const html = loadDist(catSlug, opDir);
    if (!html) {
      console.log(`  -- ${opDir}: new HTML missing`);
      missing++;
      continue;
    }
    const sections = extractEndpointSections(html);
    if (sections.length !== 1) {
      console.log(`  ?? ${opDir}: new page has ${sections.length} sections (expected 1)`);
      mismatches++;
      continue;
    }
    const newSec = sections[0];
    const newNorm = normalize(newSec.body);
    const candidates = byOpId.get(newSec.id) ?? [];
    if (candidates.length === 0) {
      console.log(`  -- ${opDir}: no legacy section with operationId ${newSec.id}`);
      missing++;
      continue;
    }
    const matchIdx = candidates.findIndex((c) => c.normalized === newNorm);
    if (matchIdx >= 0) {
      console.log(`  ok ${opDir}`);
      // Mark candidate as used so a later page can't double-match.
      candidates.splice(matchIdx, 1);
    } else {
      mismatches++;
      const best = candidates[0];
      const d = shortDiff(best.normalized, newNorm);
      console.log(`  XX ${opDir}: no legacy section matches (operationId ${newSec.id}, ${candidates.length} candidate(s))`);
      console.log(`     diverges at char ${d.divergeAt}`);
      console.log(`     before: …${d.expected.slice(0, 200)}`);
      console.log(`     after : …${d.actual.slice(0, 200)}`);
    }
  }
}

console.log(`\nSummary: ${total - mismatches - missing}/${total} match, ${mismatches} mismatched, ${missing} missing`);
process.exit(mismatches + missing > 0 ? 1 : 0);
