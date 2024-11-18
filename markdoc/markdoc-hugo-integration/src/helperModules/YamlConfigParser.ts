import {
  FilterOptionsConfig,
  FilterOptionsConfigSchema,
  RawFilterOptionsConfig,
  RawFilterOptionsConfigSchema
} from '../schemas/yaml/filterOptions';
import { FileNavigator } from './FileNavigator';
import {
  Allowlist,
  AllowlistConfigSchema,
  AllowlistConfigEntry
} from '../schemas/yaml/allowlist';
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
    allowlist: Allowlist;
  }): Readonly<FilterOptionsConfig> {
    const optionSetsDir = `${p.dir}/filter_option_sets`;
    const filterOptionsConfig = this.loadFilterOptionsFromDir(optionSetsDir);

    Object.values(filterOptionsConfig).forEach((optionsList) => {
      const displayNamesByAllowedOptionId: Record<string, string> = Object.values(
        p.allowlist.optionsById
      ).reduce((acc, entry) => ({ ...acc, [entry.id]: entry.display_name }), {});

      optionsList.forEach((option) => {
        const defaultDisplayName = displayNamesByAllowedOptionId[option.id];
        if (!defaultDisplayName) {
          throw new Error(
            `The option ID '${option.id}' does not exist in the options allowlist.`
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
   * Load all of the allowlists for all languages,
   * keyed by language code.
   */
  static loadAllowlistsByLang(p: {
    filtersConfigDir: string;
    langs: string[];
    defaultLang?: string;
  }): Record<string, Allowlist> {
    const defaultLang = p.defaultLang || 'en';
    const allowlistsByLang: Record<string, Allowlist> = {};

    const defaultAllowlist = this.loadAllowlistFromLangDir(
      `${p.filtersConfigDir}/${defaultLang}`
    );

    p.langs.forEach((lang) => {
      if (lang === defaultLang) {
        allowlistsByLang[lang] = defaultAllowlist;
        return;
      }
      const langDir = `${p.filtersConfigDir}/${lang}`;
      const translatedAllowlist = this.loadAllowlistFromLangDir(langDir);

      // merge the translated allowlist with the default allowlist
      const mergedAllowlist: Allowlist = {
        filtersById: {
          ...defaultAllowlist.filtersById,
          ...translatedAllowlist.filtersById
        },
        optionsById: {
          ...defaultAllowlist.optionsById,
          ...translatedAllowlist.optionsById
        }
      };

      allowlistsByLang[lang] = mergedAllowlist;
    });

    return allowlistsByLang;
  }

  /**
   * For a given language, load the filter and options allowlists.
   */
  static loadAllowlistFromLangDir(dir: string): Allowlist {
    const result: Allowlist = { filtersById: {}, optionsById: {} };

    // Load and validate the filters allowlist
    const filtersAllowlistFilePath = `${dir}/allowlists/filter_ids.yaml`;
    try {
      const filtersAllowlistConfigStr = fs.readFileSync(filtersAllowlistFilePath, 'utf8');
      const filtersAllowlist = AllowlistConfigSchema.parse(
        yaml.load(filtersAllowlistConfigStr)
      );
      result.filtersById = filtersAllowlist.allowed.reduce<
        Record<string, AllowlistConfigEntry>
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

    // Load and validate the options allowlist
    const optionsAllowlistFilePath = `${dir}/allowlists/filter_options.yaml`;
    try {
      const optionsAllowlistStr = fs.readFileSync(optionsAllowlistFilePath, 'utf8');
      const optionsAllowlist = AllowlistConfigSchema.parse(
        yaml.load(optionsAllowlistStr)
      );
      result.optionsById = optionsAllowlist.allowed.reduce<
        Record<string, AllowlistConfigEntry>
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
    const filenames = FileNavigator.findInDir(dir, /\.ya?ml$/);
    const rawFilterOptions: RawFilterOptionsConfig = {};

    filenames.forEach((filename) => {
      const filterOptionsConfig = RawFilterOptionsConfigSchema.parse(
        this.loadFiltersYamlFromStr(filename)
      );
      for (const [optionsListId, optionsList] of Object.entries(filterOptionsConfig)) {
        // Verify that no duplicate options set IDs exist
        if (rawFilterOptions[optionsListId]) {
          throw new Error(
            `Duplicate options list ID '${optionsListId}' found in file ${filename}`
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
