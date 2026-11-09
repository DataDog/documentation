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
// text; it never executes or evaluates any of it.

"use strict";

// Parse a unified diff into { path: { right: Set, left: Set } } of line
// numbers that GitHub can resolve for inline comments: added and context
// lines on the RIGHT side, removed and context lines on the LEFT side.
function parseDiff(text) {
  const files = {};
  let current = null;
  let oldLine = 0;
  let newLine = 0;
  let inHunk = false;
  for (const line of text.split("\n")) {
    if (line.startsWith("diff --git ")) {
      current = null;
      inHunk = false;
      continue;
    }
    if (!inHunk && line.startsWith("+++ ")) {
      const p = line.slice(4);
      current = p === "/dev/null" ? null : p.replace(/^b\//, "");
      if (current && !files[current]) {
        files[current] = { right: new Set(), left: new Set() };
      }
      continue;
    }
    const hunk = line.match(/^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
    if (hunk) {
      oldLine = Number(hunk[1]);
      newLine = Number(hunk[2]);
      inHunk = true;
      continue;
    }
    if (!inHunk || !current) continue;
    if (line.startsWith("+")) {
      files[current].right.add(newLine++);
    } else if (line.startsWith("-")) {
      files[current].left.add(oldLine++);
    } else if (line.startsWith(" ")) {
      files[current].right.add(newLine++);
      files[current].left.add(oldLine++);
    } else if (line.startsWith("\\")) {
      // "\ No newline at end of file" carries no line number.
    } else {
      inHunk = false;
    }
  }
  return files;
}

// Rewrite a unified diff with new-file line numbers in a left column.
// Removed lines get no number, because comments on them aren't supported.
function numberDiff(text) {
  const out = [];
  let newLine = 0;
  let inHunk = false;
  const pad = (s) => String(s).padStart(6);
  for (const line of text.split("\n")) {
    if (line.startsWith("diff --git ")) {
      inHunk = false;
      out.push("");
      out.push(line);
      continue;
    }
    const hunk = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
    if (hunk) {
      newLine = Number(hunk[1]);
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
    } else if (line.startsWith("-")) {
      out.push(`${pad("")} ${line}`);
    } else if (line.startsWith("\\")) {
      out.push(`${pad("")} ${line}`);
    } else {
      inHunk = false;
    }
  }
  return out.join("\n").trim() + "\n";
}

// Return true when every line the comment covers is resolvable in the diff.
function resolvable(comment, files) {
  const file = files[comment.path];
  if (!file || !Number.isInteger(comment.line)) return false;
  const side = comment.side === "LEFT" ? file.left : file.right;
  const start = Number.isInteger(comment.start_line) ? comment.start_line : comment.line;
  if (start > comment.line) return false;
  for (let n = start; n <= comment.line; n++) {
    if (!side.has(n)) return false;
  }
  return true;
}

// Move comments that GitHub can't place into the review body. Suggestion
// blocks are dropped from moved comments, because a suggestion without a
// line can't be applied and could mislead.
function moveUnresolvable(review, files) {
  const kept = [];
  const moved = [];
  for (const c of review.comments || []) {
    if (resolvable(c, files)) {
      kept.push(c);
    } else {
      moved.push(c);
    }
  }
  if (moved.length === 0) return { review, moved: 0 };
  const notes = moved.map((c) => {
    const text = String(c.body || "")
      .replace(/```suggestion[\s\S]*?```/g, "")
      .trim();
    return `- \`${c.path}\`: ${text}`;
  });
  const body =
    `${review.body || ""}\n\n` +
    "**Comments that couldn't be placed on a line**\n\n" +
    notes.join("\n");
  return { review: { ...review, body, comments: kept }, moved: moved.length };
}

module.exports = { parseDiff, numberDiff, moveUnresolvable };
