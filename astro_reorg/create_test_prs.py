#!/usr/bin/env python3
"""Create test PRs against a mock base branch for exercising the reorg tooling.

For each spec in TEST_PRS this script:
  1. branches off BRANCH_FROM (a frozen snapshot of master),
  2. applies the spec's content change,
  3. commits and pushes the branch,
  4. opens a PR against the base branch (see below).

On completion it opens each new PR in the browser (falling back to printing
the URLs if a browser can't be launched).

BRANCH_FROM and MOCK_BASE_BRANCH are read from the `test:` section of
config.yaml (shared with resolve_pr_conflicts.py, which defaults to this same
mock base branch). Both must already exist on the remote before running.

Testing the *unresolvable* conflict paths:
    By default the mock base differs from the PRs only by pure file moves, so
    resolve_pr_conflicts.py always replays them cleanly. To exercise the cases
    where it CAN'T auto-fix, a spec may carry a `base_edit` describing a change
    to make on the base itself — on the same line the PR touches, but at the
    post-reorg (hugo/) path. When any spec has a base_edit, this script builds a
    throwaway base branch off MOCK_BASE_BRANCH (unique per run, so no
    force-push), applies every base_edit to it, and points ALL the PRs at that
    branch. Then one resolve_pr_conflicts.py run against it exercises both a
    clean auto-fix and the manual-review fallbacks. The exact command to run is
    printed at the end.

    - A base_edit on a moved (hugo/) file makes git am --3way fail: the fix is
      classified reorg-caused but can't be replayed (manual-review fallback).
    - A base_edit on a top-level (never-moved) file surfaces as a plain
      non-reorg conflict, which is sent straight to manual review.

View all test PRs: https://github.com/DataDog/documentation/pulls?q=is%3Apr+is%3Aopen+label%3Aastro-reorg-testing
"""
from __future__ import annotations

import subprocess
import sys
import uuid
import webbrowser
from pathlib import Path

try:
    import yaml
except ImportError:
    print("Error: PyYAML is required. Install with: pip install pyyaml", file=sys.stderr)
    sys.exit(1)

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

REPO = "DataDog/documentation"
REPO_ROOT = Path(__file__).parent.parent
CONFIG_PATH = Path(__file__).parent / "config.yaml"

# The test branches live in config.yaml under `test:` so this script and
# resolve_pr_conflicts.py always agree on which branches a test run uses.
with CONFIG_PATH.open() as f:
    _test_config = yaml.safe_load(f).get("test", {})

# Branch the test PRs target. Create this on the remote before running.
MOCK_BASE_BRANCH = _test_config["mock_reorged_master_branch"]

# Branch the test PRs are cut from. This is a frozen snapshot of master (created
# manually) so PR diffs stay small: a PR shows every commit in the head branch
# that isn't in the base, so branching off a moving master would drag in every
# new master commit as noise. Branching off this frozen point keeps each PR to
# just its own change. Must already exist on the remote.
BRANCH_FROM = _test_config["branch_from"]

# Distinctive prefix so branches created here are obvious and easy to clean up.
BRANCH_PREFIX = "jen.gilbert/astro-reorg-test"

# Label applied to every PR so they can all be found together. Created by the
# script if missing (see ensure_label).
LABEL = "astro-reorg-testing"
LABEL_COLOR = "e4e669"
LABEL_DESCRIPTION = "Test PRs for exercising the astro reorg tooling"

# Existing repo label applied to every test PR to guard against accidental
# merges. Assumed to already exist in the repo.
DO_NOT_MERGE_LABEL = "Do Not Merge"

# Each spec describes one PR: the branch to create, the file to edit, the exact
# text to replace (old -> new, must match once), and the PR title/body.
#
# An optional `base_edit` makes the conflict unresolvable by having the BASE
# branch also change the same line (at the post-reorg hugo/ path). See the
# module docstring. Specs without a base_edit still auto-fix cleanly, so a run
# that mixes both kinds exercises every resolve_pr_conflicts.py outcome at once.
#
# An optional `add_file` ({path, content}) also creates a brand-new page at a
# pre-reorg path, on top of the old->new edit, to model "added a page and linked
# it in the nav menu."
TEST_PRS = [
    {
        # Resolvable: reorg-only conflict, auto-fix replays it cleanly.
        #
        # IMPORTANT: this edit must target a different LINE than any base_edit
        # in the other specs. Git merges at line granularity, so even two edits
        # to different words on the same long line will conflict. The description
        # frontmatter field is on its own line and no base_edit touches it.
        "branch": f"{BRANCH_PREFIX}-wording",
        "file": "content/en/getting_started/_index.md",
        "old": "with guides for installation, configuration, and getting started with key features.",
        "new": "with guides for setup, configuration, and getting started with key features.",
        "commit": "Test PR: minor wording tweak in getting started description",
        "title": "[TEST] Minor wording tweak in getting started intro (auto-fixable)",
        "body": (
            "Test PR for exercising the astro reorg tooling. Makes a minor, "
            "non-material wording change in the getting started page description.\n\n"
            "Do not merge."
        ),
    },
    {
        # Unresolvable (Case 2): reorg-classified, but the base changed the same
        # line at the hugo/ path, so git am --3way can't replay it. Falls back
        # to the astro-reorg-manual-review label.
        "branch": f"{BRANCH_PREFIX}-unresolvable-reorg",
        "file": "content/en/getting_started/_index.md",
        "old": "combined into a customized solution",
        "new": "combined into a unified solution",
        "commit": "Test PR: edit a line the reorged base also changed",
        "title": "[TEST] Unresolvable reorg conflict (base edited the same line) (not auto-fixable)",
        "body": (
            "Test PR for exercising the astro reorg tooling. Edits a line that "
            "the reorged base branch also changed, so the auto-fix can't replay "
            "it and the PR should be labeled for manual review.\n\n"
            "Do not merge."
        ),
        "base_edit": {
            "file": "hugo/content/en/getting_started/_index.md",
            "old": "combined into a customized solution",
            "new": "combined into a tailored solution",
        },
    },
    {
        # Unresolvable (Case 1): the conflict is on a top-level file the reorg
        # never moves, so it isn't reorg-caused at all — sent straight to manual
        # review with no auto-fix attempt.
        "branch": f"{BRANCH_PREFIX}-non-reorg-conflict",
        "file": "CONTRIBUTING.md",
        "old": "how to write and edit content",
        "new": "how to write and revise content",
        "commit": "Test PR: edit a top-level file the base also changed",
        "title": "[TEST] Non-reorg conflict on a top-level file (not auto-fixable)",
        "body": (
            "Test PR for exercising the astro reorg tooling. Creates a conflict "
            "on a top-level file that the reorg doesn't move, so it isn't a "
            "reorg conflict and should go straight to manual review.\n\n"
            "Do not merge."
        ),
        "base_edit": {
            "file": "CONTRIBUTING.md",
            "old": "how to write and edit content",
            "new": "how to author and edit content",
        },
    },
    {
        # Unresolvable (Case 3): a new page plus a nav-menu link to it, where
        # the base branch edited that same menu line. The new page is a
        # wrong-path addition (added at a pre-reorg content/ path) AND the menu
        # edit conflicts with the base, so the fix is classified reorg-caused
        # but git am --3way can't replay the menu change -> manual review.
        "branch": f"{BRANCH_PREFIX}-new-page-nav-conflict",
        "add_file": {
            "path": "content/en/getting_started/example_feature/_index.md",
            "content": (
                "---\n"
                "title: Example Feature\n"
                "---\n\n"
                "Placeholder page for exercising the astro reorg tooling.\n"
            ),
        },
        "file": "config/_default/menus/main.en.yaml",
        # Insert a nav entry for the new page just before the Essentials heading.
        "old": "    - name: Essentials",
        "new": (
            "    - name: Example Feature\n"
            "      identifier: example_feature_heading\n"
            "      url: /getting_started/example_feature/\n"
            "      weight: 500000\n"
            "    - name: Essentials"
        ),
        "commit": "Test PR: add a page and a nav menu link to it",
        "title": "[TEST] New page with nav link (base edited the same menu line) (not auto-fixable)",
        "body": (
            "Test PR for exercising the astro reorg tooling. Adds a new page and "
            "a nav menu entry linking to it. The base branch renames that same "
            "menu heading, so the auto-fix can't replay the menu change and the "
            "PR should be labeled for manual review.\n\n"
            "Do not merge."
        ),
        # Someone else renamed the same heading the PR inserts in front of.
        "base_edit": {
            "file": "hugo/config/_default/menus/main.en.yaml",
            "old": "    - name: Essentials",
            "new": "    - name: Essential Features",
        },
    },
]

# ---------------------------------------------------------------------------
# Shell helpers
# ---------------------------------------------------------------------------

def run(cmd: list[str], *, cwd: Path | None = None) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, capture_output=True, text=True, cwd=cwd or REPO_ROOT)


def git(*args: str) -> subprocess.CompletedProcess:
    return run(["git", *args])


def gh(*args: str) -> subprocess.CompletedProcess:
    return run(["gh", *args])


def die(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    sys.exit(1)


def ensure_label() -> None:
    """Create the shared label, treating "already exists" as success.

    We don't pre-check with `gh label list`: it defaults to 30 labels, so in a
    repo with many labels an existing one may not show up, and we'd then fail on
    create. Instead we just create and accept the "already exists" error.
    """
    create = gh("label", "create", LABEL, "--repo", REPO,
                "--color", LABEL_COLOR, "--description", LABEL_DESCRIPTION)
    if create.returncode == 0:
        print(f"Created label: {LABEL!r}")
        return
    if "already exists" in create.stderr.lower():
        return
    die(f"could not create label {LABEL!r}: {create.stderr.strip()}")


# ---------------------------------------------------------------------------
# Preflight
# ---------------------------------------------------------------------------

def preflight() -> None:
    """Fail fast on uncommitted tracked changes, or if the mock base is missing.

    Only TRACKED changes matter: the script switches branches and builds a
    commit, so staged/unstaged edits could be carried across or swept in.
    Untracked files (e.g. a folder from another branch that doesn't exist here)
    are ignored — they don't block checkouts and never enter the commit, which
    only `git add`s the one target file.
    """
    unstaged = git("diff", "--quiet").returncode != 0
    staged = git("diff", "--cached", "--quiet").returncode != 0
    if unstaged or staged:
        die("you have uncommitted changes to tracked files; "
            "commit or stash them first. (Untracked files are fine.)")

    # Both the branch-off point and the PR target must exist on the remote.
    for name in (BRANCH_FROM, MOCK_BASE_BRANCH):
        ls = git("ls-remote", "--heads", "origin", name)
        if not ls.stdout.strip():
            die(f"branch '{name}' not found on origin. "
                f"Create and push it before running.")


def current_branch() -> str:
    return git("rev-parse", "--abbrev-ref", "HEAD").stdout.strip()


# ---------------------------------------------------------------------------
# PR creation
# ---------------------------------------------------------------------------

def build_conflicting_base(specs: list[dict]) -> str | None:
    """Build a throwaway base branch that conflicts with the base_edit specs.

    Some specs carry a `base_edit` describing a change to make ON THE BASE, at a
    post-reorg (hugo/) path, on the same line the PR touches at the pre-reorg
    path. That divergent edit is what makes resolve_pr_conflicts.py's auto-fix
    fail (git am --3way can't reconcile the line) or — for a top-level file —
    surfaces as a plain non-reorg conflict. Without it the mock base differs
    from the PRs only by pure file moves, which always replay cleanly.

    Builds a fresh branch off origin/MOCK_BASE_BRANCH, unique per run so a plain
    push always fast-forwards (no force-push, per repo policy), applies every
    base_edit, commits, and pushes. Returns the branch name, or None if no spec
    needs a conflicting base (in which case callers use MOCK_BASE_BRANCH).
    """
    edits = [s["base_edit"] for s in specs if s.get("base_edit")]
    if not edits:
        return None

    branch = f"{MOCK_BASE_BRANCH}-conflict-{uuid.uuid4().hex[:8]}"
    print(f"\n=== building conflicting base {branch} ===")

    if git("fetch", "origin", MOCK_BASE_BRANCH).returncode != 0:
        die(f"git fetch origin {MOCK_BASE_BRANCH} failed.")

    checkout = git("checkout", "-b", branch, f"origin/{MOCK_BASE_BRANCH}")
    if checkout.returncode != 0:
        die(f"could not create branch {branch}: {checkout.stderr.strip()}")

    # base_edit paths are post-reorg (hugo/...), so they exist on this branch.
    for edit in edits:
        target = REPO_ROOT / edit["file"]
        if not target.exists():
            die(f"base_edit target does not exist on the base branch: {edit['file']}")
        text = target.read_text()
        count = text.count(edit["old"])
        if count != 1:
            die(f"expected {edit['old']!r} exactly once in {edit['file']}, "
                f"found {count}.")
        target.write_text(text.replace(edit["old"], edit["new"]))
        git("add", edit["file"])

    commit = git("commit", "-m",
                 "Test setup: edit reorged files so open test PRs conflict")
    if commit.returncode != 0:
        die(f"base commit failed: {commit.stderr.strip()}")

    push = git("push", "--set-upstream", "origin", branch)
    if push.returncode != 0:
        die(f"push of conflicting base failed: {push.stderr.strip()}")

    print(f"  Pushed conflicting base: {branch}")
    return branch


def create_pr(spec: dict, base: str) -> str | None:
    """Create the branch, apply the change, push, and open a PR. Returns URL."""
    # Append a short unique suffix so every run creates a fresh branch rather
    # than colliding with one from a previous run.
    branch = f"{spec['branch']}-{uuid.uuid4().hex[:8]}"
    target = REPO_ROOT / spec["file"]
    print(f"\n=== {branch} ===")

    # Start from the frozen snapshot so the PR diff is just this change.
    if git("fetch", "origin", BRANCH_FROM).returncode != 0:
        die(f"git fetch origin {BRANCH_FROM} failed.")

    checkout = git("checkout", "-b", branch, f"origin/{BRANCH_FROM}")
    if checkout.returncode != 0:
        die(f"could not create branch {branch}: {checkout.stderr.strip()}")

    # Check after checkout: the file exists on BRANCH_FROM (pre-reorg) but not
    # on the conflicting base branch (post-reorg), so the check must run here.
    if not target.exists():
        die(f"target file does not exist: {spec['file']}")

    # Optionally add a brand-new page at a pre-reorg path (content/...). The
    # resolver detects this as a "wrong-path addition" that belongs under hugo/.
    add_file = spec.get("add_file")
    if add_file:
        new_page = REPO_ROOT / add_file["path"]
        if new_page.exists():
            die(f"add_file target already exists: {add_file['path']}")
        new_page.parent.mkdir(parents=True, exist_ok=True)
        new_page.write_text(add_file["content"])
        git("add", add_file["path"])

    # Apply the wording change.
    text = target.read_text()
    count = text.count(spec["old"])
    if count != 1:
        die(f"expected to find {spec['old']!r} exactly once in {spec['file']}, "
            f"found {count}.")
    target.write_text(text.replace(spec["old"], spec["new"]))

    git("add", spec["file"])
    commit = git("commit", "-m", spec["commit"])
    if commit.returncode != 0:
        die(f"commit failed: {commit.stderr.strip()}")

    # Branch name is unique per run, so a plain push always fast-forwards.
    push = git("push", "--set-upstream", "origin", branch)
    if push.returncode != 0:
        die(f"push failed: {push.stderr.strip()}")

    pr = gh(
        "pr", "create",
        "--repo", REPO,
        "--head", branch,
        "--base", base,
        "--title", spec["title"],
        "--body", spec["body"],
        "--label", LABEL,
        "--label", DO_NOT_MERGE_LABEL,
    )
    if pr.returncode != 0:
        die(f"gh pr create failed: {pr.stderr.strip()}")

    url = pr.stdout.strip().splitlines()[-1]
    print(f"  Opened PR against {base}: {url}")
    return url


def main() -> None:
    preflight()
    ensure_label()
    original_branch = current_branch()

    urls: list[str] = []
    conflicting_base: str | None = None
    try:
        # If any spec needs the base to diverge, build one throwaway conflicting
        # base and point every PR at it, so a single resolve_pr_conflicts.py run
        # (--base-branch <that branch>) exercises the clean auto-fix and the
        # manual-review fallbacks together. Build it before cutting PR branches;
        # this leaves the working tree on the base branch, but each create_pr
        # checks out fresh off BRANCH_FROM anyway.
        conflicting_base = build_conflicting_base(TEST_PRS)
        base = conflicting_base or MOCK_BASE_BRANCH

        for spec in TEST_PRS:
            url = create_pr(spec, base)
            if url:
                urls.append(url)
    finally:
        # Return to wherever we started, whatever happened.
        git("checkout", original_branch)

    if not urls:
        print("\nNo PRs created.")
        return

    print(f"\nCreated {len(urls)} PR(s):")
    for url in urls:
        print(f"  {url}")

    base_flag = f"--base-branch {conflicting_base}" if conflicting_base else "--live"
    print(
        f"\nView all test PRs:\n"
        f"  https://github.com/DataDog/documentation/pulls"
        f"?q=is%3Apr+is%3Aopen+label%3Aastro-reorg-testing\n"
        f"\nDry-run conflict resolution (no changes made):\n"
        f"  python3 astro_reorg/resolve_pr_conflicts.py {base_flag}\n"
        f"\nLive conflict resolution (applies fixes and labels):\n"
        f"  python3 astro_reorg/resolve_pr_conflicts.py --no-dry-run {base_flag}"
    )


if __name__ == "__main__":
    main()
