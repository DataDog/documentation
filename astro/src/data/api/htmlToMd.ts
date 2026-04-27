/**
 * HTML → Markdown conversion for API description fields.
 *
 * The API spec descriptions are stored as Markdown but the data layer renders
 * them to HTML eagerly (via `marked`) so HTML-rendering components can inject
 * them with `set:html`. The Markdown renderers need the original Markdown
 * shape, so this module reverses the conversion.
 *
 * The conversion is intentionally narrow: spec descriptions only contain a
 * small subset of HTML (paragraphs, links, code, emphasis, lists, line
 * breaks). The custom `<br>` rule emits a hard break (`  \n`) instead of
 * turndown's default of leaving `<br>` literally in the output.
 */

import TurndownService from 'turndown';

const td = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '_',
  strongDelimiter: '**',
});

td.addRule('lineBreak', {
  filter: 'br',
  replacement: () => '  \n',
});

/**
 * Convert an HTML fragment to Markdown. Strings with no HTML tags or
 * entities are returned unchanged on the fast path. The entity check
 * matters because `marked` encodes apostrophes and quotes (`&#39;`,
 * `&quot;`) into otherwise plain-looking output.
 */
export function htmlToMd(input: string | undefined | null): string {
  if (!input) return '';
  if (!input.includes('<') && !input.includes('&')) return input;
  return td.turndown(input).trim();
}

/**
 * Convert an HTML fragment to single-line Markdown suitable for a table cell.
 * Collapses whitespace, drops hard line breaks, and trims.
 */
export function htmlToMdInline(input: string | undefined | null): string {
  if (!input) return '';
  const md = htmlToMd(input);
  return md.replace(/\s+/g, ' ').trim();
}
