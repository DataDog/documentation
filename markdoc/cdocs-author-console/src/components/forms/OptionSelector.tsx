import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CustomizationConfig } from 'cdocs-data';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

/**
 * Select multiple options from the customization config.
 * New options can be added.
 */
export default function OptionSelector(props: {
  customizationConfig: CustomizationConfig;
  onSelect: (options: OptionConfig[]) => void;
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
        label: option.label,
        internal_notes: option.internal_notes
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
    props.onSelect(getOptionConfigs(newSelections, updatedOptionsById));
  };

  const handleNewOptionSave = (newOptionConfig: OptionConfig) => {
    setNewOptionIds((prevNewOptionIds) => [...prevNewOptionIds, newOptionConfig.id]);
    // Add the new option to the known options
    const newOptionsById = { ...optionsById, [newOptionConfig.id]: newOptionConfig };
    // Add the new option to the list of selected options
    const newSelections = [...dropdownSelections, { label: newOptionConfig.label, value: newOptionConfig.id }];

    props.onSelect(getOptionConfigs(newSelections, newOptionsById));

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
      <NewOptionForm customizationConfig={props.customizationConfig} onSave={handleNewOptionSave} />
    </div>
  );
}

interface OptionConfig {
  id: string;
  label: string;
  internal_notes?: string;
}

function NewOptionForm(props: {
  customizationConfig: CustomizationConfig;
  onSave: (newOptionConfig: OptionConfig) => void;
}) {
  const blankOption: OptionConfig = {
    id: '',
    label: '',
    internal_notes: ''
  };
  const [newOptionConfig, setNewOptionConfig] = useState(blankOption);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [newOptionInProgress, setNewOptionInProgress] = useState(false);

  const validate = () => {
    let errors: string[] = [];
    if (newOptionConfig.id === '') {
      errors.push('Option ID is required.');
    }

    if (newOptionConfig.label === '') {
      errors.push('Option label is required.');
    }

    if (props.customizationConfig.optionsById[newOptionConfig.id]) {
      errors.push('Option ID is already taken. Did you mean to select an existing option?');
    }

    setFormErrors(errors);

    return errors.length === 0;
  };

  const handleSaveButtonClick = () => {
    const isValid = validate();
    if (isValid) {
      props.onSave(newOptionConfig);
      setNewOptionConfig(blankOption);
      setNewOptionInProgress(false);
    }
  };

  return (
    <Accordion
      expanded={newOptionInProgress}
      onChange={() => {
        setNewOptionInProgress(!newOptionInProgress);
      }}
      aria-controls="new-option-form"
      id="new-option-form-header-header"
    >
      <AccordionSummary expandIcon={<ArrowDropDownIcon />} aria-controls="panel3-content" id="panel3-header">
        <Typography component="span">An option I need is missing from the list.</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <h4>Create a new option</h4>
        <p>
          Option ID
          <TextField
            value={newOptionConfig.id}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewOptionConfig({
                ...newOptionConfig,
                id: e.target.value
              });
            }}
            variant="outlined"
            placeholder="e.g., amazon_ec2"
            fullWidth
            required
          />
        </p>
        <p>
          Option label
          <TextField
            value={newOptionConfig.label}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewOptionConfig({
                ...newOptionConfig,
                label: e.target.value
              });
            }}
            variant="outlined"
            placeholder="e.g., Amazon EC2"
            fullWidth
            required
          />
        </p>
        <p>
          Internal notes (optional)
          <TextField
            value={newOptionConfig.internal_notes}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewOptionConfig({
                ...newOptionConfig,
                internal_notes: e.target.value
              });
            }}
            variant="outlined"
            placeholder="e.g., Only use this if xyz option does not apply."
            fullWidth
            multiline
            rows={4}
          />
        </p>

        {formErrors.length === 0 && (
          <ul style={{ color: 'red' }}>
            {formErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </AccordionDetails>
      <AccordionActions>
        <Button onClick={handleSaveButtonClick} disabled={newOptionConfig.id === '' || newOptionConfig.label === ''}>
          Add option to selection
        </Button>
        <Button
          onClick={() => {
            setNewOptionInProgress(false);
          }}
        >
          Cancel
        </Button>
      </AccordionActions>
    </Accordion>
  );
}
