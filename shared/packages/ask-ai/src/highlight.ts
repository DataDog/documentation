import hljs from "highlight.js/lib/core";

import bash from "highlight.js/lib/languages/bash";
import csharp from "highlight.js/lib/languages/csharp";
import diff from "highlight.js/lib/languages/diff";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import go from "highlight.js/lib/languages/go";
import ini from "highlight.js/lib/languages/ini";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import php from "highlight.js/lib/languages/php";
import plaintext from "highlight.js/lib/languages/plaintext";
import python from "highlight.js/lib/languages/python";
import ruby from "highlight.js/lib/languages/ruby";
import rust from "highlight.js/lib/languages/rust";
import scala from "highlight.js/lib/languages/scala";
import sql from "highlight.js/lib/languages/sql";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";

/**
 * `lib/core` plus a registered subset: 24 KB gzipped against 303 KB for the
 * full build, which the widget would otherwise ship on every page.
 *
 * This diverges from Hugo, which registers all ~190 languages. A fence labeled
 * with a language outside this list renders as escaped plain text rather than
 * highlighted, and `highlightAuto` on an unlabeled fence can only guess among
 * these 20.
 *
 * To add a language: import it and add it to this table. Each one costs 1-3 KB
 * gzipped.
 */
const LANGUAGES: Record<string, Parameters<typeof hljs.registerLanguage>[1]> = {
  bash,
  csharp,
  diff,
  dockerfile,
  go,
  ini,
  java,
  javascript,
  json,
  markdown,
  php,
  plaintext,
  python,
  ruby,
  rust,
  scala,
  sql,
  typescript,
  xml,
  yaml,
};

for (const [name, language] of Object.entries(LANGUAGES)) {
  hljs.registerLanguage(name, language);
}

export function isRegisteredLanguage(language: string): boolean {
  return hljs.getLanguage(language) !== undefined;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Returns highlighted HTML for a code fence. Never throws: an unknown language
 * or a highlighter failure degrades to escaped plain text, which is readable
 * rather than broken.
 */
export function highlightCode(code: string, language?: string): string {
  try {
    if (language) {
      return isRegisteredLanguage(language)
        ? hljs.highlight(code, { language }).value
        : escapeHtml(code);
    }
    return hljs.highlightAuto(code).value;
  } catch {
    return escapeHtml(code);
  }
}
