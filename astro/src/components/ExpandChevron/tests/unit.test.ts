import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ExpandChevron from '../ExpandChevron.astro';

describe('ExpandChevron component', () => {
  it('renders an aria-hidden svg with the chevron path', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ExpandChevron);

    expect(html).toContain('<svg');
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('d="M3 1 L7 5 L3 9"');
    expect(html).toContain('stroke="currentColor"');
    expect(html).toContain('expand-chevron');
  });

  it('forwards the class prop alongside the block class', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ExpandChevron, {
      props: { class: 'caller__icon' },
    });

    expect(html).toContain('expand-chevron');
    expect(html).toContain('caller__icon');
  });
});
