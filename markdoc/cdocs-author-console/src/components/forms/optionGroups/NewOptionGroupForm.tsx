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
      <h3>Option group ID</h3>
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
      <h3>Options</h3>
      <OptionSelector
        customizationConfig={props.customizationConfig}
        onStatusChange={(p) => {
          if (p.status === 'done' && p.data) {
            setOptionGroup(p.data.map((option, idx) => ({ ...option, default: idx === 0 })));
          }
          setOptionSelectionFormStatus(p.status);
        }}
      />
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
