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
  onChange
}: {
  customizationConfig: CustomizationConfig;
  onChange: ({ filters }: { filters: WizardFilter[] }) => void;
}) {
  const [savedFiltersByUuid, setSavedFiltersByUuid] = useState<Record<string, WizardFilter>>({});
  const [filtersByUuid, setFiltersByUuid] = useState<Record<string, WizardFilter>>({});
  const [currentFilterUuid, setCurrentFilterUuid] = useState<string | null>(null);

  const addFilter = () => {
    const newFilter: WizardFilter = {
      uuid: uuidv4(),
      label: '',
      trait_id: '',
      option_group_id: '',
      customizationConfig: {
        traitsById: {},
        optionsById: {},
        optionGroupsById: {}
      }
    };
    setFiltersByUuid({ ...filtersByUuid, [newFilter.uuid]: newFilter });
    setCurrentFilterUuid(newFilter.uuid);
  };

  const onFilterFormChange = (filter: WizardFilter) => {
    if (!currentFilterUuid) {
      throw new Error('No current filter to edit');
    }
    setFiltersByUuid({ ...filtersByUuid, [currentFilterUuid]: filter });
  };

  const onFilterRowDelete = (filter: WizardFilter) => {
    setCurrentFilterUuid(null);
    const newFiltersByUuid = { ...filtersByUuid };
    delete newFiltersByUuid[filter.uuid];
    setFiltersByUuid(newFiltersByUuid);
    onChange({ filters: Object.values(newFiltersByUuid) });
  };

  const onFilterRowEdit = (filter: WizardFilter) => {
    setCurrentFilterUuid(filter.uuid);
  };

  const onSave = () => {
    setCurrentFilterUuid(null);
    setSavedFiltersByUuid({ ...filtersByUuid });
    onChange({ filters: Object.values(filtersByUuid) });
  };

  const onCancel = () => {
    setCurrentFilterUuid(null);
    setFiltersByUuid({ ...savedFiltersByUuid });
  };

  return (
    <div>
      {Object.keys(filtersByUuid).length === 0 && <p>No filters added yet.</p>}
      {Object.keys(filtersByUuid).map((uuid) => {
        // Only show the edit and delete icons if the filter is not currently being edited
        let onEdit;
        let onDelete;
        if (currentFilterUuid !== uuid) {
          onEdit = onFilterRowEdit;
          onDelete = onFilterRowDelete;
        }
        return (
          <div key={uuid} style={{ borderBottom: '1px solid #e0e0e0' }}>
            <FilterRow
              filter={filtersByUuid[uuid]}
              customizationConfig={customizationConfig}
              onDelete={onDelete}
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
      {!currentFilterUuid && (
        <Button sx={{ marginTop: '1rem' }} variant="contained" startIcon={<AddIcon />} onClick={addFilter}>
          Add filter
        </Button>
      )}
      {currentFilterUuid && (
        <>
          <Button sx={{ marginTop: '1rem' }} variant="contained" onClick={onSave}>
            Save
          </Button>{' '}
          <Button sx={{ marginTop: '1rem' }} variant="contained" onClick={onCancel}>
            Cancel
          </Button>
        </>
      )}
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
  onDelete?: (filter: WizardFilter) => void;
}) {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '10px',
    paddingBottom: '10px'
  };

  const getFilterSummaryText = () => {
    if (!filter.trait_id || !filter.option_group_id) {
      return 'New filter';
    }
    const optionLabels = customizationConfig.optionGroupsById[filter.option_group_id]?.map((option) => option.label);
    return `${filter.label}: ${optionLabels.join(', ')}`;
  };

  return (
    <div style={containerStyles}>
      <div>{getFilterSummaryText()}</div>
      <div>
        {onEdit && <EditIcon sx={{ color: '#632ca6' }} onClick={() => onEdit(filter)} />}{' '}
        {onDelete && <DeleteIcon sx={{ color: '#eb364b' }} onClick={() => onDelete(filter)} />}
      </div>
    </div>
  );
}
