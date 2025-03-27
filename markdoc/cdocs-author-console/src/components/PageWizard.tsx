import FilterList from './FilterList';
import MarkdocTemplate from './MarkdocTemplate';
import { CustomizationConfig } from 'cdocs-data';

function PageWizard({ customizationConfig }: { customizationConfig: CustomizationConfig }) {
  return (
    <div style={{ display: 'flex', height: '100vh', gap: '1rem' }}>
      <div style={{ flex: 1, borderRight: '1px solid #e0e0e0' }}>
        <h1>Filters</h1>
        <FilterList />
      </div>
      <div style={{ flex: 1 }}>
        <h1>Setup instructions</h1>
        <h2>Add the new sitewide config</h2>
        <p>This won't actually show unless there's new sitewide config to be added.</p>
        <h3>Add the trait</h3>
        <p>This won't actually show unless there's a new trait to add.</p>
        <h3>Add the options</h3>
        <p>This won't actually show unless there are new options to add.</p>
        <h3>Add the new option groups</h3>
        <p>This won't actually show unless there are new option groups to add.</p>
        <h2>Create the page</h2>
        <p>
          Create a <code>{'<YOUR_FILENAME>'}.mdoc.md</code> file somewhere in the <code>content/en</code> folder. Add
          the markup below to it:
        </p>
        <MarkdocTemplate />
      </div>
    </div>
  );
}

export default PageWizard;
