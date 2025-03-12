import React, { useEffect, useState } from 'react';
import './App.css';
import { AuthorConsoleData } from './schemas';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ErrorsReport from './components/errors/ErrorsReport';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReactTimeAgo from 'react-time-ago';
import TraitSelector from './components/selectors/TraitSelector';

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
  const [consoleData, setConsoleData] = useState<AuthorConsoleData | null>(null);
  const [hasErrors, setHasErrors] = useState<boolean>(false);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setConsoleData(data);
        if (Object.keys(data.errorsByFilePath).length > 0) {
          setHasErrors(true);
        }
      });
  }, []);

  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, currentTabIndex: number) => {
    setCurrentTabIndex(currentTabIndex);
  };

  if (!consoleData) {
    return null;
  }

  // Use red text if build is more than 5 minutes old
  const now = new Date().getTime();
  const minutesAgo = Math.floor((now - consoleData.timestamp) / 60000);
  const buildTimeStyles = minutesAgo > 5 ? { color: 'red' } : {};

  return (
    <>
      <h1>cdocs author console</h1>
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
            <Tab label="Config lookup" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={currentTabIndex} index={0}>
          {hasErrors && (
            <>
              <Alert
                severity="error"
                icon={<ErrorIcon sx={{ color: '#eb364b' }} />}
                sx={{ padding: '10px', paddingBottom: '5px', backgroundColor: '#fdebed' }}
              >
                <AlertTitle sx={{ marginTop: '0px', color: '#922c35' }}>
                  The latest build has Markdoc errors.{' '}
                  <span style={buildTimeStyles}>
                    Last built <ReactTimeAgo date={consoleData.timestamp} locale="en-US" />.
                  </span>
                </AlertTitle>
              </Alert>
              <ErrorsReport errorsByFilePath={consoleData.errorsByFilePath} />
            </>
          )}
          {!hasErrors && (
            <Alert
              severity="success"
              sx={{ padding: '10px', paddingBottom: '5px', backgroundColor: '#ecf9ef' }}
              icon={<CheckCircleIcon sx={{ color: '#2a7e41' }} />}
            >
              <AlertTitle sx={{ marginTop: '0px', color: '#2a7e41' }}>
                The latest build has no errors.{' '}
                <span style={buildTimeStyles}>
                  Last built <ReactTimeAgo date={consoleData.timestamp} locale="en-US" />.
                </span>
              </AlertTitle>
            </Alert>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={currentTabIndex} index={1}>
          <h2>Trait</h2>
          <TraitSelector customizationConfig={consoleData.customizationConfig} onSelect={() => {}} />
          <h2>Option group</h2>
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
