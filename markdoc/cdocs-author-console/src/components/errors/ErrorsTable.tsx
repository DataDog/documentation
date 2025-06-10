import { CdocsCoreError } from 'cdocs-data';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

/**
 * A list of errors for a single file, displayed in a table.
 */
const ErrorsTable = ({
  errors,
  vsCodeLink,
  handleTextCopy
}: {
  errors: CdocsCoreError[];
  vsCodeLink: string;
  handleTextCopy: () => void;
}) => {
  const errorsHaveLineNumbers = errors.some((error) => error.data?.lines);
  const errorsHaveSearchTerms = errors.some((error) => typeof error.data?.searchTerm === 'string');

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            {/* Empty header for the checkbox column */}
            <TableCell sx={{ fontSize: '1em', width: '25px' }}></TableCell>

            {/* Header for the error message column */}
            <TableCell sx={{ fontSize: '1em' }}>Message</TableCell>

            {/* Line number header, if at least one error has a line number */}
            {errorsHaveLineNumbers && <TableCell sx={{ fontSize: '1em', width: '75px' }}>At line</TableCell>}

            {/* Search term header, if at least one error has a search term */}
            {errorsHaveSearchTerms && (
              <TableCell sx={{ fontSize: '1em' }}>
                Suggested search term
                <br />
                (click term to copy)
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {errors.map((error, i) => {
            let startingLine: number | null = null;
            if (Array.isArray(error.data?.lines)) {
              startingLine = error.data.lines[0];
            }
            return (
              <TableRow key={i}>
                <TableCell sx={{ fontSize: '1em' }}>
                  <Checkbox
                    sx={{
                      paddingTop: '0',
                      marginRight: '0px',
                      marginLeft: '-10px',
                      marginTop: '8px',
                      color: '#828ba4',
                      '&.Mui-checked': {
                        color: '#632ca6'
                      }
                    }}
                  />
                </TableCell>

                {/* Error message cell */}
                <TableCell sx={{ fontSize: '1em' }}>{error.message}</TableCell>

                {/* Line number cell, if at least one error has a line number */}
                {errorsHaveLineNumbers && (
                  <TableCell sx={{ fontSize: '1em' }}>
                    <a href={vsCodeLink + ':' + startingLine}>{startingLine}</a>
                  </TableCell>
                )}

                {/* Search term cell, if at least one error has a search term */}
                {errorsHaveSearchTerms && (
                  <TableCell sx={{ fontSize: '1em' }}>
                    <code
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        navigator.clipboard.writeText((error.data?.searchTerm as string) || '');
                        handleTextCopy();
                      }}
                    >
                      {error.data?.searchTerm as string}
                    </code>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ErrorsTable;
