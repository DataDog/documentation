---
title: Install the Datadog Agent with Embedded OpenTelemetry Collector
private: true
further_reading:
- link: "/opentelemetry/agent/agent_with_custom_components"
  tag: "Documentation"
  text: "Use Custom OpenTelemetry Components with Datadog Agent"
---

{{< callout url="https://www.datadoghq.com/private-beta/agent-with-embedded-opentelemetry-collector/" btn_hidden="false" header="Join the Preview!">}}
  The Datadog Agent with embedded OpenTelemetry Collector is in Preview. To request access, fill out this form.
{{< /callout >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">FedRAMP customers should not enable or use the embedded OpenTelemetry Collector.</div>
{{< /site-region >}}

## Overview

Follow this guide to install the Datadog Agent with the OpenTelemetry Collector using Helm.

<div class="alert alert-info">If you need OpenTelemetry components beyond what's provided in the default package, follow <a href="/opentelemetry/agent/agent_with_custom_components">Use Custom OpenTelemetry Components</a> to bring-your-Otel-Components to extend the Datadog Agent's capabilities. For a list of components included by default, see <a href="#included-components">Included components</a>.</div>

## Requirements

To complete this guide, you need the following:

**Datadog account**:
1. [Create a Datadog account][1] if you don't have one.
1. Find or create your [Datadog API key][2].
1. Find or create your [Datadog application key][3].

**Software**:
Install and set up the following on your machine:

- A Kubernetes cluster (v1.29+)
  - **Note**: EKS Fargate environments are not supported
- [Helm (v3+)][54]
- [Docker][50]
- [kubectl][5]

## Install the Datadog Agent with OpenTelemetry Collector

### Select installation method

Choose one of the following installation methods:

- [Datadog Operator][55]: A [Kubernetes-native][56] approach that automatically reconciles and maintains your Datadog setup. It reports deployment status, health, and errors in its Custom Resource status, and it limits the risk of misconfiguration thanks to higher-level configuration options.
- [Helm chart][4]: A straightforward way to deploy Datadog Agent. It provides versioning, rollback, and templating capabilities, making deployments consistent and easier to replicate.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
### Install the Datadog Operator

You can install the Datadog Operator in your cluster using the [Datadog Operator Helm chart][1]:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-operator datadog/datadog-operator
```

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/README.md
{{% /tab %}}
{{% tab "Helm" %}}
### Add the Datadog Helm Repository

To add the Datadog repository to your Helm repositories:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

{{% /tab %}}
{{< /tabs >}}

### Set up Datadog API and application keys

1. Get the Datadog [API][2] and [application keys][3].
1. Store the keys as a Kubernetes secret:
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY> \
     --from-literal app-key=<DD_APP_KEY>
   ```
   Replace `<DD_API_KEY>` and `<DD_APP_KEY>` with your actual Datadog API and application keys.

### Configure the Datadog Agent

{{< tabs >}}
{{% tab "Datadog Operator" %}}
After deploying the Datadog Operator, create the `DatadogAgent` resource that triggers the deployment of the Datadog Agent, Cluster Agent and Cluster Checks Runners (if used) in your Kubernetes cluster. The Datadog Agent deploys as a DaemonSet, running a pod on every node of your cluster.

1. Use the `datadog-agent.yaml` file to specify your `DatadogAgent` deployment configuration.

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
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
         appSecret:
           secretName: datadog-secret
           keyName: app-key
{{< /code-block >}}

  - Replace `<CLUSTER_NAME>` with a name for your cluster.
  - Replace `<DATADOG_SITE>` with your [Datadog site][1]. Your site is {{< region-param key="dd_site" code="true" >}}. (Ensure the correct **DATADOG SITE** is selected on the right.)

2. Switch the Datadog Agent image to use builds with embedded OpenTelemetry Collector:

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
  ...
  override:
    # Node Agent configuration
    nodeAgent:
      image:
        name: "gcr.io/datadoghq/agent:{{< version key="agent_tag" >}}"
        pullPolicy: Always
{{< /code-block >}}

<div class="alert alert-info">This guide uses a Java application example. The <code>-jmx</code> suffix in the image tag enables JMX utilities. For non-Java applications, use {{< version key="agent_tag" code="true" >}} instead.<br> For more details, see <a href="/containers/guide/autodiscovery-with-jmx/?tab=helm">Autodiscovery and JMX integration guide</a>.</div>

By default, the Agent image is pulled from Google Artifact Registry (`gcr.io/datadoghq`). If Artifact Registry is not accessible in your deployment region, [use another registry][2].

3. Enable the OpenTelemetry Collector:

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
  ...
  # Enable Features
  features:
    otelCollector:
      enabled: true
{{< /code-block >}}

The Datadog Operator automatically binds the OpenTelemetry Collector to ports `4317` (named `otel-grpc`) and `4318` (named `otel-http`) by default.

To explicitly override the default ports, use `features.otelCollector.ports` parameter:

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
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
{{< /code-block >}}

<div class="alert alert-warning">When configuring ports <code>4317</code> and <code>4318</code>, you must use the default names <code>otel-grpc</code> and <code>otel-http</code> respectively to avoid port conflicts.</div>

4. (Optional) Enable additional Datadog features:

<div class="alert alert-danger">Enabling these features may incur additional charges. Review the <a href="https://www.datadoghq.com/pricing/">pricing page</a> and talk to your CSM before proceeding.</div>

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
  # Enable Features
  features:
  ...
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
{{< /code-block >}}

When enabling additional Datadog features, always use the Datadog or OpenTelemetry Collector configuration files instead of relying on Datadog environment variables.

{{% collapse-content title="Completed datadog-agent.yaml file" level="p" %}}
Your `datadog-agent.yaml` file should look something like this:
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
      appSecret:
        secretName: datadog-secret
        keyName: app-key

  override:
    # Node Agent configuration
    nodeAgent:
      image:
        name: "gcr.io/datadoghq/agent:{{< version key="agent_tag" >}}"
        pullPolicy: Always

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
{{< /code-block >}}
{{% /collapse-content %}}

[1]: /getting_started/site
[2]: /containers/guide/changing_container_registry/
{{% /tab %}}
{{% tab "Helm" %}}
Use a YAML file to specify the Helm chart parameters for the [Datadog Agent chart][1].

1. Create an empty `datadog-values.yaml` file:

```shell
touch datadog-values.yaml
```

<div class="alert alert-info">Unspecified parameters use defaults from <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml">values.yaml</a>.</div>

2. Configure the Datadog API and application key secrets:

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  site: <DATADOG_SITE>
  apiKeyExistingSecret: datadog-secret
  appKeyExistingSecret: datadog-secret
  logLevel: info
{{< /code-block >}}

Set `<DATADOG_SITE>` to your [Datadog site][2]. Otherwise, it defaults to `datadoghq.com`, the US1 site.

<div class="alert alert-warning">The log level <code>datadog.logLevel</code> parameter value should be set in lower case. Valid log levels are: <code>trace</code>, <code>debug</code>, <code>info</code>, <code>warn</code>, <code>error</code>, <code>critical</code>, <code>off</code>.</div>

3. Switch the Datadog Agent image tag to use builds with the embedded OpenTelemetry Collector:

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
agents:
  image:
    repository: gcr.io/datadoghq/agent
    tag: {{< version key="agent_tag_jmx" >}}
    doNotCheckTag: true
...
{{< /code-block >}}

<div class="alert alert-info">This guide uses a Java application example. The <code>-jmx</code> suffix in the image tag enables JMX utilities. For non-Java applications, use {{< version key="agent_tag" code="true" >}} instead.<br> For more details, see <a href="/containers/guide/autodiscovery-with-jmx/?tab=helm">Autodiscovery and JMX integration guide</a>.</div>

By default, the Agent image is pulled from Google Artifact Registry (`gcr.io/datadoghq`). If Artifact Registry is not accessible in your deployment region, [use another registry][3].

4. Enable the OpenTelemetry Collector and configure the essential ports:

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  otelCollector:
    enabled: true
    ports:
      - containerPort: "4317" # default port for OpenTelemetry gRPC receiver.
        hostPort: "4317"
        name: otel-grpc
      - containerPort: "4318" # default port for OpenTelemetry HTTP receiver
        hostPort: "4318"
        name: otel-http
{{< /code-block >}}

Set the `hostPort` to expose the container port to the external network. This enables configuring the OTLP exporter to point to the IP address of the node where the Datadog Agent is assigned.

If you don't want to expose the port, you can use the Agent service instead:
   - Remove the <code>hostPort</code> entries from your <code>datadog-values.yaml</code> file.
   - In your application's deployment file (`deployment.yaml`), configure the OTLP exporter to use the Agent service:
      ```yaml
      env:
        - name: OTEL_EXPORTER_OTLP_ENDPOINT
          value: 'http://<SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local'
        - name: OTEL_EXPORTER_OTLP_PROTOCOL
          value: 'grpc'
      ```

5. (Optional) Enable additional Datadog features:

<div class="alert alert-danger">Enabling these features may incur additional charges. Review the <a href="https://www.datadoghq.com/pricing/">pricing page</a> and talk to your CSM before proceeding.</div>

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  apm:
    portEnabled: true
    peer_tags_aggregation: true
    compute_stats_by_span_kind: true
    peer_service_aggregation: true
  orchestratorExplorer:
    enabled: true
  processAgent:
    enabled: true
    processCollection: true
{{< /code-block >}}

When enabling additional Datadog features, always use the Datadog or OpenTelemetry Collector configuration files instead of relying on Datadog environment variables.

6. (Optional) Collect pod labels and use them as tags to attach to metrics, traces, and logs:

<div class="alert alert-danger">Custom metrics may impact billing. See the <a href="https://docs.datadoghq.com/account_management/billing/custom_metrics">custom metrics billing page</a> for more information.</div>

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  podLabelsAsTags:
    app: kube_app
    release: helm_release
{{< /code-block >}}

{{% collapse-content title="Completed datadog-values.yaml file" level="p" %}}
Your `datadog-values.yaml` file should look something like this:
{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="false" >}}
agents:
  image:
    repository: gcr.io/datadoghq/agent
    tag: {{< version key="agent_tag_jmx" >}}
    doNotCheckTag: true

datadog:
  site: datadoghq.com
  apiKeyExistingSecret: datadog-secret
  appKeyExistingSecret: datadog-secret
  logLevel: info

  otelCollector:
    enabled: true
    ports:
      - containerPort: "4317"
        hostPort: "4317"
        name: otel-grpc
      - containerPort: "4318"
        hostPort: "4318"
        name: otel-http
  apm:
    portEnabled: true
    peer_tags_aggregation: true
    compute_stats_by_span_kind: true
    peer_service_aggregation: true
  orchestratorExplorer:
    enabled: true
  processAgent:
    enabled: true
    processCollection: true

  podLabelsAsTags:
    app: kube_app
    release: helm_release
   {{< /code-block >}}

{{% /collapse-content %}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
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
          processors:
            infraattributes:
              cardinality: 2
            batch:
              timeout: 10s
          connectors:
            datadog/connector:
              traces:
                compute_top_level_by_span_kind: true
                peer_tags_aggregation: true
                compute_stats_by_span_kind: true
          service:
            pipelines:
              traces:
                receivers: [otlp]
                processors: [infraattributes, batch]
                exporters: [debug, datadog, datadog/connector]
              metrics:
                receivers: [otlp, datadog/connector, prometheus]
                processors: [infraattributes, batch]
                exporters: [debug, datadog]
              logs:
                receivers: [otlp]
                processors: [infraattributes, batch]
                exporters: [debug, datadog]
{{< /code-block >}}

When you apply the `datadog-agent.yaml` file containing this `DatadogAgent` resource, the Operator automatically mounts the Collector configuration into the Agent DaemonSet.

{{% collapse-content title="Completed datadog-agent.yaml file" level="p" %}}
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
      appSecret:
        secretName: datadog-secret
        keyName: app-key

  override:
    # Node Agent configuration
    nodeAgent:
      image:
        name: "gcr.io/datadoghq/agent:{{< version key="agent_tag" >}}"
        pullPolicy: Always

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
          processors:
            infraattributes:
              cardinality: 2
            batch:
              timeout: 10s
          connectors:
            datadog/connector:
              traces:
                compute_top_level_by_span_kind: true
                peer_tags_aggregation: true
                compute_stats_by_span_kind: true
          service:
            pipelines:
              traces:
                receivers: [otlp]
                processors: [infraattributes, batch]
                exporters: [debug, datadog, datadog/connector]
              metrics:
                receivers: [otlp, datadog/connector, prometheus]
                processors: [infraattributes, batch]
                exporters: [debug, datadog]
              logs:
                receivers: [otlp]
                processors: [infraattributes, batch]
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
  namespace: system
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
    processors:
      infraattributes:
        cardinality: 2
      batch:
        timeout: 10s
    connectors:
      datadog/connector:
        traces:
          compute_top_level_by_span_kind: true
          peer_tags_aggregation: true
          compute_stats_by_span_kind: true
    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [infraattributes, batch]
          exporters: [debug, datadog, datadog/connector]
        metrics:
          receivers: [otlp, datadog/connector, prometheus]
          processors: [infraattributes, batch]
          exporters: [debug, datadog]
        logs:
          receivers: [otlp]
          processors: [infraattributes, batch]
          exporters: [debug, datadog]
{{< /code-block >}}

<div class="alert alert-warning">The field for Collector config in the ConfigMap must be called <code>otel-config.yaml</code>.</div>

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

{{% collapse-content title="Completed datadog-agent.yaml file" level="p" %}}
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
      appSecret:
        secretName: datadog-secret
        keyName: app-key

  override:
    # Node Agent configuration
    nodeAgent:
      image:
        name: "gcr.io/datadoghq/agent:{{< version key="agent_tag" >}}"
        pullPolicy: Always

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
  namespace: system
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
    processors:
      infraattributes:
        cardinality: 2
      batch:
        timeout: 10s
    connectors:
      datadog/connector:
        traces:
          compute_top_level_by_span_kind: true
          peer_tags_aggregation: true
          compute_stats_by_span_kind: true
    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [infraattributes, batch]
          exporters: [debug, datadog, datadog/connector]
        metrics:
          receivers: [otlp, datadog/connector, prometheus]
          processors: [infraattributes, batch]
          exporters: [debug, datadog]
        logs:
          receivers: [otlp]
          processors: [infraattributes, batch]
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
processors:
  infraattributes:
    cardinality: 2
  batch:
    timeout: 10s
connectors:
  datadog/connector:
    traces:
      compute_top_level_by_span_kind: true
      peer_tags_aggregation: true
      compute_stats_by_span_kind: true
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [datadog, datadog/connector]
    metrics:
      receivers: [otlp, datadog/connector, prometheus]
      processors: [infraattributes, batch]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [datadog]

{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

#### Key components

To send telemetry data to Datadog, the following components are defined in the configuration:

{{< img src="/opentelemetry/embedded_collector/components-2.png" alt="Diagram depicting the Agent deployment pattern" style="width:100%;" >}}

##### Datadog connector

The [Datadog connector][6] computes Datadog APM trace metrics.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
connectors:
  datadog/connector:
    traces:
      compute_top_level_by_span_kind: true
      peer_tags_aggregation: true
      compute_stats_by_span_kind: true
{{< /code-block >}}

##### Datadog exporter

The [Datadog exporter][7] exports traces, metrics, and logs to Datadog.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
exporters:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: ${env:DD_SITE}
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

This deploys the Datadog Agent as a DaemonSet with the embedded OpenTelemetry Collector. The Collector runs on the same host as your application, following the [Agent deployment pattern][1]. The [Gateway deployment pattern][2] is not supported.

[1]: https://opentelemetry.io/docs/collector/deployment/agent/
[2]: https://opentelemetry.io/docs/collector/deployment/gateway/
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

This Helm chart deploys the Datadog Agent with OpenTelemetry Collector as a DaemonSet. The Collector is deployed on the same host as your application, following the [Agent deployment pattern][1]. The [Gateway deployment pattern][2] is not supported.

[1]: https://opentelemetry.io/docs/collector/deployment/agent/
[2]: https://opentelemetry.io/docs/collector/deployment/gateway/
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

As an example, you can use the [Calendar sample application][9] that's already instrumented for you.

1. Clone the `opentelemetry-examples` repository to your device:
   ```shell
   git clone https://github.com/DataDog/opentelemetry-examples.git
   ```
1. Navigate to the `/calendar` directory:
   ```shell
   cd opentelemetry-examples/apps/rest-services/java/calendar
   ```
1. The following code instruments the [CalendarService.getDate()][10] method using the OpenTelemetry annotations and API:
   {{< code-block lang="java" filename="CalendarService.java" disable_copy="true" collapsible="true" >}}
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    Span span = Span.current();
    span.setAttribute("peer.service", "random-date-service");
    ...
}
{{< /code-block >}}

### Configure the application

To configure your application container, ensure that the correct OTLP endpoint hostname is used. The Datadog Agent with OpenTelemetry Collector is deployed as a DaemonSet, so the current host needs to be targeted.

The Calendar application container is already configure with correct `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable [as defined in Helm chart][13]:

1. Go to the Calendar application's Deployment manifest file:
   ```shell
   ./deploys/calendar/templates/deployment.yaml
   ```
1. The following environment variables configure the OTLP endpoint:
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

In this example, the Calendar application is already configured with unified service tagging [as defined in Helm chart][15]:

1. Go to the Calendar application's Deployment manifest file:
   ```shell
   ./deploys/calendar/templates/deployment.yaml
   ```
1. The following environment variables configure the OTLP endpoint:
   {{< code-block lang="yaml" filename="deployment.yaml" disable_copy="true" collapsible="true" >}}
env:
  ...
  - name: OTEL_SERVICE_NAME
    value: {{ include "calendar.fullname" . }}
  - name: OTEL_K8S_NAMESPACE
    valueFrom:
      fieldRef:
        apiVersion: v1
        fieldPath: metadata.namespace
  - name: OTEL_K8S_NODE_NAME
    valueFrom:
      fieldRef:
        apiVersion: v1
        fieldPath: spec.nodeName
  - name: OTEL_K8S_POD_NAME
    valueFrom:
      fieldRef:
        apiVersion: v1
        fieldPath: metadata.name
  - name: OTEL_EXPORTER_OTLP_PROTOCOL
    value: 'grpc'
  - name: OTEL_RESOURCE_ATTRIBUTES
    value: >-
      service.name=$(OTEL_SERVICE_NAME),
      k8s.namespace.name=$(OTEL_K8S_NAMESPACE),
      k8s.node.name=$(OTEL_K8S_NODE_NAME),
      k8s.pod.name=$(OTEL_K8S_POD_NAME),
      k8s.container.name={{ .Chart.Name }},
      host.name=$(OTEL_K8S_NODE_NAME),
      deployment.environment=$(OTEL_K8S_NAMESPACE)
   {{< /code-block >}}

### Run the application

To start generating and forwarding observability data to Datadog, you need to deploy the Calendar application with the OpenTelemetry SDK using Helm.

1. Run the following `helm` command from the `calendar/` folder:
```shell
helm upgrade -i <CALENDAR_RELEASE_NAME> ./deploys/calendar/
```
1. This Helm chart deploys the sample Calendar application as a ReplicaSet.
1. To test that the Calendar application is running correctly, execute the following command from another terminal window:
   ```shell
   curl localhost:9090/calendar
   ```
1. Verify that you receive a response like:
   ```text
   {"date":"2024-12-30"}
   ```
Each call to the Calendar application results in metrics, traces, and logs being forwarded to the Datadog backend.

## Explore observability data in Datadog

Use Datadog to explore the observability data for the sample Calendar app.

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

View metrics from the embedded Collector to monitor the Collector health.

{{< img src="/opentelemetry/embedded_collector/dashboard.png" alt="View Collector health metrics from the OTel dashboard." style="width:100%;" >}}

## Included components

By default, the Datadog Agent with embedded Collector ships with the following Collector components. You can also see the list in [YAML format][11].

{{% collapse-content title="Receivers" level="p" %}}

- [filelogreceiver][16]
- [fluentforwardreceiver][17]
- [hostmetricsreceiver][18]
- [jaegerreceiver][19]
- [otlpreceiver][20]
- [prometheusreceiver][21]
- [receivercreator][22]
- [zipkinreceiver][23]
- [nopreceiver][24]

{{% /collapse-content %}}

{{% collapse-content title="Processors" level="p" %}}

- [attributesprocessor][25]
- [batchprocessor][26]
- [cumulativetodeltaprocessor][27]
- [filterprocessor][28]
- [groupbyattributeprocessor][29]
- [k8sattributesprocessor][30]
- [memorylimiterprocessor][31]
- [probabilisticsamplerprocessor][32]
- [resourcedetectionprocessor][33]
- [resourceprocessor][34]
- [routingprocessor][35]
- [tailsamplingprocessor][36]
- [transformprocessor][37]

{{% /collapse-content %}}

{{% collapse-content title="Exporters" level="p" %}}

- [datadogexporter][38]
- [debugexporter][39]
- [loadbalancingexporter][58]
- [otlpexporter][40]
- [otlphttpexporter][41]
- [sapmexporter][42]
- [nopexporter][43]

{{% /collapse-content %}}

{{% collapse-content title="Connectors" level="p" %}}

- [datadogconnector][44]
- [spanmetricsconnector][45]

{{% /collapse-content %}}

{{% collapse-content title="Extensions" level="p" %}}

- [healthcheckextension][46]
- [observer][47]
- [pprofextension][48]
- [zpagesextension][49]

{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
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
[35]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/routingprocessor
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
[55]: /containers/datadog_operator
[56]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[57]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/README.md
[58]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/loadbalancingexporter/README.md
