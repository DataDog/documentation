import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/browser',
  webServer: {
    command: process.env.CI ? 'npm run build && npm run preview' : 'npm run dev',
    port: process.env.CI ? 4322 : 4321,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: process.env.CI ? 'http://localhost:4322' : 'http://localhost:4321',
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
      caret: 'hide',
      scale: 'device',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome HiDPI'], viewport: { width: 1440, height: 900 } },
    },
  ],
});
