import { describe, it, expect } from 'vitest';
import { resolvePageFilters, type CdocContentFilter } from './filters';

// Exercises the real cdocs-data pipeline (loadCustomizationConfig ->
// buildFiltersManifest -> resolveFilters) against the checked-in
// customization_config YAML.
const contentFilters: CdocContentFilter[] = [
  { trait_id: 'prog_lang', option_group_id: 'custom_instrumentation_language_options', label: 'Language' },
  { trait_id: 'api_type', option_group_id: 'custom_instrumentation_api_options', label: 'API' },
];

const resolve = (
  urlVals: Record<string, string> = {},
  cookieVals: Record<string, string> = {},
) => resolvePageFilters({ contentFilters, urlVals, cookieVals });

describe('resolvePageFilters (backed by cdocs-data)', () => {
  it('falls back to option-group defaults when nothing is set', () => {
    expect(resolve().valsByTraitId).toEqual({ prog_lang: 'java', api_type: 'otel_api' });
  });

  it('applies cookie values when there is no URL param', () => {
    const { valsByTraitId } = resolve({}, { prog_lang: 'python', api_type: 'dd_api' });
    expect(valsByTraitId).toEqual({ prog_lang: 'python', api_type: 'dd_api' });
  });

  it('prefers the URL param over the cookie', () => {
    expect(resolve({ prog_lang: 'cpp' }, { prog_lang: 'python' }).valsByTraitId.prog_lang).toBe('cpp');
  });

  it('ignores an invalid URL value and falls through to the cookie', () => {
    expect(resolve({ prog_lang: 'cobol' }, { prog_lang: 'python' }).valsByTraitId.prog_lang).toBe('python');
  });

  it('ignores an invalid cookie value and falls through to the default', () => {
    expect(resolve({}, { prog_lang: 'cobol' }).valsByTraitId.prog_lang).toBe('java');
  });

  it('exposes options with glossary labels and the resolved current value', () => {
    const langFilter = resolve({ prog_lang: 'python' }).resolvedFilters.find(
      (f) => f.traitId === 'prog_lang',
    )!;
    expect(langFilter.label).toBe('Language');
    expect(langFilter.currentValue).toBe('python');
    expect(langFilter.defaultValue).toBe('java');
    expect(langFilter.options).toEqual([
      { id: 'java', label: 'Java' },
      { id: 'python', label: 'Python' },
      { id: 'cpp', label: 'C++' },
      { id: 'elixir', label: 'Elixir' },
    ]);
  });

  it('honors a frontmatter default_value override', () => {
    const { valsByTraitId } = resolvePageFilters({
      urlVals: {},
      cookieVals: {},
      contentFilters: [
        {
          trait_id: 'prog_lang',
          option_group_id: 'custom_instrumentation_language_options',
          default_value: 'python',
        },
      ],
    });
    expect(valsByTraitId.prog_lang).toBe('python');
  });
});
