import { ParsingErrorReport } from '../../../schemas/compilationResults';

export type DbData = {
  allowlist: {
    prefsById: Record<
      string,
      {
        id: string;
        display_name: string;
        description?: string;
      }
    >;
    optionsById: Record<
      string,
      {
        id: string;
        display_name: string;
      }
    >;
  };
  hasErrors: boolean;
  errors: {
    parsingErrorReportsByFilePath: Record<string, ParsingErrorReport[]>;
    validationErrorsByFilePath: Record<string, string[]>;
  };
};
