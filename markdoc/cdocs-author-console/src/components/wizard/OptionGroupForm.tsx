import { useState } from 'react';
import OptionGroupSelector from '../selectors/OptionGroupSelector';
import { CustomizationConfig } from 'cdocs-data';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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

function OptionGroupForm({ customizationConfig }: { customizationConfig: CustomizationConfig }) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleOptionGroupUpdate = () => {
    console.log('Option group update handler called');
  };

  const handleTabChange = (_event: React.SyntheticEvent, currentTabIndex: number) => {
    setCurrentTabIndex(currentTabIndex);
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
        <OptionGroupSelector customizationConfig={customizationConfig} onSelect={handleOptionGroupUpdate} />
      </CustomTabPanel>
      <CustomTabPanel value={currentTabIndex} index={1}>
        New option group tab
      </CustomTabPanel>
    </div>
  );
}

export default OptionGroupForm;
