/**
 * Markdown twin of `ApiEndpoint.astro`.
 *
 * Composes the leaf plaintext renderers into a complete Markdown rendering of
 * one API endpoint's body. Output is parseable Markdoc — tabbed content
 * (request body, response, code examples) emits `{% tabs %}` blocks; status
 * notices emit `{% alert %}` blocks.
 *
 * The renderer no longer emits the top-level summary heading: the operation
 * page composes a single `# Summary` plus per-variant `## v{N} (latest?)`
 * sub-headings around each call, so a multi-version operation reads as one
 * outline rather than parallel duplicated H1s.
 */

import type { EndpointData } from "@lib/api/schemas/views";
import { getDefaultRegions } from "@lib/api/regionResolver";
import { appHost } from "@config/regions";
import { renderApiSchemaTableMd } from "../../ApiSchemaTable/plaintext/ApiSchemaTable";
import { renderApiRequestBodyTabsMd } from "../../ApiRequestBodyTabs/plaintext/ApiRequestBodyTabs";
import { renderApiResponseMd } from "../../ApiResponse/plaintext/ApiResponse";
import { renderApiCodeExampleMd } from "../../ApiCodeExample/plaintext/ApiCodeExample";
import { renderAlertMd } from "../../Alert/plaintext/Alert";
import { renderApiMethodBadgeMd } from "../../ApiMethodBadge/plaintext/ApiMethodBadge";

export function renderApiEndpointMd(ep: EndpointData): string {
  return [
    renderStatusNotice(ep),
    renderDescription(ep),
    renderRegionTable(ep),
    renderPermissions(ep),
    renderOAuthScopes(ep),
    renderArguments(ep),
    renderRequestBody(ep),
    renderResponseSection(ep),
    renderCodeExampleSection(ep),
  ]
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function renderStatusNotice(ep: EndpointData): string {
  if (ep.deprecated) {
    const link = ep.newerVersionUrl
      ? ` [Use the newer version.](${ep.newerVersionUrl})`
      : "";
    return renderAlertMd("warning", `This endpoint is deprecated.${link}`);
  }
  if (ep.unstable) {
    const msg =
      ep.unstableMessage ??
      "This endpoint is unstable and may change without notice.";
    return renderAlertMd("warning", msg);
  }
  return "";
}

function renderDescription(ep: EndpointData): string {
  return ep.description ?? "";
}

function renderPermissions(ep: EndpointData): string {
  if (!ep.permissions || ep.permissions.length === 0) return "";
  return `**Permissions:** \`${ep.permissions.join("`, `")}\``;
}

function renderOAuthScopes(ep: EndpointData): string {
  if (!ep.oauthScopes || ep.oauthScopes.length === 0) return "";
  return `OAuth apps require the \`${ep.oauthScopes.join("`, `")}\` authorization scope to access this endpoint.`;
}

function renderRegionTable(ep: EndpointData): string {
  const regions = getDefaultRegions();
  const rows: string[] = [];
  for (const region of regions) {
    const url = ep.regionUrls?.[region.key];
    if (!url) continue;
    const site = appHost(region.key) ?? region.site;
    rows.push(`| ${site} | ${renderApiMethodBadgeMd(ep.method)} ${url} |`);
  }
  if (rows.length === 0) return "";
  return ["| Datadog site | API endpoint |", "| --- | --- |", ...rows].join(
    "\n",
  );
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
  if (sections.length === 0) return "";
  return ["### Arguments", "", sections.join("\n\n")].join("\n");
}

function renderRequestBody(ep: EndpointData): string {
  if (!ep.requestBody) return "";
  const heading = `### Request Body ${ep.requestBody.required ? "(required)" : "(optional)"}`;
  const parts: string[] = [heading, ""];
  if (ep.requestBody.description) {
    parts.push(ep.requestBody.description);
    parts.push("");
  }
  parts.push(
    renderApiRequestBodyTabsMd({
      schema: ep.requestBody.schema,
      examples: ep.requestBody.examples,
    }),
  );
  return parts.join("\n");
}

function renderResponseSection(ep: EndpointData): string {
  if (!ep.responses || ep.responses.length === 0) return "";
  return ["### Response", "", renderApiResponseMd(ep.responses)].join("\n");
}

function renderCodeExampleSection(ep: EndpointData): string {
  if (!ep.codeExamples || ep.codeExamples.length === 0) return "";
  return ["### Code Example", "", renderApiCodeExampleMd(ep.codeExamples)].join(
    "\n",
  );
}
