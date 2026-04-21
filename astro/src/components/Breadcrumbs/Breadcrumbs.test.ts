import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Breadcrumbs from './Breadcrumbs.astro';

describe('Breadcrumbs component', () => {
  const crumbs = [
    { label: 'Docs', href: '/' },
    { label: 'API', href: '/api/' },
    { label: 'Dashboards' },
  ];

  it('renders a label for every crumb', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Breadcrumbs, { props: { crumbs } });

    for (const c of crumbs) {
      expect(html).toContain(c.label);
    }
  });

  it('renders non-final crumbs with hrefs as anchors', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Breadcrumbs, { props: { crumbs } });

    expect(html).toMatch(/<a[^>]+href="\/"[^>]*>Docs<\/a>/);
    expect(html).toMatch(/<a[^>]+href="\/api\/"[^>]*>API<\/a>/);
  });

  it('renders the final crumb as a span with aria-current="page"', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Breadcrumbs, { props: { crumbs } });

    expect(html).toMatch(/<span[^>]*aria-current="page"[^>]*>Dashboards<\/span>/);
  });
});
