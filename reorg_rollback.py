#!/usr/bin/env python3
import os
import sys
from pathlib import Path

repo_root = Path(__file__).parent
hugo_dir = repo_root / "hugo"

if not hugo_dir.exists():
    print("Nothing to roll back: hugo/ does not exist.", file=sys.stderr)
    sys.exit(1)

moved = 0
for name in sorted(os.listdir(hugo_dir)):
    src = hugo_dir / name
    dst = repo_root / name
    print(f"Moving hugo/{name} -> {name}")
    src.rename(dst)
    moved += 1

# Only succeeds if hugo/ is now empty, preventing accidental data loss.
hugo_dir.rmdir()
print(f"Done. {moved} item(s) restored to repo root.")
