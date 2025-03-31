import { useState } from 'react';
import { CustomizationConfig, FilterConfig, FilterConfigSchema } from 'cdocs-data';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';
import FilterForm from './FilterForm';
import { WizardData } from './types';

function FilterList({
  customizationConfig,
  onEdit
}: {
  customizationConfig: CustomizationConfig;
  onEdit: ({ filters, newCustomizationConfig }: WizardData) => void;
}) {
  const [filtersByUuid, setFiltersByUuid] = useState<Record<string, FilterConfig>>({});
  const [currentFilterUuid, setCurrentFilterUuid] = useState<string | null>(null);

  const addFilter = () => {
    const newFilter: FilterConfig = {
      label: '',
      trait_id: '',
      option_group_id: ''
    };
    const newUuid = uuidv4();
    setFiltersByUuid({ ...filtersByUuid, [newUuid]: newFilter });
    setCurrentFilterUuid(newUuid);
  };

  const onFilterEdit = (filterConfig: FilterConfig) => {
    if (!currentFilterUuid) {
      throw new Error('No current filter to edit');
    }
    setFiltersByUuid({ ...filtersByUuid, [currentFilterUuid]: filterConfig });
  };

  return (
    <div>
      {Object.keys(filtersByUuid).length === 0 && <p>No filters added yet.</p>}
      {Object.keys(filtersByUuid).map((uuid) => {
        const filter = filtersByUuid[uuid];
        return (
          <div key={uuid} style={{ marginBottom: '1em', padding: '10px', borderBottom: '1px solid #e2e5ed' }}>
            <FilterSummary filterConfig={filtersByUuid[uuid]} customizationConfig={customizationConfig} />
            {currentFilterUuid === uuid && (
              <FilterForm
                customizationConfig={customizationConfig}
                filterConfig={filtersByUuid[currentFilterUuid]}
                onEdit={onFilterEdit}
              />
            )}
          </div>
        );
      })}
      <Button variant="contained" startIcon={<AddIcon />} onClick={addFilter}>
        Add filter
      </Button>
    </div>
  );
}

export default FilterList;

/**
 * A short text representation of a filter configuration.
 */
function FilterSummary({
  filterConfig,
  customizationConfig
}: {
  filterConfig: FilterConfig;
  customizationConfig: CustomizationConfig;
}) {
  if (!filterConfig.trait_id || !filterConfig.option_group_id) {
    return <span>Incomplete filter.</span>;
  }
  const optionLabels = customizationConfig.optionGroupsById[filterConfig.option_group_id]?.map(
    (option) => option.label
  );

  return (
    <span>
      {filterConfig.label}: {optionLabels.join(', ')}
    </span>
  );
}
