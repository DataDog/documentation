import fs from "node:fs";
import path from "node:path";
import { loadCustomizationConfig } from "cdocs-data/loadCustomizationConfig";
import type { Plugin } from "vite";

const VIRTUAL_ID = "virtual:cdocs-config";
const RESOLVED_VIRTUAL_ID = `\0${VIRTUAL_ID}`;
const DEFAULT_LANG = "en";

interface CdocsConfigPluginOptions {
  /** The `customization_config/` directory, with one subdirectory per language. */
  configDir: string;
  /** The languages to load. Missing translations fall back to English. */
  langs?: string[];
}

/**
 * `import configByLang from "virtual:cdocs-config"` gives the cdocs
 * customization config (traits, options, and option groups) for each
 * language, as plain data.
 *
 * The config is loaded and validated when Vite builds the module, which is
 * build time in `astro build` and the first request in `astro dev`. An invalid
 * config fails the build instead of failing a page render. The server bundle
 * holds only the resulting data, so it never reads `customization_config/`.
 */
export function cdocsConfigPlugin(options: CdocsConfigPluginOptions): Plugin {
  const configDir = path.resolve(options.configDir);
  const langs = options.langs ?? [DEFAULT_LANG];

  return {
    name: "cdocs-config",

    resolveId(source) {
      return source === VIRTUAL_ID ? RESOLVED_VIRTUAL_ID : null;
    },

    load(id) {
      if (id !== RESOLVED_VIRTUAL_ID) return null;

      let configByLang;
      try {
        configByLang = loadValidatedConfig(configDir, langs);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        this.error(
          `cdocs-config: invalid customization config in ${configDir}\n${message}`,
        );
      }

      for (const filePath of findYamlFiles(configDir)) {
        this.addWatchFile(filePath);
      }

      // `JSON.parse` of a string literal is faster for engines to parse than
      // the equivalent object literal, and the config grows with the site.
      return `export default JSON.parse(${JSON.stringify(JSON.stringify(configByLang))});`;
    },

    // `addWatchFile` covers edits to existing files. Adding or deleting a
    // file also changes the config, so reload the module for those too.
    configureServer(server) {
      server.watcher.add(configDir);
      server.watcher.on("all", (event, filePath) => {
        if (!filePath.startsWith(configDir + path.sep)) return;
        if (event !== "add" && event !== "unlink") return;
        for (const environment of Object.values(server.environments)) {
          const module =
            environment.moduleGraph.getModuleById(RESOLVED_VIRTUAL_ID);
          if (module) environment.moduleGraph.invalidateModule(module);
        }
        server.ws.send({ type: "full-reload" });
      });
    },
  };
}

/**
 * `loadCustomizationConfig` validates every file it finds, but it treats a
 * missing directory as an empty config. Here, either one means the YAML never
 * made it into place, so both are errors.
 */
function loadValidatedConfig(configDir: string, langs: string[]) {
  if (!fs.existsSync(configDir)) {
    throw new Error(`The directory ${configDir} does not exist.`);
  }

  const { customizationConfigByLang } = loadCustomizationConfig({
    configDir,
    langs,
    defaultLang: DEFAULT_LANG,
  });

  const defaultConfig = customizationConfigByLang[DEFAULT_LANG];
  if (Object.keys(defaultConfig.traitsById).length === 0) {
    throw new Error(
      `The '${DEFAULT_LANG}' config has no traits. Check ${path.join(configDir, DEFAULT_LANG, "traits")}.`,
    );
  }

  return customizationConfigByLang;
}

function findYamlFiles(dir: string): string[] {
  return fs
    .readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.ya?ml$/.test(entry.name))
    .map((entry) => path.join(entry.parentPath, entry.name));
}
