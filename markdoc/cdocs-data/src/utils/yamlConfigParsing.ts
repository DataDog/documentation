import fs from 'fs';
import yaml from 'js-yaml';
import {
  TraitGlossary,
  TraitGlossarySchema,
  RawTraitGlossarySchema,
} from '../schemas/glossaries/traitGlossary';
import {
  OptionGlossary,
  OptionGlossarySchema,
  RawOptionGlossarySchema,
} from '../schemas/glossaries/optionGlossary';
import {
  OptionGroupGlossary,
  OptionGroupGlossarySchema,
  RawOptionGroupGlossarySchema,
} from '../schemas/glossaries/optionGroupGlossary';
import path from 'path';

/**
 * Load the option glossaries for each language in the list.
 *
 * @param p.configDir The directory containing the customization
 * configuration, such as 'path/to/dir/customization_config'.
 *
 * @param p.langs The list of languages to load glossaries for.
 *
 * @param p.defaultLang The default language to use when a glossary
 * is not found for a given language. Defaults to 'en'.
 *
 * @returns A record of option glossaries, keyed by language.
 */
export function loadOptionGlossaries(p: {
  configDir: string;
  langs: string[];
  defaultLang?: string;
}): Record<string, OptionGlossary> {
  const defaultLang = p.defaultLang || 'en';
  const glossariesByLang: Record<string, OptionGlossary> = {};

  const defaultGlossary = loadOptionGlossary({
    langDir: `${p.configDir}/${defaultLang}`,
  });

  p.langs.forEach((lang) => {
    if (lang === defaultLang) {
      glossariesByLang[lang] = defaultGlossary;
      return;
    }
    const langDir = `${p.configDir}/${lang}`;
    const translatedGlossary = loadOptionGlossary({ langDir });

    // merge the translated glossary with the default glossary
    const mergedGlossary: OptionGlossary = {
      ...defaultGlossary,
      ...translatedGlossary,
    };

    glossariesByLang[lang] = mergedGlossary;
  });

  return glossariesByLang;
}

/**
 * Load the trait glossaries for each language in the list.
 *
 * @param p.configDir The directory containing the customization
 * configuration, such as 'path/to/dir/customization_config'.
 *
 * @param p.langs The list of languages to load glossaries for.
 *
 * @param p.defaultLang The default language to use when a glossary
 * is not found for a given language. Defaults to 'en'.
 *
 * @returns A record of trait glossaries, keyed by language.
 */
export function loadTraitGlossaries(p: {
  configDir: string;
  langs: string[];
  defaultLang?: string;
}): Record<string, TraitGlossary> {
  const defaultLang = p.defaultLang || 'en';
  const glossariesByLang: Record<string, TraitGlossary> = {};

  const defaultGlossary = loadTraitGlossary({
    langDir: `${p.configDir}/${defaultLang}`,
  });

  p.langs.forEach((lang) => {
    if (lang === defaultLang) {
      glossariesByLang[lang] = defaultGlossary;
      return;
    }
    const langDir = `${p.configDir}/${lang}`;
    const translatedGlossary = loadTraitGlossary({ langDir });

    // merge the translated glossary with the default glossary
    const mergedGlossary: TraitGlossary = {
      ...defaultGlossary,
      ...translatedGlossary,
    };

    glossariesByLang[lang] = mergedGlossary;
  });

  return glossariesByLang;
}

/**
 * Load the option group glossaries for each language in the list.
 * This function also validates that all referenced options exist.
 *
 * @param p.configDir The directory containing the customization
 * configuration, such as 'path/to/dir/customization_config'.
 *
 * @param p.langs The list of languages to load glossaries for.
 *
 * @param p.optionGlossariesByLang A record of option glossaries,
 * keyed by language (used for validation).
 *
 * @param p.defaultLang The default language to use when a glossary
 * is not found for a given language. Defaults to 'en'.
 */
export function loadOptionGroupGlossaries(p: {
  configDir: string;
  langs: string[];
  optionGlossariesByLang: Record<string, OptionGlossary>;
  defaultLang?: string;
}): Record<string, OptionGroupGlossary> {
  const defaultLang = p.defaultLang || 'en';
  const glossariesByLang: Record<string, OptionGroupGlossary> = {};

  const defaultGlossary = loadOptionGroupGlossary({
    langDir: `${p.configDir}/${defaultLang}`,
    optionGlossary: p.optionGlossariesByLang[defaultLang],
  });

  p.langs.forEach((lang) => {
    if (lang === defaultLang) {
      glossariesByLang[lang] = defaultGlossary;
      return;
    }

    const langDir = `${p.configDir}/${lang}`;
    const translatedGlossary = loadOptionGroupGlossary({
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

// Private functions ------------------------------------------------

/**
 * Recursively search a directory for files that match a regex.
 *
 * @param dir The directoy to search.
 * @param regex The regex to match.
 * @returns A list of file paths that match the regex.
 */
function findInDir(dir: string, regex: RegExp) {
  let fileList: string[] = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const fileStat = fs.lstatSync(filePath);

    if (fileStat.isDirectory()) {
      fileList = [...fileList, ...findInDir(filePath, regex)];
    } else if (regex.test(filePath)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Load and validate the trait glossary from the customization
 * configuration for a given language (such as 'ja').
 *
 * @param p.langDir The directory containing the language-specific
 * customization config, such as 'path/to/dir/customization_config/ja'.
 */
function loadTraitGlossary(p: { langDir: string }): TraitGlossary {
  // If the lang dir does not exist, return an empty object,
  // which can later be backfilled by the default language
  if (!fs.existsSync(p.langDir)) {
    return {};
  }

  let result: TraitGlossary = {};

  const glossaryDir = `${p.langDir}/traits`;

  // Verify that the dir exists
  if (!fs.existsSync(glossaryDir)) {
    return {};
  }

  // Scan for YAML files in the glossaryDir
  const filePaths = findInDir(glossaryDir, /\.ya?ml$/);

  // Merge all files into the result glossary
  filePaths.forEach((filePath) => {
    const glossaryYamlStr = fs.readFileSync(filePath, 'utf8');
    const rawGlossary = RawTraitGlossarySchema.parse(yaml.load(glossaryYamlStr));
    rawGlossary.traits.forEach((entry) => {
      // Disallow duplicate entries
      if (result[entry.id]) {
        throw new Error(`Duplicate trait ID '${entry.id}' found in file ${filePath}`);
      }
      result[entry.id] = entry;
    });
  });

  // Validate and return the result
  TraitGlossarySchema.parse(result);
  return result;
}

/**
 * Load and validate the option glossary from the customization
 * configuration for a given language (such as 'ja').
 *
 * @param p.langDir The directory containing the language-specific
 * customization config, such as 'path/to/dir/customization_config/ja'.
 */
function loadOptionGlossary(p: { langDir: string }): OptionGlossary {
  // If the lang dir does not exist, return an empty object,
  // which can later be backfilled by the default language
  if (!fs.existsSync(p.langDir)) {
    return {};
  }

  let result: OptionGlossary = {};

  const glossaryDir = `${p.langDir}/options`;

  // Verify that the dir exists
  if (!fs.existsSync(glossaryDir)) {
    return {};
  }

  // Get all the files in the glossaryDir
  const filePaths = findInDir(glossaryDir, /\.ya?ml$/);

  // Merge all files into the result glossary
  filePaths.forEach((filePath) => {
    const glossaryStr = fs.readFileSync(filePath, 'utf8');
    const rawGlossary = RawOptionGlossarySchema.parse(yaml.load(glossaryStr));
    rawGlossary.options.forEach((entry) => {
      // Disallow duplicate entries
      if (result[entry.id]) {
        throw new Error(`Duplicate option ID '${entry.id}' found in file ${filePath}`);
      }
      result[entry.id] = entry;
    });
  });

  // Validate and return the result
  OptionGlossarySchema.parse(result);
  return result;
}

/**
 * Load and validate the option group glossary from the customization.
 *
 * @param p.langDir The directory containing the language-specific
 * customization config, such as 'path/to/dir/customization_config/ja'.
 *
 * @param p.optionGlossary The option glossary for the same language,
 * used to validate that all referenced options exist.
 */
function loadOptionGroupGlossary(p: {
  langDir: string;
  optionGlossary: OptionGlossary;
}): OptionGroupGlossary {
  // If the lang dir does not exist, return an empty object,
  // which will be backfilled by the default language
  if (!fs.existsSync(p.langDir)) {
    return {};
  }

  const optionGroupGlossaryDir = `${p.langDir}/option_groups`;

  // Verify that the dir exists
  if (!fs.existsSync(optionGroupGlossaryDir)) {
    return {};
  }

  const filePaths = findInDir(optionGroupGlossaryDir, /\.ya?ml$/);
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

  // Validate and return the result
  OptionGroupGlossarySchema.parse(mergedGlossary);
  return mergedGlossary;
}
