import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ApiEndpointSummary from '../ApiEndpointSummary.astro';

const baseProps = {
  summary: 'Get a dashboard',
  href: '/api/latest/dashboards/get-a-dashboard/',
  anchorId: 'get-a-dashboard',
  method: 'GET',
  regionUrls: {
    us: 'https://api.datadoghq.com/api/v1/dashboard/{dashboard_id}',
    eu: 'https://api.datadoghq.eu/api/v1/dashboard/{dashboard_id}',
  },
  deprecated: false,
  unstable: false,
};

describe('ApiEndpointSummary component', () => {
  it('renders a heading linking to the endpoint page, keyed by the anchor id', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiEndpointSummary, {
      props: baseProps,
    });

    expect(html).toContain('api-endpoint-summary');
    expect(html).toContain('api-endpoint-summary__heading');
    // The H2 keeps the operation slug as its id so old `/api/.../#slug`
    // deep links still scroll to the matching block.
    expect(html).toMatch(/<h2[^>]*\bid="get-a-dashboard"/);
    expect(html).toContain('href="/api/latest/dashboards/get-a-dashboard/"');
    expect(html).toContain('Get a dashboard');
  });

  it('renders the method badge and a URL per region', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiEndpointSummary, {
      props: baseProps,
    });

    expect(html).toContain('api-method-badge');
    expect(html).toContain('GET');
    expect(html).toContain('data-region="us"');
    expect(html).toContain('https://api.datadoghq.com/api/v1/dashboard/{dashboard_id}');
    expect(html).toContain('data-region="eu"');
    expect(html).toContain('https://api.datadoghq.eu/api/v1/dashboard/{dashboard_id}');
  });

  it('marks regions absent from regionUrls as unsupported', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiEndpointSummary, {
      props: { ...baseProps, regionUrls: { us: 'https://api.datadoghq.com/x' } },
    });

    expect(html).toContain('api-endpoint-summary__path--unsupported');
    expect(html).toContain('Not supported in the');
  });

  it('omits both badges when the endpoint is neither deprecated nor unstable', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiEndpointSummary, {
      props: baseProps,
    });

    expect(html).not.toContain('api-endpoint-summary__badge');
  });

  it('renders a deprecated badge when deprecated', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiEndpointSummary, {
      props: { ...baseProps, deprecated: true },
    });

    expect(html).toContain('api-endpoint-summary__badge--deprecated');
  });

  it('renders a preview badge when unstable', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiEndpointSummary, {
      props: { ...baseProps, unstable: true },
    });

    expect(html).toContain('api-endpoint-summary__badge--preview');
  });
});
