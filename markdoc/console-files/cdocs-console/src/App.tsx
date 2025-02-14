import React, { useState } from 'react';
import './App.css';
import { dbData as dbDataOnDisk } from './db/data';
import { AuthorConsoleData } from '../../schemas/authorConsole';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
// import PrefsBuilder from './components/builder/PrefsBuilder';
import ErrorsReport from './components/errors/ErrorsReport';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
  const [consoleData, _setConsoleData] = useState<AuthorConsoleData>(dbDataOnDisk);

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
            TabIndicatorProps={{ style: { backgroundColor: '#632ca6' } }}
            textColor="inherit"
          >
            <Tab label="Build status" {...a11yProps(0)} sx={{ color: '#632ca6' }} />
            {/* <Tab label="Create" {...a11yProps(1)} /> */}
          </Tabs>
        </Box>
        <CustomTabPanel value={currentTabIndex} index={0}>
          {consoleData.buildStatus.hasErrors && (
            <>
              <Alert
                severity="error"
                icon={<ErrorIcon sx={{ color: '#eb364b' }} />}
                sx={{ padding: '10px', paddingBottom: '5px', backgroundColor: '#fdebed' }}
              >
                <AlertTitle sx={{ marginTop: '0px', color: '#922c35' }}>
                  The latest build has Markdoc errors.
                </AlertTitle>
              </Alert>
              <ErrorsReport errorsByFilePath={consoleData.buildStatus.errorsByFilePath} />
            </>
          )}
          {!consoleData.buildStatus.hasErrors && (
            <Alert
              severity="success"
              sx={{ padding: '10px', paddingBottom: '5px', backgroundColor: '#ecf9ef' }}
              icon={<CheckCircleIcon sx={{ color: '#2a7e41' }} />}
            >
              <AlertTitle sx={{ marginTop: '0px', color: '#2a7e41' }}>
                The latest build has no errors.
              </AlertTitle>
            </Alert>
          )}
        </CustomTabPanel>
        {/*
        <CustomTabPanel value={currentTabIndex} index={1}>
          <PrefsBuilder glossary={consoleData.glossary} />
        </CustomTabPanel>
        */}
      </Box>
    </>
  );
}

export default App;
