#!/usr/bin/env node
/**
 * Stages the API docs' SDK code examples into `astro/api-code-examples/`.
 *
 * The steps:
 *
 *   resolve pins -> resolve refs -> clone six SDK repos -> transform paths
 *   -> stage examples/v* -> stage the committed legacy .py/.rb files from hugo/
 *
 * Each step lives in `lib/apiCodeExamples/`; `main` below is the whole sequence.
 *
 * Runs as TypeScript directly under Node 24's type-stripping — no build step,
 * which is why relative imports carry their `.ts` extension.
 *
 * Usage: node scripts/fetchApiCodeExamples.ts [--pins <path>] [--force]
 *                                             [--best-effort]
 *
 *   --pins <path>   Read SDK versions from a local `sdk_versions.json` instead
 *                   of the network. Makes the fetch deterministic and lets it
 *                   run offline.
 *   --force         Re-fetch even when the staged tree is already present.
 *   --best-effort   Warn and exit 0 when the fetch fails, instead of exiting 1.
 *                   Set on `dev` only, never on any `build` — see
 *                   `describeBestEffortFallback`.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import { resetOutputDirectory } from "./lib/apiCodeExamples/fileOperations.ts";
import { readDocsBranch } from "./lib/apiCodeExamples/git.ts";
import {
  logError,
  logProgress,
  logWarning,
} from "./lib/apiCodeExamples/logging.ts";
import {
  readSdkPins,
  resolveAllSdkRefs,
} from "./lib/apiCodeExamples/sdkRefs.ts";
import { stageHugoLegacyExamples } from "./lib/apiCodeExamples/stageHugoLegacyExamples.ts";
import { stageSdkExamples } from "./lib/apiCodeExamples/stageSdkExamples.ts";
import {
  describeBestEffortFallback,
  readStampIfAny,
  stagedTreeIsCurrent,
  writeStamp,
} from "./lib/apiCodeExamples/stamp.ts";

const ASTRO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const HUGO_ROOT = path.resolve(ASTRO_ROOT, "..", "hugo");

/** Where the fetch stages everything the code example loader reads. */
const STAGED_DIR = path.join(ASTRO_ROOT, "api-code-examples");

interface FetchOptions {
  pinsPath: string | null;
  force: boolean;
  bestEffort: boolean;
}

async function main(options: FetchOptions): Promise<void> {
  const docsBranch = await readDocsBranch(ASTRO_ROOT);

  if (!options.force && (await stagedTreeIsCurrent(STAGED_DIR, docsBranch))) {
    logProgress(
      `api-code-examples/ is already staged for ${docsBranch}. ` +
        `Run \`yarn fetch:examples --force\` to re-fetch.`,
    );
    return;
  }

  const pins = await readSdkPins(options.pinsPath);
  const refs = await resolveAllSdkRefs(pins, docsBranch);

  await resetOutputDirectory(STAGED_DIR);
  const exampleFileCount = await stageSdkExamples(refs, STAGED_DIR);
  const legacyFileCount = await stageHugoLegacyExamples(HUGO_ROOT, STAGED_DIR);
  logProgress(
    `staged ${legacyFileCount} committed legacy .py/.rb files from hugo/`,
  );

  await writeStamp(STAGED_DIR, {
    docsBranch,
    refs,
    exampleFileCount,
    legacyFileCount,
  });
  logProgress(
    `${exampleFileCount + legacyFileCount} files in api-code-examples/.`,
  );
}

export function parseCommandLineArguments(
  argv: readonly string[],
): FetchOptions {
  const options: FetchOptions = {
    pinsPath: null,
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

    if (argument.startsWith("--pins=")) {
      options.pinsPath = argument.slice("--pins=".length);
      continue;
    }

    if (argument === "--pins") {
      const value = argv[index + 1];
      if (value === undefined || value.startsWith("--")) {
        throw new Error("--pins needs a path to a local sdk_versions.json.");
      }
      options.pinsPath = value;
      index += 1;
      continue;
    }

    throw new Error(
      `Unrecognized argument \`${argument}\`. Valid flags are --pins <path>, --force and --best-effort.`,
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
