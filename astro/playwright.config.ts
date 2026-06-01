import { defineConfig, devices } from '@playwright/test';

// SKIP_TRANSLATIONS picks the English-only build (the common case for non-i18n
// suites). Drop it (as `test:browser:i18n` does) to get the full multi-locale
// build, since the i18n suite needs translated pages under /fr/, /es/, /ja/, /ko/.
const buildCommand = process.env.SKIP_TRANSLATIONS === 'true' ? 'npm run build:en' : 'npm run build';

// USE_DEV_SERVER skips the prod build and reuses (or starts) the dev server.
// Faster iteration, but dev output differs from prod — screenshot baselines
// captured against prod may not match.
const useDevServer = process.env.USE_DEV_SERVER === 'true';
const webServer = useDevServer
  ? { command: 'npm run dev', port: 4321, reuseExistingServer: true, timeout: 60_000, stdout: 'pipe' as const, stderr: 'pipe' as const }
  : { command: `${buildCommand} && npm run preview`, port: 4322, reuseExistingServer: false, timeout: 600_000, stdout: 'pipe' as const, stderr: 'pipe' as const };

export default defineConfig({
  testDir: 'tests/browser',
  timeout: 30_000,
  reporter: [['list'], ['html', { open: 'on-failure' }]],
  webServer,
  use: {
    baseURL: useDevServer ? 'http://localhost:4321' : 'http://localhost:4322',
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
