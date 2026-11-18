import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { cdocsTraitsList } from "./cdocsTraitsList";
import {
  CDOCS_TRAITS_SIDECAR,
  cdocsTraitsListPath,
} from "../lib/cdocs/traitsListFile";

const traitsListJson =
  '{"traits":["host","os"],"pages":{"guides/setup":[0,1]}}';

let clientDir: URL;
let tmpRoot: string;

/** Runs both hooks the way Astro does, against the temp output dir. */
async function runBuild(): Promise<void> {
  const integration = cdocsTraitsList();
  const hooks = integration.hooks as Record<
    string,
    (arg: unknown) => void | Promise<void>
  >;
  await hooks["astro:config:done"]({
    config: { build: { client: clientDir } },
  });
  await hooks["astro:build:done"]({ logger: { info: () => {} } });
}

const exists = (file: string) =>
  access(new URL(file, clientDir)).then(
    () => true,
    () => false,
  );

beforeEach(async () => {
  tmpRoot = await mkdtemp(join(tmpdir(), "cdocs-traits-"));
  // Trailing slash so `new URL(relative, clientDir)` resolves inside the dir,
  // matching Astro's `config.build.client`.
  clientDir = pathToFileURL(join(tmpRoot, "client") + "/");
  await mkdir(clientDir, { recursive: true });
  await writeFile(
    new URL(CDOCS_TRAITS_SIDECAR, clientDir),
    traitsListJson,
    "utf8",
  );
});

afterEach(async () => {
  await rm(tmpRoot, { recursive: true, force: true });
});

describe("cdocsTraitsList integration", () => {
  it("writes the traits list to its content-hashed path, byte for byte", async () => {
    await runBuild();

    const outputPath = cdocsTraitsListPath(traitsListJson);
    expect(await readFile(new URL(outputPath, clientDir), "utf8")).toBe(
      traitsListJson,
    );
  });

  it("removes the sidecar", async () => {
    await runBuild();

    expect(await exists(CDOCS_TRAITS_SIDECAR)).toBe(false);
  });

  it("does nothing when there's no sidecar", async () => {
    await rm(new URL(CDOCS_TRAITS_SIDECAR, clientDir));

    await expect(runBuild()).resolves.toBeUndefined();
  });
});
