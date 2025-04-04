import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CustomizationConfig } from 'cdocs-data';

export default function OptionSelector(props: {
  customizationConfig: CustomizationConfig;
  onSelect: (optionId: string) => void;
}) {
  const optionsById = props.customizationConfig.optionsById;

  const dropdownChoices = Object.keys(optionsById).map((optionId) => {
    const option = optionsById[optionId];
    const label = `${option.label} (\`${optionId}\`)`;
    return { label, value: optionId };
  });

  const [localOptionId, setLocalOptionId] = useState<string | null>(null);

  const handleOptionIdChange = (_event: React.SyntheticEvent, selection: { label: string; value: string } | null) => {
    const optionId = selection?.value || '';
    if (optionId === localOptionId) {
      return;
    }
    setLocalOptionId(optionId);
    props.onSelect(optionId);
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
        onChange={handleOptionIdChange}
      />
    </div>
  );
}
