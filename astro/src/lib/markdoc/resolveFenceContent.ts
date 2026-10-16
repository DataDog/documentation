import type { Node, RenderableTreeNode } from "@markdoc/markdoc";

/**
 * The text a code fence should show, with variables such as
 * `{% $sdkVersions.<client> %}` resolved.
 *
 * Markdoc fills a fence's `content` attribute with the raw source and resolves
 * variables only in its children, so the resolved text is the children joined.
 * The raw source is kept instead when:
 *
 * - there are no children (`process=false`, as Markdoc's own fence transform
 *   does), or
 * - the fence contains a tag, because it shows Markdoc syntax as an example.
 *   Checked on the AST, not the output: without the tag's schema (the
 *   plaintext pipeline), Markdoc reduces a tag to its inner text, and joining
 *   would silently drop the `{% tag %}` lines.
 *
 * Used by the HTML fence transform in `markdoc.config.mjs` and by the `.md`
 * twins, so both outputs show the same text.
 */
export function resolveFenceContent(
  fence: Node,
  transformedChildren: RenderableTreeNode[],
): string {
  const rawContent = String(fence.attributes.content ?? "");
  if (transformedChildren.length === 0) return rawContent;

  for (const descendant of fence.walk()) {
    if (descendant.type === "tag") return rawContent;
  }

  const childrenAreText = transformedChildren.every(
    (child) => typeof child === "string",
  );
  return childrenAreText ? transformedChildren.join("") : rawContent;
}
