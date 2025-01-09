import {
  FilterOptionsConfig,
  FilterOptionsConfigSchema,
  RawFilterOptionsConfig,
  RawFilterOptionsConfigSchema,
} from '../schemas/filterOptions';
import { FileSearcher } from './FileSearcher';
import { Glossary, GlossaryConfigSchema, GlossaryEntryConfig } from '../schemas/glossary';
import fs from 'fs';
import yaml from 'js-yaml';

/**
 * A module responsible for all data ingestion from
 * the YAML files that define the available filters
 * and their options.
 */
export class YamlConfigParser {
  /**
   * For a given language directory, load the filter options
   * associated with that language, and validate the object as a whole.
   */
  static loadFiltersConfigFromLangDir(p: {
    dir: string;
    glossary: Glossary;
  }): Readonly<FilterOptionsConfig> {
    const optionSetsDir = `${p.dir}/filter_option_sets`;
    const filterOptionsConfig = this.loadFilterOptionsFromDir(optionSetsDir);

    Object.values(filterOptionsConfig).forEach((optionsList) => {
      const displayNamesByAllowedOptionId: Record<string, string> = Object.values(
        p.glossary.optionsById,
      ).reduce((acc, entry) => ({ ...acc, [entry.id]: entry.display_name }), {});

      optionsList.forEach((option) => {
        const defaultDisplayName = displayNamesByAllowedOptionId[option.id];
        if (!defaultDisplayName) {
          throw new Error(
            `The option ID '${option.id}' does not exist in the options glossary.`,
          );
        }
        if (!option.display_name) {
          option.display_name = defaultDisplayName;
        }
      });
    });

    return FilterOptionsConfigSchema.parse(filterOptionsConfig);
  }

  /**
   * Load all of the glossaries for all languages,
   * keyed by language code.
   */
  static loadGlossariesByLang(p: {
    filtersConfigDir: string;
    langs: string[];
    defaultLang?: string;
  }): Record<string, Glossary> {
    const defaultLang = p.defaultLang || 'en';
    const glossariesByLang: Record<string, Glossary> = {};

    const defaultGlossary = this.loadGlossaryFromLangDir(
      `${p.filtersConfigDir}/${defaultLang}`,
    );

    p.langs.forEach((lang) => {
      if (lang === defaultLang) {
        glossariesByLang[lang] = defaultGlossary;
        return;
      }
      const langDir = `${p.filtersConfigDir}/${lang}`;
      const translatedGlossary = this.loadGlossaryFromLangDir(langDir);

      // merge the translated glossary with the default glossary
      const mergedGlossary: Glossary = {
        filtersById: {
          ...defaultGlossary.filtersById,
          ...translatedGlossary.filtersById,
        },
        optionsById: {
          ...defaultGlossary.optionsById,
          ...translatedGlossary.optionsById,
        },
      };

      glossariesByLang[lang] = mergedGlossary;
    });

    return glossariesByLang;
  }

  /**
   * For a given language, load the filter and options glossaries.
   */
  static loadGlossaryFromLangDir(dir: string): Glossary {
    const result: Glossary = { filtersById: {}, optionsById: {} };

    // Load and validate the filters glossary
    const filtersGlossaryFilePath = `${dir}/glossary/filter_ids.yaml`;
    try {
      const filtersGlossaryConfigStr = fs.readFileSync(filtersGlossaryFilePath, 'utf8');
      const filtersGlossary = GlossaryConfigSchema.parse(
        yaml.load(filtersGlossaryConfigStr),
      );
      result.filtersById = filtersGlossary.allowed.reduce<
        Record<string, GlossaryEntryConfig>
      >((acc, entry) => {
        acc[entry.id] = entry;
        return acc;
      }, {});
    } catch (e) {
      // If the file is not found, use an empty list
      if (e instanceof Object && 'code' in e && e.code === 'ENOENT') {
        result.filtersById = {};
      } else {
        throw e;
      }
    }

    // Load and validate the options glossary
    const optionsGlossaryFilePath = `${dir}/glossary/filter_options.yaml`;
    try {
      const optionsGlossaryStr = fs.readFileSync(optionsGlossaryFilePath, 'utf8');
      const optionsGlossary = GlossaryConfigSchema.parse(yaml.load(optionsGlossaryStr));
      result.optionsById = optionsGlossary.allowed.reduce<
        Record<string, GlossaryEntryConfig>
      >((acc, entry) => {
        acc[entry.id] = entry;
        return acc;
      }, {});
    } catch (e) {
      // If the file is not found, use an empty list
      if (e instanceof Object && 'code' in e && e.code === 'ENOENT') {
        result.optionsById = {};
      } else {
        throw e;
      }
    }

    return result;
  }

  /**
   * Load all of the filter options files in a directory
   * into a single object, and validate the object as a whole.
   * For example, duplicate options set IDs are not allowed.
   *
   * @param dir The directory containing the filter options YAML files.
   * @returns A read-only FilterOptionsConfig object.
   */
  private static loadFilterOptionsFromDir(dir: string): RawFilterOptionsConfig {
    const filenames = FileSearcher.findInDir(dir, /\.ya?ml$/);
    const rawFilterOptions: RawFilterOptionsConfig = {};

    filenames.forEach((filename) => {
      const filterOptionsConfig = RawFilterOptionsConfigSchema.parse(
        this.loadFiltersYamlFromStr(filename),
      );
      for (const [optionsListId, optionsList] of Object.entries(filterOptionsConfig)) {
        // Verify that no duplicate options set IDs exist
        if (rawFilterOptions[optionsListId]) {
          throw new Error(
            `Duplicate options list ID '${optionsListId}' found in file ${filename}`,
          );
        }
        rawFilterOptions[optionsListId] = optionsList;
      }
    });

    return rawFilterOptions;
  }

  /**
   * Load a filter options configuration from a YAML file.
   */
  static loadFiltersYamlFromStr(yamlFile: string): RawFilterOptionsConfig {
    const yamlFileContent = fs.readFileSync(yamlFile, 'utf8');
    const parsedYaml = yaml.load(yamlFileContent);
    return RawFilterOptionsConfigSchema.parse(parsedYaml);
  }
}
