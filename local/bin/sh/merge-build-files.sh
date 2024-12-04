#!/bin/bash
set -e  # Exit on error

echo -e "\nMerging build files into local/bin/py..."

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

# Backup the sh directory
if [ -d "local/bin/sh" ]; then
  mkdir -p /tmp/sh_backup
  cp -r local/bin/sh/* /tmp/sh_backup/ 2>/dev/null || true
fi

# Clear and recreate the directories
rm -rf local/bin/py local/bin/sh
mkdir -p local/bin/py local/bin/sh local/bin/js

# Copy base content from docs-ci, excluding sh and js directories
cp -r /usr/local/bin/docs-ci/* local/bin/py/
rm -rf local/bin/py/sh local/bin/py/js

# Copy sh and js if they exist
if [ -d "/usr/local/bin/docs-ci/sh" ]; then
  cp -r /usr/local/bin/docs-ci/sh/* local/bin/sh/
fi
if [ -d "/usr/local/bin/docs-ci/js" ]; then
  cp -r /usr/local/bin/docs-ci/js/* local/bin/js/
fi

# Restore all previously backed up py content (this will merge with new content)
if [ -d "/tmp/py_backup" ]; then
  cp -r /tmp/py_backup/* local/bin/py/
fi

# Restore sh directory content
if [ -d "/tmp/sh_backup" ]; then
  cp -r /tmp/sh_backup/* local/bin/sh/
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
rm -rf /tmp/build_backup /tmp/py_backup /tmp/sh_backup

# Output final directory structure for verification
echo -e "\nFinal directory structure:"
find local/bin -type d -print | sed -e "s;[^/]*/;|____;g;s;____|; |;g"
echo -e "\nFull file listing:"
find local/bin -type f | sort