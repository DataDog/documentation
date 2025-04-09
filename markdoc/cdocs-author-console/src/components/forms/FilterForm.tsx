import { CustomizationConfig } from 'cdocs-data';
import TraitForm from './TraitForm';
import OptionGroupForm, { OptionGroup } from './OptionGroupForm';
import { WizardFilter, TraitConfig } from '../../types';

function FilterForm({
  filter,
  customizationConfig,
  onPublish
}: {
  filter: WizardFilter;
  customizationConfig: CustomizationConfig;
  onPublish: (filter: WizardFilter) => void;
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

  const onTraitEdit = ({ traitConfig }: { traitConfig: TraitConfig }) => {
    const updatedFilter = {
      ...filter,
      trait_id: traitConfig.id,
      label: traitConfig.label,
      customizationConfig: {
        ...filter.customizationConfig,
        traitsById: {
          [traitConfig.id]: traitConfig
        }
      }
    };
    onPublish(updatedFilter);
  };

  const onOptionGroupUpdate = (p: { optionGroupId: string; optionGroup: OptionGroup }) => {
    const newCustomizationConfig: CustomizationConfig = {
      ...filter.customizationConfig,
      optionGroupsById: {
        [p.optionGroupId]: p.optionGroup
      },
      optionsById: {}
    };

    p.optionGroup.forEach((option) => {
      const optionId = option.id;
      newCustomizationConfig.optionsById[optionId] = customizationConfig.optionsById[optionId];
    });

    onPublish({
      ...filter,
      option_group_id: p.optionGroupId,
      customizationConfig: newCustomizationConfig
    });
  };

  return (
    <div>
      <h2 style={formHeaderStyles}>Trait{traitLabel && `: ${traitLabel}`}</h2>
      <p style={{ fontSize: '0.9em' }}>
        The user characteristic to filter on, such as their host or programming language.
      </p>
      <TraitForm customizationConfig={customizationConfig} onUpdate={onTraitEdit} />
      <h2 style={formHeaderStyles}>Options</h2>
      <p style={{ fontSize: '0.9em' }}>The list of options the user can select for this filter.</p>
      <OptionGroupForm customizationConfig={customizationConfig} onUpdate={onOptionGroupUpdate} />
    </div>
  );
}

export default FilterForm;
