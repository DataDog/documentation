import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CustomizationConfig } from 'cdocs-data';
import NewTraitForm from './NewTraitForm';
import { FormStatus, TraitConfig } from '../../../types';

export default function FlexibleTraitSelector(props: {
  customizationConfig: CustomizationConfig;
  onStatusChange: (p: { status: FormStatus; data?: TraitConfig }) => void;
}) {
  const buildChoices = (traitsById: Record<string, TraitConfig>) => {
    return Object.keys(traitsById).map((traitId) => {
      const trait = traitsById[traitId];
      const hasNotes = trait.internal_notes && trait.internal_notes.length > 0;
      const label = `${trait.label} (\`${trait.id}\`)${hasNotes ? `: ${trait.internal_notes}` : ''}`;
      return { label, value: traitId };
    });
  };

  const [traitsById, setTraitsById] = useState<Record<string, TraitConfig>>(props.customizationConfig.traitsById);
  const [selectedTraitOption, setSelectedTraitOption] = useState<{ label: string; value: string } | null>(null);

  const handleSelection = (_event: React.SyntheticEvent, selection: { label: string; value: string } | null) => {
    setSelectedTraitOption(selection);

    if (selection) {
      const trait = traitsById[selection.value as keyof typeof traitsById];
      props.onStatusChange({
        status: 'done',
        data: trait
      });
    }
  };

  const handleNewTraitSave = (traitConfig: TraitConfig) => {
    console.log('Handling new trait save:', traitConfig);

    // Add the new trait to the known traits
    setTraitsById((prev) => ({
      ...prev,
      [traitConfig.id]: traitConfig
    }));

    // Update the selected dropdown choice
    setSelectedTraitOption({ label: `${traitConfig.label} (\`${traitConfig.id}\`)`, value: traitConfig.id });
    props.onStatusChange({ status: 'done', data: traitConfig });
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        options={buildChoices(traitsById)}
        value={selectedTraitOption}
        sx={{ width: '100%', marginBottom: '15px ' }}
        renderInput={(params) => {
          if (params.inputProps.value === '') {
            params.inputProps.placeholder = 'Type here to search available traits';
          }
          return <TextField {...params} />;
        }}
        onChange={handleSelection}
      />
      <NewTraitForm
        customizationConfig={props.customizationConfig}
        onStatusChange={(p) => {
          console.log('NewTraitForm status change:', p);
          if (p.status === 'done' && p.data) {
            handleNewTraitSave(p.data);
          } else {
            // props.onStatusChange(p);
          }
        }}
      />
    </div>
  );
}
