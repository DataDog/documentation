import { ParsingError } from '../../../../schemas/compilationResults';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

const ParsingErrorsReport = (props: {
  parsingErrorReportsByFilePath: Record<string, ParsingError[]>;
}) => {
  return (
    <div>
      {Object.entries(props.parsingErrorReportsByFilePath).map(
        ([filePath, parsingErrorReports]) => {
          const filename = filePath.split('/').pop();
          const vscodeLink = `vscode://file/${filePath}`;
          return (
            <Paper
              key={filePath}
              elevation={3}
              style={{
                padding: '3px 15px 15px 15px',
                marginBottom: '15px',
                position: 'relative',
                borderRadius: '5px'
              }}
            >
              <h3>
                <a href={vscodeLink} style={{ textDecoration: 'none' }}>
                  {filename}
                </a>
              </h3>
              <div style={{ position: 'absolute', top: '25px', right: '25px' }}>
                <a href={vscodeLink}>open file in VS Code</a>
              </div>
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontSize: '1em', width: '25px' }}></TableCell>
                      <TableCell sx={{ fontSize: '1em', width: '75px' }}>
                        At line
                      </TableCell>
                      <TableCell sx={{ fontSize: '1em' }}>Message</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {parsingErrorReports.map((parsingError, i) => {
                      const startingLine = parsingError.lines[0];
                      return (
                        <TableRow key={i}>
                          <TableCell sx={{ fontSize: '1em' }}>
                            <Checkbox
                              sx={{
                                paddingTop: '0',
                                marginRight: '0px',
                                marginLeft: '-10px',
                                marginTop: '8px'
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ fontSize: '1em' }}>
                            <a href={vscodeLink + ':' + startingLine}>{startingLine}</a>
                          </TableCell>
                          <TableCell sx={{ fontSize: '1em' }}>
                            {parsingError.message}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
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
            <Paper
              key={filePath}
              elevation={3}
              style={{
                padding: '3px 35px 15px 15px',
                marginBottom: '15px',
                position: 'relative',
                borderRadius: '5px'
              }}
            >
              <h3>
                {' '}
                <a href={vscodeLink} style={{ textDecoration: 'none' }}>
                  {filename}
                </a>
              </h3>
              <div style={{ position: 'absolute', top: '25px', right: '25px' }}>
                <a href={vscodeLink}>open file in VS Code</a>
              </div>
              <div>
                {validationErrors.map((validationError, i) => {
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '10px'
                      }}
                    >
                      <div>
                        <Checkbox sx={{ paddingTop: '0', marginRight: '0px' }} />
                      </div>
                      <div style={{ lineHeight: '1.5em' }}>{validationError}</div>
                    </div>
                  );
                })}
              </div>
            </Paper>
          );
        }
      )}
    </div>
  );
};

const ErrorsReport = (props: {
  parsingErrorReportsByFilePath: Record<string, ParsingError[]>;
  validationErrorsByFilePath: Record<string, string[]>;
}) => {
  return (
    <div>
      <p>
        Checking the box next to an error has no effect — it's optional and just for your
        reference.
      </p>
      <h2>Parsing errors</h2>
      <p>Some files could not be parsed by Markdoc.</p>
      <ParsingErrorsReport
        parsingErrorReportsByFilePath={props.parsingErrorReportsByFilePath}
      />
      <h2>Validation errors</h2>
      <p>
        Some files contained incorrect filter configuration values or other invalid data.
      </p>
      <ValidationErrorsReport
        validationErrorsByFilePath={props.validationErrorsByFilePath}
      />
    </div>
  );
};

export default ErrorsReport;
