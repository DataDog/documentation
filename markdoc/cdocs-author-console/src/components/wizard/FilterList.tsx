import { useState } from 'react';
import { CustomizationConfig, FilterConfig, FilterConfigSchema } from 'cdocs-data';
import OptionGroupSelector from '../selectors/OptionGroupSelector';
import TraitForm from './TraitForm';

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

function FilterSummary({
  filterConfig,
  customizationConfig
}: {
  filterConfig: FilterConfig;
  customizationConfig: CustomizationConfig;
}) {
  if (!filterConfig.trait_id || !filterConfig.option_group_id) {
    return <span>Filter incomplete so far.</span>;
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

  return (
    <div>
      <p>
        <FilterSummary filterConfig={filterConfig} customizationConfig={customizationConfig} />
      </p>
      <h2>Trait</h2>
      <TraitForm
        customizationConfig={customizationConfig}
        onUpdate={({
          traitId,
          newTraitConfig
        }: {
          traitId: string;
          newTraitConfig?: { id: string; label: string; internal_notes?: string };
        }) => {
          // If a new trait config was passed, add it to the new customization config
          if (newTraitConfig) {
            setNewCustomizationConfig({
              ...newCustomizationConfig,
              traitsById: {
                ...newCustomizationConfig.traitsById,
                [newTraitConfig.id]: newTraitConfig
              }
            });
          }

          // Update the filter config with the newly chosen trait ID
          setFilterConfig({
            ...filterConfig,
            trait_id: traitId,
            label: customizationConfig.traitsById[traitId].label
          });
        }}
      />
      <h2>Options</h2>
      <OptionGroupSelector
        customizationConfig={customizationConfig}
        onSelect={(optionGroupId) => setFilterConfig({ ...filterConfig, option_group_id: optionGroupId })}
      />
    </div>
  );
}

export default FilterList;
