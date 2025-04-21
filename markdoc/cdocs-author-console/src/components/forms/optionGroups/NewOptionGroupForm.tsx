import { useState } from 'react';
import { CustomizationConfig } from 'cdocs-data';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { FormStatus } from '../../../types';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { OptionGroup } from '../../../types';
import FlexibleOptionSelector from './options/FlexibleOptionSelector';

/**
 * A form that allows the user to create a new option group.
 */
function NewOptionGroupForm(props: {
  customizationConfig: CustomizationConfig;
  onStatusChange: (p: {
    status: FormStatus;
    data?: {
      optionGroupId: string;
      optionGroup: OptionGroup;
    };
  }) => void;
}) {
  // This form is only used when it's expanded, so it starts as 'done' because it may not be used.
  const [formStatus, setFormStatus] = useState<FormStatus>('done');
  const [flexibleOptionSelectorStatus, setFlexibleOptionSelectorStatus] = useState<FormStatus>('done');

  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [optionGroupId, setOptionGroupId] = useState<string>('');
  const [optionGroup, setOptionGroup] = useState<OptionGroup>([]);

  const clearForm = () => {
    setOptionGroupId('');
    setOptionGroup([]);
    setFormErrors([]);
  };

  const cancelForm = () => {
    if (formStatus !== 'done') {
      setFormStatus('done');
      props.onStatusChange({ status: 'done' });
    }
    clearForm();
  };

  const handleAccordionToggle = () => {
    // Open the accordion
    if (formStatus === 'done') {
      setFormStatus('waiting');
      props.onStatusChange({ status: 'waiting' });
      // Close the accordion (acts as a cancel button)
    } else {
      cancelForm();
    }
  };

  const validateForm = () => {
    let errors: string[] = [];

    if (optionGroupId.trim() === '') {
      errors.push('Option group ID is required.');
    }

    if (optionGroup.length === 0) {
      errors.push('You must choose at least two options for the option group.');
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSave = () => {
    const isValid = validateForm();

    if (isValid) {
      const newFormStatus = 'done';
      if (formStatus !== newFormStatus) {
        setFormStatus(newFormStatus);
        // Notify the parent component of any status change
        props.onStatusChange({ status: newFormStatus, data: { optionGroupId, optionGroup } });
      }

      // Close the accordion
      setFormStatus('done');

      clearForm();
    }
  };

  const handleFormChange = (updatedFormData: { optionGroupId: string; optionGroup: OptionGroup }) => {
    // Update the form data
    setOptionGroupId(updatedFormData.optionGroupId);
    setOptionGroup(updatedFormData.optionGroup);

    // Update the form status
    const newFormStatus = 'pending';
    setFormStatus(newFormStatus);

    // Notify the parent component of any status change
    if (formStatus !== newFormStatus) {
      props.onStatusChange({ status: newFormStatus });
    }
  };

  return (
    <div>
      <Accordion
        sx={{ border: '1.5px solid #632ca6' }}
        expanded={formStatus !== 'done'}
        onChange={handleAccordionToggle}
      >
        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
          <Typography component="span">I can't find a suitable option group in the list.</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <h3>Create a new option group</h3>
          <h4>Option group ID</h4>
          <TextField
            value={optionGroupId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleFormChange({ optionGroupId: e.target.value, optionGroup });
            }}
            variant="outlined"
            placeholder="e.g., rum_sdk_platform_options"
            fullWidth
            required
          />
          <h4>Options</h4>
          <FlexibleOptionSelector
            customizationConfig={props.customizationConfig}
            onStatusChange={(p) => {
              console.log('[NewOptionGroupForm] FlexibleOptionSelector status change:', p);
              if (p.status === 'done' && p.data) {
                setOptionGroup(p.data.map((option, idx) => ({ ...option, default: idx === 0 })));
              }
              setFlexibleOptionSelectorStatus(p.status);
            }}
          />
          {formErrors.length > 0 && (
            <div style={{ color: 'red' }}>
              <ul>
                {formErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </AccordionDetails>
        <AccordionActions>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            sx={{ alignSelf: 'flex-start', backgroundColor: '#632ca6' }}
            disabled={flexibleOptionSelectorStatus !== 'done'}
          >
            Save
          </Button>
          <Button variant="contained" onClick={cancelForm}>
            Cancel
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}

export default NewOptionGroupForm;
