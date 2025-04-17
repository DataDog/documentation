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
 * A form that allows the user to choose an existing trait ID, or configure a new trait.
 */
function NewTraitForm(props: { customizationConfig: CustomizationConfig }) {
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

  const handleAccordionToggle = () => {
    // Open the accordion
    if (formStatus === 'done') {
      setFormStatus('waiting');
      // Close the accordion
    } else {
      setFormStatus('done');
      clearForm();
    }
  };

  const validateForm = () => {
    let errors: string[] = [];

    if (!newTraitConfig.id) {
      errors.push('Trait ID is required.');
    }
    if (!newTraitConfig.label) {
      errors.push('Trait label is required.');
    }

    if (props.customizationConfig.traitsById[newTraitConfig.id]) {
      errors.push('Trait ID is already taken. Did you mean to select an existing trait?');
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSave = () => {
    const isValid = validateForm();

    if (isValid) {
      setFormStatus('done');
    }
  };

  const handleFormCancel = () => {
    clearForm();
    setFormStatus('done');
  };

  const handleFormChange = (updatedTraitConfig: TraitConfig) => {
    // Update the form data
    setNewTraitConfig(updatedTraitConfig);
    // Update the form status
    const newFormStatus = 'pending';
    setFormStatus(newFormStatus);
  };

  return (
    <div>
      <Accordion expanded={formStatus !== 'done'} onChange={handleAccordionToggle}>
        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
          <Typography component="span">An option I need is missing from the list.</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
          <Button variant="contained" onClick={handleFormCancel}>
            Cancel
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}

export default NewTraitForm;

/*
<Accordion
      expanded={formStatus !== 'done'}
      onChange={handleAccordionToggle}
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
*/
