/**
 * Unit tests for `renderCategoryMd`, including a Markdoc round-trip parse to
 * verify that the output is parseable Markdoc (no error nodes).
 *
 * Integration coverage of the renderer over the full spec lives in the API
 * page HTML snapshot tests (which build the site and diff the rendered HTML).
 * Here we use small fixtures so the test runs without an Astro build.
 */

import { describe, it, expect } from 'vitest';
import Markdoc from '@markdoc/markdoc';
import { renderCategoryMd } from './renderCategoryMd';
import type { ApiCategory, EndpointData } from './views';

const FIXTURE_CATEGORY: ApiCategory = {
  name: 'Action Connection',
  slug: 'action-connection',
  description: '<p>Manage Action Connections.</p>',
  operations: [],
  deprecated: false,
};

const FIXTURE_ENDPOINTS: EndpointData[] = [
  {
    operationId: 'GetConnection',
    summary: 'Get a connection',
    slug: 'get-a-connection',
    method: 'GET',
    path: '/api/v2/actions/connections/{connection_id}',
    description: '<p>Get the connection.</p>',
    version: 'v2',
    deprecated: false,
    unstable: false,
    pathParams: [
      {
        name: 'connection_id',
        type: 'string',
        required: true,
        deprecated: false,
        readOnly: false,
        description: 'Connection ID',
      },
    ],
    responses: [
      {
        statusCode: '200',
        description: 'OK',
        schema: [
          {
            name: 'data',
            type: 'object',
            required: true,
            deprecated: false,
            readOnly: false,
            description: 'The connection.',
          },
        ],
        examples: [{ name: 'Example', value: '{"data":{}}' }],
      },
    ],
    codeExamples: [
      {
        language: 'curl',
        label: 'Curl',
        entries: [
          {
            description: 'Get a connection curl example',
            code: 'curl -X GET "https://api.datadoghq.com/api/v2/actions/connections/abc"',
            syntax: 'bash',
          },
        ],
      },
    ],
  },
];

describe('renderCategoryMd', () => {
  it('emits a level-1 heading with the category name and an HR before each endpoint', () => {
    const md = renderCategoryMd(
      { name: 'Test', slug: 'test', description: '', operations: [], deprecated: false },
      [
        {
          operationId: 'foo',
          summary: 'Foo',
          slug: 'foo',
          method: 'GET',
          path: '/foo',
          description: '',
          version: 'v2',
          deprecated: false,
          unstable: false,
          responses: [],
          codeExamples: [],
        },
      ],
    );

    expect(md).toMatch(/^# Test/);
    expect(md).toContain('---');
    expect(md).toContain('## Foo (v2 — latest)');
    expect(md.endsWith('\n')).toBe(true);
  });

  it('renders a fixture category without throwing', () => {
    const md = renderCategoryMd(FIXTURE_CATEGORY, FIXTURE_ENDPOINTS);
    expect(md.length).toBeGreaterThan(0);
    expect(md).toContain(`# ${FIXTURE_CATEGORY.name}`);
    expect(md).toContain('## Get a connection (v2 — latest)');
  });

  it('produces parseable Markdoc (no error nodes) for the fixture', () => {
    const md = renderCategoryMd(FIXTURE_CATEGORY, FIXTURE_ENDPOINTS);

    const ast = Markdoc.parse(md);
    const errors = Markdoc.validate(ast, {
      tags: {
        tabs: { attributes: {} },
        tab: { attributes: { label: { type: String } } },
        alert: { attributes: { level: { type: String } } },
      },
    });

    const fatal = errors.filter((e) => e.error.level === 'critical' || e.error.level === 'error');
    if (fatal.length > 0) {
      console.error('Markdoc errors:', JSON.stringify(fatal.slice(0, 5), null, 2));
    }
    expect(fatal).toEqual([]);
  });
});
