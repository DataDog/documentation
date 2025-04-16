import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { CustomizationConfig } from 'cdocs-data';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { OptionConfig } from '../../../../types';

function NewOptionForm(props: {
  customizationConfig: CustomizationConfig;
  onPending: () => void;
  onClean: () => void;
  onSave: (newOptionConfig: OptionConfig) => void;
}) {
  const blankOption: OptionConfig = {
    id: '',
    label: ''
  };

  const handleFormChange = (updatedOptionConfig: OptionConfig) => {
    const wasModified = newOptionConfig.id !== blankOption.id || newOptionConfig.label !== blankOption.label;
    const isModified = updatedOptionConfig.id !== blankOption.id || updatedOptionConfig.label !== blankOption.label;
    if (!wasModified && isModified) {
      props.onPending();
    }
    setNewOptionConfig(updatedOptionConfig);
  };

  const handleFormCancel = () => {
    setNewOptionConfig(blankOption);
    props.onClean();
  };

  const [newOptionConfig, setNewOptionConfig] = useState(blankOption);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [newOptionFormIsOpen, setNewOptionFormIsOpen] = useState(false);

  const validateFormData = () => {
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

  const handleSave = () => {
    const isValid = validateFormData();
    if (isValid) {
      props.onSave(newOptionConfig);
      setNewOptionConfig(blankOption);
      setNewOptionFormIsOpen(false);
    }
  };

  return (
    <Accordion
      expanded={newOptionFormIsOpen}
      onChange={() => {
        const optionIsInProgress = !newOptionFormIsOpen;
        setNewOptionFormIsOpen(optionIsInProgress);
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
              handleFormChange({
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
              handleFormChange({
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

        {formErrors.length === 0 && (
          <ul style={{ color: 'red' }}>
            {formErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </AccordionDetails>
      <AccordionActions>
        <Button onClick={handleSave} disabled={newOptionConfig.id === '' || newOptionConfig.label === ''}>
          Add option to selection
        </Button>
        <Button onClick={handleFormCancel}>Cancel</Button>
      </AccordionActions>
    </Accordion>
  );
}

export default NewOptionForm;
