import React, { useState } from 'react';
import './App.css';
import styled from '@emotion/styled';
// import the data from db.json
import { dbData as dbDataOnDisk } from './db/data';
import { DbData } from './db/types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PrefsBuilder from './components/builder/PrefsBuilder';
import ErrorsReport from './components/errors/ErrorsReport';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ErrorIcon from '@mui/icons-material/Error';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function App() {
  const [dbData, _setDbData] = useState<DbData>(dbDataOnDisk);

  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, currentTabIndex: number) => {
    setCurrentTabIndex(currentTabIndex);
  };

  return (
    <>
      <h1>Markdoc author console</h1>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={currentTabIndex}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="Build status" {...a11yProps(0)} />
            {/* <Tab label="Create" {...a11yProps(1)} /> */}
          </Tabs>
        </Box>
        <CustomTabPanel value={currentTabIndex} index={0}>
          {dbData.hasErrors && (
            <Alert
              severity="error"
              icon={<ErrorIcon />}
              sx={{ padding: '10px', paddingBottom: '5px' }}
            >
              <AlertTitle sx={{ marginTop: '0px' }}>This build has errors.</AlertTitle>
            </Alert>
          )}
          <ErrorsReport {...dbData.errors} />
        </CustomTabPanel>
        <CustomTabPanel value={currentTabIndex} index={1}>
          <PrefsBuilder allowlist={dbData.allowlist} />
        </CustomTabPanel>
      </Box>
    </>
  );
}

export default App;
