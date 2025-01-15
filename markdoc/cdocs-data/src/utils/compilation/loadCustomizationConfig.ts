import { YamlConfigParser } from '../../modules/YamlConfigParser';
import { CustomizationConfigByLang } from '../../schemas/customizationConfig';

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

  // Load the filter glossaries for all languages
  const filterGlossariesByLang =
    YamlConfigParser.loadTraitGlossaries(glossaryLoadingConfig);

  // Load the option glossaries for all languages
  const optionGlossariesByLang =
    YamlConfigParser.loadOptionGlossaries(glossaryLoadingConfig);

  // Load the option group glossaries for all languages
  const optionGroupGlossariesByLang = YamlConfigParser.loadOptionGroupGlossaries({
    ...glossaryLoadingConfig,
    optionGlossariesByLang,
  });

  const customizationConfigByLang: CustomizationConfigByLang = {};

  p.langs.forEach((lang) => {
    customizationConfigByLang[lang] = {
      traitsById: filterGlossariesByLang[lang],
      optionsById: optionGlossariesByLang[lang],
      optionGroupsById: optionGroupGlossariesByLang[lang],
    };
  });

  return {
    customizationConfigByLang,
  };
}
