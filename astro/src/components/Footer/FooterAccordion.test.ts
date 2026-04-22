// @vitest-environment happy-dom
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { render, cleanup, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import type { ComponentType } from 'preact';
import FooterAccordion, { type FooterSection } from './FooterAccordion';

// Cast to keep h() happy with the component's prop typing.
const FooterAccordionComponent = FooterAccordion as ComponentType<any>;

// Pass BEM-style class names through the `classes` prop so tests can assert on
// stable DOM hooks instead of CSS-module hashes.
const classes = {
  column: 'footer-accordion__column',
  columnByKey: {
    product: 'footer-accordion__column--product',
    resources: 'footer-accordion__column--resources',
    about: 'footer-accordion__column--about',
    blog: 'footer-accordion__column--blog',
  },
  header: 'footer-accordion__header',
  body: 'footer-accordion__body',
  bodyOpen: 'footer-accordion__body--open',
  divider: 'footer-accordion__divider',
  dividerDesktop: 'footer-accordion__divider--desktop',
  dividerMobile: 'footer-accordion__divider--mobile',
  columnBodyFlex: 'footer-accordion__column-body-flex',
  columnBodyFlexStacked: 'footer-accordion__column-body-flex--stacked',
  menuLinks: 'footer-accordion__menu-links',
  menuLinksHalf: 'footer-accordion__menu-links--half',
  menuLinksHalfLg100: 'footer-accordion__menu-links--half-lg-100',
  menuLink: 'footer-accordion__menu-link',
};

const sections: FooterSection[] = [
  {
    id: 'product',
    title: 'Product',
    firstColumn: [{ label: 'Infra', href: '/infra' }],
    secondColumn: [{ label: 'APM', href: '/apm' }],
    stackOnDesktop: false,
  },
  {
    id: 'resources',
    title: 'Resources',
    firstColumn: [{ label: 'Docs', href: '/docs' }],
    secondColumn: [{ label: 'Blog', href: '/blog' }],
    stackOnDesktop: true,
  },
  {
    id: 'about',
    title: 'About',
    firstColumn: [{ label: 'Company', href: '/company' }],
    secondColumn: [{ label: 'Careers', href: '/careers' }],
    stackOnDesktop: true,
  },
  {
    id: 'blog',
    title: 'Blog',
    firstColumn: [{ label: 'Latest', href: '/latest' }],
    secondColumn: [{ label: 'Archive', href: '/archive' }],
    stackOnDesktop: true,
  },
];

// Force mobile viewport so the accordion controls visibility (desktop CSS
// bypasses state and would force every body open).
function mockMobileViewport() {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

const renderAccordion = () =>
  render(h(FooterAccordionComponent, { sections, classes }));

beforeEach(() => {
  mockMobileViewport();
});

afterEach(cleanup);

describe('FooterAccordion — default state', () => {
  it('renders all section headers', () => {
    renderAccordion();

    expect(screen.getByTestId('footer-section-product')).toBeTruthy();
    expect(screen.getByTestId('footer-section-resources')).toBeTruthy();
    expect(screen.getByTestId('footer-section-about')).toBeTruthy();
    expect(screen.getByTestId('footer-section-blog')).toBeTruthy();
  });

  it('opens the resources section by default (BEM + aria)', () => {
    renderAccordion();

    const resourcesSection = screen.getByTestId('footer-section-resources');
    const resourcesBody = resourcesSection.querySelector('.footer-accordion__body')!;
    const resourcesHeader = resourcesSection.querySelector('.footer-accordion__header')!;

    expect(resourcesBody.classList.contains('footer-accordion__body--open')).toBe(true);
    expect(resourcesHeader.getAttribute('aria-expanded')).toBe('true');
  });

  it('leaves other sections closed by default (BEM + aria)', () => {
    renderAccordion();

    for (const id of ['product', 'about', 'blog']) {
      const section = screen.getByTestId(`footer-section-${id}`);
      const body = section.querySelector('.footer-accordion__body')!;
      const header = section.querySelector('.footer-accordion__header')!;

      expect(body.classList.contains('footer-accordion__body--open')).toBe(false);
      expect(header.getAttribute('aria-expanded')).toBe('false');
    }
  });
});

describe('FooterAccordion — interactivity', () => {
  it('clicking a closed section opens it and closes the previously open one', async () => {
    const user = userEvent.setup();
    renderAccordion();

    const productSection = screen.getByTestId('footer-section-product');
    const productHeader = productSection.querySelector('.footer-accordion__header')! as HTMLElement;
    const productBody = productSection.querySelector('.footer-accordion__body')!;

    const resourcesSection = screen.getByTestId('footer-section-resources');
    const resourcesHeader = resourcesSection.querySelector('.footer-accordion__header')!;
    const resourcesBody = resourcesSection.querySelector('.footer-accordion__body')!;

    await user.click(productHeader);

    expect(productBody.classList.contains('footer-accordion__body--open')).toBe(true);
    expect(productHeader.getAttribute('aria-expanded')).toBe('true');

    expect(resourcesBody.classList.contains('footer-accordion__body--open')).toBe(false);
    expect(resourcesHeader.getAttribute('aria-expanded')).toBe('false');
  });

  it('clicking the currently open section closes it (toggle off)', async () => {
    const user = userEvent.setup();
    renderAccordion();

    const resourcesSection = screen.getByTestId('footer-section-resources');
    const resourcesHeader = resourcesSection.querySelector('.footer-accordion__header')! as HTMLElement;
    const resourcesBody = resourcesSection.querySelector('.footer-accordion__body')!;

    await user.click(resourcesHeader);

    expect(resourcesBody.classList.contains('footer-accordion__body--open')).toBe(false);
    expect(resourcesHeader.getAttribute('aria-expanded')).toBe('false');
  });

  it('supports keyboard activation with Enter', async () => {
    const user = userEvent.setup();
    renderAccordion();

    const aboutSection = screen.getByTestId('footer-section-about');
    const aboutHeader = aboutSection.querySelector('.footer-accordion__header')! as HTMLElement;
    const aboutBody = aboutSection.querySelector('.footer-accordion__body')!;

    aboutHeader.focus();
    await user.keyboard('{Enter}');

    expect(aboutBody.classList.contains('footer-accordion__body--open')).toBe(true);
    expect(aboutHeader.getAttribute('aria-expanded')).toBe('true');
  });

  it('supports keyboard activation with Space', async () => {
    const user = userEvent.setup();
    renderAccordion();

    const blogSection = screen.getByTestId('footer-section-blog');
    const blogHeader = blogSection.querySelector('.footer-accordion__header')! as HTMLElement;
    const blogBody = blogSection.querySelector('.footer-accordion__body')!;

    blogHeader.focus();
    await user.keyboard(' ');

    expect(blogBody.classList.contains('footer-accordion__body--open')).toBe(true);
    expect(blogHeader.getAttribute('aria-expanded')).toBe('true');
  });
});
