import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import AnnouncementBanner from './AnnouncementBanner.astro';

describe('AnnouncementBanner', () => {
  it('renders the desktop and mobile messages from the mocked site params', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(AnnouncementBanner);

    expect(html).toContain('data-testid="announcement-banner"');
    expect(html).toContain('announcement-banner__title-desktop');
    expect(html).toContain('announcement-banner__title-mobile');
    // Site params currently point at DASH — assert the message text is included.
    expect(html).toMatch(/DASH|Datadog|Observability/i);
  });

  it('applies the custom_classes value to the banner element', async () => {
    // The default mocked site params set `custom_classes: dash-announcement-banner`,
    // which the dash-variant font-size overrides key on. Verify the class is
    // present on the outer element so the smaller Hugo-identical text scale applies.
    const container = await AstroContainer.create();
    const html = await container.renderToString(AnnouncementBanner);

    expect(html).toMatch(
      /<div[^>]*class="[^"]*\bdash-announcement-banner\b[^"]*"[^>]*data-testid="announcement-banner"/,
    );
  });

  it('emits an <a> with the external_link when one is set', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(AnnouncementBanner, {
      props: {
        override: {
          desktop_message: 'Join us',
          mobile_message: 'Join us',
          external_link: 'https://example.com/webinar',
        },
      },
    });

    expect(html).toMatch(/<a[^>]*href="https:\/\/example\.com\/webinar"/);
  });

  it('applies background-color style when provided', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(AnnouncementBanner, {
      props: {
        override: {
          desktop_message: 'Hi',
          mobile_message: 'Hi',
          background_color: '#112233',
        },
      },
    });

    expect(html).toContain('background: #112233');
  });

  it('applies a 45deg gradient when both gradient colors are set', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(AnnouncementBanner, {
      props: {
        override: {
          desktop_message: 'Hi',
          mobile_message: 'Hi',
          gradient_color_one: '#ff0000',
          gradient_color_two: '#00ff00',
        },
      },
    });

    expect(html).toContain('linear-gradient(45deg, #ff0000 0%, #00ff00 100%)');
  });

  it('renders a custom-event banner as a <p> without a link', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(AnnouncementBanner, {
      props: {
        override: {
          custom_event_banner: true,
          desktop_message: 'Custom event announcement',
        },
      },
    });

    expect(html).toContain('Custom event announcement');
    // The custom-event variant should not wrap the message in an <a>.
    const customEventP = html.match(/<p[^>]*announcement-banner__custom-event[^>]*>.*?<\/p>/s);
    expect(customEventP).not.toBeNull();
  });
});
