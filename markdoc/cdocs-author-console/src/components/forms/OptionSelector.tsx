import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CustomizationConfig } from 'cdocs-data';

export default function OptionSelector(props: {
  customizationConfig: CustomizationConfig;
  onSelect: (optionIds: string[]) => void;
}) {
  const optionsById = props.customizationConfig.optionsById;

  const dropdownChoices = Object.keys(optionsById).map((optionId) => {
    const option = optionsById[optionId];
    const label = `${option.label} (\`${optionId}\`)`;
    return { label, value: optionId };
  });

  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);

  const handleOptionIdChange = (
    _event: React.SyntheticEvent,
    selections: { label: string; value: string }[] | null
  ) => {
    const optionIds = selections ? selections.map((selection) => selection.value) : [];
    setSelectedOptionIds(optionIds);
    props.onSelect(optionIds);
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        multiple={true}
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
      <NewOptionForm customizationConfig={props.customizationConfig} />
    </div>
  );
}

function NewOptionForm(props: { customizationConfig: CustomizationConfig }) {
  return (
    <div>
      <h1>New option form</h1>
      <p>This is not yet implemented.</p>
    </div>
  );
}
