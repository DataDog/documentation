---
title: Troubleshooting
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Troubleshooting
---

# Troubleshooting

If you experience unexpected behavior using OpenTelemetry with Datadog, this guide may help you resolve the issue. If you continue to have trouble, contact [Datadog Support](http://localhost:1313/help/) for further assistance.

## Incorrect or unexpected hostnames{% #incorrect-or-unexpected-hostnames %}

When using OpenTelemetry with Datadog, you might encounter various hostname-related issues. The following sections cover common scenarios and their solutions.

### Different Kubernetes hostname and node name{% #different-kubernetes-hostname-and-node-name %}

**Symptom**: When deploying in Kubernetes, the hostname reported by Datadog does not match the expected node name.

**Cause**: This is typically the result of missing `k8s.node.name` (and optionally `k8s.cluster.name`) tags.

**Resolution**:

1. Configure the `k8s.pod.ip` attribute for your application deployment:

   ```yaml
   env:
     - name: MY_POD_IP
       valueFrom:
         fieldRef:
           apiVersion: v1
           fieldPath: status.podIP
     - name: OTEL_RESOURCE
       value: k8s.pod.ip=$(MY_POD_IP)
   ```

1. Enable the `k8sattributes` processor in your Collector:

   ```yaml
   k8sattributes:
   [...]
   processors:
     - k8sattributes
   ```

Alternatively, you can override the hostname using the `datadog.host.name` attribute:

```yaml
processors:
  transform:
    trace_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.name"], "${NODE_NAME}")
```

For more information on host-identifying attributes, see [Mapping OpenTelemetry Semantic Conventions to Hostnames](http://localhost:1313/opentelemetry/schema_semantics/hostname/).

### Unexpected hostnames with AWS Fargate deployment{% #unexpected-hostnames-with-aws-fargate-deployment %}

**Symptom**: In AWS Fargate environments, an incorrect hostname might be reported for traces.

**Cause**: In Fargate environments, the default resource detection may not properly identify the ECS metadata, leading to incorrect hostname assignment.

**Resolution**:

Configure the `resourcedetection` processor in your Collector configuration and enable the `ecs` detector:

```yaml
processors:
  resourcedetection:
    detectors: [env, ecs]
    timeout: 2s
    override: false
```

### Gateway collector not forwarding host metadata{% #gateway-collector-not-forwarding-host-metadata %}

**Symptom**: In a gateway deployment, telemetry from multiple hosts appears to come from a single host, or host metadata isn't being properly forwarded.

**Cause**: This occurs when the gateway collector configuration doesn't preserve or properly forward the host metadata attributes from the agent collectors.

**Resolution**:

1. Configure agent collectors to collect and forward host metadata:

   ```yaml
   processors:
     resourcedetection:
       detectors: [system, env]
     k8sattributes:
       passthrough: true
   ```

1. Configure the gateway collector to extract and forward necessary metadata:

   ```yaml
   processors:
     k8sattributes:
       extract:
         metadata: [node.name, k8s.node.name]
     transform:
       trace_statements:
         - context: resource
           statements:
             - set(attributes["datadog.host.use_as_metadata"], true)
   
   exporters:
     datadog:
       hostname_source: resource_attribute
   ```

For more information, see [Mapping OpenTelemetry Semantic Conventions to Infrastructure List Host Information](http://localhost:1313/opentelemetry/schema_semantics/host_metadata/).

### The same host shows up multiple times under different names{% #the-same-host-shows-up-multiple-times-under-different-names %}

**Symptom**: A single host appears under multiple names in Datadog. For example, you might see one entry from the OpenTelemetry Collector (with the OTel logo) and another from the Datadog Agent.

**Cause**: When a host is monitored through more than one ingestion method (for example, OTLP + Datadog Agent, or DogStatsD + OTLP) without aligning on a single hostname resource attribute, Datadog treats each path as a separate host.

**Resolution**:

1. Identify all active telemetry ingestion paths sending data from the same machine to Datadog.
1. Choose a single hostname source and decide whether you want to rely on the Datadog Agent's hostname or a specific resource attribute (for example, `k8s.node.name`).
1. Configure each path (Agent, Collector, etc.) so that they report a consistent hostname. For example, if you're setting the hostname with OTLP attributes, configure your transform processor:
   ```yaml
   processors:
     transform:
       trace_statements:
         - context: resource
           statements:
             - set(attributes["datadog.host.name"], "shared-hostname")
   ```
1. Validate in Datadog (Infrastructure List, host map, etc.) to confirm the host now appears under a single name.

## Host tag delays after startup{% #host-tag-delays-after-startup %}

**Symptom**: You may experience a delay in host tags appearing on your telemetry data after starting the Datadog Agent or OpenTelemetry Collector. This delay typically lasts under 10 minutes but can extend up to 40-50 minutes in some cases.

**Cause**: This delay occurs because host metadata must be processed and indexed by Datadog's backend before tags can be associated with telemetry data.

**Resolution**:

Host tags configured in either the Datadog exporter configuration (`host_metadata::tags`) or the Datadog Agent's `tags` section are not immediately applied to telemetry data. The tags eventually appear after the backend resolves the host metadata.

Choose your setup for specific instructions:

{% tab title="Datadog Agent OTLP Ingestion" %}
Configure `expected_tags_duration` in `datadog.yaml` to bridge the gap until host tags are resolved:

```yaml
expected_tags_duration: "15m"
```

This configuration adds the expected tags to all telemetry for the specified duration (in this example, 15 minutes).
{% /tab %}

{% tab title="OpenTelemetry Collector" %}
Use the `transform` processor to set your host tags as OTLP attributes. For example, to add environment and team tags:

```yaml
processors:
  transform:
    trace_statements:
      - context: resource
        statements:
          # OpenTelemetry semantic conventions
          - set(attributes["deployment.environment.name"], "prod")
          # Datadog-specific host tags
          - set(attributes["ddtags"], "env:prod,team:backend")
...
```

This approach combines OpenTelemetry semantic conventions with Datadog-specific host tags to ensure proper functionality in both OpenTelemetry and Datadog environments.
{% /tab %}

## Unable to map 'team' attribute to Datadog team tag{% #unable-to-map-team-attribute-to-datadog-team-tag %}

**Symptom**: The team tag is not appearing in Datadog for logs and traces, despite being set as a resource attribute in OpenTelemetry configurations.

**Cause**: This happens because OpenTelemetry resource attributes need explicit mapping to Datadog's tag format using the `ddtags` attribute.

**Resolution**:

Use the OpenTelemetry Collector's transform processor to map the team resource attribute to the `ddtags` attribute:

```yaml
processors:
  transform/datadog_team_tag:
    metric_statements:
      - context: datapoint
        statements:
          - set(attributes["ddtags"], Concat(["team:", resource.attributes["team"]],""))
    log_statements:
      - context: log
        statements:
          - set(attributes["ddtags"], Concat(["team:", resource.attributes["team"]],""))
    trace_statements:
      - context: span
        statements:
          - set(attributes["ddtags"], Concat(["team:", resource.attributes["team"]],""))
```

{% alert level="info" %}
Replace `resource.attributes["team"]` with the actual attribute name if different in your setup (for example, `resource.attributes["arm.team.name"]`).
{% /alert %}

To verify the configuration:

1. Restart the OpenTelemetry Collector to apply the changes.
1. Generate test logs and traces.
1. Check if the team tag appears in your Datadog logs and traces.
1. Verify that the team tag functions as expected in filtering and dashboards.

## Container tags not appearing on Containers page{% #container-tags-not-appearing-on-containers-page %}

**Symptom**: Container tags are not appearing on the Containers page in Datadog, which affects container monitoring and management capabilities.

**Cause**: This occurs when container resource attributes aren't properly mapped to Datadog's expected container metadata format.

**Resolution**:

When using OTLP ingestion in the Datadog Agent, you need to set specific resource attributes to ensure proper container metadata association. For more information, see [Resource Attribute Mapping](http://localhost:1313/opentelemetry/schema_semantics/semantic_mapping/).

To verify the configuration:

1. Check the raw trace data to confirm that container IDs and tags are properly translated into Datadog format (for example, `container.id` should become `container_id`).
1. Verify that container metadata appears on the Containers page.

## Missing metrics in Software Catalog and dashboards{% #missing-metrics-in-software-catalog-and-dashboards %}

**Symptom**: Metrics are not appearing in the Software Catalog and dashboards despite being properly collected.

**Cause**: This typically occurs due to incorrect or improperly mapped semantic conventions.

**Resolution**:

To verify the configuration:

1. Check that your metrics contain the required [semantic conventions](http://localhost:1313/opentelemetry/schema_semantics/semantic_mapping/).
1. Verify metric names follow OpenTelemetry naming conventions.
1. Confirm metrics are being properly translated to the Datadog format using the [metrics mapping reference](http://localhost:1313/opentelemetry/schema_semantics/metrics_mapping/#metrics-mappings).

{% alert level="info" %}
When working with semantic conventions, ensure you're following the latest OpenTelemetry specification for metric naming and attributes.
{% /alert %}

## Port binding errors and connection failures{% #port-binding-errors-and-connection-failures %}

**Symptom**: You experience port conflicts or binding issues when deploying the DDOT Collector, or applications cannot connect to the DDOT Collector.

**Cause**: This typically occurs due to port naming conflicts, incorrect port configurations, or when multiple services attempt to use the same ports.

**Resolution**:

The Datadog Operator automatically binds the OpenTelemetry Collector to ports `4317` (named `otel-grpc`) and `4318` (named `otel-http`) by default.

To explicitly override the default ports, use the `features.otelCollector.ports` parameter:

```yaml
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
```

{% alert level="warning" %}
When configuring ports `4317` and `4318`, you must use the default names `otel-grpc` and `otel-http` respectively to avoid port conflicts.
{% /alert %}

## Further reading{% #further-reading %}

- [OpenTelemetry Troubleshooting](https://opentelemetry.io/docs/collector/troubleshooting/)
