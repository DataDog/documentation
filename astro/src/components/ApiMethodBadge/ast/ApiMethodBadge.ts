import type { Node as MarkdocNode } from '@markdoc/markdoc';
import { Ast, textNode } from '@lib/ast/helpers';

/**
 * AST twin of `ApiMethodBadge.astro` / `renderApiMethodBadgeMd`.
 *
 * Produces an inline `strong` node containing the uppercased HTTP method.
 */
export function apiMethodBadgeNode(method: string): MarkdocNode {
  return new Ast.Node('strong', {}, [textNode(method.toUpperCase())]);
}
