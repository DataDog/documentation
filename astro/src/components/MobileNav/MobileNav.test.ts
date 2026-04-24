// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, waitFor } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import type { ComponentType } from 'preact';
import MobileNav from './MobileNav';

// Cast for parity with Tabs test — h()'s children typing is stricter than the
// component's prop signature in some cases.
const MobileNavComponent = MobileNav as ComponentType<any>;

afterEach(() => {
  cleanup();
  // The open-state effect mutates <html style="overflow:hidden">; reset so
  // tests don't leak state to each other.
  document.documentElement.style.overflow = '';
});

// BEM class names — supplied via the `classes` prop so we can assert on stable
// DOM hooks rather than CSS-module hashes.
const classes = {
  hamburger: 'hamburger',
  hamburgerOpen: 'hamburger--open',
  hamburgerBar: 'hamburger__bar',
};

const quicknav = { home: 'Home', docs: 'Docs', api: 'API' };
const search = { placeholder: 'Search', ariaLabel: 'Search' };
const items = [
  { identifier: 'product', label: 'Product', url: 'https://www.datadoghq.com/product/' },
];
const categories = [
  {
    identifier: 'infra',
    label: 'Infrastructure',
    products: [{ identifier: 'apm', label: 'APM', url: 'https://www.datadoghq.com/product/apm/' }],
  },
];

const renderMobileNav = () =>
  render(h(MobileNavComponent, { classes, quicknav, search, items, categories }));

function getToggle() {
  return document.querySelector<HTMLButtonElement>('.navbar-toggler')!;
}
function getPanel() {
  return document.getElementById('mobile-nav')!;
}
function getBackdrop() {
  return document.getElementById('mobile-nav-bg')!;
}
function getSearch() {
  return document.querySelector<HTMLInputElement>('.mobile-nav__search')!;
}

describe('MobileNav — static render', () => {
  it('renders the hamburger toggle with accessible label', () => {
    renderMobileNav();

    const toggle = getToggle();
    expect(toggle).toBeTruthy();
    expect(toggle.getAttribute('aria-label')).toBe('Toggle navigation');
  });

  it('renders the nav panel and backdrop', () => {
    renderMobileNav();

    expect(getPanel()).toBeTruthy();
    expect(getBackdrop()).toBeTruthy();
  });

  it('renders the stubbed search input', () => {
    renderMobileNav();

    const searchInput = getSearch();
    expect(searchInput).toBeTruthy();
    expect(searchInput.getAttribute('type')).toBe('search');
  });
});

describe('MobileNav — interactivity', () => {
  it('starts closed: toggle has no open BEM modifier and aria-expanded is false', () => {
    renderMobileNav();

    const toggle = getToggle();
    expect(toggle.classList.contains('hamburger')).toBe(true);
    expect(toggle.classList.contains('hamburger--open')).toBe(false);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    // Closed state: document scroll is not locked.
    expect(document.documentElement.style.overflow).toBe('');
  });

  it('clicking the toggle opens the nav: sets BEM open class, aria-expanded, and locks scroll', async () => {
    const user = userEvent.setup();
    renderMobileNav();

    const toggle = getToggle();
    await user.click(toggle);

    // BEM class state
    expect(toggle.classList.contains('hamburger--open')).toBe(true);
    // a11y / interactivity
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    // Visibility side effect: body scroll locked while panel is open.
    // The overflow is set from a useEffect, so wait for the post-commit flush.
    await waitFor(() => {
      expect(document.documentElement.style.overflow).toBe('hidden');
    });
    // Panel and backdrop are present and rendered
    expect(getPanel()).toBeTruthy();
    expect(getBackdrop()).toBeTruthy();
  });

  it('clicking the toggle again closes the nav: removes BEM open class and unlocks scroll', async () => {
    const user = userEvent.setup();
    renderMobileNav();

    const toggle = getToggle();
    await user.click(toggle); // open
    await user.click(toggle); // close

    expect(toggle.classList.contains('hamburger--open')).toBe(false);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    await waitFor(() => {
      expect(document.documentElement.style.overflow).toBe('');
    });
  });

  it('clicking the backdrop closes the nav', async () => {
    const user = userEvent.setup();
    renderMobileNav();

    const toggle = getToggle();
    await user.click(toggle);
    expect(toggle.classList.contains('hamburger--open')).toBe(true);

    await user.click(getBackdrop());

    expect(toggle.classList.contains('hamburger--open')).toBe(false);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    await waitFor(() => {
      expect(document.documentElement.style.overflow).toBe('');
    });
  });
});
