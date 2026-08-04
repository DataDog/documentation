#!/usr/bin/env python3
"""
One-off script: swap `autolabeled-stale` → `autoclosed` on every PR that carries
the old label, regardless of whether the PR is open or closed.

All stale PRs have already been processed. Any PR still open with `autolabeled-stale`
was reopened by its contributor after being closed; swapping the label prevents the
close script from closing it again on the next run.

Usage:
    python3 astro_reorg/relabel_closed_prs.py [--no-dry-run] [--limit N]

Flags:
    --no-dry-run    Actually swap labels instead of just reporting what would be done.
    --limit N       Stop after relabeling N PRs. Use it to roll out gradually.
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

REPO = "DataDog/documentation"

LABEL_STALE = "autolabeled-stale"
LABEL_CLOSED = "autoclosed"
LABEL_CLOSED_COLOR = "d93f0b"

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

def ensure_label_exists(label: str, color: str, dry_run: bool) -> None:
    existing = gh_json("label", "list", "--repo", REPO, "--search", label, "--json", "name")
    if any(l["name"] == label for l in existing):  # type: ignore[index]
        return
    if dry_run:
        print(f"  [dry-run] would create label: {label!r}")
        return
    gh_run("label", "create", label, "--repo", REPO, "--color", color)
    print(f"  Created label: {label!r}")


def remove_label(pr_number: int, label: str, dry_run: bool) -> None:
    if dry_run:
        print(f"  [dry-run] would remove label {label!r} from PR #{pr_number}")
        return
    gh_run("api", f"repos/{REPO}/issues/{pr_number}/labels/{label}", "-X", "DELETE")
    print(f"  Removed label {label!r} from PR #{pr_number}")


def add_label(pr_number: int, label: str, dry_run: bool) -> None:
    if dry_run:
        print(f"  [dry-run] would add label {label!r} to PR #{pr_number}")
        return
    gh_run("api", f"repos/{REPO}/issues/{pr_number}/labels", "-f", f"labels[]={label}")
    print(f"  Added label {label!r} to PR #{pr_number}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def get_stale_prs(state: str) -> list[dict]:
    return gh_json(  # type: ignore[return-value]
        "pr", "list", "--repo", REPO, "--state", state,
        "--label", LABEL_STALE,
        "--json", "number,title,state", "--limit", "1000",
    )


def main() -> None:
    parser = argparse.ArgumentParser(
        description=f"Swap {LABEL_STALE!r} → {LABEL_CLOSED!r} on all PRs.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "--dry-run", action=argparse.BooleanOptionalAction, default=True,
        help="Report what would be done without making any changes (default: on). "
             "Use --no-dry-run to apply changes.",
    )
    parser.add_argument(
        "--limit", type=int, default=None, metavar="N",
        help="Stop after relabeling N PRs. Skipped PRs don't count toward the limit. "
             "Use it to roll out gradually: start at 1, review, then raise it.",
    )
    args = parser.parse_args()

    if args.limit is not None and args.limit < 1:
        parser.error("--limit must be a positive integer.")

    if args.dry_run:
        print("DRY-RUN mode — no PRs will be modified.\n")

    ensure_label_exists(LABEL_CLOSED, LABEL_CLOSED_COLOR, args.dry_run)

    prs = get_stale_prs("open") + get_stale_prs("closed")
    print(f"Found {len(prs)} PR(s) with label {LABEL_STALE!r}.")
    if args.limit is not None:
        print(f"Limit: will stop after relabeling {args.limit} PR(s).")

    acted = 0
    for pr in prs:
        if args.limit is not None and acted >= args.limit:
            print(f"\nReached --limit of {args.limit} relabeled PR(s) — stopping.")
            break
        pr_number = pr["number"]
        pr_state = pr["state"]
        print(f"\nPR #{pr_number} ({pr_state}): {pr['title']}")
        try:
            remove_label(pr_number, LABEL_STALE, args.dry_run)
            add_label(pr_number, LABEL_CLOSED, args.dry_run)
            acted += 1
        except Exception as exc:
            print(f"  ERROR: {exc}", file=sys.stderr)
            print("  Skipping to the next PR.", file=sys.stderr)

    print(f"\nRelabeled {acted} PR(s). Done.")


if __name__ == "__main__":
    main()
