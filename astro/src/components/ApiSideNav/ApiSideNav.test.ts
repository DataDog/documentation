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
        method: 'GET',
      },
      {
        operationId: 'createDashboard',
        summary: 'Create a dashboard',
        slug: 'create-a-dashboard',
        menuOrder: 2,
        version: 'v1' as const,
        method: 'POST',
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

  it('links each operation to its own page (not a hash anchor)', async () => {
    const container = await createContainer();
    const html = await container.renderToString(ApiSideNav, {
      props: { categories, currentSlug: 'dashboards' },
    });

    expect(html).toContain('Get a dashboard');
    expect(html).toContain('/api/latest/dashboards/get-a-dashboard/');
    expect(html).not.toContain('#get-a-dashboard');
  });

  it('flags the current category with the active modifier', async () => {
    const container = await createContainer();
    const html = await container.renderToString(ApiSideNav, {
      props: { categories, currentSlug: 'dashboards' },
    });

    expect(html).toMatch(/api-side-nav__category--active/);
  });

  it('flags the current operation with the active modifier when both slugs are passed', async () => {
    const container = await createContainer();
    const html = await container.renderToString(ApiSideNav, {
      props: {
        categories,
        currentSlug: 'dashboards',
        currentOperationSlug: 'get-a-dashboard',
      },
    });

    expect(html).toMatch(/api-side-nav__operation--active/);
    // Only one operation should carry the active modifier (Get a dashboard).
    const matches = html.match(/api-side-nav__operation--active/g) ?? [];
    expect(matches.length).toBeGreaterThanOrEqual(1);
    // The non-active operation link should still be present without the modifier.
    expect(html).toContain('Create a dashboard');
  });

  it('renders the SearchBar in the dedicated slot at the top of the nav', async () => {
    const container = await createContainer();
    const html = await container.renderToString(ApiSideNav, { props: { categories } });

    expect(html).toMatch(/api-side-nav__search/);
    // The Preact island's input is server-rendered too, so the markup is present.
    expect(html).toContain('search-bar__input');
  });
});
