import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import HttpMethodBadge from '../../src/components/HttpMethodBadge.astro';

describe('HttpMethodBadge component', () => {
  const methods = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'] as const;

  it('renders each method with correct text and data-method attribute', async () => {
    const container = await AstroContainer.create();

    for (const method of methods) {
      const html = await container.renderToString(HttpMethodBadge, {
        props: { method },
      });

      expect(html).toContain(method.toUpperCase());
      expect(html).toContain(`data-method="${method}"`);
      expect(html).toContain('data-testid="http-method-badge"');
    }
  });

  it('normalizes uppercase input to lowercase data-method', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(HttpMethodBadge, {
      props: { method: 'POST' },
    });

    expect(html).toContain('data-method="post"');
    expect(html).toContain('POST');
  });
});
