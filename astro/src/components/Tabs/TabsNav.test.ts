// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import { TabsNav } from './TabsNav';

afterEach(() => {
  cleanup();
  document.body.innerHTML = '';
});

const setupShell = (groupId: string, labels: string[]) => {
  const root = document.createElement('div');
  root.setAttribute('data-tabs-group', groupId);

  const nav = document.createElement('div');
  nav.setAttribute('role', 'tablist');
  labels.forEach((label, i) => {
    const btn = document.createElement('button');
    btn.setAttribute('role', 'tab');
    btn.setAttribute('data-tab-index', String(i));
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    btn.className = i === 0 ? 'tabs__button tabs__button--active' : 'tabs__button';
    btn.textContent = label;
    nav.appendChild(btn);
  });
  root.appendChild(nav);

  labels.forEach((_, i) => {
    const panel = document.createElement('div');
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('data-tab-panel', '');
    panel.setAttribute('data-tab-index', String(i));
    panel.className = i === 0 ? 'tabs__panel tabs__panel--active' : 'tabs__panel';
    panel.hidden = i !== 0;
    panel.textContent = `Panel ${i}`;
    root.appendChild(panel);
  });

  document.body.appendChild(root);
  return root;
};

describe('TabsNav', () => {
  it('sets data-hydrated on the container on mount', () => {
    const root = setupShell('g1', ['A', 'B']);
    render(h(TabsNav, { groupId: 'g1' }), { container: root });
    expect(root.getAttribute('data-hydrated')).toBe('true');
  });

  it('clicking a button activates that tab: BEM class + aria + panel visibility', async () => {
    const user = userEvent.setup();
    const root = setupShell('g2', ['A', 'B', 'C']);
    render(h(TabsNav, { groupId: 'g2' }));

    const buttons = root.querySelectorAll<HTMLButtonElement>('[data-tab-index][role="tab"]');
    const panels = root.querySelectorAll<HTMLElement>('[data-tab-panel]');

    await user.click(buttons[1]);

    expect(buttons[0].classList.contains('tabs__button--active')).toBe(false);
    expect(buttons[0].getAttribute('aria-selected')).toBe('false');
    expect(buttons[1].classList.contains('tabs__button--active')).toBe(true);
    expect(buttons[1].getAttribute('aria-selected')).toBe('true');
    expect(panels[0].hidden).toBe(true);
    expect(panels[1].hidden).toBe(false);
    expect(panels[1].classList.contains('tabs__panel--active')).toBe(true);
    expect(panels[0].classList.contains('tabs__panel--active')).toBe(false);
  });

  it('clicking back to the first tab restores original visibility', async () => {
    const user = userEvent.setup();
    const root = setupShell('g3', ['A', 'B']);
    render(h(TabsNav, { groupId: 'g3' }));

    const buttons = root.querySelectorAll<HTMLButtonElement>('[data-tab-index][role="tab"]');
    const panels = root.querySelectorAll<HTMLElement>('[data-tab-panel]');

    await user.click(buttons[1]);
    await user.click(buttons[0]);

    expect(buttons[0].classList.contains('tabs__button--active')).toBe(true);
    expect(panels[0].hidden).toBe(false);
    expect(panels[1].hidden).toBe(true);
  });
});
