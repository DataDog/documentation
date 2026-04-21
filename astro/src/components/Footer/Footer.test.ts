import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
// @ts-ignore — Preact renderer is registered for SSR of islands in headless tests.
import preactRenderer from '@astrojs/preact/server.js';
import Footer from './Footer.astro';
import FooterBlurb from './FooterBlurb.astro';
import {
  getFooterResources,
  getFooterAbout,
  getFooterBlog,
  getFooterSub,
  getFooterSocial,
  resolveFooterUrl,
  splitHalves,
} from '../../lib/footerMenus';
import { i18n } from '../../lib/i18n';

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

async function createContainer() {
  const container = await AstroContainer.create();
  container.addServerRenderer({ renderer: preactRenderer, name: '@astrojs/preact' });
  return container;
}

describe('Footer', () => {
  it('renders a <footer> tagged with the expected testid', async () => {
    const container = await createContainer();
    const html = await container.renderToString(Footer);

    expect(html).toMatch(/<footer[\s>]/);
    expect(html).toContain('data-testid="footer"');
  });

  it('renders every resources, about, blog, and sub link from menus.en.yaml', async () => {
    const container = await createContainer();
    const html = decodeEntities(await container.renderToString(Footer));

    for (const it of [
      ...getFooterResources(),
      ...getFooterAbout(),
      ...getFooterBlog(),
      ...getFooterSub(),
    ]) {
      expect(html).toContain(it.name);
      expect(html).toContain(resolveFooterUrl(it.url));
    }
  });

  it('renders each social link with its aria-label and href', async () => {
    const container = await createContainer();
    const html = await container.renderToString(Footer);

    for (const s of getFooterSocial()) {
      expect(html).toContain(`aria-label="${s.name} link"`);
      expect(html).toContain(resolveFooterUrl(s.url));
    }
  });

  it('renders section headers for Product, Resources, About, and Blog', async () => {
    const container = await createContainer();
    const html = await container.renderToString(Footer);

    expect(html).toContain('data-testid="footer-section-product"');
    expect(html).toContain('data-testid="footer-section-resources"');
    expect(html).toContain('data-testid="footer-section-about"');
    expect(html).toContain('data-testid="footer-section-blog"');
  });

  it('renders the copyright with the current year', async () => {
    const container = await createContainer();
    const html = await container.renderToString(Footer);
    const year = new Date().getFullYear();

    expect(html).toMatch(new RegExp(`&copy; Datadog\\s*${year}`));
  });

  it('renders the Free Trial CTA as a link with data-trigger="free-trial"', async () => {
    const container = await createContainer();
    const html = await container.renderToString(Footer);

    expect(html).toMatch(
      /<a[^>]*data-trigger="free-trial"[^>]*>[\s\S]*?Free Trial[\s\S]*?<\/a>/,
    );
  });

  it('renders the language selector with the current language', async () => {
    const container = await createContainer();
    const html = await container.renderToString(Footer);

    expect(html).toContain('data-testid="footer-language-selector"');
    // Current language label in its own language — English.
    expect(html).toContain('English');
  });
});

describe('FooterBlurb', () => {
  it("renders the docs-only heading and Contact Us CTA pointing at /help/", async () => {
    const container = await createContainer();
    const html = decodeEntities(await container.renderToString(FooterBlurb));

    expect(html).toContain(i18n('footer_blurb_heading'));
    expect(html).toContain(i18n('footer_blurb_desc'));
    expect(html).toContain(i18n('contact_us'));
    expect(html).toContain('https://www.datadoghq.com/help/');
  });
});

describe('footerMenus loader', () => {
  it('splits a 10-item list into halves of 5 and 5', () => {
    const items = Array.from({ length: 10 }, (_, i) => i);
    const { first, second } = splitHalves(items);
    expect(first).toHaveLength(5);
    expect(second).toHaveLength(5);
  });

  it('splits a 9-item list into halves of 5 and 4 (first half gets the extra)', () => {
    const items = Array.from({ length: 9 }, (_, i) => i);
    const { first, second } = splitHalves(items);
    expect(first).toHaveLength(5);
    expect(second).toHaveLength(4);
  });

  it('passes absolute URLs through unchanged', () => {
    expect(resolveFooterUrl('https://securitylabs.datadoghq.com/')).toBe(
      'https://securitylabs.datadoghq.com/',
    );
  });

  it('prefixes relative URLs with https://www.datadoghq.com/', () => {
    expect(resolveFooterUrl('pricing/')).toBe('https://www.datadoghq.com/pricing/');
    expect(resolveFooterUrl('/legal/')).toBe('https://www.datadoghq.com/legal/');
  });
});
