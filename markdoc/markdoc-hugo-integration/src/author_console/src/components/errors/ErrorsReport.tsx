import { ParsingErrorReport } from '../../../../schemas/compilationResults';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ParsingErrorsReport = (props: {
  parsingErrorReportsByFilePath: Record<string, ParsingErrorReport[]>;
}) => {
  return (
    <div>
      {Object.entries(props.parsingErrorReportsByFilePath).map(
        ([filePath, parsingErrorReports]) => {
          const filename = filePath.split('/').pop();
          const vscodeLink = `vscode://file/${filePath}`;
          return (
            <div
              key={filePath}
              style={{
                padding: '0px 10px 5px 10px',
                border: '1px solid gray',
                marginBottom: '10px',
                borderRadius: '4px'
              }}
            >
              <h3>{filename}</h3>
              <p>
                <a href={vscodeLink}>view file</a>
              </p>
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontSize: '1em' }}>At line</TableCell>
                      <TableCell sx={{ fontSize: '1em' }}>Message</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {parsingErrorReports.map((parsingErrorReport, i) => {
                      const startingLine = parsingErrorReport.lines[0];
                      return (
                        <TableRow key={i}>
                          <TableCell sx={{ fontSize: '1em' }}>
                            <a href={vscodeLink + ':' + startingLine}>{startingLine}</a>
                          </TableCell>
                          <TableCell sx={{ fontSize: '1em' }}>
                            {parsingErrorReport.error.message}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          );
        }
      )}
    </div>
  );
};

const ValidationErrorsReport = (props: {
  validationErrorsByFilePath: Record<string, string[]>;
}) => {
  return (
    <div>
      {Object.entries(props.validationErrorsByFilePath).map(
        ([filePath, validationErrors]) => {
          const filename = filePath.split('/').pop();
          const vscodeLink = `vscode://file/${filePath}`;
          return (
            <div
              key={filePath}
              style={{
                padding: '0px 10px 5px 10px',
                border: '1px solid gray',
                marginBottom: '10px',
                position: 'relative',
                borderRadius: '4px'
              }}
            >
              <h3>{filename}</h3>
              <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                <a href={vscodeLink}>view file</a>
              </div>
              <ul>
                {validationErrors.map((validationError, i) => {
                  return (
                    <li key={i} style={{ marginBottom: '10px', lineHeight: '1.5em' }}>
                      {validationError}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }
      )}
    </div>
  );
};

const ErrorsReport = (props: {
  parsingErrorReportsByFilePath: Record<string, ParsingErrorReport[]>;
  validationErrorsByFilePath: Record<string, string[]>;
}) => {
  return (
    <div>
      <h2>Parsing errors</h2>
      <p>Some files could not be parsed by the compiler.</p>
      <ParsingErrorsReport
        parsingErrorReportsByFilePath={props.parsingErrorReportsByFilePath}
      />
      <h2>Validation errors</h2>
      <p>Some files were incorrectly configured or otherwise invalid.</p>
      <ValidationErrorsReport
        validationErrorsByFilePath={props.validationErrorsByFilePath}
      />
    </div>
  );
};

export default ErrorsReport;
