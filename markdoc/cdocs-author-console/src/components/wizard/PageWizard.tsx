import { useState } from 'react';
import FilterList from './FilterList';
import { CustomizationConfig } from 'cdocs-data';
import { WizardFilter } from './types';
import SetupInstructions from './SetupInstructions';

function PageWizard({ customizationConfig }: { customizationConfig: CustomizationConfig }) {
  const [filters, setFilters] = useState<WizardFilter[]>([]);
  const [wizardCustomizationConfig, setWizardCustomizationConfig] = useState<CustomizationConfig>({
    ...customizationConfig
  });

  const onFilterListChange = ({
    filters,
    wizardCustomizationConfig
  }: {
    filters: WizardFilter[];
    wizardCustomizationConfig: CustomizationConfig;
  }) => {
    setFilters([...filters]);
    setWizardCustomizationConfig({
      ...wizardCustomizationConfig
    });
  };

  return (
    <div>
      {filters.length === 0 && (
        <p>
          Click the button below to configure a filter and generate instructions for setting up a new customizable doc.
        </p>
      )}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ marginTop: '0px', marginBottom: '0px' }}>Filters</h1>
        <FilterList customizationConfig={customizationConfig} onChange={onFilterListChange} />
      </div>
      {filters.length > 0 && (
        <div>
          <SetupInstructions filters={filters} wizardCustomizationConfig={wizardCustomizationConfig} />
        </div>
      )}
    </div>
  );
}

export default PageWizard;
