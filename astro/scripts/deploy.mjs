#!/usr/bin/env node
/**
 * Uploads the Astro `/api` build into the same S3 prefixes Hugo already
 * serves from, then invalidates CloudFront. Must run *after* the Hugo
 * deploy, never before: Hugo's own `hugo deploy` uses `--maxDeletes -1`
 * (`hugo/package.json` `deploy:preview`/`deploy:live`), which deletes any
 * remote key with no local counterpart, so an Astro upload followed by a
 * Hugo deploy would wipe it out.
 *
 * Gated behind `ASTRO_API_DEPLOY=1` (bypassed for `--dry-run`) as a rollback
 * lever: unset it and re-run the Hugo deploy to fall back to Hugo's own
 * `/api` output without a revert commit.
 *
 * Assumes the `aws` CLI is available on PATH — unverified whether the
 * `webops-site-build` image (`DataDog/websites-images`) currently ships it;
 * flag this before wiring the CI job (see the plan's Handoff section).
 *
 * Usage:
 *   CI_ENVIRONMENT_NAME=preview|live node scripts/deploy.mjs [--dry-run]
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const DIST_CLIENT = fileURLToPath(new URL("../dist/client/", import.meta.url));

/**
 * Mirrors `branchRef()` in `src/lib/site/siteUrl.ts`. Duplicated rather than
 * imported because this script runs as plain Node outside Vite/Astro's
 * TS-aware module graph. Keep in sync if that file changes.
 */
function branchRef() {
  const raw = process.env.CI_COMMIT_REF_NAME;
  if (!raw) {
    return undefined;
  }
  const trimmed = raw.replace(/^\/+/, "").replace(/\/+$/, "");
  return trimmed === "" ? undefined : trimmed;
}

const LOCALES_WITH_API = ["fr", "ja", "ko", "es"];

const TARGETS = {
  preview: () => {
    const ref = branchRef();
    if (!ref) {
      throw new Error(
        "CI_ENVIRONMENT_NAME=preview but CI_COMMIT_REF_NAME is unset.",
      );
    }
    return {
      bucket: "datadog-docs-preview",
      prefix: `${ref}/`,
      cloudFrontDistributionId: "E3EYIYXXL26MK1",
      mdUpload: null, // Finding 3: preview never gets its own .md/llms.txt/pages.json; it serves live's copy, matching existing Hugo behavior.
    };
  },
  live: () => ({
    bucket: "datadog-docs-live-hugo",
    prefix: "",
    cloudFrontDistributionId: "E2B2OODXRYOXSA",
    mdUpload: {
      bucket: "origin-static-assets",
      prefix: "documentation/html-to-mdocs/",
    },
  }),
};

function run(command, args, { dryRun }) {
  console.log(`$ ${command} ${args.join(" ")}`);
  if (dryRun) {
    return;
  }
  execFileSync(command, args, { stdio: "inherit" });
}

function s3Uri(bucket, prefix, subpath = "") {
  return `s3://${bucket}/${prefix}${subpath}`.replace(/\/+/g, "/").replace(":/", "://");
}

/** Upload A: rendered pages/assets. Scoped subtree-by-subtree so `--delete` never reaches outside a subtree Astro fully owns. */
function uploadRenderedOutput(target, options) {
  const subtrees = [
    "api/latest/",
    "api/_astro/",
    ...LOCALES_WITH_API.map((lang) => `${lang}/api/latest/`),
  ];

  for (const subtree of subtrees) {
    const local = join(DIST_CLIENT, subtree);
    if (!existsSync(local)) {
      console.log(`skip (not emitted this build): ${subtree}`);
      continue;
    }
    run(
      "aws",
      [
        "s3",
        "sync",
        local,
        s3Uri(target.bucket, target.prefix, subtree),
        "--delete",
        "--exclude",
        "*.md",
      ],
      options,
    );
  }

  // Files that live directly under `api/` (the bare index redirect and the
  // `screenboards` alias), outside every subtree synced above, and outside
  // `api/latest/` — a plain `cp`, never `--delete`, so this step can never
  // erase a subtree it doesn't own.
  for (const file of ["api/index.html", "api/screenboards/index.html"]) {
    const local = join(DIST_CLIENT, file);
    if (!existsSync(local)) {
      console.log(`skip (not emitted this build): ${file}`);
      continue;
    }
    run("aws", ["s3", "cp", local, s3Uri(target.bucket, target.prefix, file)], options);
  }

  // Sitemap files, a handful of top-level `api/sitemap*.xml`.
  const sitemapPattern = join(DIST_CLIENT, "api/");
  run(
    "aws",
    [
      "s3",
      "cp",
      sitemapPattern,
      s3Uri(target.bucket, target.prefix, "api/"),
      "--recursive",
      "--exclude",
      "*",
      "--include",
      "sitemap*.xml",
    ],
    options,
  );
}

/**
 * Upload B (live only, Finding 3): `.md` / `llms.txt` / `pages.json` never
 * come from the docs bucket — both distributions route them to
 * `S3-origin-static-assets` under `/html-to-mdocs`, reshaping keys
 * (`api/latest/dashboards.md` -> `html-to-mdocs/api/latest/dashboards/index.md`).
 * Never `--delete`: this bucket is shared with Hugo's own `.md` output.
 */
function uploadMdArtifacts(target, options) {
  if (!target.mdUpload) {
    console.log("skip: .md/llms.txt/pages.json upload is live-only (Finding 3)");
    return;
  }
  run(
    "aws",
    [
      "s3",
      "cp",
      DIST_CLIENT,
      s3Uri(target.mdUpload.bucket, target.mdUpload.prefix),
      "--recursive",
      "--exclude",
      "*",
      "--include",
      "*.md",
      "--include",
      "llms.txt",
      "--include",
      "pages.json",
    ],
    options,
  );
  console.warn(
    "NOTE: this uploads flat; a real run needs the key reshape " +
      "(<p>.md -> html-to-mdocs/<p>/index.md) before going live. Not yet implemented — " +
      "flag before enabling ASTRO_API_DEPLOY for a live run.",
  );
}

function invalidateCloudFront(target, options) {
  const paths = [
    "/api/*",
    ...LOCALES_WITH_API.map((lang) => `/${lang}/api/*`),
  ];
  const prefixedPaths =
    target.prefix === ""
      ? paths
      : paths.map((path) => `/${target.prefix.replace(/\/$/, "")}${path}`);
  run(
    "aws",
    [
      "cloudfront",
      "create-invalidation",
      "--distribution-id",
      target.cloudFrontDistributionId,
      "--paths",
      ...prefixedPaths,
    ],
    options,
  );
}

function main() {
  const dryRun = process.argv.includes("--dry-run");
  const env = process.env.CI_ENVIRONMENT_NAME;
  if (env !== "preview" && env !== "live") {
    console.error(
      `deploy.mjs: CI_ENVIRONMENT_NAME must be "preview" or "live" (got ${JSON.stringify(env)}).`,
    );
    process.exit(1);
  }

  if (!dryRun && process.env.ASTRO_API_DEPLOY !== "1") {
    console.log(
      "deploy.mjs: ASTRO_API_DEPLOY is not set to 1 — skipping deploy. " +
        "This is the rollback lever: unset it (or leave it unset) and Hugo's own " +
        "/api output keeps serving. Pass --dry-run to preview the plan without this gate.",
    );
    return;
  }

  if (!existsSync(DIST_CLIENT)) {
    console.error(`deploy.mjs: ${DIST_CLIENT} does not exist. Run a build first.`);
    process.exit(1);
  }

  const target = TARGETS[env]();
  const options = { dryRun };

  console.log(`deploy.mjs: ${env}${dryRun ? " (dry run)" : ""} -> s3://${target.bucket}/${target.prefix}`);

  uploadRenderedOutput(target, options);
  uploadMdArtifacts(target, options);
  invalidateCloudFront(target, options);
}

main();
