import { useState } from 'react';
import { CustomizationConfig } from 'cdocs-data';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';
import FilterForm from './FilterForm';
import { WizardFilter } from './types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

/**
 * A list of filters that can be added, edited, and deleted.
 */
function FilterList({
  customizationConfig,
  onPublish
}: {
  customizationConfig: CustomizationConfig;
  onPublish: ({
    filters,
    wizardCustomizationConfig
  }: {
    filters: WizardFilter[];
    wizardCustomizationConfig: CustomizationConfig;
  }) => void;
}) {
  const [savedFiltersByUuid, setSavedFiltersByUuid] = useState<Record<string, WizardFilter>>({});
  const [filtersByUuid, setFiltersByUuid] = useState<Record<string, WizardFilter>>({});
  const [currentFilterUuid, setCurrentFilterUuid] = useState<string | null>(null);
  const [wizardCustomizationConfig, setWizardCustomizationConfig] = useState<CustomizationConfig>({
    ...customizationConfig
  });

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

  const handleFilterFormChange = (filter: WizardFilter) => {
    if (!currentFilterUuid) {
      throw new Error('No current filter to edit');
    }
    setFiltersByUuid({ ...filtersByUuid, [currentFilterUuid]: filter });
  };

  const handleFilterRowDelete = (filter: WizardFilter) => {
    setCurrentFilterUuid(null);
    const newFiltersByUuid = { ...filtersByUuid };
    delete newFiltersByUuid[filter.uuid];
    setFiltersByUuid(newFiltersByUuid);
    onPublish({ filters: Object.values(newFiltersByUuid), wizardCustomizationConfig });
  };

  const handleFilterRowEdit = (filter: WizardFilter) => {
    setCurrentFilterUuid(filter.uuid);
  };

  const handleSave = () => {
    setCurrentFilterUuid(null);
    setSavedFiltersByUuid({ ...filtersByUuid });
    onPublish({ filters: Object.values(filtersByUuid), wizardCustomizationConfig });

    // Reset the wizard's customization config to the original config
    const newWizardCustomizationConfig = { ...customizationConfig };

    // Update the wizard's customization config with the new filters
    Object.values(filtersByUuid).forEach((filter) => {
      newWizardCustomizationConfig.traitsById = {
        ...customizationConfig.traitsById,
        ...filter.customizationConfig.traitsById
      };

      newWizardCustomizationConfig.optionsById = {
        ...customizationConfig.optionsById,
        ...filter.customizationConfig.optionsById
      };

      newWizardCustomizationConfig.optionGroupsById = {
        ...customizationConfig.optionGroupsById,
        ...filter.customizationConfig.optionGroupsById
      };
    });

    setWizardCustomizationConfig(newWizardCustomizationConfig);
  };

  const handleCancel = () => {
    setCurrentFilterUuid(null);
    setFiltersByUuid({ ...savedFiltersByUuid });
  };

  return (
    <div>
      {Object.keys(filtersByUuid).length === 0 && <div>No filters added yet.</div>}
      {Object.keys(filtersByUuid).map((uuid) => {
        // Only show the edit and delete icons if the filter is not currently being edited
        let onEdit;
        let onDelete;
        if (currentFilterUuid !== uuid) {
          onEdit = handleFilterRowEdit;
          onDelete = handleFilterRowDelete;
        }
        return (
          <div key={uuid} style={{ borderBottom: '1px solid #e0e0e0' }}>
            <FilterRow
              filter={filtersByUuid[uuid]}
              customizationConfig={wizardCustomizationConfig}
              onDelete={onDelete}
              onEdit={onEdit}
            />
            {currentFilterUuid === uuid && (
              <FilterForm
                customizationConfig={wizardCustomizationConfig}
                filter={filtersByUuid[currentFilterUuid]}
                onPublish={handleFilterFormChange}
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
          <Button sx={{ marginTop: '1rem' }} variant="contained" onClick={handleSave}>
            Save
          </Button>{' '}
          <Button sx={{ marginTop: '1rem' }} variant="contained" onClick={handleCancel}>
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
    marginTop: '10px',
    marginBottom: '10px'
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
