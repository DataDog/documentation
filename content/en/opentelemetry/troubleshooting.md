---
title: Troubleshooting
further_reading:
- link: "https://opentelemetry.io/docs/collector/troubleshooting/"
  tag: "External Site"
  text: "OpenTelemetry Troubleshooting"
---

If you experience unexpected behavior using OpenTelemetry with Datadog, this guide may help you resolve the issue. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

## Incorrect or unexpected hostnames

When using OpenTelemetry with Datadog, you might encounter various hostname-related issues. The following sections cover common scenarios and their solutions.

### Different Kubernetes hostname and node name

**Symptom**: When deploying in Kubernetes, the hostname reported by Datadog does not match the expected node name. This is typically the result of missing `k8s.node.name` (and optionally `k8s.cluster.name`) tags.

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

2. Enable the `k8sattributes` processor in your Collector:

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

**Note**: When overriding hostnames, consider:
- Potential impacts on billing if using more granular hostname assignments
- Effects on correlation between different types of telemetry
- Consistency across your observability pipeline

For more information on host-identifying attributes, see [Mapping OpenTelemetry Semantic Conventions to Hostnames][2].

### Unexpected hostnames with AWS Fargate deployment

**Symptom**: In AWS Fargate environments, an incorrect hostname might be reported for traces.

**Resolution**:

Configure the `resourcedetection` processor in your Collector configuration and enable the `ecs` detector:

```yaml
processors:
  resourcedetection:
    detectors: [env, ecs]
    timeout: 2s
    override: false
```

### Gateway collector not forwarding host metadata

**Symptom**: In a gateway deployment, telemetry from multiple hosts appears to come from a single host, or host metadata isn't being properly forwarded.

**Resolution**:

1. Configure agent collectors to collect and forward host metadata:

   ```yaml
   processors:
     resourcedetection:
       detectors: [system, env]
     k8sattributes:
       passthrough: true
   ```

2. Configure the gateway collector to extract and forward necessary metadata:

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

3. Enable monitoring for missing hostname attributes:

   ```yaml
   service:
     telemetry:
       metrics:
         level: detailed
   ```

   This enables the `otelcol_datadog_otlp_translator_resources_missing_source` metric to track resources missing hostname-identifying attributes.

For more information, see [Mapping OpenTelemetry Semantic Conventions to Infrastructure List Host Information][3].

## Host tag delays after startup

You may experience a delay in host tags appearing on your telemetry data after starting the Datadog Agent or OpenTelemetry Collector. This delay typically lasts under 10 minutes but can extend up to 40-50 minutes in some cases.

### Symptom

Host tags configured in either the Datadog exporter configuration (`host_metadata::tags`) or the Datadog Agent's `tags` section are not immediately applied to telemetry data. The tags eventually appear after the backend resolves the host metadata.

### Resolution

#### For Datadog Agent OTLP ingestion

Configure the `expected_tags_duration` parameter to bridge the gap until host tags are resolved:

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
    expected_tags_duration: "15m"
```

This configuration adds the expected tags to all telemetry for the specified duration (in this example, 15 minutes).

#### For OpenTelemetry Collector

Use the `transform` processor to set your host tags as OTLP attributes. For example, to add environment and team tags:

```yaml
processors:
  transform:
    trace_statements:
      - context: resource
        statements:
          - set(attributes["env"], "prod")
          - set(attributes["team"], "backend")
    metric_statements:
      - context: resource
        statements:
          - set(attributes["env"], "prod")
          - set(attributes["team"], "backend")
    log_statements:
      - context: resource
        statements:
          - set(attributes["env"], "prod")
          - set(attributes["team"], "backend")
```

This approach adds the tags permanently as standard OTLP attributes, following OpenTelemetry protocol conventions.

## Unable to map 'team' attribute to Datadog team tag

**Symptom**: The team tag is not appearing in Datadog for logs and traces, despite being set as a resource attribute in OpenTelemetry configurations.

**Resolution**:

Use the OpenTelemetry Collector's transform processor to map the team resource attribute to the ddtags attribute:

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

**Note**: Replace `resource.attributes["team"]` with the actual attribute name if different in your setup (e.g., `resource.attributes["arm.team.name"]`).

To verify the configuration:

1. Restart the OpenTelemetry Collector to apply the changes.
2. Generate test logs and traces.
3. Check if the team tag appears in your Datadog logs and traces.
4. Verify that the team tag functions as expected in filtering and dashboards.

### Container tags not appearing in Containers page

**Symptom**: Container tags are not appearing on the Containers page in Datadog, which affects container monitoring and management capabilities.

**Resolution**:

When using OTLP ingestion in the Datadog Agent, you need to set specific resource attributes to ensure proper container metadata association. Configure one of the following resource attributes:

- `container.id` ([Resource Semantic Conventions][4])
- `k8s.node.uid` ([Resource Semantic Conventions][5])

To verify the configuration:

1. Check the raw trace data to confirm that container IDs and tags are properly translated into Datadog format (for example, `container.id` should become `container_id`).
2. Verify that container metadata appears in the `meta._dd.tags.container` object.

## Missing metrics in Service Catalog and dashboards

**Symptom**: Metrics are not appearing in the Service Catalog and dashboards despite being properly collected. This typically occurs due to incorrect or improperly mapped semantic conventions.

**Resolution**:

[TODO Input Needed: Specific semantic convention mappings and configuration examples]

To verify the configuration:

1. Check that your metrics contain the required semantic conventions
2. Verify metric names follow OpenTelemetry naming conventions
3. Confirm metrics are being properly translated to Datadog format

**Note**: When working with semantic conventions, ensure you're following the latest OpenTelemetry specification for metric naming and attributes.

## Logs and traces correlation issues

**Symptom**: Logs and traces are not properly correlated in the Datadog UI due to a mismatch between `service.name` and `service` identifiers.

**Resolution**:

1. Configure a pipeline processor in the Datadog Logs UI:
   ```yaml
   processors:
     - type: attribute_remapper
       sources:
         - attributes["service.name"]
       target: service
   ```

2. If using the OpenTelemetry Collector, ensure consistent service naming:
   ```yaml
   processors:
     transform:
       log_statements:
         - context: resource
           statements:
             - set(attributes["service"], resource.attributes["service.name"])
   ```

To verify the configuration:

1. Generate test logs and traces for your service
2. Navigate to a trace in the Datadog UI
3. Click on a span and verify that related logs appear in the side panel
4. Confirm that the service name matches between logs and traces

**Note**: Service name consistency is crucial for proper correlation. Ensure that your logging and tracing configurations use identical service naming conventions across your observability pipeline.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /opentelemetry/schema_semantics/hostname/
[3]: /opentelemetry/schema_semantics/host_metadata/
[4]: https://opentelemetry.io/docs/reference/specification/resource/semantic_conventions/container/
[5]: https://opentelemetry.io/docs/reference/specification/resource/semantic_conventions/container/