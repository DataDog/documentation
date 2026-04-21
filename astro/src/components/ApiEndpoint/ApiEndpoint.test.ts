import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ApiEndpoint from './ApiEndpoint.astro';

const endpointWithTwoRegions = {
  operationId: 'testOp',
  summary: 'Test endpoint',
  slug: 'test-endpoint',
  method: 'GET',
  path: '/api/v1/foo',
  description: '',
  version: 'v1',
  deprecated: false,
  unstable: false,
  regionUrls: {
    us: 'https://api.datadoghq.com/api/v1/foo',
    eu: 'https://api.datadoghq.eu/api/v1/foo',
  },
  responses: [],
  codeExamples: [],
};

describe('ApiEndpoint region rendering', () => {
  it('renders a URL span for every supported region', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiEndpoint, {
      props: { data: JSON.stringify(endpointWithTwoRegions) },
    });

    expect(html).toContain('data-region="us"');
    expect(html).toContain('https://api.datadoghq.com/api/v1/foo');
    expect(html).toContain('data-region="eu"');
    expect(html).toContain('https://api.datadoghq.eu/api/v1/foo');
  });

  it('renders a "Not supported" message for allowed regions missing from regionUrls', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiEndpoint, {
      props: { data: JSON.stringify(endpointWithTwoRegions) },
    });

    // US3, US5, AP1, AP2, and GOV are allowed but not in regionUrls
    expect(html).toContain('Not supported in the US3 region');
    expect(html).toContain('Not supported in the AP1 region');
    expect(html).toContain('Not supported in the US1-FED region');
  });

  it('emits one `data-region` for every allowed region', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiEndpoint, {
      props: { data: JSON.stringify(endpointWithTwoRegions) },
    });

    const regionKeys = ['us', 'us3', 'us5', 'eu', 'ap1', 'ap2', 'gov'];
    for (const key of regionKeys) {
      expect(html).toContain(`data-region="${key}"`);
    }
  });
});
