/**
 * Markdown twin of `ApiEndpoint.astro`.
 *
 * Composes the leaf `.md.ts` renderers into a complete Markdown rendering of
 * one API endpoint. Output is parseable Markdoc — tabbed content (request
 * body, response, code examples) emits `{% tabs %}` blocks; status notices
 * emit `{% alert %}` blocks.
 *
 * The endpoint heading is at level 2 so the category renderer can emit a
 * level-1 heading at the page root. A horizontal rule separates each
 * endpoint from the next within a category page.
 */

import type { EndpointData } from '../../../data/api/endpoints';
import { getDefaultRegions } from '../../../data/api/regions';
import { appHost } from '../../../config/regions';
import { htmlToMd } from '../../../data/api/htmlToMd';
import { renderApiStatusAlertMd } from '../../ApiStatusAlert/plaintext/ApiStatusAlert.md';
import { renderApiSchemaTableMd } from '../../ApiSchemaTable/plaintext/ApiSchemaTable.md';
import { renderApiRequestBodyTabsMd } from '../../ApiRequestBodyTabs/plaintext/ApiRequestBodyTabs.md';
import { renderApiResponseMd } from '../../ApiResponse/plaintext/ApiResponse.md';
import { renderApiCodeExampleMd } from '../../ApiCodeExample/plaintext/ApiCodeExample.md';

function renderRegionTable(ep: EndpointData): string {
  const regions = getDefaultRegions();
  const rows: string[] = [];
  for (const region of regions) {
    const url = ep.regionUrls?.[region.key];
    if (!url) continue;
    const site = appHost(region.key) ?? region.site;
    rows.push(`| ${site} | ${ep.method} ${url} |`);
  }
  if (rows.length === 0) return '';
  return ['| Datadog site | API endpoint |', '| --- | --- |', ...rows].join('\n');
}

function renderArguments(ep: EndpointData): string {
  const sections: string[] = [];
  if (ep.pathParams && ep.pathParams.length > 0) {
    sections.push(renderApiSchemaTableMd(ep.pathParams));
  }
  if (ep.queryParams && ep.queryParams.length > 0) {
    sections.push(renderApiSchemaTableMd(ep.queryParams));
  }
  if (ep.headerParams && ep.headerParams.length > 0) {
    sections.push(renderApiSchemaTableMd(ep.headerParams));
  }
  if (sections.length === 0) return '';
  return ['### Arguments', '', sections.join('\n\n')].join('\n');
}

function renderRequestBody(ep: EndpointData): string {
  if (!ep.requestBody) return '';
  const heading = `### Request Body ${ep.requestBody.required ? '(required)' : '(optional)'}`;
  const parts: string[] = [heading, ''];
  if (ep.requestBody.description) {
    parts.push(htmlToMd(ep.requestBody.description));
    parts.push('');
  }
  parts.push(
    renderApiRequestBodyTabsMd({
      schema: ep.requestBody.schema,
      examples: ep.requestBody.examples,
    }),
  );
  return parts.join('\n');
}

function renderResponseSection(ep: EndpointData): string {
  if (!ep.responses || ep.responses.length === 0) return '';
  return ['### Response', '', renderApiResponseMd(ep.responses)].join('\n');
}

function renderCodeExampleSection(ep: EndpointData): string {
  if (!ep.codeExamples || ep.codeExamples.length === 0) return '';
  return ['### Code Example', '', renderApiCodeExampleMd(ep.codeExamples)].join('\n');
}

export function renderApiEndpointMd(ep: EndpointData): string {
  const blocks: string[] = [];

  const versionSuffix = ep.version === 'v2' ? ' (v2 — latest)' : ` (${ep.version})`;
  blocks.push(`## ${ep.summary}${versionSuffix}`);

  if (ep.deprecated) {
    blocks.push(renderApiStatusAlertMd({ type: 'deprecated', newerVersionUrl: ep.newerVersionUrl }));
  } else if (ep.unstable) {
    blocks.push(renderApiStatusAlertMd({ type: 'unstable', message: ep.unstableMessage }));
  }

  if (ep.description) {
    blocks.push(htmlToMd(ep.description));
  }

  const regionTable = renderRegionTable(ep);
  if (regionTable) blocks.push(regionTable);

  if (ep.permissions && ep.permissions.length > 0) {
    blocks.push(`**Permissions:** \`${ep.permissions.join('`, `')}\``);
  }

  if (ep.oauthScopes && ep.oauthScopes.length > 0) {
    blocks.push(
      `OAuth apps require the \`${ep.oauthScopes.join('`, `')}\` authorization scope to access this endpoint.`,
    );
  }

  const args = renderArguments(ep);
  if (args) blocks.push(args);

  const reqBody = renderRequestBody(ep);
  if (reqBody) blocks.push(reqBody);

  const resp = renderResponseSection(ep);
  if (resp) blocks.push(resp);

  const codeEx = renderCodeExampleSection(ep);
  if (codeEx) blocks.push(codeEx);

  return blocks.join('\n\n');
}
