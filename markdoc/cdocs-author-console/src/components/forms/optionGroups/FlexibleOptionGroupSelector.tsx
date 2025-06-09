import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CustomizationConfig } from 'cdocs-data';
import { FormStatus, OptionGroup } from '../../../types';
import OptionGroupBuilder from './OptionGroupBuilder';

interface OptionGroupChoice {
  label: string;
  value: string;
}

export default function FlexibleOptionGroupSelector(props: {
  selectedOptionGroupId?: string;
  customizationConfig: CustomizationConfig;
  onStatusChange: (p: { status: FormStatus; data?: { optionGroupId: string; optionGroup: OptionGroup } }) => void;
}) {
  const [optionGroupsById, setOptionGroupsById] = useState<Record<string, OptionGroup>>(
    props.customizationConfig.optionGroupsById
  );

  const buildOptionGroupLabel = (p: { optionGroupId: string; optionGroup: OptionGroup }) => {
    return `\`${p.optionGroupId}\`: ${p.optionGroup.map((option) => option.label).join(', ')}`;
  };

  const buildChoices = (optionGroupsById: Record<string, OptionGroup>): OptionGroupChoice[] => {
    return Object.keys(optionGroupsById).map((optionGroupId) => {
      const options = optionGroupsById[optionGroupId];
      const label = buildOptionGroupLabel({ optionGroupId, optionGroup: options });
      return { label, value: optionGroupId };
    });
  };

  const buildInitialSelection = (): OptionGroupChoice | null => {
    if (props.selectedOptionGroupId) {
      const selectedOptionGroup = optionGroupsById[props.selectedOptionGroupId];
      if (selectedOptionGroup) {
        return {
          label: buildOptionGroupLabel({
            optionGroupId: props.selectedOptionGroupId,
            optionGroup: selectedOptionGroup
          }),
          value: props.selectedOptionGroupId
        };
      } else {
        console.warn(`Option group with ID ${props.selectedOptionGroupId} not found in customizationConfig`);
      }
    }
    return null;
  };

  const [selectedOptionGroup, setSelectedOptionGroup] = useState<OptionGroupChoice | null>(buildInitialSelection());

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
            params.inputProps.placeholder = 'Type here to search existing option groups';
          }
          return <TextField {...params} />;
        }}
        onChange={handleOptionGroupIdChange}
      />
      <OptionGroupBuilder
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
