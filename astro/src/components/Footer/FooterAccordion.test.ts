// @vitest-environment happy-dom
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { render, cleanup } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { h } from 'preact';
import type { ComponentType } from 'preact';
import FooterAccordion from './FooterAccordion';
import type { FooterSection } from './FooterAccordion';

const FooterAccordionComponent = FooterAccordion as ComponentType<any>;

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
  render(h(FooterAccordionComponent, { sections }));

beforeEach(() => {
  mockMobileViewport();
});

afterEach(cleanup);

describe('FooterAccordion — default state', () => {
  it('renders all section headers', () => {
    renderAccordion();

    expect(document.querySelector('.footer-section--product')).toBeTruthy();
    expect(document.querySelector('.footer-section--resources')).toBeTruthy();
    expect(document.querySelector('.footer-section--about')).toBeTruthy();
    expect(document.querySelector('.footer-section--blog')).toBeTruthy();
  });

  it('opens the resources section by default (BEM + aria)', () => {
    renderAccordion();

    const resourcesSection = document.querySelector('.footer-section--resources')!;
    const resourcesBody = resourcesSection.querySelector('.footer__section-body')!;
    const resourcesHeader = resourcesSection.querySelector('.footer__section-header')!;

    expect(resourcesBody.classList.contains('footer__section-body--open')).toBe(true);
    expect(resourcesHeader.getAttribute('aria-expanded')).toBe('true');
  });

  it('leaves other sections closed by default (BEM + aria)', () => {
    renderAccordion();

    for (const id of ['product', 'about', 'blog']) {
      const section = document.querySelector(`.footer-section--${id}`)!;
      const body = section.querySelector('.footer__section-body')!;
      const header = section.querySelector('.footer__section-header')!;

      expect(body.classList.contains('footer__section-body--open')).toBe(false);
      expect(header.getAttribute('aria-expanded')).toBe('false');
    }
  });
});

describe('FooterAccordion — interactivity', () => {
  it('clicking a closed section opens it and closes the previously open one', async () => {
    const user = userEvent.setup();
    renderAccordion();

    const productSection = document.querySelector('.footer-section--product')!;
    const productHeader = productSection.querySelector('.footer__section-header')! as HTMLElement;
    const productBody = productSection.querySelector('.footer__section-body')!;

    const resourcesSection = document.querySelector('.footer-section--resources')!;
    const resourcesHeader = resourcesSection.querySelector('.footer__section-header')!;
    const resourcesBody = resourcesSection.querySelector('.footer__section-body')!;

    await user.click(productHeader);

    expect(productBody.classList.contains('footer__section-body--open')).toBe(true);
    expect(productHeader.getAttribute('aria-expanded')).toBe('true');

    expect(resourcesBody.classList.contains('footer__section-body--open')).toBe(false);
    expect(resourcesHeader.getAttribute('aria-expanded')).toBe('false');
  });

  it('clicking the currently open section closes it (toggle off)', async () => {
    const user = userEvent.setup();
    renderAccordion();

    const resourcesSection = document.querySelector('.footer-section--resources')!;
    const resourcesHeader = resourcesSection.querySelector('.footer__section-header')! as HTMLElement;
    const resourcesBody = resourcesSection.querySelector('.footer__section-body')!;

    await user.click(resourcesHeader);

    expect(resourcesBody.classList.contains('footer__section-body--open')).toBe(false);
    expect(resourcesHeader.getAttribute('aria-expanded')).toBe('false');
  });

  it('supports keyboard activation with Enter', async () => {
    const user = userEvent.setup();
    renderAccordion();

    const aboutSection = document.querySelector('.footer-section--about')!;
    const aboutHeader = aboutSection.querySelector('.footer__section-header')! as HTMLElement;
    const aboutBody = aboutSection.querySelector('.footer__section-body')!;

    aboutHeader.focus();
    await user.keyboard('{Enter}');

    expect(aboutBody.classList.contains('footer__section-body--open')).toBe(true);
    expect(aboutHeader.getAttribute('aria-expanded')).toBe('true');
  });

  it('supports keyboard activation with Space', async () => {
    const user = userEvent.setup();
    renderAccordion();

    const blogSection = document.querySelector('.footer-section--blog')!;
    const blogHeader = blogSection.querySelector('.footer__section-header')! as HTMLElement;
    const blogBody = blogSection.querySelector('.footer__section-body')!;

    blogHeader.focus();
    await user.keyboard(' ');

    expect(blogBody.classList.contains('footer__section-body--open')).toBe(true);
    expect(blogHeader.getAttribute('aria-expanded')).toBe('true');
  });
});
