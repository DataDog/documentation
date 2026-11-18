import { fileURLToPath } from "node:url";
import { loadCustomizationConfig } from "cdocs-data/loadCustomizationConfig";

/** The fixture's English config, loaded the way the build loads the real one. */
export const customizationConfig = loadCustomizationConfig({
  configDir: fileURLToPath(new URL("./customization_config", import.meta.url)),
  langs: ["en"],
}).customizationConfigByLang.en;
