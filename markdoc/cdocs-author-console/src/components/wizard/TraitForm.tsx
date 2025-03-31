import { useState } from 'react';
import { CustomizationConfig, FilterConfig, FilterConfigSchema } from 'cdocs-data';
import TraitSelector from '../selectors/TraitSelector';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { TraitConfig } from './types';

// TODO: DRY up tabs across the console
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

/**
 * A form that allows the user to choose an existing trait ID, or configure a new trait.
 */
function TraitForm({
  customizationConfig,
  onUpdate
}: {
  customizationConfig: CustomizationConfig;
  onUpdate: ({ traitId, newTraitConfig }: { traitId: string; newTraitConfig?: TraitConfig }) => void;
}) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const [newTraitConfig, setNewTraitConfig] = useState<TraitConfig>({
    id: '',
    label: '',
    internal_notes: ''
  });
  const [newTraitError, setNewTraitError] = useState<string | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, currentTabIndex: number) => {
    setCurrentTabIndex(currentTabIndex);
  };

  const handleExistingTraitSelect = (traitId: string) => {
    onUpdate({ traitId });
  };

  const handleNewTraitSave = () => {
    let error: string | null = null;

    console.log('Handling new trait save, newTraitConfig: ', newTraitConfig);

    if (!newTraitConfig.id || !newTraitConfig.label) {
      error = 'Trait ID and trait label are required.';
    } else if (customizationConfig.traitsById[newTraitConfig.id]) {
      error = 'Trait ID is already taken. Did you mean to select an existing trait?';
    } else {
      onUpdate({
        traitId: newTraitConfig.id,
        newTraitConfig
      });
      setNewTraitHasChanges(false);
    }

    setNewTraitError(error);
  };

  const [newTraitHasChanges, setNewTraitHasChanges] = useState<boolean>(false);

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
        <TraitSelector customizationConfig={customizationConfig} onSelect={handleExistingTraitSelect} />
      </CustomTabPanel>
      <CustomTabPanel value={currentTabIndex} index={1}>
        <p>
          Trait ID
          <TextField
            value={newTraitConfig.id}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewTraitHasChanges(true);
              setNewTraitConfig({
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
              setNewTraitHasChanges(true);
              setNewTraitConfig({
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
              setNewTraitHasChanges(true);
              setNewTraitConfig({
                ...newTraitConfig,
                internal_notes: e.target.value
              });
            }}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
        </p>
        {newTraitError && <div style={{ color: 'red' }}>{newTraitError}</div>}

        <Button
          onClick={handleNewTraitSave}
          disabled={!newTraitHasChanges}
          variant="contained"
          color="primary"
          sx={{ alignSelf: 'flex-start', backgroundColor: '#632ca6' }}
        >
          Save
        </Button>
      </CustomTabPanel>
    </div>
  );
}

export default TraitForm;
