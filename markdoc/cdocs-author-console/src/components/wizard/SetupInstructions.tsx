import MarkdocTemplate from './MarkdocTemplate';
import { WizardFilter } from './types';
import { CustomizationConfig } from 'cdocs-data';

function SetupInstructions({
  filters,
  customizationConfig
}: {
  filters: WizardFilter[];
  customizationConfig: CustomizationConfig;
}) {
  return (
    <div>
      <h1 style={{ marginTop: '0px' }}>Setup instructions</h1>
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
      <MarkdocTemplate filters={filters} customizationConfig={customizationConfig} />
    </div>
  );
}

export default SetupInstructions;
