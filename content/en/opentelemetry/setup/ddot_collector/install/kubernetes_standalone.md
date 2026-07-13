---
title: Install the standalone DDOT Collector as a Kubernetes DaemonSet
code_lang: kubernetes_standalone
type: multi-code-lang
code_lang_weight: 3
further_reading:
- link: "/opentelemetry/setup/ddot_collector/custom_components"
  tag: "Documentation"
  text: "Use Custom OpenTelemetry Components in DDOT"
---

## Overview

Follow this guide to deploy the Datadog Distribution of OpenTelemetry (DDOT) Collector using OpenTelemetry's Helm chart or Operator.

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

## Install the Datadog Distribution of an OpenTelemetry Collector

### Select installation method

Choose one of the following installation methods:

- [OpenTelemetry Operator][55]: A [Kubernetes-native][56] approach that automatically reconciles and maintains your OTel collector setup.
- [Helm chart][4]: A straightforward way to deploy OTel collectors.

{{< tabs >}}
{{% tab "Operator" %}}
### Install the OpenTelemetry Operator

You can install the OpenTelemetry Operator in your cluster using the [OpenTelemetry Operator Helm chart][1]:

```shell
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update
helm install opentelemetry-operator open-telemetry/opentelemetry-operator   \
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
### Add the Open-Telemetry Helm Repository

To add the OpenTelemetry repository to your Helm repositories:

```shell
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update
```

{{% /tab %}}
{{< /tabs >}}

### Set up Datadog API key

1. Get the Datadog [API key][2].
1. Ensure the **DATADOG SITE** selected on the right (Current value: **{{< region-param key="dd_site_name" >}}**) corresponds to your [Datadog site][52].
1. Store the API key as a Kubernetes secret:
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal site={{< region-param key="dd_site" >}} \
     --from-literal api-key=<DD_API_KEY>
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
          k8s.cluster.name: ${env:DD_CLUSTER_NAME}
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
      value: datadog,pprof,zpages,prometheus
    - name: DD_OTEL_STANDALONE
      value: 'true'
    - name: DD_CLUSTER_NAME
      value: <CLUSTER_NAME>
    # vvv Will no longer be necessary from 7.82.0 onwards vvv
    - name: DD_OTELCOLLECTOR_ENABLED
      value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
{{< /code-block >}}

Replace `<CLUSTER_NAME>` with a name for your cluster.

2. Add an OTLP receiver and the datadog exporter for all desired signals:

{{< code-block lang="yaml" filename="node-collector.yaml" collapsible="true" >}}
# [...]
spec:
  # [...]
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
        endpoint: ${env:OTEL_K8S_NODE_NAME}:10250
        node: ${env:OTEL_K8S_NODE_NAME}
        metric_groups:
          - node
          - pod
          - container
          - volume
    processors:
      infraattributes:
        cardinality: 2
    connectors:
      datadog/connector:
        traces:
          compute_top_level_by_span_kind: true
          peer_tags_aggregation: true
          compute_stats_by_span_kind: true
    extensions:
      health_check:
        endpoint: "${env:OTEL_K8S_POD_IP}:13133"
    # [...]
    service:
      # [...]
      extensions: ['health_check']
      pipelines:
        logs:
          # [...]
          processors: ['infraattributes']
        metrics:
          receivers: ['host_metrics', 'otlp', 'kubelet_stats', 'datadog/connector']
          processors: ['infraattributes']
          # [...]
        traces:
          # [...]
          processors: ['infraattributes']
          exporters: ['datadog', 'datadog/connector']
  env:
    # [...]
    - name: K8S_NODE_NAME
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
    - name: K8S_NODE_IP
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
    - name: K8S_POD_IP
      valueFrom:
        fieldRef:
          apiVersion: v1
          fieldPath: status.podIP
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
        endpoint: ${env:OTEL_K8S_NODE_NAME}:10250
        node: ${env:OTEL_K8S_NODE_NAME}
        metric_groups:
          - node
          - pod
          - container
          - volume
    processors:
      infraattributes:
        cardinality: 1
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
        endpoint: "${env:OTEL_K8S_POD_IP}:13133"
    service:
      telemetry:
        resource:
          k8s.cluster.name: <CLUSTER_NAME>
      extensions: ['health_check']
      pipelines:
        logs:
          receivers: ['otlp']
          processors: ['infraattributes']
          exporters: ['datadog']
        metrics:
          receivers: ['host_metrics', 'otlp', 'kubelet_stats', 'datadog/connector']
          processors: ['infraattributes']
          exporters: ['datadog']
        traces:
          receivers: ['otlp']
          processors: ['infraattributes']
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
      value: datadog,pprof,zpages,prometheus
    - name: DD_OTEL_STANDALONE
      value: 'true'
    # vvv Will no longer be necessary from 7.82.0 onwards vvv
    - name: DD_OTELCOLLECTOR_ENABLED
      value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
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

2. Choose the deamonset mode and use DDOT as the collector:

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
  - name: DD_OTEL_STANDALONE
    value: 'true'
  - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
    value: datadog,pprof,zpages,prometheus
    # vvv Will no longer be necessary from 7.82.0 onwards vvv
  - name: DD_OTELCOLLECTOR_ENABLED
    value: 'true'
{{< /code-block >}}

3. Enable presets:

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
presets:
  hostMetrics:
    enabled: true
  logsCollection:
    enabled: true
    includeCollectorLogs: false
{{< /code-block >}}

4. Define pipelines for desired signals, with an OTLP receiver:

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
        k8s.cluster.name: <CLUSTER_NAME>
{{< /code-block >}}

Replace `<CLUSTER_NAME>` with a name for your cluster.

4. (Optional) Enable additional Datadog features:

<div class="alert alert-warning">Enabling these features may incur additional charges. Review the <a href="https://www.datadoghq.com/pricing/">pricing page</a> and talk to your Customer Success Manager before proceeding.</div>

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
config:
  # [...]
  connectors:
    datadog/connector:
      traces: {}

{{< /code-block >}}

5. (Optional) Collect pod labels and use them as attributes to attach to metrics, traces, and logs:

<div class="alert alert-warning">Custom metrics may impact billing. See the <a href="https://docs.datadoghq.com/account_management/billing/custom_metrics">custom metrics billing page</a> for more information.</div>

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
{{< /code-block >}}

{{% collapse-content title="Completed datadog-values.yaml file" level="p" %}}
Your `node-collector-values.yaml` file should look something like this:
{{< code-block lang="yaml" filename="collector-values.yaml" collapsible="false" >}}
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
  logsCollection: # Add a filelog receiver to the logs pipeline
    enabled: true
    includeCollectorLogs: false
config:
  connectors:
    datadog/connector:
      traces: {}
  exporters:
    datadog:
      api:
        key: ${env:DD_API_KEY}
        site: ${env:DD_SITE}
      sending_queue:
        batch:
          flush_timeout: 10s
  extensions:
    datadog:
      api:
        key: ${env:DD_API_KEY}
        site: ${env:DD_SITE}
      deployment_type: daemonset
      installation_method: kubernetes
    dogtel:
      enable_metadata_collection: true
      standalone_mode: true
    health_check:
      endpoint: ${env:OTEL_K8S_POD_IP}:13133
  processors:
    infraattributes:
      cardinality: 1
  receivers:
    otlp:
      protocols:
        grpc:
          endpoint: 0.0.0.0:4317
        http:
          endpoint: 0.0.0.0:4318
    prometheus:
      config:
        scrape_configs:
          - job_name: otelcol
            scrape_interval: 60s
            static_configs:
              - targets:
                  - localhost:8888
  service:
    extensions:
      - health_check
      - datadog
      - dogtel
    pipelines:
      logs:
        receivers:
          - otlp
        processors:
          - infraattributes
        exporters:
          - datadog
      metrics:
        receivers:
          - otlp
          - datadog/connector
          - prometheus
        processors:
          - infraattributes
        exporters:
          - datadog
      traces:
        receivers:
          - otlp
        processors:
          - infraattributes
        exporters:
          - datadog
          - datadog/connector
    telemetry:
      resource:
        k8s.cluster.name: ${env:DD_CLUSTER_NAME}
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
  - name: DD_OTELCOLLECTOR_ENABLED
    value: 'true'
  - name: DD_OTEL_STANDALONE
    value: 'true'
  - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
    value: datadog,zpages,pprof
  - name: DD_HOSTNAME
    valueFrom:
      fieldRef:
        fieldPath: spec.nodeName
  - name: DD_CLUSTER_NAME
    value: <CLUSTER_NAME>
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

### Configure the OpenTelemetry Collector

{{< tabs >}}
{{% tab "Datadog Operator" %}}
The Datadog Operator provides a sample OpenTelemetry Collector configuration that you can use as a starting point. If you need to modify this configuration, the Datadog Operator supports two ways of providing a custom Collector configuration:

- **Inline configuration**: Add your custom Collector configuration directly in the `features.otelCollector.conf.configData` field.
- **ConfigMap-based configuration**: Store your Collector configuration in a ConfigMap and reference it in the `features.otelCollector.conf.configMap` field. This approach allows you to keep Collector configuration decoupled from the `DatadogAgent` resource.

####  Inline Collector configuration

In the snippet below, the Collector configuration is placed directly under the `features.otelCollector.conf.configData` parameter:

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="false" >}}
  ...
  # Enable Features
  features:
    otelCollector:
      enabled: true
      ports:
        - containerPort: 4317
          hostPort: 4317
          name: otel-grpc
        - containerPort: 4318
          hostPort: 4318
          name: otel-http
      conf:
        configData: |-
          receivers:
            prometheus:
              config:
                scrape_configs:
                  - job_name: "otelcol"
                    scrape_interval: 10s
                    static_configs:
                      - targets:
                          - 0.0.0.0:8888
            otlp:
              protocols:
                grpc:
                  endpoint: 0.0.0.0:4317
                http:
                  endpoint: 0.0.0.0:4318
          exporters:
            debug:
              verbosity: detailed
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
          connectors:
            datadog/connector:
              traces:
          service:
            pipelines:
              traces:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog, datadog/connector]
              metrics:
                receivers: [otlp, datadog/connector, prometheus]
                processors: [infraattributes]
                exporters: [debug, datadog]
              logs:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog]
{{< /code-block >}}

{{% otel-infraattributes-prereq %}}

When you apply the `datadog-agent.yaml` file containing this `DatadogAgent` resource, the Operator automatically mounts the Collector configuration into the Agent DaemonSet.

{{% collapse-content title="Completed datadog-agent.yaml file with inlined Collector config" level="p" %}}
Completed `datadog-agent.yaml` with inline Collector configuration should look something like this:
{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="false" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  # Enable Features
  features:
    apm:
      enabled: true
    orchestratorExplorer:
      enabled: true
    processDiscovery:
      enabled: true
    liveProcessCollection:
      enabled: true
    usm:
      enabled: true
    clusterChecks:
      enabled: true
    otelCollector:
      enabled: true
      ports:
        - containerPort: 4317
          hostPort: 4317
          name: otel-grpc
        - containerPort: 4318
          hostPort: 4318
          name: otel-http
      conf:
        configData: |-
          receivers:
            prometheus:
              config:
                scrape_configs:
                  - job_name: "datadog-agent"
                    scrape_interval: 10s
                    static_configs:
                      - targets:
                          - 0.0.0.0:8888
            otlp:
              protocols:
                grpc:
                  endpoint: 0.0.0.0:4317
                http:
                  endpoint: 0.0.0.0:4318
          exporters:
            debug:
              verbosity: detailed
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
          connectors:
            datadog/connector:
              traces:
          service:
            pipelines:
              traces:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog, datadog/connector]
              metrics:
                receivers: [otlp, datadog/connector, prometheus]
                processors: [infraattributes]
                exporters: [debug, datadog]
              logs:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog]
{{< /code-block >}}
{{% /collapse-content %}}

#### ConfigMap-based Collector Configuration

For more complex or frequently updated configurations, storing Collector configuration in a ConfigMap can simplify version control.

1. Create a ConfigMap that contains your Collector configuration:

{{< code-block lang="yaml" filename="configmap.yaml" collapsible="false" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-agent-config-map
data:
  # must be named otel-config.yaml
  otel-config.yaml: |-
    receivers:
      prometheus:
        config:
          scrape_configs:
            - job_name: "datadog-agent"
              scrape_interval: 10s
              static_configs:
                - targets:
                    - 0.0.0.0:8888
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
    exporters:
      debug:
        verbosity: detailed
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
    connectors:
      datadog/connector:
        traces:
    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog, datadog/connector]
        metrics:
          receivers: [otlp, datadog/connector, prometheus]
          processors: [infraattributes]
          exporters: [debug, datadog]
        logs:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog]
{{< /code-block >}}

<div class="alert alert-danger">The field for Collector config in the ConfigMap must be called <code>otel-config.yaml</code>.</div>

2. Reference the `otel-agent-config-map` ConfigMap in your `DatadogAgent` resource using `features.otelCollector.conf.configMap` parameter:
{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="false" >}}
  ...
  # Enable Features
  features:
    otelCollector:
      enabled: true
      ports:
        - containerPort: 4317
          hostPort: 4317
          name: otel-grpc
        - containerPort: 4318
          hostPort: 4318
          name: otel-http
      conf:
        configMap:
          name: otel-agent-config-map
{{< /code-block >}}

The Operator automatically mounts `otel-config.yaml` from the ConfigMap into the Agent's OpenTelemetry Collector DaemonSet.

{{% collapse-content title="Completed datadog-agent.yaml file with Collector config in the ConfigMap" level="p" %}}
Completed `datadog-agent.yaml` with Collector configuration defined as ConfigMap should look something like this:
{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="false" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  # Enable Features
  features:
    apm:
      enabled: true
    orchestratorExplorer:
      enabled: true
    processDiscovery:
      enabled: true
    liveProcessCollection:
      enabled: true
    usm:
      enabled: true
    clusterChecks:
      enabled: true
    otelCollector:
      enabled: true
      ports:
        - containerPort: 4317
          hostPort: 4317
          name: otel-grpc
        - containerPort: 4318
          hostPort: 4318
          name: otel-http
      conf:
        configMap:
          name: otel-agent-config-map
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-agent-config-map
data:
  # must be named otel-config.yaml
  otel-config.yaml: |-
    receivers:
      prometheus:
        config:
          scrape_configs:
            - job_name: "datadog-agent"
              scrape_interval: 10s
              static_configs:
                - targets:
                    - 0.0.0.0:8888
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
    exporters:
      debug:
        verbosity: detailed
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
    connectors:
      datadog/connector:
        traces:
    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog, datadog/connector]
        metrics:
          receivers: [otlp, datadog/connector, prometheus]
          processors: [infraattributes]
          exporters: [debug, datadog]
        logs:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog]
{{< /code-block >}}
{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Helm" %}}
The Datadog Helm chart provides a sample OpenTelemetry Collector configuration that you can use as a starting point. This section walks you through the predefined pipelines and included OpenTelemetry components.

This is the full OpenTelemetry Collector configuration in `otel-config.yaml`:

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 10s
          static_configs:
            - targets: ["0.0.0.0:8888"]
  otlp:
    protocols:
      grpc:
         endpoint: 0.0.0.0:4317
      http:
         endpoint: 0.0.0.0:4318
exporters:
  debug:
    verbosity: detailed
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
connectors:
  datadog/connector:
    traces:
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [datadog, datadog/connector]
    metrics:
      receivers: [otlp, datadog/connector, prometheus]
      processors: [infraattributes]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [datadog]

{{< /code-block >}}

{{% otel-infraattributes-prereq %}}

{{% /tab %}}
{{< /tabs >}}

#### Key components

To send telemetry data to Datadog, the following components are defined in the configuration:

{{< img src="/opentelemetry/embedded_collector/components-3.jpg" alt="Diagram depicting the Agent deployment pattern" style="width:100%;" >}}

##### Datadog connector

The [Datadog connector][6] computes Datadog APM trace metrics.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
connectors:
  datadog/connector:
    traces:
{{< /code-block >}}

##### Datadog exporter

The [Datadog exporter][7] exports traces, metrics, and logs to Datadog.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
exporters:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: ${env:DD_SITE}
    sending_queue:
      batch:
        flush_timeout: 10s
{{< /code-block >}}

**Note**: If `key` is not specified or set to a secret, or if `site` is not specified, the system uses values from the core Agent configuration. By default, the core Agent sets site to `datadoghq.com` (US1).

##### Prometheus receiver

The [Prometheus receiver][8] collects health metrics from the OpenTelemetry Collector for the metrics pipeline.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 10s
          static_configs:
            - targets: ["0.0.0.0:8888"]
{{< /code-block >}}

For more information, see the [Collector Health Metrics][8] documentation.

### Deploy the Agent with the OpenTelemetry Collector

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Deploy the Datadog Agent with the configuration file:

```shell
kubectl apply -f datadog-agent.yaml
```

This deploys the Datadog Agent as a DaemonSet with the DDOT OpenTelemetry Collector. The Collector runs on the same host as your application, following the [Agent deployment pattern][1]. The [Gateway deployment pattern][2] is in Preview; for installation instructions, follow the [DDOT Kubernetes Gateway installation guide][3].

[1]: https://opentelemetry.io/docs/collector/deployment/agent/
[2]: https://opentelemetry.io/docs/collector/deployment/gateway/
[3]: /opentelemetry/setup/ddot_collector/install/kubernetes_gateway/
{{% /tab %}}
{{% tab "Helm" %}}
To install or upgrade the Datadog Agent with OpenTelemetry Collector in your Kubernetes environment, use one of the following Helm commands:

- For default OpenTelemetry Collector configuration:
   ```shell
   helm upgrade -i <RELEASE_NAME> datadog/datadog -f datadog-values.yaml
   ```

- For custom OpenTelemetry Collector configuration:
   ```shell
   helm upgrade -i <RELEASE_NAME> datadog/datadog \
     -f datadog-values.yaml \
     --set-file datadog.otelCollector.config=otel-config.yaml
   ```
   This command allows you to specify your own `otel-config.yaml` file.

Replace `<RELEASE_NAME>` with the Helm release name you are using.

<div class="alert alert-info">You may see warnings during the deployment process. These warnings can be ignored.</div>

This Helm chart deploys the Datadog Agent with OpenTelemetry Collector as a DaemonSet. The Collector is deployed on the same host as your application, following the [Agent deployment pattern][1]. The [Gateway deployment pattern][2] is in Preview; for installation instructions, follow the [DDOT Kubernetes Gateway installation guide][3].

[1]: https://opentelemetry.io/docs/collector/deployment/agent/
[2]: https://opentelemetry.io/docs/collector/deployment/gateway/
[3]: /opentelemetry/setup/ddot_collector/install/kubernetes_gateway/
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="Deployment diagram" level="p" %}}
{{< img src="/opentelemetry/embedded_collector/deployment-2.png" alt="Diagram depicting the Agent deployment pattern" style="width:100%;" >}}
{{% /collapse-content %}}

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

Your application container must send data to the DDOT Collector on the same host. Since the Collector runs as a DaemonSet, you need to specify the local host as the OTLP endpoint.

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

<div class="alert alert-info">Alternatively, you can use <a href="/getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration">Datadog-specific Kubernetes labels</a> to configure unified service tagging. Do not use both approaches, as this creates duplicate tags.</div>

### Run the application

Redeploy your application to apply the changes made in the deployment manifest. Once the updated configuration is active, Unified Service Tagging will be fully enabled for your metrics, traces, and logs.

## Explore observability data in Datadog

Use Datadog to explore the observability data for your application.

### Fleet automation

Explore your Datadog Agent and Collector configuration.

{{< img src="/opentelemetry/embedded_collector/fleet_automation.png" alt="Review your Agent and Collector configuration from the Fleet Automation page." style="width:100%;" >}}

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
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver
[9]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[10]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/java/com/otel/service/CalendarService.java#L27-L48
[11]: https://github.com/DataDog/datadog-agent/blob/386130a34dde43035c814f9a9b08bc72eb20e476/comp/otelcol/collector-contrib/impl/manifest.yaml
[12]: /tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[13]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/deploys/calendar/templates/deployment.yaml#L71-L72
[14]: /getting_started/tagging/unified_service_tagging
[15]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/deploys/calendar/templates/deployment.yaml#L75-L83
[16]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/filelogreceiver/README.md
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/fluentforwardreceiver/README.md
[18]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/hostmetricsreceiver/README.md
[19]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/jaegerreceiver/README.md
[20]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/README.md
[21]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/prometheusreceiver/README.md
[22]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/receivercreator/README.md
[23]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/zipkinreceiver/README.md
[24]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/receiver/nopreceiver#readme
[25]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md
[26]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[27]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/cumulativetodeltaprocessor/README.md
[28]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/filterprocessor/README.md
[29]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/groupbyattrsprocessor/README.md
[30]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/k8sattributesprocessor/README.md
[31]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/memorylimiterprocessor/README.md
[32]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/probabilisticsamplerprocessor/README.md
[33]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/README.md
[34]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourceprocessor/README.md
[36]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/README.md
[37]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/transformprocessor/README.md
[38]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/README.md
[39]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/debugexporter/README.md
[40]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md
[41]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlphttpexporter/README.md
[42]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/sapmexporter/README.md
[43]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/nopexporter/README.md
[44]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/datadogconnector/README.md
[45]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/spanmetricsconnector/README.md
[46]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/healthcheckextension/README.md
[47]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/observer/README.md
[48]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/pprofextension/README.md
[49]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/extension/zpagesextension/README.md
[50]: https://docs.docker.com/engine/install/
[51]: https://github.com/DataDog/datadog-agent/blob/main/comp/otelcol/collector-contrib/impl/manifest.yaml#L7
[52]: /getting_started/site/
[53]: /containers/guide/changing_container_registry/
[54]: https://helm.sh
[55]: https://opentelemetry.io/docs/platforms/kubernetes/operator/
[56]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[57]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/README.md
