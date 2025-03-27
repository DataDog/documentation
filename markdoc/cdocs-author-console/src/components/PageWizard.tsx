import FilterList from './FilterList';
import MarkdocTemplate from './MarkdocTemplate';
import { CustomizationConfig } from 'cdocs-data';

function PageWizard({ customizationConfig }: { customizationConfig: CustomizationConfig }) {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, padding: '1rem', borderRight: '1px solid #e0e0e0' }}>
        <h1>Filters</h1>
        <FilterList customizationConfig={customizationConfig} />
      </div>
      <div style={{ flex: 1, padding: '1rem' }}>
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
        <MarkdocTemplate />
      </div>
    </div>
  );
}

export default PageWizard;
