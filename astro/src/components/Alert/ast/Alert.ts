import type { Node as MarkdocNode } from '@markdoc/markdoc';
import { Ast } from '@lib/ast/helpers';

export type AlertLevel = 'info' | 'danger' | 'warning' | 'tip';

export function alertNode(level: AlertLevel, children: MarkdocNode[] = []): MarkdocNode {
  return new Ast.Node('tag', { level }, children, 'alert');
}
