#!/bin/sh

# We want all files in content/en only except the deleted ones hence the --diff-filter=ACMRTUXB
for f in $(git diff --diff-filter=ACMRTUXB --name-only --staged | grep -E '^content/en/[^.]+\.md$')
do
    echo "---Link formatting $f"
    if local/bin/py/format_link.py -f "$f"; then
        git add "$f"
    else
        echo "$f: Failed to format links, check stderr." 1>&2
        exit 1
    fi
done
