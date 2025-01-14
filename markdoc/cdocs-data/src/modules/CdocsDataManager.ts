import { YamlConfigParser } from './YamlConfigParser';
import {
  CustomizationConfigByLang,
  CustomizationConfig,
} from '../schemas/customizationConfig';
import { FiltersManifestBuilder } from './FiltersManifestBuilder';
import { FrontMatter } from '../schemas/frontMatter';
import { ClientSideFiltersManifest, FiltersManifest } from '../schemas/pageFilters';

// TODO: Support more than one file in every glossary folder.

/*
loadCustomizationConfig
buildFiltersManifest
buildClientManifest
resolveFilters
*/

export class CdocsDataManager {
  static loadCustomizationConfig(p: {
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
        traitGlossary: filterGlossariesByLang[lang],
        optionGlossary: optionGlossariesByLang[lang],
        optionGroupGlossary: optionGroupGlossariesByLang[lang],
      };
    });

    return {
      customizationConfigByLang,
    };
  }

  static buildFiltersManifest(p: {
    frontmatter: FrontMatter;
    customizationConfig: CustomizationConfig;
  }): FiltersManifest {
    return FiltersManifestBuilder.build(p);
  }

  static buildClientManifest(manifest: FiltersManifest): ClientSideFiltersManifest {
    return FiltersManifestBuilder.buildClientManifest(manifest);
  }
}
