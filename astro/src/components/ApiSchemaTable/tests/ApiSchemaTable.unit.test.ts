import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
// @ts-ignore — Preact renderer is registered for SSR of the nested ApiSchemaTableNav island.
import preactRenderer from '@astrojs/preact/server.js';
import ApiSchemaTable from '../ApiSchemaTable.astro';
import type { SchemaField } from '@lib/api/schemas/schemaField';

const flatFields: SchemaField[] = [
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

const nestedFields: SchemaField[] = [
  {
    name: 'parent',
    type: 'object',
    required: false,
    deprecated: false,
    readOnly: false,
    description: 'A parent object',
    children: [
      {
        name: 'child',
        type: 'string',
        required: false,
        deprecated: false,
        readOnly: false,
        description: 'A child field',
      },
    ],
  },
];

async function renderTable(props: { fields: SchemaField[]; showExpandAll?: boolean }) {
  const container = await AstroContainer.create();
  container.addServerRenderer({ renderer: preactRenderer, name: '@astrojs/preact' });
  return container.renderToString(ApiSchemaTable, { props });
}

describe('ApiSchemaTable expand-all toolbar', () => {
  it('omits the toolbar when no field has children or unionOptions', async () => {
    const html = await renderTable({ fields: flatFields });
    expect(html).not.toContain('schema-table__toolbar');
  });

  it('shows the toolbar when at least one field has children', async () => {
    const html = await renderTable({ fields: nestedFields });
    expect(html).toContain('schema-table__toolbar');
  });

  it('shows the toolbar when a field has unionOptions', async () => {
    const fields: SchemaField[] = [
      {
        name: 'variant',
        type: 'oneOf',
        required: false,
        deprecated: false,
        readOnly: false,
        description: '',
        unionOptions: [
          {
            label: 'Option A',
            fields: [
              {
                name: 'value',
                type: 'string',
                required: false,
                deprecated: false,
                readOnly: false,
                description: '',
              },
            ],
          },
        ],
      },
    ];
    const html = await renderTable({ fields });
    expect(html).toContain('schema-table__toolbar');
  });

  it('omits the toolbar when showExpandAll is false', async () => {
    const html = await renderTable({ fields: nestedFields, showExpandAll: false });
    expect(html).not.toContain('schema-table__toolbar');
  });
});

describe('ApiSchemaTable — flat fields', () => {
  it('emits one row per top-level field with its name, type, and description', async () => {
    const html = await renderTable({ fields: flatFields });
    expect(html).toContain('schema-table__row');
    expect(html).toContain('>id<');
    expect(html).toContain('>tags<');
    expect(html).toContain('Unique identifier');
    expect(html).toContain('List of tags');
  });

  it('flags required fields with the [required] marker', async () => {
    const html = await renderTable({ fields: flatFields });
    expect(html).toContain('schema-table__required');
    expect(html).toContain('[required]');
  });

  it('emits no toggle button when a field has no children', async () => {
    const html = await renderTable({ fields: flatFields });
    expect(html).not.toContain('schema-table__toggle');
  });

  it('emits no children container when a field has no children', async () => {
    const html = await renderTable({ fields: flatFields });
    expect(html).not.toContain('schema-table__children');
  });
});

describe('ApiSchemaTable — nested fields', () => {
  it('emits a toggle button for fields with children', async () => {
    const html = await renderTable({ fields: nestedFields });
    expect(html).toContain('schema-table__toggle');
    expect(html).toContain('aria-label="Toggle parent"');
  });

  it('emits a hidden children container with nested rows always rendered server-side', async () => {
    const html = await renderTable({ fields: nestedFields });
    expect(html).toMatch(/class="[^"]*schema-table__children[^"]*" hidden/);
    expect(html).toContain('A child field');
    expect(html).toContain('data-depth="1"');
  });

  it('starts every toggle in the collapsed state', async () => {
    const html = await renderTable({ fields: nestedFields });
    expect(html).toContain('aria-expanded="false"');
    expect(html).not.toContain('schema-table__toggle--expanded');
  });
});

describe('ApiSchemaTable — modifiers and content', () => {
  it('applies readonly and deprecated row modifiers', async () => {
    const fields: SchemaField[] = [
      {
        name: 'a',
        type: 'string',
        required: false,
        deprecated: false,
        readOnly: true,
        description: '',
      },
      {
        name: 'b',
        type: 'string',
        required: false,
        deprecated: true,
        readOnly: false,
        description: '',
      },
    ];
    const html = await renderTable({ fields });
    expect(html).toContain('schema-table__row--readonly');
    expect(html).toContain('schema-table__row--deprecated');
    expect(html).toContain('DEPRECATED');
  });

  it('renders enum values inline up to the inline limit and details for the rest', async () => {
    const eleven = Array.from({ length: 11 }, (_, i) => `v${i}`);
    const html = await renderTable({
      fields: [
        {
          name: 'sort',
          type: 'string',
          required: false,
          deprecated: false,
          readOnly: false,
          description: '',
          enumValues: eleven,
        },
      ],
    });
    expect(html).toContain('schema-table__enum-details');
    expect(html).toContain('Show 1 more');
  });

  it('renders union options with labels and nested fields', async () => {
    const fields: SchemaField[] = [
      {
        name: 'variant',
        type: 'oneOf',
        required: false,
        deprecated: false,
        readOnly: false,
        description: '',
        unionOptions: [
          {
            label: 'Option A',
            fields: [
              {
                name: 'value',
                type: 'string',
                required: false,
                deprecated: false,
                readOnly: false,
                description: 'A value',
              },
            ],
          },
        ],
      },
    ];
    const html = await renderTable({ fields });
    expect(html).toContain('schema-table__union-label');
    expect(html).toContain('Option A');
    expect(html).toContain('A value');
  });

  it('escapes HTML in field names and types', async () => {
    const html = await renderTable({
      fields: [
        {
          name: '<not-a-tag>',
          type: '<int>',
          required: false,
          deprecated: false,
          readOnly: false,
          description: 'Plain text',
        },
      ],
    });
    expect(html).toContain('&lt;not-a-tag&gt;');
    expect(html).toContain('&lt;int&gt;');
  });
});
