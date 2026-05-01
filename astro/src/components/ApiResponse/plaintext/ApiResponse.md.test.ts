import { describe, it, expect } from 'vitest';
import { renderApiResponseMd } from './ApiResponse.md';
import type { ResponseData } from '../../../data/api/endpoints';

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

describe('renderApiResponseMd', () => {
  it('returns empty string when responses is empty', () => {
    expect(renderApiResponseMd([])).toBe('');
  });

  it('emits an outer tab per status code', () => {
    const out = renderApiResponseMd(responses);
    expect(out.startsWith('{% tabs %}')).toBe(true);
    expect(out).toContain('{% tab label="200" %}');
    expect(out).toContain('{% tab label="404" %}');
    expect(out.endsWith('{% /tabs %}')).toBe(true);
  });

  it('renders inner Model/Example tabs when a response has both schema and examples', () => {
    const out = renderApiResponseMd(responses);
    expect(out).toContain('{% tab label="Model" %}');
    expect(out).toContain('{% tab label="Example" %}');
    expect(out).toContain('| Parent field |');
    expect(out).toContain('```json');
  });

  it('omits inner tabs when only one of schema or examples is present', () => {
    const schemaOnly = renderApiResponseMd([
      { statusCode: '200', schema: responses[0].schema },
    ]);
    expect(schemaOnly).toContain('| Parent field |');
    expect(schemaOnly).not.toContain('{% tab label="Model" %}');

    const examplesOnly = renderApiResponseMd([
      { statusCode: '200', examples: responses[0].examples },
    ]);
    expect(examplesOnly).toContain('```json');
    expect(examplesOnly).not.toContain('{% tab label="Model" %}');
  });

  it('renders the description above any inner content', () => {
    const out = renderApiResponseMd(responses);
    const idx200 = out.indexOf('{% tab label="200" %}');
    const idxOk = out.indexOf('OK', idx200);
    const idxModel = out.indexOf('{% tab label="Model" %}', idx200);
    expect(idxOk).toBeGreaterThan(idx200);
    expect(idxModel).toBeGreaterThan(idxOk);
  });
});
