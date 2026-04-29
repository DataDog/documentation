import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
// @ts-ignore — Preact renderer is registered for SSR of islands in headless tests.
import preactRenderer from '@astrojs/preact/server.js';
import Header from './Header.astro';
import { getMainLeft, getMainRight, getDesktopCategories, isDisabledForDocs } from '../../lib/menuData';
import { i18n } from '../../lib/i18n/i18n';

async function createContainer() {
  const container = await AstroContainer.create();
  container.addServerRenderer({ renderer: preactRenderer, name: '@astrojs/preact' });
  return container;
}

describe('Header', () => {
  it('renders every non-disabled top-level menu item from menus.yaml', async () => {
    const container = await createContainer();
    const html = await container.renderToString(Header);

    const expectedLeft = getMainLeft()
      .filter((m) => !isDisabledForDocs(m))
      .filter((m) => m.identifier !== 'search')
      .map((m) => i18n(m.lang_key));

    for (const label of expectedLeft) {
      expect(html).toContain(label);
    }
  });

  it('renders the Datadog logo linking to /', async () => {
    const container = await createContainer();
    const html = await container.renderToString(Header);

    // The logo anchor carries the js-logo-download behavior class and href="/".
    // Attribute order is implementation-defined, so accept either ordering.
    expect(html).toMatch(
      /<a[^>]*(class="[^"]*js-logo-download[^"]*"[^>]*href="\/"|href="\/"[^>]*class="[^"]*js-logo-download)/,
    );
  });

  it('serves retina srcset on the desktop and mobile logo images', async () => {
    const container = await createContainer();
    const html = await container.renderToString(Header);

    // Every <img> inside the header must carry a 1x/2x srcset so retina
    // displays render a crisp logo instead of upscaling the 1x PNG.
    const imgTags = html.match(/<img[^>]*>/g) ?? [];
    expect(imgTags.length).toBeGreaterThan(0);
    for (const img of imgTags) {
      expect(img).toMatch(/srcset="[^"]*1x, [^"]*2x"/);
    }
  });

  it('renders a GET STARTED FREE CTA from the right-hand menu', async () => {
    const container = await createContainer();
    const html = await container.renderToString(Header);

    expect(html).toContain(i18n('get_started_free'));
  });

  it('renders desktop product categories as interactive islands', async () => {
    const container = await createContainer();
    const html = await container.renderToString(Header);

    // Mega-menu toggle buttons are hydrated as a Preact island, so they won't
    // appear in rendered HTML unless we inspect the SSR fallback. The static
    // markup should still include the product-dropdown marker and the product
    // menu link.
    expect(html).toContain('product-dropdown');
    expect(html).toContain(i18n('product'));
    // And the mobile product list's categories should render at build time.
    const categories = getDesktopCategories();
    for (const cat of categories) {
      expect(html).toContain(i18n(cat.lang_key));
    }
  });

  it('renders About and Blog dropdowns from main_right', async () => {
    const container = await createContainer();
    const html = await container.renderToString(Header);

    const mainRight = getMainRight();
    for (const item of mainRight) {
      if (isDisabledForDocs(item)) continue;
      if (item.identifier === 'docs' || item.identifier === 'search') continue;
      if (item.identifier === 'get_started') continue;
      expect(html).toContain(i18n(item.lang_key));
    }
  });
});
