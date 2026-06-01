/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';

// Root vitest config — lists both projects so `npm run test` runs everything.
// Each project file uses its own getViteConfig() call, giving it an isolated
// Vite server and module graph:
//
//   unit        headless + component tests, frozen 8-category fixture
//   integration full-spec shape validation, live Hugo data
//
// Run a single project:
//   vitest run --config vitest.unit.config.ts
//   vitest run --config vitest.integration.config.ts
export default defineConfig({
  test: {
    projects: [
      './vitest.unit.config.ts',
      './vitest.integration.config.ts',
    ],
  },
});
