import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CustomizationConfig } from 'cdocs-data';
import CreateTraitForm from './CreateTraitForm';
import { FormStatus, TraitConfig } from '../../../types';

/**
 * The shape of a trait choice in the Autocomplete dropdown.
 */
interface TraitChoice {
  label: string;
  value: string;
}

/**
 * A searchable dropdown for selecting a trait, with the ability to create a new trait.
 */
export default function FlexibleTraitSelector(props: {
  selectedTraitId?: string;
  customizationConfig: CustomizationConfig;
  onStatusChange: (p: { status: FormStatus; data?: TraitConfig }) => void;
}) {
  /**
   * Given a record of traits by ID, build a list of choices for the Autocomplete component.
   * Each choice includes the trait label, ID, and any internal notes.
   */
  const buildChoices = (traitsById: Record<string, TraitConfig>) => {
    return Object.keys(traitsById).map((traitId) => {
      const trait = traitsById[traitId];
      const hasNotes = trait.internal_notes && trait.internal_notes.length > 0;
      const label = `${trait.label} (\`${trait.id}\`)${hasNotes ? `: ${trait.internal_notes}` : ''}`;
      return { label, value: traitId };
    });
  };

  /**
   * Build the initial selection for the Autocomplete component (the selection
   * that the component should display as selected before the user does anything).
   *
   * If the user is creating a new trait, this is null.
   * If the user is editing an existing filter, this is whichever trait was
   * previously selected for the filter.
   */
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

  /**
   * When the user selects a trait from the dropdown, update the selected trait
   * and notify the parent component of the change.
   */
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

  /**
   * When the user creates and saves a new trait, add it to the known traits,
   * update the selected dropdown choice, and notify the parent component.
   */
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
