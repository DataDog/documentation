import CdocMarkupTemplate from './CdocMarkupTemplate';
import { WizardFilter } from '../../types';
import { CustomizationConfig } from 'cdocs-data';
import Alert from '@mui/material/Alert';
import { mergeCustomizationConfigs } from '../../dataUtils';
import YamlConfigInstructions from './YamlConfigInstructions';

function SetupInstructions({
  filters,
  newConfig,
  customizationConfig
}: {
  filters: WizardFilter[];
  newConfig: CustomizationConfig;
  customizationConfig: CustomizationConfig;
}) {
  return (
    <div>
      <h1>Setup instructions</h1>
      <Alert severity="info">You can copy any markup by clicking it.</Alert>

      {/* YAML configuration instructions */}
      <YamlConfigInstructions newConfig={newConfig} />

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

export default SetupInstructions;
