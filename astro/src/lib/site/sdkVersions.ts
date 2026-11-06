/**
 * SDK client name → release version, the value of
 * `{% $sdkVersions.<client> %}` in content.
 *
 * Inlined at build time by the `__SDK_VERSIONS__` define in `astro.config.mjs`,
 * which reads the `api-code-examples/` stamp. Unit tests override the define
 * with `tests/fixtures/api/sdkVersions.ts`.
 *
 * Astro also loads `markdoc.config.mjs` (which imports this) once outside
 * Vite, where the define isn't applied, so the `typeof` check avoids a
 * ReferenceError there.
 */
declare const __SDK_VERSIONS__: Record<string, string> | undefined;

export const SDK_VERSIONS: Readonly<Record<string, string>> =
  typeof __SDK_VERSIONS__ === "undefined" ? {} : __SDK_VERSIONS__;
