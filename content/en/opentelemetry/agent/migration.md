---
title: Migrate to the Datadog Agent with Embedded OpenTelemetry Collector
private: true
further_reading:
- link: "/opentelemetry/agent/agent_with_custom_components"
  tag: "Documentation"
  text: "Use Custom OpenTelemetry Components with Datadog Agent"
- link: "/opentelemetry/agent/install_agent_with_collector"
  tag: "Documentation"
  text: "Use Custom OpenTelemetry Components with Datadog Agent"
---

If you are already using a standalone OpenTelemetry (OTel) Collector for your OTel-instrumented applications, you can migrate to the Datadog Agent with embedded OpenTelemetry Collector. The embedded OTel Collector allows you to leverage Datadog's enhanced capabilities, including optimized configurations, seamless integrations, and additional features tailored for the Datadog ecosystem.

To migrate to the Datadog Agent with embedded OpenTelemetry Collector, you need to install the Datadog Agent and configure your applications to report the telemetry data.

<div class="alert alert-danger">This guide covers migrating the OpenTelemetry Collector deployed as an <a href="https://opentelemetry.io/docs/collector/deployment/agent/">Agent</a>. The <a href="https://opentelemetry.io/docs/collector/deployment/gateway/">Gateway deployment pattern</a> is not supported.</div>

## Prerequisites

Before starting the migration process, ensure you have:

- A valid Datadog account
- An OpenTelemetry-instrumented application ready to send telemetry data
- Access to your current OpenTelemetry Collector configurations
- Administrative access to your Kubernetes cluster (Kubernetes v1.29+ is required)
- Helm v3+

## Review existing configuration

Before you begin, review your configuration to see if your existing config is supported by default:

1. Examine your existing OpenTelemetry Collector configuration file (`otel-config.yaml`).
1. Compare it to the [list of components][1] included in the Datadog Agent by default. 
1. If your setup uses components not included in the Agent by default, follow [Use Custom OpenTelemetry Components with Datadog Agent][4].

### Example configuration

For example, here are two example Collector configuration files:

{{< tabs >}}
{{% tab "Custom Collector components" %}}

This example uses a custom `kafkametrics` component in `collector-config.yaml`:

{{< highlight yaml "hl_lines=8-15 38" >}}
receivers:
  otlp:
    protocols:
      grpc:
         endpoint: 0.0.0.0:4317
      http:
         endpoint: 0.0.0.0:4318
  kafkametrics:
    brokers: "${env:KAFKA_BROKER_ADDRESS}"
    protocol_version: 2.0.0
    scrapers:
      - brokers
      - topics
      - consumers
    collection_interval: 5s
exporters:
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
      processors: [infraattributes, batch]
      exporters: [datadog/connector, datadog]
    metrics:
      receivers: [otlp, datadog/connector, kafkametrics]
      processors: [infraattributes, batch]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [datadog]
{{< /highlight >}}

In this case, you need to follow [Use Custom OpenTelemetry Components with Datadog Agent][4].

{{% /tab %}}

{{% tab "Default Agent components" %}}

This example only uses components included in the Datadog Agent by default:

{{< code-block lang="yaml" filename="collector-config.yaml" disable_copy="true" collapsible="true" >}}
receivers:
  otlp:
    protocols:
      grpc:
         endpoint: 0.0.0.0:4317
      http:
         endpoint: 0.0.0.0:4318
exporters:
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
      processors: [infraattributes, batch]
      exporters: [datadog/connector, datadog]
    metrics:
      receivers: [otlp, datadog/connector]
      processors: [infraattributes, batch]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [datadog]
{{< /code-block >}}

In this case, you can proceed to installing the Agent with the embedded OpenTelemetry Collector.

{{% /tab %}}
{{< /tabs >}}

## Install the Agent with OpenTelemetry Collector

First, install the Agent with embedded OpenTelemetry Collector by following [Install the Datadog Agent with OpenTelemetry Collector][2]. Specifically, complete the steps to:

1. [Add the Datadog Helm repository][5].
2. [Set up Datadog API and application keys][6].
3. [Configure the Datadog Agent][7].

## Deploy the Agent with OpenTelemetry Collector

1. Install or upgrade the Datadog Agent with OpenTelemetry Collector to your Kubernetes environment:
   ```sh
   helm upgrade -i <RELEASE_NAME> datadog/datadog \
     -f datadog-values.yaml \
     --set-file datadog.otelCollector.config=collector-config.yaml
   ```
1. Navigate to **Integrations** > **Fleet Automation** to verify the new Agent with OpenTelemetry Collector is installed successfully.

## Configure your application

To configure your existing application to use Datadog Agent instead of standalone Collector, ensure that the correct OTLP endpoint hostname is used. The Datadog Agent with embedded Collector deployed as a DaemonSet, so the current host needs to be targeted.

1. Go to your application's Deployment manifest file (`deployment.yaml`).
1. Add following environment variables to configure the OTLP endpoint:
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

## Correlate observability data

[Unified service tagging][3] ties observability data together in Datadog so you can navigate across metrics, traces, and logs with consistent tags.

To configure your application with unified service tagging, set the `OTEL_RESOURCE_ATTRIBUTES` environment variable: 

1. Go to your application's Deployment manifest file.  
1. Add following lines to enable the correlation between application traces and other observability data:
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

## Verify data flow

After configuring your application, verify that data is flowing correctly to Datadog:

1. Apply the configuration changes by redeploying your applications.
   ```sh
   kubectl apply -f deployment.yaml
   ```
1. Confirm that telemetry data is being received in your Datadog account. Check logs, traces and metrics to ensure correct data collection and correlation.

## Uninstall standalone Collector

Once you've confirmed that all data is being collected correctly in Datadog, you can remove the standalone OpenTelemetry Collector:

1. Ensure all required data is being collected and displayed in Datadog.  
1. Uninstall the open source OpenTelemetry Collector from your environment:
   ```sh
   kubectl delete deployment old-otel-collector
   ```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/agent/install_agent_with_collector#included-components
[2]: /opentelemetry/agent/install_agent_with_collector#install-the-datadog-agent-with-opentelemetry-collector
[3]: /getting_started/tagging/unified_service_tagging
[4]: /opentelemetry/agent/agent_with_custom_components
[5]: /opentelemetry/agent/install_agent_with_collector#add-the-datadog-helm-repository
[6]: /opentelemetry/agent/install_agent_with_collector#set-up-the-api-and-application-keys
[7]: /opentelemetry/agent/install_agent_with_collector#configure-the-datadog-agent