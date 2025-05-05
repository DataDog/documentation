import { useState } from 'react';
import { CustomizationConfig } from 'cdocs-data';
import { FormStatus } from '../../../types';
import { OptionGroup } from '../../../types';
import NewOptionGroupForm from './NewOptionGroupForm';
import FlexibleOptionGroupSelector from './FlexibleOptionGroupSelector';

/**
 * Allows the user to select an existing option group, or create a new one.
 */
function UpdatedOptionGroupForm(props: {
  customizationConfig: CustomizationConfig;
  onStatusChange: (p: { status: FormStatus; data?: { optionGroupId: string; optionGroup: OptionGroup } }) => void;
}) {
  const [optionGroupId, setOptionGroupId] = useState<string>('');
  const [optionGroup, setOptionGroup] = useState<OptionGroup>([]);
  const [formStatus, setFormStatus] = useState<FormStatus>('waiting');

  // The option selector form only needed if the user decides to create a new option group,
  // so it starts as 'done' because it may not be used.
  const [optionSelectorFormStatus, setOptionSelectorFormStatus] = useState<FormStatus>('done');

  const handleExistingOptionGroupSelect = (selectedOptionGroupId: string) => {
    const updatedOptionGroup = props.customizationConfig.optionGroupsById[selectedOptionGroupId];
    const newStatus = 'done';
    props.onStatusChange({
      status: newStatus,
      data: {
        optionGroupId: selectedOptionGroupId,
        optionGroup: updatedOptionGroup
      }
    });
    setOptionGroupId(selectedOptionGroupId);
    setOptionGroup(updatedOptionGroup);
    setFormStatus(newStatus);
  };

  const handleNewGroupSave = () => {
    console.log('[OptionGroupForm] Emitting', JSON.stringify({ optionGroupId, optionGroup }, null, 2));
    props.onStatusChange({
      status: 'done',
      data: {
        optionGroupId,
        optionGroup
      }
    });
  };

  return (
    <div>
      <FlexibleOptionGroupSelector
        customizationConfig={props.customizationConfig}
        onSelect={handleExistingOptionGroupSelect}
      />
      <NewOptionGroupForm
        customizationConfig={props.customizationConfig}
        onStatusChange={(args) => {
          console.log('[OptionGroupForm] NewOptionGroupForm status change:', args);
        }}
      />
    </div>
  );
}

export default UpdatedOptionGroupForm;
