import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ApiStatusAlert from '../../src/components/ApiStatusAlert.astro';

describe('ApiStatusAlert component', () => {
  it('renders deprecated type with correct label', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiStatusAlert, {
      props: { type: 'deprecated' },
    });

    expect(html).toContain('Deprecated');
    expect(html).toContain('data-api-alert-type="deprecated"');
    expect(html).toContain('data-testid="api-status-alert"');
    expect(html).toContain('This endpoint is deprecated.');
  });

  it('renders unstable type with correct label', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiStatusAlert, {
      props: { type: 'unstable' },
    });

    expect(html).toContain('Unstable');
    expect(html).toContain('data-api-alert-type="unstable"');
    expect(html).toContain('unstable and may change');
  });

  it('renders beta type with correct label', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiStatusAlert, {
      props: { type: 'beta' },
    });

    expect(html).toContain('Beta');
    expect(html).toContain('data-api-alert-type="beta"');
    expect(html).toContain('in beta');
  });

  it('renders custom message when provided', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiStatusAlert, {
      props: { type: 'deprecated', message: 'Custom deprecation notice.' },
    });

    expect(html).toContain('Custom deprecation notice.');
  });

  it('renders newer version link for deprecated type', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiStatusAlert, {
      props: { type: 'deprecated', newerVersionUrl: '/api/latest/dashboards/' },
    });

    expect(html).toContain('href="/api/latest/dashboards/"');
    expect(html).toContain('Use the newer version.');
  });

  it('does not render newer version link for non-deprecated types', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiStatusAlert, {
      props: { type: 'unstable', newerVersionUrl: '/api/latest/test/' },
    });

    expect(html).not.toContain('Use the newer version.');
  });
});
