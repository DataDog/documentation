import type { Node as MarkdocNode } from "@markdoc/markdoc";
import Markdoc from "@markdoc/markdoc";
import { resolveFenceContent } from "@lib/markdoc/resolveFenceContent";

/**
 * Resolve variables inside code fences, in place, before `format()` prints the
 * AST as text.
 *
 * `format()` prints a fence's raw `content` attribute, so without this step a
 * `.md` twin shows `{% $sdkVersions.<client> %}` literally. Variables outside
 * fences stay as Markdoc syntax, as every other tag in the twin does.
 */
export function resolveFenceVariables(
  nodes: MarkdocNode[],
  variables: Record<string, unknown>,
): void {
  for (const node of nodes) {
    for (const descendant of [node, ...node.walk()]) {
      if (descendant.type !== "fence") continue;
      // `Markdoc.transform` adds Markdoc's default node schemas, which a bare
      // `transformChildren` call would not, so the children resolve to text.
      const rendered = Markdoc.transform(descendant, { variables });
      const transformedChildren = Markdoc.Tag.isTag(rendered)
        ? rendered.children
        : [];
      descendant.attributes.content = resolveFenceContent(
        descendant,
        transformedChildren,
      );
    }
  }
}
