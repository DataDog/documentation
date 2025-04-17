import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CustomizationConfig } from 'cdocs-data';
import NewTraitForm from './NewTraitForm';

export default function FlexibleTraitSelector(props: {
  customizationConfig: CustomizationConfig;
  onSave: (traitId: string) => void;
}) {
  const traitsById = props.customizationConfig.traitsById;

  const traitOptions = Object.keys(traitsById).map((traitId) => {
    const trait = traitsById[traitId];
    const hasNotes = trait.internal_notes && trait.internal_notes.length > 0;
    const label = `${trait.label} (\`${trait.id}\`)${hasNotes ? `: ${trait.internal_notes}` : ''}`;
    return { label, value: trait.id };
  });

  const [localTraitId, setLocalTraitId] = useState<string | null>(null);
  const handleTraitIdChange = (_event: React.SyntheticEvent, selection: { label: string; value: string } | null) => {
    const traitId = selection?.value || '';
    if (traitId === localTraitId) {
      return;
    }
    setLocalTraitId(traitId);
    props.onSave(traitId);
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        options={traitOptions}
        sx={{ width: '100%', marginBottom: '15px ' }}
        renderInput={(params) => {
          if (params.inputProps.value === '') {
            params.inputProps.placeholder = 'Type here to search';
          }
          return <TextField {...params} />;
        }}
        onChange={handleTraitIdChange}
      />
      <NewTraitForm customizationConfig={props.customizationConfig} />
    </div>
  );
}
