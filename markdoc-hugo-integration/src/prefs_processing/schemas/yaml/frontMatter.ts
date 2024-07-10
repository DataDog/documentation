import { z } from 'zod';
import { SNAKE_CASE_REGEX } from './../regexes';

// An individual page preference configuration object
// from the front matter of a doc
export const PagePrefConfigSchema = z
  .object({
    display_name: z.string().regex(SNAKE_CASE_REGEX),
    options_source: z.string().regex(SNAKE_CASE_REGEX),
    default_value: z.string().regex(SNAKE_CASE_REGEX).optional()
  })
  .strict();

export type PagePrefConfig = z.infer<typeof PagePrefConfigSchema>;

// An array of page preference configuration objects,
// validated as a whole
export const PagePrefsConfigSchema = z.array(PagePrefConfigSchema).refine((prefsConfig) => {
  // Param names must be unique
  const prefNames = prefsConfig.map((prefConfig) => prefConfig.display_name);
  const uniquePrefNames = new Set(prefNames);
  if (prefNames.length !== uniquePrefNames.size) {
    return false;
  }

  // Bracketed references must refer to a valid param name
  // that has been defined earlier in the list
  const definedParamNames = new Set();
  for (const prefConfig of prefsConfig) {
    definedParamNames.add(prefConfig.display_name);
    const bracketedPlaceholders = prefConfig.display_name.match(/<([a-z0-9_]+)>/g);
    if (bracketedPlaceholders) {
      for (const placeholder of bracketedPlaceholders) {
        const paramName = placeholder.slice(1, -1);
        if (!definedParamNames.has(paramName)) {
          return false;
        }
      }
    }
  }

  return true;
});

export type PagePrefsConfig = z.infer<typeof PagePrefsConfigSchema>;
