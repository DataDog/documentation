import { readFileSync } from 'node:fs';
import * as cheerio from 'cheerio';

type Site = 'hugo' | 'astro';

const CONTENT_SELECTORS: Record<Site, string> = {
  hugo: '.main-api',
  astro: 'main.api-main',
};

/**
 * Remove noise elements that shouldn't be part of the text comparison.
 */
function removeNoise($: cheerio.CheerioAPI, root: cheerio.Cheerio<cheerio.AnyNode>): void {
  root.find('script, style, noscript, svg').remove();
  root.find('.api-toolbar').remove();
  root.find('[aria-hidden="true"]').remove();
  root.find('[style*="display: none"], [style*="display:none"]').remove();
  // Hugo hides region-specific URLs with d-none; strip all but the first visible one
  root.find('.d-none').remove();
  // Remove region URL patterns that are toggled by JS
  root.find('.api-url-pattern[data-region]').remove();
}

/**
 * Normalize extracted text: collapse whitespace, trim, strip zero-width chars, NFC normalize.
 */
function normalizeText(raw: string): string {
  return raw
    .normalize('NFC')
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // zero-width characters
    .replace(/\s+/g, ' ')                  // collapse all whitespace
    .trim();
}

/**
 * Load HTML file and return a cheerio instance.
 */
function loadHtml(htmlPath: string): cheerio.CheerioAPI {
  const html = readFileSync(htmlPath, 'utf-8');
  return cheerio.load(html);
}

/**
 * Extract the full visible text from the content area of an API page.
 */
export function extractPageText(htmlPath: string, site: Site): string {
  const $ = loadHtml(htmlPath);
  const content = $(CONTENT_SELECTORS[site]);
  if (content.length === 0) {
    return '';
  }
  removeNoise($, content);
  return normalizeText(content.text());
}

/**
 * Extract Hugo endpoints by pairing h2.api-task-description title rows
 * with the .row.endpoint content inside the following tab-content sibling.
 *
 * Hugo structure:
 *   <div class="row">  ← contains h2.api-task-description
 *   <div class="tab-content">
 *     <div class="tab-pane">
 *       <div class="row endpoint"> ← endpoint content
 *     </div>
 *   </div>
 */
function extractHugoEndpoints(
  $: cheerio.CheerioAPI,
  content: cheerio.Cheerio<cheerio.AnyNode>,
  excludeCode: boolean,
): Map<string, string> {
  const result = new Map<string, string>();

  content.find('h2.api-task-description').each((_i, el) => {
    const heading = $(el).text();
    const key = normalizeText(heading).toLowerCase();
    if (!key) return;

    // Walk up to the parent .row, then find the next .tab-content sibling
    const parentRow = $(el).closest('.row');
    const tabContent = parentRow.nextAll('.tab-content').first();
    const endpointEl = tabContent.find('.row.endpoint').first();

    if (endpointEl.length === 0) return;

    removeNoise($, endpointEl);
    if (excludeCode) endpointEl.find('pre, code').remove();

    result.set(key, normalizeText(endpointEl.text()));
  });

  return result;
}

/**
 * Extract Astro endpoints from section[data-testid="api-endpoint"] elements.
 * The heading is an h2 inside each section.
 */
function extractAstroEndpoints(
  $: cheerio.CheerioAPI,
  content: cheerio.Cheerio<cheerio.AnyNode>,
  excludeCode: boolean,
): Map<string, string> {
  const result = new Map<string, string>();

  content.find('section[data-testid="api-endpoint"]').each((_i, el) => {
    const endpointEl = $(el);
    removeNoise($, endpointEl);

    const heading = endpointEl.find('h2, h3').first().text();
    const key = normalizeText(heading).toLowerCase();

    if (excludeCode) endpointEl.find('pre, code').remove();

    if (key) {
      result.set(key, normalizeText(endpointEl.text()));
    }
  });

  return result;
}

/**
 * Extract visible text for each endpoint, keyed by the endpoint heading (lowercased, trimmed).
 */
export function extractEndpointTexts(
  htmlPath: string,
  site: Site,
): Map<string, string> {
  const $ = loadHtml(htmlPath);
  const content = $(CONTENT_SELECTORS[site]);
  if (content.length === 0) return new Map();

  return site === 'hugo'
    ? extractHugoEndpoints($, content, false)
    : extractAstroEndpoints($, content, false);
}

/**
 * Extract page text with code blocks excluded (for --no-code mode).
 */
export function extractPageTextNoCode(htmlPath: string, site: Site): string {
  const $ = loadHtml(htmlPath);
  const content = $(CONTENT_SELECTORS[site]);
  if (content.length === 0) {
    return '';
  }
  removeNoise($, content);
  content.find('pre, code').remove();
  return normalizeText(content.text());
}

/**
 * Extract endpoint texts with code blocks excluded (for --no-code mode).
 */
export function extractEndpointTextsNoCode(
  htmlPath: string,
  site: Site,
): Map<string, string> {
  const $ = loadHtml(htmlPath);
  const content = $(CONTENT_SELECTORS[site]);
  if (content.length === 0) return new Map();

  return site === 'hugo'
    ? extractHugoEndpoints($, content, true)
    : extractAstroEndpoints($, content, true);
}
