import { useState } from 'react';
import ExistingOptionGroupSelector from './ExistingOptionGroupSelector';
import { CustomizationConfig } from 'cdocs-data';
import FlexibleOptionSelector from './options/FlexibleOptionSelector';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormStatus } from '../../../types';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';
import { OptionGroup } from '../../../types';

/**
 * Allows the user to select an existing option group, or create a new one.
 */
function UpdatedOptionGroupForm(props: {
  customizationConfig: CustomizationConfig;
  onStatusChange: (p: { status: FormStatus; data?: { optionGroupId: string; optionGroup: OptionGroup } }) => void;
}) {
  const [optionGroupId, setOptionGroupId] = useState<string>('');
  const [optionGroup, setOptionGroup] = useState<OptionGroup>([]);
  const [formStatus, setFormStatus] = useState<FormStatus>('waiting');

  // The option selector is only needed if the user decides to create a new option group,
  // so it starts as 'done' because it may not be used.
  const [optionSelectorStatus, setOptionSelectorStatus] = useState<FormStatus>('done');

  const handleExistingOptionGroupSelect = (selectedOptionGroupId: string) => {
    const updatedOptionGroup = props.customizationConfig.optionGroupsById[selectedOptionGroupId];
    const newStatus = 'done';
    props.onStatusChange({
      status: newStatus,
      data: {
        optionGroupId: selectedOptionGroupId,
        optionGroup: updatedOptionGroup
      }
    });
    setOptionGroupId(selectedOptionGroupId);
    setOptionGroup(updatedOptionGroup);
    setFormStatus(newStatus);
  };

  const handleNewGroupSave = () => {
    console.log('[OptionGroupForm] Emitting', JSON.stringify({ optionGroupId, optionGroup }, null, 2));
    props.onStatusChange({
      status: 'done',
      data: {
        optionGroupId,
        optionGroup
      }
    });
  };

  return (
    <div>
      <ExistingOptionGroupSelector
        customizationConfig={props.customizationConfig}
        onSelect={handleExistingOptionGroupSelect}
      />
      {/* expanded={formStatus !== 'done'} */}
      {/* onChange={handleAccordionToggle} */}
      <Accordion
        sx={{ border: '1.5px solid #632ca6' }}
        aria-controls="new-option-group-form"
        id="new-option-group-form-header"
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
              setOptionGroupId(e.target.value);
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
              if (p.status === 'done' && p.data) {
                setOptionGroup(p.data.map((option, idx) => ({ ...option, default: idx === 0 })));
              }
              setOptionSelectorStatus(p.status);
            }}
          />
        </AccordionDetails>
        <AccordionActions>
          <Button variant="contained">Save</Button>
          <Button variant="contained">Cancel</Button>
        </AccordionActions>
      </Accordion>
      <Button
        disabled={!optionGroupId || optionGroup.length < 2 || optionSelectorStatus !== 'done'}
        sx={{ marginTop: '15px' }}
        variant="contained"
        onClick={handleNewGroupSave}
      >
        Save option group
      </Button>
    </div>
  );
}

export default UpdatedOptionGroupForm;

/*
<Accordion
      expanded={formStatus !== 'done'}
      onChange={handleAccordionToggle}
      aria-controls="new-option-group-form"
      id="new-option-group-form-header"
    >
      <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
        <Typography component="span">I can't find a suitable option group in the list.</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <h4>Create a new option group</h4>
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
        >
          Save
        </Button>
        <Button variant="contained">
          Cancel
        </Button>
      </AccordionActions>
    </Accordion>
*/
