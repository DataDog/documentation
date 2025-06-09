import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { CustomizationConfig } from 'cdocs-data';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { OptionConfig, FormStatus } from '../../../../types';

/**
 * A form for creating a new OptionConfig, such as { id: "aws", label: "AWS"}.
 *
 * If the user can't find an existing option that matches their needs,
 * they can use this form to create a new one.
 */
function OptionBuilder(props: {
  customizationConfig: CustomizationConfig;
  onStatusChange: (p: { status: FormStatus; data?: OptionConfig }) => void;
}) {
  const blankOption: OptionConfig = {
    id: '',
    label: ''
  };

  // The form begins as "done" because the accordion is closed,
  // and the user may not intend to add a new option
  const [formStatus, setFormStatus] = useState<FormStatus>('done');

  const [newOptionConfig, setNewOptionConfig] = useState(blankOption);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleFormChange = (updatedOptionConfig: OptionConfig) => {
    // Update the form data
    setNewOptionConfig(updatedOptionConfig);

    // Update the form status
    const newFormStatus = 'pending';
    setFormStatus(newFormStatus);

    // Notify the parent component of any status change
    if (formStatus !== newFormStatus) {
      props.onStatusChange({ status: newFormStatus });
    }
  };

  const clearForm = () => {
    setNewOptionConfig(blankOption);
    setFormErrors([]);
  };

  const handleAccordionToggle = () => {
    // Open the accordion
    if (formStatus === 'done') {
      setFormStatus('waiting');
      props.onStatusChange({ status: 'waiting' });
      // Close the accordion
    } else {
      setFormStatus('done');
      clearForm();
      props.onStatusChange({ status: 'done' });
    }
  };

  // Reset the form to its initial state
  const handleFormCancel = () => {
    setNewOptionConfig(blankOption);
    setFormStatus('done');
    props.onStatusChange({ status: 'done' });
  };

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
      props.onStatusChange({ status: 'done', data: newOptionConfig });
      setFormStatus('done');
      clearForm();
    }
  };

  return (
    <Accordion
      expanded={formStatus !== 'done'}
      onChange={handleAccordionToggle}
      aria-controls="new-option-form"
      id="new-option-form-header-header"
      sx={{ border: '1.5px solid #b48fe1' }}
    >
      <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
        <Typography component="span">Add a new option</Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ paddingTop: '0px', marginTop: '-15px' }}>
        <h4>Create a new option</h4>

        {/* Option ID field */}
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

        {/* Option label field */}
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

        {/* Display form errors if any */}
        {formErrors.length === 0 && (
          <ul style={{ color: 'red' }}>
            {formErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </AccordionDetails>

      {/* Actions at the bottom of the form */}
      <AccordionActions>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={newOptionConfig.id === '' || newOptionConfig.label === ''}
        >
          Add option to selection
        </Button>
        <Button variant="contained" onClick={handleFormCancel}>
          Cancel
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

export default OptionBuilder;
