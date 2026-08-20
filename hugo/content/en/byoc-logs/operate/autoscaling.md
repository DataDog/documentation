---
title: Autoscale Indexers, Searchers, and Compactors
description: Configure Horizontal Pod Autoscalers for BYOC Logs indexer, searcher, and compactor workloads.
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

The `datadog/cloudprem` Helm chart creates Horizontal Pod Autoscalers (HPAs) for BYOC (Bring Your Own Cloud) Logs indexers, searchers, and standalone compactors when you enable them. HPAs are disabled by default, and each component is configured independently.

## Before you begin

Before you enable autoscaling, you need:

- A BYOC Logs deployment installed with the `datadog/cloudprem` Helm chart.
- Chart version `0.4.6` or later for standalone compactor autoscaling.
- Kubernetes Metrics Server, or another metrics API implementation, installed in the cluster.
- Enough node capacity for the maximum number of indexer, searcher, and compactor pods.
- CPU requests configured for autoscaled workloads.

CPU-based HPA calculations use the pod CPU request. Indexers and searchers get CPU requests from `indexer.podSize` and `searcher.podSize`, or from `indexer.resources.requests.cpu` and `searcher.resources.requests.cpu`. For standalone compactors, configure `compactor.resources.requests.cpu`.

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

## Enable searcher autoscaling

To enable the searcher HPA, set `searcher.autoscaling.enabled` to `true`:

```yaml
searcher:
  autoscaling:
    enabled: true
```

When searcher autoscaling is enabled, `searcher.replicaCount` is ignored and the HPA controls the number of searcher pods.

The searcher CPU target is lower than the indexer and compactor targets because search is latency-sensitive. Keeping average utilization low leaves headroom for query bursts. The searcher HPA also applies a 60-second scale-up stabilization window.

Default searcher HPA settings:

| Setting | Default | Description |
|---|---:|---|
| `searcher.autoscaling.minReplicas` | `2` | Minimum number of searcher pods |
| `searcher.autoscaling.maxReplicas` | `10` | Maximum number of searcher pods |
| CPU target | `50%` | Average CPU utilization target across searcher pods |

## Override the defaults

Set `minReplicas` and `maxReplicas` alongside `enabled` to size the scaling range for your workload. Use the [Cluster Sizing][1] guide to pick a maximum that your node capacity supports:

```yaml
indexer:
  autoscaling:
    enabled: true
    minReplicas: 4
    maxReplicas: 20
```

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
kubectl describe hpa <RELEASE_NAME>-searcher -n <NAMESPACE_NAME>
kubectl describe hpa <RELEASE_NAME>-compactor -n <NAMESPACE_NAME>
```

`<RELEASE_NAME>-indexer`, `<RELEASE_NAME>-searcher`, and `<RELEASE_NAME>-compactor` are the default HPA names created by the chart. If you set `nameOverride` or `fullnameOverride`, use the resulting names instead.

If `kubectl get hpa` shows `<unknown>` in the `TARGETS` column, the HPA cannot read CPU metrics. Check that the metrics API is running and that the target pods have CPU requests.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /byoc-logs/operate/sizing/
