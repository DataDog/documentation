import { describe, test, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { load } from 'cheerio';

const repoRoot = join(__dirname, '..', '..', '..', '..');
const publicDir = join(repoRoot, 'public', 'api', 'latest');

// Representative subset from the audit guidelines. Each entry is [tag, endpointSlug].
// endpointSlug is the H2 id used today and the directory slug after the migration.
const targets = [
  ['authentication', 'validate-api-key'],
  ['dashboards', 'get-a-dashboard'],
  ['incidents', 'create-an-incident'],
  // aws-integration's "list all" is a shared v1+v2 endpoint (same operationId + summary),
  // so today it renders as a single H2 with version tabs. Post-migration it should remain
  // a single page hosting both version tabs.
  ['aws-integration', 'list-all-aws-integrations'],
  ['monitors', 'create-a-monitor'],
  ['dashboard-lists', 'get-all-dashboard-lists'],
  ['usage-metering', 'get-hourly-usage-for-lambda'],
];

// Normalize an .endpoint-content fragment so wrapper/anchor diffs don't fail the snapshot.
// Keeps the inner endpoint content (overview, permissions, parameters, request, response, code examples).
function normalize(html) {
  const $ = load(`<div id="root">${html}</div>`, null, false);

  // Strip elements that vary between H2-section rendering and standalone page rendering.
  $('.js-collapse-trigger').each((_, el) => {
    const $el = $(el);
    if ($el.is('a')) {
      $el.replaceWith($el.html() || '');
    }
  });
  $('a.toggle-version-tab').each((_, el) => {
    const $el = $(el);
    $el.replaceWith($el.text());
  });

  // Drop ids on headings — H2 anchor ids only exist in the section view.
  $('h2, h3, h4').removeAttr('id');

  // Drop the per-version tab wrapper id (it embeds the H2 anchor string).
  $('[id]').each((_, el) => {
    const id = $(el).attr('id') || '';
    if (/-v[12]$/.test(id)) {
      $(el).removeAttr('id');
    }
  });

  // Normalize dev server port so a baseline captured on :1314 still matches a run on :1313.
  const normalized = $('#root').html().replace(/localhost:131\d/g, 'localhost:PORT');

  // Collapse whitespace so insignificant indentation changes don't trip the diff.
  return normalized.replace(/\s+/g, ' ').trim();
}

// Extract the endpoint content block (.endpoint-content) under an H2 with the given id,
// from a category-level index.html. Returns null when the H2 isn't found.
function extractFromCategoryPage(tag, endpointSlug) {
  const file = join(publicDir, tag, 'index.html');
  if (!existsSync(file)) return null;
  const $ = load(readFileSync(file, 'utf8'));
  const $h2 = $(`h2#${endpointSlug}`);
  if ($h2.length === 0) return null;
  // The H2 is in a .row with the version tabs; the endpoint-content lives in the
  // sibling .tab-content that follows the H2's .row wrapper.
  const $rowWrapper = $h2.closest('.row');
  const $tabContent = $rowWrapper.nextAll('.tab-content').first();
  // Collect all .endpoint-content fragments inside the tab-content (one per version).
  const fragments = [];
  $tabContent.find('.endpoint-content').each((_, el) => {
    fragments.push($.html(el));
  });
  if (fragments.length === 0) return null;
  return fragments.map(normalize).join('\n---\n');
}

// Extract the endpoint content from a standalone per-endpoint page (post-migration).
function extractFromEndpointPage(tag, endpointSlug) {
  const file = join(publicDir, tag, endpointSlug, 'index.html');
  if (!existsSync(file)) return null;
  const $ = load(readFileSync(file, 'utf8'));
  const fragments = [];
  $('.endpoint-content').each((_, el) => {
    fragments.push($.html(el));
  });
  if (fragments.length === 0) return null;
  return fragments.map(normalize).join('\n---\n');
}

// During baseline capture: read from the H2 section in the category page.
// During post-migration verification: read from the per-endpoint page if it exists,
// else fall back to the category page (so intermediate steps don't break the harness).
function extract(tag, endpointSlug) {
  return (
    extractFromEndpointPage(tag, endpointSlug) ||
    extractFromCategoryPage(tag, endpointSlug)
  );
}

describe('API endpoint content snapshots', () => {
  beforeAll(() => {
    if (!existsSync(publicDir)) {
      throw new Error(
        `public/api/latest/ not found. Run a Hugo build first so the harness has HTML to read.`,
      );
    }
  });

  for (const [tag, endpointSlug] of targets) {
    test(`${tag} / ${endpointSlug}`, () => {
      const content = extract(tag, endpointSlug);
      expect(content, `no endpoint content found for ${tag}/${endpointSlug}`).toBeTruthy();
      expect(content).toMatchSnapshot();
    });
  }
});
