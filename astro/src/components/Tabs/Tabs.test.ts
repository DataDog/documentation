import { describe, it, expect } from 'vitest';
import { render } from 'preact-render-to-string';
import { h } from 'preact';
import { Tabs } from './Tabs';

describe('Tabs component', () => {
  it('renders with data-testid attribute', () => {
    const html = render(h(Tabs, {}));

    expect(html).toContain('data-testid="tabs"');
  });

  it('renders a placeholder before hydration (no DOM available)', () => {
    const html = render(h(Tabs, {}));

    // Without a DOM to read tab data from, the component renders a placeholder
    expect(html).toBe('<div data-testid="tabs"></div>');
  });
});
