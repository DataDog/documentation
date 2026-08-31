#!/usr/bin/env bash
# Remove known untracked root-level files left after the Hugo reorganization.

set -euo pipefail

repo_root=$(git rev-parse --show-toplevel)
cd "$repo_root"

if [[ -e Makefile.config || -L Makefile.config ]]; then
  if [[ -e hugo/Makefile.config || -L hugo/Makefile.config ]]; then
    printf 'Cannot move Makefile.config: hugo/Makefile.config already exists.\n' >&2
    exit 1
  fi
  mv Makefile.config hugo/Makefile.config
fi

rm -rf \
  .hugo_build.lock \
  .yarn \
  _vendor \
  agent_config_types_list.txt \
  content \
  data \
  examples \
  hugpython \
  integrations_data \
  layouts \
  local \
  node_modules \
  playwright-report \
  public \
  resources \
  static \
  test-results
