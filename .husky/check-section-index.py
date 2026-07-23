#!/usr/bin/env python3

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


def get_top_level_dir(file_path):
    """Extract the top-level directory under content/en/ from a file path.

    For example, 'content/en/new_section/sub/page.md' returns 'new_section'.
    """
    parts = Path(file_path).parts
    # parts: ('content', 'en', 'new_section', ...)
    if len(parts) > 2:
        return parts[2]
    return None


def dir_exists_on_base_branch(dir_name):
    """Check if a top-level directory existed on the merge base (master)."""
    try:
        result = subprocess.run(
            ['git', 'merge-base', 'HEAD', 'master'],
            capture_output=True,
            text=True,
            check=True
        )
        merge_base = result.stdout.strip()
        # Check if the directory existed at the merge base
        result = subprocess.run(
            ['git', 'ls-tree', '--name-only', merge_base, f'content/en/{dir_name}/'],
            capture_output=True,
            text=True,
            check=True
        )
        return bool(result.stdout.strip())
    except subprocess.CalledProcessError:
        # If there's no merge base (e.g. first commit), check if dir exists in HEAD
        try:
            result = subprocess.run(
                ['git', 'ls-tree', '--name-only', 'HEAD', f'content/en/{dir_name}/'],
                capture_output=True,
                text=True,
                check=True
            )
            return bool(result.stdout.strip())
        except subprocess.CalledProcessError:
            return False


def has_index_file(repo_root, dir_name):
    """Check if a top-level directory has an _index.md or _index.mdoc.md."""
    dir_path = repo_root / 'content' / 'en' / dir_name
    if (dir_path / '_index.md').exists() or (dir_path / '_index.mdoc.md').exists():
        return True
    # Also check if either variant is staged (new but not yet on disk)
    for name in ('_index.md', '_index.mdoc.md'):
        relative = f'content/en/{dir_name}/{name}'
        try:
            subprocess.run(
                ['git', 'show', f':{relative}'],
                capture_output=True,
                text=True,
                check=True
            )
            return True
        except subprocess.CalledProcessError:
            pass
    return False


def check_missing_index_files():
    """Check that new top-level directories under content/en/ have an _index.md."""
    repo_root = get_repo_root()
    staged_files = get_staged_files()
    checked = set()
    missing = set()

    for file_path in staged_files:
        if not file_path:
            continue

        top_level = get_top_level_dir(file_path)
        if not top_level or top_level in checked:
            continue
        checked.add(top_level)

        # Only check directories that are new (don't exist on the base branch)
        if dir_exists_on_base_branch(top_level):
            continue

        if not has_index_file(repo_root, top_level):
            missing.add(top_level)

    return sorted(missing)


def main():
    missing = check_missing_index_files()

    if missing:
        print('\n\u274c Missing section _index.md files:', file=sys.stderr)
        print('=====================================', file=sys.stderr)

        for dir_name in missing:
            print(f'\n  Directory: content/en/{dir_name}/', file=sys.stderr)
            print(f'  URL path:  /{dir_name}/', file=sys.stderr)
            print(f'  Fix:       Create content/en/{dir_name}/_index.md', file=sys.stderr)

        print('\n=====================================', file=sys.stderr)
        print(f'Found {len(missing)} directory(ies) missing _index.md.', file=sys.stderr)
        print('Without _index.md, these directories create blank pages on the docs site.', file=sys.stderr)
        print('\nEach _index.md needs at minimum:\n', file=sys.stderr)
        print('---', file=sys.stderr)
        print('title: <Section Title>', file=sys.stderr)
        print('private: true', file=sys.stderr)
        print('---', file=sys.stderr)
        print('\nPlease fix before committing.\n', file=sys.stderr)
        sys.exit(1)

    print('\u2705 All section directories have _index.md files.')
    sys.exit(0)


if __name__ == '__main__':
    main()
