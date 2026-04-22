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

  it('renders placeholder when no labels and no DOM source', () => {
    const { container } = render(h(TabsComponent, {}));
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

describe('Tabs — pills variant', () => {
  it('applies BEM modifier tabs--pills when variant is forced', () => {
    renderTabs({ variant: 'pills' });

    const container = screen.getByTestId('tabs');
    expect(container.classList.contains('tabs--pills')).toBe(true);
    expect(container.getAttribute('data-layout')).toBe('pills');
  });

  it('switches active tab in pills variant', async () => {
    const user = userEvent.setup();
    renderTabs({ variant: 'pills' });

    await user.click(screen.getByTestId('tab-1'));

    expect(screen.getByTestId('tab-1').classList.contains('tabs__button--active')).toBe(true);
    expect(screen.getByTestId('tab-0').classList.contains('tabs__button--active')).toBe(false);
  });
});
