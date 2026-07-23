import type { ApiCategory } from './schemas/views';

export function renderLlmsTxt(categories: ApiCategory[], siteUrl: string): string {
  if (!siteUrl) {
    throw new Error('renderLlmsTxt: siteUrl is required to emit canonical links.');
  }

  const lines = ['## Datadog API Reference', ''];
  for (const cat of categories) {
    if (cat.operations.length === 0) continue;
    lines.push(`### ${cat.name}`);
    lines.push('');
    for (const op of cat.operations) {
      lines.push(`- [${op.summary}](${siteUrl}/api/latest/${cat.slug}/${op.slug}.md)`);
    }
    lines.push('');
  }
  return lines.join('\n');
}
