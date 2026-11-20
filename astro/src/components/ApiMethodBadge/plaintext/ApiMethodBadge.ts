import type { Node as MarkdocNode } from "@markdoc/markdoc";
import { plaintext } from "@lib/plaintext/helpers";

/**
 * AST twin of `ApiMethodBadge.astro`.
 *
 * Produces the uppercased HTTP method as plain text. The HTML badge is styled,
 * but the `.md` leaves it unbolded, as Hugo's `.md` does.
 */
export function apiMethodBadgeNode(method: string): MarkdocNode {
  return plaintext(method.toUpperCase());
}
