// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import type { ComponentType } from 'preact';
import NavDropdown from './NavDropdown';

// Cast needed because Preact's h() expects children?: ComponentChildren but
// NavDropdown's Props type narrows children/classes in a way that conflicts
// with h()'s contravariant children typing.
const NavDropdownComponent = NavDropdown as ComponentType<any>;

afterEach(cleanup);

// Pass stable, test-owned strings for the CSS-module `classes` prop so we can
// assert on them directly without depending on CSS-module hashes. These strings
// act as BEM-style state hooks: the component appends them to the live DOM when
// the dropdown opens, and we verify that contract here.
const classes = {
  menuItem: 'menu-item',
  menuItemOpen: 'menu-item--open',
  menuLink: 'menu-link',
  dropdownMenu: 'dropdown-menu-css',
  dropdownMenuOpen: 'dropdown-menu--open',
  solutionsMenu: 'solutions-menu-css',
};

const renderDropdown = (props: Partial<Parameters<typeof NavDropdown>[0]> = {}) =>
  render(
    h(NavDropdownComponent, {
      label: 'Product',
      href: '/product',
      identifier: 'product',
      classes,
      children: h('a', { href: '/product/apm', 'data-testid': 'dropdown-child' }, 'APM'),
      ...props,
    }),
  );

describe('NavDropdown — static render', () => {
  it('renders the trigger label and pre-rendered children (SEO)', () => {
    renderDropdown();

    expect(screen.getByTestId('nav-dropdown-product')).toBeTruthy();
    expect(screen.getByText('Product')).toBeTruthy();
    // Children must render at build time regardless of open state.
    expect(screen.getByTestId('dropdown-child')).toBeTruthy();
  });

  it('applies the identifier BEM class and dropdown hook class', () => {
    renderDropdown();

    const li = screen.getByTestId('nav-dropdown-product');
    expect(li.classList.contains('dropdown')).toBe(true);
    expect(li.classList.contains('product-dropdown')).toBe(true);
  });

  it('applies the solutions-menu BEM class only when isSolutions is true', () => {
    renderDropdown({ isSolutions: true });

    const menu = screen.getByTestId('nav-dropdown-menu-product');
    expect(menu.classList.contains('solutions-menu')).toBe(true);
  });

  it('omits the solutions-menu class by default', () => {
    renderDropdown();

    const menu = screen.getByTestId('nav-dropdown-menu-product');
    expect(menu.classList.contains('solutions-menu')).toBe(false);
  });
});

describe('NavDropdown — interactivity', () => {
  it('is closed by default (no open modifier classes)', () => {
    renderDropdown();

    const li = screen.getByTestId('nav-dropdown-product');
    const menu = screen.getByTestId('nav-dropdown-menu-product');

    expect(li.classList.contains('menu-item--open')).toBe(false);
    expect(menu.classList.contains('dropdown-menu--open')).toBe(false);
  });

  it('opens on mouse enter: adds open modifier classes to trigger and menu', async () => {
    const user = userEvent.setup();
    renderDropdown();

    const li = screen.getByTestId('nav-dropdown-product');
    const menu = screen.getByTestId('nav-dropdown-menu-product');

    await user.hover(li);

    expect(li.classList.contains('menu-item--open')).toBe(true);
    expect(menu.classList.contains('dropdown-menu--open')).toBe(true);
  });

  it('closes after mouse leave (~150ms delay) and removes open modifier classes', async () => {
    const user = userEvent.setup();
    renderDropdown();

    const li = screen.getByTestId('nav-dropdown-product');
    const menu = screen.getByTestId('nav-dropdown-menu-product');

    await user.hover(li);
    expect(li.classList.contains('menu-item--open')).toBe(true);

    await user.unhover(li);

    // Close is scheduled with a ~150ms timeout; wait long enough for it to fire.
    await new Promise((r) => setTimeout(r, 200));

    expect(li.classList.contains('menu-item--open')).toBe(false);
    expect(menu.classList.contains('dropdown-menu--open')).toBe(false);
  });

  it('cancels a pending close if the user re-enters before the timeout fires', async () => {
    const user = userEvent.setup();
    renderDropdown();

    const li = screen.getByTestId('nav-dropdown-product');
    const menu = screen.getByTestId('nav-dropdown-menu-product');

    await user.hover(li);
    await user.unhover(li);
    // Re-enter before the 150ms close timer fires.
    await user.hover(li);

    // Wait past the original close window; menu should still be open.
    await new Promise((r) => setTimeout(r, 200));

    expect(li.classList.contains('menu-item--open')).toBe(true);
    expect(menu.classList.contains('dropdown-menu--open')).toBe(true);
  });
});
