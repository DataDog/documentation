import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CustomizationConfig } from 'cdocs-data';
import NewOptionForm from './NewOptionForm';
import { OptionConfig, FormStatus } from '../../../../types';

/**
 * Select multiple options from the customization config.
 * New options can be added.
 */
export default function OptionSelector(props: {
  customizationConfig: CustomizationConfig;
  onStatusChange: (p: { status: FormStatus; data?: OptionConfig[] }) => void;
}) {
  const getDropdownChoices = (optionsById: Record<string, OptionConfig>) => {
    const newDropdownChoices = Object.keys(optionsById).map((optionId) => {
      const option = optionsById[optionId];
      return { label: option.label, value: optionId };
    });
    return newDropdownChoices;
  };

  const [newOptionIds, setNewOptionIds] = useState<string[]>([]);
  const [optionsById, setOptionsById] = useState<Record<string, OptionConfig>>(props.customizationConfig.optionsById);
  const [dropdownSelections, setDropdownSelections] = useState<{ label: string; value: string }[]>([]);
  const [formStatus, setFormStatus] = useState<FormStatus>('waiting');

  const getOptionConfigs = (
    selections: { label: string; value: string }[],
    optionsById: Record<string, OptionConfig>
  ) => {
    const selectedOptions = selections.map((selection) => {
      const option = optionsById[selection.value];
      if (!option) {
        throw new Error(`Option with ID ${selection.value} not found in optionsById.`);
      }
      return {
        id: selection.value,
        label: option.label
      };
    });
    return selectedOptions;
  };

  const handleSelectionChange = (_event: React.SyntheticEvent, newSelections: { label: string; value: string }[]) => {
    // Determine whether any new (currently nonexistent) options have been deselected
    const deselectedOptionIds = dropdownSelections
      .filter((selection) => !newSelections.some((newSelection) => newSelection.value === selection.value))
      .map((selection) => selection.value);

    const deselectedNewOptionIds = deselectedOptionIds.filter((optionId) => newOptionIds.includes(optionId));

    console.log('deselectedNewOptionIds', deselectedNewOptionIds);

    let updatedOptionsById = { ...optionsById };
    let updatedNewOptionIds = [...newOptionIds];

    deselectedNewOptionIds.forEach((deselectedNewOptionId) => {
      delete updatedOptionsById[deselectedNewOptionId];
      delete updatedNewOptionIds[updatedNewOptionIds.indexOf(deselectedNewOptionId)];
    });

    setNewOptionIds(updatedNewOptionIds);
    setOptionsById(updatedOptionsById);
    setDropdownSelections(newSelections);

    // Save the current selections
    setFormStatus('done');
    props.onStatusChange({ status: 'done', data: getOptionConfigs(newSelections, updatedOptionsById) });
  };

  // Handle any status changes from the nested new option form
  const handleNewOptionStatusChange = (p: { status: FormStatus; data?: OptionConfig }) => {
    // The user has opened the form or is otherwise editing it
    if (p.status === 'waiting') {
      const newFormStatus = 'waiting';
      if (formStatus !== newFormStatus) {
        setFormStatus(newFormStatus);
        // Notify the parent component of any status change
        props.onStatusChange({ status: newFormStatus });
      }
    }
    // The form has unsaved changes
    else if (p.status === 'pending') {
      const newFormStatus = 'pending';
      setFormStatus(newFormStatus);
      // Notify the parent component of any status change
      if (formStatus !== newFormStatus) {
        props.onStatusChange({ status: newFormStatus });
      }
    }
    // The user has canceled the form
    else if (p.status === 'done' && p.data === undefined) {
      let newFormStatus: FormStatus;
      if (dropdownSelections.length === 0) {
        newFormStatus = 'waiting';
      } else {
        newFormStatus = 'done';
      }
      setFormStatus(newFormStatus);
      // Notify the parent component of any status change --
      // no need to send data, as any existing selections were sent on selection change
      if (formStatus !== newFormStatus) {
        props.onStatusChange({ status: newFormStatus });
      }
    }
    // The user has saved changes
    if (p.status === 'done' && p.data) {
      setNewOptionIds((prevNewOptionIds) => [...prevNewOptionIds, p.data!.id]);
      // Add the new option to the known options
      const newOptionsById = { ...optionsById, [p.data.id]: p.data };
      // Add the new option to the list of selected options
      const newSelections = [...dropdownSelections, { label: p.data.label, value: p.data.id }];

      setFormStatus('done');
      // Save the current selections
      props.onStatusChange({ status: 'done', data: getOptionConfigs(newSelections, newOptionsById) });

      // Update the state with the new options and selections
      setOptionsById(newOptionsById);
      setDropdownSelections(newSelections);
    }
  };

  return (
    <div>
      <p>Use the searchable dropdown below to select options.</p>
      <Autocomplete
        disablePortal
        value={dropdownSelections}
        multiple={true}
        options={getDropdownChoices(optionsById)}
        sx={{ width: '100%', marginBottom: '15px ' }}
        renderInput={(params) => {
          if (params.inputProps.value === '') {
            params.inputProps.placeholder = 'Type here to search available options';
          }
          return <TextField {...params} />;
        }}
        onChange={handleSelectionChange}
      />
      <NewOptionForm customizationConfig={props.customizationConfig} onStatusChange={handleNewOptionStatusChange} />
    </div>
  );
}
