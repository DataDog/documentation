---
title: Kubernetes Metrics
further_reading:
- link: "/opentelemetry/setup/"
  tag: "Documentation"
  text: "Send OpenTelemetry Data to Datadog"
- link: "https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/"
  tag: "Documentation"
  text: "Unified Service Tagging"
- link: "https://github.com/DataDog/opentelemetry-examples/tree/main/guides/kubernetes"
  tag: "GitHub"
  text: "Example Collector Configurations"
---

## Overview

Collect Kubernetes metrics using the OpenTelemetry Collector to gain comprehensive insights into your cluster's health and performance. This integration uses a combination of OpenTelemetry receivers to gather data, which populates the [Kubernetes - Overview][1] dashboard.

{{< img src="/opentelemetry/collector_exporter/kubernetes_metrics.png" alt="The 'Kubernetes - Overview' dashboard, showing metrics for containers, including status and resource usage of your cluster and its containers." style="width:100%;" >}}

This integration requires the [`kube-state-metrics`][8] service and uses a two-collector architecture to gather data.

The `kube-state-metrics` service is a required component that generates detailed metrics about the state of Kubernetes objects like deployments, nodes, and pods. This architecture uses two separate OpenTelemetry Collectors:
- A Cluster Collector, deployed as a Kubernetes Deployment, gathers cluster-wide metrics (for example, the total number of deployments).
- A Node Collector, deployed as a Kubernetes DaemonSet, runs on each node to collect node-specific metrics (for example, CPU and memory usage per node).

This approach ensures that cluster-level metrics are collected only once, preventing data duplication, while node-level metrics are gathered from every node in the cluster.

## Setup

To collect Kubernetes metrics with OpenTelemetry, you need to deploy `kube-state-metrics` and configure both of the above OpenTelemetry Collectors in your cluster.

### Prerequisites

* **Helm**: The setup uses Helm to deploy resources. To install Helm, see the [official Helm documentation][2].
* **Collector Image**: This guide uses the `otel/opentelemetry-collector-contrib:0.130.0` image or newer.

### Installation

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
   - [cluster-collector.yaml][3]
   - [daemonset-collector.yaml][4]

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

## Correlating traces with infrastructure metrics

To correlate your APM traces with Kubernetes infrastructure metrics, Datadog uses [unified service tagging][7]. This requires setting three standard resource attributes on telemetry from both your application and your infrastructure. Datadog automatically maps these OpenTelemetry attributes to the standard Datadog tags (`env`, `service`, and `version`) used for correlation.

The required OpenTelemetry attributes are:

- `service.name`
- `service.version`
- `deployment.environment.name` (formerly `deployment.environment`)

This ensures that telemetry from your application is consistently tagged, allowing Datadog to link traces, metrics, and logs to the same service.

### Application configuration

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

### Infrastructure configuration

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

## Data collected

This integration collects metrics using several OpenTelemetry receivers.

### kube-state-metrics (using Prometheus receiver)

Metrics scraped from the `kube-state-metrics` endpoint provide information about the state of Kubernetes API objects.

### Kubelet stats receiver

The `kubeletstatsreceiver` collects metrics from the Kubelet on each node, focusing on pod, container, and volume resource usage.

{{< mapping-table resource="kubeletstats.csv">}}

### Kubernetes cluster receiver

The `k8sclusterreceiver` collects cluster-level metrics, such as the status and count of nodes, pods, and other objects.

{{< mapping-table resource="k8scluster.csv">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/86/kubernetes---overview
[2]: https://helm.sh/docs/intro/install/
[3]: https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/cluster-collector.yaml
[4]: https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/daemonset-collector.yaml
[5]: /opentelemetry/schema_semantics/metrics_mapping/
[6]: https://app.datadoghq.com/metric/summary
[7]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes#opentelemetry
[8]: https://github.com/kubernetes/kube-state-metrics
