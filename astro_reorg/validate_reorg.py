#!/usr/bin/env python3
"""
Post-reorg validation harness.

Run this AFTER execute_reorg.py, from the repo root, on a feature branch (not master).
The harness is non-destructive: every file it creates lives under a '__reorg_harness__'
prefix, and every change (staged paths, gitignore edits) is reverted in a finally block.
It never commits.
"""

import sys

from helpers import (
    hugo_dir,
    git,
    load_config,
    results,
    check_layout,
    check_gitignore_split,
    check_workflows,
    check_workflow_path_filters,
    check_codeowners,
    check_codeowners_prefixing,
    check_husky_circular_aliases,
    check_husky_section_index,
    check_husky_cdocs_gitignore,
    check_build_presence,
    check_rollback_roundtrip,
)


def main():
    if not hugo_dir.exists():
        print("hugo/ does not exist — run astro_reorg/execute_reorg.py first.", file=sys.stderr)
        sys.exit(1)

    branch = git("branch", "--show-current").stdout.strip()
    if branch == "master":
        print("Refusing to run on master; check out a feature branch.", file=sys.stderr)
        sys.exit(1)

    top_level, moves_to_hugo = load_config()

    # hugo/ holds the moved dirs; nothing moved is left at root;
    # the root .gitignore split routed each rule to the right side.
    print("== Layout ==")
    check_layout(top_level, moves_to_hugo)
    check_gitignore_split(top_level, moves_to_hugo)

    # No .github/workflows/ file references a moved path without the hugo/ prefix,
    # in shell scalars and in structured on.*.paths filters.
    print("\n== Workflow paths ==")
    check_workflows(moves_to_hugo)
    check_workflow_path_filters(moves_to_hugo)

    # No pattern was moved to hugo/ while its file stayed at root, and every
    # moved pattern (globs included) carries the hugo/ prefix. Pre-existing
    # dangling entries are reported but not failed.
    print("\n== CODEOWNERS ==")
    check_codeowners()
    check_codeowners_prefixing(moves_to_hugo)

    # Each pre-commit check still REJECTS a known-bad input planted at the
    # hugo/ path. A hook that still points at the old path passes vacuously -> we fail it.
    print("\n== Husky hooks ==")
    check_husky_circular_aliases()
    check_husky_section_index()
    check_husky_cdocs_gitignore()

    # Static presence check only; run `make start` manually.
    print("\n== Hugo build ==")
    check_build_presence()

    # On a throwaway repo, execute_reorg.py then rollback.py must restore the
    # tree byte-for-byte (the only test of rollback).
    print("\n== Rollback round-trip ==")
    check_rollback_roundtrip()

    # Summary
    counts = {"PASS": 0, "FAIL": 0, "SKIP": 0, "WARN": 0}
    for status, _, _ in results:
        counts[status] += 1
    print("\n" + "=" * 50)
    print(f"PASS {counts['PASS']}  FAIL {counts['FAIL']}  "
          f"WARN {counts['WARN']}  SKIP {counts['SKIP']}")

    sys.exit(1 if counts["FAIL"] else 0)


if __name__ == "__main__":
    main()
