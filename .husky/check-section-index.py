#!/usr/bin/env python3

import os
import sys
import subprocess
from pathlib import Path

CONTENT_ROOT = Path('content/en')


def get_staged_files():
    """Get staged markdown files under content/en/."""
    try:
        result = subprocess.run(
            ['git', 'diff', '--cached', '--name-only', '--diff-filter=ACMR'],
            capture_output=True,
            text=True,
            check=True
        )
        staged_files = [f for f in result.stdout.strip().split('\n')
                       if f.endswith('.md') and f.startswith('content/en/')]
        return staged_files if staged_files != [''] else []
    except subprocess.CalledProcessError:
        return []


def check_missing_index_files():
    """Check that every ancestor directory of staged files has an _index.md."""
    staged_files = get_staged_files()
    missing = set()

    for file_path in staged_files:
        if not file_path:
            continue

        path = Path(file_path)
        # Walk from the file's parent up to (but not including) content/en/
        current = path.parent
        while current != CONTENT_ROOT and current != Path('.'):
            index_file = current / '_index.md'
            if not index_file.exists():
                # Also check if it's staged (new but not yet on disk)
                try:
                    subprocess.run(
                        ['git', 'show', f':{index_file}'],
                        capture_output=True,
                        text=True,
                        check=True
                    )
                except subprocess.CalledProcessError:
                    # Not on disk and not staged
                    missing.add(current)
            current = current.parent

    return sorted(missing)


def main():
    missing = check_missing_index_files()

    if missing:
        print('\n\u274c Missing section _index.md files:', file=sys.stderr)
        print('=====================================', file=sys.stderr)

        for directory in missing:
            section = str(directory).replace('content/en/', '/')
            print(f'\n  Directory: {directory}/', file=sys.stderr)
            print(f'  URL path:  {section}/', file=sys.stderr)
            print(f'  Fix:       Create {directory}/_index.md', file=sys.stderr)

        print('\n=====================================', file=sys.stderr)
        print(f'Found {len(missing)} directory(ies) missing _index.md.', file=sys.stderr)
        print('Without _index.md, these directories create blank pages on the docs site.', file=sys.stderr)
        print('\nEach _index.md needs at minimum:\n', file=sys.stderr)
        print('---', file=sys.stderr)
        print('title: <Section Title>', file=sys.stderr)
        print('private: true', file=sys.stderr)
        print('---\n', file=sys.stderr)
        print('Also include links to the main subsections.', file=sys.stderr)
        print('\nPlease fix before committing.\n', file=sys.stderr)
        sys.exit(1)

    print('\u2705 All section directories have _index.md files.')
    sys.exit(0)


if __name__ == '__main__':
    main()
