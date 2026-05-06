import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';
import preact from '@astrojs/preact';
import { visualizer } from 'rollup-plugin-visualizer';
import { fileURLToPath } from 'node:url';
import { realpathSync } from 'node:fs';

import { LOCALES } from './src/lib/i18n/locale.ts';

const websitesModules = realpathSync(fileURLToPath(new URL('../../../../../../dd/websites-modules', import.meta.url)));
const hugoSite = fileURLToPath(new URL('..', import.meta.url));

export default defineConfig({
  site: 'https://docs.datadoghq.com',
  integrations: [markdoc(), preact()],
  build: {
    inlineStylesheets: 'always',
  },
  i18n: {
    defaultLocale: 'en',
    locales: [...LOCALES],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    server: {
      fs: {
        allow: [hugoSite, websitesModules],
      },
    },
    resolve: {
      alias: {
        '@hugo-site': hugoSite,
        '@websites-modules': websitesModules,
        '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      },
    },
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
