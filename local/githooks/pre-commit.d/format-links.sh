#!/bin/sh

# TODO make this parallelizable (should be easy)

tmpfile=$(mktemp)
shortcodes=$(grep -FRl Inner layouts/shortcodes | sed -E -e 's/[^[:space:]]+\///' -e 's/\.html$//')

for f in $(git diff --name-only --staged | grep -E '^[^.]+\.md$')
do
    echo "---Link formatting $f"
    if local/bin/format-links "$f" "$shortcodes" > "$tmpfile"; then
        mv "$tmpfile" "$f"
        git add "$f"
    else
        echo "$f: Failed to format links, check stderr." 1>&2
        rm "$tmpfile"
        exit 1
    fi
done
