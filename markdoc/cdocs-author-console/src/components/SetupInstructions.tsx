import CdocMarkupTemplate from './CdocMarkupTemplate';
import { WizardFilter } from '../types';
import { CustomizationConfig } from 'cdocs-data';

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
      <h1>New config debug:</h1>
      <p>{JSON.stringify(newConfig, null, 2)}</p>
      <h1>Setup instructions</h1>
      <p>You can copy any markup by clicking it.</p>
      {false && (
        <div>
          <h2>Add the new sitewide config</h2>
          <p>This won't actually show unless there's new sitewide config to be added.</p>
          <h3>Add the trait</h3>
          <p>This won't actually show unless there's a new trait to add.</p>
          <h3>Add the options</h3>
          <p>This won't actually show unless there are new options to add.</p>
          <h3>Add the new option groups</h3>
          <p>This won't actually show unless there are new option groups to add.</p>
        </div>
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
