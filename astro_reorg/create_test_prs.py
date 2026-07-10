#!/usr/bin/env python3
"""Create test PRs against a mock base branch for exercising the reorg tooling.

For each spec in TEST_PRS this script:
  1. branches off BRANCH_FROM (a frozen snapshot of master),
  2. applies the spec's content change,
  3. commits and pushes the branch,
  4. opens a PR against MOCK_BASE_BRANCH.

On completion it opens each new PR in the browser (falling back to printing
the URLs if a browser can't be launched).

BRANCH_FROM and MOCK_BASE_BRANCH are read from the `test:` section of
config.yaml (shared with resolve_pr_conflicts.py, which defaults to this same
mock base branch). Both must already exist on the remote before running.
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
MOCK_BASE_BRANCH = _test_config["mock_base_branch"]

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
TEST_PRS = [
    {
        "branch": f"{BRANCH_PREFIX}-wording",
        "file": "content/en/getting_started/_index.md",
        "old": "supports every phase of software development",
        "new": "supports each phase of software development",
        "commit": "Test PR: minor wording tweak in getting started intro",
        "title": "[TEST] Minor wording tweak in getting started intro",
        "body": (
            "Test PR for exercising the astro reorg tooling. Makes a minor, "
            "non-material wording change in the getting started intro paragraph.\n\n"
            "Do not merge."
        ),
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
    """Create the shared label if it doesn't already exist."""
    existing = gh("label", "list", "--repo", REPO, "--json", "name", "--jq", ".[].name")
    if LABEL in existing.stdout.split():
        return
    create = gh("label", "create", LABEL, "--repo", REPO,
                "--color", LABEL_COLOR, "--description", LABEL_DESCRIPTION)
    if create.returncode != 0:
        die(f"could not create label {LABEL!r}: {create.stderr.strip()}")
    print(f"Created label: {LABEL!r}")


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

def create_pr(spec: dict) -> str | None:
    """Create the branch, apply the change, push, and open a PR. Returns URL."""
    # Append a short unique suffix so every run creates a fresh branch rather
    # than colliding with one from a previous run.
    branch = f"{spec['branch']}-{uuid.uuid4().hex[:8]}"
    target = REPO_ROOT / spec["file"]
    print(f"\n=== {branch} ===")

    if not target.exists():
        die(f"target file does not exist: {spec['file']}")

    # Start from the frozen snapshot so the PR diff is just this change.
    if git("fetch", "origin", BRANCH_FROM).returncode != 0:
        die(f"git fetch origin {BRANCH_FROM} failed.")

    checkout = git("checkout", "-b", branch, f"origin/{BRANCH_FROM}")
    if checkout.returncode != 0:
        die(f"could not create branch {branch}: {checkout.stderr.strip()}")

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
        "--base", MOCK_BASE_BRANCH,
        "--title", spec["title"],
        "--body", spec["body"],
        "--label", LABEL,
        "--label", DO_NOT_MERGE_LABEL,
    )
    if pr.returncode != 0:
        die(f"gh pr create failed: {pr.stderr.strip()}")

    url = pr.stdout.strip().splitlines()[-1]
    print(f"  Opened PR: {url}")
    return url


def main() -> None:
    preflight()
    ensure_label()
    original_branch = current_branch()

    urls: list[str] = []
    try:
        for spec in TEST_PRS:
            url = create_pr(spec)
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

    # Open in the browser; webbrowser.open returns False if it can't.
    opened_any = False
    for url in urls:
        try:
            opened_any = webbrowser.open(url) or opened_any
        except Exception:
            pass
    if not opened_any:
        print("\nCould not open a browser. Use the links above.")


if __name__ == "__main__":
    main()
