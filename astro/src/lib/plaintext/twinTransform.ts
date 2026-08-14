/**
 * Render an authored `.mdoc` body to plaintext by routing each Markdoc tag
 * through its component's plaintext twin.
 *
 * The `.md.ts` routes for the API pages build their plaintext from view data
 * via the twins directly. The Markdoc component *test pages*, by contrast, are
 * authored as free-form `.mdoc`, so there's no view model to hand a twin. This
 * module bridges that gap: it parses the source, walks the AST, and for every
 * tag that has a registered twin it rebuilds the node via that twin. The result
 * is a faithful preview of what each twin emits — which can differ from a naive
 * `format(parse())` round-trip (for example, the twins drop attributes that
 * equal their schema defaults).
 *
 * Tags without a twin (and all plain markdown) round-trip through `format()`
 * unchanged.
 */

import type { Node as MarkdocNode } from "@markdoc/markdoc";
import { buildMarkdocStr, parse } from "@lib/plaintext/helpers";
import type { HeadingLevel } from "@lib/componentUtils/headingLevels";
import { collapseContentNode } from "@components/CollapseContent/plaintext/CollapseContent";
import { alertNode, type AlertLevel } from "@components/Alert/plaintext/Alert";
import { agentOnlyNode } from "@components/AgentOnly/plaintext/AgentOnly";
import {
  stepperNodes,
  type StepInput,
} from "@components/Stepper/plaintext/Stepper";
import { imgNode } from "@components/Img/plaintext/Img";
import { IMAGES_URL } from "@config/images";

/**
 * Adapts a parsed Markdoc tag node into its plaintext-twin equivalent. Most
 * twins map one tag to one node, but some (the stepper) expand to a sequence of
 * sibling nodes, so an adapter may return an array.
 */
type TwinAdapter = (node: MarkdocNode) => MarkdocNode | MarkdocNode[];

const attr = (node: MarkdocNode, name: string): unknown =>
  node.attributes?.[name];

const twinAdaptersByTag: Record<string, TwinAdapter> = {
  "collapse-content": (node) =>
    collapseContentNode(
      String(attr(node, "title") ?? ""),
      transformNodes(node.children),
      { level: attr(node, "level") as HeadingLevel | undefined },
    ),

  alert: (node) =>
    alertNode(
      (attr(node, "level") ?? "info") as AlertLevel,
      transformNodes(node.children),
    ),

  "agent-only": (node) => agentOnlyNode(transformNodes(node.children)),

  img: (node) => {
    if (attr(node, "inline")) return []; // Drop inline images from plaintext
    return imgNode({
      src: `${IMAGES_URL}/images/${String(attr(node, "src") ?? "")}`,
      alt: attr(node, "alt") as string | undefined,
      caption: attr(node, "caption") as string | undefined,
      video: attr(node, "video") as boolean | undefined,
    });
  },

  stepper: (node) => {
    const steps: StepInput[] = [];
    let finished: MarkdocNode[] | undefined;

    for (const child of node.children) {
      if (child.type !== "tag") continue;
      if (child.tag === "step") {
        steps.push({
          title: String(attr(child, "title") ?? ""),
          children: transformNodes(child.children),
        });
      } else if (child.tag === "stepper-finished") {
        finished = transformNodes(child.children);
      }
    }

    return stepperNodes(steps, {
      level: attr(node, "level") as HeadingLevel | undefined,
      finished,
    });
  },
};

/**
 * Transform one node: if it's a tag with a registered twin, rebuild it via the
 * twin (which recurses into its own kept children). Otherwise recurse into
 * children in place. Non-tag nodes are returned untouched so `format()` can
 * serialize them as authored.
 */
function transformNode(node: MarkdocNode): MarkdocNode | MarkdocNode[] {
  if (node.type === "tag" && node.tag && twinAdaptersByTag[node.tag]) {
    return twinAdaptersByTag[node.tag](node);
  }
  if (node.children && node.children.length > 0) {
    node.children = transformNodes(node.children);
  }
  return node;
}

// `flatMap` lets an adapter expand one tag into several sibling nodes (e.g. the
// stepper -> a run of headings and content).
function transformNodes(nodes: MarkdocNode[]): MarkdocNode[] {
  return nodes.flatMap(transformNode);
}

export function renderMdocWithTwins(body: string): string {
  const document = parse(body);
  const transformed = transformNodes(document.children);
  return buildMarkdocStr(transformed);
}
