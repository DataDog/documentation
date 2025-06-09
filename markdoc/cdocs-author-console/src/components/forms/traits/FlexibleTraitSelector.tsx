import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CustomizationConfig } from 'cdocs-data';
import CreateTraitForm from './CreateTraitForm';
import { FormStatus, TraitConfig } from '../../../types';

interface TraitChoice {
  label: string;
  value: string;
}

export default function FlexibleTraitSelector(props: {
  selectedTraitId?: string;
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

  const buildInitialSelection = (): TraitChoice | null => {
    if (props.selectedTraitId) {
      const selectedTrait = props.customizationConfig.traitsById[props.selectedTraitId];
      if (selectedTrait) {
        const initialOption: TraitChoice = {
          label: `${selectedTrait.label} (\`${selectedTrait.id}\`)${
            selectedTrait.internal_notes ? `: ${selectedTrait.internal_notes}` : ''
          }`,
          value: selectedTrait.id
        };
        return initialOption;
      } else {
        console.warn(`Trait with ID ${props.selectedTraitId} not found in customizationConfig`);
      }
    }
    return null;
  };

  const [traitsById, setTraitsById] = useState<Record<string, TraitConfig>>(props.customizationConfig.traitsById);
  const [selectedTraitOption, setSelectedTraitOption] = useState<TraitChoice | null>(buildInitialSelection());

  const handleSelection = (_event: React.SyntheticEvent, selection: TraitChoice | null) => {
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
            params.inputProps.placeholder = 'Type here to search existing traits';
          }
          return <TextField {...params} />;
        }}
        onChange={handleSelection}
      />
      <CreateTraitForm
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
