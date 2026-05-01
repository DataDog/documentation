/**
 * Page-level Markdown renderer for an API category.
 *
 * Composes a category heading + description with each endpoint's
 * `renderApiEndpointMd` output, separated by horizontal rules. The result is
 * served at `/api/latest/<slug>.md` as `text/markdown` and is intended to be
 * parseable Markdoc (tabs, alerts, etc. as Markdoc tags).
 */

import type { ApiCategory } from './index';
import type { EndpointData } from './endpoints';
import { renderApiEndpointMd } from '../../components/ApiEndpoint/plaintext/ApiEndpoint.md';
import { htmlToMd } from './htmlToMd';

export function renderCategoryMd(category: ApiCategory, endpoints: EndpointData[]): string {
  const blocks: string[] = [`# ${category.name}`];

  if (category.description) {
    blocks.push(htmlToMd(category.description));
  }

  for (const ep of endpoints) {
    blocks.push('---');
    blocks.push(renderApiEndpointMd(ep));
  }

  return blocks.join('\n\n') + '\n';
}
