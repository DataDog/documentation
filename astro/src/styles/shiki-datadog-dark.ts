/**
 * Dark variant of the custom Shiki theme.
 *
 * Lighter token colors designed for dark backgrounds, paired with
 * shiki-datadog.ts (light) via Shiki's dual-theme support.
 */
import type { ThemeRegistrationRaw } from 'shiki';

const theme: ThemeRegistrationRaw = {
  name: 'datadog-chroma-dark',
  type: 'dark',
  colors: {
    'editor.background': '#0d1117',
    'editor.foreground': '#e0e0e0',
  },
  tokenColors: [
    // — Default
    {
      scope: [
        'variable',
        'entity.name.function',
        'meta.function-call',
        'keyword.operator',
        'punctuation',
        'entity.name.tag',
        'meta.object-literal.key',
      ],
      settings: { foreground: '#e0e0e0' },
    },

    // — Keywords & storage
    {
      scope: [
        'keyword',
        'keyword.control',
        'keyword.other',
        'storage.type',
        'storage.modifier',
      ],
      settings: { foreground: '#d67ad6' },
    },

    // — Built-in functions & types
    {
      scope: [
        'support.function',
        'support.function.builtin',
        'support.type',
        'support.class',
        'support.constant',
      ],
      settings: { foreground: '#d67ad6' },
    },

    // — self / this
    {
      scope: ['variable.language'],
      settings: { foreground: '#b48ee0' },
    },

    // — Strings
    {
      scope: ['string', 'punctuation.definition.string'],
      settings: { foreground: '#e5736e' },
    },

    // — Numbers & language constants
    {
      scope: ['constant.numeric', 'constant.language'],
      settings: { foreground: '#7b7fff' },
    },

    // — Character literals
    {
      scope: ['constant.character'],
      settings: { foreground: '#8888ff' },
    },

    // — Comments
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#6a9955' },
    },

    // — Preprocessor
    {
      scope: [
        'meta.preprocessor',
        'keyword.control.directive',
        'keyword.control.import',
        'punctuation.definition.preprocessor',
      ],
      settings: { foreground: '#c99076' },
    },

    // — Class / type names
    {
      scope: ['entity.name.type', 'entity.name.class'],
      settings: { foreground: '#7ec8d3' },
    },

    // — Attributes
    {
      scope: ['entity.other.attribute-name'],
      settings: { foreground: '#d4b567' },
    },

    // — Diff markup
    {
      scope: ['markup.deleted'],
      settings: { foreground: '#e5736e' },
    },
    {
      scope: ['markup.inserted'],
      settings: { foreground: '#6a9955' },
    },
  ],
};

export default theme;
