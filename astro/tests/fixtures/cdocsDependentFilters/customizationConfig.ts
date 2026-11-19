import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadCustomizationConfig } from "cdocs-data/loadCustomizationConfig";

/**
 * The fixture's English config, loaded the way the build loads the real one.
 * The path skips the `URL` global, which happy-dom replaces with its own.
 */
export const customizationConfig = loadCustomizationConfig({
  configDir: join(
    dirname(fileURLToPath(import.meta.url)),
    "customization_config",
  ),
  langs: ["en"],
}).customizationConfigByLang.en;
