#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

if sed --version 2>/dev/null | grep -q "GNU sed"; then
    SED=sed
elif gsed --version 2>/dev/null | grep -q "GNU sed"; then
    SED=gsed
fi

cd "$(dirname "$0")"

#helm repo update

TMPDIR=$(mktemp -d)
trap 'rm -r $TMPDIR' EXIT

cat > "$TMPDIR/cleanup_instructions.yaml" <<EOF
- command: delete
  path: metadata.labels."helm.sh/chart"
- command: delete
  path: metadata.labels."app.kubernetes.io/*"
- command: delete
  path: spec.template.metadata.annotations.checksum/*
EOF

for values in *_values.yaml; do
    type=${values%%_values.yaml}
    helm template --namespace default datadog-agent "${HELM_DATADOG_CHART:-stable/datadog}" --values "$values" \
        | yq write -d'*' --script "$TMPDIR/cleanup_instructions.yaml" - \
        | sed 's/\(api-key: \)".*"/\1PUT_YOUR_BASE64_ENCODED_API_KEY_HERE/;
               s/\(token: \).*/\1PUT_A_BASE64_ENCODED_RANDOM_STRING_HERE/;
               /---/{N;/---\n{}/d;}' \
              > "$type".yaml
done
