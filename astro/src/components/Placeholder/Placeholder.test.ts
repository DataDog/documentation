import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Placeholder from './Placeholder.astro';
import AnnouncementBannerPlaceholder from '../AnnouncementBannerPlaceholder/AnnouncementBannerPlaceholder.astro';
import HeaderPlaceholder from '../HeaderPlaceholder/HeaderPlaceholder.astro';
import FooterPlaceholder from '../FooterPlaceholder/FooterPlaceholder.astro';

describe('Placeholder primitive', () => {
  it('renders the provided name as visible text', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Placeholder, {
      props: { name: 'HEADER' },
    });

    expect(html).toContain('HEADER');
    expect(html).toContain('data-testid="placeholder"');
    expect(html).toContain('data-placeholder-name="HEADER"');
  });

  it('accepts an optional extra class', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Placeholder, {
      props: { name: 'FOOTER', class: 'my-custom-class' },
    });

    expect(html).toContain('my-custom-class');
  });
});

describe('AnnouncementBannerPlaceholder', () => {
  it('renders with the expected label and BEM class', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(AnnouncementBannerPlaceholder);

    expect(html).toContain('ANNOUNCEMENT BANNER');
    expect(html).toContain('placeholder__announcement-banner');
  });
});

describe('HeaderPlaceholder', () => {
  it('renders with the expected label and BEM class', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(HeaderPlaceholder);

    expect(html).toContain('HEADER');
    expect(html).toContain('placeholder__header');
  });
});

describe('FooterPlaceholder', () => {
  it('renders a <footer> element containing the FOOTER label', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(FooterPlaceholder);

    expect(html).toMatch(/<footer[\s>]/);
    expect(html).toContain('FOOTER');
    expect(html).toContain('placeholder__footer');
  });
});
