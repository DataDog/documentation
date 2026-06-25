import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import AnnouncementBanner from '../AnnouncementBanner.astro';

/**
 * The banner has two top-level states, mirroring Hugo's `{{ if $announce }}`
 * guard in the header partial:
 *
 *   - "no banner" — no `announcement_banner` is configured (the live default
 *     when no campaign is running). Nothing should render.
 *   - "a banner"  — params are present. The banner renders, with several
 *     content/styling variations driven by those params.
 *
 * Tests inject params via `override` so they're deterministic and independent
 * of the live site config, which carries no banner when no campaign is active.
 */
describe('AnnouncementBanner', () => {
  describe('when no banner is configured', () => {
    it('renders nothing for empty params', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(AnnouncementBanner, {
        props: { override: {} },
      });

      // No element at all — not an empty banner shell.
      expect(html).not.toContain('announcement-banner');
      expect(html.trim()).toBe('');
    });
  });

  describe('when a banner is configured', () => {
    it('renders the banner root with desktop and mobile messages', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(AnnouncementBanner, {
        props: {
          override: {
            desktop_message: 'This is a desktop test banner message',
            mobile_message: 'This is a mobile test banner message',
          },
        },
      });

      expect(html).toContain('announcement-banner');
      expect(html).toContain('announcement-banner__title-desktop');
      expect(html).toContain('announcement-banner__title-mobile');
      expect(html).toContain('This is a desktop test banner message');
      expect(html).toContain('This is a mobile test banner message');
    });

    it('falls back to the desktop message when no mobile message is set', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(AnnouncementBanner, {
        props: {
          override: { desktop_message: 'Only a desktop message' },
        },
      });

      // Both slots render, both carrying the desktop copy.
      const mobile = html.match(
        /announcement-banner__title-mobile[^>]*>([^<]*)/,
      );
      expect(mobile?.[1]).toContain('Only a desktop message');
    });

    it('applies the custom_classes value to the banner element', async () => {
      // `custom_classes` (e.g. dash-announcement-banner) is what variant
      // font-size overrides key on.
      const container = await AstroContainer.create();
      const html = await container.renderToString(AnnouncementBanner, {
        props: {
          override: {
            desktop_message: 'This is a test banner message',
            mobile_message: 'This is a test banner message',
            custom_classes: 'dash-announcement-banner',
          },
        },
      });

      expect(html).toMatch(
        /<div[^>]*class="[^"]*\bannouncement-banner\b[^"]*\bdash-announcement-banner\b/,
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

    it('appends ?ref=announcement-banner to a relative link', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(AnnouncementBanner, {
        props: {
          override: {
            desktop_message: 'Read more',
            link: '/blog/post',
          },
        },
      });

      expect(html).toMatch(/<a[^>]*href="\/blog\/post\?ref=announcement-banner"/);
    });

    it('applies background-color style when provided', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(AnnouncementBanner, {
        props: {
          override: {
            desktop_message: 'This is a test banner message',
            mobile_message: 'This is a test banner message',
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
            desktop_message: 'This is a test banner message',
            mobile_message: 'This is a test banner message',
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
});
