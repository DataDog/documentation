import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  expect: {
    toHaveScreenshot: {
      scale: 'device',
    },
  },
  use: {
    baseURL: 'http://localhost:1313',
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
