import { CustomizationConfig } from 'cdocs-data';
import TraitForm from './TraitForm';
import OptionGroupForm from './OptionGroupForm';
import { WizardFilter, TraitConfig } from './types';

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
    marginBottom: '1em',
    marginTop: '0.5em'
  };

  let traitLabel = '';
  if (filter.trait_id) {
    const traitConfig = customizationConfig.traitsById[filter.trait_id];
    if (traitConfig) {
      traitLabel = traitConfig.label;
    }
  }

  return (
    <div>
      <h2 style={formHeaderStyles}>Trait{traitLabel && `: ${traitLabel}`}</h2>
      <p style={{ fontSize: '0.9em' }}>
        The user characteristic to filter on, such as their host or programming language.
      </p>
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
      <h2 style={formHeaderStyles}>Options</h2>
      <p style={{ fontSize: '0.9em' }}>The list of options the user can select for this filter.</p>
      <OptionGroupForm
        customizationConfig={customizationConfig}
        onUpdate={({ optionGroupId }: { optionGroupId: string }) => {
          onEdit({
            ...filter,
            option_group_id: optionGroupId
          });
        }}
      />
    </div>
  );
}

export default FilterForm;
