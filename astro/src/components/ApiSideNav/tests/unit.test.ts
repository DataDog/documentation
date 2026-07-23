import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
// @ts-ignore — Preact renderer is registered for SSR of islands in headless tests.
import preactRenderer from '@astrojs/preact/server.js';
import ApiSideNav from '../ApiSideNav.astro';
import type { ApiCategory, ApiCategoryStub } from '@lib/api/schemas/views';

async function createContainer() {
  const container = await AstroContainer.create();
  container.addServerRenderer({ renderer: preactRenderer, name: '@astrojs/preact' });
  return container;
}

const dashboards: ApiCategory = {
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
      versions: ['v1'] as const,
      method: 'GET',
      deprecated: false,
      unstable: false,
      regionUrls: {},
    },
    {
      operationId: 'createDashboard',
      summary: 'Create a dashboard',
      slug: 'create-a-dashboard',
      menuOrder: 2,
      versions: ['v1'] as const,
      method: 'POST',
      deprecated: false,
      unstable: false,
      regionUrls: {},
    },
  ],
};

const monitors: ApiCategory = {
  name: 'Monitors',
  slug: 'monitors',
  description: '',
  deprecated: false,
  operations: [
    {
      operationId: 'createMonitor',
      summary: 'Create a monitor',
      slug: 'create-a-monitor',
      menuOrder: 1,
      versions: ['v1'] as const,
      method: 'POST',
      deprecated: false,
      unstable: false,
      regionUrls: {},
    },
  ],
};

const categories: ApiCategoryStub[] = [dashboards, monitors].map(
  ({ operations: _operations, ...stub }) => stub,
);

describe('ApiSideNav component', () => {
  it('renders a link for every category', async () => {
    const container = await createContainer();
    const html = await container.renderToString(ApiSideNav, { props: { categories } });

    expect(html).toContain('Dashboards');
    expect(html).toContain('/api/latest/dashboards/');
    expect(html).toContain('Monitors');
    expect(html).toContain('/api/latest/monitors/');
  });

  it('renders no operation links when no active category is provided', async () => {
    const container = await createContainer();
    const html = await container.renderToString(ApiSideNav, { props: { categories } });

    expect(html).not.toMatch(/<a[^>]*api-side-nav__operation/);
    expect(html).not.toContain('Get a dashboard');
    expect(html).not.toContain('Create a monitor');
  });

  it('renders only the active category\'s operations', async () => {
    const container = await createContainer();
    const html = await container.renderToString(ApiSideNav, {
      props: { categories, activeCategory: dashboards },
    });

    expect(html).toContain('Get a dashboard');
    expect(html).toContain('Create a dashboard');
    expect(html).not.toContain('Create a monitor');

    // One link per operation in dashboards (2), and no extra ones.
    const matches = html.match(/<a[^>]*api-side-nav__operation\b/g) ?? [];
    expect(matches.length).toBe(dashboards.operations.length);
  });

  it('links each operation to its own page (not a hash anchor)', async () => {
    const container = await createContainer();
    const html = await container.renderToString(ApiSideNav, {
      props: { categories, activeCategory: dashboards },
    });

    expect(html).toContain('/api/latest/dashboards/get-a-dashboard/');
    expect(html).not.toContain('#get-a-dashboard');
  });

  it('flags the current category with the active modifier', async () => {
    const container = await createContainer();
    const html = await container.renderToString(ApiSideNav, {
      props: { categories, activeCategory: dashboards },
    });

    expect(html).toMatch(/api-side-nav__category--active/);
  });

  it('flags the current operation with the active modifier when its slug is passed', async () => {
    const container = await createContainer();
    const html = await container.renderToString(ApiSideNav, {
      props: {
        categories,
        activeCategory: dashboards,
        currentOperationSlug: 'get-a-dashboard',
      },
    });

    expect(html).toMatch(/api-side-nav__operation--active/);
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

  it('emits an inline script that scrolls the active section into view', async () => {
    const container = await createContainer();
    const html = await container.renderToString(ApiSideNav, {
      props: { categories, activeCategory: dashboards, currentOperationSlug: 'get-a-dashboard' },
    });

    expect(html).toContain('.api-side-nav__category--active');
    expect(html).toContain('scrollTop');
    // The script must come after the list so the active section is already parsed.
    const listEnd = html.lastIndexOf('</ul>');
    const scriptStart = html.indexOf('scrollTop');
    expect(scriptStart).toBeGreaterThan(listEnd);
  });
});
