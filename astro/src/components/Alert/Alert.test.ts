import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Alert from './Alert.astro';

describe('Alert component', () => {
  it('renders with default level (info)', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Alert, {
      slots: { default: 'Test message' },
    });

    expect(html).toContain('Test message');
    expect(html).toContain('Note');
    expect(html).toContain('alert--info');
  });

  it('renders each alert level with correct label and attributes', async () => {
    const levels = ['info', 'danger', 'warning', 'tip'] as const;
    const labels: Record<string, string> = {
      info: 'Note',
      danger: 'Caution',
      warning: 'Warning',
      tip: 'Tip',
    };
    const container = await AstroContainer.create();

    for (const level of levels) {
      const html = await container.renderToString(Alert, {
        props: { level },
        slots: { default: `${level} message` },
      });

      expect(html).toContain(labels[level]);
      expect(html).toContain(`${level} message`);
      expect(html).toContain(`alert--${level}`);
    }
  });

  it('renders slot content', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Alert, {
      props: { level: 'warning' },
      slots: { default: '<strong>Bold warning</strong>' },
    });

    expect(html).toContain('<strong>Bold warning</strong>');
  });
});
