import { useState } from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import yaml from 'react-syntax-highlighter/dist/esm/languages/hljs/yaml';
import a11yLight from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-light';

SyntaxHighlighter.registerLanguage('yaml', yaml);

interface CodeProps {
  children: string;
  language: 'yaml' | 'text';
}

function Code({ children, language }: CodeProps) {
  const [textWasCopied, setTextWasCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
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
      {/* @ts-ignore */}
      <SyntaxHighlighter onClick={copyToClipboard} language={language} style={a11yLight} wrapLongLines={true}>
        {children}
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
