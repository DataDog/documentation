---
title: Install the Datadog Agent with Embedded OpenTelemetry Collector
private: true
further_reading:
- link: "/opentelemetry/agent/agent_with_custom_components"
  tag: "Documentation"
  text: "Use Custom OpenTelemetry Components with Datadog Agent"
---

## Overview

The Datadog Agent with embedded OpenTelemetry (OTel) Collector is an open-source Collector distribution that includes:

- Built-in Datadog pipelines and extensions
- Support for traces, metrics, and logs
- A curated set of components for optimal performance with Datadog

Follow this guide to install the Datadog Agent with the OpenTelemetry Collector using Helm.

<div class="alert alert-info">If you'd like to build a Datadog Agent image with additional OpenTelemetry components, read <a href="/opentelemetry/agent/agent_with_custom_components">Use Custom OpenTelemetry Components with Datadog Agent</a>.<br>For a list of components included by default, see <a href="#included-components">Included components</a>.</div>

## Requirements

To complete this guide, you need the following:

**Datadog account**:
1. [Create a Datadog account][1] if you don't have one.
1. Find or create your [Datadog API key][2].
1. Find or create your [Datadog application key][3].

**Software**:  
Install and set up the following on your machine:

- A Kubernetes cluster (v1.29+)
- Helm (v3+)
- Docker
- [kubectl][5]

**Configuration**

Configure your local Kubernetes context to point at the cluster.

1. To view available contexts, run:
   ```shell
   kubectl config get-contexts
   ```
1. Configure `kubectl` to interact with your cluster:
   ```shell
   kubectl config use-context <your-cluster-context>
   ```
   Replace <your-cluster-context> with the name of your Kubernetes cluster context.
   
## Install the Datadog Agent with OpenTelemetry Collector

### Add the Datadog Helm Repository

To add the Datadog repository to your Helm repositories:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

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

Use a YAML file to specify the Helm chart parameters for the [Datadog Agent chart][4].

1. Create an empty `datadog-values.yaml` file:
   ```shell
   touch datadog-values.yaml
   ```
   <div class="alert alert-info">Unspecified parameters will use defaults from <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml">values.yaml</a>.</div>
1. Configure the Datadog API and Application key secrets:
   {{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  apiKeyExistingSecret: datadog-secret
  appKeyExistingSecret: datadog-secret
   {{< /code-block >}}
1. Switch the Datadog Agent Docker repository to use development builds:
   {{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
agents:
  image:
    repository: datadog/agent-dev
    tag: nightly-ot-beta-main-jmx
    doNotCheckTag: true
...
   {{< /code-block >}}
   <div class="alert alert-info">This guide uses a Java application example. The <code>-jmx</code> suffix in the image tag enables JMX utilities. For non-Java applications, use <code>nightly-ot-beta-main</code> instead.<br> For more details, see <a href="/containers/guide/autodiscovery-with-jmx/?tab=helm">Autodiscovery and JMX integration guide</a>.</div>
1. Enable the OpenTelemetry Collector and configure the essential ports:
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
1. (Optional) Enable additional Datadog features.
   <div class="alert alert-danger">Enabling these features may incur additional charges. Review the <a href="https://www.datadoghq.com/pricing/"> pricing page</a> and talk to your CSM before proceeding.</div>
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
  networkMonitoring:
    enabled: true
   {{< /code-block >}}
   
{{% collapse-content title="Completed datadog-values.yaml file" level="p" %}}
Your `datadog-values.yaml` file should look something like this:
{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="false" >}}
agents:
  image:
    repository: datadog/agent-dev
    tag: nightly-ot-beta-main-jmx
    doNotCheckTag: true

datadog:
  apiKeyExistingSecret: datadog-secret
  appKeyExistingSecret: datadog-secret

  otelCollector:
    enabled: true
    ports:
      - containerPort: "4317"
        hostPort: "4317"
        name: otel-grpc
      - containerPort: "4318"
        hostPort: "4318"
        name: otel-http

  podLabelsAsTags:
    app: kube_app
    release: helm_release
   {{< /code-block >}}

{{% /collapse-content %}}
   
### Configure the OpenTelemetry Collector

The DataDog Helm chart provides a sample OpenTelemetry Collector configuration that's a great starting point for most projects. This section walks you through the predefined pipelines and included OpenTelemetry components.

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
         endpoint: 0.0.0.0:{{ include "get-port-number-from-name" (dict "ports" .Values.datadog.otelCollector.ports "portName" "otel-grpc") }}
      http:
         endpoint: 0.0.0.0:{{ include "get-port-number-from-name" (dict "ports" .Values.datadog.otelCollector.ports "portName" "otel-http") }}
exporters:
  debug:
    verbosity: detailed
  datadog:
    api:
      key: ${env:DD_API_KEY}
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
      processors: [batch]
      exporters: [datadog/connector]
    traces/otlp:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [datadog]
    metrics:
      receivers: [otlp, datadog/connector, prometheus]
      processors: [infraattributes, batch]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [datadog]

{{< /code-block >}}

#### Key components

To send telemetry data to Datadog, the following components are defined in the configuration:

##### Datadog connector

The [Datadog connector][6] computes Datadog APM Trace Metrics.

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
{{< /code-block >}}

##### Prometheus receiver

The [Prometheus receiver][8] collects health metrics from the OpenTelemetry Collector for the Metrics pipeline.

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

To install or upgrade the Datadog Agent with OpenTelemetry Collector in your Kubernetes environment, use the following Helm command:

```shell
helm upgrade -i <RELEASE_NAME> datadog/datadog -f datadog-values.yaml
```

This Helm chart deploys the Datadog Agent with OpenTelemetry Collector as a DaemonSet. The Collector is deployed on the same host as your application, following the Agent deployment pattern.

<div class="alert alert-warn">The Gateway deployment pattern is not supported.</div>

## Next steps

To send all of your telemetry data to Datadog, ensure you've done the following:

1. Instrument your application.
2. Correlate observability data.
3. Run your application.

Once these steps are complete, you should see telemetry data for your application in Datadog. To verify everything is working as expected, should review the following areas:

### Fleet automation

Explore your Datadog Agent and Collector configuration.

### Live container monitoring

Monitor your container health via Live Container Monitoring capabilities. 

### Infrastructure node health

View runtime and infrastructure metrics to visualize, monitor, and measure the performance of your nodes.

### Logs

View logs to monitor and troubleshoot application and system operations.

### Traces

View traces and spans to observe the status and performance of requests processed by your application, with infrastructure metrics correlated in the same trace. 

### Runtime metrics

Monitor your runtime (JVM) metrics for your applications. 

### Collector health metrics

View metrics from the embedded Collector to monitor the Collector health.

## Included components

By default, the Datadog Agent with embedded Collector ships with the following Collector components. You can also refer to the list in [YAML format][11].

### Receivers

- filelogreceiver
- fluentforwardreceiver
- hostmetricsreceiver
- jaegerreceiver
- otlpreceiver
- prometheusreceiver
- receivercreator
- zipkinreceiver
- nopreceiver

### Processors

- attributesprocessor
- batchprocessor
- cumulativetodeltaprocessor
- filterprocessor
- groupbyattributeprocessor
- k8sattributesprocessor
- memorylimiterprocessor
- probabilisticsamplerprocessor
- resourcedetectionprocessor
- resourceprocessor
- routingprocessor
- tailsamplingprocessor
- transformprocessor

### Exporters

- datadogexporter
- debugexporter
- otlpexporter
- otlphttpexporter
- sapmexporter
- nopexporter

### Connectors

- datadogconnector
- spanmetricsconnector

### Extensions

- healthcheckextension
- observer
- pprofextension
- zpagesextension

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
[10]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/java/com/otel/controller/CalendarController.java#L70-L86
[11]: https://github.com/DataDog/datadog-agent/blob/386130a34dde43035c814f9a9b08bc72eb20e476/comp/otelcol/collector-contrib/impl/manifest.yaml
