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
import {
  cardGridNode,
  type PlaintextCard,
} from "@components/CardGrid/plaintext/CardGrid";
import { IMAGES_URL } from "@config/images";

/**
 * Adapts a parsed Markdoc tag node into its plaintext-twin equivalent. Most
 * twins map one tag to one node, but some (the stepper) expand to a sequence of
 * sibling nodes, so an adapter may return an array.
 */
type TwinAdapter = (node: MarkdocNode) => MarkdocNode | MarkdocNode[];

export interface TwinRenderOptions {
  /**
   * Astro's `site`, used to make authored hrefs absolute. Threaded from the
   * route rather than derived here: the `.md` route is SSR (`prerender = false`),
   * so reading the environment at module load would bake a build-time value
   * into the server bundle.
   *
   * Omitted in tests that don't care about URLs, which leaves hrefs relative.
   */
  site?: string | URL;
}

const attr = (node: MarkdocNode, name: string): unknown =>
  node.attributes?.[name];

/**
 * Yield a node's children, replacing paragraph and inline wrappers with the
 * nodes they contain. Markdoc only makes a tag a direct child when it sits
 * alone on its line; inline siblings end up nested inside a paragraph.
 */
function* unwrapChildParagraphs(node: MarkdocNode): Generator<MarkdocNode> {
  for (const child of node.children) {
    if (child.type === "paragraph" || child.type === "inline") {
      yield* unwrapChildParagraphs(child);
    } else {
      yield child;
    }
  }
}

function buildTwinAdapters(
  options: TwinRenderOptions,
): Record<string, TwinAdapter> {
  // Bound to a name first so each adapter can recurse through `descend`, which
  // needs the very map being built. Safe because adapter bodies only run later,
  // during traversal.
  const adaptersByTag: Record<string, TwinAdapter> = {
    "collapse-content": (node) =>
      collapseContentNode(
        String(attr(node, "title") ?? ""),
        descend(node.children),
        { level: attr(node, "level") as HeadingLevel | undefined },
      ),

    alert: (node) =>
      alertNode(
        (attr(node, "level") ?? "info") as AlertLevel,
        descend(node.children),
      ),

    "agent-only": (node) => agentOnlyNode(descend(node.children)),

    img: (node) => {
      if (attr(node, "inline")) return []; // Drop inline images from plaintext
      return imgNode({
        src: `${IMAGES_URL}/images/${String(attr(node, "src") ?? "")}`,
        alt: attr(node, "alt") as string | undefined,
        caption: attr(node, "caption") as string | undefined,
        video: attr(node, "video") as boolean | undefined,
      });
    },

    "card-grid": (node) => {
      const cards: PlaintextCard[] = [];
      // Markdoc wraps inline siblings (two self-closing tags on one line) in a
      // paragraph, so cards are not always direct children. This mirrors the
      // same unwrapping in markdoc.config.mjs; without it those cards would be
      // dropped from the plaintext twin while still rendering in HTML.
      for (const child of unwrapChildParagraphs(node)) {
        if (child.type !== "tag" || child.tag !== "image-card") continue;
        cards.push({
          href: String(attr(child, "href") ?? ""),
          title: attr(child, "title") as string | undefined,
          subtitle: attr(child, "subtitle") as string | undefined,
        });
      }
      return cardGridNode(cards, options.site);
    },

    stepper: (node) => {
      const steps: StepInput[] = [];
      let finished: MarkdocNode[] | undefined;

      for (const child of node.children) {
        if (child.type !== "tag") continue;
        if (child.tag === "step") {
          steps.push({
            title: String(attr(child, "title") ?? ""),
            children: descend(child.children),
          });
        } else if (child.tag === "stepper-finished") {
          finished = descend(child.children);
        }
      }

      return stepperNodes(steps, {
        level: attr(node, "level") as HeadingLevel | undefined,
        finished,
      });
    },
  };

  function descend(nodes: MarkdocNode[]): MarkdocNode[] {
    return transformNodes(nodes, adaptersByTag);
  }

  return adaptersByTag;
}

/**
 * Transform one node: if it's a tag with a registered twin, rebuild it via the
 * twin (which recurses into its own kept children). Otherwise recurse into
 * children in place. Non-tag nodes are returned untouched so `format()` can
 * serialize them as authored.
 */
function transformNode(
  node: MarkdocNode,
  adaptersByTag: Record<string, TwinAdapter>,
): MarkdocNode | MarkdocNode[] {
  if (node.type === "tag" && node.tag && adaptersByTag[node.tag]) {
    return adaptersByTag[node.tag](node);
  }
  if (node.children && node.children.length > 0) {
    node.children = transformNodes(node.children, adaptersByTag);
  }
  return node;
}

// `flatMap` lets an adapter expand one tag into several sibling nodes (e.g. the
// stepper -> a run of headings and content).
function transformNodes(
  nodes: MarkdocNode[],
  adaptersByTag: Record<string, TwinAdapter>,
): MarkdocNode[] {
  return nodes.flatMap((node) => transformNode(node, adaptersByTag));
}

export function renderMdocWithTwins(
  body: string,
  options: TwinRenderOptions = {},
): string {
  const document = parse(body);
  const transformed = transformNodes(
    document.children,
    buildTwinAdapters(options),
  );
  return buildMarkdocStr(transformed);
}
