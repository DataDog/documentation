import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ApiSideNav from './ApiSideNav.astro';

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
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiSideNav, { props: { categories } });

    expect(html).toContain('Dashboards');
    expect(html).toContain('/api/latest/dashboards/');
    expect(html).toContain('Monitors');
    expect(html).toContain('/api/latest/monitors/');
  });

  it('renders operations under their parent category', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiSideNav, {
      props: { categories, currentSlug: 'dashboards' },
    });

    expect(html).toContain('Get a dashboard');
    expect(html).toContain('#get-a-dashboard');
  });

  it('flags the current category with the active modifier', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiSideNav, {
      props: { categories, currentSlug: 'dashboards' },
    });

    expect(html).toMatch(/api-side-nav__category--active/);
  });
});
