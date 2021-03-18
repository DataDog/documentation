#!/usr/bin/env sh

# This script is mostly for CI purposes. For installing Hugo locally on your
# machine, see https://gohugo.io/getting-started/installing

HUGO_VERSION=0.81.0
HUGO_URL="https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz"

curl -L "${HUGO_URL}" | tar -xz && mv hugo /usr/local/bin/hugo
