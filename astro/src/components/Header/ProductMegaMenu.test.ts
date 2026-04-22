// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import type { ComponentType } from 'preact';
import ProductMegaMenu, { type MegaCategory } from './ProductMegaMenu';

// Cast to avoid Preact's strict children typing on default exports.
const ProductMegaMenuComponent = ProductMegaMenu as ComponentType<any>;

afterEach(cleanup);

const categories: MegaCategory[] = [
  {
    identifier: 'observability',
    label: 'Observability',
    descriptionLabel: 'Observe everything',
    gradient: ['#111', '#222'],
    iconHtml: '<svg data-testid="obs-icon"></svg>',
    subcategories: [
      {
        identifier: 'obs-sub',
        label: 'Obs Sub',
        related: false,
        sections: [
          {
            label: 'Core',
            products: [{ identifier: 'apm', label: 'APM', url: '/apm' }],
          },
        ],
      },
    ],
  },
  {
    identifier: 'security',
    label: 'Security',
    descriptionLabel: 'Secure everything',
    gradient: ['#333', '#444'],
    iconHtml: '<svg data-testid="sec-icon"></svg>',
    subcategories: [
      {
        identifier: 'sec-sub',
        label: 'Sec Sub',
        related: true,
        sections: [
          {
            label: 'Threats',
            products: [{ identifier: 'csm', label: 'CSM', url: '/csm' }],
          },
        ],
      },
    ],
  },
];

// Mimic CSS-module class names the Header passes in. The component combines
// these with BEM-style "product-menu"/"dropdown-menu" hooks on the DOM.
const classes = {
  menuItem: 'menu-item',
  menuItemOpen: 'menu-item--open',
  menuLink: 'menu-link',
  dropdownMenu: 'dropdown-menu',
  dropdownMenuOpen: 'dropdown-menu--open',
};

const renderMenu = (props: Partial<Parameters<typeof ProductMegaMenu>[0]> = {}) =>
  render(
    h(ProductMegaMenuComponent, {
      label: 'Product',
      href: '/product',
      categories,
      pricingLabel: 'Pricing',
      pricingHref: '/pricing',
      hype: 'Hype!',
      carrotSvg: '<svg data-testid="carrot"></svg>',
      classes,
      ...props,
    }),
  );

describe('ProductMegaMenu — static render', () => {
  it('renders the trigger and dropdown with all categories', () => {
    renderMenu();

    expect(screen.getByTestId('nav-dropdown-product')).toBeTruthy();
    expect(screen.getByTestId('product-mega-menu')).toBeTruthy();
    expect(screen.getByTestId('product-category-toggle-observability')).toBeTruthy();
    expect(screen.getByTestId('product-category-toggle-security')).toBeTruthy();
  });

  it('is closed by default (no open BEM modifiers applied)', () => {
    renderMenu();

    const trigger = screen.getByTestId('nav-dropdown-product');
    const dropdown = screen.getByTestId('product-mega-menu');

    expect(trigger.classList.contains('menu-item--open')).toBe(false);
    expect(dropdown.classList.contains('dropdown-menu--open')).toBe(false);
  });
});

describe('ProductMegaMenu — interactivity (open/close)', () => {
  it('hovering the trigger applies open BEM modifiers', async () => {
    const user = userEvent.setup();
    renderMenu();

    const trigger = screen.getByTestId('nav-dropdown-product');
    await user.hover(trigger);

    expect(trigger.classList.contains('menu-item--open')).toBe(true);
    expect(screen.getByTestId('product-mega-menu').classList.contains('dropdown-menu--open')).toBe(
      true,
    );
  });

  it('first category detail is visible on open; others are hidden', async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.hover(screen.getByTestId('nav-dropdown-product'));

    const obsDetail = screen.getByTestId('product-category-detail-observability') as HTMLElement;
    const secDetail = screen.getByTestId('product-category-detail-security') as HTMLElement;

    expect(obsDetail.style.display).toBe('flex');
    expect(secDetail.style.display).toBe('none');
  });
});

describe('ProductMegaMenu — interactivity (category switching)', () => {
  it('hovering a category toggle switches the visible detail after the 160ms debounce', async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.hover(screen.getByTestId('nav-dropdown-product'));
    await user.hover(screen.getByTestId('product-category-toggle-security'));

    // Wait out the 160ms debounce used by scheduleCategory.
    await new Promise((r) => setTimeout(r, 200));

    const obsDetail = screen.getByTestId('product-category-detail-observability') as HTMLElement;
    const secDetail = screen.getByTestId('product-category-detail-security') as HTMLElement;

    expect(secDetail.style.display).toBe('flex');
    expect(obsDetail.style.display).toBe('none');
  });

  it('active category toggle receives the text-primary BEM-style state class', async () => {
    const user = userEvent.setup();
    renderMenu();

    const obsToggle = screen.getByTestId('product-category-toggle-observability');
    const secToggle = screen.getByTestId('product-category-toggle-security');

    // On mount, the first category is active.
    expect(obsToggle.classList.contains('text-primary')).toBe(true);
    expect(secToggle.classList.contains('text-primary')).toBe(false);

    await user.hover(screen.getByTestId('nav-dropdown-product'));
    await user.hover(secToggle);
    await new Promise((r) => setTimeout(r, 200));

    expect(secToggle.classList.contains('text-primary')).toBe(true);
    expect(obsToggle.classList.contains('text-primary')).toBe(false);
  });
});
