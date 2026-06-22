---
title: Datadog Extension
further_reading:
- link: "/opentelemetry/setup/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
- link: "/infrastructure/list/"
  tag: "Documentation"
  text: "Infrastructure List"
- link: "/infrastructure/resource_catalog/"
  tag: "Documentation"
  text: "Resource Catalog"
---

## Overview

As of OpenTelemetry Collector Contrib [modules v0.129.0][4] and newer, the Datadog Extension is included in [contrib distributions][5] of OpenTelemetry Collector. It is also available for [custom builds][6] of OpenTelemetry Collector. In the [DDOT Collector][8], the extension is automatically enabled.

The Datadog Extension allows you to view OpenTelemetry Collector configuration and build information directly in Datadog using [Fleet Automation][7], the [Infrastructure List][2], and [Resource Catalog][3]. When used with the [Datadog Exporter][1], this extension gives you visibility into your Collector fleet without leaving the Datadog UI.

{{< img src="/agent/fleet_automation/fleet-automation-pipeline-view.png" alt="View OTel Collector configurations with Pipeline Visualization in Fleet Automation" style="width:100%;" >}}

## Key features

- **Collector Configuration Visibility**: View the complete configuration of any OTel Collector in your infrastructure.
- **Build Information**: See Collector version, build details, and component information.
- **Local Inspection Endpoint**: Use an HTTP endpoint for local debugging and configuration verification.
- **Fleet Management**: Monitor and manage your OpenTelemetry Collector fleet from the Datadog UI.

## Setup

<div class="alert alert-danger">If you use the <a href="/opentelemetry/setup/ddot_collector/">DDOT Collector</a>, do <strong>not</strong> manually configure the Datadog Extension. It is automatically enabled in all DDOT Collector versions.</div>

### 1. Add the Datadog Extension to your Collector configuration

Configure the Datadog Extension in your OpenTelemetry Collector configuration file:

```yaml
extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    # hostname: "my-collector-host"  # Optional: must match Datadog Exporter hostname if set

service:
  extensions: [datadog]
```

### 2. Configure the Datadog Exporter

This feature requires the Datadog Exporter to be configured and enabled in an active pipeline (`traces` or `metrics`). The extension uses the exporter's telemetry to associate the Collector's configuration with a specific host in Datadog.

```yaml
exporters:
  datadog/exporter:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    # hostname: "my-collector-host"  # Optional: must match Datadog Extension hostname if set
    sending_queue:
      batch:
        flush_timeout: 10s
```

### 3. Enable the extension in your service configuration

Add the Datadog Extension to your service extensions:

```yaml
service:
  extensions: [datadog]
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [datadog/exporter]
    metrics:
      receivers: [otlp]
      exporters: [datadog/exporter]
```

### 4. (Optional) Add custom resource attributes

The Datadog Extension automatically collects resource attributes from the Collector's internal telemetry and includes them in the metadata payload it sends to Datadog. To attach custom attributes such as deployment environment, team, or Kubernetes cluster name, set them under `service.telemetry.resource`:

```yaml
service:
  telemetry:
    resource:
      deployment.environment.name: production
      team.name: platform
      k8s.cluster.name: prod-us-east1-cluster-a
```

The Collector automatically attaches `service.name`, `service.version`, and `service.instance.id` (a randomly generated UUID) to its internal telemetry. You don't need to set these manually.

### 5. (Optional) Configure gateway topology (preview)

When you have an OpenTelemetry Collector gateway setup that forwards telemetry through one or more gateway Collectors before reaching Datadog, the Datadog Extension can publish the topology so it appears as a connected pipeline graph in [Fleet Automation][7]:

{{< img src="opentelemetry/integrations/datadog_extension_gateway_topology.png" alt="Gateway topology view in Fleet Automation showing DaemonSet Collectors forwarding through two layers of gateway Collectors to Datadog" style="width:100%;" >}}

To enable this view, configure each Collector in the pipeline:

- Set `deployment_type` to `daemonset` for agent or DaemonSet Collectors and `gateway` for gateway Collectors.
- Set `gateway_destination` on Collectors that forward to a downstream gateway. The value is the Kubernetes Service of the receiving gateway, in `<namespace>/<service>` form.
- Set `gateway_service` on gateway Collectors. The value is the Kubernetes Service that fronts the gateway pods.
- A **middle** gateway in a multi-layer pipeline sets **both** `gateway_service` (its own service) and `gateway_destination` (the next gateway).
- Set `k8s.cluster.name` under `service.telemetry.resource` on every Collector in the pipeline. This is **required**: together with `gateway_service` and `gateway_destination`, it forms the join key that Fleet Automation uses to reconstruct the pipeline graph.
- Enable Collector internal metrics so the extension can attribute logs, metrics, or traces volume data to each edge in the graph with the **Show traffic** toggle. See [OpenTelemetry Collector Health Metrics][10].

The example below covers the common two-layer case: a node-local DaemonSet forwards to a gateway Deployment, which sends to Datadog.

Each Collector exposes its own health metrics on a Prometheus pull endpoint via `service.telemetry.metrics`, scrapes that endpoint with a `prometheus/internal` receiver, and routes the result through the same metrics pipeline as application telemetry. This is what populates each node and edge in the topology view.

#### DaemonSet Collector

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  prometheus/internal:
    config:
      scrape_configs:
        - job_name: otelcol-internal
          scrape_interval: 10s
          static_configs:
            - targets: ['localhost:8888']

exporters:
  otlp:
    endpoint: otelcol-gateway.monitoring.svc.cluster.local:4317
    tls:
      insecure: true

extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    deployment_type: daemonset
    gateway_destination: monitoring/otelcol-gateway

service:
  telemetry:
    metrics:
      level: normal
      readers:
        - pull:
            exporter:
              prometheus:
                host: 0.0.0.0
                port: 8888
                without_type_suffix: true
                without_units: true
    resource:
      k8s.cluster.name: my-cluster
      k8s.node.name: ${env:K8S_NODE_NAME}
      k8s.pod.name: ${env:K8S_POD_NAME}
  extensions: [datadog]
  pipelines:
    metrics:
      receivers: [otlp, prometheus/internal]
      exporters: [otlp]
    traces:
      receivers: [otlp]
      exporters: [otlp]
    logs:
      receivers: [otlp]
      exporters: [otlp]
```

The DaemonSet's `metrics` pipeline includes `prometheus/internal` so the Collector's own health metrics travel over OTLP to the gateway alongside application telemetry, reaching Datadog through the gateway's Datadog Exporter.

#### Gateway Collector

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  prometheus/internal:
    config:
      scrape_configs:
        - job_name: otelcol-internal
          scrape_interval: 10s
          static_configs:
            - targets: ['localhost:8888']

exporters:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    metrics:
      resource_attributes_as_tags: true
    sending_queue:
      batch:
        flush_timeout: 10s

extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    deployment_type: gateway
    gateway_service: monitoring/otelcol-gateway

service:
  telemetry:
    metrics:
      level: normal
      readers:
        - pull:
            exporter:
              prometheus:
                host: 0.0.0.0
                port: 8888
                without_type_suffix: true
                without_units: true
    resource:
      k8s.cluster.name: my-cluster
      k8s.node.name: ${env:K8S_NODE_NAME}
      k8s.pod.name: ${env:K8S_POD_NAME}
  extensions: [datadog]
  pipelines:
    metrics:
      receivers: [otlp, prometheus/internal]
      exporters: [datadog]
    traces:
      receivers: [otlp]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      exporters: [datadog]
```

The gateway's `metrics` pipeline accepts both forwarded telemetry (from the DaemonSet over OTLP) and its own internal metrics from `prometheus/internal`, then exports everything to Datadog.

#### Multi-layer gateway pipelines

For pipelines with more than one gateway layer, set `gateway_service` and `gateway_destination` together on the middle layer. For example, in a three-layer topology with a Layer-2 gateway between the DaemonSet and a Layer-1 gateway, the Layer-2 gateway extension is configured as:

```yaml
extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    deployment_type: gateway
    gateway_service: monitoring/otelcol-gateway-l2
    gateway_destination: monitoring/otelcol-gateway-l1
```

The DaemonSet forwards to `monitoring/otelcol-gateway-l2`, the Layer-2 gateway forwards to `monitoring/otelcol-gateway-l1`, and the Layer-1 gateway sends to Datadog. Each Collector reports the same `k8s.cluster.name`.

## Configuration options

| Parameter | Description | Default |
|-----------|-------------|---------|
| `api.key` | Datadog API key (required). | - |
| `api.site` | Datadog site (for example, `us5.datadoghq.com`). | `datadoghq.com` |
| `api.fail_on_invalid_key` | Exit at startup if the API key is invalid. | `true` |
| `hostname` | Custom hostname for the Collector. | Auto-detected |
| `http.endpoint` | Local HTTP server endpoint. | `localhost:9875` |
| `http.path` | HTTP server path for metadata. | `/metadata` |
| `deployment_type` | Identifies how the Collector is deployed. This value appears in [Fleet Automation][7] and is required for [gateway topology](#5-optional-configure-gateway-topology-preview). One of: `gateway`, `daemonset`, or `unknown`. | `unknown` |
| `installation_method` | How the Collector was installed. One of: `kubernetes`, `bare-metal`, `docker`, `ecs-fargate`, `eks-fargate`, or unset. Available in Collector v0.148.0 and later. | unset |
| `gateway_service` | Set on **gateway** Collectors only. The Kubernetes Service fronting the gateway Collector pods. Format: `service` or `namespace/service`. Available in Collector v0.150.0 and later. | - |
| `gateway_destination` | Set on any Collector that forwards telemetry to a downstream gateway. The Kubernetes Service that this Collector forwards telemetry to. Must match `gateway_service` on the receiving gateway Collector. Format: `service` or `namespace/service`. Available in Collector v0.150.0 and later. | - |
| `proxy_url` | HTTP proxy URL for outbound requests. | - |
| `timeout` | Timeout for HTTP requests. | `30s` |
| `tls.insecure_skip_verify` | Skip TLS certificate verification. | `false` |

<div class="alert alert-danger">
<strong>Hostname Matching</strong>: If you specify a custom <code>hostname</code> in the Datadog Extension, it <strong>must</strong> match the <code>hostname</code> value in the Datadog Exporter configuration. The Datadog Extension does not have access to pipeline telemetry and cannot infer hostnames from incoming spans. It only obtains hostnames from system/cloud provider APIs or manual configuration. If telemetry has different <a href="/opentelemetry/config/hostname_tagging/?tab=host">hostname attributes</a> than the hostname reported by the extension, the telemetry will not be correlated to the correct host, and you may see duplicate hosts in Datadog.
</div>

### Complete configuration example

```yaml
extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    hostname: "my-collector-host"
    http:
      endpoint: "localhost:9875"
      path: "/metadata"
    proxy_url: "http://proxy.example.com:8080"
    timeout: 30s
    tls:
      insecure_skip_verify: false

exporters:
  datadog/exporter:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    hostname: "my-collector-host"
    sending_queue:
      batch:
        flush_timeout: 10s

service:
  extensions: [datadog]
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [datadog/exporter]
    metrics:
      receivers: [otlp]
      exporters: [datadog/exporter]
```

## Viewing Collector configuration

Once configured, you can view your OpenTelemetry Collector configuration and build information in various locations:

### Fleet Automation
1. Navigate to **[Integrations > Fleet Automation][7]**.
2. Filter for OTel Collector hosts using the Collector facets, then click a host.
3. In the side panel, select the **Info** tab to view build information.
4. Select the **Configurations** tab to view the full YAML file or a pipeline visualization of your OTel Collector configurations.

{{< img src="/agent/fleet_automation/fleet-automation-yaml-view.png" alt="View OTel Collector configuration YAMLs in Fleet Automation" style="width:100%;" >}}

### Infrastructure List (Host List)

1. Navigate to **[Infrastructure > Hosts][2]** in your Datadog account.
2. Click on any host running the OpenTelemetry Collector (**Note**: Filter by `field:apps:otel` to only show Collector instances).
3. In the host details panel, select the **OTel Collector** tab to see build info and full Collector configuration.

### Resource Catalog

1. Navigate to **[Infrastructure > Resource Catalog][3]** in your Datadog account
2. Filter for hosts or search for your Collector instances.
3. Click on any host running the OpenTelemetry Collector.
4. Scroll down to **Collector** to see build info and full Collector configuration.

## Local HTTP server

The Datadog Extension includes a local HTTP server for debugging and inspection:

```bash
# Access collector metadata locally
curl http://localhost:9875/metadata
```

This endpoint provides:
- Collector configuration (scrubbed of sensitive information)
- Build information and version details
- Active component list
- Extension status

## Troubleshooting

### Configuration not appearing in Datadog

1. **Check hostname matching**: Ensure hostnames match between the Datadog Extension and Datadog Exporter.
2. **Verify API key**: Confirm the API key is valid and has appropriate permissions.
3. **Check Collector logs**: Look for extension initialization and data submission logs.
4. **Confirm extension is enabled**: Verify the extension is listed in the service configuration.

### HTTP server issues

1. **Port conflicts**: Ensure port 9875 is available or configure a different port.
2. **Network access**: Verify the HTTP server is accessible from your debug location.
3. **Check logs**: Review extension logs for HTTP server startup issues.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: https://app.datadoghq.com/infrastructure
[3]: https://app.datadoghq.com/infrastructure/catalog
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.129.0
[5]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/tag/v0.129.1
[6]: https://opentelemetry.io/docs/collector/custom-collector/
[7]: https://app.datadoghq.com/fleet
[8]: /opentelemetry/setup/ddot_collector/
[10]: /opentelemetry/integrations/collector_health_metrics/
