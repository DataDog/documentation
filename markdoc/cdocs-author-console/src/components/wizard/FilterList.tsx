import { useState } from 'react';
import { CustomizationConfig, FilterConfig, FilterConfigSchema } from 'cdocs-data';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';
import FilterForm from './FilterForm';
import { WizardFilter } from './types';

function FilterList({
  customizationConfig,
  onEdit
}: {
  customizationConfig: CustomizationConfig;
  onEdit: ({ filters }: { filters: WizardFilter[] }) => void;
}) {
  const [filtersByUuid, setFiltersByUuid] = useState<Record<string, WizardFilter>>({});
  const [currentFilterUuid, setCurrentFilterUuid] = useState<string | null>(null);

  const addFilter = () => {
    const newFilter: WizardFilter = {
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
    onEdit({ filters: Object.values(filtersByUuid) });
  };

  return (
    <div>
      {Object.keys(filtersByUuid).length === 0 && <p>No filters added yet.</p>}
      {Object.keys(filtersByUuid).map((uuid) => {
        return (
          <div key={uuid} style={{ marginBottom: '1em', padding: '10px', borderBottom: '1px solid #e2e5ed' }}>
            <FilterSummary filter={filtersByUuid[uuid]} customizationConfig={customizationConfig} />
            {currentFilterUuid === uuid && (
              <FilterForm
                customizationConfig={customizationConfig}
                filter={filtersByUuid[currentFilterUuid]}
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
  filter,
  customizationConfig
}: {
  filter: WizardFilter;
  customizationConfig: CustomizationConfig;
}) {
  if (!filter.trait_id || !filter.option_group_id) {
    return <span>Incomplete filter.</span>;
  }
  const optionLabels = customizationConfig.optionGroupsById[filter.option_group_id]?.map((option) => option.label);

  return (
    <span>
      {filter.label}: {optionLabels.join(', ')}
    </span>
  );
}
