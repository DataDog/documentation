import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/browser',
  webServer: {
    command: 'npm run build && npm run preview -- --port 4322',
    port: 4322,
    reuseExistingServer: false,
  },
  use: {
    baseURL: 'http://localhost:4322',
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
