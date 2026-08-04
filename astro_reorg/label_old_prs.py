#!/usr/bin/env python3
"""
Label open PRs that have had no activity for six months or more with `autolabeled-stale`.
Already-labeled PRs are excluded from the query so they are never processed twice.
Defaults to a dry run where it just reports what would be done.

Use the GitHub label query to review labeled PRs:
https://github.com/DataDog/documentation/pulls?q=is%3Aopen+label%3Aautolabeled-stale

Usage:
    python3 astro_reorg/label_old_prs.py [--no-dry-run] [--pr NUMBER ...] [--limit N]

Flags:
    --no-dry-run          Actually add labels instead of just reporting what would be done.
    --pr NUMBER ...       Only process the given PR number(s).
    --limit N             Stop after labeling N PRs. PRs that are skipped don't count toward
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

INACTIVITY_DAYS = 120  # ~4 calendar months

LABEL_STALE = "autolabeled-stale"
LABEL_COLOR = "e4e669"

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
# Staleness helpers
# ---------------------------------------------------------------------------

def _parse_ts(ts: str) -> datetime:
    """Parse a GitHub ISO-8601 timestamp (e.g. '2026-07-16T12:00:00Z')."""
    return datetime.fromisoformat(ts.replace("Z", "+00:00"))


def is_inactive(pr: dict) -> bool:
    """Return True if the PR has had no activity in the last INACTIVITY_DAYS days."""
    updated_at = pr.get("updatedAt")
    if not updated_at:
        return False
    cutoff = datetime.now(timezone.utc) - timedelta(days=INACTIVITY_DAYS)
    return _parse_ts(updated_at) < cutoff


def days_since_update(pr: dict) -> int | None:
    """Return the number of days since the PR was last updated, or None."""
    updated_at = pr.get("updatedAt")
    if not updated_at:
        return None
    delta = datetime.now(timezone.utc) - _parse_ts(updated_at)
    return delta.days


# ---------------------------------------------------------------------------
# GitHub helpers
# ---------------------------------------------------------------------------

def ensure_label_exists(label: str, dry_run: bool) -> None:
    """Create the GitHub label if it doesn't already exist."""
    existing = gh_json("label", "list", "--repo", REPO, "--search", label, "--json", "name")
    if any(l["name"] == label for l in existing):  # type: ignore[index]
        return
    if dry_run:
        print(f"  [dry-run] would create label: {label!r}")
        return
    gh_run("label", "create", label, "--repo", REPO,
           "--color", LABEL_COLOR, "--description", "PR labeled due to inactivity")
    print(f"  Created label: {label!r}")


def add_label(pr_number: int, label: str, dry_run: bool) -> None:
    if dry_run:
        print(f"  [dry-run] would add label {label!r} to PR #{pr_number}")
        return
    gh_run("api", f"repos/{REPO}/issues/{pr_number}/labels",
           "-f", f"labels[]={label}")
    print(f"  Added label {label!r} to PR #{pr_number}")


# ---------------------------------------------------------------------------
# Per-PR processing
# ---------------------------------------------------------------------------

def process_pr(pr: dict, dry_run: bool) -> bool:
    """Label a stale PR. Return True if we acted, False if we skipped."""
    pr_number = pr["number"]
    title = pr["title"]
    days = days_since_update(pr)

    print(f"\nPR #{pr_number}: {title}")
    print(f"  Last updated: {pr.get('updatedAt', 'unknown')} ({days} days ago)")

    if not is_inactive(pr):
        print(f"  Active within the last {INACTIVITY_DAYS} days — skipping.")
        return False

    print(f"  Inactive for {days} days — labeling.")
    add_label(pr_number, LABEL_STALE, dry_run)
    return True


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def get_open_prs(only: list[int] | None = None, fetch_limit: int = 1000) -> list[dict]:
    """Return open PRs without the stale label, optionally filtered to specific numbers."""
    fields = "number,title,updatedAt"
    if only:
        prs = []
        for n in only:
            pr = gh_json("pr", "view", str(n), "--repo", REPO, "--json", fields)
            prs.append(pr)
        return prs  # type: ignore[return-value]
    return gh_json(  # type: ignore[return-value]
        "pr", "list", "--repo", REPO, "--state", "open",
        "--search", f"-label:{LABEL_STALE} sort:updated-asc",
        "--json", fields, "--limit", str(fetch_limit),
    )


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Label open PRs with no activity for six months or more.",
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
        help="Only check this PR number (may be repeated).",
    )
    parser.add_argument(
        "--limit", type=int, default=None, metavar="N",
        help="Stop after labeling N PRs. Skipped PRs don't count toward the limit. "
             "Use it to roll out gradually: start at 1, review, then raise it.",
    )
    args = parser.parse_args()

    if args.limit is not None and args.limit < 1:
        parser.error("--limit must be a positive integer.")

    if args.dry_run:
        print("DRY-RUN mode — no PRs will be modified.\n")

    ensure_label_exists(LABEL_STALE, args.dry_run)

    cutoff_date = datetime.now(timezone.utc) - timedelta(days=INACTIVITY_DAYS)
    print(f"Targeting PRs with no activity since: {cutoff_date.date()} ({INACTIVITY_DAYS} days ago)\n")

    prs = get_open_prs(args.prs)
    print(f"Found {len(prs)} open PR(s) to check.")
    if args.limit is not None:
        print(f"Limit: will stop after labeling {args.limit} PR(s).")

    acted = 0
    for pr in prs:
        if args.limit is not None and acted >= args.limit:
            print(f"\nReached --limit of {args.limit} labeled PR(s) — stopping.")
            break
        try:
            if process_pr(pr, args.dry_run):
                acted += 1
        except Exception as exc:
            print(f"\nERROR processing PR #{pr.get('number', '?')}: {exc}",
                  file=sys.stderr)
            print("  Skipping to the next PR.", file=sys.stderr)

    print(f"\nLabeled {acted} PR(s). Done.")
    print(
        "\nView labeled PRs:\n"
        "  https://github.com/DataDog/documentation/pulls"
        "?q=is%3Aopen+label%3Aautolabeled-stale"
    )


if __name__ == "__main__":
    main()
