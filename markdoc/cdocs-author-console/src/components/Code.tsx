import { useState } from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('yaml', yaml);

function Code({ contents, language }: { contents: string; language: 'yaml' }) {
  const [textWasCopied, setTextWasCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contents);
    setTextWasCopied(true);
  };

  const handleCopySnackbarClose = (_event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setTextWasCopied(false);
  };

  return (
    <>
      {/* @ts-ignore, this is the example code provided by the highlighting library */}
      <SyntaxHighlighter onClick={copyToClipboard} language={language} style={materialLight}>
        {contents}
      </SyntaxHighlighter>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={textWasCopied}
        autoHideDuration={1000}
        onClose={handleCopySnackbarClose}
        message="Copied"
      />
    </>
  );
}

export default Code;
