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
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ marginTop: '0px' }}>Filters</h1>
        <FilterList customizationConfig={customizationConfig} onChange={onFilterListChange} />
      </div>
      <div>
        <SetupInstructions filters={filters} wizardCustomizationConfig={wizardCustomizationConfig} />
      </div>
    </div>
  );
}

export default PageWizard;
