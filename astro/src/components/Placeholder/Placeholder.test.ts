import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Placeholder from './Placeholder.astro';

describe('Placeholder primitive', () => {
  it('renders the provided name as visible text', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Placeholder, {
      props: { name: 'HEADER' },
    });

    expect(html).toContain('HEADER');
    expect(html).toContain('data-testid="placeholder"');
    expect(html).toContain('data-placeholder-name="HEADER"');
  });

  it('accepts an optional extra class', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Placeholder, {
      props: { name: 'FOOTER', class: 'my-custom-class' },
    });

    expect(html).toContain('my-custom-class');
  });
});
