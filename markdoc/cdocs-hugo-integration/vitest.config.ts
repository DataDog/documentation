import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        '**/clientFiltersManager.js',
        '**/browserEntryPoint.ts',
        '**/ClientFiltersManager.ts',
        '**/reresolver.ts',
        '**/debugBookmarklet.js',
        '**/bundledScripts/**',
        '**/scripts/**',
        '**/test/**'
      ]
    }
  }
});
