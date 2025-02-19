import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        '**/clientFiltersManager.js',
        '**/browser/entryPoint.ts',
        '**/ClientFiltersManager.ts',
        '**/reresolver.ts',
        '**/debugBookmarklet.js',
        '**/compiledScripts/**',
        '**/scripts/**',
        '**/test/**'
      ]
    }
  }
});
