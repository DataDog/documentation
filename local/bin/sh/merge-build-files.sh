#!/bin/bash
set -e  # Exit on error

# First, backup existing configurations
if [ -d "local/bin/py/build/configurations" ]; then
  mkdir -p /tmp/build_backup
  for config in pull_config_preview.yaml pull_config.yaml integration_merge.yaml; do
    if [ -f "local/bin/py/build/configurations/$config" ]; then
      cp "local/bin/py/build/configurations/$config" "/tmp/build_backup/$config"
    fi
  done
fi

# Backup all existing content in py directory (except build dir which we handle separately)
if [ -d "local/bin/py" ]; then
  mkdir -p /tmp/py_backup
  find local/bin/py -mindepth 1 -maxdepth 1 ! -name "build" -exec cp -r {} /tmp/py_backup/ \;
fi

# Clear the py directory while preserving our backups
rm -rf local/bin/py
mkdir -p local/bin/py

# Copy all files from the base docs-ci directory to py
cp -r /usr/local/bin/docs-ci/* local/bin/py/

# Restore all previously backed up py content (this will merge with new content)
if [ -d "/tmp/py_backup" ]; then
  cp -r /tmp/py_backup/* local/bin/py/
fi

# Handle the build directory separately
mkdir -p local/bin/py/build

# Copy the new build content from docs-ci
if [ -d "/usr/local/bin/docs-ci/build" ]; then
  cp -r /usr/local/bin/docs-ci/build/* local/bin/py/build/
fi

# Restore the configuration files
if [ -d "/tmp/build_backup" ]; then
  mkdir -p local/bin/py/build/configurations
  for config in pull_config_preview.yaml pull_config.yaml integration_merge.yaml; do
    if [ -f "/tmp/build_backup/$config" ]; then
      cp "/tmp/build_backup/$config" "local/bin/py/build/configurations/$config"
    fi
  done
fi

# Clean up temporary backup directories
rm -rf /tmp/build_backup /tmp/py_backup