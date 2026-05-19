/**
 * Markdoc twin of `Alert.astro`.
 *
 * Emits a `{% alert %}` block. Matches the four levels supported by the
 * `.astro` component: info, danger, warning, tip.
 */

export type AlertLevel = 'info' | 'danger' | 'warning' | 'tip';

export function renderAlertMd(level: AlertLevel, body: string): string {
  return `{% alert level="${level}" %}\n${body}\n{% /alert %}`;
}
