/**
 * Custom Shiki theme matching the Hugo site's Chroma syntax highlighting.
 * Source of truth: assets/styles/vendor/_chroma-styles.scss
 *
 * Colors are CSS variables from `src/styles/tokens/colors.css`, not raw values.
 * Shiki copies them into each span's inline `style`, and the browser resolves
 * them, so a dark theme only has to redefine the tokens (no rebuild).
 *
 * Color mapping from Chroma token types → TextMate scopes:
 *   Keywords  (--color-syntax-keyword)      → keyword, storage, constant.language (true/false/null)
 *   Strings   (--color-syntax-string)       → string, string.regexp, constant.character.escape
 *   CharLit   (--color-syntax-char)         → constant.character (Chroma .sc)
 *   Numbers   (--color-syntax-number)       → constant.numeric
 *   Comments  (--color-syntax-comment)      → comment
 *   Classes   (--color-syntax-class)        → entity.name.type
 *   Attrs     (--color-syntax-attribute)    → entity.other.attribute-name, support.type.property-name
 *   Builtins  (--color-syntax-keyword)      → support.function, support.type (non-property)
 *   Self/this (--color-syntax-self)         → variable.language
 *   Preproc   (--color-syntax-preprocessor) → meta.preprocessor
 *   Default   (--color-panel-text)          → everything else
 */
import type { ThemeRegistrationRaw } from "shiki";

const theme: ThemeRegistrationRaw = {
  name: "datadog-chroma",
  type: "light",
  colors: {
    "editor.background": "var(--color-panel-bg)",
    "editor.foreground": "var(--color-panel-text)",
  },
  settings: [
    // — Default: most identifiers, names, operators are black
    {
      scope: [
        "variable",
        "entity.name.function",
        "meta.function-call",
        "keyword.operator",
        "punctuation",
        "entity.name.tag",
        "meta.object-literal.key",
      ],
      settings: { foreground: "var(--color-panel-text)" },
    },

    // — Keywords & storage (Chroma .k / .kd / .kn / .kr)
    {
      scope: [
        "keyword",
        "keyword.control",
        "keyword.other",
        "storage.type",
        "storage.modifier",
      ],
      settings: { foreground: "var(--color-syntax-keyword)" },
    },

    // — Built-in functions & types (Chroma .nb)
    {
      scope: [
        "support.function",
        "support.function.builtin",
        "support.type",
        "support.class",
        "support.constant",
      ],
      settings: { foreground: "var(--color-syntax-keyword)" },
    },

    // — self / this (Chroma .bp — NameBuiltinPseudo)
    {
      scope: ["variable.language"],
      settings: { foreground: "var(--color-syntax-self)" },
    },

    // — Strings, regex, string escapes (Chroma .s / .s1 / .s2 / .sr / .se)
    {
      scope: [
        "string",
        "string.regexp",
        "punctuation.definition.string",
        "constant.character.escape",
      ],
      settings: { foreground: "var(--color-syntax-string)" },
    },

    // — Numbers (Chroma .m / .mi / .mf)
    {
      scope: ["constant.numeric"],
      settings: { foreground: "var(--color-syntax-number)" },
    },

    // — Language constants: true / false / null / nil (Chroma .kc — KeywordConstant)
    {
      scope: ["constant.language"],
      settings: { foreground: "var(--color-syntax-keyword)" },
    },

    // — Character literals (Chroma .sc)
    {
      scope: ["constant.character"],
      settings: { foreground: "var(--color-syntax-char)" },
    },

    // — Comments (Chroma .c / .c1 / .cm)
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "var(--color-syntax-comment)" },
    },

    // — Preprocessor comments (Chroma .cp / .cpf)
    {
      scope: [
        "meta.preprocessor",
        "keyword.control.directive",
        "keyword.control.import",
        "punctuation.definition.preprocessor",
      ],
      settings: { foreground: "var(--color-syntax-preprocessor)" },
    },

    // — Class / type names (Chroma .nc)
    {
      scope: ["entity.name.type", "entity.name.class"],
      settings: { foreground: "var(--color-syntax-class)" },
    },

    // — Attributes & CSS property names (Chroma .na)
    // CSS property names map to support.type.property-name in Shiki, which would
    // otherwise cascade to the purple support.type rule above.
    {
      scope: ["entity.other.attribute-name", "support.type.property-name"],
      settings: { foreground: "var(--color-syntax-attribute)" },
    },

    // — Java import/package paths and the `*` wildcard (Chroma .nn / .o).
    // Their scopes start with `storage.modifier` and `variable.language`, so
    // without this they would inherit the keyword purple and the self/this
    // color above. The more specific scope wins in TextMate matching.
    {
      scope: [
        "storage.modifier.import",
        "storage.modifier.package",
        "variable.language.wildcard",
      ],
      settings: { foreground: "var(--color-panel-text)" },
    },

    // — XML text between tags. Hugo shows it gray (#555555, inherited from
    // `pre code`, because Chroma doesn't wrap it in a token span). Astro uses
    // the string color instead, on purpose: the gray was hard to read.
    // `text.xml` is the grammar's root scope; tags, attributes, and strings
    // have deeper scopes with their own rules above, so only unscoped text
    // gets this color.
    {
      scope: ["text.xml"],
      settings: { foreground: "var(--color-syntax-string)" },
    },

    // — Diff markup
    {
      scope: ["markup.deleted"],
      settings: { foreground: "var(--color-syntax-deleted)" },
    },
    {
      scope: ["markup.inserted"],
      settings: { foreground: "var(--color-syntax-inserted)" },
    },
  ],
};

export default theme;
