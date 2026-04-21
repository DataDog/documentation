import { describe, it, expect } from 'vitest';
import { render } from 'preact-render-to-string';
import { h } from 'preact';
import { SchemaTable } from './SchemaTable';

const flatFields = [
  {
    name: 'id',
    type: 'string',
    required: true,
    deprecated: false,
    readOnly: false,
    description: 'Unique identifier',
  },
  {
    name: 'tags',
    type: '[string]',
    required: false,
    deprecated: false,
    readOnly: false,
    description: 'List of tags',
  },
];

describe('SchemaTable component', () => {
  it('renders with data-testid and column headers', () => {
    const html = render(h(SchemaTable, { fields: flatFields }));

    expect(html).toContain('data-testid="schema-table"');
    expect(html).toContain('Name');
    expect(html).toContain('Type');
    expect(html).toContain('Description');
  });

  it('renders a row for every top-level field', () => {
    const html = render(h(SchemaTable, { fields: flatFields }));
    const rowCount = (html.match(/data-testid="schema-table-row"/g) ?? []).length;

    expect(rowCount).toBe(2);
    expect(html).toContain('Unique identifier');
    expect(html).toContain('List of tags');
  });

  it('flags required fields with a [required] marker', () => {
    const html = render(h(SchemaTable, { fields: flatFields }));

    expect(html).toContain('data-testid="schema-field-required"');
    expect(html).toContain('[required]');
  });

  it('renders toggle controls for fields with children', () => {
    const nested = [
      {
        name: 'parent',
        type: 'object',
        required: false,
        deprecated: false,
        readOnly: false,
        description: '',
        children: [
          {
            name: 'child',
            type: 'string',
            required: false,
            deprecated: false,
            readOnly: false,
            description: '',
          },
        ],
      },
    ];
    const html = render(h(SchemaTable, { fields: nested }));

    expect(html).toContain('data-testid="schema-table-toggle"');
    expect(html).toContain('data-testid="schema-table-expand-all"');
  });
});
