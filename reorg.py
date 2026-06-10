#!/usr/bin/env python3
import os
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    print("Error: PyYAML is required. Install with: pip install pyyaml", file=sys.stderr)
    sys.exit(1)

repo_root = Path(__file__).parent
config_path = repo_root / "reorg_config.yaml"

with config_path.open() as f:
    config = yaml.safe_load(f)

top_level = set(config.get("top_level", []))
moves_to_hugo = set(config.get("moves_to_hugo", []))
ignore = set(config.get("ignore", []))

# Sanity-check the config itself for conflicts.
conflicts = top_level & moves_to_hugo
if conflicts:
    for name in sorted(conflicts):
        print(f"ERROR: '{name}' appears in both top_level and moves_to_hugo", file=sys.stderr)
    sys.exit(1)

errors = []

for name in os.listdir(repo_root):
    if name in ignore:
        continue

    if name in top_level:
        pass  # keep in place
    elif name in moves_to_hugo:
        pass  # will move below
    else:
        errors.append(name)

if errors:
    for name in sorted(errors):
        print(f"ERROR: '{name}' is not listed in reorg_config.yaml", file=sys.stderr)
    print(f"{len(errors)} error(s) found. Update reorg_config.yaml before running.", file=sys.stderr)
    sys.exit(1)

hugo_dir = repo_root / "hugo"
hugo_dir.mkdir(exist_ok=True)

moved = 0
for name in sorted(os.listdir(repo_root)):
    if name in ignore or name in top_level or name == "hugo":
        continue
    src = repo_root / name
    dst = hugo_dir / name
    print(f"Moving {name} -> hugo/{name}")
    src.rename(dst)
    moved += 1

print(f"Done. {moved} item(s) moved into hugo/.")
