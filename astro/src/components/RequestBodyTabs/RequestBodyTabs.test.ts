import { describe, it, expect } from 'vitest';
import { render } from 'preact-render-to-string';
import { h } from 'preact';
import { RequestBodyTabs } from './RequestBodyTabs';

const schema = [
  {
    name: 'id',
    type: 'string',
    required: true,
    deprecated: false,
    readOnly: false,
    description: 'Identifier',
  },
];
const examples = [{ name: 'Example', value: '{"id": "abc"}' }];

describe('RequestBodyTabs component', () => {
  it('renders only the schema table when no examples are provided', () => {
    const html = render(h(RequestBodyTabs, { schema, examples: [] }));

    expect(html).toContain('data-testid="schema-table"');
    expect(html).not.toContain('data-testid="tabs"');
  });

  it('renders only code blocks when no schema is provided', () => {
    const html = render(h(RequestBodyTabs, { schema: [], examples }));

    expect(html).toContain('data-testid="code-block"');
    expect(html).not.toContain('data-testid="schema-table"');
    expect(html).not.toContain('data-testid="tabs"');
  });

  it('renders a Model/Example tab pair when both are provided', () => {
    const html = render(h(RequestBodyTabs, { schema, examples }));

    expect(html).toContain('data-testid="tabs"');
    expect(html).toContain('Model');
    expect(html).toContain('Example');
  });

  it('renders nothing when both schema and examples are empty', () => {
    const html = render(h(RequestBodyTabs, { schema: [], examples: [] }));

    expect(html).toBe('');
  });
});
