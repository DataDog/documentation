---
title: BYOC Logs Release Notes
description: Per-version changes for the BYOC Logs binary, bundled by the datadog/cloudprem Helm chart.
disable_toc: false
further_reading:
- link: "/byoc-logs/operate/updates/"
  tag: "Documentation"
  text: "Plan BYOC Logs updates"
- link: "/byoc-logs/install/"
  tag: "Documentation"
  text: "Install BYOC Logs"
- link: "/byoc-logs/operate/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshoot BYOC Logs"
---

## Overview

This page tracks releases of the **BYOC (Bring Your Own Cloud) Logs binary**, distributed as a Docker image and bundled by the `datadog/cloudprem` Helm chart. New features and fixes ship in the binary; the chart packages them for deployment.

### Check your installed binary version

Look at the `image` field on a BYOC Logs pod:

```shell
kubectl get pods -n <BYOC_LOGS_NAMESPACE> \
  -o jsonpath='{range .items[*]}{.spec.containers[*].image}{"\n"}{end}' \
  | sort -u
```

The image tag (for example, `:v0.1.26`) is the binary version. To see which binary version a Helm chart bundles, run:

```shell
helm show chart datadog/cloudprem --version <CHART_VERSION> | grep appVersion
```

### Upgrade

Binary upgrades ship through the Helm chart. See [Install BYOC Logs][2] for the chart upgrade command for your platform.

## Releases

### v0.1.31 — 2026-07-08

*Bundled in chart: `0.4.5`.*

#### Changed
- Fixes single-token phrase prefix queries on raw fields so `match_phrase_prefix` searches return all matching prefix terms instead of being capped by `max_expansions`.
- Up to 3x faster intersection for selective terms queries with time range.
#### Helm chart changes
- Adds `indexer.volumeAttributesClass` and `searcher.volumeAttributesClass` values to provision Kubernetes `VolumeAttributesClass` resources for indexer and searcher persistent volumes. Use these values to tune volume attributes such as IOPS and throughput. This feature is disabled by default, requires Kubernetes 1.31 or later, and requires `driverName` when enabled.
- Fixes the Kubernetes advertise address by setting `KUBERNETES_POD_IP` from the pod IP instead of the pod name.
- Disables `serviceAccount.automountServiceAccountToken` by default to reduce token exposure on pods that do not need Kubernetes API access.
- Enables `securityContext.readOnlyRootFilesystem` by default across workloads for defense-in-depth hardening.

### v0.1.30 — 2026-06-30

*Bundled in chart: `0.4.3`.*

#### Changed
- Reduces search CPU time for nested date histogram queries by up to 20%, with the largest gains on seven-day windows.
- Adds a dedicated health check listener on port `7284` for CloudPrem component liveness and readiness checks.

#### Helm chart changes
- Adds global `volumes` and `volumeMounts` values that apply to all CloudPrem components and merge with existing per-component `extraVolumes` and `extraVolumeMounts`.
- Adds global `topologySpreadConstraints` support, merged with per-component constraints, to spread CloudPrem workload pods across topology domains.
- Updates CloudPrem services and AWS ALB internal ingress health checks to use the dedicated health endpoint.

### v0.1.29 — 2026-06-05

*Bundled in chart: `0.4.2`.*

#### Changed
- Faster execution for common log analysis queries, including 2x faster range queries, 1.6x faster cardinality aggregations, and up to 6x faster intersections with range queries.
- Treats `field:*` filters as existence queries, and fixes sorting by percentile aggregations.
- Reduced memory usage for Google Cloud Storage uploads to improve indexing stability.

#### Helm chart changes
- Enables BYOC service telemetry by default with `datadog.byocTelemetry.enabled`; this exports BYOC service logs and metrics only, not customer-ingested logs, metrics, or traces.
- Deprecates and ignores `cloudprem.index.retention`, and no longer sets `CP_RETENTION_PERIOD`.

### v0.1.26 — 2026-05-05

*Bundled in chart: `0.4.0`.*

#### Changed
- Up to 4x faster term aggregations with order by sub aggregation and up to 1.5x faster cardinality aggregations.

[2]: /byoc-logs/install/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
