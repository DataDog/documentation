// @vitest-environment happy-dom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, cleanup, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import type { ComponentType } from 'preact';
import { Tabs } from './Tabs';

// Cast needed because Preact's h() expects children?: ComponentChildren but
// Tabs.children is typed as a render-prop function, causing a contravariance error.
const TabsComponent = Tabs as ComponentType<any>;

afterEach(cleanup);

const labels = ['Python', 'Ruby', 'Go'];

const renderTabs = (props: Partial<Parameters<typeof Tabs>[0]> = {}) =>
  render(
    h(TabsComponent, {
      labels,
      children: (i: number) => h('span', { 'data-testid': 'panel-content' }, labels[i]),
      ...props,
    }),
  );

describe('Tabs — static render', () => {
  it('renders the tablist with all labels', () => {
    renderTabs();

    expect(screen.getByTestId('tabs')).toBeTruthy();
    labels.forEach((label, i) => {
      expect(screen.getByTestId(`tab-${i}`).textContent).toBe(label);
    });
  });

  it('renders placeholder when labels is empty', () => {
    const { container } = render(h(TabsComponent, { labels: [], children: () => null }));
    expect(container.innerHTML).toBe('<div data-testid="tabs"></div>');
  });
});

describe('Tabs — interactivity', () => {
  it('first tab is active by default (BEM + aria)', () => {
    renderTabs();

    const first = screen.getByTestId('tab-0');
    expect(first.classList.contains('tabs__button--active')).toBe(true);
    expect(first.getAttribute('aria-selected')).toBe('true');
    expect(screen.getByTestId('panel-content').textContent).toBe('Python');
  });

  it('clicking a tab activates it and deactivates the previous tab', async () => {
    const user = userEvent.setup();
    renderTabs();

    await user.click(screen.getByTestId('tab-1'));

    const first = screen.getByTestId('tab-0');
    const second = screen.getByTestId('tab-1');

    expect(second.classList.contains('tabs__button--active')).toBe(true);
    expect(second.getAttribute('aria-selected')).toBe('true');

    expect(first.classList.contains('tabs__button--active')).toBe(false);
    expect(first.getAttribute('aria-selected')).toBe('false');
  });

  it('updates the visible panel content when a new tab is clicked', async () => {
    const user = userEvent.setup();
    renderTabs();

    await user.click(screen.getByTestId('tab-2'));

    expect(screen.getByTestId('panel-content').textContent).toBe('Go');
  });

  it('calls onTabChange with the new index', async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();
    renderTabs({ onTabChange });

    await user.click(screen.getByTestId('tab-2'));

    expect(onTabChange).toHaveBeenCalledWith(2);
  });
});

describe('Tabs — panelsHtml mode', () => {
  const panelsHtml = [
    '<p data-testid="py-content">python html</p>',
    '<p data-testid="rb-content">ruby html</p>',
    '<p data-testid="go-content">go html</p>',
  ];

  it('renders every panel into the DOM; only the active one is visible', () => {
    render(h(TabsComponent, { labels, panelsHtml }));

    const allPanels = document.querySelectorAll<HTMLElement>('[data-tab-panel]');
    expect(allPanels.length).toBe(3);
    expect(allPanels[0].hidden).toBe(false);
    expect(allPanels[1].hidden).toBe(true);
    expect(allPanels[2].hidden).toBe(true);

    // All panel contents are present in the DOM (SEO: nothing deferred).
    expect(screen.getByTestId('py-content').textContent).toBe('python html');
    expect(screen.getByTestId('rb-content').textContent).toBe('ruby html');
    expect(screen.getByTestId('go-content').textContent).toBe('go html');
  });

  it('moves visibility + tabs-panel testid to the clicked panel without rewriting innerHTML', async () => {
    const user = userEvent.setup();
    render(h(TabsComponent, { labels, panelsHtml }));

    const goNode = screen.getByTestId('go-content');

    await user.click(screen.getByTestId('tab-2'));

    const allPanels = document.querySelectorAll<HTMLElement>('[data-tab-panel]');
    expect(allPanels[0].hidden).toBe(true);
    expect(allPanels[2].hidden).toBe(false);
    expect(allPanels[2].getAttribute('data-testid')).toBe('tabs-panel');
    expect(allPanels[0].hasAttribute('data-testid')).toBe(false);

    // Same DOM node instance — inner nodes were not re-parsed. This is what
    // keeps nested `<astro-island>` children from tearing down on tab switch.
    expect(screen.getByTestId('go-content')).toBe(goNode);
  });
});

describe('Tabs — pills variant', () => {
  it('applies BEM modifier tabs--pills when variant is forced', () => {
    renderTabs({ variant: 'pills' });

    const container = screen.getByTestId('tabs');
    expect(container.classList.contains('tabs--pills')).toBe(true);
  });

  it('switches active tab in pills variant', async () => {
    const user = userEvent.setup();
    renderTabs({ variant: 'pills' });

    await user.click(screen.getByTestId('tab-1'));

    expect(screen.getByTestId('tab-1').classList.contains('tabs__button--active')).toBe(true);
    expect(screen.getByTestId('tab-0').classList.contains('tabs__button--active')).toBe(false);
  });
});
