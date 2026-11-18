import { describe, it, expect } from "vitest";
import { build, type Rolldown } from "vite";
import { fileURLToPath } from "node:url";
import type { CustomizationConfigByLang } from "cdocs-data";
import { cdocsConfigPlugin } from "./cdocsConfigPlugin";

const fixtureDir = fileURLToPath(
  new URL("../../../tests/fixtures/cdocsConfig/", import.meta.url),
);

/**
 * A real build of a fixture that imports the virtual module, so the claims
 * under test (what gets bundled, and whether the build fails) come from Vite
 * itself rather than from calling the plugin's hooks by hand.
 */
async function buildWithConfig(configDirName: string): Promise<string> {
  const result = await build({
    root: fixtureDir,
    configFile: false,
    logLevel: "silent",
    plugins: [
      cdocsConfigPlugin({ configDir: `${fixtureDir}${configDirName}` }),
    ],
    build: {
      write: false,
      minify: false,
      rollupOptions: {
        input: { main: `${fixtureDir}main.js` },
        // App builds drop entry exports by default. Keep them, so the test
        // can import the bundle and read the config it holds.
        preserveEntrySignatures: "strict",
      },
    },
  });
  const outputs = Array.isArray(result) ? result : [result];
  return (outputs as Rolldown.RolldownOutput[])
    .flatMap((output) => output.output)
    .filter((item): item is Rolldown.OutputChunk => item.type === "chunk")
    .map((chunk) => chunk.code)
    .join("\n");
}

describe("cdocsConfigPlugin", () => {
  it("bundles the validated config as plain data", async () => {
    const code = await buildWithConfig("valid");
    const { default: configByLang }: { default: CustomizationConfigByLang } =
      await import(`data:text/javascript,${encodeURIComponent(code)}`);

    // The option group's labels are filled from the option glossary at load
    // time, so they show the bundle holds the loaded config, not raw YAML.
    expect(configByLang.en.optionGroupsById.prog_lang_options).toEqual([
      { id: "java", label: "Java", default: true },
      { id: "python", label: "Python" },
    ]);
    expect(configByLang.en.traitsById.prog_lang.label).toBe("Language");
  });

  it("does not read the config from disk at runtime", async () => {
    const code = await buildWithConfig("valid");

    expect(code).not.toMatch(/node:fs|from "fs"|readFileSync/);
    expect(code).not.toContain("customization_config");
    expect(code).not.toContain(".yaml");
  });

  it("fails the build when the config is invalid", async () => {
    await expect(buildWithConfig("invalid")).rejects.toThrow(
      /cdocs-config.*cobol/s,
    );
  });

  it("fails the build when the default language has no traits", async () => {
    await expect(buildWithConfig("empty")).rejects.toThrow(
      /cdocs-config.*no traits/s,
    );
  });

  it("fails the build when the config directory is missing", async () => {
    await expect(buildWithConfig("missing")).rejects.toThrow(
      /cdocs-config.*does not exist/s,
    );
  });
});
