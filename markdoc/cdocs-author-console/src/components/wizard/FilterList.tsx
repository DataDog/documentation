import { useState } from 'react';
import { CustomizationConfig, FilterConfig, FilterConfigSchema } from 'cdocs-data';
import OptionGroupSelector from '../selectors/OptionGroupSelector';
import TraitForm, { TraitConfig } from './TraitForm';
import OptionGroupForm from './OptionGroupForm';

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
  return (
    <div>
      <p>Filter list goes here.</p>
      <hr />
      <p>
        <strong>Filter form test</strong>
      </p>
      <FilterForm customizationConfig={customizationConfig} onEdit={() => {}} />
    </div>
  );
}

function FilterForm({
  filter,
  customizationConfig,
  onEdit
}: {
  filter?: FilterConfig;
  customizationConfig: CustomizationConfig;
  onEdit: (filter: FilterConfig) => void;
}) {
  const blankFilter: FilterConfig = {
    label: '',
    trait_id: '',
    option_group_id: ''
  };

  const [filterConfig, setFilterConfig] = useState<FilterConfig>(blankFilter);

  const [newCustomizationConfig, setNewCustomizationConfig] = useState<CustomizationConfig>({
    traitsById: {},
    optionsById: {},
    optionGroupsById: {}
  });

  const formHeaderStyles: React.CSSProperties = {
    backgroundColor: '#eff1f5',
    fontSize: '0.9em',
    padding: '0.5em',
    textAlign: 'center',
    marginBottom: '0.2em',
    marginTop: '0.5em'
  };

  return (
    <div>
      <p>
        <FilterSummary filterConfig={filterConfig} customizationConfig={customizationConfig} />
      </p>
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
          setFilterConfig({
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
