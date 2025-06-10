import { CustomizationConfig } from 'cdocs-data';
import Code from '../shared/Code';
import { buildConfigYaml } from '../../dataUtils';

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

function YamlConfigInstructions({ newConfig }: { newConfig: CustomizationConfig }) {
  const configStatus = getNewConfigStatus(newConfig);
  const newConfigYaml = buildConfigYaml(newConfig);

  if (!configStatus.hasNewConfig) {
    return null;
  }

  return (
    <>
      <h2>Add the required YAML configuration to the docs site</h2>

      {/* Trait config, if any new traits */}
      {configStatus.hasNewTraits && (
        <>
          <h3>Add new traits</h3>
          <p>
            Create a new <code>.yaml</code> file in the{' '}
            <span style={{ backgroundColor: 'yellow' }}>traits config directory</span>, or add to an existing traits
            list in that directory.
          </p>
          <Code language="yaml">{newConfigYaml.traits}</Code>
        </>
      )}

      {/* Options config, if any new options */}
      {configStatus.hasNewOptions && (
        <>
          <h3>Add new options</h3>
          <p>
            Create a new <code>.yaml</code> file in the{' '}
            <span style={{ backgroundColor: 'yellow' }}>options config directory</span>, or add to an existing options
            list in that directory.
          </p>
          <Code language="yaml">{newConfigYaml.options}</Code>
        </>
      )}

      {/* Option groups config, if any new option groups */}
      {configStatus.hasNewOptionGroups && (
        <>
          <h3>Add new option groups</h3>
          <p>
            Create a new <code>.yaml</code> file in the{' '}
            <span style={{ backgroundColor: 'yellow' }}>option groups config directory</span>, or add to an existing
            option groups collection in that directory.
          </p>
          <Code language="yaml">{newConfigYaml.optionGroups}</Code>
        </>
      )}
    </>
  );
}

export default YamlConfigInstructions;
