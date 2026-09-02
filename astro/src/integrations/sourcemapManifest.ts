import type { AstroConfig, AstroIntegration } from "astro";
import { writeFile } from "node:fs/promises";
import { relative } from "node:path";
import { fileURLToPath } from "node:url";
import { TELEMETRY_SERVICE } from "../lib/telemetry/initOptions";

const OUTPUT = "sourcemap-upload.json";

export interface SourcemapManifest {
  /** Directory to upload, relative to the project root. */
  uploadDir: string;
  /** Must equal RUM's `service`. */
  service: string;
  /** Must equal RUM's `version`. */
  releaseVersion: string;
  /** Public URL prefix of `uploadDir`, with a trailing slash. */
  minifiedPathPrefix: string;
}

interface ManifestInput {
  /** The resolved Astro `site`. */
  site: string;
  /** `build.assetsPrefix` — root-relative (`/branch`) or absolute, or empty. */
  pathPrefix: string;
  uploadDir: string;
  releaseVersion: string;
}

/**
 * Builds the declarative sourcemap-upload manifest.
 *
 * `--minified-path-prefix` must exactly match the public URL prefix of the
 * emitted assets, which this repo computes and CI does not. A mismatch is
 * invisible: the upload still succeeds, it just never matches an error.
 *
 * Resolving `pathPrefix` against `site` rather than concatenating them handles
 * all three shapes: a root-relative prefix replaces `site`'s own path (so the
 * branch segment is not doubled — `siteUrl.ts` warns that `site` and
 * `pathPrefix()` must never be composed), an absolute prefix wins outright, and
 * an empty prefix yields the bare origin.
 */
export function buildSourcemapManifest({
  site,
  pathPrefix,
  uploadDir,
  releaseVersion,
}: ManifestInput): SourcemapManifest {
  const prefix = pathPrefix.replace(/\/+$/, "");
  return {
    uploadDir,
    service: TELEMETRY_SERVICE,
    releaseVersion,
    minifiedPathPrefix: new URL(`${prefix}/`, site).href,
  };
}

/**
 * Writes `dist/sourcemap-upload.json` after the build, describing what a
 * `datadog-ci sourcemaps upload` invocation would need. Without uploaded
 * sourcemaps, every JS error RUM captures on Astro arrives as a stack trace
 * through minified, hash-named bundles.
 *
 * Written to `dist/` and not `dist/client/` deliberately — a sibling of the
 * existing `dist/stats.html`, so it is never deployed and never reaches
 * `staticApiGuard` or `verifyDist.mjs`.
 *
 * This stays inside the repo's no-deploy-code rule: it names no bucket,
 * distribution, or credential, and describes only the shape of the build
 * output.
 *
 * TODO: nothing consumes this manifest yet. `documentation-ci` needs a
 * post-deploy job for the Astro app, running:
 *   ./node_modules/.bin/datadog-ci sourcemaps upload <uploadDir> \
 *     --service <service> \
 *     --minified-path-prefix <minifiedPathPrefix> \
 *     --release-version <releaseVersion>
 * with DATADOG_API_KEY from `get_secret 'dd-api-key'` and allow_failure: true.
 * Until then, RUM error stack traces for Astro stay minified. The job needs no
 * post-processing of `.map` filenames — Vite emits `foo.[hash].js.map`
 * alongside `foo.[hash].js` already.
 *
 * Imports must stay alias-free (relative + npm only): this code runs in Node
 * during build orchestration, outside Vite's module graph, so `@lib` aliases do
 * not resolve here.
 */
export function sourcemapManifest(): AstroIntegration {
  let config: AstroConfig;

  return {
    name: "sourcemap-manifest",
    hooks: {
      "astro:config:done": ({ config: resolved }: { config: AstroConfig }) => {
        config = resolved;
      },
      "astro:build:done": async ({ logger }) => {
        const root = fileURLToPath(config.root);
        const assetsPrefix = config.build.assetsPrefix;

        const manifest = buildSourcemapManifest({
          site: config.site ?? "",
          // Only the string form is used by this app (`pathPrefix() ||
          // undefined`). The per-extension record form would mean assets live
          // at more than one prefix, which needs more than one upload — so
          // refuse to guess rather than emit a manifest that is quietly wrong
          // for some files.
          pathPrefix: typeof assetsPrefix === "string" ? assetsPrefix : "",
          uploadDir: relative(root, fileURLToPath(config.build.client)),
          releaseVersion: process.env.CI_COMMIT_SHORT_SHA ?? "",
        });

        if (assetsPrefix && typeof assetsPrefix !== "string") {
          logger.warn(
            "build.assetsPrefix is per-extension; the sourcemap manifest " +
              "assumes a single prefix and will not match. Uploaded maps " +
              "would be ignored silently.",
          );
        }
        if (!manifest.releaseVersion) {
          logger.warn(
            "CI_COMMIT_SHORT_SHA is unset, so releaseVersion is empty. " +
              "Sourcemaps uploaded with an empty version match nothing, and " +
              "RUM events carry no deploy tag.",
          );
        }

        const outputUrl = new URL(OUTPUT, config.outDir);
        await writeFile(
          outputUrl,
          `${JSON.stringify(manifest, null, 2)}\n`,
          "utf8",
        );

        logger.info(`wrote ${OUTPUT} (${manifest.minifiedPathPrefix})`);
      },
    },
  };
}
