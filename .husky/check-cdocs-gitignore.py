#!/usr/bin/env python3

"""
Pre-commit hook that verifies files listed in content/.gitignore
are not tracked by git. These are compiled Cdocs files that should
be removed from version control.
"""

import subprocess
import sys
from pathlib import Path

GITIGNORE_PATH = Path("content/.gitignore")


def get_gitignored_paths():
    """Parse content/.gitignore and return .md file paths."""
    if not GITIGNORE_PATH.exists():
        return []

    paths = []
    for line in GITIGNORE_PATH.read_text().splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        if stripped.endswith(".md"):
            # Paths in the gitignore are relative to content/, e.g. /en/foo/bar.md
            # Convert to repo-relative paths: content/en/foo/bar.md
            repo_path = "content" + stripped
            paths.append(repo_path)
    return paths


def is_tracked(file_path):
    """Check if a file is currently tracked by git."""
    result = subprocess.run(
        ["git", "ls-files", "--error-unmatch", file_path],
        capture_output=True,
        text=True,
    )
    return result.returncode == 0


def main():
    paths = get_gitignored_paths()
    if not paths:
        print("✅ No Cdocs paths found in content/.gitignore to check.")
        sys.exit(0)

    tracked = []
    for path in paths:
        if is_tracked(path):
            tracked.append(path)

    if tracked:
        err = sys.stderr
        print("\n❌ Tracked Cdocs files found!", file=err)
        print("=" * 50, file=err)
        print(
            "\nThe following files are listed in content/.gitignore"
            " but are still tracked by git:\n",
            file=err,
        )
        for path in tracked:
            print(f"  - {path}", file=err)

        print("\nTo fix this, run the following commands:\n", file=err)
        for path in tracked:
            print(f"  git rm --cached {path}", file=err)

        print(
            "\nThen commit the result. The files will remain on disk"
            " but will no longer be tracked by git.\n",
            file=err,
        )
        print("=" * 50, file=err)
        print(
            f"\nFound {len(tracked)} tracked file(s) that should be untracked."
            " Please fix before committing.\n",
            file=err,
        )
        sys.exit(1)

    print("✅ No tracked Cdocs files found. All gitignored files are untracked.")
    sys.exit(0)


if __name__ == "__main__":
    main()
