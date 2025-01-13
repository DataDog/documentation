import { YamlConfigParser } from './YamlConfigParser';
import { ContentFiltersConfigByLang } from '../schemas/contentFiltersConfig';

// TODO: In the config directory, use a glossary folder for each glossary type,
// and update the load functions.
// TODO: Support more than one file in every glossary folder.
// TODO: Protect against accidental translation. No ID should appear in translated YAML
// that does not appear in the default language YAML.

// TODO: Option set -> option group.

// TODO: Start the docs with a config object that includes
// the filter glossary, the option glossary,
// and the option set glossary.

// TODO: Eventually make the data manager the only export of this package.

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
      YamlConfigParser.loadFilterGlossaries(glossaryLoadingConfig);

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
        filterGlossary: filterGlossariesByLang[lang],
        optionGlossary: optionGlossariesByLang[lang],
        optionGroupGlossary: optionGroupGlossariesByLang[lang],
      };
    });

    return {
      contentFiltersConfigByLang,
    };
  }
}
