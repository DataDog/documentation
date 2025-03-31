import { useEffect, useState } from 'react';
import { CustomizationConfig, FilterConfig, FilterConfigSchema } from 'cdocs-data';
import TraitForm, { TraitConfig } from './TraitForm';
import OptionGroupForm from './OptionGroupForm';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';

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

function FilterList({ customizationConfig }: { customizationConfig: CustomizationConfig }) {
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

function FilterForm({
  filterConfig,
  customizationConfig,
  onEdit
}: {
  filterConfig: FilterConfig;
  customizationConfig: CustomizationConfig;
  onEdit: (filter: FilterConfig) => void;
}) {
  const formHeaderStyles: React.CSSProperties = {
    backgroundColor: '#eff1f5',
    fontSize: '0.9em',
    padding: '0.5em',
    textAlign: 'center',
    marginBottom: '0.2em',
    marginTop: '0.5em'
  };

  const [newCustomizationConfig, setNewCustomizationConfig] = useState<CustomizationConfig>({
    traitsById: {},
    optionsById: {},
    optionGroupsById: {}
  });

  return (
    <div>
      <h2 style={formHeaderStyles}>Trait</h2>
      <TraitForm
        customizationConfig={customizationConfig}
        onUpdate={({ traitId, newTraitConfig }: { traitId: string; newTraitConfig?: TraitConfig }) => {
          let traitConfig: TraitConfig;
          console.log('Handling trait update in FilterList, traitId: ', traitId, ', newTraitConfig: ', newTraitConfig);
          // If a new trait config was passed, add it to the new customization config
          if (newTraitConfig) {
            traitConfig = newTraitConfig;
            setNewCustomizationConfig({
              ...newCustomizationConfig,
              traitsById: {
                ...newCustomizationConfig.traitsById,
                [newTraitConfig.id]: newTraitConfig
              }
            });
          } else {
            traitConfig = customizationConfig.traitsById[traitId];
          }

          // Update the filter config with the newly chosen trait ID
          onEdit({
            ...filterConfig,
            trait_id: traitId,
            label: traitConfig.label
          });
        }}
      />
      <h2 style={formHeaderStyles}>Option group</h2>
      <OptionGroupForm customizationConfig={customizationConfig} />
    </div>
  );
}

export default FilterList;
