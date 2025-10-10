---
title: Kubernetes Metrics
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Integrations > Kubernetes Metrics
sourceUrl: >-
  https://docs.datadoghq.com/opentelemetry/integrations/kubernetes_metrics/index.html
---

# Kubernetes Metrics

{% alert level="info" %}
The OpenTelemetry Kubernetes integration is in Preview. To request access, contact your Datadog account team.
{% /alert %}

## Overview{% #overview %}

Collect Kubernetes metrics using the OpenTelemetry Collector to gain comprehensive insights into your cluster's health and performance. This integration uses a combination of OpenTelemetry receivers to gather data, which populates the [Kubernetes - Overview](https://app.datadoghq.com/dash/integration/86/kubernetes---overview) dashboard.

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/collector_exporter/kubernetes_metrics.3f85284d72929c386b5ba4d3f15df3ca.png?auto=format"
   alt="The 'Kubernetes - Overview' dashboard, showing metrics for containers, including status and resource usage of your cluster and its containers." /%}

This integration requires the [`kube-state-metrics`](https://github.com/kubernetes/kube-state-metrics) service and uses a two-collector architecture to gather data.

The `kube-state-metrics` service is a required component that generates detailed metrics about the state of Kubernetes objects like deployments, nodes, and pods. This architecture uses two separate OpenTelemetry Collectors:

- A Cluster Collector, deployed as a Kubernetes Deployment, gathers cluster-wide metrics (for example, the total number of deployments).
- A Node Collector, deployed as a Kubernetes DaemonSet, runs on each node to collect node-specific metrics (for example, CPU and memory usage per node).

This approach ensures that cluster-level metrics are collected only once, preventing data duplication, while node-level metrics are gathered from every node in the cluster.

## Setup{% #setup %}

To collect Kubernetes metrics with OpenTelemetry, you need to deploy `kube-state-metrics` and configure both of the above OpenTelemetry Collectors in your cluster.

### Prerequisites{% #prerequisites %}

- **Helm**: The setup uses Helm to deploy resources. To install Helm, see the [official Helm documentation](https://helm.sh/docs/intro/install/).
- **Collector Image**: This guide uses the `otel/opentelemetry-collector-contrib:0.130.0` image or newer.

### Installation{% #installation %}

#### 1. Install kube-state-metrics

Run the following commands to add the `prometheus-community` Helm repository and install `kube-state-metrics`:

```sh
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install kube-state-metrics prometheus-community/kube-state-metrics
```

#### 2. Create a Datadog API Key Secret

Create a Kubernetes secret to store your Datadog API key securely.

```sh
export DD_API_KEY="<YOUR_DATADOG_API_KEY>"
kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
```

#### 3. Install the OpenTelemetry Collectors

1. Add the OpenTelemetry Helm chart repository:

   ```sh
   helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
   helm repo update
   ```

1. Download the configuration files for the two Collectors:

   - [cluster-collector.yaml](https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/cluster-collector.yaml)
   - [daemonset-collector.yaml](https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/daemonset-collector.yaml)

1. Set your cluster name as an environment variable and use Helm to deploy both the Cluster and Node Collectors. Make sure the paths to the YAML files are correct.

   ```bash
   # Set your cluster name
   export K8S_CLUSTER_NAME="<YOUR_CLUSTER_NAME>"
   
   # Install the Node Collector (DaemonSet)
   helm install otel-daemon-collector open-telemetry/opentelemetry-collector \
     -f daemonset-collector.yaml \
     --set image.repository=otel/opentelemetry-collector-contrib \
     --set image.tag=0.130.0 \
     --set-string "config.processors.resource.attributes[0].key=k8s.cluster.name" \
     --set-string "config.processors.resource.attributes[0].value=${K8S_CLUSTER_NAME}"
   
   # Install the Cluster Collector (Deployment)
   helm install otel-cluster-collector open-telemetry/opentelemetry-collector \
     -f cluster-collector.yaml \
     --set image.repository=otel/opentelemetry-collector-contrib \
     --set image.tag=0.130.0 \
     --set-string "config.processors.resource.attributes[0].key=k8s.cluster.name" \
     --set-string "config.processors.resource.attributes[0].value=${K8S_CLUSTER_NAME}"
   ```

## Metric metadata configuration{% #metric-metadata-configuration %}

Some metrics require manual metadata updates in Datadog to ensure they are interpreted and displayed correctly.

To edit a metric's metadata:

1. Go to **[Metrics > Summary](https://app.datadoghq.com/metric/summary)**.
1. Select the metric you want to edit.
1. Click **Edit** in the side panel.
1. Edit the metadata as needed.
1. Click **Save**.

Repeat this process for each of the metrics listed in the following table:

| Metric Name              | Metric Type | Unit                          | Denominator           |
| ------------------------ | ----------- | ----------------------------- | --------------------- |
| `k8s.pod.cpu.usage`      | `Gauge`     | `Cpu` > `core`                |
| `k8s.pod.memory.usage`   | `Gauge`     | `Bytes (binary)` > `byte (B)` |
| `k8s.pod.network.io`     | `Gauge`     | `Bytes (binary)` > `byte (B)` | `Time` > `second (s)` |
| `k8s.pod.network.errors` | `Gauge`     | `Bytes (binary)` > `byte (B)` | `Time` > `second (s)` |

**Note**: Click the plus (**+**) icon beside the **Unit** to add the **Denominator**.

## Correlating traces with infrastructure metrics{% #correlating-traces-with-infrastructure-metrics %}

To correlate your APM traces with Kubernetes infrastructure metrics, Datadog uses [unified service tagging](https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/?tab=kubernetes#opentelemetry). This requires setting three standard resource attributes on telemetry from both your application and your infrastructure. Datadog automatically maps these OpenTelemetry attributes to the standard Datadog tags (`env`, `service`, and `version`) used for correlation.

The required OpenTelemetry attributes are:

- `service.name`
- `service.version`
- `deployment.environment.name` (formerly `deployment.environment`)

This ensures that telemetry from your application is consistently tagged, allowing Datadog to link traces, metrics, and logs to the same service.

### Application configuration{% #application-configuration %}

Set the following environment variables in your application's container specification to tag outgoing telemetry:

```yaml
spec:
  containers:
    - name: my-container
      env:
        - name: OTEL_SERVICE_NAME
          value: "<SERVICE_NAME>"
        - name: OTEL_SERVICE_VERSION
          value: "<SERVICE_VERSION>"
        - name: OTEL_ENVIRONMENT
          value: "<ENVIRONMENT>"
        - name: OTEL_RESOURCE_ATTRIBUTES
          value: "service.name=$(OTEL_SERVICE_NAME),service.version=$(OTEL_SERVICE_VERSION),deployment.environment.name=$(OTEL_ENVIRONMENT)"
```

### Infrastructure configuration{% #infrastructure-configuration %}

Add the corresponding annotations to your Kubernetes `Deployment` metadata. The `k8sattributes` processor in the Collector uses these annotations to enrich infrastructure metrics with service context.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  annotations:
    # Use resource.opentelemetry.io/ for the k8sattributes processor
    resource.opentelemetry.io/service.name: "<SERVICE_NAME>"
    resource.opentelemetry.io/service.version: "<SERVICE_VERSION>"
    resource.opentelemetry.io/deployment.environment.name: "<ENVIRONMENT>"
spec:
  template:
    metadata:
      annotations:
        resource.opentelemetry.io/service.name: "<SERVICE_NAME>"
        resource.opentelemetry.io/service.version: "<SERVICE_VERSION>"
        resource.opentelemetry.io/deployment.environment.name: "<ENVIRONMENT>"
# ... rest of the manifest
```

## Data collected{% #data-collected %}

This integration collects metrics using several OpenTelemetry receivers.

### kube-state-metrics (using Prometheus receiver){% #kube-state-metrics-using-prometheus-receiver %}

Metrics scraped from the `kube-state-metrics` endpoint provide information about the state of Kubernetes API objects.

### Kubelet stats receiver{% #kubelet-stats-receiver %}

The `kubeletstatsreceiver` collects metrics from the Kubelet on each node, focusing on pod, container, and volume resource usage.

| OTEL                            | DATADOG                      | DESCRIPTION                                              | FILTER                  |
| ------------------------------- | ---------------------------- | -------------------------------------------------------- | ----------------------- |
| container.filesystem.usage      | kubernetes.filesystem.usage  | Container filesystem usage                               |
| container.filesystem.usage      | kubernetes.filesystem.usage  | Container filesystem usage                               |
| container.memory.rss            | kubernetes.memory.rss        | Container memory rss                                     |
| k8s.node.filesystem.usage       | kubernetes.filesystem.usage  | Node filesystem usage                                    |
| k8s.node.filesystem.usage       | kubernetes.filesystem.usage  | Node filesystem usage                                    |
| k8s.node.memory.rss             | kubernetes.memory.rss        | Node memory rss                                          |
| k8s.node.memory.usage           | kubernetes.memory.usage      | Node memory usage                                        |
| k8s.node.memory.usage           | kubernetes.memory.usage      | Node memory usage                                        |
| k8s.node.network.errors         | kubernetes.network.tx_errors | Node network errors                                      | `direction`: `transmit` |
| k8s.node.network.errors         | kubernetes.network.rx_errors | Node network errors                                      | `direction`: `receive`  |
| k8s.node.network.io             | kubernetes.io.read_bytes     | Node network IO                                          | `direction`: `receive`  |
| k8s.node.network.io             | kubernetes.io.write_bytes    | Node network IO                                          | `direction`: `transmit` |
| k8s.node.network.io             | kubernetes.network.rx_bytes  | Node network IO                                          | `direction`: `receive`  |
| k8s.node.network.io             | kubernetes.network.tx_bytes  | Node network IO                                          | `direction`: `transmit` |
| k8s.pod.filesystem.usage        | kubernetes.filesystem.usage  | Pod filesystem usage                                     |
| k8s.pod.filesystem.usage        | kubernetes.filesystem.usage  | Pod filesystem usage                                     |
| k8s.pod.memory.node.utilization | kubernetes.memory.usage_pct  | Pod memory utilization as a ratio of the node's capacity |
| k8s.pod.memory.rss              | kubernetes.memory.rss        | Pod memory rss                                           |
| k8s.pod.memory.usage            | kubernetes.memory.usage      | Pod memory usage                                         |
| k8s.pod.memory.usage            | kubernetes.memory.usage      | Pod memory usage                                         |
| k8s.pod.network.errors          | kubernetes.network.tx_errors | Pod network errors                                       | `direction`: `transmit` |
| k8s.pod.network.errors          | kubernetes.network.rx_errors | Pod network errors                                       | `direction`: `receive`  |
| k8s.pod.network.io              | kubernetes.network.rx_bytes  | Pod network IO                                           | `direction`: `receive`  |
| k8s.pod.network.io              | kubernetes.network.tx_bytes  | Pod network IO                                           | `direction`: `transmit` |
| k8s.pod.network.io              | kubernetes.io.write_bytes    | Pod network IO                                           | `direction`: `transmit` |
| k8s.pod.network.io              | kubernetes.io.read_bytes     | Pod network IO                                           | `direction`: `receive`  |

### Kubernetes cluster receiver{% #kubernetes-cluster-receiver %}

The `k8sclusterreceiver` collects cluster-level metrics, such as the status and count of nodes, pods, and other objects.

| OTEL                         | DATADOG                    | DESCRIPTION                                                                                                                                                                                                                                                          |
| ---------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| k8s.container.cpu_limit      | kubernetes.cpu.limits      | Maximum resource limit set for the container. See [https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#resourcerequirements-v1-core](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#resourcerequirements-v1-core) for details |
| k8s.container.cpu_request    | kubernetes.cpu.requests    | Resource requested for the container. See [https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#resourcerequirements-v1-core](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#resourcerequirements-v1-core) for details         |
| k8s.container.memory_request | kubernetes.memory.requests | Resource requested for the container. See [https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#resourcerequirements-v1-core](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#resourcerequirements-v1-core) for details         |
| k8s.job.active_pods          | kubernetes.pods.running    | The number of actively running pods for a job                                                                                                                                                                                                                        |

### Host metrics receiver{% #host-metrics-receiver %}

The `hostmetricsreceiver` gathers system-level metrics from each node in the cluster.

| OTEL                          | DATADOG               | DESCRIPTION                                                                                                                      | FILTER                            | TRANSFORM |
| ----------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | --------- |
| system.cpu.load_average.15m   | system.load.15        | Average CPU Load over 15 minutes.                                                                                                |
| system.cpu.load_average.1m    | system.load.1         | Average CPU Load over 1 minute.                                                                                                  |
| system.cpu.load_average.5m    | system.load.5         | Average CPU Load over 5 minutes.                                                                                                 |
| system.cpu.utilization        | system.cpu.idle       | Difference in system.cpu.time since the last measurement per logical CPU, divided by the elapsed time (value in interval [0,1]). | `state`: `idle`                   | × 100     |
| system.cpu.utilization        | system.cpu.iowait     | Difference in system.cpu.time since the last measurement per logical CPU, divided by the elapsed time (value in interval [0,1]). | `state`: `wait`                   | × 100     |
| system.cpu.utilization        | system.cpu.stolen     | Difference in system.cpu.time since the last measurement per logical CPU, divided by the elapsed time (value in interval [0,1]). | `state`: `steal`                  | × 100     |
| system.cpu.utilization        | system.cpu.system     | Difference in system.cpu.time since the last measurement per logical CPU, divided by the elapsed time (value in interval [0,1]). | `state`: `system`                 | × 100     |
| system.cpu.utilization        | system.cpu.user       | Difference in system.cpu.time since the last measurement per logical CPU, divided by the elapsed time (value in interval [0,1]). | `state`: `user`                   | × 100     |
| system.filesystem.utilization | system.disk.in_use    | Fraction of filesystem bytes used.                                                                                               |
| system.filesystem.utilization | system.disk.in_use    | Fraction of filesystem bytes used.                                                                                               |
| system.memory.usage           | system.mem.total      | Bytes of memory in use.                                                                                                          | × 1048576                         |
| system.memory.usage           | system.mem.usable     | Bytes of memory in use.                                                                                                          | `state`: `free, cached, buffered` | × 1048576 |
| system.network.io             | system.net.bytes_rcvd | The number of bytes transmitted and received.                                                                                    | `direction`: `receive`            |
| system.network.io             | system.net.bytes_sent | The number of bytes transmitted and received.                                                                                    | `direction`: `transmit`           |
| system.paging.usage           | system.swap.free      | Swap (unix) or pagefile (windows) usage.                                                                                         | `state`: `free`                   | × 1048576 |
| system.paging.usage           | system.swap.used      | Swap (unix) or pagefile (windows) usage.                                                                                         | `state`: `used`                   | × 1048576 |

See [OpenTelemetry Metrics Mapping](https://docs.datadoghq.com/opentelemetry/schema_semantics/metrics_mapping/) for more information.

## Further reading{% #further-reading %}

- [Send OpenTelemetry Data to Datadog](https://docs.datadoghq.com/opentelemetry/setup/)
- [Unified Service Tagging](https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/)
- [Example Collector Configurations](https://github.com/DataDog/opentelemetry-examples/tree/main/guides/kubernetes)
