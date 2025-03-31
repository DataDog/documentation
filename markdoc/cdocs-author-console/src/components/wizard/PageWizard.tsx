import { useState } from 'react';
import FilterList from './FilterList';
import { CustomizationConfig } from 'cdocs-data';
import { WizardFilter } from './types';
import SetupInstructions from './SetupInstructions';

function PageWizard({ customizationConfig }: { customizationConfig: CustomizationConfig }) {
  const [filters, setFilters] = useState<WizardFilter[]>([]);

  const onFilterListChange = ({ filters }: { filters: WizardFilter[] }) => {
    setFilters(filters);
  };

  return (
    <div>
      <div
        style={{
          display: 'inline-block',
          verticalAlign: 'top',
          height: '100vh',
          width: '35%',
          padding: '1rem',
          borderRight: '1px solid #e0e0e0'
        }}
      >
        <h1 style={{ marginTop: '0px' }}>Filters</h1>
        <FilterList customizationConfig={customizationConfig} onChange={onFilterListChange} />
      </div>
      <div style={{ display: 'inline-block', verticalAlign: 'top', width: '55%', height: '100vh', padding: '1rem' }}>
        <SetupInstructions filters={filters} customizationConfig={customizationConfig} />
      </div>
    </div>
  );
}

export default PageWizard;
