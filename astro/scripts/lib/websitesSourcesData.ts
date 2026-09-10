/**
 * The one file under `astro/` that knows where the websites-sources data lives
 * or how it is packaged. See the carve-out in `astro/CLAUDE.md`: this is a read
 * of a public, unauthenticated artifact — no credentials, no AWS SDK, no `aws`
 * CLI, no write path, no deploy target. Nothing else here may import `tar` or
 * repeat the URL.
 *
 * The tarball is the same one Hugo unpacks in
 * `hugo/local/bin/py/build/get_websites_sources_data.py`, and the member we
 * want is the same file Hugo's Makefile greps at
 * `hugo/_vendor/data/sdk_versions.json`. It is streamed and filtered to that
 * one member, so unlike Hugo nothing is written to disk — but the ~8.8 MB
 * still crosses the wire, because the member happens to sit at the end of the
 * archive. Roughly a second, once per fetch.
 */

import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import type { ReadableStream as NodeReadableStream } from "node:stream/web";
import { list as listTarball } from "tar";
import { z } from "zod";

/**
 * The six repos whose `examples/` trees supply the API docs' SDK code
 * examples. Mirrors `EXAMPLES_REPOS` in `hugo/Makefile:27`.
 */
export const SDK_REPOS = [
  "datadog-api-client-go",
  "datadog-api-client-java",
  "datadog-api-client-python",
  "datadog-api-client-ruby",
  "datadog-api-client-typescript",
  "datadog-api-client-rust",
] as const;

export type SdkRepo = (typeof SDK_REPOS)[number];

/**
 * Repo name → the git ref to clone.
 *
 * A lookup rather than a version number plus a formula, because the tag
 * conventions genuinely differ: `v2.65.0` (go), `datadog-api-client-2.60.0`
 * (java), a bare `2.60.0` (python), `0.36.0` (rust).
 */
export type SdkPins = Record<SdkRepo, string>;

const TARBALL_NAME = "latest-data-sources.tar.gz";
const SDK_VERSIONS_MEMBER = "data/sdk_versions.json";

/**
 * Entries carry other clients too (`integrations-core`, at time of writing),
 * which are not SDK repos and are dropped. Unknown extra keys are ignored
 * rather than rejected, so an upstream addition does not break the build.
 */
const SdkVersionsFileSchema = z.array(
  z.object({
    client: z.string().min(1),
    version: z.string().min(1),
  }),
);

/**
 * Validates the raw text of `sdk_versions.json` and reduces it to the six
 * pins. Exported so the fetch script's offline `--pins <path>` flag reads a
 * local file through exactly the same validation as the network path.
 *
 * Throws — loudly and by name — rather than returning a partial map. A missing
 * pin would otherwise surface much later as a clone of a nonexistent ref.
 */
export function parseSdkVersions(rawJson: string): SdkPins {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch (error) {
    throw new Error(
      `sdk_versions.json is not valid JSON: ${(error as Error).message}`,
    );
  }

  const result = SdkVersionsFileSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error(
      `sdk_versions.json does not match the expected shape ` +
        `(an array of { client, version }): ${z.prettifyError(result.error)}`,
    );
  }

  const versionsByClient = new Map(
    result.data.map((entry) => [entry.client, entry.version]),
  );

  const pins: Partial<SdkPins> = {};
  const missing: string[] = [];
  for (const repo of SDK_REPOS) {
    const version = versionsByClient.get(repo);
    if (version === undefined) {
      missing.push(repo);
      continue;
    }
    pins[repo] = version;
  }

  if (missing.length > 0) {
    throw new Error(
      `sdk_versions.json is missing a pin for: ${missing.join(", ")}`,
    );
  }

  return pins as SdkPins;
}

/**
 * Streams the websites-sources data tarball and returns the six SDK pins.
 *
 * @param fetchImpl Injectable for tests; defaults to the global `fetch`.
 */
export async function fetchSdkVersions(
  fetchImpl: typeof fetch = fetch,
): Promise<SdkPins> {
  const url = buildTarballUrl();
  const controller = new AbortController();

  const response = await fetchImpl(url, { signal: controller.signal });
  if (!response.ok) {
    throw new Error(
      `Could not download ${url}: ${response.status} ${response.statusText}`,
    );
  }
  if (!response.body) {
    throw new Error(`Could not download ${url}: the response had no body.`);
  }

  let rawJson: string | null = null;
  const chunks: Buffer[] = [];

  const parser = listTarball({
    filter: (memberPath) =>
      normalizeMemberPath(memberPath) === SDK_VERSIONS_MEMBER,
    onReadEntry: (entry) => {
      entry.on("data", (chunk: Buffer) => chunks.push(chunk));
      entry.on("end", () => {
        rawJson = Buffer.concat(chunks).toString("utf8");
        // Nothing after this member is of any use. Today it is the last one,
        // so this saves ~47 KB and not the ~8.8 MB you might assume; it is
        // here so that stays true if upstream reorders the archive.
        controller.abort();
      });
    },
  });

  // `fetch` is typed against the DOM's ReadableStream, `Readable.fromWeb`
  // against the structurally identical one from node:stream/web. The cast
  // bridges two declarations of the same runtime object.
  const body = response.body as NodeReadableStream<Uint8Array>;

  try {
    await pipeline(Readable.fromWeb(body), parser);
  } catch (error) {
    // The abort above is our own success signal, not a failure. Anything else
    // — and any abort that happened before the member was read — is real.
    if (rawJson === null || !isAbortError(error)) {
      throw error;
    }
  }

  if (rawJson === null) {
    throw new Error(
      `${TARBALL_NAME} did not contain ${SDK_VERSIONS_MEMBER}. ` +
        `The upstream layout may have changed.`,
    );
  }

  return parseSdkVersions(rawJson);
}

/**
 * Bucket and path follow Hugo's environment variables so a CI job can point
 * both generators at the same data. Defaults match
 * `get_websites_sources_data.py`.
 */
function buildTarballUrl(): string {
  const bucket = process.env.FF_S3_BUCKET || "dd-websites-sources";
  const dataPath = (process.env.FF_S3_PATH || "staging").replace(
    /^\/+|\/+$/g,
    "",
  );
  return `https://${bucket}.s3.amazonaws.com/${dataPath}/${TARBALL_NAME}`;
}

/** Members are archived as `./data/…`; tar may or may not keep the `./`. */
function normalizeMemberPath(memberPath: string): string {
  return memberPath.replace(/^\.\//, "");
}

function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === "AbortError";
}
