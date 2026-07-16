#!/usr/bin/env python3
"""
Close open PRs that carry the `autolabeled-stale` label.
Posts a comment before closing. Defaults to a dry run where it just reports
what would be done.

Use the GitHub label query to review which PRs are queued for closure:
https://github.com/DataDog/documentation/pulls?q=is%3Aopen+label%3Aautolabeled-stale

Usage:
    python3 astro_reorg/close_stale_prs.py [--no-dry-run] [--pr NUMBER ...] [--limit N]

Flags:
    --no-dry-run          Actually close PRs instead of just reporting what would be done.
    --pr NUMBER ...       Only process the given PR number(s).
    --limit N             Stop after closing N PRs. PRs that are skipped don't count toward
                          the limit. Use it to roll out gradually: start with --limit 1, review
                          the results, then raise it as you gain confidence.
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
from datetime import datetime, timedelta, timezone

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

REPO = "DataDog/documentation"

LABEL_STALE = "autolabeled-stale"

CLOSE_COMMENT = (
    "Closing this PR because it has had no activity for six months. "
    "If this was done in error, feel free to re-open the PR."
)

# ---------------------------------------------------------------------------
# Shell helpers
# ---------------------------------------------------------------------------

def run(cmd: list[str]) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, capture_output=True, text=True)


def gh_json(*args: str) -> object:
    result = run(["gh", *args])
    if result.returncode != 0:
        raise RuntimeError(f"gh {' '.join(args[:3])}: {result.stderr.strip()}")
    return json.loads(result.stdout) if result.stdout.strip() else []


def gh_run(*args: str) -> str:
    result = run(["gh", *args])
    if result.returncode != 0:
        raise RuntimeError(f"gh {' '.join(args[:3])}: {result.stderr.strip()}")
    return result.stdout


# ---------------------------------------------------------------------------
# GitHub helpers
# ---------------------------------------------------------------------------

def post_comment(pr_number: int, body: str, dry_run: bool) -> None:
    if dry_run:
        print(f"  [dry-run] would comment on PR #{pr_number}:\n    {body[:120]}")
        return
    gh_run("pr", "comment", str(pr_number), "--repo", REPO, "--body", body)
    print(f"  Posted comment on PR #{pr_number}")


def close_pr(pr_number: int, dry_run: bool) -> None:
    if dry_run:
        print(f"  [dry-run] would close PR #{pr_number}")
        return
    gh_run("pr", "close", str(pr_number), "--repo", REPO)
    print(f"  Closed PR #{pr_number}")


# ---------------------------------------------------------------------------
# Per-PR processing
# ---------------------------------------------------------------------------

def process_pr(pr: dict, dry_run: bool) -> bool:
    """Comment and close a labeled PR. Return True if we acted, False if we skipped."""
    pr_number = pr["number"]
    title = pr["title"]

    print(f"\nPR #{pr_number}: {title}")
    print(f"  Last updated: {pr.get('updatedAt', 'unknown')}")

    post_comment(pr_number, CLOSE_COMMENT, dry_run)
    close_pr(pr_number, dry_run)
    return True


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def get_labeled_prs(only: list[int] | None = None, fetch_limit: int = 1000) -> list[dict]:
    """Return open PRs carrying the stale label, optionally filtered to specific numbers."""
    fields = "number,title,updatedAt"
    if only:
        prs = []
        for n in only:
            pr = gh_json("pr", "view", str(n), "--repo", REPO, "--json", fields)
            prs.append(pr)
        return prs  # type: ignore[return-value]
    return gh_json(  # type: ignore[return-value]
        "pr", "list", "--repo", REPO, "--state", "open",
        "--label", LABEL_STALE,
        "--json", fields, "--limit", str(fetch_limit),
    )


def main() -> None:
    parser = argparse.ArgumentParser(
        description=f"Close open PRs labeled {LABEL_STALE!r}.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "--dry-run", action=argparse.BooleanOptionalAction, default=True,
        help="Report what would be done without making any changes (default: on). "
             "Use --no-dry-run to apply changes.",
    )
    parser.add_argument(
        "--pr", type=int, action="append", dest="prs", metavar="NUMBER",
        help="Only process this PR number (may be repeated).",
    )
    parser.add_argument(
        "--limit", type=int, default=None, metavar="N",
        help="Stop after closing N PRs. Skipped PRs don't count toward the limit. "
             "Use it to roll out gradually: start at 1, review, then raise it.",
    )
    args = parser.parse_args()

    if args.limit is not None and args.limit < 1:
        parser.error("--limit must be a positive integer.")

    if args.dry_run:
        print("DRY-RUN mode — no PRs will be modified.\n")

    prs = get_labeled_prs(args.prs)
    print(f"Found {len(prs)} labeled PR(s) to close.")
    if args.limit is not None:
        print(f"Limit: will stop after closing {args.limit} PR(s).")

    acted = 0
    for pr in prs:
        if args.limit is not None and acted >= args.limit:
            print(f"\nReached --limit of {args.limit} closed PR(s) — stopping.")
            break
        try:
            if process_pr(pr, args.dry_run):
                acted += 1
        except Exception as exc:
            print(f"\nERROR processing PR #{pr.get('number', '?')}: {exc}",
                  file=sys.stderr)
            print("  Skipping to the next PR.", file=sys.stderr)

    print(f"\nClosed {acted} PR(s). Done.")


if __name__ == "__main__":
    main()
