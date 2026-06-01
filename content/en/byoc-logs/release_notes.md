---
title: BYOC Logs Release Notes
description: Per-version changes for the BYOC Logs binary, bundled by the datadog/cloudprem Helm chart.
disable_toc: false
further_reading:
- link: "/byoc-logs/install/"
  tag: "Documentation"
  text: "Install BYOC Logs"
- link: "/byoc-logs/operate/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshoot BYOC Logs"
---

## Overview

This page tracks releases of the **BYOC Logs binary**, distributed as a Docker image and bundled by the `datadog/cloudprem` Helm chart. New features and fixes ship in the binary; the chart packages them for deployment.

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

### v0.1.26 — 2026-05-05

*Bundled in chart: `0.4.0`.*

#### Changed
- Up to 4x faster term aggregations with order by sub aggregation and up to 1.5x faster cardinality aggregations.

[2]: /byoc-logs/install/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
