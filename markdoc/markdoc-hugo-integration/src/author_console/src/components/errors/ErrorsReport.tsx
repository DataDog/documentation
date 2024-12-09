import { ParsingErrorReport } from '../../../../schemas/compilationResults';
import * as React from 'react';
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
            <div key={filePath}>
              <h3>
                <a href={vscodeLink}>{filename}</a>
              </h3>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>At line</TableCell>
                      <TableCell>Message</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {parsingErrorReports.map((parsingErrorReport, i) => {
                      const startingLine = parsingErrorReport.lines[0];
                      return (
                        <TableRow key={i}>
                          <TableCell>
                            <a href={vscodeLink + ':' + startingLine}>{startingLine}</a>
                          </TableCell>
                          <TableCell>{parsingErrorReport.error.message}</TableCell>
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
            <div key={filePath}>
              <h3>
                <a href={vscodeLink}>{filename}</a>
              </h3>
              <ul>
                {validationErrors.map((validationError, i) => {
                  return <li key={i}>{validationError}</li>;
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
      <p>Some files had validation errors.</p>
      <ValidationErrorsReport
        validationErrorsByFilePath={props.validationErrorsByFilePath}
      />
    </div>
  );
};

export default ErrorsReport;
