import { useState } from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import yaml from 'react-syntax-highlighter/dist/esm/languages/hljs/yaml';
import markdown from 'react-syntax-highlighter/dist/esm/languages/hljs/markdown';
import a11yLight from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-light';

SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('markdown', markdown);

function markdoc(hljs: unknown) {
  const baseMarkdown = markdown(hljs);

  const markdocTag = {
    className: 'tag',
    begin: /{%\s*/,
    end: /\s*%}/,
    contains: [
      {
        className: 'tagType',
        begin: /\b\/?[\w-]+\b/
      },
      {
        className: 'id',
        begin: /#([\w-])+\b/
      },
      {
        className: 'string',
        begin: /"/,
        end: /"/
      },
      {
        className: 'number',
        begin: /\b\d+\b/
      },
      {
        className: 'variable',
        begin: /\$[\w.]+/,
        contains: [
          {
            className: 'punctuation',
            begin: /\./
          }
        ]
      },
      {
        className: 'function',
        begin: /\b\w+(?=\()/
      },
      {
        className: 'punctuation',
        begin: /%}|{%|=/
      },
      {
        className: 'boolean',
        begin: /\b(true|false)\b/
      }
    ]
  };

  const markdocInterpolation = {
    className: 'template-variable',
    begin: /\{\{\s*/,
    end: /\s*\}\}/,
    contains: [
      {
        className: 'variable',
        begin: /\$?[\w.]+/
      }
    ]
  };

  return {
    ...baseMarkdown,
    name: 'markdoc',
    contains: [...baseMarkdown.contains, markdocTag, markdocInterpolation]
  };
}

SyntaxHighlighter.registerLanguage('markdoc', markdoc);

/*
const markdoc = {
  tag: {
    pattern: /{%(.|\n)*?%}/i,
    inside: {
      tagType: {
        pattern: /^({%\s*\/?)(\w|-)*\b/i,
        lookbehind: true
      },
      id: /#(\w|-)*\b/,
      string: /".*?"/,
      equals: /=/,
      number: /\b\d+\b/i,
      variable: {
        pattern: /\$[\w.]+/i,
        inside: {
          punctuation: /\./i
        }
      },
      function: /\b\w+(?=\()/,
      punctuation: /({%|\/?%})/i,
      boolean: /false|true/
    }
  },
  variable: {
    pattern: /\$\w+/i
  },
  function: {
    pattern: /\b\w+(?=\()/i
  }
};

SyntaxHighlighter.registerLanguage('markdoc', markdoc);
*/

function Code({ contents, language }: { contents: string; language: 'yaml' | 'markdoc' | 'markdown' }) {
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
      <SyntaxHighlighter onClick={copyToClipboard} language={language} style={a11yLight} wrapLongLines={true}>
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
