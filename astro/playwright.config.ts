import { defineConfig, devices } from '@playwright/test';

// SKIP_TRANSLATIONS picks the English-only build (the common case for non-i18n
// suites). Drop it (as `test:browser:i18n` does) to get the full multi-locale
// build, since the i18n suite needs translated pages under /fr/, /es/, /ja/, /ko/.
const buildCommand = process.env.SKIP_TRANSLATIONS === 'true' ? 'yarn build:en' : 'yarn build';

// USE_DEV_SERVER skips the prod build and reuses (or starts) the dev server.
// Faster iteration, but dev output differs from prod — screenshot baselines
// captured against prod may not match.
const useDevServer = process.env.USE_DEV_SERVER === 'true';
const webServer = useDevServer
  ? {
      command: 'yarn dev',
      port: 4321,
      reuseExistingServer: true,
      timeout: 60_000,
      stdout: 'pipe' as const,
      stderr: 'pipe' as const,
      // Astro 7 auto-detects "AI agent" environments (Claude Code, Cursor, etc.
      // via the CLAUDECODE / AI_AGENT env vars) and detaches `astro dev` into a
      // background daemon. That makes the foreground command exit immediately,
      // so Playwright reports "Process from config.webServer exited early" and
      // aborts. Setting ASTRO_DEV_BACKGROUND suppresses that auto-detection so
      // the server stays in the foreground for Playwright to manage. CI is
      // unaffected (none of those agent vars are set there).
      env: { ...process.env, ASTRO_DEV_BACKGROUND: '1' },
    }
  : { command: `${buildCommand} && yarn preview`, port: 4322, reuseExistingServer: false, timeout: 600_000, stdout: 'pipe' as const, stderr: 'pipe' as const };

export default defineConfig({
  testDir: '.',
  testMatch: ['src/components/**/tests/browser.test.ts', 'src/components/**/tests/*.browser.test.ts', 'tests/browser/**/*.spec.ts'],
  // Warm the dev server's heaviest routes before any timed test runs, so
  // Astro 7's one-time cold-compile cost doesn't blow a test's 30s timeout.
  globalSetup: './tests/globalSetup.ts',
  snapshotPathTemplate: '{testFileDir}/{testFileName}-snapshots/{arg}{-projectName}{-snapshotSuffix}{ext}',
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
      stylePath: './tests/screenshot.css',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome HiDPI'], viewport: { width: 1440, height: 900 } },
    },
  ],
});
