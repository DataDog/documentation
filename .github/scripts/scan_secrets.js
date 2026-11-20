// Secret-pattern scanner shared by the review and post jobs.
//
// Regex list mirrors the claude-code-action sanitizer (GitHub
// token families) plus Anthropic token families. Add new patterns
// by appending here — every pattern is applied to every string
// reached by `hasToken`.

"use strict";

const TOKEN_PATTERNS = [
  /ghp_[A-Za-z0-9_]{36,}/,
  /gho_[A-Za-z0-9_]{36,}/,
  /ghs_[A-Za-z0-9_]{36,}/,
  /ghr_[A-Za-z0-9_]{36,}/,
  /ghu_[A-Za-z0-9_]{36,}/,
  /github_pat_[A-Za-z0-9_]{82,}/,
  /sk-ant-api[0-9]{2}-[A-Za-z0-9_\-]+/,
  /sk-ant-oat[0-9]{2}-[A-Za-z0-9_\-]+/,
  /sk-ant-sid[0-9]{2}-[A-Za-z0-9_\-]+/,
  /sk-ant-[A-Za-z0-9_\-]{20,}/,
  /sk-proj-[A-Za-z0-9_\-]{20,}/,
  /sk-svcacct-[A-Za-z0-9_\-]{20,}/,
  /sk-[A-Za-z0-9]{48,}/,
];

function hasToken(value) {
  if (typeof value === "string") {
    return TOKEN_PATTERNS.some((p) => p.test(value));
  }
  if (Array.isArray(value)) return value.some(hasToken);
  if (value && typeof value === "object") {
    return Object.values(value).some(hasToken);
  }
  return false;
}

module.exports = { TOKEN_PATTERNS, hasToken };
