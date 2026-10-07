/**
 * AST twin of `ApiEndpointSummary.astro`.
 *
 * Builds the block-level Markdoc nodes for one endpoint's summary on a
 * category landing page: a level-2 heading linking to the full endpoint page,
 * followed by the method and URL for each region. Plaintext can't switch
 * regions, so it lists them all, like the endpoint page.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import type { ApiOperationStub } from "@lib/api/schemas/views";
import { Ast, inline, link, plaintext } from "@lib/plaintext/helpers";
import { apiRegionTableNodes } from "@components/ApiEndpoint/plaintext/ApiEndpoint";

export function apiEndpointSummaryNodes(
  stub: ApiOperationStub,
  href: string,
): MarkdocNode[] {
  return [
    headingNode(stub, href),
    ...apiRegionTableNodes(stub.method, stub.regionUrls),
  ];
}

function headingNode(stub: ApiOperationStub, href: string): MarkdocNode {
  const children: MarkdocNode[] = [link(href, stub.summary)];
  // TODO: replace the literal "deprecated"/"preview" suffixes with i18n keys
  // once authoritative translations exist in the Hugo i18n bundle.
  if (stub.deprecated) {
    children.push(plaintext(" (deprecated)"));
  } else if (stub.unstable) {
    children.push(plaintext(" (preview)"));
  }
  return new Ast.Node("heading", { level: 2 }, [inline(children)]);
}
