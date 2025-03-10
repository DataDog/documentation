import { ChangeEvent, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import styled from '@emotion/styled';
import Rating from '@mui/material/Rating';
import Greeter from './components/Greeter';
// import the data from db.json
import { dbData as dbDataOnDisk } from './db/data';
import { DbData } from './db/types';

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
  const [count, setCount] = useState<number>(0);
  const [rating, setRating] = useState<number | null>(null);
  const [dbData, setDbData] = useState<DbData>(dbDataOnDisk);

  return (
    <>
      <h1>Single-file app</h1>
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
          onChange={(_event: ChangeEvent, newRating: number) => {
            setRating(newRating);
          }}
        />
      </ExampleWrapper>
      <ExampleWrapper>
        <h3>Imported React component</h3>
        <Greeter />
      </ExampleWrapper>
      <ExampleWrapper>
        <h3>Import data</h3>
        <p>
          A common use case for a single-file tooling app is to layer a UI over a dataset.
        </p>
        <p>
          Add your data to <code>src/db/data.ts</code> (and update the corresponding type
          in <code>src/db/types.ts</code>), and your data will be available to your app as{' '}
          <code>dbData</code>.
        </p>
        <p>
          The data below comes from <code>src/db/data.ts</code> and is imported at the top
          of <code>src/App.tsx</code>. Any other component can accept it (or a subset of
          it) as a prop, and use the data in some way.
        </p>
        <pre>{JSON.stringify(dbData, null, 2)}</pre>
        <p>
          This data can be updated in memory using <code>setDbData()</code> as in the
          example below, but updates do not persist between page loads.
        </p>
        <p>Press the button below to update the data shown above.</p>
        <Button
          onClick={() => {
            setDbData({
              msg: 'Hello, entire universe!'
            });
          }}
        >
          Update!
        </Button>
      </ExampleWrapper>
    </>
  );
}

export default App;
