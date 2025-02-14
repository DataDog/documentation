import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        '**/markdoc-client-filters-manager.js',
        '**/markdoc-client-filters-manager.ts',
        '**/helperModules/ClientFiltersManager.ts',
        '**/helperModules/markdocCustomization/renderer/reresolver.ts',
        '**/debugBookmarklet.js',
        '**/compiledScripts/**',
        '**/scripts/**',
        '**/test/**'
      ]
    }
  }
});
