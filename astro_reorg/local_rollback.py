#!/usr/bin/env python3
import shutil
import subprocess
import sys
from pathlib import Path

repo_root = Path(__file__).parent.parent
hugo_dir = repo_root / "hugo"

if not hugo_dir.exists():
    print("Nothing to roll back: hugo/ does not exist.", file=sys.stderr)
    sys.exit(1)

makefile_config_src = hugo_dir / "Makefile.config"
makefile_config_dst = repo_root / "Makefile.config"
if makefile_config_src.exists():
    shutil.copy2(makefile_config_src, makefile_config_dst)
    print("Restored Makefile.config to repo root.")

shutil.rmtree(hugo_dir)
print("Removed hugo/")

subprocess.run(
    ["git", "checkout", "--",
     ".gitignore", ".github/workflows/", ".github/CODEOWNERS", ".husky/"],
    cwd=repo_root,
    check=True,
)
print("Restored .gitignore, .github/workflows/, .github/CODEOWNERS, and .husky/ from git.")
