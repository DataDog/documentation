import { defineConfig } from "astro/config";
import markdoc from "@astrojs/markdoc";
import preact from "@astrojs/preact";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath } from "node:url";
import { realpathSync } from "node:fs";

import { LOCALES } from "./src/lib/i18n/locale.ts";
import { isSitemapPage } from "./src/lib/sitemap/sitemapFilter.ts";
import { deriveSiteUrl } from "./src/lib/site/siteUrl.ts";
import { pagesJson } from "./src/integrations/pagesJson.ts";

const websitesModules = realpathSync(
  fileURLToPath(
    new URL("../../../../../../dd/websites-modules", import.meta.url),
  ),
);
const hugoSite = fileURLToPath(new URL("../hugo", import.meta.url));
const astroSite = fileURLToPath(new URL(".", import.meta.url));

const proxied = process.env.PROXIED === "1";
const proxyPort = 1314;

// `deriveSiteUrl` lives in src/lib/site/siteUrl.ts so routes (llms.txt tree)
// can share the exact origin this config sets as Astro's `site`.

// The Hugo docs site may be on a different origin than the Astro site in local
// dev (Hugo: 1313, Astro: 4321). In CI and proxied dev they share an origin.
function deriveHugoDocsUrl() {
  const env = process.env.CI_ENVIRONMENT_NAME;
  if (env === "preview") {
    return `https://docs-staging.datadoghq.com/${process.env.BRANCH}`;
  }
  if (env === "live") {
    return "https://docs.datadoghq.com";
  }
  return proxied ? `http://localhost:${proxyPort}` : "http://localhost:1313";
}

export default defineConfig({
  site: deriveSiteUrl(),
  // On-demand rendering is enabled up front so the API docs share the same
  // infrastructure the cdocs work needs (cdocs resolve their filters per request
  // and cannot be prerendered). For the API docs the SSR capability is dormant:
  // every route opts back into build-time rendering with
  // `export const prerender = true`, so the output is fully static today. The
  // @astrojs/node adapter is installed so `astro build` + `astro preview` mirror
  // a production server locally; the CVEs that once affected the Astro-5-era
  // adapter are resolved in the current Astro 7 / adapter 11 line.
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [
    markdoc(),
    preact(),
    sitemap({
      filenameBase: "api/sitemap",
      filter: isSitemapPage,
    }),
    // Emits dist/client/pages.json after the build by hashing each emitted .md
    // from disk (no page body is built twice). Must come after sitemap so the
    // sidecar is deleted only once every build:done consumer has run.
    pagesJson(),
  ],
  // The dev toolbar injects its own DOM (extra <h1>s, a fixed app-bar) into the
  // dev server, which pollutes browser-test selectors and screenshots. Disabled
  // so dev output matches prod for tests; it isn't used in development anyway.
  devToolbar: { enabled: false },
  build: {
    inlineStylesheets: "always",
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
    assetsInclude: ["**/*.go", "**/*.java", "**/*.py", "**/*.pybeta", "**/*.rb", "**/*.rbbeta", "**/*.rs"],
    server: {
      fs: {
        allow: [astroSite, hugoSite, websitesModules],
      },
      ...(proxied && {
        origin: `http://localhost:${proxyPort}`,
        hmr: { clientPort: proxyPort },
      }),
    },
    define: {
      __HUGO_DOCS_ORIGIN__: JSON.stringify(deriveHugoDocsUrl()),
      __CI_ENV__: JSON.stringify(process.env.CI_ENVIRONMENT_NAME ?? ''),
    },
    resolve: {
      alias: {
        "@hugo-site": hugoSite,
        "@websites-modules": websitesModules,
        "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
        "@components": fileURLToPath(
          new URL("./src/components", import.meta.url),
        ),
        "@config": fileURLToPath(new URL("./src/config", import.meta.url)),
        "@lib": fileURLToPath(new URL("./src/lib", import.meta.url)),
        "@utils": fileURLToPath(new URL("./src/lib/utils", import.meta.url)),
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
