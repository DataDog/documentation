import fs from 'fs';
import yaml from 'js-yaml';
import {
  TraitGlossary,
  TraitGlossaryEntry,
  TraitGlossarySchema,
  RawTraitGlossarySchema,
} from '../schemas/glossaries/traitGlossary';
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
import path from 'path';

/**
 * A module responsible for all data ingestion from
 * the YAML files that define the available traits
 * and their options.
 */
export class YamlConfigParser {
  static findInDir(dir: string, filter: RegExp) {
    let fileList: string[] = [];
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const fileStat = fs.lstatSync(filePath);

      if (fileStat.isDirectory()) {
        fileList = [...fileList, ...this.findInDir(filePath, filter)];
      } else if (filter.test(filePath)) {
        fileList.push(filePath);
      }
    });

    return fileList;
  }

  /**
   * Load and validate the trait glossary from the content filters
   * configuration for a given language (such as 'ja').
   */
  static loadTraitGlossary(p: { langDir: string }): TraitGlossary {
    // If the lang dir does not exist, return an empty object,
    // which can later be backfilled by the default language
    if (!fs.existsSync(p.langDir)) {
      return {};
    }

    let result: TraitGlossary;

    const glossaryPath = `${p.langDir}/traits/traits.yaml`;

    try {
      const glossaryYamlStr = fs.readFileSync(glossaryPath, 'utf8');
      const rawGlossary = RawTraitGlossarySchema.parse(yaml.load(glossaryYamlStr));
      result = rawGlossary.traits.reduce<Record<string, TraitGlossaryEntry>>(
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

    TraitGlossarySchema.parse(result);
    return result;
  }

  static loadOptionGlossary(p: { langDir: string }) {
    // If the lang dir does not exist, return an empty object,
    // which can later be backfilled by the default language
    if (!fs.existsSync(p.langDir)) {
      return {};
    }

    let result: OptionGlossary;

    const glossaryFilePath = `${p.langDir}/options/options.yaml`;

    try {
      const glossaryStr = fs.readFileSync(glossaryFilePath, 'utf8');
      const rawGlossary = RawOptionGlossarySchema.parse(yaml.load(glossaryStr));
      result = rawGlossary.options.reduce<Record<string, OptionGlossaryEntry>>(
        (acc, entry) => {
          // Disallow duplicate entries
          if (acc[entry.id]) {
            throw new Error(
              `Duplicate option ID '${entry.id}' found in file ${glossaryFilePath}`,
            );
          }
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

  static loadTraitGlossaries(p: {
    configDir: string;
    langs: string[];
    defaultLang?: string;
  }): Record<string, TraitGlossary> {
    const defaultLang = p.defaultLang || 'en';
    const glossariesByLang: Record<string, TraitGlossary> = {};

    const defaultGlossary = this.loadTraitGlossary({
      langDir: `${p.configDir}/${defaultLang}`,
    });

    p.langs.forEach((lang) => {
      if (lang === defaultLang) {
        glossariesByLang[lang] = defaultGlossary;
        return;
      }
      const langDir = `${p.configDir}/${lang}`;
      const translatedGlossary = this.loadTraitGlossary({ langDir });

      // merge the translated glossary with the default glossary
      const mergedGlossary: TraitGlossary = {
        ...defaultGlossary,
        ...translatedGlossary,
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

    const optionGroupGlossaryDir = `${p.langDir}/option_groups`;
    const filePaths = this.findInDir(optionGroupGlossaryDir, /\.ya?ml$/);
    const mergedGlossary: OptionGroupGlossary = {};

    // Merge all files into the result glossary
    filePaths.forEach((filePath) => {
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
            label: option.label || p.optionGlossary[option.id].label,
          };
        });
      }
    });

    OptionGroupGlossarySchema.parse(mergedGlossary);
    return mergedGlossary;
  }
}
