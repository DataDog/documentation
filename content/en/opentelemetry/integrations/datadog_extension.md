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

<div class="alert alert-info">The Datadog Extension is in Preview.</div>

As of OpenTelemetry Collector Contrib [modules v0.129.0][4] and newer, the Datadog Extension is included in [contrib distributions][5] of OpenTelemetry Collector. It is also available for [custom builds][6] of OpenTelemetry Collector.

The Datadog Extension allows you to view OpenTelemetry Collector configuration and build information directly within Datadog on the [Infrastructure List][2] and [Resource Catalog][3]. When used with the [Datadog Exporter][1], this extension gives you visibility into your Collector fleet without leaving the Datadog UI.

{{< img src="/opentelemetry/integrations/datadog_extension_hostlist.png" alt="OpenTelemetry Collector configuration shown in Datadog Host List" style="width:100%;" >}}

## Key features

- **Collector Configuration Visibility**: View the complete configuration for any Collector in your infrastructure.
- **Build Information**: See Collector version, build details, and component information.
- **Fleet Management**: Monitor and manage your OpenTelemetry Collector fleet from the Datadog UI.
- **Local Inspection Endpoint**: Use an HTTP endpoint for local debugging and configuration verification.

## Setup

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

## Configuration options

| Parameter | Description | Default |
|-----------|-------------|---------|
| `api.key` | Datadog API key (required) | - |
| `api.site` | Datadog site (for example, `us5.datadoghq.com`) | `datadoghq.com` |
| `hostname` | Custom hostname for the Collector | Auto-detected |
| `http.endpoint` | Local HTTP server endpoint | `localhost:9875` |
| `http.path` | HTTP server path for metadata | `/metadata` |
| `proxy_url` | HTTP proxy URL for outbound requests | - |
| `timeout` | Timeout for HTTP requests | `30s` |
| `tls.insecure_skip_verify` | Skip TLS certificate verification | `false` |

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

## Viewing Collector configuration

Once configured, you can view your OpenTelemetry Collector configuration and build information in two locations:

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
