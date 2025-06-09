import CdocMarkupTemplate from './CdocMarkupTemplate';
import { WizardFilter } from '../types';
import { CustomizationConfig } from 'cdocs-data';
import Code from './Code';
import Alert from '@mui/material/Alert';
import { mergeCustomizationConfigs, buildConfigYaml } from '../dataUtils';

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

  return (
    <div>
      <h1>Setup instructions</h1>
      <Alert severity="info">You can copy any markup by clicking it.</Alert>

      {/* YAML configuration instructions */}
      <ConfigSetupInstructions newConfig={newConfig} />

      {/* Document setup instructions */}
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

function ConfigSetupInstructions({ newConfig }: { newConfig: CustomizationConfig }) {
  const configStatus = getNewConfigStatus(newConfig);
  const newConfigYaml = buildConfigYaml(newConfig);

  if (!configStatus.hasNewConfig) {
    return null;
  }

  return (
    <>
      <h2>Add the required YAML configuration to the docs site</h2>
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

export default SetupInstructions;
