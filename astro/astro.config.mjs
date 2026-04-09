import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';
import preact from '@astrojs/preact';

export default defineConfig({
  integrations: [markdoc(), preact()],
});
