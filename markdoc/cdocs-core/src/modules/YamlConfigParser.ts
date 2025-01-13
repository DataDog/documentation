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
import {
  FilterGlossary,
  FilterGlossaryEntry,
  FilterGlossarySchema,
  RawFilterGlossarySchema,
} from '../schemas/glossaries/filterGlossary';
import {
  OptionGlossary,
  OptionGlossaryEntry,
  OptionGlossarySchema,
  RawOptionGlossarySchema,
} from '../schemas/glossaries/optionGlossary';
import {
  OptionGroupGlossary,
  OptionGroupGlossarySchema,
  RawOptionGroupGlossary,
  RawOptionGroupGlossarySchema,
} from '../schemas/glossaries/optionGroupGlossary';

/**
 * A module responsible for all data ingestion from
 * the YAML files that define the available filters
 * and their options.
 */
export class YamlConfigParser {
  /**
   * Load and validate the filter glossary from the content filters
   * configuration for a given language (such as 'ja').
   */
  static loadFilterGlossary(p: { langDir: string }): FilterGlossary {
    // If the lang dir does not exist, return an empty object,
    // which can later be backfilled by the default language
    if (!fs.existsSync(p.langDir)) {
      return {};
    }

    let result: FilterGlossary;

    const glossaryPath = `${p.langDir}/glossary/filter_ids.yaml`;

    try {
      const glossaryYamlStr = fs.readFileSync(glossaryPath, 'utf8');
      const rawGlossary = RawFilterGlossarySchema.parse(yaml.load(glossaryYamlStr));
      result = rawGlossary.allowed.reduce<Record<string, FilterGlossaryEntry>>(
        (acc, entry) => {
          acc[entry.id] = entry;
          return acc;
        },
        {},
      );
    } catch (e) {
      // If the file is not found, use an empty list
      if (e instanceof Object && 'code' in e && e.code === 'ENOENT') {
        result = {};
      } else {
        throw e;
      }
    }

    FilterGlossarySchema.parse(result);
    return result;
  }

  static loadOptionGlossary(p: { langDir: string }) {
    // If the lang dir does not exist, return an empty object,
    // which can later be backfilled by the default language
    if (!fs.existsSync(p.langDir)) {
      return {};
    }

    let result: OptionGlossary;

    const glossaryFilePath = `${p.langDir}/glossary/filter_options.yaml`;

    try {
      const glossaryStr = fs.readFileSync(glossaryFilePath, 'utf8');
      const rawGlossary = RawOptionGlossarySchema.parse(yaml.load(glossaryStr));
      result = rawGlossary.allowed.reduce<Record<string, OptionGlossaryEntry>>(
        (acc, entry) => {
          acc[entry.id] = entry;
          return acc;
        },
        {},
      );
    } catch (e) {
      // If the file is not found, use an empty list
      if (e instanceof Object && 'code' in e && e.code === 'ENOENT') {
        result = {};
      } else {
        throw e;
      }
    }

    OptionGlossarySchema.parse(result);
    return result;
  }

  static loadOptionGlossaries(p: {
    configDir: string;
    langs: string[];
    defaultLang?: string;
  }): Record<string, OptionGlossary> {
    const defaultLang = p.defaultLang || 'en';
    const glossariesByLang: Record<string, OptionGlossary> = {};

    const defaultGlossary = this.loadOptionGlossary({
      langDir: `${p.configDir}/${defaultLang}`,
    });

    p.langs.forEach((lang) => {
      if (lang === defaultLang) {
        glossariesByLang[lang] = defaultGlossary;
        return;
      }
      const langDir = `${p.configDir}/${lang}`;
      const translatedGlossary = this.loadOptionGlossary({ langDir });

      // merge the translated glossary with the default glossary
      const mergedGlossary: OptionGlossary = {
        ...defaultGlossary,
        ...translatedGlossary,
      };

      glossariesByLang[lang] = mergedGlossary;
    });

    return glossariesByLang;
  }

  static loadFilterGlossaries(p: {
    configDir: string;
    langs: string[];
    defaultLang?: string;
  }): Record<string, FilterGlossary> {
    const defaultLang = p.defaultLang || 'en';
    const glossariesByLang: Record<string, FilterGlossary> = {};

    const defaultGlossary = this.loadFilterGlossary({
      langDir: `${p.configDir}/${defaultLang}`,
    });

    p.langs.forEach((lang) => {
      if (lang === defaultLang) {
        glossariesByLang[lang] = defaultGlossary;
        return;
      }
      const langDir = `${p.configDir}/${lang}`;
      const translatedGlossary = this.loadFilterGlossary({ langDir });

      // merge the translated glossary with the default glossary
      const mergedGlossary: FilterGlossary = {
        ...defaultGlossary,
        ...translatedGlossary,
      };

      glossariesByLang[lang] = mergedGlossary;
    });

    return glossariesByLang;
  }

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

  static loadOptionGroupGlossaries(p: {
    configDir: string;
    langs: string[];
    optionGlossariesByLang: Record<string, OptionGlossary>;
    defaultLang?: string;
  }): Record<string, OptionGroupGlossary> {
    const defaultLang = p.defaultLang || 'en';
    const glossariesByLang: Record<string, OptionGroupGlossary> = {};

    const defaultGlossary = this.loadOptionGroupGlossary({
      langDir: `${p.configDir}/${defaultLang}`,
      optionGlossary: p.optionGlossariesByLang[defaultLang],
    });

    p.langs.forEach((lang) => {
      if (lang === defaultLang) {
        glossariesByLang[lang] = defaultGlossary;
        return;
      }

      const langDir = `${p.configDir}/${lang}`;
      const translatedGlossary = this.loadOptionGroupGlossary({
        langDir,
        optionGlossary: p.optionGlossariesByLang[lang],
      });

      // merge the translated glossary with the default glossary
      const mergedGlossary: OptionGroupGlossary = {
        ...defaultGlossary,
        ...translatedGlossary,
      };

      glossariesByLang[lang] = mergedGlossary;
    });

    return glossariesByLang;
  }

  static loadOptionGroupGlossary(p: {
    langDir: string;
    optionGlossary: OptionGlossary;
  }): OptionGroupGlossary {
    // If the lang dir does not exist, return an empty object,
    // which will be backfilled by the default language
    if (!fs.existsSync(p.langDir)) {
      return {};
    }

    const optionGroupGlossaryDir = `${p.langDir}/filter_option_sets`;
    const filePaths = FileSearcher.findInDir(optionGroupGlossaryDir, /\.ya?ml$/);
    const mergedGlossary: OptionGroupGlossary = {};

    // Merge all files into the result glossary
    filePaths.forEach((filePath) => {
      console.log('loading raw option group glossary from', filePath);
      const glossaryStr = fs.readFileSync(filePath, 'utf8');
      const rawGlossary = RawOptionGroupGlossarySchema.parse(yaml.load(glossaryStr));

      for (const [optionGroupId, optionGroup] of Object.entries(rawGlossary)) {
        // Verify that the merged glossary does not already contain this option group ID
        if (mergedGlossary[optionGroupId]) {
          throw new Error(
            `Duplicate option group ID '${optionGroupId}' found in file ${filePath}`,
          );
        }

        // Add the entry to the merged glossary
        mergedGlossary[optionGroupId] = optionGroup.map((option) => {
          // Verify that each option referenced by the group exists
          if (!p.optionGlossary[option.id]) {
            throw new Error(
              `The option ID '${option.id}' does not exist in the options glossary.`,
            );
          }

          // Add default display names where needed
          return {
            ...option,
            display_name: option.display_name || p.optionGlossary[option.id].display_name,
          };
        });
      }
    });

    OptionGroupGlossarySchema.parse(mergedGlossary);
    return mergedGlossary;
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
