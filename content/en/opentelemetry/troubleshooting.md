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

## Infrastructure tags are missing from telemetry

**Symptom**: You have enabled the `infraattributes` processor in your DDOT Collector configuration, but Kubernetes-level tags (like `k8s.pod.name`, `k8s.namespace.name`, or pod labels) are not appearing on your traces, metrics, or logs.

**Cause**: The `infraattributes` processor requires specific resource attributes on incoming telemetry to identify the source container.

If the `container.id` resource attribute is not present on the input, the processor attempts to automatically detect it. The following methods are tried, in order from highest to lowest precedence:

| Resource attributes                              | Detection method                  |
|--------------------------------------------------|-----------------------------------|
| `process.pid` (int)                              | Based on container's external PID |
| `datadog.container.cgroup_inode` (int)           | Based on container's cgroup inode |
| `k8s.pod.uid` (str) + `k8s.container.name` (str) | Based on container's pod and name |

If your telemetry does not provide attributes for any of these detection methods, the processor cannot look up the corresponding Kubernetes metadata.

**Resolution**:

Ensure your telemetry includes the required attributes by following these steps in order:

1.  **Use SDK auto-instrumentation (Preferred)**: Upgrade to a recent version of your language's OpenTelemetry auto-instrumentation. This is the preferred first step, as it often provides `container.id` or `process.pid` automatically. If these attributes are not being added automatically, check your SDK's documentation. Some SDKs (such as Go) provide a specific setting (such as [resource.WithContainerID][8]) to enable this.

2.  **Manually set resource attributes**: If auto-instrumentation doesn't add the necessary attributes, set them manually using `OTEL_RESOURCE_ATTRIBUTES`. This allows the processor to use the `k8s.pod.uid` and `k8s.container.name` detection method. For example:
    ```yaml
    env:
      - name: OTEL_SERVICE_NAME
        value: {{ .Chart.Name }}
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
      - name: OTEL_K8S_POD_ID
        valueFrom:
          fieldRef:
            apiVersion: v1
            fieldPath: metadata.uid
      - name: OTEL_RESOURCE_ATTRIBUTES
        value: >-
          service.name=$(OTEL_SERVICE_NAME),
          k8s.namespace.name=$(OTEL_K8S_NAMESPACE),
          k8s.node.name=$(OTEL_K8S_NODE_NAME),
          k8s.pod.name=$(OTEL_K8S_POD_NAME),
          k8s.pod.uid=$(OTEL_K8S_POD_ID),
          k8s.container.name={{ .Chart.Name }},
          host.name=$(OTEL_K8S_NODE_NAME),
          deployment.environment.name=$(OTEL_K8S_NAMESPACE)
    ```
3.  **Use the Collector's `resourcedetection` processor**: If you cannot set resource attributes at the SDK or application level, you can use the Collector's `resourcedetection` processor. Place it before `infraattributes`.

4.  **Verify attributes**: Use the `debug` exporter in your DDOT Collector pipeline to confirm that the required resource attributes (like `container.id`, `process.pid`, or `k8s.pod.uid`) are present on your telemetry.

For more details on the attributes used by this processor, see the [Infrastructure Attribute Processor documentation][7].

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

## Missing metrics in Software Catalog and dashboards

**Symptom**: Metrics are not appearing in the Software Catalog and dashboards despite being properly collected.

**Cause**: This typically occurs due to incorrect or improperly mapped semantic conventions.

**Resolution**:

To verify the configuration:

1. Check that your metrics contain the required [semantic conventions][4].
2. Verify metric names follow OpenTelemetry naming conventions.
3. Confirm metrics are being properly translated to the Datadog format using the [metrics mapping reference][5].

<div class="alert alert-info">When working with semantic conventions, ensure you're following the latest OpenTelemetry specification for metric naming and attributes.</div>

## Port binding errors and connection failures

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

<div class="alert alert-danger">When configuring ports <code>4317</code> and <code>4318</code>, you must use the default names <code>otel-grpc</code> and <code>otel-http</code> respectively to avoid port conflicts.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /opentelemetry/schema_semantics/hostname/
[3]: /opentelemetry/schema_semantics/host_metadata/
[4]: /opentelemetry/schema_semantics/semantic_mapping/
[5]: /opentelemetry/schema_semantics/metrics_mapping/#metrics-mappings
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#readme
[7]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#readme
[8]: https://pkg.go.dev/go.opentelemetry.io/otel/sdk/resource#WithContainerID