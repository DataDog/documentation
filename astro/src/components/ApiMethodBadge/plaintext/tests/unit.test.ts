import { describe, it, expect } from 'vitest';
import { format } from '@markdoc/markdoc';
import { documentNode } from '@lib/plaintext/helpers';
import { apiMethodBadgeNode } from '../ApiMethodBadge';

describe('apiMethodBadgeNode', () => {
  it('renders the method uppercased and bold', () => {
    const node = apiMethodBadgeNode('get');
    expect(format(documentNode([node])).trim()).toBe('**GET**');
  });

  it('preserves already uppercased methods', () => {
    const node = apiMethodBadgeNode('DELETE');
    expect(format(documentNode([node])).trim()).toBe('**DELETE**');
  });
});
