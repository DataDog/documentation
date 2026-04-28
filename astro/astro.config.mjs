import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';
import preact from '@astrojs/preact';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  site: 'https://docs.datadoghq.com',
  base: process.env.ASTRO_BASE || '/',
  integrations: [markdoc(), preact()],
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
