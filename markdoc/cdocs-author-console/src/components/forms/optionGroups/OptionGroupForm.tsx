import { useState } from 'react';
import ExistingOptionGroupSelector from './ExistingOptionGroupSelector';
import { CustomizationConfig } from 'cdocs-data';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FlexibleOptionSelector from './options/FlexibleOptionSelector';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormStatus } from '../../../types';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ paddingTop: '20px', paddingBottom: '20px' }}>{children}</Box>}
    </div>
  );
}

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
function OptionGroupForm(props: {
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
      <Tabs
        value={currentTabIndex}
        onChange={handleTabChange}
        aria-label="basic tabs example"
        TabIndicatorProps={{ style: { backgroundColor: '#632ca6' } }}
        textColor="inherit"
      >
        <Tab disableRipple label="Select from existing" {...a11yProps(0)} sx={{ color: '#632ca6' }} />
        <Tab disableRipple label="Add new" {...a11yProps(1)} sx={{ color: '#632ca6' }} />
      </Tabs>
      <CustomTabPanel value={currentTabIndex} index={0}>
        <ExistingOptionGroupSelector
          customizationConfig={props.customizationConfig}
          onSelect={handleExistingOptionGroupSelect}
        />
      </CustomTabPanel>
      <CustomTabPanel value={currentTabIndex} index={1}>
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
        <FlexibleOptionSelector
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
      </CustomTabPanel>
    </div>
  );
}

export default OptionGroupForm;
