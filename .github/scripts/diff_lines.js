// Line-number helpers for the Claude review workflow.
//
// GitHub rejects a whole review when any inline comment points at a line
// outside the PR diff ("Line could not be resolved"). The model sometimes
// counts lines in the patch file instead of the page, which puts comments
// on the wrong line or past the end of the file. These helpers:
//
// - `numberDiff`: rewrite a unified diff so each line in a hunk starts with
//   its line number in the new file, so the model copies numbers instead of
//   counting them.
// - `moveUnresolvable`: move comments whose lines aren't in the diff into
//   the review body, so one bad line can't block the whole review.
//
// Input diffs come from the PR and are untrusted. This module only parses
// text; it never executes or evaluates any of it. File paths are stored in
// a Map, so names like `__proto__` or `constructor` are ordinary keys.

"use strict";

const HUNK = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/;

// Decode a path from a `---` or `+++` header. Git appends a tab to paths
// that contain spaces and C-quotes paths with special or non-ASCII
// characters, for example "b/caf\303\251.md". Returns null for /dev/null.
function headerPath(raw) {
  let p = raw.replace(/\t$/, "");
  if (p === "/dev/null") return null;
  if (p.startsWith('"') && p.endsWith('"') && p.length >= 2) {
    const bytes = [];
    const body = p.slice(1, -1);
    for (let i = 0; i < body.length; i++) {
      const ch = body[i];
      if (ch !== "\\") {
        bytes.push(...Buffer.from(ch, "utf8"));
        continue;
      }
      const next = body[i + 1];
      const octal = body.slice(i + 1, i + 4);
      if (/^[0-7]{3}$/.test(octal)) {
        bytes.push(parseInt(octal, 8));
        i += 3;
      } else {
        const map = { n: 10, t: 9, r: 13, '"': 34, "\\": 92, a: 7, b: 8, f: 12, v: 11 };
        bytes.push(next in map ? map[next] : next.charCodeAt(0));
        i += 1;
      }
    }
    p = Buffer.from(bytes).toString("utf8");
  }
  return p.replace(/^[ab]\//, "");
}

// Parse a unified diff into a Map of path -> { right: Set, left: Set } of
// line numbers that GitHub can resolve for inline comments: added and
// context lines on the RIGHT side, removed and context lines on the LEFT.
// Deleted files are keyed by their old path and have only LEFT lines.
function parseDiff(text) {
  const files = new Map();
  let current = null;
  let oldPath = null;
  let oldLine = 0;
  let newLine = 0;
  let inHunk = false;
  const entry = (p) => {
    if (!files.has(p)) files.set(p, { right: new Set(), left: new Set() });
    return files.get(p);
  };
  for (const line of String(text).split("\n")) {
    if (line.startsWith("diff --git ")) {
      current = null;
      oldPath = null;
      inHunk = false;
      continue;
    }
    if (!inHunk && line.startsWith("--- ")) {
      oldPath = headerPath(line.slice(4));
      continue;
    }
    if (!inHunk && line.startsWith("+++ ")) {
      current = headerPath(line.slice(4)) ?? oldPath;
      if (current !== null) entry(current);
      continue;
    }
    const hunk = line.match(HUNK);
    if (hunk) {
      oldLine = Number(hunk[1]);
      newLine = Number(hunk[2]);
      inHunk = true;
      continue;
    }
    if (!inHunk || current === null) continue;
    const file = files.get(current);
    if (line.startsWith("+")) {
      file.right.add(newLine++);
    } else if (line.startsWith("-")) {
      file.left.add(oldLine++);
    } else if (line.startsWith(" ")) {
      file.right.add(newLine++);
      file.left.add(oldLine++);
    } else if (line.startsWith("\\")) {
      // "\ No newline at end of file" carries no line number.
    } else {
      inHunk = false;
    }
  }
  return files;
}

// Rewrite a unified diff with new-file line numbers in a left column.
// Removed lines get no number, because the review comments only on the
// new version of each file.
function numberDiff(text) {
  const out = [];
  let newLine = 0;
  let inHunk = false;
  const pad = (s) => String(s).padStart(6);
  for (const line of String(text).split("\n")) {
    if (line.startsWith("diff --git ")) {
      inHunk = false;
      out.push("");
      out.push(line);
      continue;
    }
    const hunk = line.match(HUNK);
    if (hunk) {
      newLine = Number(hunk[2]);
      inHunk = true;
      out.push(line);
      continue;
    }
    if (!inHunk) {
      if (line.startsWith("+++ ")) out.push(line);
      continue;
    }
    if (line.startsWith("+") || line.startsWith(" ")) {
      out.push(`${pad(newLine++)} ${line}`);
    } else if (line.startsWith("-") || line.startsWith("\\")) {
      out.push(`${pad("")} ${line}`);
    } else {
      inHunk = false;
    }
  }
  return out.join("\n").trim() + "\n";
}

// Return true when GitHub can place the comment: the file is in the diff,
// `line` is on `side`, and a multi-line range starts on `start_side`
// before `line`. Comments that use `position` instead of `line` are
// treated as unplaceable.
function resolvable(comment, files) {
  if (!comment || typeof comment.path !== "string") return false;
  const file = files.get(comment.path);
  if (!file || !Number.isInteger(comment.line)) return false;
  const side = comment.side === "LEFT" ? file.left : file.right;
  if (!side.has(comment.line)) return false;
  if (comment.start_line === undefined) return true;
  if (!Number.isInteger(comment.start_line) || comment.start_line >= comment.line) {
    return false;
  }
  const startSide = (comment.start_side ?? comment.side) === "LEFT" ? file.left : file.right;
  return startSide.has(comment.start_line);
}

// Remove suggestion blocks, including fences of four or more backticks and
// an unclosed fence at the end of the comment.
function stripSuggestions(text) {
  return String(text || "")
    .replace(/(`{3,})suggestion[^\n]*\n[\s\S]*?\1/g, "")
    .replace(/`{3,}suggestion[\s\S]*$/, "")
    .trim();
}

// Move comments that GitHub can't place into the review body. Suggestion
// blocks are dropped from moved comments, because a suggestion without a
// line can't be applied and could mislead.
function moveUnresolvable(review, files) {
  if (!review || !Array.isArray(review.comments)) return { review, moved: 0 };
  const kept = [];
  const moved = [];
  for (const c of review.comments) {
    (resolvable(c, files) ? kept : moved).push(c);
  }
  if (moved.length === 0) return { review, moved: 0 };
  const notes = moved.map((c) => {
    const where = `\`\` ${String(c && c.path)} \`\`` +
      (Number.isInteger(c && c.line) ? `, line ${c.line}` : "");
    const text = stripSuggestions(c && c.body) || "(suggested edit only)";
    return `- ${where}: ${text.replace(/\n/g, "\n  ")}`;
  });
  const body =
    `${review.body || ""}\n\n` +
    "**Comments that couldn't be placed on a line**\n\n" +
    notes.join("\n");
  return { review: { ...review, body, comments: kept }, moved: moved.length };
}

module.exports = { parseDiff, numberDiff, moveUnresolvable, headerPath };
