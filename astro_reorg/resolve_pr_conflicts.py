#!/usr/bin/env python3
"""
Find open PRs with merge conflicts caused by the reorg.
Defaults to a dry run where it just reports the changes
that would be made.

Usage:
    python3 astro_reorg/resolve_pr_conflicts.py --limit N [--no-dry-run] [--live | --base-branch BRANCH] [--pr NUMBER ...]

Flags:
    --no-dry-run          Actually apply fixes and labels instead of just reporting what would be done.
    --live                Run against the real master. Without it the script
                          defaults to the mock base branch from config.yaml's
                          `test:` section (the branch create_test_prs.py opens
                          its test PRs against) for safety.
    --base-branch BRANCH  Branch to treat as the post-reorg base. Overrides the
                          default mock base branch and --live.
    --pr NUMBER ...       Only process the given PR number(s) instead of all open
                          PRs against the base branch. PRs targeting a different
                          base are skipped.
    --limit N             Stop after acting on N PRs (auto-fixing or labeling).
                          PRs that need no action — mergeable, already fixed, or
                          not-yet-computed — don't count toward the limit. Use it
                          to roll out gradually: start with --limit 1, review the
                          results, then raise it as you gain confidence.
    --skip-stale          Exclude PRs already labeled astro-reorg-stale from the
                          query entirely. Useful when stale PRs would otherwise
                          consume --limit slots before older active PRs are reached.

Background:
    The reorg moves every entry in `moves_to_hugo` (astro_reorg/config.yaml)
    from the repo root into hugo/. For example, content/ → hugo/content/,
    layouts/ → hugo/layouts/, etc. PRs opened before the reorg was merged to
    master will have their branches pointing at the old paths.  When github
    tries to compute mergeability, those PRs show as CONFLICTING.

How we decide whether a conflict came from the reorg:
    When git merges a PR branch into post-reorg master it uses rename detection
    to pair the PR's pre-reorg file path (e.g. content/en/foo.md) with the
    corresponding post-reorg path (hugo/content/en/foo.md) in master.  If both
    sides modified the file, git reports a conflict: Rename detection usually
    places the conflict at the POST-reorg path (hugo/content/en/foo.md), because
    that is where the file lives in master.  Occasionally, when rename detection
    fails (the file was heavily edited or the threshold wasn't met), git instead
    reports a "deleted by them" conflict at the PRE-reorg path.

    A conflict is "from the reorg" if its path maps to a reorg-moved location:
      a. hugo/<name>/...  where <name> is in moves_to_hugo  (post-reorg path,
         rename detected — the common case)
      b. <name>/...  where <name> is in moves_to_hugo  (pre-reorg path, rename
         NOT detected — git sees it as "they deleted the file")

    Any conflict at a path NOT matching either pattern is unrelated to the
    reorg and must be resolved manually.

    We also detect a subtler case: files ADDED by the PR at a pre-reorg path
    (e.g. content/en/brand_new.md).  These produce no conflict marker — git
    happily merges them at the wrong path.  We catch them by scanning all
    paths staged in the test merge and flagging any whose first segment is in
    moves_to_hugo.

Auto-fix strategy (reorg-only PRs):
    For PRs where every conflict is a reorg conflict, the fix is to replay the
    PR's commits at the post-reorg paths:

      1. Find the merge base between the PR branch and the base branch (where
         the PR diverged from master, before the reorg landed).
      2. Export each PR commit as its own patch with `git format-patch`,
         preserving the original author and commit message.
      3. Rewrite every file path in the patches whose first segment is in
         moves_to_hugo to be prefixed with hugo/ (content/en/ → hugo/content/en/).
      4. Replay the series onto a fresh branch off the base branch with
         `git am --3way`.  --3way falls back to a per-patch 3-way merge when
         context lines have drifted because master made unrelated edits between
         the PR's base and today.
      5. Push as `reorg-fix/pr-<N>`, open a new PR for it (whose body @mentions
         the original author so they're notified immediately), close the original
         PR with a comment pointing to the fix PR, and label the original
         astro-reorg-autofixed.

    If a run dies partway through step 5 (branch pushed and/or fix PR opened, but
    the original never closed), a later run detects the existing branch/PR and
    finishes the job rather than bailing — it never rebuilds or force-pushes an
    existing fix branch, so a fix already in review is safe.

    PRs from forks cannot be auto-fixed (we don't have push access to the fork).
    They receive the astro-reorg-manual-review label.
"""
from __future__ import annotations

import argparse
import json
import os
import shutil
import subprocess
import sys
import tempfile
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path

try:
    import yaml
except ImportError:
    print("Error: PyYAML is required. Install with: pip install pyyaml", file=sys.stderr)
    sys.exit(1)

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

SCRIPT_DIR = Path(__file__).parent
REPO_ROOT = SCRIPT_DIR.parent
CONFIG_PATH = SCRIPT_DIR / "config.yaml"

with CONFIG_PATH.open() as f:
    _config = yaml.safe_load(f)

HUGO_FOLDER_FILES: set[str] = set(_config.get("moves_to_hugo", []))
TOP_LEVEL_FILES: set[str] = set(_config.get("top_level", []))

# Shared with create_test_prs.py: the mock base branch used for test runs. When
# invoked without --live or --base-branch, the script defaults to this branch
# as the post-reorg base so it operates on the same branch the test PRs were
# opened against.
_TEST_CONFIG = _config.get("test", {})
TEST_BASE_BRANCH: str | None = _TEST_CONFIG.get("mock_reorged_master_branch")

REPO = "DataDog/documentation"

# The author-facing comments link to two files that live on DIFFERENT branches
# after the reorg, so they need separate branch constants — do not merge them.
#
# REORG_README_BRANCH: branch hosting REPO_REORG.md. Before the reorg lands this
#   is the scripts branch; once REPO_REORG.md is published on master (see
#   docs/reorg_execution_steps.md), set this to "master".
# CONFIG_LINK_BRANCH: branch hosting astro_reorg/config.yaml. The reorg DELETES
#   astro_reorg/ from master, so this link must point at a branch that RETAINS it
#   (the scripts branch) — it can never be "master".
REORG_README_BRANCH = "master"
CONFIG_LINK_BRANCH = "jen.gilbert/astro-reorg-scripts"
REPO_REORG_README_LINK = f"https://github.com/DataDog/documentation/blob/{REORG_README_BRANCH}/REPO_REORG.md"
LABEL_MANUAL_REVIEW = "astro-reorg-manual-review"
LABEL_STALE = "astro-reorg-stale"
LABEL_AUTOFIXED = "astro-reorg-autofixed"
LABEL_AUTO_PR = "astro-reorg-auto-pr"
LABEL_NO_CONFLICTS = "astro-reorg-no-conflicts"
# Author-applied on an already-processed PR to request manual intervention. The
# script does not act on these PRs — they're excluded from the query and left
# for a person to handle.
LABEL_HELP_REQUESTED = "astro-reorg-help-requested"
# Applied by the script to a work-in-progress PR after it comments once. Excluded
# from the query so the PR isn't picked up (and re-commented on) on later runs.
LABEL_SKIP = "astro-reorg-skip"
LABEL_COLOR = "e4e669"
LABEL_DESCRIPTION = "Needs manual conflict resolution after replatforming reorg"
LABEL_ERROR_DESCRIPTION = "An error was encountered while syncing this PR with the docs repo reorg"
# Applied to every PR the script acts on, regardless of outcome (auto-fixed,
# manual review, WIP, stale, ...). Purely a visibility aid so all affected PRs
# can be found in GitHub with one label filter — it is NOT used for idempotency
# and is deliberately absent from the get_open_prs query.
LABEL_PROCESSED = "astro-reorg-processed"
LABEL_ERROR = "astro-reorg-error"

# PRs with no activity in this many days are treated as stale and receive a
# comment + label instead of an auto-fix attempt.
STALE_DAYS = 31  # ~1 calendar month

# A stale-labeled PR is considered reactivated only if its updatedAt is later
# than when we applied the label by more than this grace window. The label
# event and the resulting updatedAt bump share a timestamp; the grace absorbs
# any skew so our own labeling never counts as fresh activity.
STALE_REACTIVATE_GRACE = timedelta(seconds=60)

# Prepended to every author-facing comment so readers know it is automated.
AUTOMATED_COMMENT_HEADER = "[Automated message] "

# Appended to every author-facing comment so readers know how to follow up.
AUTOMATED_COMMENT_FOOTER = (
    "\n\nThis is an automated comment, but if you have a question, you can mention me in this PR "
    "(external contributors) or reach out in #docs-repo-reorg-support on Slack (internal contributors)."
)

# ---------------------------------------------------------------------------
# Comment builders — one function per user-facing message
# ---------------------------------------------------------------------------

def build_manual_review_comment() -> str:
    """Posted on PRs with non-reorg conflicts, or when auto-fix fails."""
    return (
        AUTOMATED_COMMENT_HEADER +
        f"This PR has merge conflicts from a [recent repo reorg]({REPO_REORG_README_LINK}) that could not be resolved automatically.\n\n"
        "If you feel comfortable resolving the conflicts yourself:\n\n"
        "1. Resolve the conflicts. For a full list of repo files and folders and their updated location, "
        "see [the configuration file for the reorg script]"
        f"(https://github.com/DataDog/documentation/blob/{CONFIG_LINK_BRANCH}/astro_reorg/config.yaml).\n"
        f"2. When your PR is ready for merge, remove the `{LABEL_WIP}` label.\n"
        "3. Wait for the standard docs team approval before merging. "
        "Optionally, you can check the 'ready for merge' checkbox in the PR description "
        "if you would like the docs team to merge it for you.\n\n"
        f"If you need assistance resolving your conflicts, add the label `{LABEL_HELP_REQUESTED}` to your PR. "
        "This will add it to our support queue, and we will reach out to you as soon as possible."
        + AUTOMATED_COMMENT_FOOTER
    )


def build_no_reorg_conflicts_comment() -> str:
    """Posted on PRs with merge conflicts that are unrelated to the reorg."""
    return (
        AUTOMATED_COMMENT_HEADER +
        f"This PR has been scanned for conflicts caused by the [recent repo reorg]({REPO_REORG_README_LINK}). "
        "No reorg-related conflicts were found, so no action was taken to auto-fix the conflicts.\n\n"
        f"If you believe this is incorrect, add the `{LABEL_HELP_REQUESTED}` label, and the WebOps Platform team will take a closer look."
        + AUTOMATED_COMMENT_FOOTER
    )


def build_stale_comment() -> str:
    """Posted on PRs with no activity in the last STALE_DAYS days."""
    return (
        AUTOMATED_COMMENT_HEADER +
        f"This PR has conflicts created by the [docs repo reorg project]({REPO_REORG_README_LINK}). "
        f"Because this PR is stale (more than {STALE_DAYS} days old), no attempt was made to auto-resolve the conflicts. "
        "If you still intend to use this PR, remove the label "
        f"`{LABEL_STALE}`. Your PR will be processed in the next batch of attempted auto-fixes."
        + AUTOMATED_COMMENT_FOOTER
    )


def build_wip_comment() -> str:
    """Posted on PRs carrying the WORK IN PROGRESS label."""
    return (
        AUTOMATED_COMMENT_HEADER +
        f"This PR has merge conflicts created by the [docs repo reorg project]({REPO_REORG_README_LINK}). "
        "Because this PR is marked as a work in progress, no attempt was made to auto-resolve the conflicts. "
        f"When your PR is finished, you can queue your PR for an auto-fix by removing the `{LABEL_WIP}` label and the `{LABEL_SKIP}` label. "
        "Your PR will be processed in the next batch of attempted auto-fixes."
        + AUTOMATED_COMMENT_FOOTER
    )


def build_autofix_close_comment(new_pr_number: int | str) -> str:
    """Posted on the original PR when it is closed in favor of a fix PR."""
    return (
        AUTOMATED_COMMENT_HEADER +
        f"This PR has merge conflicts caused by the [recent docs repo reorg]({REPO_REORG_README_LINK}) "
        f"(files moved from the repo root into `hugo/`). "
        f"A new PR with your commits translated to the correct paths "
        f"has been opened: #{new_pr_number}\n\n"
        f"Please follow the instructions in the PR description."
        + AUTOMATED_COMMENT_FOOTER
    )


def build_autofix_pr_body(
    original_pr_number: int | str,
    original_body: str,
    author_login: str | None = None,
) -> str:
    """Body of the auto-generated fix PR.

    When author_login is given, the body opens with an @mention so the original
    author is notified the moment this PR is created. This matters because the
    fix PR is opened before the original is closed: if a run is interrupted in
    between, the @mention is the author's only signal that the fix exists.
    """
    mention = (
        f"@{author_login} — the [docs repo reorg]({REPO_REORG_README_LINK}) created merge conflicts in your "
        f"PR #{original_pr_number}. This is an auto-generated replacement with the "
        f"file paths fixed; please use it instead of the original.\n\n"
        if author_login else ""
    )
    return (
        f"🤖 Auto-generated fix for #{original_pr_number}.\n\n"
        f"{mention}"
        f"This PR replays the commits from #{original_pr_number} with file paths "
        f"translated to the post-reorg `hugo/` layout. The original commits "
        f"are preserved — same messages and authorship.\n\n"
        f"The original PR (#{original_pr_number}) will be closed in favor of this one.\n\n"
        f"**Next steps:**\n\n"
        f"1. Verify that this PR looks correct in the browser.\n"
        f"2. Remove the `{LABEL_WIP}` label from this PR.\n"
        f"3. Wait for the standard docs team approval before merging. "
        f"Optionally, you can check the 'ready for merge' checkbox below "
        f"if you would like the docs team to merge it for you.\n\n"
        f"- [ ] Ready for merge\n\n"
        f"---\n\n"
        f"**Original PR description:**\n\n{original_body}"
    )

# Existing repo labels assumed to already exist; the script checks for them but
# does not create them.
LABEL_WIP = "WORK IN PROGRESS"
LABEL_DO_NOT_MERGE = "Do Not Merge"  # test mode only — keeps fix PRs out of review queues

# Set in main() from --base-branch; everything else reads this.
BASE_BRANCH = "master"

# True when running against the mock base branch rather than real master. Set
# in main(); gates test-only behavior like labeling fix PRs "Do Not Merge".
IS_TEST_MODE = False

# ---------------------------------------------------------------------------
# Shell helpers
# ---------------------------------------------------------------------------

def run(cmd: list[str], *, cwd: Path | None = None, input: str | None = None) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, capture_output=True, text=True, cwd=cwd, input=input)


def run_bytes(cmd: list[str], *, cwd: Path | None = None) -> subprocess.CompletedProcess:
    """Run a command and capture output as bytes (needed for binary file content)."""
    return subprocess.run(cmd, capture_output=True, cwd=cwd)


def gh_json(*args: str) -> object:
    result = run(["gh", *args])
    if result.returncode != 0:
        raise RuntimeError(f"gh {' '.join(args[:3])}: {result.stderr.strip()}")
    return json.loads(result.stdout)


def gh_run(*args: str) -> str:
    result = run(["gh", *args])
    if result.returncode != 0:
        raise RuntimeError(f"gh {' '.join(args[:3])}: {result.stderr.strip()}")
    return result.stdout


def git(*args: str, cwd: Path | None = None) -> subprocess.CompletedProcess:
    return run(["git", *args], cwd=cwd or REPO_ROOT)


# ---------------------------------------------------------------------------
# Staleness helpers
# ---------------------------------------------------------------------------

def _parse_ts(ts: str) -> datetime:
    """Parse a GitHub ISO-8601 timestamp (e.g. '2026-07-16T12:00:00Z')."""
    return datetime.fromisoformat(ts.replace("Z", "+00:00"))


def is_pr_stale(pr: dict) -> bool:
    """Return True if the PR has had no activity in the last STALE_DAYS days."""
    updated_at = pr.get("updatedAt")
    if not updated_at:
        return False
    cutoff = datetime.now(timezone.utc) - timedelta(days=STALE_DAYS)
    return _parse_ts(updated_at) < cutoff


def stale_labeled_at(pr_number: int) -> datetime | None:
    """Return when LABEL_STALE was most recently added to the PR, or None if it
    was never labeled or the timeline can't be read. Reads the issue timeline,
    which records a 'labeled' event (with the label name and a created_at) for
    every label addition."""
    try:
        events = gh_json("api", "--paginate",
                         f"repos/{REPO}/issues/{pr_number}/timeline")
    except RuntimeError as exc:
        print(f"  Could not read timeline for PR #{pr_number}: {exc}",
              file=sys.stderr)
        return None
    times = [e["created_at"] for e in events  # type: ignore[union-attr]
             if e.get("event") == "labeled"
             and e.get("label", {}).get("name") == LABEL_STALE
             and e.get("created_at")]
    return max((_parse_ts(t) for t in times), default=None)


# ---------------------------------------------------------------------------
# Reorg path helpers
# ---------------------------------------------------------------------------

def path_first_segment(file_path: str) -> str:
    """Return the first directory segment of a path string."""
    return file_path.lstrip("/").split("/", 1)[0]


def is_reorg_path(file_path: str) -> bool:
    """
    Return True if this path maps to a location moved by the reorg.

    Covers both forms that git can report:
      - Pre-reorg path: content/en/foo.md  (first segment in moves_to_hugo)
      - Post-reorg path: hugo/content/en/foo.md  (second segment in moves_to_hugo)
    """
    parts = Path(file_path).parts
    if not parts:
        return False
    if parts[0] in HUGO_FOLDER_FILES:
        return True
    if parts[0] == "hugo" and len(parts) > 1 and parts[1] in HUGO_FOLDER_FILES:
        return True
    return False


def to_post_reorg_path(file_path: str) -> str:
    """
    Convert a file path to its post-reorg location.

    content/en/foo.md → hugo/content/en/foo.md
    hugo/content/en/foo.md → hugo/content/en/foo.md  (already correct)
    README.md → README.md  (not a reorg-moved path)
    """
    parts = Path(file_path).parts
    if not parts:
        return file_path
    if parts[0] == "hugo":
        return file_path
    if parts[0] in HUGO_FOLDER_FILES:
        return "hugo/" + file_path
    return file_path


def to_pre_reorg_path(file_path: str) -> str | None:
    """
    Convert a post-reorg path back to its pre-reorg location, or None if not
    applicable.

    hugo/content/en/foo.md → content/en/foo.md
    """
    parts = Path(file_path).parts
    if len(parts) > 1 and parts[0] == "hugo" and parts[1] in HUGO_FOLDER_FILES:
        return "/".join(parts[1:])
    return None


# ---------------------------------------------------------------------------
# Merge conflict analysis (run inside a temp worktree)
# ---------------------------------------------------------------------------

def get_conflict_classification(worktree: Path) -> tuple[list[str], list[str]]:
    """
    Parse git status inside a worktree after a --no-commit merge attempt.

    Returns (reorg_conflicts, other_conflicts) — lists of conflicted file paths.

    git status --porcelain conflict codes (XY):
      UU  both modified
      AA  both added
      DD  both deleted
      AU  added by us, not staged on their side
      UA  added by them
      DU  deleted by us
      UD  deleted by them (common for rename/delete: the reorg "deleted" the
          file from the old path by renaming it; the PR still has the old path)

    For rename conflicts git shows  "old -> new"  in the path field.  We use
    the FINAL path (after the arrow) for classification, because that is the
    path that needs to be resolved in the working tree.
    """
    result = run(["git", "status", "--porcelain"], cwd=worktree)
    reorg: list[str] = []
    other: list[str] = []
    for line in result.stdout.splitlines():
        if len(line) < 4:
            continue
        xy = line[:2]
        path = line[3:]
        # Only unmerged (conflict) entries have U in XY or are AA/DD.
        if "U" not in xy and xy not in ("AA", "DD"):
            continue
        # Rename entries show "old -> new".  Treat a rename conflict as
        # reorg-caused only when BOTH endpoints map to reorg-moved paths; if
        # either side is unrelated, classify it as "other" so the PR goes to
        # manual review rather than getting an auto-fix we can't be sure about.
        if " -> " in path:
            src, dst = (p.strip() for p in path.split(" -> ", 1))
            both_reorg = is_reorg_path(src) and is_reorg_path(dst)
            (reorg if both_reorg else other).append(dst)
        else:
            path = path.strip()
            (reorg if is_reorg_path(path) else other).append(path)
    return reorg, other


def get_wrong_path_additions(worktree: Path) -> list[str]:
    """
    Find files staged in the test merge at PRE-REORG paths that should instead
    live under hugo/.

    These do not cause merge conflict markers — git happily adds the file at
    the old path with no complaint.  We catch them here so the caller can
    include them in the "reorg conflict" count.

    Specifically: any file with status 'A' (added) in the staged diff against
    HEAD whose first path segment is in moves_to_hugo is a "wrong path
    addition" caused by the PR adding a brand-new file at a pre-reorg path.
    """
    result = run(
        ["git", "diff", "--cached", "--name-status", "--diff-filter=A", "HEAD"],
        cwd=worktree,
    )
    wrong: list[str] = []
    for line in result.stdout.splitlines():
        parts = line.split("\t", 1)
        if len(parts) != 2:
            continue
        path = parts[1].strip()
        if path_first_segment(path) in HUGO_FOLDER_FILES:
            wrong.append(path)
    return wrong


# ---------------------------------------------------------------------------
# Diff path transformation
# ---------------------------------------------------------------------------

def transform_diff_paths(diff_text: str) -> str:
    """
    Rewrite file paths in a unified diff to use post-reorg (hugo/-prefixed) paths.

    Only paths whose first segment is in moves_to_hugo are changed; all other
    paths, and all diff hunk content lines, are left untouched.

    Handles the following diff header forms:
      diff --git a/<path> b/<path>
      --- a/<path>
      +++ b/<path>
      rename from <path>
      rename to <path>

    The hunk bodies (+/- content lines) are never touched because they contain
    file content, not file names.
    """
    out: list[str] = []
    for line in diff_text.splitlines(keepends=True):
        if line.startswith("diff --git "):
            # "diff --git a/content/en/foo.md b/content/en/foo.md"
            # Rewrite both the a/ and b/ path tokens.
            tokens = line.rstrip("\n").split(" ")
            new_tokens = []
            for tok in tokens:
                if tok.startswith("a/") or tok.startswith("b/"):
                    side, rest = tok[:2], tok[2:]
                    new_tokens.append(side + to_post_reorg_path(rest))
                else:
                    new_tokens.append(tok)
            out.append(" ".join(new_tokens) + "\n")
        elif line.startswith("--- a/") or line.startswith("+++ b/"):
            side = line[:6]  # "--- a/" or "+++ b/"
            rest = line[6:].rstrip("\n")
            out.append(side + to_post_reorg_path(rest) + "\n")
        elif line.startswith("rename from ") or line.startswith("rename to "):
            keyword_end = line.index(" ", line.index(" ") + 1) + 1
            keyword = line[:keyword_end]
            path = line[keyword_end:].rstrip("\n")
            out.append(keyword + to_post_reorg_path(path) + "\n")
        else:
            out.append(line)
    return "".join(out)


# ---------------------------------------------------------------------------
# GitHub label helpers
# ---------------------------------------------------------------------------

def ensure_label_exists(label: str, dry_run: bool, description: str = LABEL_DESCRIPTION) -> None:
    """Create the GitHub label if it doesn't already exist."""
    existing = gh_json("label", "list", "--repo", REPO, "--search", label, "--json", "name")
    if any(l["name"] == label for l in existing):  # type: ignore[index]
        return
    if dry_run:
        print(f"  [dry-run] would create label: {label!r}")
        return
    gh_run("label", "create", label, "--repo", REPO,
           "--color", LABEL_COLOR, "--description", description)
    print(f"  Created label: {label!r}")


def add_label(pr_number: int, label: str, dry_run: bool) -> None:
    if dry_run:
        print(f"  [dry-run] would add label {label!r} to PR #{pr_number}")
        return
    # Use the REST API rather than `gh pr edit --add-label`. `gh pr edit`
    # fetches the PR's projectCards to preserve them, but that field is part of
    # Projects (classic), now deprecated — so the call fails with a GraphQL
    # error even though only a label is being added. The REST labels endpoint
    # touches nothing else and appends the label.
    gh_run("api", f"repos/{REPO}/issues/{pr_number}/labels",
           "-f", f"labels[]={label}")
    print(f"  Added label {label!r} to PR #{pr_number}")


def remove_label(pr_number: int, label: str, dry_run: bool) -> None:
    if dry_run:
        print(f"  [dry-run] would remove label {label!r} from PR #{pr_number}")
        return
    # Mirror add_label: hit the REST labels endpoint directly to avoid
    # `gh pr edit`'s deprecated projectCards fetch. DELETE is a no-op (404)
    # if the label isn't present, so callers can call it unconditionally.
    gh_run("api", "--method", "DELETE",
           f"repos/{REPO}/issues/{pr_number}/labels/{label}")
    print(f"  Removed label {label!r} from PR #{pr_number}")


def post_comment(pr_number: int, body: str, dry_run: bool) -> None:
    if dry_run:
        print(f"  [dry-run] would comment on PR #{pr_number}:\n    {body[:120]}...")
        return
    gh_run("pr", "comment", str(pr_number), "--repo", REPO, "--body", body)
    print(f"  Posted comment on PR #{pr_number}")


def send_to_manual_review(pr_number: int, dry_run: bool) -> None:
    """Route a PR to manual review, consistently, wherever we can't auto-fix.

    Applies both the durable manual-review label (which excludes the PR from all
    future runs) and WORK IN PROGRESS (which keeps it out of the docs team's
    review queue until the author has resolved the conflicts), then comments once
    explaining what to do. build_manual_review_comment() already tells the author
    to remove the WORK IN PROGRESS label once the conflicts are resolved.

    Used for every non-auto-fixable outcome: non-reorg conflicts, unclassifiable
    merge failures, and failed replays.
    """
    add_label(pr_number, LABEL_MANUAL_REVIEW, dry_run)
    add_label(pr_number, LABEL_WIP, dry_run)
    post_comment(pr_number, build_manual_review_comment(), dry_run)


# ---------------------------------------------------------------------------
# Auto-fix
# ---------------------------------------------------------------------------

def find_open_fix_pr(fix_branch: str) -> dict | None:
    """Return an open PR opened from fix_branch on a prior run, or None.

    A run that dies after opening the fix PR but before closing the original
    leaves this PR behind. Finding it lets a later run finish the job instead of
    bailing to manual review.
    """
    prs = gh_json("pr", "list", "--repo", REPO, "--state", "open",
                  "--head", fix_branch, "--json", "number,url")
    return prs[0] if prs else None  # type: ignore[index]


def fix_branch_on_origin(fix_branch: str) -> bool:
    """True if fix_branch already exists on origin (pushed by a prior run)."""
    return bool(git("ls-remote", "--heads", "origin", fix_branch).stdout.strip())


def finalize_autofix(pr: dict, fix_branch: str, existing_fix_pr: dict | None) -> bool:
    """Finish an auto-fix once the fix branch exists on origin: ensure the fix PR
    is open and labeled, then close the original PR pointing at it and label the
    original autofixed.

    Kept separate from the branch-building steps so it can complete a run that
    was interrupted partway through. It is idempotent: label adds are no-ops when
    the label is already present, and the original PR is only ever closed once
    (it is still open whenever we reach here, since a closed PR drops out of the
    open-PR query). `existing_fix_pr` is a prior run's fix PR when one was already
    opened; otherwise it is None and we open the PR now.
    """
    pr_number = pr["number"]

    if existing_fix_pr:
        new_pr_number = existing_fix_pr["number"]
        print(f"  Reusing existing fix PR #{new_pr_number}: {existing_fix_pr['url']}")
    else:
        original_body = pr.get("body") or ""
        author_login = (pr.get("author") or {}).get("login")
        new_pr_body = build_autofix_pr_body(pr_number, original_body, author_login)
        new_pr_title = f"[reorg fix] {pr['title']}"
        pr_create = gh_run(
            "pr", "create",
            "--repo", REPO,
            "--head", fix_branch,
            "--base", pr["baseRefName"],
            "--title", new_pr_title,
            "--body", new_pr_body,
        )
        new_pr_url = pr_create.strip()
        new_pr_number = int(new_pr_url.rstrip("/").split("/")[-1])
        print(f"  Opened fix PR: {new_pr_url}")

    # Labels are a set on GitHub's side, so re-adding an existing one is a
    # harmless no-op — safe when finishing a run that applied some already.
    add_label(int(new_pr_number), LABEL_WIP, dry_run=False)
    add_label(int(new_pr_number), LABEL_AUTO_PR, dry_run=False)
    # In test mode, keep the auto-created PR out of other teams' review queues by
    # marking it "Do Not Merge". Never do this on real master.
    if IS_TEST_MODE:
        add_label(int(new_pr_number), LABEL_DO_NOT_MERGE, dry_run=False)

    gh_run(
        "pr", "close", str(pr_number), "--repo", REPO,
        "--comment", build_autofix_close_comment(new_pr_number),
    )
    print(f"  Closed PR #{pr_number} with comment pointing to fix PR #{new_pr_number}")
    add_label(pr_number, LABEL_AUTOFIXED, dry_run=False)
    return True


def attempt_fix(pr: dict, dry_run: bool) -> bool:
    """
    Attempt to auto-fix a reorg-conflict PR by re-applying its commits at the
    post-reorg paths.

    Strategy: format-patch + am, preserving the PR's individual commits.

      1. Find the merge base between the PR branch and BASE_BRANCH (the commit
         where the PR diverged from master before the reorg landed).
      2. Use `git format-patch` to export each PR commit as its own patch,
         including the original author name, email, and commit message.
      3. Rewrite file paths in every patch: anything whose first segment is in
         moves_to_hugo gets a hugo/ prefix (content/ → hugo/content/, etc.).
      4. Apply the series with `git am --3way` onto a fresh branch off
         BASE_BRANCH.  --3way falls back to a 3-way merge per patch when
         context lines have drifted due to unrelated master changes, so the
         PR's individual commits land cleanly even if master moved on.
      5. Push as `reorg-fix/pr-<N>` and post a comment on the PR.

    Using format-patch/am rather than a single squashed diff means the fix
    branch has the same commit history as the original PR — same messages,
    same authorship, same granularity — making it easy to review and to revert
    individual commits if needed.

    Returns True if the fix was applied (or would be in dry-run mode), False
    if we gave up and the caller should fall back to labeling.

    PRs from forks are not auto-fixed: we cannot push to a fork branch, so we
    return False immediately and let the caller add the manual-review label.
    """
    pr_number = pr["number"]
    head_ref = pr["headRefName"]
    pr_base = pr["baseRefName"]
    is_fork = pr.get("isCrossRepository", False)

    if is_fork:
        print(f"  PR #{pr_number} is from a fork — cannot push; will label instead.")
        return False

    # Fetch the PR branch so we can reference it locally.
    pr_remote_ref = f"refs/remotes/origin/{head_ref}"
    fetch = git("fetch", "origin", f"{head_ref}:{pr_remote_ref.replace('refs/remotes/', '')}")
    if fetch.returncode != 0:
        print(f"  fetch failed: {fetch.stderr.strip()[:120]}", file=sys.stderr)
        return False

    # The merge base is the last common ancestor of the PR branch and the PR's
    # actual base branch — the point where the PR diverged from master before
    # the reorg commit landed. In production pr_base == BASE_BRANCH (master);
    # in test mode it may be a per-run conflicting-base branch.
    merge_base = git("merge-base", f"origin/{pr_base}", pr_remote_ref)
    if merge_base.returncode != 0:
        print(f"  could not find merge base: {merge_base.stderr.strip()[:80]}", file=sys.stderr)
        return False
    base_sha = merge_base.stdout.strip()

    # Export each PR commit as a separate mbox-format patch.  stdout gives us
    # all patches concatenated; git am can consume this directly.
    format_patch = git("format-patch", "--stdout", f"{base_sha}..{pr_remote_ref}")
    if format_patch.returncode != 0:
        print(f"  format-patch failed: {format_patch.stderr.strip()[:80]}", file=sys.stderr)
        return False

    patches = format_patch.stdout
    if not patches.strip():
        print("  no patches between merge base and PR HEAD — nothing to apply.")
        return False

    transformed = transform_diff_paths(patches)

    fix_branch = f"reorg-fix/pr-{pr_number}"

    # A prior run may have died partway through: the fix branch was pushed and/or
    # the fix PR was opened, but the original PR was never closed. Detect that so
    # we FINISH the interrupted job rather than bail to manual review — which
    # would post a misleading "resolve it yourself" comment on a PR that already
    # has a working fix. Both checks are read-only, so they're safe in dry-run.
    existing_fix_pr = find_open_fix_pr(fix_branch)
    branch_pushed = existing_fix_pr is not None or fix_branch_on_origin(fix_branch)

    # Finish an interrupted run without rebuilding (and never force-pushing) the
    # branch, so a fix already in review is never clobbered.
    if existing_fix_pr:
        if dry_run:
            print(f"  [dry-run] fix PR #{existing_fix_pr['number']} already exists — "
                  f"would finish the interrupted auto-fix: label it, close "
                  f"#{pr_number} pointing to it, and label it {LABEL_AUTOFIXED!r}.")
            return True
        print(f"  Fix PR #{existing_fix_pr['number']} already exists — "
              f"finishing the interrupted auto-fix.")
        return finalize_autofix(pr, fix_branch, existing_fix_pr)
    if branch_pushed:
        if dry_run:
            print(f"  [dry-run] fix branch {fix_branch!r} exists on origin with no open "
                  f"PR — would open a PR from it and finish the auto-fix.")
            return True
        print(f"  Fix branch {fix_branch!r} exists on origin but has no open PR — "
              f"opening it and finishing the interrupted auto-fix.")
        return finalize_autofix(pr, fix_branch, None)

    # Build the fix branch and test git am in BOTH dry-run and live modes so
    # the dry-run accurately reflects whether the auto-fix would succeed. Only
    # the push and PR-creation steps are skipped in dry-run.
    tmpdir = tempfile.mkdtemp(prefix=f"reorg_fix_{pr_number}_")
    try:
        # A stale LOCAL branch can linger when a prior run's worktree was cleaned
        # up but its branch wasn't (worktree removal doesn't delete the branch).
        # We've already confirmed there's no fix PR and no origin branch, so any
        # local reorg-fix/pr-<N> is a safe-to-drop leftover. Prune first so the
        # delete isn't blocked by a registration for an already-deleted worktree.
        git("worktree", "prune")
        git("branch", "-D", fix_branch)  # no-op if it doesn't exist

        add_wt = git("worktree", "add", "-b", fix_branch, tmpdir, f"origin/{pr_base}")
        if add_wt.returncode != 0:
            # Still couldn't create the branch (e.g. it's checked out in a
            # lingering worktree we couldn't prune). Bail to manual review rather
            # than risk clobbering anything.
            print(f"  could not create fix branch {fix_branch!r} "
                  f"— leaving for manual review: "
                  f"{add_wt.stderr.strip()[:120]}", file=sys.stderr)
            return False
        worktree = Path(tmpdir)

        # git am replays each patch as its own commit, preserving the original
        # author and message.  --3way enables per-patch 3-way merging so that
        # patches whose context drifted (because master made unrelated edits
        # between the PR base and now) still apply cleanly.
        am = run(["git", "am", "--3way"], cwd=worktree, input=transformed)
        if am.returncode != 0:
            print(f"  git am failed:\n{am.stderr[:400]}", file=sys.stderr)
            run(["git", "am", "--abort"], cwd=worktree)
            return False

        if dry_run:
            # git am succeeded — report what the live run would do next.
            subjects = [l[len("Subject: "):] for l in transformed.splitlines()
                        if l.startswith("Subject: ")]
            print(f"  [dry-run] would apply {len(subjects)} commit(s) to {fix_branch}:")
            for s in subjects[:10]:
                print(f"    {s}")
            if len(subjects) > 10:
                print(f"    ... and {len(subjects) - 10} more")
            would_be_title = f"[reorg fix] {pr['title']}"
            print(f"  [dry-run] would open PR: {would_be_title!r}")
            print(f"  [dry-run] would label fix PR {LABEL_WIP!r}, {LABEL_AUTO_PR!r}")
            if IS_TEST_MODE:
                print(f"  [dry-run] would label fix PR {LABEL_DO_NOT_MERGE!r} (test mode)")
            print(f"  [dry-run] would close PR #{pr_number} with comment pointing to fix PR, "
                  f"and label it {LABEL_AUTOFIXED!r}")
            return True

        push = run(["git", "push", "origin", fix_branch], cwd=worktree)
        if push.returncode != 0:
            # The branch appeared on origin since our earlier check (a concurrent
            # run, most likely). We don't force-push; finish via whatever is
            # already there rather than clobber it.
            print(f"  push failed (fix branch appeared on origin): "
                  f"{push.stderr.strip()[:120]} — finishing via the existing branch.",
                  file=sys.stderr)
            return finalize_autofix(pr, fix_branch, find_open_fix_pr(fix_branch))

        print(f"  Pushed fix to branch {fix_branch!r}")
        return finalize_autofix(pr, fix_branch, None)

    finally:
        git("worktree", "remove", "--force", tmpdir)
        shutil.rmtree(tmpdir, ignore_errors=True)
        if dry_run:
            # Clean up the local branch created during the dry-run test (it was
            # never pushed, so deleting it here leaves no trace).
            git("branch", "-D", fix_branch)


# ---------------------------------------------------------------------------
# Per-PR analysis
# ---------------------------------------------------------------------------

def analyze_pr(pr: dict, dry_run: bool) -> bool:
    """Process one PR. Return True if we acted on it (auto-fixed or labeled in
    a way that counts toward --limit), False otherwise (mergeability not yet
    computed, no conflicts found locally, or MERGEABLE — which gets a label but
    doesn't consume --limit). The return value drives --limit.
    """
    pr_number = pr["number"]
    title = pr["title"]
    mergeable = pr.get("mergeable", "UNKNOWN")

    print(f"\nPR #{pr_number}: {title}")
    print(f"  mergeable: {mergeable}")

    if mergeable == "MERGEABLE":
        # No conflicts — label so future runs exclude it from the query. This
        # lets us ignore PRs that land after the reorg reaches master. Labeling
        # doesn't count as "acting" on the PR, so it never consumes --limit.
        print(f"  No conflicts — labeling {LABEL_NO_CONFLICTS!r} and skipping.")
        add_label(pr_number, LABEL_NO_CONFLICTS, dry_run)
        return False

    if mergeable == "UNKNOWN":
        # GitHub computes mergeability lazily; try again later if needed.
        print("  Mergeability not yet computed by GitHub — skipping.")
        return False

    # CONFLICTING: fetch the branch and do a local merge test to classify
    # conflicts as reorg-caused vs unrelated.
    pr_ref = f"refs/remotes/origin/{pr['headRefName']}"
    fetch = git("fetch", "origin",
                f"refs/pull/{pr_number}/head:{pr_ref.replace('refs/remotes/', '')}")
    if fetch.returncode != 0:
        print(f"  fetch failed: {fetch.stderr.strip()[:120]}", file=sys.stderr)
        return False

    # Use the PR's actual base branch for the merge test so the local result
    # matches what GitHub computes. In production this is always BASE_BRANCH
    # (master); in test mode the conflicting-base branch may differ because
    # create_test_prs.py builds a per-run branch with extra base_edits baked in.
    pr_base = pr["baseRefName"]
    if pr_base != BASE_BRANCH:
        fetch_base = git("fetch", "origin", pr_base)
        if fetch_base.returncode != 0:
            print(f"  fetch of PR base {pr_base!r} failed: "
                  f"{fetch_base.stderr.strip()[:120]}", file=sys.stderr)
            return False

    tmpdir = tempfile.mkdtemp(prefix=f"reorg_check_{pr_number}_")
    try:
        add_wt = git("worktree", "add", "--detach", tmpdir, f"origin/{pr_base}")
        if add_wt.returncode != 0:
            print(f"  worktree add failed: {add_wt.stderr.strip()[:120]}", file=sys.stderr)
            return False
        worktree = Path(tmpdir)

        # Attempt the merge without committing so we can inspect the conflicts.
        # We do NOT use --no-ff here; the default is fine since we're only
        # inspecting, not keeping the result.
        #
        # merge.renames=false disables git's rename detection for this test. The
        # reorg only MOVES files (content/foo -> hugo/content/foo); it never
        # edits their content. With rename detection ON (git's default), git
        # pairs a PR's edit at the old path with the moved file on the base and
        # merges cleanly, hiding the conflict entirely — so the script would see
        # nothing to fix. GitHub's mergeability check does no rename detection
        # and reports these as CONFLICTING (modify/delete). Disabling it here
        # makes the local test match what GitHub sees: the moved file surfaces
        # as a conflict at its pre-reorg path, which is_reorg_path() recognizes.
        merge = run(["git", "-c", "merge.renames=false", "merge", "--no-commit", pr_ref], cwd=worktree)

        # Classify any files that have conflict markers.
        reorg_conflicts, other_conflicts = get_conflict_classification(worktree)

        # The PR may have added files at pre-reorg paths with no conflict
        # marker. Scan for these "wrong path additions" regardless of merge
        # outcome: a non-conflicting reorg addition gets staged in the index
        # even when the merge fails on an unrelated conflict elsewhere, and
        # gating this scan on a clean merge would miss it — misclassifying a
        # mixed PR as non-reorg-only.
        wrong_additions = get_wrong_path_additions(worktree)
        # Treat wrong-path additions as reorg conflicts: the PR added a
        # file at a pre-reorg path that should be under hugo/. Deduplicate
        # to avoid double-counting files that appear in both lists (e.g. an
        # AA conflict at a pre-reorg path is already in reorg_conflicts).
        reorg_set = set(reorg_conflicts)
        reorg_conflicts.extend(p for p in wrong_additions if p not in reorg_set)

        # Always abort the test merge before leaving the worktree.
        run(["git", "merge", "--abort"], cwd=worktree)

        print(f"  Reorg-caused conflicts : {reorg_conflicts or 'none'}")
        print(f"  Unrelated conflicts    : {other_conflicts or 'none'}")
        if wrong_additions:
            print(f"  Wrong-path additions   : {wrong_additions}")

        if not reorg_conflicts and not other_conflicts:
            if merge.returncode != 0:
                # The merge failed but we couldn't classify any conflicted path
                # (an unusual conflict type we don't parse).  Don't guess that
                # it's reorg-caused — flag it for a human rather than skip a
                # real conflict.
                print("  Merge failed but no conflicts could be classified "
                      "— labeling for manual review.")
                send_to_manual_review(pr_number, dry_run)
                return True
            print("  No conflicts found locally (GitHub mergeability may be stale).")
            return False

        if other_conflicts and not reorg_conflicts:
            # Conflicts exist but none are from the reorg — label it so future
            # runs skip it, and leave a neutral comment so the author isn't
            # confused by a reorg-specific message.
            print("  Non-reorg conflicts only — labeling no-conflicts and commenting.")
            add_label(pr_number, LABEL_NO_CONFLICTS, dry_run)
            post_comment(pr_number, build_no_reorg_conflicts_comment(), dry_run)
            return True

        if other_conflicts:
            # Mixed: reorg AND non-reorg conflicts present.  We can't safely
            # auto-fix the reorg portion without also touching unrelated
            # conflicts, so route to manual review.
            print("  Mixed reorg + non-reorg conflicts — labeling for manual review.")
            send_to_manual_review(pr_number, dry_run)
            return True

        # All conflicts are reorg-caused.  Before attempting an auto-fix, skip
        # PRs that aren't ready: WIP and stale PRs both get a comment pointing
        # the author to astro-reorg-help-requested when they want manual help.
        is_wip = any(l["name"] == LABEL_WIP for l in pr.get("labels", []))
        if is_wip:
            print("  PR is marked WIP — skipping auto-fix, commenting and labeling.")
            # Comment once, then apply the skip label. The label is excluded from
            # the query, so later runs won't pick this PR up and re-comment.
            post_comment(pr_number, build_wip_comment(), dry_run)
            add_label(pr_number, LABEL_SKIP, dry_run)
            return True

        # Stale handling. The stale label is both the durable "we deemed this
        # stale" marker and the guard against re-commenting. We can't use
        # is_pr_stale() to decide whether a *labeled* PR has been reactivated:
        # our own label + comment bump updatedAt, so the PR would read as active
        # on the very next run. Instead we compare updatedAt against when we
        # applied the label — only activity after that (author pushes, comments,
        # or removing the label) counts as genuine reactivation.
        already_stale = any(l["name"] == LABEL_STALE for l in pr.get("labels", []))
        if already_stale:
            labeled_at = stale_labeled_at(pr_number)
            updated_at = _parse_ts(pr["updatedAt"]) if pr.get("updatedAt") else None
            reactivated = (
                labeled_at is not None and updated_at is not None
                and updated_at > labeled_at + STALE_REACTIVATE_GRACE
            )
            if not reactivated:
                print("  Already labeled stale, no activity since — "
                      "skipping without re-commenting.")
                return True
            print("  Reactivated since we labeled it stale — removing stale label.")
            remove_label(pr_number, LABEL_STALE, dry_run)
            # Fall through and process the PR normally.
        elif is_pr_stale(pr):
            print(f"  PR is stale (no activity in >{STALE_DAYS} days) — "
                  "commenting and labeling without auto-fix.")
            # Comment first, then label so the label is our last action: the
            # labeled-event timestamp then matches the PR's updatedAt, giving
            # the reactivation check on later runs a clean baseline.
            post_comment(pr_number, build_stale_comment(), dry_run)
            add_label(pr_number, LABEL_STALE, dry_run)
            return True

        # All conflicts are reorg-caused.  Attempt the auto-fix.
        print("  All conflicts are reorg-caused — attempting auto-fix.")
        success = attempt_fix(pr, dry_run)
        if success:
            # attempt_fix closed the PR and labeled it LABEL_AUTOFIXED. The
            # caller adds LABEL_PROCESSED on top for the affected-PR filter.
            return True
        # Auto-fix failed (fork, apply error, etc.) — fall back to labeling.
        print("  Auto-fix failed or not applicable — labeling for manual review.")
        send_to_manual_review(pr_number, dry_run)
        return True

    finally:
        run(["git", "worktree", "remove", "--force", tmpdir])
        shutil.rmtree(tmpdir, ignore_errors=True)


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def get_open_prs(only: list[int] | None = None, limit: int = 300, skip_stale: bool = False) -> list[dict]:
    """Return open PRs targeting BASE_BRANCH, optionally filtered to specific numbers.

    The --base filter is what keeps a run scoped: in test mode only PRs opened
    against the mock base branch are considered, so real PRs against master are
    never fetched, merged, labeled, or commented on. In live mode it scopes to
    PRs against master. Without it, `gh pr list` would return every open PR in
    the repo regardless of target.
    """
    # Only fields actually consumed below. Note baseRefOid/headRefOid are NOT
    # requested: `gh pr list` doesn't support them (only `gh pr view` does), and
    # nothing here uses them.
    fields = ("number,title,body,author,labels,headRefName,"
              "baseRefName,isCrossRepository,mergeable,updatedAt")
    if only:
        # Explicitly named PRs are an intentional override, but still guard
        # against acting on a PR that targets a different base than this run.
        prs = []
        for n in only:
            pr = gh_json("pr", "view", str(n), "--repo", REPO, "--json", fields)
            if pr.get("baseRefName") != BASE_BRANCH:  # type: ignore[union-attr]
                print(f"  Skipping PR #{n}: targets "
                      f"{pr.get('baseRefName')!r}, not base {BASE_BRANCH!r}.",  # type: ignore[union-attr]
                      file=sys.stderr)
                continue
            prs.append(pr)
        return prs
    return gh_json(  # type: ignore[return-value]
        "pr", "list", "--repo", REPO, "--state", "open",
        "--base", BASE_BRANCH,
        "--search", f"-label:{LABEL_NO_CONFLICTS} -label:{LABEL_MANUAL_REVIEW} "
                    f"-label:{LABEL_HELP_REQUESTED} -label:{LABEL_SKIP} "
                    f"-label:{LABEL_AUTO_PR} -label:{LABEL_ERROR}"
                    + (f" -label:{LABEL_STALE}" if skip_stale else ""),
        "--json", fields, "--limit", str(limit),
    )


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Check open PRs for reorg-caused merge conflicts.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "--dry-run", action=argparse.BooleanOptionalAction, default=True,
        help="Report what would be done without making any changes (default: on). Use --no-dry-run to apply changes.",
    )
    parser.add_argument(
        "--pr", type=int, action="append", dest="prs", metavar="NUMBER",
        help="Only check this PR number (may be repeated).",
    )
    parser.add_argument(
        "--limit", type=int, required=True, metavar="N",
        help="Fetch and act on at most N PRs. PRs needing no action don't count "
             "toward the limit. Use it to roll out gradually: start at 1, "
             "review, then raise it.",
    )
    parser.add_argument(
        "--base-branch", default=None, metavar="BRANCH",
        help="Branch to treat as the post-reorg base. Overrides the default "
             "(the mock base branch from config.yaml) and --live.",
    )
    parser.add_argument(
        "--live", action="store_true",
        help="Run against the real master. Without this the script defaults to "
             "the mock base branch from config.yaml (the same branch "
             "create_test_prs.py opens its test PRs against) for safety.",
    )
    parser.add_argument(
        "--skip-stale", action="store_true",
        help=f"Exclude PRs already labeled {LABEL_STALE!r} from the query. "
             "Useful when stale PRs would otherwise consume --limit slots "
             "before older active PRs are reached.",
    )
    args = parser.parse_args()

    if args.limit < 1:
        parser.error("--limit must be a positive integer.")

    if args.live and args.base_branch:
        parser.error("--live and --base-branch are mutually exclusive; "
                     "--live already selects master.")

    global BASE_BRANCH, IS_TEST_MODE
    if args.base_branch:
        BASE_BRANCH = args.base_branch
        # A custom base is a test/dev scenario unless it's the real master.
        IS_TEST_MODE = args.base_branch != "master"
    elif args.live:
        BASE_BRANCH = "master"
        print("LIVE mode — running against master.\n")
    else:
        # Default to the mock base branch so an accidental run can't touch
        # real PRs against master.
        if not TEST_BASE_BRANCH:
            parser.error("no base branch: set `test.mock_reorged_master_branch` in "
                         "config.yaml, or pass --live or --base-branch.")
        BASE_BRANCH = TEST_BASE_BRANCH
        IS_TEST_MODE = True
        print(f"TEST mode (default) — using mock base branch {BASE_BRANCH!r} "
              f"from config.yaml. Pass --live to run against master.\n")

    if args.dry_run:
        print("DRY-RUN mode — no branches or PRs will be modified.\n")

    print(f"Fetching origin/{BASE_BRANCH}...")
    fetch_master = git("fetch", "origin", BASE_BRANCH)
    if fetch_master.returncode != 0:
        print(f"Warning: could not update {BASE_BRANCH}: {fetch_master.stderr.strip()[:80]}",
              file=sys.stderr)

    ensure_label_exists(LABEL_MANUAL_REVIEW, args.dry_run)
    ensure_label_exists(LABEL_STALE, args.dry_run)
    ensure_label_exists(LABEL_AUTOFIXED, args.dry_run)
    ensure_label_exists(LABEL_AUTO_PR, args.dry_run)
    ensure_label_exists(LABEL_NO_CONFLICTS, args.dry_run)
    ensure_label_exists(LABEL_SKIP, args.dry_run)
    ensure_label_exists(LABEL_PROCESSED, args.dry_run)
    ensure_label_exists(LABEL_ERROR, args.dry_run, description=LABEL_ERROR_DESCRIPTION)

    existing_labels = gh_json("label", "list", "--repo", REPO, "--search", LABEL_WIP, "--json", "name")
    if not any(l["name"] == LABEL_WIP for l in existing_labels):  # type: ignore[index]
        print(f"Error: label {LABEL_WIP!r} does not exist in the repo. "
              f"Check that the label name is correct.", file=sys.stderr)
        sys.exit(1)

    prs = get_open_prs(args.prs, skip_stale=args.skip_stale)
    print(f"Found {len(prs)} open PR(s) to check.")
    print(f"Limit: will stop after acting on {args.limit} PR(s).")

    acted = 0
    start_time = time.monotonic()
    for pr in prs:
        if acted >= args.limit:
            print(f"\nReached --limit of {args.limit} acted-on PR(s) — stopping.")
            break
        # Isolate failures: one PR raising (e.g. a transient gh/network error)
        # shouldn't abort the whole batch.  A half-finished fix is safe to
        # retry — if the fix branch already exists, the re-run falls back to
        # manual review rather than clobbering it.
        try:
            if analyze_pr(pr, args.dry_run):
                # Mark every acted-on PR (however it was handled) so all
                # reorg-affected PRs are findable with one label filter.
                add_label(pr["number"], LABEL_PROCESSED, args.dry_run)
                acted += 1
        except Exception as exc:
            pr_number = pr.get("number")
            print(f"\nERROR processing PR #{pr_number or '?'}: {exc}",
                  file=sys.stderr)
            if pr_number:
                try:
                    add_label(pr_number, LABEL_ERROR, args.dry_run)
                except Exception as label_exc:
                    print(f"  Could not apply error label: {label_exc}", file=sys.stderr)
            print("  Skipping to the next PR.", file=sys.stderr)

    elapsed = time.monotonic() - start_time
    minutes, seconds = divmod(int(elapsed), 60)
    duration = f"{minutes}m {seconds}s" if minutes else f"{seconds}s"
    print(f"\nActed on {acted} PR(s) in {duration}. Done.")
    print(
        "\nView auto-fix PRs:\n"
        "  https://github.com/DataDog/documentation/pulls"
        "?q=is%3Apr+is%3Aopen+label%3Aastro-reorg-auto-pr"
    )
    subprocess.run(["afplay", "/System/Library/Sounds/Glass.aiff"], check=False)


if __name__ == "__main__":
    main()
