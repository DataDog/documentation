import type { Node as MarkdocNode } from "@markdoc/markdoc";
import { tag } from "@lib/plaintext/helpers";

/**
 * Build the plaintext (Markdoc AST) representation of an `{% agent-only %}`
 * block.
 *
 * The rendered component is hidden from human readers (see ../AgentOnly.astro),
 * but the plaintext twin deliberately *keeps* the content, wrapped in the tag,
 * so AI agents consuming the page's `.md` still receive the instructions.
 */
export function agentOnlyNode(children: MarkdocNode[] = []): MarkdocNode {
  return tag("agent-only", {}, children);
}
