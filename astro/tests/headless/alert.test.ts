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
    expect(html).toContain('Note');
    expect(html).toContain('data-alert-type="info"');
  });

  it('renders each alert type with correct label and attributes', async () => {
    const types = ['info', 'danger', 'warning', 'tip'] as const;
    const labels: Record<string, string> = {
      info: 'Note',
      danger: 'Caution',
      warning: 'Warning',
      tip: 'Tip',
    };
    const container = await AstroContainer.create();

    for (const type of types) {
      const html = await container.renderToString(Alert, {
        props: { type },
        slots: { default: `${type} message` },
      });

      expect(html).toContain(labels[type]);
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
