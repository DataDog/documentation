import { describe, it, expect } from 'vitest';
import { format, parse } from '@markdoc/markdoc';
import { alertNode } from '../Alert';

describe('alertNode', () => {
  it('returns a node with no errors', () => {
    const node = alertNode('warning', []);
    expect(node.errors).toHaveLength(0);
  });

  it('can be formatted as plaintext with format()', () => {
    const children = parse('Heads up.').children;
    const node = alertNode('warning', children);
    const result = format(node);
    expect(result).toContain('{% alert');
    expect(result).toContain('level="warning"');
    expect(result).toContain('Heads up.');
    expect(result).toContain('{% /alert %}');
  });

  it('supports all four levels', () => {
    for (const level of ['info', 'danger', 'warning', 'tip'] as const) {
      const node = alertNode(level, []);
      expect(format(node)).toContain(`level="${level}"`);
    }
  });
});
