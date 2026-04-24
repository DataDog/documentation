import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ApiMethodBadge from './ApiMethodBadge.astro';

describe('ApiMethodBadge component', () => {
  const methods = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'] as const;

  it('renders each method with correct text and BEM modifier', async () => {
    const container = await AstroContainer.create();

    for (const method of methods) {
      const html = await container.renderToString(ApiMethodBadge, {
        props: { method },
      });

      expect(html).toContain(method.toUpperCase());
      expect(html).toContain(`api-method-badge--${method}`);
    }
  });

  it('normalizes uppercase input to lowercase BEM modifier', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ApiMethodBadge, {
      props: { method: 'POST' },
    });

    expect(html).toContain('api-method-badge--post');
    expect(html).toContain('POST');
  });
});
