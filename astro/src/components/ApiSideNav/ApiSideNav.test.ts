import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
// @ts-ignore — Preact renderer is registered for SSR of islands in headless tests.
import preactRenderer from '@astrojs/preact/server.js';
import ApiSideNav from './ApiSideNav.astro';

async function createContainer() {
  const container = await AstroContainer.create();
  container.addServerRenderer({ renderer: preactRenderer, name: '@astrojs/preact' });
  return container;
}

const categories = [
  {
    name: 'Dashboards',
    slug: 'dashboards',
    description: '',
    deprecated: false,
    operations: [
      {
        operationId: 'getDashboard',
        summary: 'Get a dashboard',
        slug: 'get-a-dashboard',
        menuOrder: 1,
        version: 'v1' as const,
      },
    ],
  },
  {
    name: 'Monitors',
    slug: 'monitors',
    description: '',
    deprecated: false,
    operations: [],
  },
];

describe('ApiSideNav component', () => {
  it('renders a link for every category', async () => {
    const container = await createContainer();
    const html = await container.renderToString(ApiSideNav, { props: { categories } });

    expect(html).toContain('Dashboards');
    expect(html).toContain('/api/latest/dashboards/');
    expect(html).toContain('Monitors');
    expect(html).toContain('/api/latest/monitors/');
  });

  it('renders operations under their parent category', async () => {
    const container = await createContainer();
    const html = await container.renderToString(ApiSideNav, {
      props: { categories, currentSlug: 'dashboards' },
    });

    expect(html).toContain('Get a dashboard');
    expect(html).toContain('#get-a-dashboard');
  });

  it('flags the current category with the active modifier', async () => {
    const container = await createContainer();
    const html = await container.renderToString(ApiSideNav, {
      props: { categories, currentSlug: 'dashboards' },
    });

    expect(html).toMatch(/api-side-nav__category--active/);
  });

  it('renders the SearchBar in the dedicated slot at the top of the nav', async () => {
    const container = await createContainer();
    const html = await container.renderToString(ApiSideNav, { props: { categories } });

    expect(html).toMatch(/api-side-nav__search/);
    // The Preact island's input is server-rendered too, so the markup is present.
    expect(html).toContain('search-bar__input');
  });
});
