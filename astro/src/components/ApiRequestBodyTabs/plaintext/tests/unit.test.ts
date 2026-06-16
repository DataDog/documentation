import { describe, it, expect } from 'vitest';
import { format } from '@markdoc/markdoc';
import { documentNode } from '@lib/plaintext/helpers';
import { apiRequestBodyTabsNodes } from '../ApiRequestBodyTabs';
import type { SchemaField } from '@lib/api/schemas/schemaField';

const schema: SchemaField[] = [
  { name: 'id', type: 'string', required: true, deprecated: false, readOnly: false, description: 'Identifier' },
];
const examples = [{ name: 'Default', value: '{"id":"abc"}' }];

function render(props: { schema: SchemaField[]; examples: { name: string; value: string }[] }): string {
  const contents = apiRequestBodyTabsNodes(props);
  return format(documentNode(contents));
}

describe('apiRequestBodyTabsNodes', () => {
  it('returns an empty list when both schema and examples are empty', () => {
    expect(apiRequestBodyTabsNodes({ schema: [], examples: [] })).toEqual([]);
  });

  it('returns just the schema table when no examples are present', () => {
    const out = render({ schema, examples: [] });
    expect(out).toContain('Parent field');
    expect(out).not.toContain('{% tabs %}');
  });

  it('returns just the example fence when no schema is present', () => {
    const out = render({ schema: [], examples });
    expect(out).toContain('```json');
    expect(out).toContain('{"id":"abc"}');
    expect(out).not.toContain('{% tabs %}');
  });

  it('wraps schema and examples in Model/Example tabs when both are present', () => {
    const out = render({ schema, examples });
    expect(out).toContain('{% tabs %}');
    expect(out).toContain('label="Model"');
    expect(out).toContain('label="Example"');
    expect(out).toContain('Parent field');
    expect(out).toContain('```json');
  });

  it('labels each example by name when there are multiple', () => {
    const multi = [
      { name: 'First', value: '{}' },
      { name: 'Second', value: '{}' },
    ];
    const out = render({ schema: [], examples: multi });
    expect(out).toContain('**First**');
    expect(out).toContain('**Second**');
  });
});
