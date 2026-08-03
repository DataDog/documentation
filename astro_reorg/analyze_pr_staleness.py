#!/usr/bin/env python3
"""
Count open PRs by staleness bucket based on days since last activity.

Each PR is placed in exactly one bucket (the highest threshold it meets):
  < 30 days    — active
  30+ days     — stale 30d
  60+ days     — stale 60d
  90+ days     — stale 90d
  120+ days    — stale 120d
  180+ days    — stale 180d
  365+ days    — stale 365d+

Usage:
    python3 astro_reorg/analyze_pr_staleness.py [--limit N]

Flags:
    --limit N    Fetch at most N PRs from the API (default: 2000).
"""
from __future__ import annotations

import argparse
import json
import subprocess
from collections import defaultdict
from datetime import datetime, timezone

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

REPO = "DataDog/documentation"

BUCKETS = [365, 180, 120, 90, 60, 30]  # descending; < 30 days is the remainder

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


# ---------------------------------------------------------------------------
# Main logic
# ---------------------------------------------------------------------------

def bucket_label(days: int) -> str:
    for threshold in BUCKETS:
        if days >= threshold:
            return f"{threshold}+ days"
    return "< 30 days"


def analyze(fetch_limit: int) -> None:
    now = datetime.now(tz=timezone.utc)

    prs: list[dict] = gh_json(  # type: ignore[assignment]
        "pr", "list",
        "--repo", REPO,
        "--state", "open",
        "--json", "number,title,updatedAt",
        "--limit", str(fetch_limit),
    )

    print(f"Fetched {len(prs)} open PR(s).\n")

    counts: dict[str, int] = defaultdict(int)
    for pr in prs:
        updated = datetime.fromisoformat(pr["updatedAt"].replace("Z", "+00:00"))
        days_inactive = (now - updated).days
        counts[bucket_label(days_inactive)] += 1

    # Print in order: < 30 first, then ascending thresholds
    ordered_labels = ["< 30 days"] + [f"{t}+ days" for t in reversed(BUCKETS)]

    print(f"{'Staleness bucket':<16}  {'PR count':>8}")
    print("-" * 28)
    total = 0
    for label in ordered_labels:
        count = counts.get(label, 0)
        print(f"{label:<16}  {count:>8}")
        total += count
    print("-" * 28)
    print(f"{'Total':<16}  {total:>8}")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Count open PRs by staleness bucket.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "--limit", type=int, default=2000, metavar="N",
        help="Maximum number of PRs to fetch from the API (default: 2000).",
    )
    args = parser.parse_args()
    analyze(args.limit)


if __name__ == "__main__":
    main()
