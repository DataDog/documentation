import { useState } from 'react';
import { CustomizationConfig } from 'cdocs-data';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { TraitConfig } from '../../../types';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { FormStatus } from '../../../types';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

/**
 * A form that allows the user to create a new trait.
 */
function CreateTraitForm(props: {
  customizationConfig: CustomizationConfig;
  onStatusChange: (p: { status: FormStatus; data?: TraitConfig }) => void;
}) {
  const blankTraitConfig: TraitConfig = {
    id: '',
    label: '',
    internal_notes: ''
  };

  const [newTraitConfig, setNewTraitConfig] = useState<TraitConfig>(blankTraitConfig);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [formStatus, setFormStatus] = useState<FormStatus>('done');

  const clearForm = () => {
    setNewTraitConfig(blankTraitConfig);
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

    // TODO: Use Zod to validate the ID pattern

    if (props.customizationConfig.traitsById[newTraitConfig.id]) {
      errors.push('Trait ID is already taken. Did you mean to select an existing trait?');
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
        props.onStatusChange({ status: newFormStatus, data: newTraitConfig });
      }

      // Close the accordion
      setFormStatus('done');

      clearForm();
    }
  };

  const handleFormChange = (updatedTraitConfig: TraitConfig) => {
    // Update the form data
    setNewTraitConfig(updatedTraitConfig);
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
          <Typography component="span">Add a new trait</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ paddingTop: '0px', marginTop: '-15px' }}>
          <h3>Create a new trait</h3>
          <p>
            Trait ID
            <TextField
              value={newTraitConfig.id}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleFormChange({
                  ...newTraitConfig,
                  id: e.target.value
                });
              }}
              variant="outlined"
              placeholder="e.g., prog_lang"
              fullWidth
              required
            />
          </p>
          <p>
            Trait label
            <TextField
              value={newTraitConfig.label}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleFormChange({
                  ...newTraitConfig,
                  label: e.target.value
                });
              }}
              variant="outlined"
              placeholder="e.g., Programming language"
              fullWidth
              required
            />
          </p>
          <p>
            Internal notes (optional)
            <TextField
              value={newTraitConfig.internal_notes}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleFormChange({
                  ...newTraitConfig,
                  internal_notes: e.target.value
                });
              }}
              variant="outlined"
              placeholder="e.g., The customer's something or other. For example, This or That. Use some_other_trait instead if xyz."
              fullWidth
              multiline
              rows={4}
            />
          </p>
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
            disabled={formStatus !== 'pending' || !newTraitConfig.id || !newTraitConfig.label}
            variant="contained"
            color="primary"
            sx={{ alignSelf: 'flex-start', backgroundColor: '#632ca6' }}
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

export default CreateTraitForm;
