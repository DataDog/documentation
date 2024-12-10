import { CompilationError } from '../../../../schemas/compilationResults';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

const ErrorsPrintout = (props: {
  errorReportsByFilePath: Record<string, CompilationError[]>;
}) => {
  return (
    <div>
      {Object.entries(props.errorReportsByFilePath).map(([filePath, errors]) => {
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
                    <TableCell sx={{ fontSize: '1em' }}>Message</TableCell>
                    {errors.some((error) => error.lines) && (
                      <TableCell sx={{ fontSize: '1em', width: '75px' }}>
                        At line
                      </TableCell>
                    )}
                    {errors.some((error) => error.searchTerm) && (
                      <TableCell sx={{ fontSize: '1em' }}>
                        Suggested search term
                        <br />
                        (click to copy)
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {errors.map((error, i) => {
                    let startingLine: number | null = null;
                    if (error.lines) {
                      startingLine = error.lines[0];
                    }
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
                        <TableCell sx={{ fontSize: '1em' }}>{error.message}</TableCell>
                        {errors.some((error) => error.lines) && (
                          <TableCell sx={{ fontSize: '1em' }}>
                            <a href={vscodeLink + ':' + startingLine}>{startingLine}</a>
                          </TableCell>
                        )}
                        {errors.some((error) => error.searchTerm) && (
                          <TableCell sx={{ fontSize: '1em' }}>
                            <code
                              style={{ cursor: 'pointer' }}
                              onClick={() =>
                                navigator.clipboard.writeText(error.searchTerm || '')
                              }
                            >
                              {error.searchTerm}
                            </code>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        );
      })}
    </div>
  );
};

const ErrorsReport = (props: {
  errorsByFilePath: Record<string, CompilationError[]>;
}) => {
  return (
    <div>
      <p>
        Checking the box next to an error has no effect — it's optional and just for your
        reference.
      </p>
      <h2>Compilation errors</h2>
      <ErrorsPrintout errorReportsByFilePath={props.errorsByFilePath} />
    </div>
  );
};

export default ErrorsReport;
