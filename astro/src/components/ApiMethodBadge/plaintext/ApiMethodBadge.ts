/**
 * Markdown twin of `ApiMethodBadge.astro`.
 *
 * Renders the HTTP method as bold text inline (e.g. `**GET**`).
 */

export function renderApiMethodBadgeMd(method: string): string {
  return `**${method.toUpperCase()}**`;
}
