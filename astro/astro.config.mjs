import { defineConfig } from "astro/config";
import markdoc from "@astrojs/markdoc";
import preact from "@astrojs/preact";
import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath } from "node:url";
import { realpathSync } from "node:fs";

import { LOCALES } from "./src/lib/i18n/locale.ts";

const websitesModules = realpathSync(
  fileURLToPath(
    new URL("../../../../../../dd/websites-modules", import.meta.url),
  ),
);
const hugoSite = fileURLToPath(new URL("..", import.meta.url));

const proxied = process.env.PROXIED === "1";
const proxyPort = 1314;

function deriveSiteUrl() {
  const env = process.env.CI_ENVIRONMENT_NAME;
  if (env === "preview") {
    return `https://docs-staging.datadoghq.com/${process.env.BRANCH}`;
  }
  if (env === "live") {
    return "https://docs.datadoghq.com";
  }
  return proxied ? `http://localhost:${proxyPort}` : "http://localhost:4321";
}

export default defineConfig({
  site: deriveSiteUrl(),
  integrations: [markdoc(), preact()],
  build: {
    inlineStylesheets: "always",
  },
  i18n: {
    defaultLocale: "en",
    locales: [...LOCALES],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    server: {
      fs: {
        allow: [hugoSite, websitesModules],
      },
      ...(proxied && {
        origin: `http://localhost:${proxyPort}`,
        hmr: { clientPort: proxyPort },
      }),
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
