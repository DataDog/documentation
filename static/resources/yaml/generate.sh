#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

if sed --version 2>/dev/null | grep -q "GNU sed"; then
    SED=sed
elif gsed --version 2>/dev/null | grep -q "GNU sed"; then
    SED=gsed
fi

cd "$(dirname "$0")"

helm repo add datadog https://helm.datadoghq.com
helm repo update

TMPDIR=$(mktemp -d)
trap 'rm -r $TMPDIR' EXIT

CLEANUP_INSTRUCTIONS='del(.metadata.labels."helm.sh/chart") | del(.metadata.labels."app.kubernetes.io/*") | del(.spec.template.metadata.labels."helm.sh/chart") | del(.spec.template.metadata.labels."app.kubernetes.io/*") | del(.metadata.annotations.checksum/*) | del(.spec.template.metadata.annotations.checksum/*)'

for values in *_values.yaml; do
    type=${values%%_values.yaml}
    helm template --kube-version 1.21 --namespace default datadog "${HELM_DATADOG_CHART:-datadog/datadog}" --values "$values" \
        | yq eval $CLEANUP_INSTRUCTIONS - \
        | ${SED:-sed} -E 's/(api-key: )".*"/\1PUT_YOUR_BASE64_ENCODED_API_KEY_HERE/;
                          s/(token: ).*/\1PUT_A_BASE64_ENCODED_RANDOM_STRING_HERE/;
                          s/((tool|tool_version|installer_version): ).*/\1kubernetes sample manifests/;' \
                            > "$type".yaml
done
