/**
 * Reads the two tarballs this site takes from the websites-sources bucket:
 *
 *   - the data-sources tarball, for the pinned SDK versions `yarn fetch:examples`
 *     clones at;
 *   - the API docs bundle (`latest-api-docs.tar.gz`), which `yarn fetch:spec`
 *     stages into `api-spec/`. The docs pipeline publishes it from the committed
 *     `hugo/data/api` on every live deploy and api-spec branch build, and it is
 *     the source of truth the spec is moving to.
 *
 * This is the only file under `astro/` that knows the bucket or imports `tar`
 * (see "No deploy code in this repo" in CLAUDE.md). Both reads are anonymous
 * HTTPS GETs of public objects — no AWS SDK, no credentials.
 */

import { mkdir } from "node:fs/promises";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import type { ReadableStream as NodeReadableStream } from "node:stream/web";
import { extract as extractTarball, list as listTarball } from "tar";
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
 * Throws rather than returning a partial map. A missing pin would otherwise
 * surface much later as a clone of a nonexistent ref.
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

  const response = await fetchImpl(url);
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
      });
    },
  });

  // `fetch` is typed against the DOM's ReadableStream, `Readable.fromWeb`
  // against the structurally identical one from node:stream/web. The cast
  // bridges two declarations of the same runtime object.
  const body = response.body as NodeReadableStream<Uint8Array>;

  await pipeline(Readable.fromWeb(body), parser);

  if (rawJson === null) {
    throw new Error(
      `${TARBALL_NAME} did not contain ${SDK_VERSIONS_MEMBER}. ` +
        `The upstream layout may have changed.`,
    );
  }

  return parseSdkVersions(rawJson);
}

function buildTarballUrl(): string {
  return bucketObjectUrl(process.env.FF_S3_PATH || "staging", TARBALL_NAME);
}

function bucketObjectUrl(
  dataPath: string,
  name: string,
  env: NodeJS.ProcessEnv = process.env,
): string {
  const bucket = env.FF_S3_BUCKET || "dd-websites-sources";
  return `https://${bucket}.s3.amazonaws.com/${trimSlashes(dataPath)}/${name}`;
}

function trimSlashes(value: string): string {
  return value.replace(/^\/+|\/+$/g, "");
}

// ================== API docs bundle ================== //

const API_DOCS_TARBALL_NAME = "latest-api-docs.tar.gz";

/**
 * The only members the bundle may contain: `v<N>/<file>.yaml|json`, one level
 * deep. The archive is rooted at `data/api` (`./v1/full_spec.yaml`, …).
 *
 * An allowlist rather than trusting the archive, since it is read from a public
 * bucket and written into the checkout: anything else — a `..` segment, an
 * absolute path, a nested directory, a dotfile (including the `._*` AppleDouble
 * files macOS tar adds), a non-data file — is skipped.
 */
const API_DOCS_MEMBER_RE = /^v\d+\/[A-Za-z0-9_][A-Za-z0-9_.-]*\.(yaml|json)$/;

/**
 * Which bundle to read: the bucket prefix `FF_API_DOCS_S3_PATH` names, or
 * `production` when unset. Only `datadog-api-spec/*` branches have a bundle of
 * their own, so CI sets the variable for those and every other build reads the
 * live spec. Deliberately no fallback from a branch prefix to production: a
 * missing branch bundle fails the fetch rather than quietly building the wrong
 * spec.
 */
export function apiDocsSourcePath(
  env: NodeJS.ProcessEnv = process.env,
): string {
  return trimSlashes(env.FF_API_DOCS_S3_PATH || "production");
}

export function apiDocsBundleUrl(env: NodeJS.ProcessEnv = process.env): string {
  return bucketObjectUrl(apiDocsSourcePath(env), API_DOCS_TARBALL_NAME, env);
}

export function isApiDocsBundleMember(memberPath: string): boolean {
  const normalized = normalizeMemberPath(memberPath);
  return (
    API_DOCS_MEMBER_RE.test(normalized) && !normalized.split("/").includes("..")
  );
}

/**
 * Extracts the allowlisted members of a gzipped API docs bundle into
 * `destDir`, and returns how many files it wrote. Shared by the network fetch
 * and the offline `--bundle <path>` flag, so both go through the same filter.
 */
export async function extractApiDocsBundle(
  bundle: Readable,
  destDir: string,
): Promise<number> {
  await mkdir(destDir, { recursive: true });
  let fileCount = 0;
  const extractor = extractTarball({
    cwd: destDir,
    strict: true,
    filter: (memberPath, entry) => {
      const keep =
        isApiDocsBundleMember(memberPath) &&
        "type" in entry &&
        entry.type === "File";
      if (keep) {
        fileCount += 1;
      }
      return keep;
    },
  });
  await pipeline(bundle, extractor);
  return fileCount;
}

export type ApiDocsDownload =
  | { status: "not-modified" }
  | { status: "extracted"; etag: string | null; fileCount: number };

/**
 * Downloads `latest-api-docs.tar.gz` and extracts it into `destDir`.
 *
 * With `ifNoneMatch` set to the ETag of the bundle already staged, S3 answers
 * 304 when it has not changed, which keeps a repeat `yarn dev` to one small
 * request instead of a 1.7 MB download.
 *
 * @param fetchImpl Injectable for tests; defaults to the global `fetch`.
 */
export async function downloadApiDocsBundle(
  destDir: string,
  { ifNoneMatch }: { ifNoneMatch: string | null },
  fetchImpl: typeof fetch = fetch,
): Promise<ApiDocsDownload> {
  const url = apiDocsBundleUrl();
  const headers = new Headers();
  if (ifNoneMatch) {
    headers.set("If-None-Match", ifNoneMatch);
  }

  const response = await fetchImpl(url, { headers });
  if (response.status === 304) {
    return { status: "not-modified" };
  }
  if (!response.ok) {
    // The bucket allows anonymous GetObject but not ListBucket, so S3 answers
    // a missing key with 403 rather than 404.
    const hint =
      response.status === 403
        ? ` — S3 answers 403 for a missing object, so most likely no bundle ` +
          `has been published under ${apiDocsSourcePath()}/ yet.`
        : "";
    throw new Error(
      `Could not download ${url}: ${response.status} ${response.statusText}${hint}`,
    );
  }
  if (!response.body) {
    throw new Error(`Could not download ${url}: the response had no body.`);
  }

  // Same DOM-vs-node:stream/web ReadableStream bridge as fetchSdkVersions.
  const body = response.body as NodeReadableStream<Uint8Array>;
  const fileCount = await extractApiDocsBundle(Readable.fromWeb(body), destDir);
  return {
    status: "extracted",
    etag: response.headers.get("ETag"),
    fileCount,
  };
}

/** Members are archived as `./data/…`; tar may or may not keep the `./`. */
function normalizeMemberPath(memberPath: string): string {
  return memberPath.replace(/^\.\//, "");
}
