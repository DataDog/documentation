import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import WhatsNext from '../WhatsNext.astro';
import NextLink from '../NextLink.astro';

describe('WhatsNext component', () => {
  it('renders the default description when none is provided', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(WhatsNext, {
      slots: { default: '<li>placeholder</li>' },
    });

    expect(html).toContain('whatsnext');
    expect(html).toContain('whatsnext__desc');
    expect(html).toContain('Additional helpful documentation, links, and articles:');
    expect(html).toContain('<ul');
    expect(html).toContain('<li>placeholder</li>');
  });

  it('renders a custom description when provided', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(WhatsNext, {
      props: { desc: 'Read more about Datadog APM:' },
      slots: { default: '<li>placeholder</li>' },
    });

    expect(html).toContain('Read more about Datadog APM:');
    expect(html).not.toContain('Additional helpful documentation');
  });

  it('omits the description paragraph when desc is empty', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(WhatsNext, {
      props: { desc: '' },
      slots: { default: '<li>placeholder</li>' },
    });

    expect(html).not.toContain('whatsnext__desc');
  });
});

describe('NextLink component', () => {
  it('renders an anchor inside an li with the given href and slot text', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(NextLink, {
      props: { href: '/docs/getting-started/' },
      slots: { default: 'Getting started' },
    });

    expect(html).toContain('whatsnext__item');
    expect(html).toContain('whatsnext__link');
    expect(html).toContain('href="/docs/getting-started/"');
    expect(html).toContain('Getting started');
    expect(html).toContain('whatsnext__arrow');
  });

  it('renders a tag in uppercase when provided', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(NextLink, {
      props: { href: '/docs/foo/', tag: 'guide' },
      slots: { default: 'Some guide' },
    });

    expect(html).toContain('whatsnext__tag');
    expect(html).toContain('GUIDE');
  });

  it('omits the tag span when no tag is provided', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(NextLink, {
      props: { href: '/docs/foo/' },
      slots: { default: 'No tag' },
    });

    expect(html).not.toContain('whatsnext__tag');
  });
});
