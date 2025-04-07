import { useState } from 'react';
import FilterList from './FilterList';
import { CustomizationConfig } from 'cdocs-data';
import { WizardFilter } from '../types';
import SetupInstructions from './SetupInstructions';
import OptionSelector from './forms/OptionSelector';
import OptionGroupForm from './forms/OptionGroupForm';

function PageWizard({ customizationConfig }: { customizationConfig: CustomizationConfig }) {
  const [filters, setFilters] = useState<WizardFilter[]>([]);
  const [newConfig, setNewConfig] = useState<CustomizationConfig>({
    traitsById: {},
    optionsById: {},
    optionGroupsById: {}
  });

  const onFilterListChange = (p: { filters: WizardFilter[]; newConfig: CustomizationConfig }) => {
    setFilters([...p.filters]);
    setNewConfig(p.newConfig);
  };

  return (
    <div>
      <h1>Option group form</h1>
      <OptionGroupForm
        customizationConfig={customizationConfig}
        onUpdate={(config) => {
          console.log('option group form has broadcast', config);
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
