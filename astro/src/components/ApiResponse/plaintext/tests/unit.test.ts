import { describe, it, expect } from 'vitest';
import { format } from '@markdoc/markdoc';
import { documentNode } from '@lib/plaintext/helpers';
import { apiResponseNode } from '../ApiResponse';
import type { ResponseData } from '@lib/api/schemas/views';

const responses: ResponseData[] = [
  {
    statusCode: '200',
    description: 'OK',
    schema: [{ name: 'id', type: 'string', required: true, deprecated: false, readOnly: false, description: 'Identifier' }],
    examples: [{ name: 'Example 1', value: '{"id":"abc"}' }],
  },
  {
    statusCode: '404',
    description: 'Not found',
  },
];

function render(rs: ResponseData[]): string {
  const node = apiResponseNode(rs);
  if (node === null) {
    return '';
  }
  return format(documentNode([node]));
}

describe('apiResponseNode', () => {
  it('returns null when responses is empty', () => {
    expect(apiResponseNode([])).toBeNull();
  });

  it('emits an outer tab per status code', () => {
    const out = render(responses);
    expect(out).toContain('{% tabs %}');
    expect(out).toContain('label="200"');
    expect(out).toContain('label="404"');
    expect(out).toContain('{% /tabs %}');
  });

  it('renders inner Model/Example tabs when a response has both schema and examples', () => {
    const out = render(responses);
    expect(out).toContain('label="Model"');
    expect(out).toContain('label="Example"');
    expect(out).toContain('Parent field');
    expect(out).toContain('```json');
  });

  it('omits inner tabs when only one of schema or examples is present', () => {
    const schemaOnly = render([
      { statusCode: '200', description: '', schema: responses[0].schema },
    ]);
    expect(schemaOnly).toContain('Parent field');
    expect(schemaOnly).not.toContain('label="Model"');

    const examplesOnly = render([
      { statusCode: '200', description: '', examples: responses[0].examples },
    ]);
    expect(examplesOnly).toContain('```json');
    expect(examplesOnly).not.toContain('label="Model"');
  });

  it('renders the description above any inner content', () => {
    const out = render(responses);
    const idx200 = out.indexOf('label="200"');
    const idxOk = out.indexOf('OK', idx200);
    const idxModel = out.indexOf('label="Model"', idx200);
    expect(idxOk).toBeGreaterThan(idx200);
    expect(idxModel).toBeGreaterThan(idxOk);
  });

  it('builds a tabs tag node', () => {
    const node = apiResponseNode(responses);
    expect(node?.type).toBe('tag');
    expect(node?.tag).toBe('tabs');
  });
});
