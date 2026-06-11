#!/usr/bin/env python3
"""
Find open PRs with merge conflicts caused by the reorg.
Defaults to a dry run where it just reports the changes
that would be made.

Usage:
    python3 astro_reorg/resolve_pr_conflicts.py [--dry-run] [--pr NUMBER ...]

Flags:
    --no-dry-run          Actually apply fixes and labels instead of just reporting what would be done.
    --base-branch BRANCH  Branch to treat as the post-reorg base (default: master).

Background:
    The reorg moves every entry in `moves_to_hugo` (astro_reorg/config.yaml)
    from the repo root into hugo/. For example, content/ → hugo/content/,
    layouts/ → hugo/layouts/, etc.  PRs opened before the reorg was merged to
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
      5. Push as `reorg-fix/pr-<N>`, open a new PR for it, comment on the
         original PR pointing to the fix PR, and label the original
         astro-reorg-stale.

    A PR that already carries the astro-reorg-stale label (a fix PR was opened
    on a prior run) is skipped, so re-running the script is safe.

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

MOVES_TO_HUGO: set[str] = set(_config.get("moves_to_hugo", []))
TOP_LEVEL: set[str] = set(_config.get("top_level", []))

REPO = "DataDog/documentation"
LABEL_MANUAL_REVIEW = "astro-reorg-manual-review"
LABEL_STALE = "astro-reorg-stale"
LABEL_COLOR = "e4e669"
LABEL_DESCRIPTION = "Needs manual conflict resolution after replatforming reorg"

# Set in main() from --base-branch; everything else reads this.
BASE_BRANCH = "master"

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
    if parts[0] in MOVES_TO_HUGO:
        return True
    if parts[0] == "hugo" and len(parts) > 1 and parts[1] in MOVES_TO_HUGO:
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
    if parts[0] in MOVES_TO_HUGO:
        return "hugo/" + file_path
    return file_path


def to_pre_reorg_path(file_path: str) -> str | None:
    """
    Convert a post-reorg path back to its pre-reorg location, or None if not
    applicable.

    hugo/content/en/foo.md → content/en/foo.md
    """
    parts = Path(file_path).parts
    if len(parts) > 1 and parts[0] == "hugo" and parts[1] in MOVES_TO_HUGO:
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
        if path_first_segment(path) in MOVES_TO_HUGO:
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

def ensure_label_exists(label: str, dry_run: bool) -> None:
    """Create the GitHub label if it doesn't already exist."""
    existing = gh_json("label", "list", "--repo", REPO, "--json", "name")
    if any(l["name"] == label for l in existing):  # type: ignore[index]
        return
    if dry_run:
        print(f"  [dry-run] would create label: {label!r}")
        return
    gh_run("label", "create", label, "--repo", REPO,
           "--color", LABEL_COLOR, "--description", LABEL_DESCRIPTION)
    print(f"  Created label: {label!r}")


def add_label(pr_number: int, label: str, dry_run: bool) -> None:
    if dry_run:
        print(f"  [dry-run] would add label {label!r} to PR #{pr_number}")
        return
    gh_run("pr", "edit", str(pr_number), "--repo", REPO, "--add-label", label)
    print(f"  Added label {label!r} to PR #{pr_number}")


def post_comment(pr_number: int, body: str, dry_run: bool) -> None:
    if dry_run:
        print(f"  [dry-run] would comment on PR #{pr_number}:\n    {body[:120]}...")
        return
    gh_run("pr", "comment", str(pr_number), "--repo", REPO, "--body", body)
    print(f"  Posted comment on PR #{pr_number}")


# ---------------------------------------------------------------------------
# Auto-fix
# ---------------------------------------------------------------------------

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

    # The merge base is the last common ancestor of the PR branch and
    # BASE_BRANCH — the point where the PR diverged from master before the
    # reorg commit landed.
    merge_base = git("merge-base", f"origin/{BASE_BRANCH}", pr_remote_ref)
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

    if dry_run:
        # Count patches and show per-patch file summaries.
        subjects = [l[len("Subject: "):] for l in transformed.splitlines()
                    if l.startswith("Subject: ")]
        print(f"  [dry-run] would apply {len(subjects)} commit(s) to reorg-fix/pr-{pr_number}:")
        for s in subjects[:10]:
            print(f"    {s}")
        if len(subjects) > 10:
            print(f"    ... and {len(subjects) - 10} more")
        would_be_title = f"[reorg fix] {pr['title']}"
        print(f"  [dry-run] would open PR: {would_be_title!r}")
        return True

    fix_branch = f"reorg-fix/pr-{pr_number}"
    tmpdir = tempfile.mkdtemp(prefix=f"reorg_fix_{pr_number}_")
    try:
        add_wt = git("worktree", "add", "-b", fix_branch, tmpdir, f"origin/{BASE_BRANCH}")
        if add_wt.returncode != 0:
            # Creating the branch failed — most likely a reorg-fix/pr-<N> branch
            # from a prior run already exists.  We do NOT reset and reuse it:
            # that could clobber a fix that's already in review.  Bail and let
            # the PR fall back to manual review.  (A fully-applied fix carries
            # astro-reorg-stale, so that PR would have been skipped earlier.)
            print(f"  could not create fix branch {fix_branch!r} "
                  f"(may already exist) — leaving for manual review: "
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

        push = run(["git", "push", "origin", fix_branch], cwd=worktree)
        if push.returncode != 0:
            # A reorg-fix/pr-<N> branch from a prior run already exists on
            # origin.  We don't force-push (repo policy), and a fix PR for it
            # most likely already exists, so bail to manual review rather than
            # clobber it.  (PRs that were fully fixed carry astro-reorg-stale
            # and are skipped before we ever get here.)
            print(f"  push failed (fix branch may already exist): "
                  f"{push.stderr.strip()[:120]}", file=sys.stderr)
            return False

        print(f"  Pushed fix to branch {fix_branch!r}")

        # Open a new PR for the fix branch so the author can preview, review,
        # and merge it directly — then close the original conflicting PR.
        original_body = pr.get("body") or ""
        new_pr_body = (
            f"🤖 Auto-generated fix for #{pr_number}.\n\n"
            f"This PR replays the commits from #{pr_number} with file paths "
            f"translated to the post-reorg `hugo/` layout. The original commits "
            f"are preserved — same messages and authorship.\n\n"
            f"If this looks correct, merge this PR and close #{pr_number}.\n\n"
            f"---\n\n"
            f"**Original PR description:**\n\n{original_body}"
        )
        # We only reach this point on a real run; dry-run returned earlier.
        new_pr_title = f"[reorg fix] {pr['title']}"
        pr_create = gh_run(
            "pr", "create",
            "--repo", REPO,
            "--head", fix_branch,
            "--base", BASE_BRANCH,
            "--title", new_pr_title,
            "--body", new_pr_body,
        )
        new_pr_url = pr_create.strip()
        new_pr_number = new_pr_url.rstrip("/").split("/")[-1]
        print(f"  Opened fix PR: {new_pr_url}")

        post_comment(
            pr_number,
            f"🤖 **Reorg conflict auto-fix: #{new_pr_number}**\n\n"
            f"This PR has merge conflicts caused by the astro reorg "
            f"(files moved from the repo root into `hugo/`). "
            f"A new PR with your commits translated to the correct paths "
            f"has been opened: #{new_pr_number}\n\n"
            f"If #{new_pr_number} looks correct, merge it and close this PR.",
            dry_run=False,
        )
        add_label(pr_number, LABEL_STALE, dry_run)
        return True

    finally:
        git("worktree", "remove", "--force", tmpdir)
        shutil.rmtree(tmpdir, ignore_errors=True)


# ---------------------------------------------------------------------------
# Per-PR analysis
# ---------------------------------------------------------------------------

def analyze_pr(pr: dict, dry_run: bool) -> None:
    pr_number = pr["number"]
    title = pr["title"]
    mergeable = pr.get("mergeable", "UNKNOWN")

    print(f"\nPR #{pr_number}: {title}")
    print(f"  mergeable: {mergeable}")

    # A fix PR was already opened for this one on a prior run — skip so we
    # don't re-push the fix branch or post a duplicate comment.  This makes
    # the whole script safe to re-run.
    if any(l["name"] == LABEL_STALE for l in pr.get("labels", [])):
        print(f"  Already has a fix PR ({LABEL_STALE}) — skipping.")
        return

    if mergeable == "MERGEABLE":
        print("  No conflicts — skipping.")
        return

    if mergeable == "UNKNOWN":
        # GitHub computes mergeability lazily; try again later if needed.
        print("  Mergeability not yet computed by GitHub — skipping.")
        return

    # CONFLICTING: fetch the branch and do a local merge test to classify
    # conflicts as reorg-caused vs unrelated.
    pr_ref = f"refs/remotes/origin/{pr['headRefName']}"
    fetch = git("fetch", "origin",
                f"refs/pull/{pr_number}/head:{pr_ref.replace('refs/remotes/', '')}")
    if fetch.returncode != 0:
        print(f"  fetch failed: {fetch.stderr.strip()[:120]}", file=sys.stderr)
        return

    tmpdir = tempfile.mkdtemp(prefix=f"reorg_check_{pr_number}_")
    try:
        add_wt = git("worktree", "add", "--detach", tmpdir, f"origin/{BASE_BRANCH}")
        if add_wt.returncode != 0:
            print(f"  worktree add failed: {add_wt.stderr.strip()[:120]}", file=sys.stderr)
            return
        worktree = Path(tmpdir)

        # Attempt the merge without committing so we can inspect the conflicts.
        # We do NOT use --no-ff here; the default is fine since we're only
        # inspecting, not keeping the result.
        merge = run(["git", "merge", "--no-commit", pr_ref], cwd=worktree)

        # Classify any files that have conflict markers.
        reorg_conflicts, other_conflicts = get_conflict_classification(worktree)

        # Even if the merge succeeded cleanly (returncode 0), the PR may have
        # added files at pre-reorg paths with no conflict marker.  Check for
        # these "wrong path additions" in the staged result.
        wrong_additions: list[str] = []
        if merge.returncode == 0:
            wrong_additions = get_wrong_path_additions(worktree)
            # Treat wrong-path additions as reorg conflicts: the PR added a
            # file at a pre-reorg path that should be under hugo/.
            reorg_conflicts.extend(wrong_additions)

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
                add_label(pr_number, LABEL_MANUAL_REVIEW, dry_run)
            else:
                print("  No conflicts found locally (GitHub mergeability may be stale).")
            return

        if other_conflicts:
            # The PR has conflicts that are NOT from the reorg.  We must not
            # touch it — just label it so a human can resolve it manually.
            print("  Non-reorg conflicts present — labeling for manual review.")
            add_label(pr_number, LABEL_MANUAL_REVIEW, dry_run)
        else:
            # All conflicts are reorg-caused.  Attempt the auto-fix.
            print("  All conflicts are reorg-caused — attempting auto-fix.")
            success = attempt_fix(pr, dry_run)
            if not success:
                # Auto-fix failed (fork, apply error, etc.) — fall back to labeling.
                print("  Auto-fix failed or not applicable — labeling for manual review.")
                add_label(pr_number, LABEL_MANUAL_REVIEW, dry_run)

    finally:
        run(["git", "worktree", "remove", "--force", tmpdir])
        shutil.rmtree(tmpdir, ignore_errors=True)


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def get_open_prs(only: list[int] | None = None) -> list[dict]:
    """Return open PRs, optionally filtered to specific numbers."""
    fields = ("number,title,body,labels,headRefName,headRepositoryOwner,"
              "baseRefName,headRefOid,baseRefOid,isCrossRepository,mergeable")
    if only:
        prs = []
        for n in only:
            pr = gh_json("pr", "view", str(n), "--repo", REPO, "--json", fields)
            prs.append(pr)
        return prs
    return gh_json(  # type: ignore[return-value]
        "pr", "list", "--repo", REPO, "--state", "open",
        "--json", fields, "--limit", "300",
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
        "--base-branch", default="master", metavar="BRANCH",
        help="Branch to treat as the post-reorg base (default: master). "
             "Set to a test branch to run against a fake main.",
    )
    args = parser.parse_args()

    global BASE_BRANCH
    BASE_BRANCH = args.base_branch

    if args.dry_run:
        print("DRY-RUN mode — no branches or PRs will be modified.\n")

    print(f"Fetching origin/{BASE_BRANCH}...")
    fetch_master = git("fetch", "origin", BASE_BRANCH)
    if fetch_master.returncode != 0:
        print(f"Warning: could not update {BASE_BRANCH}: {fetch_master.stderr.strip()[:80]}",
              file=sys.stderr)

    ensure_label_exists(LABEL_MANUAL_REVIEW, args.dry_run)
    ensure_label_exists(LABEL_STALE, args.dry_run)

    prs = get_open_prs(args.prs)
    print(f"Found {len(prs)} open PR(s) to check.")

    for pr in prs:
        # Isolate failures: one PR raising (e.g. a transient gh/network error)
        # shouldn't abort the whole batch.  A half-finished fix is safe to
        # retry — a re-run either skips it (astro-reorg-stale) or, if the fix
        # branch already exists, falls back to manual review.
        try:
            analyze_pr(pr, args.dry_run)
        except Exception as exc:
            print(f"\nERROR processing PR #{pr.get('number', '?')}: {exc}",
                  file=sys.stderr)
            print("  Skipping to the next PR.", file=sys.stderr)

    print("\nDone.")


if __name__ == "__main__":
    main()
