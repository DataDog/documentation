import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import TabPanel from './TabPanel.astro';

describe('TabPanel component', () => {
  it('renders with the given id and tabpanel role', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(TabPanel, {
      props: { id: 'panel-0', isActive: true },
      slots: { default: '<p>hello</p>' },
    });

    expect(html).toContain('id="panel-0"');
    expect(html).toContain('role="tabpanel"');
    expect(html).toContain('<p>hello</p>');
  });

  it('applies the active BEM modifier and does not hide when isActive is true', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(TabPanel, {
      props: { id: 'p', isActive: true },
      slots: { default: '' },
    });

    expect(html).toContain('tabs__panel--active');
    expect(html).not.toContain('hidden');
  });

  it('omits the active modifier and hides when isActive is false', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(TabPanel, {
      props: { id: 'p', isActive: false },
      slots: { default: '' },
    });

    expect(html).not.toContain('tabs__panel--active');
    expect(html).toContain('hidden');
  });
});
