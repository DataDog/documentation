import { useState } from 'react';
import { CustomizationConfig } from 'cdocs-data';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';
import FilterForm from './FilterForm';
import { WizardFilter } from './types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
      uuid: uuidv4(),
      label: '',
      trait_id: '',
      option_group_id: ''
    };
    setFiltersByUuid({ ...filtersByUuid, [newFilter.uuid]: newFilter });
    setCurrentFilterUuid(newFilter.uuid);
  };

  const onFilterFormChange = (filter: WizardFilter) => {
    if (!currentFilterUuid) {
      throw new Error('No current filter to edit');
    }
    setFiltersByUuid({ ...filtersByUuid, [currentFilterUuid]: filter });
    onEdit({ filters: Object.values(filtersByUuid) });
  };

  const onFilterRowDelete = (filter: WizardFilter) => {
    setCurrentFilterUuid(null);
    const newFiltersByUuid = { ...filtersByUuid };
    delete newFiltersByUuid[filter.uuid];
    setFiltersByUuid(newFiltersByUuid);
    onEdit({ filters: Object.values(newFiltersByUuid) });
  };

  const onFilterRowEdit = (filter: WizardFilter) => {
    setCurrentFilterUuid(filter.uuid);
  };

  return (
    <div>
      {Object.keys(filtersByUuid).length === 0 && <p>No filters added yet.</p>}
      {Object.keys(filtersByUuid).map((uuid) => {
        // Only show the edit icon if the filter is not currently being edited
        let onEdit;
        if (currentFilterUuid !== uuid) {
          onEdit = onFilterRowEdit;
        }
        return (
          <div key={uuid} style={{ marginBottom: '1em', padding: '10px', borderBottom: '1px solid #e2e5ed' }}>
            <FilterRow
              filter={filtersByUuid[uuid]}
              customizationConfig={customizationConfig}
              onDelete={onFilterRowDelete}
              onEdit={onEdit}
            />
            {currentFilterUuid === uuid && (
              <FilterForm
                customizationConfig={customizationConfig}
                filter={filtersByUuid[currentFilterUuid]}
                onEdit={onFilterFormChange}
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
function FilterRow({
  filter,
  customizationConfig,
  onEdit,
  onDelete
}: {
  filter: WizardFilter;
  customizationConfig: CustomizationConfig;
  onEdit?: (filter: WizardFilter) => void;
  onDelete: (filter: WizardFilter) => void;
}) {
  const getFilterSummaryText = () => {
    if (!filter.trait_id || !filter.option_group_id) {
      return 'Incomplete filter';
    }
    const optionLabels = customizationConfig.optionGroupsById[filter.option_group_id]?.map((option) => option.label);
    return `${filter.label}: ${optionLabels.join(', ')}`;
  };

  return (
    <>
      <span>{getFilterSummaryText()}</span>
      <DeleteIcon onClick={() => onDelete(filter)} />
      {onEdit && <EditIcon onClick={() => onEdit(filter)} />}
    </>
  );
}
