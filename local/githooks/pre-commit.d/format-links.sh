#!/bin/sh
shortcodes=$(grep -FRl Inner layouts/shortcodes | sed -E -e 's/[^[:space:]]+\///' -e 's/\.html$//')
changed=$(git diff --name-only --staged | grep -E '^[^.]+\.md$')
for f in $changed
do
    if local/bin/format-links "$f" "$shortcodes" > "$f.fixed"; then
        echo "$f: Successfully formatted links."
        mv "$f.fixed" "$f"
        git add "$f"
    else
        echo "$f: Failed to format links, check stderr." 1>&2
        rm "$f.fixed"
        exit 1
    fi
done
