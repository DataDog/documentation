import { useState } from 'react';
import FilterList from './FilterList';
import { CustomizationConfig } from 'cdocs-data';
import { WizardFilter } from '../types';
import SetupInstructions from './SetupInstructions';
import NewOptionGroupForm from './forms/optionGroups/NewOptionGroupForm';
import UpdatedOptionGroupForm from './forms/optionGroups/UpdatedOptionGroupForm';
import FlexibleOptionGroupSelector from './forms/optionGroups/FlexibleOptionGroupSelector';

function PageWizard({ customizationConfig }: { customizationConfig: CustomizationConfig }) {
  const [filters, setFilters] = useState<WizardFilter[]>([]);
  const [newConfig, setNewConfig] = useState<CustomizationConfig>({
    traitsById: {},
    optionsById: {},
    optionGroupsById: {}
  });

  const onFilterListChange = (p: { filters: WizardFilter[]; newConfig: CustomizationConfig }) => {
    console.log('[PageWizard] received data:', JSON.stringify(p, null, 2));
    setFilters([...p.filters]);
    setNewConfig(p.newConfig);
  };

  return (
    <div>
      <h1>Debug</h1>
      <h2>FlexibleOptionGroupSelector:</h2>
      <FlexibleOptionGroupSelector
        customizationConfig={customizationConfig}
        onSelect={(p) => {
          console.log('[PageWizard] FlexibleOptionGroupSelector triggered onSelect callback:', p);
        }}
      />
      <hr />
      {filters.length === 0 && (
        <p>
          Click the button below to configure a filter and generate instructions for setting up a new customizable doc.
        </p>
      )}
      <div style={{ marginBottom: '30px' }}>
        <h1>Filters</h1>
        <FilterList customizationConfig={customizationConfig} onPublish={onFilterListChange} />
      </div>
      {filters.length > 0 && (
        <div>
          <SetupInstructions filters={filters} newConfig={newConfig} customizationConfig={customizationConfig} />
        </div>
      )}
    </div>
  );
}

export default PageWizard;
