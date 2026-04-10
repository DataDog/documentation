import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Alert from '../../src/components/Alert.astro';

describe('Alert component', () => {
  it('renders with default type (info)', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Alert, {
      slots: { default: 'Test message' },
    });

    expect(html).toContain('Test message');
    expect(html).toContain('Info:');
    expect(html).toContain('data-alert-type="info"');
  });

  it('renders each alert type with correct attributes', async () => {
    const types = ['info', 'warning', 'error', 'success'] as const;
    const container = await AstroContainer.create();

    for (const type of types) {
      const html = await container.renderToString(Alert, {
        props: { type },
        slots: { default: `${type} message` },
      });

      const label = type.charAt(0).toUpperCase() + type.slice(1);
      expect(html).toContain(`${label}:`);
      expect(html).toContain(`${type} message`);
      expect(html).toContain(`data-alert-type="${type}"`);
    }
  });

  it('renders slot content', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Alert, {
      props: { type: 'warning' },
      slots: { default: '<strong>Bold warning</strong>' },
    });

    expect(html).toContain('<strong>Bold warning</strong>');
  });
});
