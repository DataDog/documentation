import { defineConfig } from "astro/config";
import markdoc from "@astrojs/markdoc";
import preact from "@astrojs/preact";
import node from "@astrojs/node";
import awsLambdaAdapter from "astro-adapter-aws-lambda";
import sitemap from "@astrojs/sitemap";
import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath } from "node:url";

import { LOCALES } from "./src/lib/i18n/locale.ts";
import { isSitemapPage } from "./src/lib/sitemap/sitemapFilter.ts";
import {
  branchRef,
  deriveSiteUrl,
  IS_PROXIED,
  PROXY_PORT,
} from "./src/lib/site/siteUrl.ts";
import { pathPrefix } from "./src/lib/site/pathPrefix.ts";
import { resolveSiteEnv } from "./src/lib/site/siteEnv.ts";
import { resolveWebsitesModulesPath } from "./src/lib/site/websitesModulesPath.ts";
import { pagesJson } from "./src/integrations/pagesJson.ts";
import { llmsTxt } from "./src/integrations/llmsTxt.ts";
import { staticApiGuard } from "./src/integrations/staticApiGuard.ts";
import { sourcemapManifest } from "./src/integrations/sourcemapManifest.ts";

const websitesModules = resolveWebsitesModulesPath(import.meta.url);
const hugoSite = fileURLToPath(new URL("../hugo", import.meta.url));
// Top-level directory shared by the Hugo and Astro sites (i18n bundles, etc.).
const sharedDir = fileURLToPath(new URL("../shared", import.meta.url));
const astroSite = fileURLToPath(new URL(".", import.meta.url));

const hugoDevPort = 1313;

// Republish the CI variables the client-side telemetry bundle needs under
// Astro's `PUBLIC_` env prefix, which is the only mechanism that statically
// replaces a build-time value in *both* `astro dev` and `astro build`.
// `vite.define` does not: its replacement runs at build only, so a define
// referenced from client code reaches the browser as an undefined identifier
// during local development and throws on every page load.
//
// Assigning to `process.env` here works because Vite resolves the env after
// evaluating this config file. Consumers read `import.meta.env.PUBLIC_*`
// directly; the names are declared in `src/env.d.ts`, and each is assigned
// unconditionally below so a consumer never has to guard for undefined.
//
// Raw `CI_ENVIRONMENT_NAME`, empty locally. Map it through `resolveSiteEnv`.
process.env.PUBLIC_CI_ENV = process.env.CI_ENVIRONMENT_NAME ?? "";
// `branchRef()` rather than the raw variable, so the branch tag is normalized
// identically to the deploy path prefix and canonical URLs. Preview builds
// already throw when CI_COMMIT_REF_NAME is unset (siteUrl.ts:44-49).
process.env.PUBLIC_CI_COMMIT_REF_NAME = branchRef() ?? "";
// The deploy's short SHA, used as RUM's `version`.
//
// TODO: confirm `CI_COMMIT_SHORT_SHA` reaches the Astro CI job (owned by
// DataDog/documentation-ci). Empty means RUM events carry no `version` tag
// *and* uploaded sourcemaps match nothing — see
// `src/integrations/sourcemapManifest.ts`.
process.env.PUBLIC_CI_COMMIT_SHORT_SHA = process.env.CI_COMMIT_SHORT_SHA ?? "";
// Routes telemetry to the internal intake instead of the public one.
//
// TODO: whether CI exposes `IA_SUBDOMAIN` to the Astro job is owned by
// DataDog/documentation-ci — it is a custom variable, unlike the two above.
// Empty degrades gracefully to the public intake.
process.env.PUBLIC_IA_SUBDOMAIN = process.env.IA_SUBDOMAIN ?? "";

// CI builds (`yarn build:preview` / `yarn build:live`) set CI_ENVIRONMENT_NAME;
// local builds and `astro dev` leave it unset (resolveSiteEnv maps anything
// else to "development"). In CI the app builds with the websites-platform
// Lambda adapter, which generates the dist/_routes.json the CloudFront router
// consumes and the canonical handler bundle shape the platform's deploy
// tooling expects. Locally `@astrojs/node` stays active so `astro preview`
// keeps serving the production build from a plain Node server — the platform
// adapter has no preview mode.
const isCiBuild = resolveSiteEnv() !== "development";
const adapter = isCiBuild
  ? awsLambdaAdapter({
      siteName: "docs",
      // The /api app is fully static today: staticApiGuard enforces prerender =
      // true on every /api route. Static mode skips Lambda bundling entirely
      // and emits default:"static" in _routes.json, matching the manifest the
      // deploy pipeline writes today. Flip `static` to false (and set
      // platformMode) when the first SSR route lands — see the divergences doc.
      static: true,
    })
  : node({ mode: "standalone" });

// The Hugo docs site may be on a different origin than the Astro site in local
// dev (Hugo: 1313, Astro: 4321). In CI and proxied dev they share an origin.
function deriveHugoDocsUrl() {
  const env = resolveSiteEnv();
  if (env === "preview") {
    return `https://docs-staging.datadoghq.com/${branchRef()}`;
  }
  if (env === "live") {
    return "https://docs.datadoghq.com";
  }
  return IS_PROXIED
    ? `http://localhost:${PROXY_PORT}`
    : `http://localhost:${hugoDevPort}`;
}

export default defineConfig({
  site: deriveSiteUrl(),
  // On-demand rendering: cdocs resolve their filters at request time (reading
  // URL params + cookie), so those routes render on the server and cannot be
  // prerendered. Static routes (API docs, etc.) opt back into build-time
  // rendering with `export const prerender = true`; for the API docs the SSR
  // capability is dormant and the output is fully static. The adapter itself
  // is selected per build environment — see the `adapter` definition above:
  // platform Lambda adapter in CI, @astrojs/node standalone locally so
  // `astro build` + `astro preview` mirror a production server locally.
  output: "server",
  adapter,
  integrations: [
    markdoc(),
    preact(),
    sitemap({
      filenameBase: "api/sitemap",
      filter: isSitemapPage,
    }),
    // Emits dist/client/api/pages.json after the build by hashing each emitted
    // .md from disk (no page body is built twice). Must come after sitemap so
    // the sidecar is deleted only once every build:done consumer has run.
    pagesJson(),
    // Emits dist/client/api/llms.txt and every section detail file after the
    // build, from the llms-index.json sidecar. Same reasoning as pagesJson for
    // ordering.
    llmsTxt(),
    // Fails the build if any /api route stops being prerendered, if anything
    // is emitted outside api/ or {fr,ja,ko,es}/api/, or if the category count
    // collapses (spec-parsing regression). Registered last so it inspects the
    // final output of every other integration above.
    staticApiGuard(),
    // Emits dist/sourcemap-upload.json describing what a `datadog-ci
    // sourcemaps upload` invocation needs. Reads the resolved config only and
    // writes outside dist/client, so it neither inspects nor perturbs the
    // output the guard above checks — ordering here is not significant.
    sourcemapManifest(),
  ],
  // The dev toolbar injects its own DOM (extra <h1>s, a fixed app-bar) into the
  // dev server, which pollutes browser-test selectors and screenshots. Disabled
  // so dev output matches prod for tests; it isn't used in development anyway.
  devToolbar: { enabled: false },
  build: {
    inlineStylesheets: "always",
    // Astro's default `_astro`, deliberately. The websites deployment platform's
    // CloudFront router hardcodes /_astro/, /images/ and /fonts/ as its S3
    // fast-path, with matching long-cache behaviors; anything else falls through
    // to the generic route and loses asset caching. This used to be `api/_astro`
    // to keep the overlay out of the shared Hugo bucket's root — the app now
    // deploys to its own bucket, so that constraint is gone.
    // Prefixes hashed bundle URLs (and url()s in built/inlined CSS). Empty on
    // the platform, which serves at its distribution root; site's own path
    // carries the equivalent for canonical/absolute URLs.
    assetsPrefix: pathPrefix() || undefined,
  },
  i18n: {
    defaultLocale: "en",
    locales: [...LOCALES],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    // Treat SDK example source files as static assets so vite:import-analysis
    // doesn't misread language-specific import syntax (e.g. Go's `import (...)`)
    // as JavaScript dynamic imports. The ?raw glob in codeExampleLoader.ts
    // still works correctly with these extensions marked as assets.
    assetsInclude: [
      "**/*.go",
      "**/*.java",
      "**/*.py",
      "**/*.pybeta",
      "**/*.rb",
      "**/*.rbbeta",
      "**/*.rs",
    ],
    build: {
      // `hidden` emits the .map files but omits the //# sourceMappingURL=
      // comment, so the maps are uploaded to Datadog without being advertised
      // to every visitor's devtools. datadog-ci matches maps to minified files
      // by path, not by that comment. Without this, every JS error RUM captures
      // arrives as a stack trace through minified, hash-named bundles.
      //
      // This applies to the server build too, leaving unused maps in
      // dist/server/. Harmless — only dist/client is uploaded — but it costs
      // build time and disk. Client maps land in dist/client/_astro/, which
      // staticApiGuard and verifyDist.mjs already allow.
      sourcemap: "hidden",
    },
    server: {
      fs: {
        allow: [astroSite, hugoSite, sharedDir, websitesModules],
      },
      ...(IS_PROXIED && {
        origin: `http://localhost:${PROXY_PORT}`,
        hmr: { clientPort: PROXY_PORT },
      }),
    },
    define: {
      __HUGO_DOCS_ORIGIN__: JSON.stringify(deriveHugoDocsUrl()),
      __CI_ENV__: JSON.stringify(process.env.CI_ENVIRONMENT_NAME ?? ""),
      DOCS_PATH_PREFIX: JSON.stringify(pathPrefix()),
      // Telemetry's build-time constants are *not* defines — see the
      // `PUBLIC_` assignments above for why.
    },
    resolve: {
      alias: {
        "@hugo-site": hugoSite,
        "@shared": sharedDir,
        "@websites-modules": websitesModules,
        "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
        "@components": fileURLToPath(
          new URL("./src/components", import.meta.url),
        ),
        "@config": fileURLToPath(new URL("./src/config", import.meta.url)),
        "@lib": fileURLToPath(new URL("./src/lib", import.meta.url)),
        "@utils": fileURLToPath(new URL("./src/lib/utils", import.meta.url)),
        // Shared Markdoc partials, mirroring Hugo's layouts/shortcodes/mdoc/en.
        // Referenced from .mdoc files as `{% partial file="@partials/..." /%}`;
        // @astrojs/markdoc resolves the `file` attribute through Vite, so the
        // alias applies. Partials live outside src/content so the docs glob
        // loader does not pick them up as collection entries.
        "@partials": fileURLToPath(
          new URL("./src/partials/en", import.meta.url),
        ),
      },
    },
    plugins: [
      process.env.VISUALIZE &&
        visualizer({
          open: true,
          filename: "dist/stats.html",
          gzipSize: true,
          brotliSize: true,
        }),
    ].filter(Boolean),
  },
});
