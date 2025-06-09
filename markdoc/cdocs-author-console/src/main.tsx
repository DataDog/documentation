import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App.tsx';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#632ca6' // Datadog @purple-600
    },
    secondary: {
      main: '#ff0099' // Datadog @pink-500
    }
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '4px 8px' // reduce vertical and horizontal padding
        },
        head: {
          fontWeight: 600,
          padding: '4px 8px'
        },
        body: {
          padding: '4px 8px'
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          height: '32px' // optional: reduce row height
        }
      }
    },
    MuiTable: {
      defaultProps: {
        size: 'small' // this will help reduce default row height too
      }
    }
  }
});

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
