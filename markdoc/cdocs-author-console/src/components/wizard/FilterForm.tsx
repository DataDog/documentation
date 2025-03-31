import { useState } from 'react';
import { CustomizationConfig, FilterConfig } from 'cdocs-data';
import TraitForm, { TraitConfig } from './TraitForm';
import OptionGroupForm from './OptionGroupForm';

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

export default FilterForm;
