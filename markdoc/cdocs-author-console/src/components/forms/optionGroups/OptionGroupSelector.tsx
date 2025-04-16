import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CustomizationConfig } from 'cdocs-data';

export default function OptionGroupSelector(props: {
  customizationConfig: CustomizationConfig;
  onSelect: (optionGroupId: string) => void;
}) {
  const optionGroupsById = props.customizationConfig.optionGroupsById;

  const dropdownChoices = Object.keys(optionGroupsById).map((optionGroupId) => {
    const options = optionGroupsById[optionGroupId];
    const label = `\`${optionGroupId}\`: ${options.map((option) => option.label).join(', ')}`;
    return { label, value: optionGroupId };
  });

  const [localOptionGroupId, setLocalOptionGroupId] = useState<string | null>(null);
  const handleOptionGroupIdChange = (
    _event: React.SyntheticEvent,
    selection: { label: string; value: string } | null
  ) => {
    const optionGroupId = selection?.value || '';
    if (optionGroupId === localOptionGroupId) {
      return;
    }
    setLocalOptionGroupId(optionGroupId);
    props.onSelect(optionGroupId);
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        options={dropdownChoices}
        sx={{ width: '100%', marginBottom: '15px ' }}
        renderInput={(params) => {
          if (params.inputProps.value === '') {
            params.inputProps.placeholder = 'Type here to search';
          }
          return <TextField {...params} />;
        }}
        onChange={handleOptionGroupIdChange}
      />
    </div>
  );
}
