import { mkdir, mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { Readable } from "node:stream";
import { create as createTarball } from "tar";
import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import {
  apiDocsBundleUrl,
  apiDocsSourcePath,
  downloadApiDocsBundle,
  extractApiDocsBundle,
  isApiDocsBundleMember,
  parseSdkVersions,
  SDK_REPOS,
} from "./websitesSourcesData.ts";

/** A trimmed copy of the real `data/sdk_versions.json`. */
const SDK_VERSIONS_JSON = JSON.stringify([
  { client: "datadog-api-client-go", version: "v2.65.0" },
  { client: "datadog-api-client-java", version: "datadog-api-client-2.60.0" },
  { client: "datadog-api-client-python", version: "2.60.0" },
  { client: "datadog-api-client-ruby", version: "v2.59.1" },
  { client: "datadog-api-client-typescript", version: "v1.63.0" },
  { client: "datadog-api-client-rust", version: "0.36.0" },
  { client: "integrations-core", version: "ddev-v18.0.0" },
]);

describe("parseSdkVersions", () => {
  it("returns a pin for each of the six SDK repos", () => {
    const pins = parseSdkVersions(SDK_VERSIONS_JSON);
    expect(Object.keys(pins).sort()).toEqual([...SDK_REPOS].sort());
  });

  it("keeps each repo's tag verbatim, since conventions differ per repo", () => {
    const pins = parseSdkVersions(SDK_VERSIONS_JSON);
    expect(pins).toEqual({
      "datadog-api-client-go": "v2.65.0",
      "datadog-api-client-java": "datadog-api-client-2.60.0",
      "datadog-api-client-python": "2.60.0",
      "datadog-api-client-ruby": "v2.59.1",
      "datadog-api-client-typescript": "v1.63.0",
      "datadog-api-client-rust": "0.36.0",
    });
  });

  it("ignores clients that are not SDK repos", () => {
    const pins = parseSdkVersions(SDK_VERSIONS_JSON);
    expect(pins).not.toHaveProperty("integrations-core");
  });

  it("names the missing repo when a pin is absent", () => {
    const missingRuby = JSON.parse(SDK_VERSIONS_JSON).filter(
      (entry: { client: string }) => entry.client !== "datadog-api-client-ruby",
    );
    expect(() => parseSdkVersions(JSON.stringify(missingRuby))).toThrow(
      /datadog-api-client-ruby/,
    );
  });

  it("rejects an entry whose version is missing", () => {
    const noVersion = JSON.stringify([{ client: "datadog-api-client-go" }]);
    expect(() => parseSdkVersions(noVersion)).toThrow();
  });

  it("rejects an empty version string, rather than cloning a nameless ref", () => {
    const blankVersion = JSON.parse(SDK_VERSIONS_JSON).map(
      (entry: { client: string; version: string }) =>
        entry.client === "datadog-api-client-go"
          ? { ...entry, version: "" }
          : entry,
    );
    expect(() => parseSdkVersions(JSON.stringify(blankVersion))).toThrow();
  });

  it("rejects malformed JSON with the source named", () => {
    expect(() => parseSdkVersions("{not json")).toThrow(/sdk_versions\.json/);
  });

  it("rejects a JSON object where the file should be an array", () => {
    expect(() =>
      parseSdkVersions('{"datadog-api-client-go":"v2.65.0"}'),
    ).toThrow();
  });
});

describe("apiDocsSourcePath", () => {
  it("defaults to production", () => {
    expect(apiDocsSourcePath({})).toBe("production");
  });

  it("reads FF_API_DOCS_S3_PATH, so CI can point a branch at its own bundle", () => {
    expect(
      apiDocsSourcePath({ FF_API_DOCS_S3_PATH: "datadog-api-spec/foo" }),
    ).toBe("datadog-api-spec/foo");
  });

  it("trims leading and trailing slashes", () => {
    expect(apiDocsSourcePath({ FF_API_DOCS_S3_PATH: "/branch/x/" })).toBe(
      "branch/x",
    );
  });
});

describe("apiDocsBundleUrl", () => {
  it("names the latest- bundle under the source path", () => {
    expect(apiDocsBundleUrl({})).toBe(
      "https://dd-websites-sources.s3.amazonaws.com/production/latest-api-docs.tar.gz",
    );
  });
});

describe("isApiDocsBundleMember", () => {
  it.each([
    "./v1/full_spec.yaml",
    "v2/CodeExamples.json",
    "./v2/translate_actions.ja.json",
  ])("accepts %s", (memberPath) => {
    expect(isApiDocsBundleMember(memberPath)).toBe(true);
  });

  it.each([
    "./",
    "./v1/",
    "../escape.json",
    "./v1/../../escape.json",
    "/etc/passwd.json",
    "./v1/nested/deeper.json",
    "./v1/script.sh",
    "./README.md",
    "./v1/._full_spec.yaml",
    "./v1/.hidden.json",
  ])("rejects %s", (memberPath) => {
    expect(isApiDocsBundleMember(memberPath)).toBe(false);
  });
});

describe("api docs bundle extraction", () => {
  let workDir: string;
  let sourceDir: string;
  let destDir: string;

  beforeEach(async () => {
    workDir = await mkdtemp(path.join(tmpdir(), "api-docs-bundle-test-"));
    sourceDir = path.join(workDir, "source");
    destDir = path.join(workDir, "dest");
    await mkdir(path.join(sourceDir, "v1"), { recursive: true });
    await mkdir(path.join(sourceDir, "v2"), { recursive: true });
    await writeFile(path.join(sourceDir, "v1/full_spec.yaml"), "openapi: 3");
    await writeFile(path.join(sourceDir, "v2/full_spec.yaml"), "openapi: 3");
    await writeFile(path.join(sourceDir, "v2/CodeExamples.json"), "{}");
    await writeFile(path.join(sourceDir, "stray.sh"), "echo nope");
  });

  afterEach(async () => {
    await rm(workDir, { recursive: true, force: true });
  });

  /** Packs `sourceDir` the way upload_api_docs does: `tar -czf … -C data/api .` */
  async function packBundle(): Promise<Buffer> {
    const chunks: Buffer[] = [];
    const stream = createTarball({ gzip: true, cwd: sourceDir }, ["."]);
    for await (const chunk of stream) {
      chunks.push(chunk as Buffer);
    }
    return Buffer.concat(chunks);
  }

  async function listExtracted(): Promise<string[]> {
    const entries = await readdir(destDir, { recursive: true });
    return entries.map((entry) => entry.split(path.sep).join("/")).sort();
  }

  it("extracts the v*/ files and drops everything else", async () => {
    const fileCount = await extractApiDocsBundle(
      Readable.from(await packBundle()),
      destDir,
    );
    expect(fileCount).toBe(3);
    expect(await listExtracted()).toEqual([
      "v1",
      "v1/full_spec.yaml",
      "v2",
      "v2/CodeExamples.json",
      "v2/full_spec.yaml",
    ]);
  });

  it("downloads and extracts, returning the ETag for the next conditional fetch", async () => {
    const bundle = await packBundle();
    const fetchImpl = vi.fn(
      async () =>
        new Response(new Uint8Array(bundle), {
          status: 200,
          headers: { ETag: '"v1"' },
        }),
    );

    const result = await downloadApiDocsBundle(
      destDir,
      { ifNoneMatch: null },
      fetchImpl as unknown as typeof fetch,
    );

    expect(result).toEqual({ status: "extracted", etag: '"v1"', fileCount: 3 });
    expect(await listExtracted()).toContain("v1/full_spec.yaml");
  });

  it("sends If-None-Match and reports not-modified on a 304", async () => {
    const fetchImpl = vi.fn(async () => new Response(null, { status: 304 }));

    const result = await downloadApiDocsBundle(
      destDir,
      { ifNoneMatch: '"v1"' },
      fetchImpl as unknown as typeof fetch,
    );

    expect(result).toEqual({ status: "not-modified" });
    const [, init] = fetchImpl.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(new Headers(init.headers).get("If-None-Match")).toBe('"v1"');
  });

  it("explains a 403, which is how S3 answers an anonymous GET of a missing object", async () => {
    const fetchImpl = vi.fn(
      async () => new Response("", { status: 403, statusText: "Forbidden" }),
    );

    await expect(
      downloadApiDocsBundle(
        destDir,
        { ifNoneMatch: null },
        fetchImpl as unknown as typeof fetch,
      ),
    ).rejects.toThrow(/403 Forbidden.*no bundle has been published/s);
  });

  it("names the URL when the bundle is missing", async () => {
    const fetchImpl = vi.fn(
      async () => new Response("", { status: 404, statusText: "Not Found" }),
    );

    await expect(
      downloadApiDocsBundle(
        destDir,
        { ifNoneMatch: null },
        fetchImpl as unknown as typeof fetch,
      ),
    ).rejects.toThrow(/latest-api-docs\.tar\.gz: 404/);
  });
});
