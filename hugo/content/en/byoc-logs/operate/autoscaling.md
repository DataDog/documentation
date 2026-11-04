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

The `datadog/cloudprem` Helm chart creates Horizontal Pod Autoscalers (HPAs) for BYOC (Bring Your Own Cloud) Logs indexers and standalone compactors when you enable them. HPAs are disabled by default, and each component is configured independently.

## Before you begin

The following Helm instructions cover indexers and standalone compactors. For a `DatadogBYOCCluster`, use [Configure autoscaling with the Operator](#configure-autoscaling-with-the-operator).

Before you enable autoscaling, you need:

- A BYOC Logs deployment installed with the `datadog/cloudprem` Helm chart.
- Chart version `0.4.6` or later for standalone compactor autoscaling.
- Kubernetes Metrics Server, or another metrics API implementation, installed in the cluster.
- Enough node capacity for the maximum number of indexer and compactor pods.
- CPU requests configured for autoscaled workloads.

CPU-based HPA calculations use the pod CPU request. Indexers get CPU requests from `indexer.podSize` or `indexer.resources.requests.cpu`. For standalone compactors, configure `compactor.resources.requests.cpu`.

## Enable indexer autoscaling

To enable the indexer HPA, set `indexer.autoscaling.enabled` to `true`:

```yaml
indexer:
  autoscaling:
    enabled: true
```

When you enable indexer autoscaling, the HPA controls the number of indexer pods and ignores `indexer.replicaCount`.

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

The chart creates the compactor HPA only when you set both `enableStandaloneCompactors` and `compactor.autoscaling.enabled` to `true`. When you enable compactor autoscaling, the HPA controls the number of compactor pods and ignores `compactor.replicaCount`.

Default compactor HPA settings:

| Setting | Default | Description |
|---|---:|---|
| `compactor.autoscaling.minReplicas` | `1` | Minimum number of compactor pods |
| `compactor.autoscaling.maxReplicas` | `10` | Maximum number of compactor pods |
| CPU target | `80%` | Average CPU utilization target across compactor pods |

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
kubectl describe hpa <RELEASE_NAME>-compactor -n <NAMESPACE_NAME>
```

`<RELEASE_NAME>-indexer` and `<RELEASE_NAME>-compactor` are the default HPA names created by the chart. If you set `nameOverride` or `fullnameOverride`, use the resulting names instead.

If `kubectl get hpa` shows `<unknown>` in the `TARGETS` column, the HPA cannot read CPU metrics. Check that the metrics API is running and that the target pods have CPU requests.

## Configure autoscaling with the Operator

The Operator supports `autoscaling` on indexers, searchers, compactors, and individual pipeline Worker entries. Install Kubernetes Metrics Server or the metrics API used by your HPA, set resource requests, and provision enough node capacity for the maximum replica count.

Merge an `autoscaling` object into the corresponding component of `byoc-cluster.yaml`. For example:

```yaml
spec:
  components:
    indexer:
      resources:
        requests:
          cpu: "4"
          memory: 16Gi
        limits:
          memory: 16Gi
      autoscaling:
        minReplicas: 2
        maxReplicas: 10
        metrics:
          - type: Resource
            resource:
              name: cpu
              target:
                type: Utilization
                averageUtilization: 70
        behavior:
          scaleDown:
            stabilizationWindowSeconds: 300
```

The Operator's `autoscaling` object does not use the Helm chart's `enabled` field. When `autoscaling` is set, the HPA manages the replica count and the component's `replicas` setting is ignored. Omit `autoscaling` to manage a fixed replica count through the custom resource.

Apply the complete manifest and inspect the generated HPAs:

```shell
kubectl apply -f byoc-cluster.yaml
kubectl get hpa -n <NAMESPACE_NAME>
kubectl describe hpa <CLUSTER_NAME>-indexer -n <NAMESPACE_NAME>
```

For Workers, place the settings on the matching entry in `spec.components.pipelines`. Size [persistent buffers and termination grace periods][2] to account for scale-down. Keep searcher capacity available for the reverse connection to Datadog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /byoc-logs/operate/sizing/
[2]: /byoc-logs/operate/disk_buffer_durability/
