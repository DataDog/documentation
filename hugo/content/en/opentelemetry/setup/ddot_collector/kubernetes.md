---
title: Install the DDOT Collector on Kubernetes
aliases:
- /opentelemetry/setup/ddot_collector/install/kubernetes_standalone/
description: Deploy the DDOT Collector on Kubernetes with the OpenTelemetry Operator or the OpenTelemetry Collector Helm chart.
# code_lang: kubernetes_standalone
# type: multi-code-lang
# code_lang_weight: 3
further_reading:
- link: "/opentelemetry/setup/ddot_collector/#opentelemetry-collector-components"
  tag: "Documentation"
  text: "OpenTelemetry Collector components included in DDOT"
---


{{< callout header="false" btn_hidden="true" >}}
Installing the standalone DDOT Collector with OpenTelemetry tooling is in Preview.
{{< /callout >}}

## Overview

Follow this guide to deploy the Datadog Distribution of OpenTelemetry (DDOT) Collector on Kubernetes without the Datadog Agent. You can use the OpenTelemetry Operator or the OpenTelemetry Collector Helm chart.

<div class="alert alert-info">
  <strong>Need additional OpenTelemetry components?</strong> The <code>datadog/ddot-collector</code> image includes a fixed set of components. For the list, see <a href="/opentelemetry/setup/ddot_collector/#opentelemetry-collector-components">OpenTelemetry Collector components</a>. To add components, <a href="/opentelemetry/setup/ddot_collector/custom_components">Use Custom OpenTelemetry Components</a> builds a custom Datadog Agent image. That image is for the Collector in the Agent, the OpenTelemetry Collector that runs inside the Datadog Agent. It isn't for the standalone DDOT Collector on this page.
</div>

## Requirements

To complete this guide, you need the following:

**Datadog account**:
1. [Create a Datadog account][1] if you don't have one.
1. Find or create your [Datadog API key][2].

**Software**:
Install and set up the following on your machine:

- A Kubernetes cluster (v1.29+)
- [Helm (v4+)][54]
- [kubectl][5]

**Network**:
| Protocol | Transport | Port |
|:---------|:----------|-----:|
| gRPC     | TCP       | 4317 |
| HTTP     | TCP       | 4318 |

## Install the DDOT Collector

The commands in this guide use your current namespace. Run every step in the same namespace.

### Select installation method

Choose one of the following installation methods:

- [OpenTelemetry Operator][55]: A [Kubernetes-native][56] approach that automatically reconciles and maintains your OTel Collector setup.
- [Helm chart][4]: A straightforward way to deploy OTel Collectors.

{{< tabs >}}
{{% tab "Operator" %}}
### Install the OpenTelemetry Operator

By default, the Operator's admission webhook needs [cert-manager][64]. If your cluster doesn't have cert-manager, install it:

```shell
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install cert-manager jetstack/cert-manager --version v1.21.3 \
     --namespace cert-manager --create-namespace \
     --set crds.enabled=true --wait
```

You don't need to create an Issuer. The Operator chart creates its own.

Install the OpenTelemetry Operator with the [OpenTelemetry Operator Helm chart][1]:

```shell
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update
helm install opentelemetry-operator open-telemetry/opentelemetry-operator   \
     --version 0.127.0                                                      \
     --set "manager.createRbacPermissions=true"                             \
     --set "manager.collectorImage.repository=datadog/ddot-collector"       \
     --set "manager.collectorImage.tag={{< version key="agent_version" >}}"
```

{{% site-region region="gov,gov2" %}}
<div class="alert alert-info">
For FED, set the tag to <code>{{< version key="agent_version" >}}-fips</code> to use the FIPS-compliant DDOT image.
See <a href="/agent/configuration/fips-compliance/">FIPS compliance</a>.
</div>
{{% /site-region %}}

Wait for the Operator to be ready before you continue:

```shell
kubectl rollout status deployment/opentelemetry-operator --timeout=5m
```

[1]: https://github.com/open-telemetry/opentelemetry-helm-charts/blob/main/charts/opentelemetry-operator/README.md
[64]: https://cert-manager.io/docs/installation/
{{% /tab %}}
{{% tab "Helm" %}}
### Add the OpenTelemetry Helm repository

To add the OpenTelemetry repository to your Helm repositories:

```shell
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update
```

{{% /tab %}}
{{< /tabs >}}

### Set up Datadog API key

1. Get the Datadog [API key][2].
1. Confirm the **DATADOG SITE** selected on the right (Current value: **{{< region-param key="dd_site_name" >}}**) corresponds to your [Datadog site][52].
1. Store the API key as a Kubernetes secret:
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>        \
     --from-literal site={{< region-param key="dd_site" >}}
   ```
   Replace `<DD_API_KEY>` with your actual Datadog API key.

### Configure the OTel Collector

The DDOT Collector needs a host name for each node. Set it with the `DD_HOSTNAME` environment variable, as `<NODE_NAME>-<CLUSTER_NAME>`. Without `DD_HOSTNAME`, the Collector pod exits with `unable to reliably determine the host name`. This applies to every cluster, including clusters on a cloud provider.

The example configurations below set `DD_HOSTNAME` from a `NODE_NAME` variable:

```yaml
- name: NODE_NAME
  valueFrom:
    fieldRef:
      fieldPath: spec.nodeName
- name: DD_HOSTNAME
  value: $(NODE_NAME)-<CLUSTER_NAME>
```

`NODE_NAME` reads the node name from the pod spec. Keep it above `DD_HOSTNAME` in the list, because Kubernetes expands `$(NODE_NAME)` only from variables defined earlier. Replace `<CLUSTER_NAME>` with the cluster name you use for `K8S_CLUSTER_NAME` in the same file.

Datadog uses the `<NODE_NAME>-<CLUSTER_NAME>` name for the node's Kubernetes metrics too. If no Datadog Agent runs on the node, each node appears as one host. This assumes your configuration adds `k8s.cluster.name`, as the `resource/add-cluster-name` processor in the example configuration does. If it doesn't, set `DD_HOSTNAME` to `$(NODE_NAME)`.

{{< tabs >}}
{{% tab "Operator" %}}
After deploying the OTel Operator, create the `OpenTelemetryCollector` resource that triggers the deployment of the Collector.

1. Use the `node-collector.yaml` file to specify your `OpenTelemetryCollector` daemonset configuration.

{{< code-block lang="yaml" filename="node-collector.yaml" collapsible="true" >}}
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
metadata:
  name: node-collector
spec:
  # Deploy 1 instance per node, that will collect telemetry from that node's pods
  mode: daemonset
  config:
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
          site: ${env:DD_SITE}
        sending_queue:
          batch:
            flush_timeout: 10s
    service:
      telemetry:
        resource:
          k8s.cluster.name: ${env:K8S_CLUSTER_NAME}
  env:
    - name: DD_API_KEY
      valueFrom:
        secretKeyRef:
          key: api-key
          name: datadog-secret
    - name: DD_SITE
      valueFrom:
        secretKeyRef:
          key: site
          name: datadog-secret
    - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
      value: datadog,pprof,zpages,prometheus,infraattributes
    - name: K8S_CLUSTER_NAME
      value: <CLUSTER_NAME>
    - name: NODE_NAME
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
    - name: DD_HOSTNAME
      value: $(NODE_NAME)-<CLUSTER_NAME>
{{< /code-block >}}

Replace both `<CLUSTER_NAME>` placeholders with the same name for your cluster.

2. Add an OTLP receiver and the Datadog exporter for all desired signals. Publish the OTLP ports on the node with `hostPort` so that application pods can reach the Collector instance running on the same node:

{{< code-block lang="yaml" filename="node-collector.yaml" collapsible="true" >}}
# [...]
spec:
  # [...]
  # Publish the OTLP ports on the node's network interface
  ports:
    - name: otlp-grpc
      port: 4317
      protocol: TCP
      hostPort: 4317
    - name: otlp-http
      port: 4318
      protocol: TCP
      hostPort: 4318
  config:
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
    # [...]
    service:
      # [...]
      pipelines:
        logs:
          receivers: ['otlp']
          exporters: ['datadog']
        metrics:
          receivers: ['otlp']
          exporters: ['datadog']
        traces:
          receivers: ['otlp']
          exporters: ['datadog']
{{< /code-block >}}

3. (Optional) Enable additional features:

<div class="alert alert-warning">Enabling these features may incur additional charges. Review the <a href="https://www.datadoghq.com/pricing/">pricing page</a> and talk to your Customer Success Manager before proceeding.</div>

{{< code-block lang="yaml" filename="node-collector.yaml" collapsible="true" >}}
spec:
  config:
    receivers:
      host_metrics:
        collection_interval: 15s
        scrapers:
          cpu: {}
          load: {}
          memory: {}
          network: {}
          disk: {}
      kubelet_stats:
        auth_type: serviceAccount
        collection_interval: 15s
        endpoint: ${env:K8S_NODE_NAME}:10250
        node: ${env:K8S_NODE_NAME}
        metric_groups:
          - pod
          - container
          - volume
    processors:
      infraattributes:
        cardinality: 2
      resource/add-cluster-name:
        attributes:
          - key: k8s.cluster.name
            value: ${env:K8S_CLUSTER_NAME}
            action: upsert
    connectors:
      datadog/connector:
        traces:
          compute_top_level_by_span_kind: true
          peer_tags_aggregation: true
          compute_stats_by_span_kind: true
    extensions:
      health_check:
        endpoint: "${env:K8S_POD_IP}:13133"
    # [...]
    service:
      # [...]
      extensions: ['health_check']
      pipelines:
        logs:
          # [...]
          processors: ['resource/add-cluster-name', 'infraattributes']
        metrics:
          receivers: ['host_metrics', 'otlp', 'kubelet_stats', 'datadog/connector']
          processors: ['resource/add-cluster-name', 'infraattributes']
          # [...]
        traces:
          # [...]
          processors: ['resource/add-cluster-name', 'infraattributes']
          exporters: ['datadog', 'datadog/connector']
  env:
    # [...]
    - name: K8S_POD_IP
      valueFrom:
        fieldRef:
          apiVersion: v1
          fieldPath: status.podIP
    # K8S_NODE_NAME is added automatically by the operator
{{< /code-block >}}

4. (Optional) Collect container logs from the node's file system:

<div class="alert alert-warning">Enabling log collection may incur additional charges. Review the <a href="https://www.datadoghq.com/pricing/">pricing page</a> and talk to your Customer Success Manager before proceeding.</div>

The `filelog` receiver reads container logs from the node. Because the Operator does not mount host paths automatically, add the log directories as read-only volumes:

{{< code-block lang="yaml" filename="node-collector.yaml" collapsible="true" >}}
spec:
  config:
    receivers:
      filelog:
        include:
          - /var/log/pods/*/*/*.log
        # Exclude the Collector's own logs to avoid a feedback loop
        exclude:
          - /var/log/pods/*_node-collector-collector-*_*/otc-container/*.log
        start_at: end
        include_file_path: true
        include_file_name: false
        retry_on_failure:
          enabled: true
        operators:
          - id: container-parser
            type: container
            max_log_size: 102400
    # [...]
    service:
      # [...]
      pipelines:
        logs:
          receivers: ['otlp', 'filelog']
          # [...]
  # Mount the node's log directories into the Collector pod (read-only)
  volumes:
    - name: varlogpods
      hostPath:
        path: /var/log/pods
    - name: varlibdockercontainers
      hostPath:
        path: /var/lib/docker/containers
  volumeMounts:
    - name: varlogpods
      mountPath: /var/log/pods
      readOnly: true
    - name: varlibdockercontainers
      mountPath: /var/lib/docker/containers
      readOnly: true
{{< /code-block >}}

{{% collapse-content title="Completed node-collector.yaml file" level="p" %}}
Your `node-collector.yaml` file should look something like this:
{{< code-block lang="yaml" filename="node-collector.yaml" collapsible="false" >}}
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
metadata:
  name: node-collector
spec:
  # Deploy 1 instance per node, that will collect telemetry from that node's pods
  mode: daemonset
  # Publish the OTLP ports on the node's network interface
  ports:
    - name: otlp-grpc
      port: 4317
      protocol: TCP
      hostPort: 4317
    - name: otlp-http
      port: 4318
      protocol: TCP
      hostPort: 4318
  config:
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
      host_metrics:
        collection_interval: 15s
        scrapers:
          cpu: {}
          load: {}
          memory: {}
          network: {}
          disk: {}
      kubelet_stats:
        auth_type: serviceAccount
        collection_interval: 15s
        endpoint: ${env:K8S_NODE_NAME}:10250
        node: ${env:K8S_NODE_NAME}
        metric_groups:
          - pod
          - container
          - volume
      filelog:
        include:
          - /var/log/pods/*/*/*.log
        exclude:
          - /var/log/pods/*_node-collector-collector-*_*/otc-container/*.log
        start_at: end
        include_file_path: true
        include_file_name: false
        retry_on_failure:
          enabled: true
        operators:
          - id: container-parser
            type: container
            max_log_size: 102400
    processors:
      infraattributes:
        cardinality: 2
      resource/add-cluster-name:
        attributes:
          - key: k8s.cluster.name
            value: ${env:K8S_CLUSTER_NAME}
            action: upsert
    connectors:
      datadog/connector:
        traces:
          compute_top_level_by_span_kind: true
          peer_tags_aggregation: true
          compute_stats_by_span_kind: true
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
          site: ${env:DD_SITE}
        sending_queue:
          batch:
            flush_timeout: 10s
    extensions:
      health_check:
        endpoint: "${env:K8S_POD_IP}:13133"
    service:
      telemetry:
        resource:
          k8s.cluster.name: ${env:K8S_CLUSTER_NAME}
      extensions: ['health_check']
      pipelines:
        logs:
          receivers: ['otlp', 'filelog']
          processors: ['resource/add-cluster-name', 'infraattributes']
          exporters: ['datadog']
        metrics:
          receivers: ['host_metrics', 'otlp', 'kubelet_stats', 'datadog/connector']
          processors: ['resource/add-cluster-name', 'infraattributes']
          exporters: ['datadog']
        traces:
          receivers: ['otlp']
          processors: ['resource/add-cluster-name', 'infraattributes']
          exporters: ['datadog', 'datadog/connector']
  env:
    - name: DD_API_KEY
      valueFrom:
        secretKeyRef:
          key: api-key
          name: datadog-secret
    - name: DD_SITE
      valueFrom:
        secretKeyRef:
          key: site
          name: datadog-secret
    - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
      value: datadog,pprof,zpages,prometheus,infraattributes
    - name: K8S_CLUSTER_NAME
      value: <CLUSTER_NAME>
    - name: NODE_NAME
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
    - name: DD_HOSTNAME
      value: $(NODE_NAME)-<CLUSTER_NAME>
    - name: K8S_POD_IP
      valueFrom:
        fieldRef:
          apiVersion: v1
          fieldPath: status.podIP
    # K8S_NODE_NAME is added automatically by the operator
  # Mount the node's log directories for the filelog receiver (read-only)
  volumes:
    - name: varlogpods
      hostPath:
        path: /var/log/pods
    - name: varlibdockercontainers
      hostPath:
        path: /var/lib/docker/containers
  volumeMounts:
    - name: varlogpods
      mountPath: /var/log/pods
      readOnly: true
    - name: varlibdockercontainers
      mountPath: /var/lib/docker/containers
      readOnly: true
{{< /code-block >}}

Replace both `<CLUSTER_NAME>` placeholders with the same name for your cluster.

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Helm" %}}
Use a YAML file to specify the Helm chart parameters for the [Collector chart][1].

1. Create an empty `node-collector-values.yaml` file:

```shell
touch node-collector-values.yaml
```

<div class="alert alert-info">Unspecified parameters use defaults from <a href="https://github.com/open-telemetry/opentelemetry-helm-charts/blob/main/charts/opentelemetry-collector/values.yaml">values.yaml</a>.</div>

2. Choose the daemonset mode and use DDOT as the collector:

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
mode: daemonset
image:
  repository: datadog/ddot-collector
  tag: {{< version key="agent_version" >}}
ports:
  jaeger-compact:
    enabled: false
  jaeger-grpc:
    enabled: false
  jaeger-thrift:
    enabled: false
  zipkin:
    enabled: false
{{< /code-block >}}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-info">For FED, set <code>tag: {{< version key="agent_version" >}}-fips</code> to use the FIPS-compliant DDOT image. See <a href="/agent/configuration/fips-compliance/">FIPS compliance</a>.</div>
{{% /site-region %}}

<div class="alert alert-info">The Collector Helm chart publishes the OTLP ports on each node by default (<code>hostPort: 4317</code> for gRPC and <code>hostPort: 4318</code> for HTTP), so application pods can reach the Collector instance running on the same node. See <a href="#configure-the-application">Configure the application</a>.</div>

3. Configure the Datadog exporter and API key secret:

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
config:
  exporters:
    datadog:
      api:
        key: ${env:DD_API_KEY}
        site: ${env:DD_SITE}
      sending_queue:
        batch:
          flush_timeout: 10s
extraEnvs:
  - name: DD_API_KEY
    valueFrom:
      secretKeyRef:
        key: api-key
        name: datadog-secret
  - name: DD_SITE
    valueFrom:
      secretKeyRef:
        key: site
        name: datadog-secret
  - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
    value: datadog,pprof,zpages,prometheus,infraattributes
  - name: K8S_CLUSTER_NAME
    value: <CLUSTER_NAME>
  - name: NODE_NAME
    valueFrom:
      fieldRef:
        fieldPath: spec.nodeName
  - name: DD_HOSTNAME
    value: $(NODE_NAME)-<CLUSTER_NAME>
{{< /code-block >}}

Replace both `<CLUSTER_NAME>` placeholders with the same name for your cluster.

4. Enable presets:

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
presets:
  hostMetrics:
    enabled: true
  kubeletMetrics:
    enabled: true
  logsCollection:
    enabled: true
    includeCollectorLogs: false
{{< /code-block >}}

5. Define pipelines for desired signals, with an OTLP receiver:

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
config:
  # [...]
  receivers:
    otlp:
      protocols:
        grpc:
          endpoint: 0.0.0.0:4317
        http:
          endpoint: 0.0.0.0:4318
  service:
    pipelines:
      logs:
        receivers: ['otlp']
        exporters: ['datadog']
      metrics:
        receivers: ['otlp']
        exporters: ['datadog']
      traces:
        receivers: ['otlp']
        exporters: ['datadog']
    telemetry:
      resource:
        k8s.cluster.name: ${env:K8S_CLUSTER_NAME}
{{< /code-block >}}

6. (Optional) Enable additional Datadog features:

<div class="alert alert-warning">Enabling these features may incur additional charges. Review the <a href="https://www.datadoghq.com/pricing/">pricing page</a> and talk to your Customer Success Manager before proceeding.</div>

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
config:
  # [...]
  processors:
    infraattributes:
      cardinality: 2
    resource/add-cluster-name:
      attributes:
        - key: k8s.cluster.name
          value: ${env:K8S_CLUSTER_NAME}
          action: upsert
  connectors:
    datadog/connector:
      traces:
        compute_top_level_by_span_kind: true
        peer_tags_aggregation: true
        compute_stats_by_span_kind: true
  service:
    pipelines:
      logs:
        # [...]
        processors: ['resource/add-cluster-name', 'infraattributes']
      metrics:
        receivers: ['otlp', 'datadog/connector']
        processors: ['resource/add-cluster-name', 'infraattributes']
        # [...]
      traces:
        # [...]
        processors: ['resource/add-cluster-name', 'infraattributes']
        exporters: ['datadog', 'datadog/connector']
{{< /code-block >}}

{{% collapse-content title="Completed node-collector-values.yaml file" level="p" %}}
Your `node-collector-values.yaml` file should look something like this:
{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="false" >}}
mode: daemonset
image:
  repository: datadog/ddot-collector
  tag: {{< version key="agent_version" >}}
presets:
  hostMetrics: # Add an hostmetrics receiver to the metrics pipeline
    enabled: true
  kubeletMetrics: # Add a kubeletstats receiver to the metrics pipeline
    enabled: true
  logsCollection: # Add a filelog receiver to the logs pipeline
    enabled: true
    includeCollectorLogs: false
config:
  connectors:
    datadog/connector:
      traces:
        compute_top_level_by_span_kind: true
        peer_tags_aggregation: true
        compute_stats_by_span_kind: true
  exporters:
    datadog:
      api:
        key: ${env:DD_API_KEY}
        site: ${env:DD_SITE}
      sending_queue:
        batch:
          flush_timeout: 10s
  processors:
    infraattributes:
      cardinality: 2
    resource/add-cluster-name:
      attributes:
        - key: k8s.cluster.name
          value: ${env:K8S_CLUSTER_NAME}
          action: upsert
  receivers:
    otlp:
      protocols:
        grpc:
          endpoint: 0.0.0.0:4317
        http:
          endpoint: 0.0.0.0:4318
  service:
    extensions:
      - health_check
    pipelines:
      logs:
        receivers:
          - otlp
        processors:
          - resource/add-cluster-name
          - infraattributes
        exporters:
          - datadog
      metrics:
        receivers:
          - otlp
          - datadog/connector
        processors:
          - resource/add-cluster-name
          - infraattributes
        exporters:
          - datadog
      traces:
        receivers:
          - otlp
        processors:
          - resource/add-cluster-name
          - infraattributes
        exporters:
          - datadog
          - datadog/connector
    telemetry:
      resource:
        k8s.cluster.name: ${env:K8S_CLUSTER_NAME}
extraEnvs:
  - name: DD_API_KEY
    valueFrom:
      secretKeyRef:
        key: api-key
        name: datadog-secret
  - name: DD_SITE
    valueFrom:
      secretKeyRef:
        key: site
        name: datadog-secret
  - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
    value: datadog,pprof,zpages,prometheus,infraattributes
  - name: K8S_CLUSTER_NAME
    value: <CLUSTER_NAME>
  - name: NODE_NAME
    valueFrom:
      fieldRef:
        fieldPath: spec.nodeName
  - name: DD_HOSTNAME
    value: $(NODE_NAME)-<CLUSTER_NAME>
ports:
  jaeger-compact:
    enabled: false
  jaeger-grpc:
    enabled: false
  jaeger-thrift:
    enabled: false
  zipkin:
    enabled: false
{{< /code-block >}}

{{% /collapse-content %}}

[1]: https://github.com/open-telemetry/opentelemetry-helm-charts/blob/main/charts/opentelemetry-collector/README.md
[2]: /getting_started/site/
[3]: /containers/guide/changing_container_registry/
{{% /tab %}}
{{< /tabs >}}

### Deploy the Collector

{{< tabs >}}
{{% tab "Operator" %}}
Apply the `node-collector.yaml` file to create the `OpenTelemetryCollector` resource. The Operator deploys the Collector as a DaemonSet, running one instance per node:

```shell
kubectl apply -f node-collector.yaml
```

Wait for the Collector to run on every node:

```shell
kubectl rollout status daemonset/node-collector-collector --timeout=5m
```
{{% /tab %}}
{{% tab "Helm" %}}
Install the OpenTelemetry Collector chart with your values file:

```shell
helm install node-collector open-telemetry/opentelemetry-collector --version 0.177.0 -f node-collector-values.yaml
```

Wait for the Collector to run on every node:

```shell
kubectl rollout status daemonset/node-collector-opentelemetry-collector-agent --timeout=5m
```

To apply later changes, run `helm upgrade node-collector open-telemetry/opentelemetry-collector --version 0.177.0 -f node-collector-values.yaml`.
{{% /tab %}}
{{< /tabs >}}

## Send your telemetry to Datadog

To send your telemetry data to Datadog:

1. [Instrument your application](#instrument-the-application)
2. [Configure the application](#configure-the-application)
3. [Correlate observability data](#correlate-observability-data)
4. [Run your application](#run-the-application)

### Instrument the application

Instrument your application [using the OpenTelemetry API][12].

{{% collapse-content title="Example application instrumented with the OpenTelemetry API" level="p" %}}
As an example, you can use the [Calendar sample application][9] that's already instrumented for you. The following code instruments the [CalendarService.getDate()][10] method using the OpenTelemetry annotations and API:
   {{< code-block lang="java" filename="CalendarService.java" disable_copy="true" collapsible="false" >}}
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    Span span = Span.current();
    span.setAttribute("peer.service", "random-date-service");
    ...
}
{{< /code-block >}}
{{% /collapse-content %}}

### Configure the application

Your application container must send data to the DDOT Collector running on the same node. Because the Collector publishes the OTLP ports on the node with `hostPort`, the application can reach the local Collector through the node's IP address (`status.hostIP`).

If `OTEL_EXPORTER_OTLP_ENDPOINT` isn't already set, add these variables to your application container's `env` list:

{{< code-block lang="yaml" filename="deployment.yaml" collapsible="true" >}}
env:
  - name: HOST_IP
    valueFrom:
      fieldRef:
        fieldPath: status.hostIP
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: 'http://$(HOST_IP):4317'
  - name: OTEL_EXPORTER_OTLP_PROTOCOL
    value: 'grpc'
{{< /code-block >}}

To send OTLP over HTTP instead, use port `4318` and set `OTEL_EXPORTER_OTLP_PROTOCOL` to `http/protobuf`.

### Correlate observability data

[Unified service tagging][14] ties observability data together in Datadog so you can navigate across metrics, traces, and logs with consistent tags.

In containerized environments, set `env`, `service`, and `version` using OpenTelemetry Resource Attributes environment variables. The DDOT Collector detects this tagging configuration and applies it to the data it collects from containers.

Add the following environment variables to your application's deployment manifest:

{{< code-block lang="yaml" filename="deployment.yaml" disable_copy="true" collapsible="true" >}}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <SERVICE>
spec:
  template:
    spec:
      containers:
      - name: <SERVICE>
        env:
          - name: OTEL_SERVICE_NAME
            value: "<SERVICE>"
          - name: OTEL_RESOURCE_ATTRIBUTES
            value: "service.version=<VERSION>,deployment.environment.name=<ENV>"
{{< /code-block >}}

### Run the application

Redeploy your application to apply the changes made in the deployment manifest. After the updated configuration is active, Unified Service Tagging is fully enabled for your metrics, traces, and logs.

## Verify the setup

If the Collector pods aren't running, see [Troubleshooting](#troubleshooting).

After your application sends telemetry, check for it in Datadog. Data can take up to five minutes to appear. Replace `<SERVICE>`, `<ENV>`, and `<CLUSTER_NAME>` with the values from your configuration.

- **Services**: In the [Catalog][58], set the environment to `<ENV>` and search for `<SERVICE>`. Its service page shows requests, errors, and latency.
- **Traces**: In the [Trace Explorer][59], search for `service:<SERVICE> env:<ENV>`.
- **Hosts**: In the [Host List][60], each node appears as `<NODE_NAME>-<CLUSTER_NAME>`. With `DD_HOSTNAME` set as in the example configuration and no Datadog Agent on the node, each node appears once.
- **Metrics**: If your configuration collects kubelet metrics, as the example configuration does, graph `avg:k8s.pod.cpu.usage{kube_cluster_name:<CLUSTER_NAME>}` in the [Metrics Explorer][61].
- **Logs**: In the [Log Explorer][62], search for `service:<SERVICE> env:<ENV>`.

## Troubleshooting

The Operator install fails with `no matches for kind "Certificate"`
: cert-manager isn't installed. Install it, then install the Operator again.

`kubectl apply -f node-collector.yaml` fails with `failed calling webhook`
: The Operator isn't ready yet. Run `kubectl rollout status deployment/opentelemetry-operator --timeout=5m`, then apply the file again.

The Collector pod shows `CreateContainerConfigError`
: The Collector can't find its secret. Check that `datadog-secret` exists in the same namespace as the Collector, with the keys `api-key` and `site`:

  ```shell
  kubectl describe secret datadog-secret
  ```

The Collector pod exits with `unable to reliably determine the host name`
: Set `DD_HOSTNAME` as described in [Configure the OTel Collector](#configure-the-otel-collector).

No data in Datadog
: Search the Collector's logs for export errors. A `403` means the API key or the site is wrong. Replace `<DAEMONSET_NAME>` with `node-collector-collector` for the Operator, or `node-collector-opentelemetry-collector-agent` for Helm:

  ```shell
  kubectl logs daemonset/<DAEMONSET_NAME> | grep -iE "403|forbidden|exporting failed"
  ```

## Add the Datadog Agent (optional)

Some Datadog features need the Datadog Agent alongside the DDOT Collector. To add the Agent, install it separately with the [Datadog Operator][57].

The DDOT Collector already collects some of the data the Agent can collect, and it uses host ports on every node. Before you deploy the Agent, check these settings in the `DatadogAgent` resource:

- **Container logs**: If the Collector collects container logs, as the example configurations do, leave container log collection off in the Agent. If both collect them, Datadog receives each container log twice, and you pay for both copies. To collect container logs with the Agent instead, remove the `filelog` receiver (Operator) or turn off the `logsCollection` preset (Helm).
- **OTLP ports**: Don't turn on OTLP ingestion in the Agent, or the Collector in the Agent, on host ports `4317` or `4318`. The DDOT Collector uses those host ports on every node. Kubernetes can't schedule two pods that use the same host port on one node, so the Agent pod stays `Pending`.
- **Cluster name**: Set `spec.global.clusterName` to the same `<CLUSTER_NAME>` you use for the Collector. When a cluster name is set, the Agent reports `<NODE_NAME>-<CLUSTER_NAME>` as a host alias for the node. That's the same host name the Collector uses.

By default, the Datadog Operator Helm chart watches `DatadogAgent` resources only in the namespace where the Operator is installed (`watchNamespaces: []`). You can create the `DatadogAgent` resource in a different namespace, for example to keep it separate from the `OpenTelemetryCollector` resource. If you do, set `watchNamespaces` to list both namespaces. The list replaces the default, so include the Operator's own namespace:

```shell
helm upgrade datadog-operator datadog/datadog-operator \
  -n <OPERATOR_NAMESPACE> \
  --reuse-values \
  --set 'watchNamespaces={<OPERATOR_NAMESPACE>,<DATADOG_AGENT_NAMESPACE>}'
```

If the Operator doesn't watch the namespace where the `DatadogAgent` resource is created, the resource silently fails to reconcile, with no error, no Kubernetes event, and no status update to indicate the problem.

## Uninstall

Remove the Collector and the components you installed for it:

{{< tabs >}}
{{% tab "Operator" %}}

<div class="alert alert-warning">Uninstalling the Operator also deletes its custom resource definitions. That removes every <code>OpenTelemetryCollector</code> and <code>Instrumentation</code> resource in the cluster, not only the ones from this guide. If other teams use the Operator in this cluster, check with them before you uninstall it.</div>

Delete the `OpenTelemetryCollector` resource, then uninstall the Operator:

```shell
kubectl delete -f node-collector.yaml
helm uninstall opentelemetry-operator
kubectl delete secret opentelemetry-operator-controller-manager-service-cert
```

If you installed cert-manager for this guide and nothing else in your cluster uses it, uninstall it too. The cert-manager custom resource definitions and the `cert-manager` namespace remain. To remove them, see the [cert-manager uninstall guide][65].

```shell
helm uninstall cert-manager --namespace cert-manager
```

[65]: https://cert-manager.io/docs/installation/helm/#uninstalling

{{% /tab %}}
{{% tab "Helm" %}}

Uninstall the Collector release:

```shell
helm uninstall node-collector
```

{{% /tab %}}
{{< /tabs >}}

Then delete the API key secret:

```shell
kubectl delete secret datadog-secret
```

If you also installed the Datadog Agent, remove the `DatadogAgent` resource and the Datadog Operator separately.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://opentelemetry.io/docs/platforms/kubernetes/helm/collector/
[5]: https://kubernetes.io/docs/tasks/tools/#kubectl
[9]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[10]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/java/com/otel/service/CalendarService.java#L27-L48
[12]: /tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[14]: /getting_started/tagging/unified_service_tagging
[52]: /getting_started/site/
[54]: https://helm.sh
[55]: https://opentelemetry.io/docs/platforms/kubernetes/operator/
[56]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[57]: /getting_started/containers/datadog_operator/
[58]: https://app.datadoghq.com/software
[59]: https://app.datadoghq.com/apm/traces
[60]: https://app.datadoghq.com/infrastructure
[61]: https://app.datadoghq.com/metric/explorer
[62]: https://app.datadoghq.com/logs
