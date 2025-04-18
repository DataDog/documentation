import { useState } from 'react';
import { CustomizationConfig } from 'cdocs-data';
import OptionGroupForm, { OptionGroup } from './optionGroups/OptionGroupForm';
import { WizardFilter, TraitConfig, FormStatus } from '../../types';
import FlexibleTraitSelector from './traits/FlexibleTraitSelector';

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

  // The local copy of the filter, to hold any pending changes
  const [localFilter, setLocalFilter] = useState<WizardFilter>(props.filter);
  const [traitFormStatus, setTraitFormStatus] = useState<FormStatus>('waiting');
  const [optionGroupFormStatus, setOptionGroupFormStatus] = useState<FormStatus>('waiting');

  const handleTraitSave = ({ traitConfig }: { traitConfig: TraitConfig }) => {
    console.log('handleTraitSave', traitConfig);
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

    console.log('updatedFilter after trait save', updatedFilter);

    setTraitFormStatus('done');

    if (optionGroupFormStatus === 'done') {
      props.onSave(updatedFilter);
    }
  };

  const handleOptionGroupSave = (p: { optionGroupId: string; optionGroup: OptionGroup }) => {
    console.log('handleOptionGroupSave', p);
    const newCustomizationConfig: CustomizationConfig = {
      ...localFilter.customizationConfig,
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

    console.log('updatedFilter after option group save', updatedFilter);

    setOptionGroupFormStatus('done');

    if (traitFormStatus === 'done') {
      props.onSave(updatedFilter);
    }
  };

  return (
    <div>
      <h2 style={formHeaderStyles}>Choose a trait</h2>
      <p style={{ fontSize: '0.9em' }}>
        The user characteristic to filter on, such as their host or programming language.
      </p>
      <FlexibleTraitSelector
        customizationConfig={props.customizationConfig}
        onStatusChange={(p) => {
          if (p.status === 'done' && p.data) {
            handleTraitSave({ traitConfig: p.data });
          }
        }}
      />
      <h2 style={formHeaderStyles}>Choose an option group</h2>
      <p style={{ fontSize: '0.9em' }}>
        The list of options the user can select for this filter. For example, if you've chosen the{' '}
        <code>prog_lang</code> trait above, your option group would contain options like Python and JavaScript.
      </p>
      <OptionGroupForm customizationConfig={props.customizationConfig} onSave={handleOptionGroupSave} />
    </div>
  );
}

export default FilterForm;
