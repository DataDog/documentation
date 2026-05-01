import { describe, it, expect } from 'vitest';
import { resolveRef, schemaToFields, paramsToFields } from '../../src/data/api/resolver';

describe('resolveRef', () => {
  it('resolves a simple $ref path', () => {
    const spec = {
      components: {
        schemas: {
          Foo: { type: 'object', properties: { id: { type: 'string' } } },
        },
      },
    };

    const result = resolveRef(spec, '#/components/schemas/Foo');
    expect(result).toEqual(spec.components.schemas.Foo);
  });

  it('returns undefined for an invalid path', () => {
    const spec = { components: {} };
    const result = resolveRef(spec, '#/components/schemas/Missing');
    expect(result).toBeUndefined();
  });

  it('handles JSON Pointer escapes (~1 for /)', () => {
    const spec = { components: { schemas: { 'Foo/Bar': { type: 'string' } } } };
    const result = resolveRef(spec, '#/components/schemas/Foo~1Bar');
    expect(result).toEqual({ type: 'string' });
  });
});

describe('schemaToFields', () => {
  it('converts a simple object schema to fields', () => {
    const spec = {};
    const schema = {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string', description: 'The name' },
        count: { type: 'integer', description: 'A count' },
      },
    };

    const fields = schemaToFields(spec, schema);
    expect(fields).toHaveLength(2);

    const nameField = fields.find((f) => f.name === 'name')!;
    expect(nameField.type).toBe('string');
    expect(nameField.required).toBe(true);
    expect(nameField.description).toBe('The name');

    const countField = fields.find((f) => f.name === 'count')!;
    expect(countField.type).toBe('integer');
    expect(countField.required).toBe(false);
  });

  it('resolves $ref and returns the referenced schema fields', () => {
    const spec = {
      components: {
        schemas: {
          Widget: {
            type: 'object',
            properties: {
              id: { type: 'string' },
            },
          },
        },
      },
    };

    const schema = { $ref: '#/components/schemas/Widget' };
    const fields = schemaToFields(spec, schema);
    expect(fields).toHaveLength(1);
    expect(fields[0].name).toBe('id');
    expect(fields[0].type).toBe('string');
  });

  it('handles circular $ref references gracefully', () => {
    const spec = {
      components: {
        schemas: {
          Tree: {
            type: 'object',
            properties: {
              children: {
                type: 'array',
                items: { $ref: '#/components/schemas/Tree' },
              },
            },
          },
        },
      },
    };

    const schema = { $ref: '#/components/schemas/Tree' };
    // Should not throw — circular refs are caught
    const fields = schemaToFields(spec, schema);
    expect(fields).toBeDefined();
    expect(fields.length).toBeGreaterThan(0);
  });

  it('converts enum values', () => {
    const spec = {};
    const schema = {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['active', 'inactive', 'pending'],
          description: 'Current status',
        },
      },
    };

    const fields = schemaToFields(spec, schema);
    expect(fields[0].enumValues).toEqual(['active', 'inactive', 'pending']);
  });

  it('handles deprecated and readOnly flags', () => {
    const spec = {};
    const schema = {
      type: 'object',
      properties: {
        old_field: { type: 'string', deprecated: true, description: 'Old' },
        generated: { type: 'string', readOnly: true, description: 'Auto' },
      },
    };

    const fields = schemaToFields(spec, schema);
    const oldField = fields.find((f) => f.name === 'old_field')!;
    expect(oldField.deprecated).toBe(true);

    const genField = fields.find((f) => f.name === 'generated')!;
    expect(genField.readOnly).toBe(true);
  });

  it('handles oneOf union types', () => {
    const spec = {};
    const schema = {
      oneOf: [
        { type: 'string', description: 'A string value' },
        { type: 'number', description: 'A number value' },
      ],
    };

    const fields = schemaToFields(spec, schema);
    expect(fields).toHaveLength(1);
    expect(fields[0].type).toBe('oneOf');
    expect(fields[0].unionOptions).toHaveLength(2);
  });

  it('handles allOf by merging schemas', () => {
    const spec = {};
    const schema = {
      allOf: [
        {
          type: 'object',
          properties: { id: { type: 'string' } },
          required: ['id'],
        },
        {
          type: 'object',
          properties: { name: { type: 'string' } },
        },
      ],
    };

    const fields = schemaToFields(spec, schema);
    expect(fields).toHaveLength(2);
    const idField = fields.find((f) => f.name === 'id')!;
    expect(idField.required).toBe(true);
    const nameField = fields.find((f) => f.name === 'name')!;
    expect(nameField.required).toBe(false);
  });

  it('handles array type with item schema', () => {
    const spec = {};
    const schema = {
      type: 'array',
      items: { type: 'string' },
      description: 'A list of strings',
    };

    const fields = schemaToFields(spec, schema);
    expect(fields).toHaveLength(1);
    expect(fields[0].type).toBe('[string]');
  });
});

describe('paramsToFields', () => {
  it('converts parameter objects to fields', () => {
    const spec = {};
    const params = [
      {
        name: 'dashboard_id',
        in: 'path',
        required: true,
        description: 'The dashboard ID.',
        schema: { type: 'string' },
      },
      {
        name: 'page',
        in: 'query',
        required: false,
        description: 'Page number.',
        schema: { type: 'integer', default: 0 },
      },
    ];

    const fields = paramsToFields(spec, params);
    expect(fields).toHaveLength(2);

    expect(fields[0].name).toBe('dashboard_id');
    expect(fields[0].required).toBe(true);
    expect(fields[0].type).toBe('string');

    expect(fields[1].name).toBe('page');
    expect(fields[1].required).toBe(false);
    expect(fields[1].defaultValue).toBe('0');
  });

  it('resolves $ref parameters', () => {
    const spec = {
      components: {
        parameters: {
          DashboardId: {
            name: 'dashboard_id',
            in: 'path',
            required: true,
            description: 'The dashboard ID.',
            schema: { type: 'string' },
          },
        },
      },
    };

    const params = [{ $ref: '#/components/parameters/DashboardId' }];
    const fields = paramsToFields(spec, params);
    expect(fields).toHaveLength(1);
    expect(fields[0].name).toBe('dashboard_id');
  });
});
