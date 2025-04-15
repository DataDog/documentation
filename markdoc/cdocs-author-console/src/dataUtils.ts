import { CustomizationConfig, Frontmatter, CustomizationConfigSchema } from 'cdocs-data';
import { WizardFilter } from './types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Calculate the diff between the existing configuration config
 * and the configuration config required by the user-inputted filters.
 */
export function getNetNewConfig(p: {
  filters: WizardFilter[];
  customizationConfig: CustomizationConfig;
}): CustomizationConfig {
  const mergedFilterConfig: CustomizationConfig = {
    traitsById: {},
    optionsById: {},
    optionGroupsById: {}
  };

  const configKeys = ['traitsById', 'optionsById', 'optionGroupsById'] as const;

  p.filters.forEach((filter) => {
    configKeys.forEach((key) => {
      // @ts-ignore
      mergedFilterConfig[key] = {
        ...mergedFilterConfig[key],
        ...filter.customizationConfig[key]
      };
    });
  });

  const knownTraitIds = Object.keys(p.customizationConfig.traitsById);
  const knownOptionGroupIds = Object.keys(p.customizationConfig.optionGroupsById);
  const knownOptionIds = Object.keys(p.customizationConfig.optionsById);

  const newConfig: CustomizationConfig = {
    traitsById: {},
    optionsById: {},
    optionGroupsById: {}
  };

  Object.keys(mergedFilterConfig.traitsById).forEach((traitId) => {
    if (!knownTraitIds.includes(traitId)) {
      const trait = mergedFilterConfig.traitsById[traitId];
      newConfig.traitsById[traitId] = trait;
    }
  });

  Object.keys(mergedFilterConfig.optionGroupsById).forEach((optionGroupId) => {
    if (!knownOptionGroupIds.includes(optionGroupId)) {
      const optionGroup = mergedFilterConfig.optionGroupsById[optionGroupId];
      newConfig.optionGroupsById[optionGroupId] = optionGroup;
    }
  });

  Object.keys(mergedFilterConfig.optionsById).forEach((optionId) => {
    if (!knownOptionIds.includes(optionId)) {
      const option = mergedFilterConfig.optionsById[optionId];
      if (!knownOptionIds.includes(optionId)) {
        newConfig.optionsById[optionId] = option;
      }
    }
  });

  return CustomizationConfigSchema.parse(newConfig);
}

export function buildFrontmatterData({ filters }: { filters: WizardFilter[] }) {
  let frontmatter: Frontmatter = {
    title: 'Your Title Here',
    content_filters: filters.map((filter) => ({
      trait_id: filter.trait_id,
      option_group_id: filter.option_group_id
    }))
  };

  return frontmatter;
}

export function mergeCustomizationConfigs(config1: CustomizationConfig, config2: CustomizationConfig) {
  const mergeObjects = (obj1: Record<string, any>, obj2: Record<string, any>, key: string) => {
    const overlap = Object.keys(obj1).some((id) => id in obj2);
    if (overlap) {
      throw new Error(`Conflict detected in ${key}: overlapping keys found.`);
    }
    return { ...obj1, ...obj2 };
  };

  return {
    traitsById: mergeObjects(config1.traitsById, config2.traitsById, 'traitsById'),
    optionsById: mergeObjects(config1.optionsById, config2.optionsById, 'optionsById'),
    optionGroupsById: mergeObjects(config1.optionGroupsById, config2.optionGroupsById, 'optionGroupsById')
  };
}

export function buildWizardFilter({
  traitId,
  optionGroupId,
  customizationConfig
}: {
  traitId: string;
  optionGroupId: string;
  customizationConfig: CustomizationConfig;
}): WizardFilter {
  const optionGroup = [...customizationConfig.optionGroupsById[optionGroupId]];
  const optionIds = optionGroup.map((option) => option.id);
  const optionsById = optionIds.reduce(
    (acc, optionId) => {
      acc[optionId] = { ...customizationConfig.optionsById[optionId] };
      return acc;
    },
    {} as Record<
      string,
      {
        id: string;
        label: string;
      }
    >
  );

  return {
    trait_id: traitId,
    option_group_id: optionGroupId,
    uuid: uuidv4(),
    customizationConfig: {
      traitsById: {
        [traitId]: { ...customizationConfig.traitsById[traitId] }
      },
      optionGroupsById: {
        [optionGroupId]: optionGroup
      },
      optionsById
    }
  };
}

export function buildConfigYaml(newConfig: CustomizationConfig) {
  const result = {
    traits: '',
    options: '',
    optionGroups: ''
  };

  /**
   * traits:
   *   - id: db
   *     label: Database
   */
  if (newConfig.traitsById) {
    result.traits += 'traits:\n';
    result.traits += Object.keys(newConfig.traitsById)
      .map(
        (traitId) => `  - id: ${traitId}
    label: ${newConfig.traitsById[traitId].label}`
      )
      .join('\n');
  }

  /**
   * options:
   *   - id: python
   *     label: Python
   *   - id: go
   *     label: Go
   */
  if (newConfig.optionsById) {
    result.options += 'options:\n';
    result.options += Object.keys(newConfig.optionsById)
      .map(
        (optionId) => `  - id: ${optionId}
    label: ${newConfig.optionsById[optionId].label}`
      )
      .join('\n');
  }

  /**
   * product_one_db_options:
   *   - id: postgres
   *     default: true
   *   - id: mysql
   *
   * product_two_db_options:
   *   - id: mongo
   *     default: true
   *   - id: mysql
   *   - id: postgres
   *   - id: sqlite3
   */
  if (newConfig.optionGroupsById) {
    result.optionGroups = Object.keys(newConfig.optionGroupsById)
      .map((optionGroupId) => {
        const options = newConfig.optionGroupsById[optionGroupId];
        return `${optionGroupId}:
${options
  .map((option) => {
    const yaml = `  - id: ${option.id}`;
    if (option.default) {
      return `${yaml}
    default: true`;
    }
    return yaml;
  })
  .join('\n')}`;
      })
      .join('\n');
  }

  return result;
}
