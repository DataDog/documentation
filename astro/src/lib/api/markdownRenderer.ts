/**
 * Lightweight Markdown-to-HTML helpers for API spec descriptions.
 *
 * Uses `marked` to convert raw Markdown strings from the OpenAPI spec
 * into HTML that can be safely injected via `set:html` / `dangerouslySetInnerHTML`.
 */

import { marked } from 'marked';

// Disable async mode and configure for clean output
marked.use({ async: false, gfm: true });

/**
 * Render a Markdown string to block-level HTML (may include `<p>`, `<ul>`, etc.).
 * Use for longer descriptions that can contain paragraphs, lists, or code blocks.
 */
export function renderMarkdown(md: string): string {
  if (!md) return '';
  return marked.parse(md) as string;
}

/**
 * Render a Markdown string to inline HTML (no wrapping `<p>` tags).
 * Use for short descriptions rendered inside `<span>`, `<p>`, or `<td>` elements
 * where block-level wrappers would be invalid.
 */
export function renderMarkdownInline(md: string): string {
  if (!md) return '';
  return marked.parseInline(md) as string;
}
