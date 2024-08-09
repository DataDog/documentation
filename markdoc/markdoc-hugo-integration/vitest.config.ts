import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        '**/markdoc-client-renderer.js',
        '**/debugBookmarklet.js',
        '**/compiledScripts/**',
        '**/test/**'
      ]
    }
  }
});
