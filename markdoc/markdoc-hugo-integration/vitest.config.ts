import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        '**/markdoc-client-prefs-manager.js',
        '**/helperModules/ClientPrefsManager.ts',
        '**/debugBookmarklet.js',
        '**/compiledScripts/**',
        '**/scripts/**',
        '**/test/**'
      ]
    }
  }
});
