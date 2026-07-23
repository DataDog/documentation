import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Breadcrumbs from '../Breadcrumbs.astro';

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

    expect(html).toMatch(/<a[^>]+href="\/"[^>]*>\s*Docs\s*<\/a>/);
    expect(html).toMatch(/<a[^>]+href="\/api\/"[^>]*>\s*API\s*<\/a>/);
  });

  it('renders the final crumb as a span with aria-current="page"', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Breadcrumbs, { props: { crumbs } });

    expect(html).toMatch(/<span[^>]*aria-current="page"[^>]*>\s*Dashboards\s*<\/span>/);
  });

  it('emits BEM classes on every element', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Breadcrumbs, { props: { crumbs } });

    expect(html).toContain('breadcrumbs');
    expect(html).toContain('breadcrumbs__list');
    expect(html).toContain('breadcrumbs__item');
    expect(html).toContain('breadcrumbs__link');
    expect(html).toContain('breadcrumbs__label');
    expect(html).toContain('breadcrumbs__label--current');
  });

  it('only marks the final crumb with the --current modifier', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Breadcrumbs, { props: { crumbs } });

    const matches = html.match(/(?<!_)breadcrumbs__label--current(?!_)/g) ?? [];
    expect(matches).toHaveLength(1);
  });
});
