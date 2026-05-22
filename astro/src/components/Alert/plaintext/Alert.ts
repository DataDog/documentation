import type { Node as MarkdocNode } from "@markdoc/markdoc";
import { tagNode } from "@lib/plaintext/helpers";

export type AlertLevel = "info" | "danger" | "warning" | "tip";

export function alertNode(
  level: AlertLevel,
  children: MarkdocNode[] = [],
): MarkdocNode {
  return tagNode("alert", { level }, children);
}
