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
  onClean: () => void;
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

  // TODO: Use one variable for state, which could be
  // blank, pending, or saved (clean), and
  // there could be a callback that is just onStateChange

  // The local copy of the filter, to hold any pending changes
  const [localFilter, setLocalFilter] = useState<WizardFilter>(props.filter);

  const [traitIsClean, setTraitIsClean] = useState(true);
  const [traitIsPending, setTraitIsPending] = useState(false);

  const [optionGroupIsClean, setOptionGroupIsClean] = useState(true);
  const [optionGroupIsPending, setOptionGroupIsPending] = useState(false);

  // Both child forms need to be clean
  // for this entire form to be clean.
  const handleTraitClean = () => {
    setTraitIsClean(true);
    if (optionGroupIsClean) {
      props.onClean();
    }
  };

  // Both child forms need to be clean
  // for this entire form to be clean.
  const handleOptionGroupClean = () => {
    setOptionGroupIsClean(true);
    if (traitIsClean) {
      props.onClean();
    }
  };

  // Only one child form needs to be pending
  // for this entire form to be pending.
  const handleTraitPending = () => {
    setTraitIsPending(true);
    props.onPending();
  };

  // Only one child form needs to be pending
  // for this entire form to be pending.
  const handleOptionGroupPending = () => {
    setOptionGroupIsPending(true);
    props.onPending();
  };

  const handleTraitSave = ({ traitConfig }: { traitConfig: TraitConfig }) => {
    const updatedFilter = {
      ...localFilter,
      trait_id: traitConfig.id,
      label: traitConfig.label,
      customizationConfig: {
        ...localFilter.customizationConfig,
        traitsById: {
          [traitConfig.id]: traitConfig
        }
      }
    };
    setLocalFilter(updatedFilter);

    if (optionGroupIsClean || optionGroupIsPending) {
      props.onPending();
    } else {
      props.onSave(updatedFilter);
      setTraitIsPending(false);
      setOptionGroupIsPending(false);
    }
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

    const updatedFilter = {
      ...localFilter,
      option_group_id: p.optionGroupId,
      customizationConfig: newCustomizationConfig
    };

    setLocalFilter(updatedFilter);

    if (traitIsClean || traitIsPending) {
      props.onPending();
    } else {
      props.onSave(updatedFilter);
      setOptionGroupIsPending(false);
      setTraitIsPending(false);
    }
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
        onClean={handleTraitClean}
      />
      <h2 style={formHeaderStyles}>Options</h2>
      <p style={{ fontSize: '0.9em' }}>The list of options the user can select for this filter.</p>
      <OptionGroupForm
        customizationConfig={props.customizationConfig}
        onSave={handleOptionGroupSave}
        onPending={handleOptionGroupPending}
        onClean={handleOptionGroupClean}
      />
    </div>
  );
}

export default FilterForm;
