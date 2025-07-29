---
title: Datadog Extension
aliases:
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

<div class="alert alert-info">The Datadog Extension is in Preview and is subject to change.</div>

The Datadog Extension enables OpenTelemetry Collector configuration and build information to be viewed in the Datadog Infrastructure Monitoring application. When configured with the [Datadog Exporter][1], this extension provides visibility into your collector fleet directly within the Datadog UI.

{{< img src="/opentelemetry/integrations/datadog_extension_hostlist.png" alt="OpenTelemetry Collector configuration shown in Datadog Host List" style="width:100%;" >}}

## Key Features

- **Collector Configuration Visibility**: View complete collector configuration in the Infrastructure List and Resource Catalog
- **Build Information**: Display collector version, build details, and component information
- **Fleet Management**: Monitor and manage your OpenTelemetry Collector fleet from the Datadog UI
- **Local Inspection**: HTTP server endpoint for local debugging and configuration inspection

## Setup

### 1. Add the Datadog Extension to your collector configuration

Configure the Datadog Extension in your OpenTelemetry Collector configuration file:

```yaml
extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    hostname: "my-collector-host"  # Optional: must match Datadog Exporter hostname if set

service:
  extensions: [datadog]
```

### 2. Configure the Datadog Exporter

Ensure your collector is also configured with the Datadog Exporter:

```yaml
exporters:
  datadog/exporter:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    hostname: "my-collector-host"  # Optional: must match Datadog Extension hostname if set
```

### 3. Enable the extension in your service configuration

Add the Datadog Extension to your service extensions:

```yaml
service:
  extensions: [datadog]
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog/exporter]
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog/exporter]
```

## Configuration Options

| Parameter | Description | Default |
|-----------|-------------|---------|
| `api.key` | Datadog API key (required) | - |
| `api.site` | Datadog site (e.g., `us5.datadoghq.com`) | `datadoghq.com` |
| `hostname` | Custom hostname for the collector | Auto-detected |
| `http.endpoint` | Local HTTP server endpoint | `localhost:9875` |
| `http.path` | HTTP server path for metadata | `/metadata` |
| `proxy_url` | HTTP proxy URL for outbound requests | - |
| `timeout` | Timeout for HTTP requests | `30s` |
| `tls.insecure_skip_verify` | Skip TLS certificate verification | `false` |

### Complete Configuration Example

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

service:
  extensions: [datadog]
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog/exporter]
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog/exporter]
```

## Viewing Collector Configuration

Once configured, you can view your OpenTelemetry Collector configuration and build information in two locations:

### Infrastructure List (Host List)

1. Navigate to **Infrastructure > Hosts** in your Datadog account
2. Click on any host running the OpenTelemetry Collector (note: filtering by `field:apps:otel` will show only collector instances)
3. In the host details panel, select the **OTel Collector** tab
4. View the build info and full collector configuration

### Resource Catalog

1. Navigate to **Infrastructure > Resource Catalog** in your Datadog account
2. Filter for hosts or search for your collector instances
3. Click on any host running the OpenTelemetry Collector
4. Scroll down to **Collector** to view build info and full configuration

## Local HTTP Server

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

## Important Notes

<div class="alert alert-warning">
<strong>Hostname Matching</strong>: If you specify a custom <code>hostname</code> in the Datadog Extension, it must match the <code>hostname</code> value in the Datadog Exporter configuration. If left unset in both components, the auto-detected hostname will match correctly. It should also match any <a href="/opentelemetry/config/hostname_tagging/?tab=host">hostname telemetry resource attributes</a> on telemetry received by the Exporter to ensure full correlation throughout the Datadog application.
</div>

<div class="alert alert-info">
<strong>Pipeline Configuration</strong>: For OpenTelemetry Collectors to appear in the Infrastructure List and Resource Catalog, the <a href="/opentelemetry/setup/collector_exporter/">Datadog Exporter</a> must be configured in either the traces pipeline, the metrics pipeline, or both. A future update to the Datadog Exporter will enable compatibility between the Datadog Extension and logs-only OpenTelemetry Collector deployments.
</div>

## Troubleshooting

### Configuration Not Appearing

1. **Check hostname matching**: Ensure hostnames match between Datadog Extension and Datadog Exporter
2. **Verify API key**: Confirm the API key is valid and has appropriate permissions
3. **Check collector logs**: Look for extension initialization and data submission logs
4. **Confirm extension is enabled**: Verify the extension is listed in the service configuration

### HTTP Server Issues

1. **Port conflicts**: Ensure port 9875 is available or configure a different port
2. **Network access**: Verify the HTTP server is accessible from your debug location
3. **Check logs**: Review extension logs for HTTP server startup issues

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
