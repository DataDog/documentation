/**
 * AST twin of the `{% collapse-content %}` component (`CollapseContent.astro`).
 *
 * The rendered component adds interactive chrome (a clickable summary that
 * expands/collapses the body) that lives only at render time and is useless to
 * an AI agent. Like the stepper twin, this one drops the `{% collapse-content %}`
 * wrapper entirely: the title becomes a heading (at the component's configured
 * level) followed by the body content. Because that's a *sequence* of sibling
 * nodes rather than one wrapper, the twin returns a node array.
 *
 * Unlike `html-to-mdoc`, which infers the summary's heading level from the
 * surrounding document, we know the level authoritatively from the component's
 * `level` attribute, so we use it directly.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import { heading } from "@lib/plaintext/helpers";
import type { HeadingLevel } from "@lib/componentUtils/headingLevels";

export interface CollapseContentOptions {
  level?: HeadingLevel;
}

/** `"h3"` -> `3`. */
function headingLevelNumber(level: HeadingLevel): number {
  return Number(level.slice(1));
}

export function collapseContentNode(
  title: string,
  children: MarkdocNode[] = [],
  options: CollapseContentOptions = {},
): MarkdocNode[] {
  const { level = "h3" } = options;
  return [heading(headingLevelNumber(level), title), ...children];
}
