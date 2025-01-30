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

For more information on host-identifying attributes, see [Mapping OpenTelemetry Semantic Conventions to Hostnames][2].

### Unexpected hostnames with AWS Fargate deployment

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

### Gateway collector not forwarding host metadata

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

For more information, see [Mapping OpenTelemetry Semantic Conventions to Infrastructure List Host Information][3].

### The same host shows up multiple times under different names

**Symptom**: A single host appears under multiple names in Datadog. For example, you might see one entry from the OpenTelemetry Collector (with the OTel logo) and another from the Datadog Agent.

**Cause**: When a host is monitored through more than one ingestion method (for example, OTLP + Datadog Agent, or DogStatsD + OTLP) without aligning on a single hostname resource attribute, Datadog treats each path as a separate host.

**Resolution**:
1. Identify all active telemetry ingestion paths sending data from the same machine to Datadog.
2. Choose a single hostname source and decide whether you want to rely on the Datadog Agent's hostname or a specific resource attribute (for example, `k8s.node.name`).
3. Configure each path (Agent, Collector, etc.) so that they report a consistent hostname. For example, if you're setting the hostname with OTLP attributes, configure your transform processor:
    ```yaml
    processors:
      transform:
        trace_statements:
          - context: resource
            statements:
              - set(attributes["datadog.host.name"], "shared-hostname")
    ```
4. Validate in Datadog (Infrastructure List, host map, etc.) to confirm the host now appears under a single name.

## Host tag delays after startup

**Symptom**: You may experience a delay in host tags appearing on your telemetry data after starting the Datadog Agent or OpenTelemetry Collector. This delay typically lasts under 10 minutes but can extend up to 40-50 minutes in some cases.

**Cause**: This delay occurs because host metadata must be processed and indexed by Datadog's backend before tags can be associated with telemetry data.

**Resolution**:

Host tags configured in either the Datadog exporter configuration (`host_metadata::tags`) or the Datadog Agent's `tags` section are not immediately applied to telemetry data. The tags eventually appear after the backend resolves the host metadata.

Choose your setup for specific instructions:

{{< tabs >}}
{{% tab "Datadog Agent OTLP Ingestion" %}}

Configure `expected_tags_duration` in `datadog.yaml` to bridge the gap until host tags are resolved:

```yaml
expected_tags_duration: "15m"
```

This configuration adds the expected tags to all telemetry for the specified duration (in this example, 15 minutes).

{{% /tab %}}

{{% tab "OpenTelemetry Collector" %}}

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

{{% /tab %}}
{{< /tabs >}}

## Unable to map 'team' attribute to Datadog team tag

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

<div class="alert alert-info">Replace <code>resource.attributes["team"]</code> with the actual attribute name if different in your setup (for example, <code>resource.attributes["arm.team.name"]</code>).</div>

To verify the configuration:

1. Restart the OpenTelemetry Collector to apply the changes.
2. Generate test logs and traces.
3. Check if the team tag appears in your Datadog logs and traces.
4. Verify that the team tag functions as expected in filtering and dashboards.

## Container tags not appearing on Containers page

**Symptom**: Container tags are not appearing on the Containers page in Datadog, which affects container monitoring and management capabilities.

**Cause**: This occurs when container resource attributes aren't properly mapped to Datadog's expected container metadata format.

**Resolution**:

When using OTLP ingestion in the Datadog Agent, you need to set specific resource attributes to ensure proper container metadata association. For more information, see [Resource Attribute Mapping][4].

To verify the configuration:

1. Check the raw trace data to confirm that container IDs and tags are properly translated into Datadog format (for example, `container.id` should become `container_id`).
2. Verify that container metadata appears on the Containers page.

## Missing metrics in Service Catalog and dashboards

**Symptom**: Metrics are not appearing in the Service Catalog and dashboards despite being properly collected.

**Cause**: This typically occurs due to incorrect or improperly mapped semantic conventions.

**Resolution**:

To verify the configuration:

1. Check that your metrics contain the required [semantic conventions][4].
2. Verify metric names follow OpenTelemetry naming conventions.
3. Confirm metrics are being properly translated to the Datadog format using the [metrics mapping reference][5].

<div class="alert alert-info">When working with semantic conventions, ensure you're following the latest OpenTelemetry specification for metric naming and attributes.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /opentelemetry/schema_semantics/hostname/
[3]: /opentelemetry/schema_semantics/host_metadata/
[4]: /opentelemetry/schema_semantics/semantic_mapping/
[5]: /opentelemetry/schema_semantics/metrics_mapping/#metrics-mappings