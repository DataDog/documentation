import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import styled from '@emotion/styled';
import Rating from '@mui/material/Rating';
// import the data from db.json
import { dbData as dbDataOnDisk } from './db/data';
import { DbData } from './db/types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PrefsBuilder from './components/builder/PrefsBuilder';

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

const Button = styled.button`
  padding: 15px;
  background-color: Indigo;
  font-size: 18px;
  border-radius: 4px;
  border-color: Indigo;
  color: white;
  font-weight: bold;
  &:hover {
    background-color: DeepPink;
    border-color: DeepPink;
  }
`;

const ExampleWrapper = styled.div`
  padding: 20px;
  padding-top: 0;
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

function App() {
  const [count, setCount] = useState(0);
  const [rating, setRating] = useState<number | null>(null);
  const [dbData, _setDbData] = useState<DbData>(dbDataOnDisk);

  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, currentTabIndex: number) => {
    setCurrentTabIndex(currentTabIndex);
  };

  return (
    <>
      <h1>Markdoc console</h1>
      <p>A local tool for creating and debugging Markdoc documentation pages.</p>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={currentTabIndex}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="Debug" {...a11yProps(0)} />
            <Tab label="Create" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={currentTabIndex} index={0}>
          <p>There are no recent builds to debug.</p>
          <p>
            Run <code>make compile-markdoc</code> from the command line to build all{' '}
            <code>.mdoc</code> files inside of <code>content/en</code>.
          </p>
        </CustomTabPanel>
        <CustomTabPanel value={currentTabIndex} index={1}>
          <PrefsBuilder allowlist={dbData.allowlist} />
        </CustomTabPanel>
      </Box>
      <div style={{ height: '1200px' }}></div>
      <hr />
      <p>
        This app runs from a single HTML file. It's written with React, TypeScript, and
        Vite.
      </p>
      <p>Material UI and Emotion are also installed and available to use.</p>
      <h2>Usage examples</h2>
      <ExampleWrapper>
        <h3>Include an image asset</h3>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </ExampleWrapper>
      <ExampleWrapper>
        <h3>React counter</h3>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        </div>
      </ExampleWrapper>
      <ExampleWrapper>
        <h3>Style a component with Emotion</h3>
        <p>
          The button below is styled with Emotion at the top of <code>src/App.tsx</code>.
        </p>
        <Button>Hover on me</Button>
      </ExampleWrapper>
      <ExampleWrapper>
        <h3>Use a Material UI component</h3>
        <p>
          MUI is installed, so you can use MUI components, such as the rating below (see{' '}
          <a href="https://mui.com/material-ui/react-rating/">the Rating docs</a>
          ).
        </p>
        <Rating
          name="my-rating"
          value={rating}
          onChange={(_event, newRating) => {
            setRating(newRating);
          }}
        />
      </ExampleWrapper>
      <ExampleWrapper>
        <h3>Import data</h3>
        <p>
          A common use case for a single-file tooling app is to layer a UI over a dataset.
        </p>
        <p>
          Add your data to <code>src/db.ts</code>, and it will be available to your app as{' '}
          <code>dbData</code>.
        </p>
        <p>
          The data below comes from <code>src/db.ts</code> and is imported at the top of{' '}
          <code>src/App.tsx</code>. Any other component can accept it (or a subset of it)
          as a prop, and use the data in some way.
        </p>
        <pre>{JSON.stringify(dbData, null, 2)}</pre>
      </ExampleWrapper>
    </>
  );
}

export default App;
