// Language names used in docs content that Shiki doesn't recognize, mapped to
// the closest Shiki grammar. Without a mapping, Shiki throws and the block
// renders as unhighlighted plain text.
const SHIKI_LANGUAGES_BY_ALIAS: Readonly<Record<string, string>> = {
  curl: "bash",
  "docker-compose.yaml": "yaml",
  gemfile: "ruby",
  golang: "go",
  gradle: "groovy",
  // Markdoc's {% %} tags are close enough to Jinja's to highlight correctly.
  markdoc: "jinja",
  none: "text",
  ssh: "bash",
  tsql: "sql",
};

export function resolveShikiLanguage(language: string | undefined): string {
  if (!language) return "text";
  return SHIKI_LANGUAGES_BY_ALIAS[language.toLowerCase()] ?? language;
}
