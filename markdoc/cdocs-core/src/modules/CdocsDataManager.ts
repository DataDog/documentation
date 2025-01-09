import { YamlConfigParser } from './YamlConfigParser';
import { FilterOptionsConfig } from '../schemas/filterOptions';
import { Glossary } from '../schemas/glossary';
import { FilterGlossary } from '../schemas/glossaries/filterGlossary';
import { OptionGlossary } from '../schemas/glossaries/optionGlossary';
import { OptionGroupGlossary } from '../schemas/glossaries/optionGroupGlossary';

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
    glossariesByLang: Record<string, Glossary>;
    filterOptionsConfigByLang: Record<string, FilterOptionsConfig>;
    filterGlossariesByLang: Record<string, FilterGlossary>;
    optionGlossariesByLang: Record<string, OptionGlossary>;
    // optionGroupGlossariesByLang: Record<string, OptionGroupGlossary>;
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

    // Load the legacy glossaries for all languages
    const glossariesByLang = YamlConfigParser.loadGlossariesByLang({
      filtersConfigDir: p.configDir,
      langs: p.langs,
    });

    // Load the option sets for the default language
    const filterOptionsConfigByLang: Record<string, FilterOptionsConfig> = {
      en: YamlConfigParser.loadFiltersConfigFromLangDir({
        dir: p.configDir + `/${defaultLang}`,
        glossary: glossariesByLang[defaultLang],
      }),
    };

    // Load translated filter configurations,
    // backfilling with the default language
    p.langs.forEach((lang) => {
      if (lang === 'en') {
        return;
      }

      let translatedFilterOptionsConfig: FilterOptionsConfig;
      try {
        translatedFilterOptionsConfig = YamlConfigParser.loadFiltersConfigFromLangDir({
          dir: p.configDir + '/' + lang,
          glossary: glossariesByLang[lang],
        });
      } catch (e) {
        // If no filters config directory exists for this language,
        // assume no translated filters exist
        if (e instanceof Object && 'code' in e && e.code === 'ENOENT') {
          translatedFilterOptionsConfig = {};
        } else {
          throw e;
        }
      }

      filterOptionsConfigByLang[lang] = {
        ...filterOptionsConfigByLang[defaultLang],
        ...translatedFilterOptionsConfig,
      };
    });

    return {
      glossariesByLang,
      filterOptionsConfigByLang,
      filterGlossariesByLang,
      optionGlossariesByLang,
    };
  }
}
