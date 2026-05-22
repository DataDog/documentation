import type { Node as MarkdocNode } from '@markdoc/markdoc';
import { Ast } from '@lib/ast/helpers';
import type { AlertLevel } from '../plaintext/Alert';

export function alertNode(level: AlertLevel, children: MarkdocNode[] = []): MarkdocNode {
  return new Ast.Node('tag', { level }, children, 'alert');
}
