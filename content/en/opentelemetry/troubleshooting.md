---
title: Troubleshooting
further_reading:
- link: "https://opentelemetry.io/docs/collector/troubleshooting/"
  tag: "External Site"
  text: "OpenTelemetry Troubleshooting"
---

If you experience unexpected behavior using OpenTelemetry with Datadog, this guide may help you resolve the issue. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

## Different Kubernetes hostname and node name

When deploying in Kubernetes, if the hostname reported by Datadog does not match the expected node name, this is typically the result of missing `k8s.node.name` (and optionally `k8s.cluster.name`) tags.

To troubleshoot, make sure your application deployment and Collector are configured correctly.

Configure the `k8s.pod.ip` attribute for your application deployment: 

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

Enable the `k8sattributes` processor in your Collector:

```yaml
k8sattributes:
[...]
processors:
  - k8sattributes
```

For more information on host-identifying attributes, see [Mapping OpenTelemetry Semantic Conventions to Hostnames][2].

## Unexpected hostnames with AWS Fargate deployment

In AWS Fargate environments, an incorrect hostname might be reported for traces.

To troubleshoot, make sure to use the `resourcedetection` processor in your Collector configuration and enable the `ecs` detector.

```yaml
processors:
  resourcedetection:
    detectors: [env, ecs]
    timeout: 2s
    override: false
```

## Gateway collector not forwarding host metadata

In a gateway deployment, you may encounter issues with collecting and forwarding host metadata from agent collectors to Datadog.

To troubleshoot:

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

3. Verify that host metadata is being collected by agent collectors and properly forwarded through the gateway to Datadog.

For more information, see [Mapping OpenTelemetry Semantic Conventions to Infrastructure List Host Information][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /opentelemetry/schema_semantics/hostname/
[3]: /opentelemetry/schema_semantics/host_metadata/