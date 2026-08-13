---
title: Install the Standalone DDOT Collector as a Kubernetes DaemonSet
description: Deploy the standalone Datadog Distribution of the OpenTelemetry (DDOT) Collector on Kubernetes using the OpenTelemetry Operator or Helm chart.
# code_lang: kubernetes_standalone
# type: multi-code-lang
# code_lang_weight: 3
further_reading:
- link: "/opentelemetry/setup/ddot_collector/custom_components"
  tag: "Documentation"
  text: "Use Custom OpenTelemetry Components in DDOT"
---


{{< callout header="false" btn_hidden="true" >}}
Installing the standalone DDOT Collector with OpenTelemetry tooling is in Preview.
{{< /callout >}}

## Overview

Follow this guide to deploy the Datadog Distribution of OpenTelemetry (DDOT) Collector using the OpenTelemetry Operator or Helm chart.

<div class="alert alert-info">
  <strong>Need additional OpenTelemetry components?</strong> If you need components beyond those included in the default package, follow <a href="/opentelemetry/setup/ddot_collector/custom_components">Use Custom OpenTelemetry Components</a> to extend DDOT's capabilities. For a list of components included by default, see <a href="/opentelemetry/agent/#opentelemetry-collector-components">OpenTelemetry Collector components</a>.
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

## Install the Datadog Distribution of the OpenTelemetry Collector

### Select installation method

Choose one of the following installation methods:

- [OpenTelemetry Operator][55]: A [Kubernetes-native][56] approach that automatically reconciles and maintains your OTel Collector setup.
- [Helm chart][4]: A straightforward way to deploy OTel Collectors.

{{< tabs >}}
{{% tab "Operator" %}}
### Install the OpenTelemetry Operator

You can install the OpenTelemetry Operator in your cluster using the [OpenTelemetry Operator Helm chart][1]:

```shell
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update
helm install opentelemetry-operator open-telemetry/opentelemetry-operator   \
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

[1]: https://github.com/open-telemetry/opentelemetry-helm-charts/blob/main/charts/opentelemetry-operator/README.md
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
  command: ['otel-agent', 'run'] # Will no longer be necessary from 7.82.0 onwards
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
          name: datadog-apikey
    - name: DD_SITE
      valueFrom:
        secretKeyRef:
          key: site
          name: datadog-apikey
    - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
      value: datadog,pprof,zpages,prometheus,infraattributes
    - name: K8S_CLUSTER_NAME
      value: <CLUSTER_NAME>
    # vvv Will no longer be necessary from 7.83.0 onwards vvv
    - name: DD_OTEL_STANDALONE
      value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    # vvv Will no longer be necessary from 7.82.0 onwards vvv
    - name: DD_OTELCOLLECTOR_ENABLED
      value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
{{< /code-block >}}

Replace `<CLUSTER_NAME>` with a name for your cluster.

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
  command: ['otel-agent', 'run'] # Will no longer be necessary from 7.82.0 onwards
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
          name: datadog-apikey
    - name: DD_SITE
      valueFrom:
        secretKeyRef:
          key: site
          name: datadog-apikey
    - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
      value: datadog,pprof,zpages,prometheus,infraattributes
    - name: K8S_CLUSTER_NAME
      value: <CLUSTER_NAME>
    - name: K8S_POD_IP
      valueFrom:
        fieldRef:
          apiVersion: v1
          fieldPath: status.podIP
    # K8S_NODE_NAME is added automatically by the operator
    # vvv Will no longer be necessary from 7.83.0 onwards vvv
    - name: DD_OTEL_STANDALONE
      value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    # vvv Will no longer be necessary from 7.82.0 onwards vvv
    - name: DD_OTELCOLLECTOR_ENABLED
      value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
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

Replace `<CLUSTER_NAME>` with a name for your cluster.

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
# Can be removed from 7.82.0 onwards
command:
  name: opt/datadog-agent/embedded/bin/otel-agent
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
        name: datadog-apikey
  - name: DD_SITE
    valueFrom:
      secretKeyRef:
        key: site
        name: datadog-apikey
  - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
    value: datadog,pprof,zpages,prometheus,infraattributes
  - name: K8S_CLUSTER_NAME
    value: <CLUSTER_NAME>
    # vvv Will no longer be necessary from 7.83.0 onwards vvv
  - name: DD_OTEL_STANDALONE
    value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    # vvv Will no longer be necessary from 7.82.0 onwards vvv
  - name: DD_OTELCOLLECTOR_ENABLED
    value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
{{< /code-block >}}

Replace `<CLUSTER_NAME>` with a name for your cluster.

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
# vvv To be removed from 7.82.0 onwards vvv
command:
  name: opt/datadog-agent/embedded/bin/otel-agent
# ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
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
        name: datadog-apikey
  - name: DD_SITE
    valueFrom:
      secretKeyRef:
        key: site
        name: datadog-apikey
  - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
    value: datadog,pprof,zpages,prometheus,infraattributes
  - name: K8S_CLUSTER_NAME
    value: <CLUSTER_NAME>
    # vvv Will no longer be necessary from 7.83.0 onwards vvv
  - name: DD_OTEL_STANDALONE
    value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    # vvv Will no longer be necessary from 7.82.0 onwards vvv
  - name: DD_OTELCOLLECTOR_ENABLED
    value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
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
{{% /tab %}}
{{% tab "Helm" %}}
Install the OpenTelemetry Collector chart with your values file:

```shell
helm install node-collector open-telemetry/opentelemetry-collector -f node-collector-values.yaml
```

To apply later changes, run `helm upgrade node-collector open-telemetry/opentelemetry-collector -f node-collector-values.yaml`.
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

If the `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable is not already set, add it to your application's Deployment manifest file:
   {{< code-block lang="yaml" filename="deployment.yaml" disable_copy="true" collapsible="true" >}}
env:
  ...
  - name: HOST_IP
    valueFrom:
     fieldRef:
        fieldPath: status.hostIP
  - name: OTLP_GRPC_PORT
    value: "4317"
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: 'http://$(HOST_IP):$(OTLP_GRPC_PORT)'
  - name: OTEL_EXPORTER_OTLP_PROTOCOL
    value: 'grpc'
   {{< /code-block >}}

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

## Explore observability data in Datadog

Use Datadog to explore the observability data for your application.

### Fleet automation

Explore your Collector configuration.

{{< img src="/opentelemetry/embedded_collector/fleet_automation.png" alt="Review your Collector configuration from the Fleet Automation page." style="width:100%;" >}}

### Live container monitoring

Monitor your container health using Live Container Monitoring capabilities.

{{< img src="/opentelemetry/embedded_collector/containers.png" alt="Monitor your container health from the Containers page." style="width:100%;" >}}

### Infrastructure node health

View runtime and infrastructure metrics to visualize, monitor, and measure the performance of your nodes.

{{< img src="/opentelemetry/embedded_collector/infrastructure.png" alt="View runtime and infrastructure metrics from the Host List." style="width:100%;" >}}

### Logs

View logs to monitor and troubleshoot application and system operations.

{{< img src="/opentelemetry/embedded_collector/logs.png" alt="View logs from the Log Explorer." style="width:100%;" >}}

### Traces

View traces and spans to observe the status and performance of requests processed by your application, with infrastructure metrics correlated in the same trace.

{{< img src="/opentelemetry/embedded_collector/traces.png" alt="View traces from the Trace Explorer." style="width:100%;" >}}

### Runtime metrics

Monitor your runtime (JVM) metrics for your applications.

{{< img src="/opentelemetry/embedded_collector/metrics.png" alt="View JVM metrics from the JVM Metrics dashboard" style="width:100%;" >}}

### Collector health metrics

View metrics from the DDOT Collector to monitor the Collector health.

{{< img src="/opentelemetry/embedded_collector/dashboard.png" alt="View Collector health metrics from the OTel dashboard." style="width:100%;" >}}

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
