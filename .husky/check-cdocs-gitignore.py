#!/usr/bin/env python3

"""
Pre-commit hook that verifies files listed in content/.gitignore
are not tracked by git. These are compiled Cdocs files that should
be removed from version control.
"""

import subprocess
import sys
from pathlib import Path

GITIGNORE_PATH = Path("hugo/content/.gitignore")


def get_gitignore_patterns():
    """Parse content/.gitignore and return .md file patterns."""
    if not GITIGNORE_PATH.exists():
        return []

    patterns = []
    for line in GITIGNORE_PATH.read_text().splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        if stripped.endswith(".md"):
            # Paths in the gitignore are relative to content/, e.g. /en/foo/bar.md
            # Convert to repo-relative patterns: content/en/foo/bar.md
            repo_pattern = "hugo/content" + stripped
            patterns.append(repo_pattern)
    return patterns


def get_tracked_files(pattern):
    """Return list of tracked files matching a pattern (may contain globs)."""
    result = subprocess.run(
        ["git", "ls-files", pattern],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0 or not result.stdout.strip():
        return []
    return result.stdout.strip().splitlines()


def has_mdoc_source(file_path):
    """Check if a .mdoc.md source file exists alongside the compiled .md file."""
    mdoc_path = Path(file_path).with_suffix("").with_suffix(".mdoc.md")
    return mdoc_path.exists()


def classify_tracked_files(tracked):
    """Split tracked files into compiled output (has local mdoc) vs orphaned translations."""
    compiled = []
    orphaned = []
    for path in tracked:
        if has_mdoc_source(path):
            compiled.append(path)
        else:
            orphaned.append(path)
    return compiled, orphaned


def main():
    patterns = get_gitignore_patterns()
    if not patterns:
        print("✅ No Cdocs paths found in content/.gitignore to check.")
        sys.exit(0)

    tracked = []
    for pattern in patterns:
        tracked.extend(get_tracked_files(pattern))

    if not tracked:
        print("✅ No tracked Cdocs files found. All gitignored files are untracked.")
        sys.exit(0)

    compiled, orphaned = classify_tracked_files(tracked)
    err = sys.stderr

    print("\n❌ Tracked Cdocs files found!", file=err)
    print("=" * 50, file=err)

    if compiled:
        print(
            "\nThe following compiled Cdocs files are tracked but should not be.\n"
            "They have a .mdoc.md source and the compiled output should be untracked:\n",
            file=err,
        )
        for path in compiled:
            print(f"  - {path}", file=err)
        print("\nTo fix, run:\n", file=err)
        for path in compiled:
            print(f"  git rm --cached {path}", file=err)
        print(
            "\nThe files will remain on disk but will no longer be tracked by git.",
            file=err,
        )

    if orphaned:
        print(
            "\nThe following files are orphaned translations with no .mdoc.md source.\n"
            "The English version is a Cdocs page, so these outdated files should be deleted:\n",
            file=err,
        )
        for path in orphaned:
            print(f"  - {path}", file=err)
        print("\nTo fix, run:\n", file=err)
        for path in orphaned:
            print(f"  git rm {path}", file=err)

    print("\n" + "=" * 50, file=err)
    total = len(compiled) + len(orphaned)
    print(
        f"\nFound {total} tracked file(s) that should be untracked or deleted."
        " Please fix before committing.\n",
        file=err,
    )
    sys.exit(1)

    print("✅ No tracked Cdocs files found. All gitignored files are untracked.")
    sys.exit(0)


if __name__ == "__main__":
    main()
