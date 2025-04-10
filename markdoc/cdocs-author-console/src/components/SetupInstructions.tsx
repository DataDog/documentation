import CdocMarkupTemplate from './CdocMarkupTemplate';
import { WizardFilter } from '../types';
import { CustomizationConfig } from 'cdocs-data';
import Code from './Code';
import Alert from '@mui/material/Alert';

function mergeCustomizationConfigs(config1: CustomizationConfig, config2: CustomizationConfig) {
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

function getNewConfigStatus(newConfig: CustomizationConfig) {
  const hasNewTraits = Object.keys(newConfig.traitsById).length > 0;
  const hasNewOptions = Object.keys(newConfig.optionsById).length > 0;
  const hasNewOptionGroups = Object.keys(newConfig.optionGroupsById).length > 0;
  return {
    hasNewTraits,
    hasNewOptions,
    hasNewOptionGroups,
    hasNewConfig: hasNewTraits || hasNewOptions || hasNewOptionGroups
  };
}

function buildNewConfigYaml(newConfig: CustomizationConfig) {
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
  .map(
    (option) => `  - id: ${option.id}
    ${option.default ? 'default: true' : ''}`
  )
  .join('\n')}`;
      })
      .join('\n');
  }

  return result;
}

function SetupInstructions({
  filters,
  newConfig,
  customizationConfig
}: {
  filters: WizardFilter[];
  newConfig: CustomizationConfig;
  customizationConfig: CustomizationConfig;
}) {
  console.log('[SetupInstructions] received newConfig:', JSON.stringify(newConfig, null, 2));
  const configStatus = getNewConfigStatus(newConfig);
  const newConfigYaml = buildNewConfigYaml(newConfig);

  return (
    <div>
      <h1>Setup instructions</h1>
      <Alert severity="info">You can copy any markup by clicking it.</Alert>
      {configStatus.hasNewConfig && (
        <>
          <h2>Add the required YAML configuration to the docs site</h2>
          {configStatus.hasNewTraits && (
            <>
              <h3>Add new traits</h3>
              <p>
                Create a new <code>.yaml</code> file in the{' '}
                <span style={{ color: 'yellow' }}>traits config directory</span>, or add to an existing traits list in
                that directory.
              </p>
              <Code contents={newConfigYaml.traits} language="yaml" />
            </>
          )}
          {configStatus.hasNewOptions && (
            <>
              <h3>Add new options</h3>
              <p>
                Create a new <code>.yaml</code> file in the{' '}
                <span style={{ color: 'yellow' }}>options config directory</span>, or add to an existing options list in
                that directory.
              </p>
              <Code contents={newConfigYaml.options} language="yaml" />
            </>
          )}
          {configStatus.hasNewOptionGroups && (
            <>
              <h3>Add new option groups</h3>
              <p>
                Create a new <code>.yaml</code> file in the{' '}
                <span style={{ color: 'yellow' }}>option groups config directory</span>, or add to an existing option
                groups collection in that directory.
              </p>
              <Code contents={newConfigYaml.optionGroups} language="yaml" />
            </>
          )}
        </>
      )}

      <h2>Create the page</h2>
      <p>
        <ol>
          <li>
            Create a <code>{'<YOUR_FILENAME>'}.mdoc.md</code> file somewhere in the <code>content/en</code> folder.
          </li>
          <li>Add the markup below to it.</li>
        </ol>
      </p>
      <CdocMarkupTemplate
        filters={filters}
        customizationConfig={mergeCustomizationConfigs(customizationConfig, newConfig)}
      />
    </div>
  );
}

export default SetupInstructions;
