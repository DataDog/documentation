import { describe, it, expect } from 'vitest';
import { renderApiSchemaTableMd } from './ApiSchemaTable.md';
import type { SchemaField } from '../../../data/api/resolver';

const field = (overrides: Partial<SchemaField> = {}): SchemaField => ({
  name: '',
  type: 'string',
  required: false,
  deprecated: false,
  readOnly: false,
  description: '',
  ...overrides,
});

describe('renderApiSchemaTableMd', () => {
  it('returns empty string when there are no fields', () => {
    expect(renderApiSchemaTableMd([])).toBe('');
  });

  it('renders the header row and a row per top-level field', () => {
    const out = renderApiSchemaTableMd([
      field({ name: 'id', type: 'string', required: true, description: 'Identifier' }),
      field({ name: 'enabled', type: 'boolean', description: 'Whether enabled.' }),
    ]);

    expect(out).toContain('| Parent field | Field | Type | Description |');
    expect(out).toContain('| --- | --- | --- | --- |');
    expect(out).toContain('|  | id [*required*] | string | Identifier |');
    expect(out).toContain('|  | enabled | boolean | Whether enabled. |');
  });

  it('flattens nested children with the parent name in the first column', () => {
    const out = renderApiSchemaTableMd([
      field({
        name: 'data',
        type: 'object',
        description: 'Data wrapper.',
        children: [
          field({ name: 'attributes', type: 'object', required: true, description: 'Attrs.' }),
        ],
      }),
    ]);

    expect(out).toContain('|  | data | object | Data wrapper. |');
    expect(out).toContain('| data | attributes [*required*] | object | Attrs. |');
  });

  it('renders union options with <oneOf> type and option rows', () => {
    const out = renderApiSchemaTableMd([
      field({
        name: 'integration',
        type: 'oneOf',
        required: true,
        description: 'The integration.',
        unionOptions: [
          {
            label: 'AWSIntegration',
            fields: [field({ name: 'aws_account_id', type: 'string', required: true, description: 'AWS account.' })],
          },
        ],
      }),
    ]);

    expect(out).toContain('| integration [*required*] | <oneOf> |');
    expect(out).toContain('| integration | AWSIntegration | object |  |');
    expect(out).toContain('| AWSIntegration | aws_account_id [*required*] | string | AWS account. |');
  });

  it('escapes pipe characters in description cells', () => {
    const out = renderApiSchemaTableMd([
      field({ name: 'mode', description: 'Use a | between values.' }),
    ]);
    expect(out).toContain('Use a \\| between values.');
  });

  it('inlines enum values and default into the description', () => {
    const out = renderApiSchemaTableMd([
      field({
        name: 'level',
        type: 'string',
        description: 'Severity level.',
        enumValues: ['low', 'medium', 'high'],
        defaultValue: 'medium',
      }),
    ]);

    expect(out).toContain('Severity level. Allowed values: `low`, `medium`, `high`.');
    expect(out).toContain('Default: `medium`.');
  });

  it('marks deprecated fields in the description', () => {
    const out = renderApiSchemaTableMd([
      field({ name: 'old_field', deprecated: true, description: 'Old.' }),
    ]);
    expect(out).toContain('Old. **Deprecated.**');
  });
});
