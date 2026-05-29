// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import type { ComponentType } from 'preact';
import NavDropdown from './NavDropdown';

const NavDropdownComponent = NavDropdown as ComponentType<any>;

afterEach(cleanup);

const renderDropdown = (props: Partial<Parameters<typeof NavDropdown>[0]> = {}) =>
  render(
    h(NavDropdownComponent, {
      labels: { trigger: 'Product' },
      href: '/product',
      identifier: 'product',
      children: h('a', { href: '/product/apm', 'data-testid': 'dropdown-child' }, 'APM'),
      ...props,
    }),
  );

function getTrigger() {
  return document.querySelector<HTMLLIElement>('.product-dropdown')!;
}
function getMenu() {
  return document.querySelector<HTMLElement>('.product-dropdown-menu')!;
}

describe('NavDropdown — static render', () => {
  it('renders the trigger label and pre-rendered children (SEO)', () => {
    renderDropdown();

    expect(getTrigger()).toBeTruthy();
    expect(screen.getByText('Product')).toBeTruthy();
    // Children must render at build time regardless of open state.
    expect(screen.getByTestId('dropdown-child')).toBeTruthy();
  });

  it('applies the identifier BEM class and dropdown hook class', () => {
    renderDropdown();

    const li = getTrigger();
    expect(li.classList.contains('dropdown')).toBe(true);
    expect(li.classList.contains('product-dropdown')).toBe(true);
  });

  it('applies the solutions-menu BEM class only when isSolutions is true', () => {
    renderDropdown({ isSolutions: true });

    expect(getMenu().classList.contains('solutions-menu')).toBe(true);
  });

  it('omits the solutions-menu class by default', () => {
    renderDropdown();

    expect(getMenu().classList.contains('solutions-menu')).toBe(false);
  });
});

describe('NavDropdown — interactivity', () => {
  it('is closed by default (no open modifier classes)', () => {
    renderDropdown();

    expect(getTrigger().classList.contains('header__menu-item--open')).toBe(false);
    expect(getMenu().classList.contains('header__dropdown-menu--open')).toBe(false);
  });

  it('opens on mouse enter: adds open modifier classes to trigger and menu', async () => {
    const user = userEvent.setup();
    renderDropdown();

    const li = getTrigger();
    const menu = getMenu();

    await user.hover(li);

    expect(li.classList.contains('header__menu-item--open')).toBe(true);
    expect(menu.classList.contains('header__dropdown-menu--open')).toBe(true);
  });

  it('closes after mouse leave (~150ms delay) and removes open modifier classes', async () => {
    const user = userEvent.setup();
    renderDropdown();

    const li = getTrigger();
    const menu = getMenu();

    await user.hover(li);
    expect(li.classList.contains('header__menu-item--open')).toBe(true);

    await user.unhover(li);

    await new Promise((r) => setTimeout(r, 200));

    expect(li.classList.contains('header__menu-item--open')).toBe(false);
    expect(menu.classList.contains('header__dropdown-menu--open')).toBe(false);
  });

  it('cancels a pending close if the user re-enters before the timeout fires', async () => {
    const user = userEvent.setup();
    renderDropdown();

    const li = getTrigger();
    const menu = getMenu();

    await user.hover(li);
    await user.unhover(li);
    await user.hover(li);

    await new Promise((r) => setTimeout(r, 200));

    expect(li.classList.contains('header__menu-item--open')).toBe(true);
    expect(menu.classList.contains('header__dropdown-menu--open')).toBe(true);
  });
});
