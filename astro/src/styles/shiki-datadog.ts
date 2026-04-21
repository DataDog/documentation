/**
 * Custom Shiki theme matching the Hugo site's Chroma syntax highlighting.
 * Source of truth: assets/styles/vendor/_chroma-styles.scss
 *
 * Color mapping from Chroma token types → TextMate scopes:
 *   Keywords  (#a90d91) → keyword, storage, constant.language (true/false/null)
 *   Strings   (#c41a16) → string, string.regexp, constant.character.escape
 *   CharLit   (#2300ce) → constant.character (Chroma .sc)
 *   Numbers   (#1c01ce) → constant.numeric
 *   Comments  (#177500) → comment
 *   Classes   (#3f6e75) → entity.name.type
 *   Attrs     (#836c28) → entity.other.attribute-name, support.type.property-name
 *   Builtins  (#a90d91) → support.function, support.type (non-property)
 *   Self/this (#5b269a) → variable.language
 *   Preproc   (#633820) → meta.preprocessor
 *   Default   (#000000) → everything else
 */
import type { ThemeRegistrationRaw } from 'shiki';

const theme: ThemeRegistrationRaw = {
  name: 'datadog-chroma',
  type: 'light',
  colors: {
    'editor.background': '#ffffff',
    'editor.foreground': '#000000',
  },
  tokenColors: [
    // — Default: most identifiers, names, operators are black
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
      settings: { foreground: '#000000' },
    },

    // — Keywords & storage (Chroma .k / .kd / .kn / .kr)
    {
      scope: [
        'keyword',
        'keyword.control',
        'keyword.other',
        'storage.type',
        'storage.modifier',
      ],
      settings: { foreground: '#a90d91' },
    },

    // — Built-in functions & types (Chroma .nb)
    {
      scope: [
        'support.function',
        'support.function.builtin',
        'support.type',
        'support.class',
        'support.constant',
      ],
      settings: { foreground: '#a90d91' },
    },

    // — self / this (Chroma .bp — NameBuiltinPseudo)
    {
      scope: ['variable.language'],
      settings: { foreground: '#5b269a' },
    },

    // — Strings, regex, string escapes (Chroma .s / .s1 / .s2 / .sr / .se)
    {
      scope: [
        'string',
        'string.regexp',
        'punctuation.definition.string',
        'constant.character.escape',
      ],
      settings: { foreground: '#c41a16' },
    },

    // — Numbers (Chroma .m / .mi / .mf)
    {
      scope: ['constant.numeric'],
      settings: { foreground: '#1c01ce' },
    },

    // — Language constants: true / false / null / nil (Chroma .kc — KeywordConstant)
    {
      scope: ['constant.language'],
      settings: { foreground: '#a90d91' },
    },

    // — Character literals (Chroma .sc)
    {
      scope: ['constant.character'],
      settings: { foreground: '#2300ce' },
    },

    // — Comments (Chroma .c / .c1 / .cm)
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#177500' },
    },

    // — Preprocessor comments (Chroma .cp / .cpf)
    {
      scope: [
        'meta.preprocessor',
        'keyword.control.directive',
        'keyword.control.import',
        'punctuation.definition.preprocessor',
      ],
      settings: { foreground: '#633820' },
    },

    // — Class / type names (Chroma .nc)
    {
      scope: ['entity.name.type', 'entity.name.class'],
      settings: { foreground: '#3f6e75' },
    },

    // — Attributes & CSS property names (Chroma .na)
    // CSS property names map to support.type.property-name in Shiki, which would
    // otherwise cascade to the purple support.type rule above.
    {
      scope: [
        'entity.other.attribute-name',
        'support.type.property-name',
      ],
      settings: { foreground: '#836c28' },
    },

    // — Diff markup
    {
      scope: ['markup.deleted'],
      settings: { foreground: '#c41a16' },
    },
    {
      scope: ['markup.inserted'],
      settings: { foreground: '#177500' },
    },
  ],
};

export default theme;
