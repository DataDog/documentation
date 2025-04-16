import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CustomizationConfig } from 'cdocs-data';
import NewOptionForm from './NewOptionForm';
import { OptionConfig } from '../../../../types';

/**
 * Select multiple options from the customization config.
 * New options can be added.
 */
export default function OptionSelector(props: {
  customizationConfig: CustomizationConfig;
  onPending: () => void;
  onSave: (options: OptionConfig[]) => void;
  onCancel: () => void;
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
    props.onSave(getOptionConfigs(newSelections, updatedOptionsById));
  };

  const handleNewOptionSave = (newOptionConfig: OptionConfig) => {
    setNewOptionIds((prevNewOptionIds) => [...prevNewOptionIds, newOptionConfig.id]);
    // Add the new option to the known options
    const newOptionsById = { ...optionsById, [newOptionConfig.id]: newOptionConfig };
    // Add the new option to the list of selected options
    const newSelections = [...dropdownSelections, { label: newOptionConfig.label, value: newOptionConfig.id }];

    props.onSave(getOptionConfigs(newSelections, newOptionsById));

    setOptionsById(newOptionsById);
    setDropdownSelections(newSelections);
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
            params.inputProps.placeholder = 'Type here to search';
          }
          return <TextField {...params} />;
        }}
        onChange={handleSelectionChange}
      />
      <NewOptionForm
        customizationConfig={props.customizationConfig}
        onSave={handleNewOptionSave}
        onPending={props.onPending}
        onCancel={props.onCancel}
      />
    </div>
  );
}
