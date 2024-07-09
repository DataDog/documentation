import { z } from 'zod';
import { PagePrefsSchema } from './pagePrefs';

/**
 * PageDataManifest schema:
 * An object that contains all of the preference information
 * for a page, including the current values by param name,
 * all of the page preference objects involved, and so on.
 *
 * This object is used to build the user-facing menu
 * that allows users to filter page content according to
 * their preferences.
 */

export const PageDataManifestSchema = z.object({
  resolvedUrl: z.string().url(),
  valuesByParamName: z.record(z.string()),
  selectionDisplayTextByParamName: z.record(z.string()),
  pagePrefs: PagePrefsSchema,
  paramToVarMapping: z.record(z.string())
});

export type PageDataManifest = z.infer<typeof PageDataManifestSchema>;
