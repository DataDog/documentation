/**
 * AST twin of `ApiEndpointSummary.astro`.
 *
 * Builds the block-level Markdoc nodes for one endpoint's summary on a
 * category landing page: a level-2 heading linking to the full endpoint page,
 * followed by the method and primary-region URL. Plaintext can't switch
 * regions, so it shows the first available default region's URL.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import type { ApiOperationStub } from "@lib/api/schemas/views";
import { getDefaultRegions } from "@lib/api/regionResolver";
import {
  Ast,
  NO_CONTENT,
  inline,
  link,
  paragraph,
  plaintext,
} from "@lib/plaintext/helpers";
import { apiMethodBadgeNode } from "@components/ApiMethodBadge/plaintext/ApiMethodBadge";

export function apiEndpointSummaryNodes(
  stub: ApiOperationStub,
  href: string,
): MarkdocNode[] {
  return [headingNode(stub, href), ...urlLineNodes(stub)];
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

function urlLineNodes(stub: ApiOperationStub): MarkdocNode[] {
  const url = primaryRegionUrl(stub.regionUrls);
  if (!url) {
    return NO_CONTENT;
  }
  return [
    paragraph([
      inline([
        apiMethodBadgeNode(stub.method),
        plaintext(" "),
        new Ast.Node("code", { content: url }),
      ]),
    ]),
  ];
}

/** First default-region URL present in the map (regions are ordered). */
function primaryRegionUrl(
  regionUrls: Record<string, string>,
): string | undefined {
  for (const region of getDefaultRegions()) {
    const url = regionUrls[region.key];
    if (url) {
      return url;
    }
  }
  return Object.values(regionUrls)[0];
}
