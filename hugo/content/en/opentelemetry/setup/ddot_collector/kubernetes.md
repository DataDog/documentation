---
title: Install the DDOT Collector on Kubernetes
aliases:
- /opentelemetry/setup/ddot_collector/install/kubernetes_standalone/
description: Deploy the DDOT Collector on Kubernetes with the OpenTelemetry Operator or the OpenTelemetry Collector Helm chart, and check that your data reaches Datadog.
further_reading:
- link: "/opentelemetry/setup/ddot_collector/#opentelemetry-collector-components"
  tag: "Documentation"
  text: "OpenTelemetry Collector components included in DDOT"
---


{{< callout header="false" btn_hidden="true" >}}
The DDOT Collector is in Preview.
{{< /callout >}}

## Overview

Deploy the Datadog OpenTelemetry (DDOT) Collector on Kubernetes with the OpenTelemetry Operator or the OpenTelemetry Collector Helm chart. When you finish, a Collector runs on each node, receives OTLP from your applications, and sends your telemetry to Datadog. You don't need the Datadog Agent.

To install DDOT with one script instead, see the [Kubernetes quickstart][69].

## Requirements

**Datadog account**:
1. [Create a Datadog account][1] if you don't have one.
1. Find or create your [Datadog API key][2].

**Software**:
- A Kubernetes cluster (v1.29+)
- [Helm (v4+)][54]
- [kubectl][5]

**Cluster policy**: The Collector publishes its OTLP ports on each node with `hostPort`, and container log collection reads node files with `hostPath` volumes. The Kubernetes [baseline Pod Security Standard][70] doesn't allow either one, so run the Collector in a namespace that allows them.

**Network**: Application pods reach the Collector on these ports:

| Protocol | Transport | Port |
|:---------|:----------|-----:|
| gRPC     | TCP       | 4317 |
| HTTP     | TCP       | 4318 |

## Install the DDOT Collector

The commands in this guide use your current namespace. Create the Collector and its API key secret in the same namespace. cert-manager, if you install it, goes in its own `cert-manager` namespace.

### Choose an installation method

Choose one of these installation methods:

- [OpenTelemetry Operator][55]: Manages the Collector as a Kubernetes resource and keeps it running as you declared it. The Operator also injects DDOT SDKs into your pods.
- [Helm chart][4]: Installs the Collector from a values file, without the Operator.

{{< tabs >}}
{{% tab "Operator" %}}
### Install the OpenTelemetry Operator

The default OpenTelemetry Operator installation uses [cert-manager][64] to manage the TLS certificate for the Operator's admission webhook. If cert-manager isn't installed in your cluster, install it:

```shell
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install cert-manager jetstack/cert-manager --version v1.21.3 \
     --namespace cert-manager --create-namespace \
     --set crds.enabled=true --wait
```

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

Add the OpenTelemetry Helm repository:

```shell
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update
```

{{% /tab %}}
{{< /tabs >}}

### Store your Datadog API key

1. Get the Datadog [API key][2].
1. Confirm the **DATADOG SITE** selected on the right (Current value: **{{< region-param key="dd_site_name" >}}**) corresponds to your [Datadog site][52].
1. Store the API key as a Kubernetes secret:
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>        \
     --from-literal site={{< region-param key="dd_site" >}}
   ```
   Replace `<DD_API_KEY>` with your Datadog API key.

### Configure the Collector

Set `DD_HOSTNAME` so that each node reports a consistent hostname. The example configurations on this page set it from a `NODE_NAME` variable:

```yaml
- name: NODE_NAME
  valueFrom:
    fieldRef:
      fieldPath: spec.nodeName
- name: DD_HOSTNAME
  value: $(NODE_NAME)-<CLUSTER_NAME>
```

Keep `NODE_NAME` above `DD_HOSTNAME`, because Kubernetes expands `$(NODE_NAME)` only from variables defined earlier in the list. Replace `<CLUSTER_NAME>` with the cluster name you use for `K8S_CLUSTER_NAME` in the same file. Datadog uses the same `<NODE_NAME>-<CLUSTER_NAME>` name for the node's Kubernetes metrics, so each node appears as one host.

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

2. Add an OTLP receiver, the Datadog Connector, and the cluster-name processor, and define a pipeline for each signal. Publish the OTLP ports on the node with `hostPort` so that application pods can reach the Collector instance running on the same node.

The Datadog Connector computes APM trace metrics from your traces. Datadog needs these metrics to show your service's requests, errors, and latency. The `resource/add-cluster-name` processor adds `k8s.cluster.name` to all telemetry, which Datadog maps to the `kube_cluster_name` tag.

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
    # [...]
    service:
      # [...]
      pipelines:
        logs:
          receivers: ['otlp']
          processors: ['resource/add-cluster-name', 'infraattributes']
          exporters: ['datadog']
        metrics:
          receivers: ['otlp', 'datadog/connector']
          processors: ['resource/add-cluster-name', 'infraattributes']
          exporters: ['datadog']
        traces:
          receivers: ['otlp']
          processors: ['resource/add-cluster-name', 'infraattributes']
          exporters: ['datadog', 'datadog/connector']
{{< /code-block >}}

3. (Optional) Collect host and kubelet metrics, and add a health check:

<div class="alert alert-warning">Host and kubelet metrics send more data to Datadog and can add to your bill. See the <a href="https://www.datadoghq.com/pricing/">pricing page</a>.</div>

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
    extensions:
      health_check:
        endpoint: "${env:K8S_POD_IP}:13133"
    # [...]
    service:
      # [...]
      extensions: ['health_check']
      pipelines:
        metrics:
          receivers: ['host_metrics', 'otlp', 'kubelet_stats', 'datadog/connector']
          # [...]
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

<div class="alert alert-warning">Container logs send more data to Datadog and can add to your bill. See the <a href="https://www.datadoghq.com/pricing/">pricing page</a>.</div>

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

{{% collapse-content title="Complete node-collector.yaml, with the optional host metrics, kubelet metrics, and container logs" level="p" %}}
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

<div class="alert alert-info">The Collector Helm chart publishes the OTLP ports on each node by default (<code>hostPort: 4317</code> for gRPC and <code>hostPort: 4318</code> for HTTP), so application pods can reach the Collector instance running on the same node. See <a href="#instrument-your-application">Instrument your application</a>.</div>

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

4. (Optional) Collect host metrics, kubelet metrics, and container logs with the chart's presets:

<div class="alert alert-warning">Host metrics, kubelet metrics, and container logs send more data to Datadog and can add to your bill. See the <a href="https://www.datadoghq.com/pricing/">pricing page</a>.</div>

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

6. Add the Datadog Connector and the cluster-name processor to the pipelines.

The Datadog Connector computes APM trace metrics from your traces. Datadog needs these metrics to show your service's requests, errors, and latency. The `resource/add-cluster-name` processor adds `k8s.cluster.name` to all telemetry, which Datadog maps to the `kube_cluster_name` tag.

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

{{% collapse-content title="Complete node-collector-values.yaml, with the optional host metrics, kubelet metrics, and container logs" level="p" %}}
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

## Instrument your application

Instrument your application with the DDOT SDK or an OpenTelemetry SDK. Either one sends OTLP to the Collector on the application's node, which publishes the OTLP ports on the node.

### DDOT SDK

Turn on the DDOT SDK as described in [DDOT SDKs][66]. To inject it with the OpenTelemetry Operator, follow the DDOT tab of the [Kubernetes quickstart][69]. If you installed the Collector with Helm, install the Operator too. Then continue to [Verify the setup](#verify-the-setup).

### OpenTelemetry SDK

Instrument your application with an [OpenTelemetry SDK][12]. Add these variables to your application container's `env` list. If your application already sets `OTEL_EXPORTER_OTLP_ENDPOINT`, update it to point to this Collector. The variables send OTLP over HTTP to the Collector on the node, and set the `service`, `env`, and `version` tags on your data:

{{< code-block lang="yaml" filename="deployment.yaml" collapsible="true" >}}
env:
  - name: HOST_IP
    valueFrom:
      fieldRef:
        fieldPath: status.hostIP
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: 'http://$(HOST_IP):4318'
  - name: OTEL_EXPORTER_OTLP_PROTOCOL
    value: 'http/protobuf'
  - name: OTEL_SERVICE_NAME
    value: '<SERVICE>'
  - name: OTEL_RESOURCE_ATTRIBUTES
    value: 'service.version=<VERSION>,deployment.environment.name=<ENV>'
{{< /code-block >}}

Replace `<SERVICE>`, `<VERSION>`, and `<ENV>` with your service name, version, and environment. To send OTLP over gRPC instead, use port `4317` and set `OTEL_EXPORTER_OTLP_PROTOCOL` to `grpc`. Redeploy your application to apply the changes.

For how Datadog uses these tags, see [Unified service tagging][14].

## Verify the setup

If the Collector pods aren't running, see [Troubleshooting](#troubleshooting).

After your application sends telemetry, check for it in Datadog. Data can take up to five minutes to appear. Replace `<SERVICE>`, `<ENV>`, and `<CLUSTER_NAME>` with the values from your configuration.

| Check | Where to look | What you see |
|---|---|---|
| Services | [Catalog][58]: set the environment to `<ENV>` and search for `<SERVICE>`. | The service page, with requests, errors, and latency. |
| Traces | [Trace Explorer][59]: search for `service:<SERVICE> env:<ENV>`. | Your service's traces. |
| Hosts | [Host List][60] | Each node, as `<NODE_NAME>-<CLUSTER_NAME>`. With `DD_HOSTNAME` set as in the example configuration and no Datadog Agent on the node, each node appears one time. |
| Metrics | [Metrics Explorer][61]: graph `avg:k8s.pod.cpu.usage{kube_cluster_name:<CLUSTER_NAME>}`. | If you turned on kubelet metrics (the `kubelet_stats` receiver or the `kubeletMetrics` preset): pod CPU usage for your cluster. |
| Logs from your application | [Log Explorer][62]: search for `service:<SERVICE> env:<ENV>`. | If your application sends logs over OTLP: your service's logs. |
| Container logs | [Log Explorer][62]: search for `kube_namespace:<NAMESPACE>`, where `<NAMESPACE>` is your application's namespace. | If you turned on container log collection (the `filelog` receiver or the `logsCollection` preset): the logs of the containers in that namespace. With the example configurations, these logs don't have the `service` and `env` tags. |

## Add the Datadog Agent (optional) {#install-the-core-datadog-agent-alongside-ddot}

Some Datadog features need the Datadog Agent alongside the DDOT Collector. For which ones, see [Feature Compatibility][68]. To add the Agent, install it separately with the [Datadog Operator][57].

The DDOT Collector already collects some of the data the Agent can collect, and it uses host ports on every node. Before you deploy the Agent, check these settings in the `DatadogAgent` resource:

- **Container logs**: If the Collector collects container logs, as the example configurations do, leave container log collection off in the Agent. If both collect them, Datadog receives each container log twice, and you pay for both copies. To collect container logs with the Agent instead, remove the `filelog` receiver (Operator) or turn off the `logsCollection` preset (Helm).
- **OTLP ports**: Don't turn on the Agent's OTLP endpoint, or the Agent's Collector, on host ports `4317` or `4318`. The DDOT Collector uses those host ports on every node. Kubernetes can't schedule two pods that use the same host port on one node, so the Agent pod stays `Pending`.
- **Cluster name**: Set `spec.global.clusterName` to the same `<CLUSTER_NAME>` you use for the Collector. When a cluster name is set, the Agent reports `<NODE_NAME>-<CLUSTER_NAME>` as a host alias for the node. That's the same host name the Collector uses.

By default, the Datadog Operator Helm chart watches `DatadogAgent` resources only in the namespace where the Operator is installed (`watchNamespaces: []`). You can create the `DatadogAgent` resource in a different namespace, such as to keep it separate from the `OpenTelemetryCollector` resource. If you do, set `watchNamespaces` to list both namespaces. The list replaces the default, so include the Operator's own namespace:

```shell
helm upgrade datadog-operator datadog/datadog-operator \
  -n <OPERATOR_NAMESPACE> \
  --reuse-values \
  --set 'watchNamespaces={<OPERATOR_NAMESPACE>,<DATADOG_AGENT_NAMESPACE>}'
```

If the Operator doesn't watch the namespace where you create the `DatadogAgent` resource, the Operator ignores the resource.

## Troubleshooting

### The Operator install fails with `no matches for kind "Certificate"`

Check that cert-manager and its custom resource definitions are installed. Then install the Operator again.

### `kubectl apply -f node-collector.yaml` fails with `failed calling webhook`

Check that the Operator is ready with `kubectl rollout status deployment/opentelemetry-operator --timeout=5m`, then apply the file again. If it still fails, check the Operator's webhook certificate and the network path to the webhook.

### The Collector pod shows `CreateContainerConfigError`

This error usually means the Collector can't read its API key secret. Check that `datadog-secret` exists in the same namespace as the Collector, with the keys `api-key` and `site`:

```shell
kubectl describe secret datadog-secret
```

### The Collector pod exits with `unable to reliably determine the host name`

Check that `DD_HOSTNAME` is set, as described in [Configure the Collector](#configure-the-collector). Collector versions before 7.85.0 can exit with this error when they can't detect a hostname.

### No data in Datadog

Search the Collector's logs for export errors. A `403` usually means the API key or the site is wrong. Replace `<DAEMONSET_NAME>` with `node-collector-collector` for the Operator, or `node-collector-opentelemetry-collector-agent` for Helm:

```shell
kubectl logs daemonset/<DAEMONSET_NAME> | grep -iE "403|forbidden|exporting failed"
```

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

## Next steps

- **Instrument more applications**: [DDOT SDKs][66].
- **Check host names and tags**: [Hostnames and Tagging][67].
- **Compare setups**: [Feature Compatibility][68].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://opentelemetry.io/docs/platforms/kubernetes/helm/collector/
[5]: https://kubernetes.io/docs/tasks/tools/#kubectl
[12]: /opentelemetry/instrument/otel_sdks/
[14]: /getting_started/tagging/unified_service_tagging
[52]: /getting_started/site/
[54]: https://helm.sh
[55]: https://opentelemetry.io/docs/platforms/kubernetes/operator/
[57]: /getting_started/containers/datadog_operator/
[58]: https://app.datadoghq.com/software
[59]: https://app.datadoghq.com/apm/traces
[60]: https://app.datadoghq.com/infrastructure
[61]: https://app.datadoghq.com/metric/explorer
[62]: https://app.datadoghq.com/logs
[66]: /opentelemetry/instrument/dd_sdks/
[67]: /opentelemetry/config/hostname_tagging/
[68]: /opentelemetry/compatibility/
[69]: /opentelemetry/getting_started/kubernetes/?tab=ddot
[70]: https://kubernetes.io/docs/concepts/security/pod-security-standards/#baseline
