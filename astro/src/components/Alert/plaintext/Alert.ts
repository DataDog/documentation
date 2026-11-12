import type { Node as MarkdocNode } from "@markdoc/markdoc";
import { tag } from "@lib/plaintext/helpers";

export type AlertLevel = "info" | "danger" | "warning" | "tip";

export function alertNode(
  level: AlertLevel,
  children: MarkdocNode[] = [],
): MarkdocNode {
  return tag("alert", { level }, children);
}
