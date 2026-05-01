import type { ApiCategory } from './index';

export function renderLlmsTxt(categories: ApiCategory[], siteUrl: string): string {
  if (!siteUrl) {
    throw new Error('renderLlmsTxt: siteUrl is required to emit canonical links.');
  }

  const lines = ['## Datadog API Reference', ''];
  for (const cat of categories) {
    lines.push(`- [${cat.name}](${siteUrl}/api/latest/${cat.slug}.md)`);
  }
  lines.push('');
  return lines.join('\n');
}
