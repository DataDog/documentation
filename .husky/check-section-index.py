#!/usr/bin/env python3

import os
import sys
import subprocess
from pathlib import Path

def get_repo_root():
    """Get the git repository root directory."""
    result = subprocess.run(
        ['git', 'rev-parse', '--show-toplevel'],
        capture_output=True,
        text=True,
        check=True
    )
    return Path(result.stdout.strip())


def get_staged_files():
    """Get staged markdown files under content/en/ that are newly added."""
    try:
        result = subprocess.run(
            ['git', 'diff', '--cached', '--name-only', '--diff-filter=A'],
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
    repo_root = get_repo_root()
    content_root = repo_root / 'content' / 'en'
    staged_files = get_staged_files()
    missing = set()

    for file_path in staged_files:
        if not file_path:
            continue

        path = repo_root / file_path
        # Walk from the file's parent up to (but not including) content/en/
        current = path.parent
        while current != content_root and current != repo_root:
            # _index.mdoc.md files compile to _index.md during build
            has_index = (current / '_index.md').exists() or (current / '_index.mdoc.md').exists()
            if not has_index:
                # Also check if either variant is staged (new but not yet on disk)
                staged = False
                for name in ('_index.md', '_index.mdoc.md'):
                    relative = (current / name).relative_to(repo_root)
                    try:
                        subprocess.run(
                            ['git', 'show', f':{relative}'],
                            capture_output=True,
                            text=True,
                            check=True
                        )
                        staged = True
                        break
                    except subprocess.CalledProcessError:
                        pass
                if not staged:
                    missing.add(current.relative_to(repo_root))
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
