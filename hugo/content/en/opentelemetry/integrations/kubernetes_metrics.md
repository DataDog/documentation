---
title: Kubernetes Metrics
description: Collect Kubernetes infrastructure metrics and populate Kubernetes Explorer with OpenTelemetry Collectors.
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

Collect Kubernetes infrastructure metrics with OpenTelemetry to populate the [Kubernetes - Overview][1] dashboard. The reference configurations also collect resource data for [Kubernetes Explorer][10]. This setup does not install the Datadog Agent or instrument your applications.

{{< img src="/opentelemetry/collector_exporter/kubernetes_metrics.png" alt="The 'Kubernetes - Overview' dashboard, showing metrics for containers, including status and resource usage of your cluster and its containers." style="width:100%;" >}}

The setup uses three components:

- **[`kube-state-metrics`][8]** generates metrics about Kubernetes objects, such as deployments, nodes, and pods.
- **A cluster Collector**, running as a single-replica Deployment, collects cluster-wide metrics and resource data for Explorer.
- **A node Collector**, running as a DaemonSet, collects metrics from each node, such as CPU and memory usage.

The cluster Collector scrapes `kube-state-metrics` with its Prometheus receiver. You do not need to install a Prometheus server.

## Setup

These steps deploy new Collectors in the `default` namespace. If you already collect Kubernetes metrics, review your existing configuration before deploying additional Collectors to avoid duplicate collection.

### Prerequisites

- [Helm][2] and `kubectl`, with permission to deploy workloads and create RBAC resources in the cluster.
- A [Datadog API key][6] and your [Datadog site][5].

The commands use OpenTelemetry Collector [Helm chart v0.156.2][9] and the `otel/opentelemetry-collector-contrib:0.154.0` image.

The `k8sobjects` receiver used for Explorer can increase Kubernetes API server load. Datadog recommends Kubernetes 1.33 or later and testing on smaller clusters before expanding collection. See [Kubernetes Explorer limitations][12].

{{< site-region region="gov,gov2" >}}<div class="alert alert-warning">Kubernetes Explorer with OpenTelemetry is not available for {{< region-param key="dd_site_name" >}}.</div>{{< /site-region >}}

### Installation

#### 1. Install kube-state-metrics

Add the `prometheus-community` Helm repository and install `kube-state-metrics`:

```sh
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install kube-state-metrics prometheus-community/kube-state-metrics \
  --namespace default
```

The reference configuration scrapes `kube-state-metrics.default.svc:8080`. If you use a different service name or namespace, update the Prometheus receiver target in `cluster-collector.yaml`.

#### 2. Create a Datadog secret

Set your API key and site, then create a secret in the Collectors' namespace:

```sh
export DD_API_KEY="<YOUR_DATADOG_API_KEY>"
export DD_SITE="{{< region-param key="dd_site" >}}"

kubectl create secret generic datadog-secret \
  --namespace default \
  --from-literal="api-key=$DD_API_KEY" \
  --from-literal="dd-site=$DD_SITE"
```

#### 3. Configure and install the Collectors

1. Add the OpenTelemetry Helm chart repository:

   ```sh
   helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
   helm repo update
   ```

2. Download [cluster-collector.yaml][3] and [daemonset-collector.yaml][4] into the same directory. These files are Helm values files from a fixed revision of the examples repository:

   ```sh
   CONFIG_URL="https://raw.githubusercontent.com/DataDog/opentelemetry-examples/388dcf0f27d35a79c3c7264c88064305a1c34e47/guides/kubernetes/configuration"
   curl -fsSLo cluster-collector.yaml "$CONFIG_URL/cluster-collector.yaml"
   curl -fsSLo daemonset-collector.yaml "$CONFIG_URL/daemonset-collector.yaml"
   ```

3. Configure cluster name detection in both files:
   - For automatic detection on EKS, AKS, or GKE, review the `resourcedetection` processor's [provider-specific configuration and permissions][14].
   - If automatic detection is unavailable, uncomment the `resource/add-cluster-name` processor and replace `<YOUR_CLUSTER_NAME>` with the same cluster name in both files. Add `resource/add-cluster-name` after `resourcedetection` in each pipeline's `processors` list that uses `resourcedetection`. Keep the other processors in place.

4. Run the following commands from the directory containing the values files:

   ```sh
   # Install the node Collector (DaemonSet)
   helm install otel-daemon-collector open-telemetry/opentelemetry-collector \
     --namespace default \
     --version 0.156.2 \
     -f daemonset-collector.yaml \
     --set image.repository=otel/opentelemetry-collector-contrib \
     --set image.tag=0.154.0

   # Install the cluster Collector (Deployment)
   helm install otel-cluster-collector open-telemetry/opentelemetry-collector \
     --namespace default \
     --version 0.156.2 \
     -f cluster-collector.yaml \
     --set image.repository=otel/opentelemetry-collector-contrib \
     --set image.tag=0.154.0
   ```

### Verify the setup

1. Check that the Collector and `kube-state-metrics` pods are running and ready:

   ```sh
   kubectl get pods --namespace default \
     -l 'app.kubernetes.io/instance in (otel-daemon-collector,otel-cluster-collector,kube-state-metrics)'
   ```

2. Open the [Kubernetes - Overview][1] dashboard and select your cluster. Check for node resource usage and Kubernetes object metrics.
3. Open [Kubernetes Explorer][13] and filter by your cluster name. Check that resources such as pods and deployments appear.

If data is missing, check the Collector logs for export errors. Verify that the secret contains an API key for the selected Datadog site.

## Correlate traces with infrastructure metrics (optional) {#correlating-traces-with-infrastructure-metrics}

For applications that already send traces, use [unified service tagging][7] to correlate application telemetry with infrastructure metrics. Set the same resource attributes on both:

- `service.name` maps to the Datadog `service` tag.
- `service.version` maps to the Datadog `version` tag.
- `deployment.environment.name` maps to the Datadog `env` tag.

### Application configuration

Set the following environment variables in your application's container specification to tag outgoing telemetry:

```yaml
spec:
  containers:
    - name: my-container
      env:
        - name: OTEL_SERVICE_NAME
          value: "<SERVICE_NAME>"
        - name: OTEL_RESOURCE_ATTRIBUTES
          value: "service.version=<SERVICE_VERSION>,deployment.environment.name=<ENVIRONMENT>"
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

### Count connector

The [count connector][11] generates object-count metrics by counting the number of metric series that pass through the pipeline. It produces the following metrics:

{{< mapping-table resource="count-connector.csv">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/86/kubernetes---overview
[2]: https://helm.sh/docs/intro/install/
[3]: https://github.com/DataDog/opentelemetry-examples/blob/388dcf0f27d35a79c3c7264c88064305a1c34e47/guides/kubernetes/configuration/cluster-collector.yaml
[4]: https://github.com/DataDog/opentelemetry-examples/blob/388dcf0f27d35a79c3c7264c88064305a1c34e47/guides/kubernetes/configuration/daemonset-collector.yaml
[5]: /getting_started/site/
[6]: /account_management/api-app-keys/#api-keys
[7]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes#opentelemetry
[8]: https://github.com/kubernetes/kube-state-metrics
[9]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/opentelemetry-collector-0.156.2/charts/opentelemetry-collector
[10]: /containers/monitoring/kubernetes_explorer/
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/countconnector
[12]: /containers/monitoring/kubernetes_explorer/?tab=opentelemetrycollector#limitations
[13]: https://app.datadoghq.com/orchestration/overview
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/v0.154.0/processor/resourcedetectionprocessor#cluster-name
