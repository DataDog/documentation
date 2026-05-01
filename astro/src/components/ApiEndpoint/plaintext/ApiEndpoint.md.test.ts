import { describe, it, expect } from 'vitest';
import { renderApiEndpointMd } from './ApiEndpoint.md';
import type { EndpointData } from '../../../data/api/endpoints';

const baseEndpoint: EndpointData = {
  operationId: 'getThing',
  summary: 'Get a thing',
  slug: 'get-a-thing',
  method: 'GET',
  path: '/api/v2/things/{thing_id}',
  description: '<p>Returns a thing by id.</p>',
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

describe('renderApiEndpointMd', () => {
  it('emits a level-2 heading with the endpoint summary and version', () => {
    const out = renderApiEndpointMd(baseEndpoint);
    expect(out).toContain('## Get a thing (v2 — latest)');
  });

  it('renders a Datadog site → API endpoint table for each supported region', () => {
    const out = renderApiEndpointMd(baseEndpoint);
    expect(out).toContain('| Datadog site | API endpoint |');
    expect(out).toContain('| app.datadoghq.com | GET https://api.datadoghq.com/api/v2/things/{thing_id} |');
    expect(out).toContain('| app.datadoghq.eu | GET https://api.datadoghq.eu/api/v2/things/{thing_id} |');
  });

  it('omits unsupported regions from the URL table', () => {
    const out = renderApiEndpointMd(baseEndpoint);
    expect(out).not.toContain('ap1.datadoghq.com');
    expect(out).not.toContain('Not supported');
  });

  it('renders a deprecated alert when the endpoint is deprecated', () => {
    const dep = renderApiEndpointMd({ ...baseEndpoint, deprecated: true, newerVersionUrl: '/api/latest/foo' });
    expect(dep).toContain('{% alert level="warning" %}');
    expect(dep).toContain('**Deprecated:**');
    expect(dep).toContain('[Use the newer version.](/api/latest/foo)');
  });

  it('renders an unstable alert when the endpoint is unstable (and not deprecated)', () => {
    const out = renderApiEndpointMd({ ...baseEndpoint, unstable: true, unstableMessage: '<p>Subject to change.</p>' });
    expect(out).toContain('{% alert level="warning" %}');
    expect(out).toContain('**Unstable:** Subject to change.');
  });

  it('converts the description from HTML to Markdown', () => {
    const out = renderApiEndpointMd(baseEndpoint);
    expect(out).toContain('Returns a thing by id.');
    expect(out).not.toContain('<p>');
  });

  it('renders an Arguments section with a schema table when path params exist', () => {
    const out = renderApiEndpointMd(baseEndpoint);
    expect(out).toContain('### Arguments');
    expect(out).toContain('| thing_id [*required*] | string |');
  });

  it('renders a Response section with an outer tabs block', () => {
    const out = renderApiEndpointMd(baseEndpoint);
    expect(out).toContain('### Response');
    expect(out).toContain('{% tab label="200" %}');
  });

  it('renders a Code Example section with a tabs block per language', () => {
    const out = renderApiEndpointMd(baseEndpoint);
    expect(out).toContain('### Code Example');
    expect(out).toContain('{% tab label="Curl" %}');
  });

  it('renders permissions and OAuth scopes when present', () => {
    const out = renderApiEndpointMd({
      ...baseEndpoint,
      permissions: ['things_read'],
      oauthScopes: ['things:read'],
    });
    expect(out).toContain('**Permissions:** `things_read`');
    expect(out).toContain('OAuth apps require the `things:read` authorization scope');
  });
});
