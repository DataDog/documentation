// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import type { ComponentType } from 'preact';
import ProductMegaMenu, { type MegaCategory } from './ProductMegaMenu';

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

const renderMenu = (props: Partial<Parameters<typeof ProductMegaMenu>[0]> = {}) =>
  render(
    h(ProductMegaMenuComponent, {
      labels: { trigger: 'Product', pricing: 'Pricing', hype: 'Hype!' },
      hrefs: { product: '/product', pricing: '/pricing' },
      categories,
      svgs: { carrot: '<svg data-testid="carrot"></svg>' },
      ...props,
    }),
  );

function getTrigger() {
  return document.querySelector<HTMLLIElement>('.product-dropdown')!;
}
function getDropdown() {
  return document.querySelector<HTMLElement>('.product-menu')!;
}
function getToggle(identifier: string) {
  return document.querySelector<HTMLButtonElement>(`.product-menu__category-toggle--${identifier}`)!;
}
function getDetail(identifier: string) {
  return document.querySelector<HTMLElement>(`.product-menu__category--${identifier}`)!;
}

describe('ProductMegaMenu — static render', () => {
  it('renders the trigger and dropdown with all categories', () => {
    renderMenu();

    expect(getTrigger()).toBeTruthy();
    expect(getDropdown()).toBeTruthy();
    expect(getToggle('observability')).toBeTruthy();
    expect(getToggle('security')).toBeTruthy();
  });

  it('is closed by default (no open BEM modifiers applied)', () => {
    renderMenu();

    expect(getTrigger().classList.contains('header__menu-item--open')).toBe(false);
    expect(getDropdown().classList.contains('header__dropdown-menu--open')).toBe(false);
  });
});

describe('ProductMegaMenu — interactivity (open/close)', () => {
  it('hovering the trigger applies open BEM modifiers', async () => {
    const user = userEvent.setup();
    renderMenu();

    const trigger = getTrigger();
    await user.hover(trigger);

    expect(trigger.classList.contains('header__menu-item--open')).toBe(true);
    expect(getDropdown().classList.contains('header__dropdown-menu--open')).toBe(true);
  });

  it('first category detail is visible on open; others are hidden', async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.hover(getTrigger());

    const obsDetail = getDetail('observability');
    const secDetail = getDetail('security');

    expect(obsDetail.classList.contains('product-menu__category--active')).toBe(true);
    expect(secDetail.classList.contains('product-menu__category--active')).toBe(false);
  });
});

describe('ProductMegaMenu — interactivity (category switching)', () => {
  it('hovering a category toggle switches the visible detail after the 160ms debounce', async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.hover(getTrigger());
    await user.hover(getToggle('security'));

    await new Promise((r) => setTimeout(r, 200));

    expect(getDetail('security').classList.contains('product-menu__category--active')).toBe(true);
    expect(getDetail('observability').classList.contains('product-menu__category--active')).toBe(false);
  });

  it('active category toggle receives the product-menu__category-toggle--active BEM modifier', async () => {
    const user = userEvent.setup();
    renderMenu();

    const obsToggle = getToggle('observability');
    const secToggle = getToggle('security');

    expect(obsToggle.classList.contains('product-menu__category-toggle--active')).toBe(true);
    expect(secToggle.classList.contains('product-menu__category-toggle--active')).toBe(false);

    await user.hover(getTrigger());
    await user.hover(secToggle);
    await new Promise((r) => setTimeout(r, 200));

    expect(secToggle.classList.contains('product-menu__category-toggle--active')).toBe(true);
    expect(obsToggle.classList.contains('product-menu__category-toggle--active')).toBe(false);
  });
});
