---
title: Migrate to the Datadog Distribution of OTel Collector
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > OpenTelemetry Migration Guides > Migrate to
  the Datadog Distribution of OTel Collector
---

# Migrate to the Datadog Distribution of OTel Collector

If you are already using a standalone OpenTelemetry (OTel) Collector for your OTel-instrumented applications, you can migrate to the Datadog Distribution of OpenTelemetry (DDOT) Collector. The DDOT Collector allows you to leverage Datadog's enhanced capabilities, including optimized configurations, seamless integrations, and additional features tailored for the Datadog ecosystem.

To migrate to the DDOT Collector, you need to install the Datadog Agent and configure your applications to report the telemetry data.

{% alert level="warning" %}
The DDOT Collector only supports deployment as a DaemonSet (following the [agent deployment pattern](https://opentelemetry.io/docs/collector/deployment/agent/)), not as a [gateway](https://opentelemetry.io/docs/collector/deployment/gateway/). If you have an existing gateway architecture, you can use the DDOT Collector with the [loadbalancingexporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/loadbalancingexporter) to connect to your existing gateway layer.
{% /alert %}

## Prerequisites{% #prerequisites %}

Before starting the migration process, ensure you have:

- A valid Datadog account
- An OpenTelemetry-instrumented application ready to send telemetry data
- Access to your current OpenTelemetry Collector configurations
- Administrative access to your Kubernetes cluster (Kubernetes v1.29+ is required)
  - **Note**: EKS Fargate environments are not supported
- Helm v3+

## Review existing configuration{% #review-existing-configuration %}

Before you begin, review your configuration to see if your existing config is supported by default:

1. Examine your existing OpenTelemetry Collector configuration file (`otel-config.yaml`).
1. Compare it to the [list of components](http://localhost:1313/opentelemetry/setup/ddot_collector/#included-components) included in the Datadog Agent by default.
1. If your setup uses components not included in the Agent by default, follow [Use Custom OpenTelemetry Components with Datadog Agent](http://localhost:1313/opentelemetry/setup/ddot_collector/custom_components).
1. If your configuration uses `span_name_as_resource_name` or `span_name_remappings`, review the [New Operation Name Mappings guide](http://localhost:1313/opentelemetry/guide/migrate/migrate_operation_names/). The DDOT Collector enables these new mappings by default.

{% alert level="info" %}
The default configuration settings in Datadog's embedded collector may differ from the standard OpenTelemetry Collector configuration defaults. This can affect behavior of components like the `filelogreceiver`. Review the configuration closely when migrating from a standalone collector.
{% /alert %}

### Example configuration{% #example-configuration %}

Here are two example Collector configuration files:

{% tab title="Custom Collector components" %}
This example uses a custom `metricstransform` component:

In the `collector-config.yaml` file:

```yaml
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
      site: ${env:DD_SITE}
processors:
  infraattributes:
    cardinality: 2
  batch:
    timeout: 10s
  metricstransform:
    transforms:
      - include: system.cpu.usage
        action: insert
        new_name: host.cpu.utilization
connectors:
  datadog/connector:
    traces:
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [datadog/connector, datadog]
    metrics:
      receivers: [otlp, datadog/connector]
      processors: [metricstransform, infraattributes, batch]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [datadog]
```

In this case, you need to follow [Use Custom OpenTelemetry Components with Datadog Agent](http://localhost:1313/opentelemetry/setup/ddot_collector/custom_components).
{% /tab %}

{% tab title="Default Agent components" %}
This example only uses components included in the Datadog Agent by default:

In the `collector-config.yaml` file:

```yaml
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
      site: ${env:DD_SITE}
processors:
  infraattributes:
    cardinality: 2
  batch:
    timeout: 10s
connectors:
  datadog/connector:
    traces:
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
```

In this case, you can proceed to installing the DDOT Collector.
{% /tab %}

## Install the Agent with OpenTelemetry Collector{% #install-the-agent-with-opentelemetry-collector %}

Follow these steps to install the DDOT Collector.

### Add the Datadog Helm Repository{% #add-the-datadog-helm-repository %}

To add the Datadog repository to your Helm repositories:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

### Set up Datadog API key{% #set-up-datadog-api-key %}

1. Get the Datadog [API key](https://app.datadoghq.com/organization-settings/api-keys/).
1. Store the API key as a Kubernetes secret:
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>
   ```
Replace `<DD_API_KEY>` with your actual Datadog API key.

### Configure the Datadog Agent{% #configure-the-datadog-agent %}

Use a YAML file to specify the Helm chart parameters for the [Datadog Agent chart](http://localhost:1313/opentelemetry/setup/ddot_collector/custom_components).

1. Create an empty `datadog-values.yaml` file:

   ```shell
   touch datadog-values.yaml
   ```
Important alert (level: info): Unspecified parameters use defaults from [values.yaml](https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml).
1. Configure the Datadog API key secret:

In the `datadog-values.yaml` file:

   ```yaml
   datadog:
     site: <DATADOG_SITE>
     apiKeyExistingSecret: datadog-secret
      
```
Set `<DATADOG_SITE>` to your [Datadog site](http://localhost:1313/getting_started/site/). Otherwise, it defaults to `datadoghq.com`, the US1 site.


1. Enable the OpenTelemetry Collector and configure the essential ports:

In the `datadog-values.yaml` file:

   ```yaml
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
      
```
It is required to set the `hostPort` in order for the container port to be exposed to the external network. This enables configuring the OTLP exporter to point to the IP address of the node to which the Datadog Agent is assigned.


If you don't want to expose the port, you can use the Agent service instead:

   1. Remove the `hostPort` entries from your `datadog-values.yaml` file.
   1. In your application's deployment file (`deployment.yaml`), configure the OTLP exporter to use the Agent service:
      ```sh
      env:
        - name: OTEL_EXPORTER_OTLP_ENDPOINT
          value: 'http://<SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local'
        - name: OTEL_EXPORTER_OTLP_PROTOCOL
          value: 'grpc'
      ```

1. (Optional) Enable additional Datadog features:
Important alert (level: danger): Enabling these features may incur additional charges. Review the [pricing page](https://www.datadoghq.com/pricing/) and talk to your Customer Success Manager before proceeding.
In the `datadog-values.yaml` file:

   ```yaml
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
      
```

1. (Optional) Collect pod labels and use them as tags to attach to metrics, traces, and logs:
Important alert (level: danger): Custom metrics may impact billing. See the [custom metrics billing page](https://docs.datadoghq.com/account_management/billing/custom_metrics) for more information.
In the `datadog-values.yaml` file:

   ```yaml
   datadog:
     ...
     podLabelsAsTags:
       app: kube_app
       release: helm_release
```

## Deploy the Agent with OpenTelemetry Collector{% #deploy-the-agent-with-opentelemetry-collector %}

1. Install or upgrade the Datadog Agent with OpenTelemetry Collector to your Kubernetes environment:
   ```sh
   helm upgrade -i <RELEASE_NAME> datadog/datadog \
     -f datadog-values.yaml \
     --set-file datadog.otelCollector.config=collector-config.yaml
   ```
1. Navigate to **Integrations** > **Fleet Automation**.
1. Select the **OTel Collector Version** facet.
1. Select an Agent and inspect its configuration to verify the new Agent with OpenTelemetry Collector is installed successfully.

## Configure your application{% #configure-your-application %}

To configure your existing application to use Datadog Agent instead of standalone Collector, ensure that the correct OTLP endpoint hostname is used. The Datadog Agent with DDOT Collector deployed as a DaemonSet, so the current host needs to be targeted.

1. Go to your application's Deployment manifest file (`deployment.yaml`).
1. Add following environment variables to configure the OTLP endpoint:
In the `deployment.yaml` file:

   ```yaml
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
```

### Operation name mapping differences{% #operation-name-mapping-differences %}

If you previously used `span_name_as_resource_name` or `span_name_remappings` configurations in your standalone Collector, you need to adapt your configuration.

1. Remove these configurations from your Datadog Exporter and Connector settings.
1. Enable the `enable_operation_and_resource_name_logic_v2` feature flag in your Agent configuration.

For detailed instructions on migrating to the new operation name mappings, see [Migrate to New Operation Name Mappings](http://localhost:1313/opentelemetry/guide/migrate/migrate_operation_names/).

## Correlate observability data{% #correlate-observability-data %}

[Unified service tagging](http://localhost:1313/getting_started/tagging/unified_service_tagging) ties observability data together in Datadog so you can navigate across metrics, traces, and logs with consistent tags.

To configure your application with unified service tagging, set the `OTEL_RESOURCE_ATTRIBUTES` environment variable:

1. Go to your application's Deployment manifest file.
1. Add following lines to enable the correlation between application traces and other observability data:
In the `deployment.yaml` file:

   ```yaml
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
```

## Verify data flow{% #verify-data-flow %}

After configuring your application, verify that data is flowing correctly to Datadog:

1. Apply the configuration changes by redeploying your applications.
   ```sh
   kubectl apply -f deployment.yaml
   ```
1. Confirm that telemetry data is being received in your Datadog account. Check logs, traces and metrics to ensure correct data collection and correlation.

## Uninstall standalone Collector{% #uninstall-standalone-collector %}

After you've confirmed that all data is being collected correctly in Datadog, you can remove the standalone OpenTelemetry Collector:

1. Ensure all required data is being collected and displayed in Datadog.
1. Uninstall the open source OpenTelemetry Collector from your environment:
   ```sh
   kubectl delete deployment old-otel-collector
   ```

## Further reading{% #further-reading %}

- [Use Custom OpenTelemetry Components with Datadog Agent](http://localhost:1313/opentelemetry/setup/ddot_collector/custom_components)
- [Install the Datadog Distribution of OTel Collector](http://localhost:1313/opentelemetry/setup/ddot_collector/install/)
