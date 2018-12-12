#!/bin/sh

# TODO make this parallelizable (should be easy)

tmpfile=$(mktemp)
shortcodes=$(grep -FRl Inner layouts/shortcodes | sed -E -e 's/[^[:space:]]+\///' -e 's/\.html$//')
search_path=${1:-content}

for f in $(find "$search_path" -type f | grep -E '^\.?[^.]+\.md$')
do
    echo "---Link formatting $f"
    if local/bin/format-links "$f" "$shortcodes" > "$tmpfile"; then
        mv "$tmpfile" "$f"
    else
        echo "$f: Failed to format links, check stderr." 1>&2
        rm "$tmpfile"
        exit 1
    fi
done
