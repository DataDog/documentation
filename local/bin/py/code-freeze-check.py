import argparse
import re
import os
import sys

IGNORED_PATTERNS = (
    # add more regex rules here, these should be compiled regex `re.compile(...)`
)

BLOCKED_PATTERNS = (re.compile(r".*"),)


def can_be_ignored(changed_file):
    for pattern in IGNORED_PATTERNS:
        if pattern.match(changed_file):
            return True
    return False


def should_check_for_blocks(changed_file):
    for pattern in BLOCKED_PATTERNS:
        if pattern.match(changed_file):
            return True
    return False


def main(all_changed_files):
    blocked_changes = []
    for changed_file in all_changed_files:
        if should_check_for_blocks(changed_file) and not can_be_ignored(changed_file):
            blocked_changes.append(changed_file)

    if blocked_changes:
        formatted_changes = "\n\t".join(blocked_changes)
        print(
            "::error title=Code Freeze check::This change seems to contain a frozen code change."
        )
        print(
            f"::error title=Code Freeze check::Identified changes:\n\t{formatted_changes}"
        )
        print("::error title=Code Freeze check::This will only block merges.")
        print(
            "::error title=Code Freeze check::Repo admins have the option to force-merge as breaking-glass option for incidents."
        )
        sys.exit(1)
    print("::notice title=Code Freeze check::No blocking changes identified.")


def parse_json_and_get_changed_files(raw_changed):
    print(f"RAW: {raw_changed}")
    return raw_changed.split(",")


if __name__ == "__main__":
    if os.getenv("ACTIVE_FREEZE") != "true":
        print("::notice title=Code Freeze check::No active freezes at this time.")
        sys.exit(0)
    parser = argparse.ArgumentParser(
        prog="Code Freeze Checker",
        description="Check directories for current code freeze",
    )
    parser.add_argument("-c", "--changed")
    args = parser.parse_args()
    all_changed_files = parse_json_and_get_changed_files(args.changed)
    main(all_changed_files)
