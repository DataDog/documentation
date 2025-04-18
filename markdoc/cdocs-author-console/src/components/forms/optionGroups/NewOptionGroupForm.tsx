import { useState } from 'react';
import ExistingOptionGroupSelector from './ExistingOptionGroupSelector';
import { CustomizationConfig } from 'cdocs-data';
import OptionSelector from './options/OptionSelector';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormStatus } from '../../../types';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';

// TODO: Export all of these types from cdocs-data,
// it doesn't make sense to have to redeclare them here
export type OptionGroup = {
  label: string;
  id: string;
  default?: boolean | undefined;
}[];

/**
 * Allows the user to select an existing option group, or create a new one.
 */
function NewOptionGroupForm(props: {
  customizationConfig: CustomizationConfig;
  onSave: (p: { optionGroupId: string; optionGroup: OptionGroup }) => void;
}) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [optionGroupId, setOptionGroupId] = useState<string>('');
  const [optionGroup, setOptionGroup] = useState<OptionGroup>([]);
  const [optionSelectionFormStatus, setOptionSelectionFormStatus] = useState<FormStatus>('done');

  const handleExistingOptionGroupSelect = (selectedOptionGroupId: string) => {
    const updatedOptionGroup = props.customizationConfig.optionGroupsById[selectedOptionGroupId];
    console.log('[OptionGroupForm] Emitting', JSON.stringify({ optionGroupId, optionGroup }, null, 2));
    props.onSave({
      optionGroupId: selectedOptionGroupId,
      optionGroup: updatedOptionGroup
    });
    setOptionGroupId(selectedOptionGroupId);
    setOptionGroup(updatedOptionGroup);
  };

  const handleNewGroupSave = () => {
    console.log('[OptionGroupForm] Emitting', JSON.stringify({ optionGroupId, optionGroup }, null, 2));
    props.onSave({
      optionGroupId,
      optionGroup
    });
  };

  const handleTabChange = (_event: React.SyntheticEvent, currentTabIndex: number) => {
    setCurrentTabIndex(currentTabIndex);
    // Handle a switch to "Add new" tab
    if (currentTabIndex === 1) {
      setOptionGroupId('');
      setOptionGroup([]);
      setOptionSelectionFormStatus('waiting');
    } else {
      setOptionSelectionFormStatus('done');
    }
  };

  return (
    <div>
      <ExistingOptionGroupSelector
        customizationConfig={props.customizationConfig}
        onSelect={handleExistingOptionGroupSelect}
      />
      {/* expanded={formStatus !== 'done'} */}
      {/* onChange={handleAccordionToggle} */}
      <Accordion aria-controls="new-option-group-form" id="new-option-group-form-header">
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
          <OptionSelector
            customizationConfig={props.customizationConfig}
            onStatusChange={(p) => {
              if (p.status === 'done' && p.data) {
                setOptionGroup(p.data.map((option, idx) => ({ ...option, default: idx === 0 })));
              }
              setOptionSelectionFormStatus(p.status);
            }}
          />
        </AccordionDetails>
        <AccordionActions>
          <Button variant="contained">Save</Button>
          <Button variant="contained">Cancel</Button>
        </AccordionActions>
      </Accordion>
      <Button
        disabled={!optionGroupId || optionGroup.length < 2 || optionSelectionFormStatus !== 'done'}
        sx={{ marginTop: '15px' }}
        variant="contained"
        onClick={handleNewGroupSave}
      >
        Save option group
      </Button>
    </div>
  );
}

export default NewOptionGroupForm;

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
