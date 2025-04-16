import { useState } from 'react';
import { CustomizationConfig } from 'cdocs-data';
import TraitForm from './traits/TraitForm';
import OptionGroupForm, { OptionGroup } from './optionGroups/OptionGroupForm';
import { WizardFilter, TraitConfig } from '../../types';

function FilterForm(props: {
  filter: WizardFilter;
  customizationConfig: CustomizationConfig;
  onSave: (filter: WizardFilter) => void;
  onPending: () => void;
  onCancel: () => void;
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
  if (props.filter.trait_id) {
    const traitConfig = props.customizationConfig.traitsById[props.filter.trait_id];
    if (traitConfig) {
      traitLabel = traitConfig.label;
    }
  }

  const [traitIsPending, setTraitIsPending] = useState(false);
  const [optionGroupIsPending, setOptionGroupIsPending] = useState(false);

  const handleTraitPending = () => {
    setTraitIsPending(true);
    props.onPending();
  };

  const handleOptionGroupPending = () => {
    setOptionGroupIsPending(true);
    props.onPending();
  };

  const handleTraitCancel = () => {
    setTraitIsPending(false);
    if (!optionGroupIsPending) {
      props.onCancel();
    }
  };

  const handleOptionGroupCancel = () => {
    setOptionGroupIsPending(false);
    if (!traitIsPending) {
      props.onCancel();
    }
  };

  const handleTraitSave = ({ traitConfig }: { traitConfig: TraitConfig }) => {
    const updatedFilter = {
      ...props.filter,
      trait_id: traitConfig.id,
      label: traitConfig.label,
      customizationConfig: {
        ...props.filter.customizationConfig,
        traitsById: {
          [traitConfig.id]: traitConfig
        }
      }
    };
    props.onSave(updatedFilter);
  };

  const handleOptionGroupSave = (p: { optionGroupId: string; optionGroup: OptionGroup }) => {
    const newCustomizationConfig: CustomizationConfig = {
      ...props.filter.customizationConfig,
      optionGroupsById: {
        [p.optionGroupId]: p.optionGroup
      },
      optionsById: {}
    };

    p.optionGroup.forEach((option) => {
      const optionId = option.id;
      newCustomizationConfig.optionsById[optionId] = props.customizationConfig.optionsById[optionId] || option;
    });

    props.onSave({
      ...props.filter,
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
      <TraitForm
        customizationConfig={props.customizationConfig}
        onSave={handleTraitSave}
        onPending={handleTraitPending}
        onCancel={handleTraitCancel}
      />
      <h2 style={formHeaderStyles}>Options</h2>
      <p style={{ fontSize: '0.9em' }}>The list of options the user can select for this filter.</p>
      <OptionGroupForm
        customizationConfig={props.customizationConfig}
        onSave={handleOptionGroupSave}
        onPending={handleOptionGroupPending}
        onCancel={handleOptionGroupCancel}
      />
    </div>
  );
}

export default FilterForm;
