import { CustomizationConfig, CdocsCoreError } from 'cdocs-data';

export type AuthorConsoleData = {
  timestamp: number;
  errorsByFilePath: Record<string, CdocsCoreError[]>;
  customizationConfig: CustomizationConfig;
};
