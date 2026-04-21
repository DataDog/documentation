import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Tab from './Tab.astro';

describe('Tab component', () => {
  it('exposes the label as data-tab-label', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Tab, {
      props: { label: 'Python' },
      slots: { default: 'print("hi")' },
    });

    expect(html).toContain('data-tab-label="Python"');
  });

  it('renders slot content inside the wrapper', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Tab, {
      props: { label: 'JavaScript' },
      slots: { default: '<pre>console.log(1)</pre>' },
    });

    expect(html).toContain('<pre>console.log(1)</pre>');
  });
});
