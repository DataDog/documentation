import { useState } from 'react';
import { CustomizationConfig } from 'cdocs-data';
import TraitForm, { TraitConfig } from './TraitForm';
import OptionGroupForm from './OptionGroupForm';
import { WizardFilter } from './types';

function FilterForm({
  filter,
  customizationConfig,
  onEdit
}: {
  filter: WizardFilter;
  customizationConfig: CustomizationConfig;
  onEdit: (filter: WizardFilter) => void;
}) {
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
      <h2 style={formHeaderStyles}>Trait</h2>
      <TraitForm
        customizationConfig={customizationConfig}
        onUpdate={({ traitId, newTraitConfig }: { traitId: string; newTraitConfig?: TraitConfig }) => {
          let traitConfig: TraitConfig;
          console.log('Handling trait update in FilterList, traitId: ', traitId, ', newTraitConfig: ', newTraitConfig);
          if (newTraitConfig) {
            traitConfig = newTraitConfig;
          } else {
            traitConfig = customizationConfig.traitsById[traitId];
          }

          // Update the filter config with the newly chosen trait ID
          onEdit({
            ...filter,
            trait_id: traitId,
            label: traitConfig.label,
            newTraitConfig
          });
        }}
      />
      <h2 style={formHeaderStyles}>Option group</h2>
      <OptionGroupForm customizationConfig={customizationConfig} />
    </div>
  );
}

export default FilterForm;
