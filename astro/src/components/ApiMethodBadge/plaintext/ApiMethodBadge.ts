import type { Node as MarkdocNode } from "@markdoc/markdoc";
import { boldNode, textNode } from "@lib/plaintext/helpers";

/**
 * AST twin of `ApiMethodBadge.astro`.
 *
 * Produces an inline `strong` node containing the uppercased HTTP method.
 */
export function apiMethodBadgeNode(method: string): MarkdocNode {
  return boldNode([textNode(method.toUpperCase())]);
}
