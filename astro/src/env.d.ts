/// <reference types="astro/client" />

declare const __CI_ENV__: string;

/**
 * Telemetry's build-time constants, republished under Astro's `PUBLIC_` prefix
 * by `astro.config.mjs`, which assigns every one of them unconditionally and
 * documents what each carries. Empty string when CI did not provide the
 * underlying variable — never undefined, so consumers need no fallback.
 */
interface ImportMetaEnv {
  readonly PUBLIC_CI_ENV: string;
  readonly PUBLIC_CI_COMMIT_REF_NAME: string;
  readonly PUBLIC_CI_COMMIT_SHORT_SHA: string;
  readonly PUBLIC_IA_SUBDOMAIN: string;
}

/**
 * The Datadog SDK globals, assigned by `Telemetry.astro` because the planned
 * shared Ask AI package reads them rather than importing the SDKs itself.
 * Optional because they do not exist until that deferred script runs.
 */
interface Window {
  DD_RUM?: typeof import('@datadog/browser-rum').datadogRum;
  DD_LOGS?: typeof import('@datadog/browser-logs').datadogLogs;
}

declare module '*.astro' {
  import type { AstroComponentFactory } from 'astro/runtime/server';
  const Component: AstroComponentFactory;
  export default Component;
}

declare module '*?raw' {
  const content: string;
  export default content;
}
