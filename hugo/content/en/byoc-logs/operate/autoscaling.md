---
title: Autoscale Indexers and Compactors
description: Configure Horizontal Pod Autoscalers for BYOC Logs indexer and compactor workloads.
aliases:
- /cloudprem/operate/autoscaling/
further_reading:
- link: "/byoc-logs/operate/sizing/"
  tag: "Documentation"
  text: "Cluster Sizing"
- link: "/byoc-logs/operate/monitoring/"
  tag: "Documentation"
  text: "Monitor BYOC Logs"
- link: "https://github.com/DataDog/helm-charts/blob/main/charts/cloudprem/values.yaml"
  tag: "Source"
  text: "CloudPrem Helm chart default values"
---

## Overview

The `datadog/cloudprem` Helm chart can create Horizontal Pod Autoscalers (HPAs) for BYOC Logs indexers and standalone compactors. HPAs are disabled by default.

## Before you begin

This guide assumes that you have:

- A BYOC Logs deployment installed with the `datadog/cloudprem` Helm chart.
- Kubernetes Metrics Server, or another metrics API implementation, installed in the cluster.
- Enough node capacity for the maximum number of indexer and compactor pods.
- CPU requests configured for autoscaled workloads. CPU-based HPA calculations use the pod CPU request. Indexers derive CPU requests from `indexer.podSize` or `indexer.resources.requests.cpu`. For standalone compactors, configure `compactor.resources.requests.cpu`.

## Enable indexer autoscaling

To enable the indexer HPA, set `indexer.autoscaling.enabled` to `true`:

```yaml
indexer:
  autoscaling:
    enabled: true
```

When indexer autoscaling is enabled, `indexer.replicaCount` is ignored and the HPA controls the number of indexer pods.

Default indexer HPA settings:

| Setting | Default | Description |
|---|---:|---|
| `indexer.autoscaling.minReplicas` | `2` | Minimum number of indexer pods |
| `indexer.autoscaling.maxReplicas` | `10` | Maximum number of indexer pods |
| CPU target | `70%` | Average CPU utilization target across indexer pods |

## Enable compactor autoscaling

To enable the compactor HPA, enable standalone compactors and set `compactor.autoscaling.enabled` to `true`:

```yaml
enableStandaloneCompactors: true

compactor:
  autoscaling:
    enabled: true
```

The compactor HPA is created only when both `enableStandaloneCompactors` and `compactor.autoscaling.enabled` are set to `true`. When compactor autoscaling is enabled, `compactor.replicaCount` is ignored and the HPA controls the number of compactor pods.

Default compactor HPA settings:

| Setting | Default | Description |
|---|---:|---|
| `compactor.autoscaling.minReplicas` | `1` | Minimum number of compactor pods |
| `compactor.autoscaling.maxReplicas` | `10` | Maximum number of compactor pods |
| CPU target | `80%` | Average CPU utilization target across compactor pods |

## Apply the configuration

Add the autoscaling values to your BYOC Logs values file, then upgrade your release:

```shell
helm upgrade <RELEASE_NAME> datadog/cloudprem \
  --namespace <NAMESPACE_NAME> \
  --values datadog-values.yaml
```

## Verify the HPAs

List HPAs in the BYOC Logs namespace:

```shell
kubectl get hpa -n <NAMESPACE_NAME>
```

Describe an HPA to check metrics and recent scaling events:

```shell
kubectl describe hpa <RELEASE_NAME>-indexer -n <NAMESPACE_NAME>
kubectl describe hpa <RELEASE_NAME>-compactor -n <NAMESPACE_NAME>
```

`<RELEASE_NAME>-indexer` and `<RELEASE_NAME>-compactor` are the default HPA names created by the chart. If you set `nameOverride` or `fullnameOverride`, use the resulting names instead.

If the HPA reports missing CPU metrics, check that the metrics API is running and that the target pods have CPU requests.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
