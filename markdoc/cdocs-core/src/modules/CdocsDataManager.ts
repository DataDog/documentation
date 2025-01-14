import { YamlConfigParser } from './YamlConfigParser';
import { ContentFiltersConfigByLang } from '../schemas/contentFiltersConfig';

// TODO: Support more than one file in every glossary folder.

export class CdocsDataManager {
  static loadContentFiltersConfig(p: {
    configDir: string;
    langs: string[];
    defaultLang?: string;
  }): {
    contentFiltersConfigByLang: ContentFiltersConfigByLang;
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

    const contentFiltersConfigByLang: ContentFiltersConfigByLang = {};

    p.langs.forEach((lang) => {
      contentFiltersConfigByLang[lang] = {
        traitGlossary: filterGlossariesByLang[lang],
        optionGlossary: optionGlossariesByLang[lang],
        optionGroupGlossary: optionGroupGlossariesByLang[lang],
      };
    });

    return {
      contentFiltersConfigByLang,
    };
  }
}
