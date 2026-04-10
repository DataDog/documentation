import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/browser',
  webServer: {
    command: 'npm run dev',
    port: 4321,
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://localhost:4321',
  },
});
