---
title: Migrate to the Datadog Distribution of OTel Collector
aliases:
- /opentelemetry/agent/migration/
- /opentelemetry/guide/migrate/ddot_collector
further_reading:
- link: "/opentelemetry/setup/ddot_collector/custom_components"
  tag: "Documentation"
  text: "Use Custom OpenTelemetry Components with Datadog Agent"
- link: "/opentelemetry/setup/ddot_collector/install/"
  tag: "Documentation"
  text: "Install the Datadog Distribution of OTel Collector"
---

If you are already using a standalone OpenTelemetry (OTel) Collector for your OTel-instrumented applications, you can migrate to the Datadog Distribution of OpenTelemetry (DDOT) Collector. The DDOT Collector allows you to leverage Datadog's enhanced capabilities, including optimized configurations, seamless integrations, and additional features tailored for the Datadog ecosystem.

To migrate to the DDOT Collector, you need to install the Datadog Agent and configure your applications to report the telemetry data.

<div class="alert alert-info">
The DDOT Collector supports deployment as a DaemonSet (following the <a href="https://opentelemetry.io/docs/collector/deployment/agent/">agent deployment pattern</a>), the <a href="https://opentelemetry.io/docs/collector/deployment/gateway/">gateway</a> deployment is available in Preview. If you have an existing gateway architecture, migrate DaemonSet collectors to DDOT by following the instructions in the current guide. Then migrate your gateway layer to DDOT by following <a href="https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/install/kubernetes_gateway/?code-lang=kubernetes_gateway">DDOT Kubernetes Gateway installation guide</a>.
</div>

## Prerequisites

Before starting the migration process, ensure you have:

- A valid Datadog account
- An OpenTelemetry-instrumented application ready to send telemetry data
- Access to your current OpenTelemetry Collector configurations
- Administrative access to your Kubernetes cluster (Kubernetes v1.29+ is required)
  - **Note**: EKS Fargate environments are not supported
- Helm v3+

## Review existing configuration

Before you begin, review your configuration to see if your existing config is supported by default:

1. Examine your existing OpenTelemetry Collector configuration file (`otel-config.yaml`).
1. Compare it to the [list of components][1] included in the Datadog Agent by default.
1. If your setup uses components not included in the Agent by default, follow [Use Custom OpenTelemetry Components with Datadog Agent][4].
1. If your configuration uses `span_name_as_resource_name` or `span_name_remappings`, review the [New Operation Name Mappings guide][11]. The DDOT Collector enables these new mappings by default.

<div class="alert alert-info">The default configuration settings in Datadog's embedded collector may differ from the standard OpenTelemetry Collector configuration defaults. This can affect behavior of components like the <code>filelogreceiver</code>. Review the configuration closely when migrating from a standalone collector.</div>

### Example configuration

Here are two example Collector configuration files:

{{< tabs >}}
{{% tab "Custom Collector components" %}}

This example uses a custom `metricstransform` component:

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
{{< /code-block >}}

In this case, you need to follow [Use Custom OpenTelemetry Components with Datadog Agent][4].

[4]: /opentelemetry/setup/ddot_collector/custom_components
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
{{< /code-block >}}

In this case, you can proceed to installing the DDOT Collector.

{{% /tab %}}
{{< /tabs >}}

## Install the Agent with OpenTelemetry Collector

Follow these steps to install the DDOT Collector.

### Add the Datadog Helm Repository

To add the Datadog repository to your Helm repositories:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

### Set up Datadog API key

1. Get the Datadog [API key][8].
1. Store the API key as a Kubernetes secret:
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>
   ```
   Replace `<DD_API_KEY>` with your actual Datadog API key.

### Configure the Datadog Agent

Use a YAML file to specify the Helm chart parameters for the [Datadog Agent chart][4].

1. Create an empty `datadog-values.yaml` file:
   ```shell
   touch datadog-values.yaml
   ```
   <div class="alert alert-info">Unspecified parameters use defaults from <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml">values.yaml</a>.</div>
1. Configure the Datadog API key secret:
   {{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  site: <DATADOG_SITE>
  apiKeyExistingSecret: datadog-secret
   {{< /code-block >}}
   Set `<DATADOG_SITE>` to your [Datadog site][10]. Otherwise, it defaults to `datadoghq.com`, the US1 site.

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
   It is required to set the `hostPort` in order for the container port to be exposed to the external network. This enables configuring the OTLP exporter to point to the IP address of the node to which the Datadog Agent is assigned.

   If you don't want to expose the port, you can use the Agent service instead:
   1. Remove the <code>hostPort</code> entries from your <code>datadog-values.yaml</code> file.
   1. In your application's deployment file (`deployment.yaml`), configure the OTLP exporter to use the Agent service:
      ```sh
      env:
        - name: OTEL_EXPORTER_OTLP_ENDPOINT
          value: 'http://<SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local'
        - name: OTEL_EXPORTER_OTLP_PROTOCOL
          value: 'grpc'
      ```

1. (Optional) Enable additional Datadog features:
   <div class="alert alert-warning">Enabling these features may incur additional charges. Review the <a href="https://www.datadoghq.com/pricing/">pricing page</a> and talk to your Customer Success Manager before proceeding.</div>
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
1. (Optional) Collect pod labels and use them as tags to attach to metrics, traces, and logs:
   <div class="alert alert-warning">Custom metrics may impact billing. See the <a href="https://docs.datadoghq.com/account_management/billing/custom_metrics">custom metrics billing page</a> for more information.</div>
   {{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  podLabelsAsTags:
    app: kube_app
    release: helm_release
{{< /code-block >}}

## Deploy the Agent with OpenTelemetry Collector

1. Install or upgrade the Datadog Agent with OpenTelemetry Collector to your Kubernetes environment:
   ```sh
   helm upgrade -i <RELEASE_NAME> datadog/datadog \
     -f datadog-values.yaml \
     --set-file datadog.otelCollector.config=collector-config.yaml
   ```
1. Navigate to **Integrations** > **Fleet Automation**.
1. Select the **OTel Collector Version** facet.
1. Select an Agent and inspect its configuration to verify the new Agent with OpenTelemetry Collector is installed successfully.

## Configure your application

To configure your existing application to use Datadog Agent instead of standalone Collector, ensure that the correct OTLP endpoint hostname is used. The Datadog Agent with DDOT Collector deployed as a DaemonSet, so the current host needs to be targeted.

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

### Operation name mapping differences

If you previously used `span_name_as_resource_name` or `span_name_remappings` configurations in your standalone Collector, you need to adapt your configuration.

1. Remove these configurations from your Datadog Exporter and Connector settings.
2. Enable the `enable_operation_and_resource_name_logic_v2` feature flag in your Agent configuration.

For detailed instructions on migrating to the new operation name mappings, see [Migrate to New Operation Name Mappings][11].

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

After you've confirmed that all data is being collected correctly in Datadog, you can remove the standalone OpenTelemetry Collector:

1. Ensure all required data is being collected and displayed in Datadog.
1. Uninstall the open source OpenTelemetry Collector from your environment:
   ```sh
   kubectl delete deployment old-otel-collector
   ```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/setup/ddot_collector/#included-components
[2]: /opentelemetry/setup/ddot_collector/install/#install-the-datadog-agent-with-opentelemetry-collector
[3]: /getting_started/tagging/unified_service_tagging
[4]: /opentelemetry/setup/ddot_collector/custom_components
[5]: /opentelemetry/setup/ddot_collector/install/?tab=helm#add-the-datadog-helm-repository
[6]: /opentelemetry/setup/ddot_collector/install/#set-up-datadog-api-and-application-keys
[7]: /opentelemetry/setup/ddot_collector/install/#configure-the-datadog-agent
[8]: https://app.datadoghq.com/organization-settings/api-keys/
[9]: https://app.datadoghq.com/organization-settings/application-keys
[10]: /getting_started/site/
[11]: /opentelemetry/guide/migrate/migrate_operation_names/
