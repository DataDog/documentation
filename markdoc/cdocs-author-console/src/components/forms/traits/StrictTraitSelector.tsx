import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CustomizationConfig } from 'cdocs-data';

/**
 * A searchable dropdown for selecting from existing traits.
 * Does not include the ability to create a new trait.
 */
export default function StrictTraitSelector(props: {
  customizationConfig: CustomizationConfig;
  onSave: (traitId: string) => void;
}) {
  const traitsById = props.customizationConfig.traitsById;

  // Build the options for the Autocomplete component
  const traitOptions = Object.keys(traitsById).map((traitId) => {
    const trait = traitsById[traitId];
    const hasNotes = trait.internal_notes && trait.internal_notes.length > 0;
    const label = `${trait.label} (\`${trait.id}\`)${hasNotes ? `: ${trait.internal_notes}` : ''}`;
    return { label, value: trait.id };
  });

  const [localTraitId, setLocalTraitId] = useState<string | null>(null);

  // When the selected trait changes, update the local state and call the onSave callback
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
            params.inputProps.placeholder = 'Type here to search available traits';
          }
          return <TextField {...params} />;
        }}
        onChange={handleTraitIdChange}
      />
    </div>
  );
}
