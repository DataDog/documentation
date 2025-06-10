import { CdocsCoreError } from 'cdocs-data';
import Paper from '@mui/material/Paper';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { useState } from 'react';
import ErrorsTable from './ErrorsTable';

const ErrorsReport = (props: { errorReportsByFilePath: Record<string, CdocsCoreError[]> }) => {
  const [textWasCopied, setTextWasCopied] = useState(false);

  /**
   * Close the copy confirmation pop-up.
   */
  const handleCopySnackbarClose = (_event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setTextWasCopied(false);
  };

  return (
    <div>
      <h2>Compilation errors</h2>
      <p>Checking the box next to an error has no effect — it's optional for tracking your fixes between builds.</p>
      {Object.entries(props.errorReportsByFilePath).map(([filePath, errors]) => {
        const filename = filePath.split('/').pop();
        const vsCodeLink = `vscode://file/${filePath}`;
        return (
          <>
            <Paper
              key={filePath}
              elevation={3}
              style={{
                padding: '3px 15px 15px 15px',
                marginBottom: '30px',
                position: 'relative',
                borderRadius: '5px'
              }}
            >
              {/* Header with filename and links */}
              <h3>
                <a href={vsCodeLink} style={{ textDecoration: 'none' }}>
                  {filename}
                </a>
              </h3>
              <div style={{ position: 'absolute', top: '20px', right: '25px' }}>
                <a
                  href="javascript:void(0)"
                  onClick={() => {
                    navigator.clipboard.writeText(filePath || '');
                    setTextWasCopied(true);
                  }}
                >
                  copy full path
                </a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href={vsCodeLink}>open file in VS Code</a>
              </div>
              {/* List of errors for this file */}
              <ErrorsTable
                errors={errors}
                vsCodeLink={vsCodeLink}
                handleTextCopy={() => {
                  setTextWasCopied(true);
                }}
              />
            </Paper>

            {/* Copy confirmation pop-up */}
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={textWasCopied}
              autoHideDuration={1000}
              onClose={handleCopySnackbarClose}
              message="Copied"
            />
          </>
        );
      })}
    </div>
  );
};

export default ErrorsReport;
