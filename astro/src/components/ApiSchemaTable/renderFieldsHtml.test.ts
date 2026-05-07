import { describe, it, expect } from 'vitest';
import {
  renderFieldsHtml,
  anyFieldExpandable,
} from './renderFieldsHtml';
import type { SchemaField } from '@lib/api/schemas/schemaField';

const cl = (...names: string[]): string => names.join(' ');

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

describe('anyFieldExpandable', () => {
  it('returns false when no field has children or unionOptions', () => {
    expect(anyFieldExpandable(flatFields)).toBe(false);
  });

  it('returns true when at least one top-level field has children', () => {
    expect(anyFieldExpandable(nestedFields)).toBe(true);
  });

  it('returns true when a top-level field has unionOptions', () => {
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
    expect(anyFieldExpandable(fields)).toBe(true);
  });
});

describe('renderFieldsHtml — flat fields', () => {
  it('emits one row per top-level field with its name, type, and description', () => {
    const html = renderFieldsHtml(flatFields, cl);
    expect(html).toContain('schema-table__row');
    expect(html).toContain('>id<');
    expect(html).toContain('>tags<');
    expect(html).toContain('Unique identifier');
    expect(html).toContain('List of tags');
  });

  it('flags required fields with the [required] marker', () => {
    const html = renderFieldsHtml(flatFields, cl);
    expect(html).toContain('schema-table__required');
    expect(html).toContain('[required]');
  });

  it('emits no toggle button when a field has no children', () => {
    const html = renderFieldsHtml(flatFields, cl);
    expect(html).not.toContain('schema-table__toggle');
  });

  it('emits no children container when a field has no children', () => {
    const html = renderFieldsHtml(flatFields, cl);
    expect(html).not.toContain('schema-table__children');
  });
});

describe('renderFieldsHtml — nested fields', () => {
  it('emits a toggle button for fields with children', () => {
    const html = renderFieldsHtml(nestedFields, cl);
    expect(html).toContain('schema-table__toggle');
    expect(html).toContain('aria-label="Toggle parent"');
  });

  it('emits a hidden children container with nested rows always rendered server-side', () => {
    const html = renderFieldsHtml(nestedFields, cl);
    expect(html).toMatch(/class="[^"]*schema-table__children[^"]*" hidden/);
    expect(html).toContain('A child field');
    expect(html).toContain('data-depth="1"');
  });

  it('starts every toggle in the collapsed state', () => {
    const html = renderFieldsHtml(nestedFields, cl);
    expect(html).toContain('aria-expanded="false"');
    expect(html).not.toContain('schema-table__toggle--expanded');
  });
});

describe('renderFieldsHtml — modifiers and content', () => {
  it('applies readonly and deprecated row modifiers', () => {
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
    const html = renderFieldsHtml(fields, cl);
    expect(html).toContain('schema-table__row--readonly');
    expect(html).toContain('schema-table__row--deprecated');
    expect(html).toContain('DEPRECATED');
  });

  it('renders enum values inline up to ENUM_INLINE_LIMIT and details for the rest', () => {
    const eleven = Array.from({ length: 11 }, (_, i) => `v${i}`);
    const html = renderFieldsHtml(
      [
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
      cl,
    );
    expect(html).toContain('schema-table__enum-details');
    expect(html).toContain('Show 1 more');
  });

  it('renders union options with labels and nested fields', () => {
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
    const html = renderFieldsHtml(fields, cl);
    expect(html).toContain('schema-table__union-label');
    expect(html).toContain('Option A');
    expect(html).toContain('A value');
  });

  it('escapes HTML in field names and types but lets the markdown renderer handle descriptions', () => {
    const html = renderFieldsHtml(
      [
        {
          name: '<not-a-tag>',
          type: '<int>',
          required: false,
          deprecated: false,
          readOnly: false,
          description: 'Plain text',
        },
      ],
      cl,
    );
    expect(html).toContain('&lt;not-a-tag&gt;');
    expect(html).toContain('&lt;int&gt;');
  });
});
