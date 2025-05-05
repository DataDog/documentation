import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CustomizationConfig } from 'cdocs-data';
import { FormStatus, OptionGroup } from '../../../types';
import NewOptionGroupForm from './NewOptionGroupForm';

export default function FlexibleOptionGroupSelector(props: {
  customizationConfig: CustomizationConfig;
  onStatusChange: (p: { status: FormStatus; data?: { optionGroupId: string; optionGroup: OptionGroup } }) => void;
}) {
  const [optionGroupsById, setOptionGroupsById] = useState<Record<string, OptionGroup>>(
    props.customizationConfig.optionGroupsById
  );

  const buildOptionGroupLabel = (p: { optionGroupId: string; optionGroup: OptionGroup }) => {
    return `\`${p.optionGroupId}\`: ${p.optionGroup.map((option) => option.label).join(', ')}`;
  };

  const buildChoices = (optionGroupsById: Record<string, OptionGroup>): { label: string; value: string }[] => {
    return Object.keys(optionGroupsById).map((optionGroupId) => {
      const options = optionGroupsById[optionGroupId];
      const label = buildOptionGroupLabel({ optionGroupId, optionGroup: options });
      return { label, value: optionGroupId };
    });
  };

  const [selectedOptionGroup, setSelectedOptionGroup] = useState<{ label: string; value: string } | null>(null);

  const handleOptionGroupIdChange = (
    _event: React.SyntheticEvent,
    selection: { label: string; value: string } | null
  ) => {
    const optionGroupId = selection?.value || '';
    setSelectedOptionGroup({
      value: optionGroupId,
      label: buildOptionGroupLabel({ optionGroupId, optionGroup: optionGroupsById[optionGroupId] })
    });
    props.onStatusChange({
      status: 'done',
      data: {
        optionGroupId,
        optionGroup: optionGroupsById[optionGroupId]
      }
    });
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        options={buildChoices(optionGroupsById)}
        value={selectedOptionGroup}
        sx={{ width: '100%', marginBottom: '15px ' }}
        renderInput={(params) => {
          if (params.inputProps.value === '') {
            params.inputProps.placeholder = 'Type here to search available option groups';
          }
          return <TextField {...params} />;
        }}
        onChange={handleOptionGroupIdChange}
      />
      <NewOptionGroupForm
        customizationConfig={props.customizationConfig}
        onStatusChange={(p) => {
          if (p.status === 'done' && p.data) {
            const { optionGroupId, optionGroup } = p.data;
            setOptionGroupsById((prev) => ({
              ...prev,
              [optionGroupId]: optionGroup
            }));
            setSelectedOptionGroup({
              value: optionGroupId,
              label: buildOptionGroupLabel({ optionGroupId, optionGroup })
            });
            props.onStatusChange({
              status: 'done',
              data: {
                optionGroupId,
                optionGroup
              }
            });
          }
        }}
      />
    </div>
  );
}
