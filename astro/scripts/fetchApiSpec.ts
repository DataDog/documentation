#!/usr/bin/env node
/**
 * Stages the API spec bundle into `astro/api-spec/`, which the `@api-spec`
 * alias points at: `v1/` and `v2/` with `full_spec.yaml`, `CodeExamples.json`
 * and the `translate_*.json` overlays.
 *
 * The bundle is `latest-api-docs.tar.gz` from the websites-sources bucket — the
 * spec's source of truth now that the docs pipeline publishes it, and the one
 * that remains once the spec stops being committed to `hugo/data/api`. Where it
 * is read from is decided in `lib/websitesSourcesData.ts`, the one file that
 * knows the bucket: `production` by default, or the prefix `FF_API_DOCS_S3_PATH`
 * names (set by CI on api-spec branches).
 *
 * The steps:
 *
 *   download (or read --bundle) into api-spec.incoming/ -> check the required
 *   files -> swap it in for api-spec/ -> stamp
 *
 * Extracting beside the staged tree and swapping it in means a failed or
 * partial fetch never leaves `api-spec/` half-written.
 *
 * Runs as TypeScript directly under Node 24's type-stripping — no build step,
 * which is why relative imports carry their `.ts` extension.
 *
 * Usage: node scripts/fetchApiSpec.ts [--bundle <path>] [--force]
 *                                     [--best-effort]
 *
 *   --bundle <path>  Stage a local `api-docs` tarball instead of downloading
 *                    one. Lets the fetch run offline, and against a bundle
 *                    that has not been published yet.
 *   --force          Re-download even when the staged bundle is current.
 *   --best-effort    Warn and exit 0 when the fetch fails, instead of exiting
 *                    1. Set on `dev` only, never on any `build` — see
 *                    `describeBestEffortFallback`.
 */

import { createReadStream } from "node:fs";
import { rename, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { logError, logProgress, logWarning } from "./lib/apiSpec/logging.ts";
import {
  describeBestEffortFallback,
  missingRequiredFiles,
  readStampIfAny,
  type StageStamp,
  writeStamp,
} from "./lib/apiSpec/stagedSpec.ts";
import {
  apiDocsSourcePath,
  downloadApiDocsBundle,
  extractApiDocsBundle,
} from "./lib/websitesSourcesData.ts";

const ASTRO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

/** Where the fetch stages everything the API loaders read via `@api-spec`. */
const STAGED_DIR = path.join(ASTRO_ROOT, "api-spec");
const INCOMING_DIR = `${STAGED_DIR}.incoming`;

interface FetchOptions {
  bundlePath: string | null;
  force: boolean;
  bestEffort: boolean;
}

async function main(options: FetchOptions): Promise<void> {
  await rm(INCOMING_DIR, { recursive: true, force: true });

  const incomingStamp = options.bundlePath
    ? await stageLocalBundle(path.resolve(options.bundlePath))
    : await stageRemoteBundle(options.force);
  if (incomingStamp === null) {
    return;
  }

  await assertBundleIsWhole(incomingStamp.source);
  await writeStamp(INCOMING_DIR, incomingStamp);
  await rm(STAGED_DIR, { recursive: true, force: true });
  await rename(INCOMING_DIR, STAGED_DIR);
  logProgress(
    `staged ${incomingStamp.fileCount} spec files from ` +
      `${incomingStamp.source} into api-spec/.`,
  );
}

async function stageLocalBundle(bundlePath: string): Promise<StageStamp> {
  const fileCount = await extractApiDocsBundle(
    createReadStream(bundlePath),
    INCOMING_DIR,
  );
  return { source: bundlePath, etag: null, fileCount };
}

/**
 * Downloads the bundle into the incoming directory, or returns null when the
 * staged tree already holds the current one (S3 answered 304).
 */
async function stageRemoteBundle(force: boolean): Promise<StageStamp | null> {
  const source = apiDocsSourcePath();
  const ifNoneMatch = force ? null : await currentStagedEtag(source);

  const download = await downloadApiDocsBundle(INCOMING_DIR, { ifNoneMatch });
  if (download.status === "not-modified") {
    logProgress(
      `api-spec/ already holds the current bundle from ${source}. ` +
        `Run \`yarn fetch:spec --force\` to re-download.`,
    );
    return null;
  }
  return { source, etag: download.etag, fileCount: download.fileCount };
}

/**
 * The ETag to send as If-None-Match: only when the staged tree is whole and
 * came from the same source, so switching `FF_API_DOCS_S3_PATH` or a damaged
 * tree always re-downloads.
 */
async function currentStagedEtag(source: string): Promise<string | null> {
  const stamp = await readStampIfAny(STAGED_DIR);
  if (stamp === null || stamp.source !== source) {
    return null;
  }
  const missing = await missingRequiredFiles(STAGED_DIR);
  return missing.length === 0 ? stamp.etag : null;
}

async function assertBundleIsWhole(source: string): Promise<void> {
  const missing = await missingRequiredFiles(INCOMING_DIR);
  if (missing.length > 0) {
    await rm(INCOMING_DIR, { recursive: true, force: true });
    throw new Error(
      `The API docs bundle from ${source} is missing ${missing.join(", ")}; ` +
        `leaving api-spec/ as it was.`,
    );
  }
}

export function parseCommandLineArguments(
  argv: readonly string[],
): FetchOptions {
  const options: FetchOptions = {
    bundlePath: null,
    force: false,
    bestEffort: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === "--force") {
      options.force = true;
      continue;
    }

    if (argument === "--best-effort") {
      options.bestEffort = true;
      continue;
    }

    if (argument.startsWith("--bundle=")) {
      options.bundlePath = argument.slice("--bundle=".length);
      continue;
    }

    if (argument === "--bundle") {
      const value = argv[index + 1];
      if (value === undefined || value.startsWith("--")) {
        throw new Error("--bundle needs a path to a local api-docs tarball.");
      }
      options.bundlePath = value;
      index += 1;
      continue;
    }

    throw new Error(
      `Unrecognized argument \`${argument}\`. Valid flags are --bundle <path>, --force and --best-effort.`,
    );
  }

  return options;
}

// Guarded so `parseCommandLineArguments` can be imported by the test suite
// without the driver running.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // A bad flag is always fatal, `--best-effort` or not — it is a mistake in the
  // invocation, not a condition of the world.
  const options = parseCommandLineArguments(process.argv.slice(2));

  main(options).catch(async (error: unknown) => {
    logError((error as Error).message);
    if (!options.bestEffort) {
      process.exit(1);
    }
    logWarning(describeBestEffortFallback(await readStampIfAny(STAGED_DIR)));
  });
}
