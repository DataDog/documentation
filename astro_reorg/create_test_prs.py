#!/usr/bin/env python3
"""Create test PRs against a mock base branch for exercising the reorg tooling.

For each spec in TEST_PRS this script:
  1. branches off master,
  2. applies the spec's content change,
  3. commits and pushes the branch,
  4. opens a PR against MOCK_BASE_BRANCH.

On completion it opens each new PR in the browser (falling back to printing
the URLs if a browser can't be launched).

The mock base branch must already exist on the remote. Set MOCK_BASE_BRANCH
below to point at it before running.
"""
from __future__ import annotations

import subprocess
import sys
import webbrowser
from pathlib import Path

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

# Branch the test PRs target. Create this on the remote before running.
MOCK_BASE_BRANCH = "jen.gilbert/astro-reorg-demo-7-10-114044"

REPO = "DataDog/documentation"
REPO_ROOT = Path(__file__).parent.parent

# Distinctive prefix so branches created here are obvious and easy to clean up.
BRANCH_PREFIX = "jen.gilbert/astro-reorg-test"

# Label applied to every PR so they can all be found together.
LABEL = "astro-reorg-testing"
LABEL_COLOR = "e4e669"
LABEL_DESCRIPTION = "Test PRs for exercising the astro reorg tooling"

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
    """Fail fast if the working tree is dirty or the mock base is missing."""
    status = git("status", "--porcelain")
    if status.stdout.strip():
        die("working tree is not clean; commit or stash your changes first.")

    # The mock base branch must exist on the remote so PRs can target it.
    ls = git("ls-remote", "--heads", "origin", MOCK_BASE_BRANCH)
    if not ls.stdout.strip():
        die(f"mock base branch '{MOCK_BASE_BRANCH}' not found on origin. "
            f"Create and push it before running.")


def current_branch() -> str:
    return git("rev-parse", "--abbrev-ref", "HEAD").stdout.strip()


# ---------------------------------------------------------------------------
# PR creation
# ---------------------------------------------------------------------------

def create_pr(spec: dict) -> str | None:
    """Create the branch, apply the change, push, and open a PR. Returns URL."""
    branch = spec["branch"]
    target = REPO_ROOT / spec["file"]
    print(f"\n=== {branch} ===")

    if not target.exists():
        die(f"target file does not exist: {spec['file']}")

    # Start from an up-to-date master so the change is a clean diff.
    if git("fetch", "origin", "master").returncode != 0:
        die("git fetch origin master failed.")

    # Recreate the branch from scratch so reruns are idempotent.
    git("branch", "-D", branch)  # ignore failure: branch may not exist yet
    checkout = git("checkout", "-b", branch, "origin/master")
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

    # Delete any stale remote copy of this test branch first so a plain (never
    # forced) push always fast-forwards. Only ever touches our own test branch.
    git("push", "origin", "--delete", branch)  # ignore failure: may not exist
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
