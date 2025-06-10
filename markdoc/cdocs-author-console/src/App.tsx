import React, { CSSProperties, useEffect, useState } from 'react';
import './App.css';
import { AuthorConsoleData } from './schemas';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReactTimeAgo from 'react-time-ago';
import QuickFilterBuilder from './components/QuickFilterBuilder';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import BoltIcon from '@mui/icons-material/Bolt';
import PageWizard from './components/PageWizard';
import ErrorsReport from './components/errors/ErrorsReport';
import CustomTabPanel from './components/tabs/CustomTabPanel';
import { a11yTabProps } from './components/tabs/utils';

function App() {
  const tabParamVals = ['build-errors', 'quick-filter', 'page-wizard'];

  const [consoleData, setConsoleData] = useState<AuthorConsoleData | null>(null);
  const [hasErrors, setHasErrors] = useState<boolean>(false);
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);

  /**
   * Set the current tab index to a target index,
   * and update the URL with the corresponding
   * tab parameter value.
   */
  function setTabWithIndex(tabIndex: number) {
    const tabParamVal = tabParamVals[tabIndex];
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('tab', tabParamVal);
    window.history.replaceState({}, '', `${window.location.pathname}?${searchParams}`);
    setCurrentTabIndex(tabIndex);
  }

  /**
   * Detect the user's desired tab from the URL,
   * if present.
   */
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

  // Fetch the latest Cdocs build data from the JSON file
  useEffect(() => {
    fetch('data.json')
      .then((response) => response.json())
      .then((data) => {
        setConsoleData(data);
        if (Object.keys(data.errorsByFilePath).length > 0) {
          setHasErrors(true);
        }
      });

    setTabFromUrl();
  }, []);

  if (!consoleData) {
    return 'No Cdocs build data found.';
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
        {/* Tabs nav */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={currentTabIndex}
            onChange={(_event: React.SyntheticEvent, currentTabIndex: number) => {
              setTabWithIndex(currentTabIndex);
            }}
            TabIndicatorProps={{ style: { backgroundColor: '#632ca6' } }}
            textColor="inherit"
          >
            <Tab
              disableRipple
              label="Build errors"
              icon={buildStatusIcon}
              {...a11yTabProps(0)}
              sx={{ color: '#632ca6' }}
            />
            <Tab
              disableRipple
              label="Quick filter"
              icon={<BoltIcon />}
              {...a11yTabProps(1)}
              sx={{ color: '#632ca6' }}
            />
            <Tab
              disableRipple
              label="Page wizard"
              icon={<AutoFixHighIcon />}
              {...a11yTabProps(2)}
              sx={{ color: '#632ca6' }}
            />
          </Tabs>
        </Box>

        {/* Errors tab */}
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
              <div>
                <h2>Compilation errors</h2>
                <p>
                  Checking the box next to an error has no effect — it's optional for tracking your fixes between
                  builds.
                </p>
                <ErrorsReport errorReportsByFilePath={consoleData.errorsByFilePath} />
              </div>
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

        {/* Quick filter tab */}
        <CustomTabPanel value={currentTabIndex} index={1}>
          <QuickFilterBuilder customizationConfig={consoleData.customizationConfig} />
        </CustomTabPanel>

        {/* Page wizard tab */}
        <CustomTabPanel value={currentTabIndex} index={2}>
          <PageWizard customizationConfig={consoleData.customizationConfig} />
        </CustomTabPanel>
      </Box>
    </>
  );
}

export default App;
