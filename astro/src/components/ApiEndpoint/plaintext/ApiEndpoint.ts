/**
 * AST twin of `ApiEndpoint.astro`.
 *
 * Builds the block-level Markdoc nodes for a single API endpoint variant.
 * Returns an array of top-level nodes (alerts, paragraphs, headings, tables,
 * tags) that callers compose into a document.
 *
 * Like the string renderer, this does NOT emit the operation summary heading
 * — the page-level route composes a single `# Summary` plus per-variant
 * `## v{N} (latest?)` sub-headings around each call.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import type { EndpointData } from "@lib/api/schemas/views";
import { getDefaultRegions } from "@lib/api/regionResolver";
import { appHost } from "@config/regions";
import {
  Ast,
  NO_CONTENT,
  heading,
  inline,
  nodesFromMd,
  plaintext,
} from "@lib/plaintext/helpers";
import { alertNode } from "@components/Alert/plaintext/Alert";
import { apiMethodBadgeNode } from "@components/ApiMethodBadge/plaintext/ApiMethodBadge";
import { apiSchemaTableNode } from "@components/ApiSchemaTable/plaintext/ApiSchemaTable";
import { apiRequestBodyTabsNodes } from "@components/ApiRequestBodyTabs/plaintext/ApiRequestBodyTabs";
import { apiResponseNode } from "@components/ApiResponse/plaintext/ApiResponse";
import { apiCodeExampleNode } from "@components/ApiCodeExample/plaintext/ApiCodeExample";

export function apiEndpointNodes(ep: EndpointData): MarkdocNode[] {
  return [
    ...statusNotice(ep),
    ...descriptionNodes(ep),
    ...regionTableNodes(ep),
    ...permissionsNodes(ep),
    ...oauthScopesNodes(ep),
    ...argumentsNodes(ep),
    ...requestBodyNodes(ep),
    ...responseNodes(ep),
    ...codeExampleNodes(ep),
  ];
}

function statusNotice(ep: EndpointData): MarkdocNode[] {
  if (ep.deprecated) {
    const link = ep.newerVersionUrl
      ? ` [Use the newer version.](${ep.newerVersionUrl})`
      : "";
    const body = nodesFromMd(`This endpoint is deprecated.${link}`);
    return [alertNode("warning", body)];
  }
  if (ep.unstable) {
    const msg =
      ep.unstableMessage ??
      "This endpoint is unstable and may change without notice.";
    return [alertNode("warning", nodesFromMd(msg))];
  }
  return NO_CONTENT;
}

function descriptionNodes(ep: EndpointData): MarkdocNode[] {
  if (!ep.description) {
    return NO_CONTENT;
  }
  return nodesFromMd(ep.description);
}

function permissionsNodes(ep: EndpointData): MarkdocNode[] {
  if (!ep.permissions || ep.permissions.length === 0) {
    return NO_CONTENT;
  }
  return nodesFromMd(`**Permissions:** \`${ep.permissions.join("`, `")}\``);
}

function oauthScopesNodes(ep: EndpointData): MarkdocNode[] {
  if (!ep.oauthScopes || ep.oauthScopes.length === 0) {
    return NO_CONTENT;
  }
  return nodesFromMd(
    `OAuth apps require the \`${ep.oauthScopes.join("`, `")}\` authorization scope to access this endpoint.`,
  );
}

function regionTableNodes(ep: EndpointData): MarkdocNode[] {
  const regions = getDefaultRegions();

  type Row = { site: string; url: string };
  const rows: Row[] = [];
  for (const region of regions) {
    const url = ep.regionUrls?.[region.key];
    if (!url) {
      continue;
    }
    const site = appHost(region.key) ?? region.site;
    rows.push({ site, url });
  }
  if (rows.length === 0) {
    return NO_CONTENT;
  }

  const th = (text: string): MarkdocNode => {
    return new Ast.Node("th", {}, [inline([plaintext(text)])]);
  };

  const siteCell = (site: string): MarkdocNode => {
    return new Ast.Node("td", {}, [inline([plaintext(site)])]);
  };

  const urlCell = (url: string): MarkdocNode => {
    return new Ast.Node("td", {}, [
      inline([apiMethodBadgeNode(ep.method), plaintext(` ${url}`)]),
    ]);
  };

  const headRow = new Ast.Node("tr", {}, [
    th("Datadog site"),
    th("API endpoint"),
  ]);
  const thead = new Ast.Node("thead", {}, [headRow]);
  const bodyRows = rows.map((r) => {
    return new Ast.Node("tr", {}, [siteCell(r.site), urlCell(r.url)]);
  });
  const tbody = new Ast.Node("tbody", {}, bodyRows);
  const table = new Ast.Node("table", {}, [thead, tbody]);

  return [table];
}

function argumentsNodes(ep: EndpointData): MarkdocNode[] {
  const tables: MarkdocNode[] = [];
  if (ep.pathParams && ep.pathParams.length > 0) {
    const t = apiSchemaTableNode(ep.pathParams);
    if (t) {
      tables.push(t);
    }
  }
  if (ep.queryParams && ep.queryParams.length > 0) {
    const t = apiSchemaTableNode(ep.queryParams);
    if (t) {
      tables.push(t);
    }
  }
  if (ep.headerParams && ep.headerParams.length > 0) {
    const t = apiSchemaTableNode(ep.headerParams);
    if (t) {
      tables.push(t);
    }
  }
  if (tables.length === 0) {
    return NO_CONTENT;
  }
  return [heading(3, "Arguments"), ...tables];
}

function requestBodyNodes(ep: EndpointData): MarkdocNode[] {
  if (!ep.requestBody) {
    return NO_CONTENT;
  }
  const suffix = ep.requestBody.required ? "(required)" : "(optional)";
  const contents: MarkdocNode[] = [heading(3, `Request Body ${suffix}`)];
  if (ep.requestBody.description) {
    contents.push(...nodesFromMd(ep.requestBody.description));
  }
  contents.push(
    ...apiRequestBodyTabsNodes({
      schema: ep.requestBody.schema,
      examples: ep.requestBody.examples,
    }),
  );
  return contents;
}

function responseNodes(ep: EndpointData): MarkdocNode[] {
  if (!ep.responses || ep.responses.length === 0) {
    return NO_CONTENT;
  }
  const tabs = apiResponseNode(ep.responses);
  if (!tabs) {
    return NO_CONTENT;
  }
  return [heading(3, "Response"), tabs];
}

function codeExampleNodes(ep: EndpointData): MarkdocNode[] {
  if (!ep.codeExamples || ep.codeExamples.length === 0) {
    return NO_CONTENT;
  }
  const tabs = apiCodeExampleNode(ep.codeExamples);
  if (!tabs) {
    return NO_CONTENT;
  }
  return [heading(3, "Code Example"), tabs];
}
