import { describe, it, expect } from 'vitest';
import { renderApiRequestBodyTabsMd } from './ApiRequestBodyTabs.md';
import type { SchemaField } from '../../../data/api/resolver';

const schema: SchemaField[] = [
  { name: 'id', type: 'string', required: true, deprecated: false, readOnly: false, description: 'Identifier' },
];
const examples = [{ name: 'Default', value: '{"id":"abc"}' }];

describe('renderApiRequestBodyTabsMd', () => {
  it('returns empty string when both schema and examples are empty', () => {
    expect(renderApiRequestBodyTabsMd({ schema: [], examples: [] })).toBe('');
  });

  it('returns just the schema table when no examples are present', () => {
    const out = renderApiRequestBodyTabsMd({ schema, examples: [] });
    expect(out).toContain('| Parent field |');
    expect(out).not.toContain('{% tabs %}');
  });

  it('returns just the example fence when no schema is present', () => {
    const out = renderApiRequestBodyTabsMd({ schema: [], examples });
    expect(out).toContain('```json');
    expect(out).toContain('{"id":"abc"}');
    expect(out).not.toContain('{% tabs %}');
  });

  it('wraps schema and examples in Model/Example tabs when both are present', () => {
    const out = renderApiRequestBodyTabsMd({ schema, examples });
    expect(out).toContain('{% tabs %}');
    expect(out).toContain('{% tab label="Model" %}');
    expect(out).toContain('{% tab label="Example" %}');
    expect(out).toContain('{% /tab %}');
    expect(out).toContain('{% /tabs %}');
    expect(out).toContain('| Parent field |');
    expect(out).toContain('```json');
  });

  it('labels each example by name when there are multiple', () => {
    const multi = [
      { name: 'First', value: '{}' },
      { name: 'Second', value: '{}' },
    ];
    const out = renderApiRequestBodyTabsMd({ schema: [], examples: multi });
    expect(out).toContain('**First**');
    expect(out).toContain('**Second**');
  });
});
