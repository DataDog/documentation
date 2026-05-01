import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';
import preact from '@astrojs/preact';
import { visualizer } from 'rollup-plugin-visualizer';

import { LOCALES } from './src/lib/i18n/locale.ts';

export default defineConfig({
  site: 'https://docs.datadoghq.com',
  integrations: [markdoc(), preact()],
  i18n: {
    defaultLocale: 'en',
    locales: [...LOCALES],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [
      process.env.VISUALIZE && visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
    ].filter(Boolean),
  },
});
