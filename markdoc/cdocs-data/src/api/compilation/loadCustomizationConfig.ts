import {
  loadTraitGlossaries,
  loadOptionGlossaries,
  loadOptionGroupGlossaries,
} from '../../utils/yamlConfigParsing';
import { CustomizationConfigByLang } from '../../schemas/customizationConfig';

/**
 * Loads the customization configuration for all languages into memory,
 * including all configured traits, options, and option groups.
 *
 * @param p.configDir The top-level directory where the customization configuration
 * files are located. The top-level directory should contain subdirectories for each
 * supported language.
 * @param p.langs The list of languages for which to load the customization configuration,
 * e.g. ['en', 'es', 'fr'].
 * @param p.defaultLang The default language. Defaults to 'en'.
 *
 * @returns The customization configuration for each language, keyed by language code.
 */
export function loadCustomizationConfig(p: {
  configDir: string;
  langs: string[];
  defaultLang?: string;
}): {
  customizationConfigByLang: CustomizationConfigByLang;
} {
  const defaultLang = p.defaultLang || 'en';

  if (!p.langs.includes(defaultLang)) {
    throw new Error('The default language must be included in the `langs` option.');
  }

  const glossaryLoadingConfig = {
    configDir: p.configDir,
    langs: p.langs,
  };

  const traitGlossariesByLang = loadTraitGlossaries(glossaryLoadingConfig);
  const optionGlossariesByLang = loadOptionGlossaries(glossaryLoadingConfig);

  // Load the option group glossaries for all languages
  const optionGroupGlossariesByLang = loadOptionGroupGlossaries({
    ...glossaryLoadingConfig,
    optionGlossariesByLang,
  });

  const customizationConfigByLang: CustomizationConfigByLang = {};

  p.langs.forEach((lang) => {
    customizationConfigByLang[lang] = {
      traitsById: traitGlossariesByLang[lang],
      optionsById: optionGlossariesByLang[lang],
      optionGroupsById: optionGroupGlossariesByLang[lang],
    };
  });

  return {
    customizationConfigByLang,
  };
}
