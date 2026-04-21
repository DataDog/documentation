import { describe, it, expect } from 'vitest';
import { render } from 'preact-render-to-string';
import { h } from 'preact';
import type { ComponentType } from 'preact';
import { Tabs } from './Tabs';

// Cast needed because Preact's h() expects children?: ComponentChildren but
// Tabs.children is typed as a render-prop function, causing a contravariance error.
const TabsComponent = Tabs as ComponentType<{}>;

describe('Tabs component', () => {
  it('renders with data-testid attribute', () => {
    const html = render(h(TabsComponent, {}));

    expect(html).toContain('data-testid="tabs"');
  });

  it('renders a placeholder before hydration (no DOM available)', () => {
    const html = render(h(TabsComponent, {}));

    // Without a DOM to read tab data from, the component renders a placeholder
    expect(html).toBe('<div data-testid="tabs"></div>');
  });
});
