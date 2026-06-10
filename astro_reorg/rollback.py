#!/usr/bin/env python3
import os
import subprocess
import sys
from pathlib import Path

repo_root = Path(__file__).parent.parent
hugo_dir = repo_root / "hugo"

if not hugo_dir.exists():
    print("Nothing to roll back: hugo/ does not exist.", file=sys.stderr)
    sys.exit(1)

moved = 0
moved_names = []
for name in sorted(os.listdir(hugo_dir)):
    # reorg.py SPLITS .gitignore in place (it prunes the root copy and writes a
    # routed subset to hugo/.gitignore). Skip it here so this rename can't clobber
    # the pruned root copy with the hugo subset; the root copy is restored from
    # git below, and hugo/.gitignore is discarded with the now-empty directory.
    if name == ".gitignore":
        continue
    src = hugo_dir / name
    dst = repo_root / name
    print(f"Moving hugo/{name} -> {name}")
    src.rename(dst)
    moved += 1
    moved_names.append(name)

# Discard the hugo/.gitignore the split created before emptying the directory.
gitignore_copy = hugo_dir / ".gitignore"
if gitignore_copy.exists():
    gitignore_copy.unlink()
    print("Removed hugo/.gitignore (created by the split)")

# Only succeeds if hugo/ is now empty, preventing accidental data loss.
hugo_dir.rmdir()
print(f"Done. {moved} item(s) restored to repo root.")

# Restore the files reorg.py edited in place to their committed state. The root
# .gitignore was pruned by the split, and reorg.py may have applied partial
# workflow/CODEOWNERS/husky substitutions interactively, so reversing them
# individually isn't reliable — let git restore them wholesale.
subprocess.run(
    ["git", "checkout", "--",
     ".gitignore", ".github/workflows/", ".github/CODEOWNERS", ".husky/"],
    cwd=repo_root,
    check=True,
)
print("Restored .gitignore, .github/workflows/, .github/CODEOWNERS, and .husky/ from git.")

# The move-back above restores whatever was in hugo/ verbatim — but a build run
# between execute_reorg.py and this rollback (e.g. `make start`) can clean
# committed-but-generated files (API code examples, service_checks JSON,
# integration pages) and, if interrupted, never regenerate them. That leaves the
# moved tree INCOMPLETE, so rollback alone wouldn't restore a clean working tree.
# Restore the moved, git-tracked paths to their committed state to absorb that.
#
# Scope strictly to the names we moved: astro_reorg/ and other untouched root
# paths are never passed to checkout. Filter to paths git actually tracks so
# untracked/ignored moves (node_modules, public, _vendor, resources) are skipped
# — passing one of those to `git checkout` would match no tracked files and
# abort the whole restore.
tracked = subprocess.run(
    ["git", "ls-files", "--", *moved_names],
    cwd=repo_root, capture_output=True, text=True, check=True,
).stdout.split()
tracked_top = sorted({Path(p).parts[0] for p in tracked})
if tracked_top:
    subprocess.run(
        ["git", "checkout", "--", *tracked_top],
        cwd=repo_root, check=True,
    )
    print(f"Restored moved tracked paths to HEAD: {', '.join(tracked_top)}")
