import React, { CSSProperties, useEffect, useState } from 'react';
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
import QuickFilterBuilder from './components/QuickFilterBuilder';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import BoltIcon from '@mui/icons-material/Bolt';
import PageWizard from './components/PageWizard';

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
      {value === index && <Box sx={{ paddingTop: '10px' }}>{children}</Box>}
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
  const tabParamVals = ['build-errors', 'quick-filter', 'page-wizard'];
  const [consoleData, setConsoleData] = useState<AuthorConsoleData | null>(null);
  const [hasErrors, setHasErrors] = useState<boolean>(false);
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);

  function setTabWithIndex(tabIndex: number) {
    const tabParamVal = tabParamVals[tabIndex];
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('tab', tabParamVal);
    window.history.replaceState({}, '', `${window.location.pathname}?${searchParams}`);
    setCurrentTabIndex(tabIndex);
  }

  function setTabFromUrl() {
    const searchParams = new URLSearchParams(window.location.search);
    const tabKey = searchParams.get('tab');

    if (!tabKey || !tabParamVals.includes(tabKey)) {
      setCurrentTabIndex(0);
      return;
    }

    const tabIndex = tabParamVals.indexOf(tabKey);
    setCurrentTabIndex(tabIndex);
  }

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setConsoleData(data);
        if (Object.keys(data.errorsByFilePath).length > 0) {
          setHasErrors(true);
        }
      });

    setTabFromUrl();
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, currentTabIndex: number) => {
    setTabWithIndex(currentTabIndex);
  };

  if (!consoleData) {
    return null;
  }

  let buildStatusIcon = <CheckCircleIcon />;
  if (hasErrors) {
    buildStatusIcon = <ErrorIcon />;
  }

  // Use red text if build is more than 5 minutes old
  const now = new Date().getTime();
  const minutesAgo = Math.floor((now - consoleData.timestamp) / 60000);
  const buildTimeStyles: CSSProperties = {};
  if (minutesAgo > 5) {
    buildTimeStyles.color = '#eb364b';
  }

  return (
    <>
      <h1 id="title">
        cdocs author console{' '}
        <span style={buildTimeStyles}>
          (last build: <ReactTimeAgo date={consoleData.timestamp} locale="en-US" />)
        </span>
      </h1>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={currentTabIndex}
            onChange={handleTabChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{ style: { backgroundColor: '#632ca6' } }}
            textColor="inherit"
          >
            <Tab
              disableRipple
              label="Build errors"
              icon={buildStatusIcon}
              {...a11yProps(0)}
              sx={{ color: '#632ca6' }}
            />
            <Tab disableRipple label="Quick filter" icon={<BoltIcon />} {...a11yProps(1)} sx={{ color: '#632ca6' }} />
            <Tab
              disableRipple
              label="Page wizard"
              icon={<AutoFixHighIcon />}
              {...a11yProps(2)}
              sx={{ color: '#632ca6' }}
            />
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
                <AlertTitle sx={{ marginTop: '0px', color: '#922c35' }}>The latest cdocs build has errors.</AlertTitle>
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
              <AlertTitle sx={{ marginTop: '0px', color: '#2a7e41' }}>The latest cdocs build has no errors.</AlertTitle>
            </Alert>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={currentTabIndex} index={1}>
          <QuickFilterBuilder customizationConfig={consoleData.customizationConfig} />
        </CustomTabPanel>
        <CustomTabPanel value={currentTabIndex} index={2}>
          <PageWizard customizationConfig={consoleData.customizationConfig} />
        </CustomTabPanel>
      </Box>
    </>
  );
}

export default App;
