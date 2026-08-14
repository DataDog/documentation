/**
 * AST twin of the `{% stepper %}` component family (`Stepper.astro` /
 * `Step.astro` / `StepperFinished.astro`).
 *
 * The rendered stepper adds interactive chrome (Next/Previous/Finish buttons,
 * "Expand all", "Start over") at render time — none of which lives in the
 * authored `.mdoc` source or is useful to an AI agent. The plaintext twin drops
 * both that chrome and the `{% stepper %}`/`{% step %}` wrapper: each step
 * becomes a numbered heading (at the stepper's configured level) followed by
 * that step's content, and an optional `{% stepper-finished %}` block's content
 * is appended after the steps. Because a stepper expands to a *sequence* of
 * sibling nodes rather than one wrapper, the twin returns a node array.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import { heading } from "@lib/plaintext/helpers";
import type { HeadingLevel } from "@lib/componentUtils/headingLevels";

export interface StepInput {
  title: string;
  children?: MarkdocNode[];
}

export interface StepperOptions {
  level?: HeadingLevel;
  /** Content for a trailing `{% stepper-finished %}` block, if any. */
  finished?: MarkdocNode[];
}

/** `"h3"` -> `3`. */
function headingLevelNumber(level: HeadingLevel): number {
  return Number(level.slice(1));
}

export function stepperNodes(
  steps: StepInput[],
  options: StepperOptions = {},
): MarkdocNode[] {
  const { level = "h3", finished } = options;
  const levelNumber = headingLevelNumber(level);

  const nodes: MarkdocNode[] = [];
  steps.forEach((step, index) => {
    const stepNumber = index + 1;
    const headingText = step.title
      ? `Step ${stepNumber}: ${step.title}`
      : `Step ${stepNumber}`;
    nodes.push(heading(levelNumber, headingText));
    if (step.children) {
      nodes.push(...step.children);
    }
  });

  if (finished && finished.length > 0) {
    nodes.push(...finished);
  }

  return nodes;
}
