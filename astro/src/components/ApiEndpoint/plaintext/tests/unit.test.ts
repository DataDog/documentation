import { describe, it, expect } from 'vitest';
import { format } from '@markdoc/markdoc';
import { documentNode } from '@lib/plaintext/helpers';
import { apiEndpointNodes } from '../ApiEndpoint';
import type { EndpointData } from '@lib/api/schemas/views';

const baseEndpoint: EndpointData = {
  operationId: 'getThing',
  summary: 'Get a thing',
  slug: 'get-a-thing',
  method: 'GET',
  path: '/api/v2/things/{thing_id}',
  description: 'Returns a thing by id.',
  version: 'v2',
  deprecated: false,
  unstable: false,
  regionUrls: {
    us: 'https://api.datadoghq.com/api/v2/things/{thing_id}',
    eu: 'https://api.datadoghq.eu/api/v2/things/{thing_id}',
  },
  pathParams: [
    { name: 'thing_id', type: 'string', required: true, deprecated: false, readOnly: false, description: 'Thing identifier' },
  ],
  responses: [
    {
      statusCode: '200',
      description: 'OK',
      schema: [{ name: 'id', type: 'string', required: true, deprecated: false, readOnly: false, description: 'Identifier' }],
      examples: [{ name: 'Example', value: '{"id":"abc"}' }],
    },
  ],
  codeExamples: [
    {
      language: 'curl',
      label: 'Curl',
      entries: [{ description: 'Get a thing', code: 'curl -X GET ...', syntax: 'bash' }],
    },
  ],
};

function render(ep: EndpointData): string {
  return format(documentNode(apiEndpointNodes(ep)));
}

describe('apiEndpointNodes', () => {
  it('does not emit its own summary heading', () => {
    const out = render(baseEndpoint);
    expect(out).not.toMatch(/^#\s+Get a thing/m);
  });

  it('renders a region URL table with a row per supported region', () => {
    const out = render(baseEndpoint);
    expect(out).toContain('Datadog site');
    expect(out).toContain('API endpoint');
    expect(out).toContain('app.datadoghq.com');
    expect(out).toContain('app.datadoghq.eu');
    expect(out).toContain('**GET**');
  });

  it('renders a deprecated alert when the endpoint is deprecated', () => {
    const dep = render({ ...baseEndpoint, deprecated: true, newerVersionUrl: '/api/latest/foo' });
    expect(dep).toContain('{% alert');
    expect(dep).toContain('level="warning"');
    expect(dep).toContain('This endpoint is deprecated.');
    expect(dep).toContain('/api/latest/foo');
  });

  it('renders an unstable alert when the endpoint is unstable', () => {
    const out = render({ ...baseEndpoint, unstable: true, unstableMessage: 'Subject to change.' });
    expect(out).toContain('{% alert');
    expect(out).toContain('Subject to change.');
  });

  it('includes the endpoint description', () => {
    const out = render(baseEndpoint);
    expect(out).toContain('Returns a thing by id.');
  });

  it('renders an Arguments section with a schema table for path params', () => {
    const out = render(baseEndpoint);
    expect(out).toContain('### Arguments');
    expect(out).toContain('thing_id [*required*]');
  });

  it('renders a Response section with an outer tabs block', () => {
    const out = render(baseEndpoint);
    expect(out).toContain('### Response');
    expect(out).toContain('label="200"');
  });

  it('renders a Code Example section', () => {
    const out = render(baseEndpoint);
    expect(out).toContain('### Code Example');
    expect(out).toContain('label="Curl"');
  });

  it('renders permissions and OAuth scopes when present', () => {
    const out = render({
      ...baseEndpoint,
      permissions: ['things_read'],
      oauthScopes: ['things:read'],
    });
    expect(out).toContain('Permissions:');
    expect(out).toContain('things_read');
    expect(out).toContain('OAuth apps');
    expect(out).toContain('things:read');
  });
});
