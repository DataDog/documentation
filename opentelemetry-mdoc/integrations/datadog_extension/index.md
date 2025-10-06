---
title: Datadog Extension
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Integrations > Datadog Extension
---

# Datadog Extension

## Overview{% #overview %}

{% alert level="info" %}
The Datadog Extension is in Preview.
{% /alert %}

The Datadog Extension allows you to view OpenTelemetry Collector configuration and build information directly within Datadog on the [Infrastructure List](https://app.datadoghq.com/infrastructure) and [Resource Catalog](https://app.datadoghq.com/infrastructure/catalog). When used with the [Datadog Exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter), this extension gives you visibility into your Collector fleet without leaving the Datadog UI.

{% image
   source="http://localhost:1313/images/opentelemetry/integrations/datadog_extension_hostlist.d1af05f71adbc1917e9357ec3f7333b0.png?auto=format"
   alt="OpenTelemetry Collector configuration shown in Datadog Host List" /%}

## Key features{% #key-features %}

- **Collector Configuration Visibility**: View the complete configuration for any Collector in your infrastructure.
- **Build Information**: See Collector version, build details, and component information.
- **Fleet Management**: Monitor and manage your OpenTelemetry Collector fleet from the Datadog UI.
- **Local Inspection Endpoint**: Use an HTTP endpoint for local debugging and configuration verification.

## Setup{% #setup %}

### 1. Add the Datadog Extension to your Collector configuration

Configure the Datadog Extension in your OpenTelemetry Collector configuration file:

```yaml
extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: 
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
      site: 
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

## Configuration options{% #configuration-options %}

| Parameter                  | Description                                     | Default          |
| -------------------------- | ----------------------------------------------- | ---------------- |
| `api.key`                  | Datadog API key (required)                      | -                |
| `api.site`                 | Datadog site (for example, `us5.datadoghq.com`) | `datadoghq.com`  |
| `hostname`                 | Custom hostname for the Collector               | Auto-detected    |
| `http.endpoint`            | Local HTTP server endpoint                      | `localhost:9875` |
| `http.path`                | HTTP server path for metadata                   | `/metadata`      |
| `proxy_url`                | HTTP proxy URL for outbound requests            | -                |
| `timeout`                  | Timeout for HTTP requests                       | `30s`            |
| `tls.insecure_skip_verify` | Skip TLS certificate verification               | `false`          |

{% alert level="warning" %}
**Hostname Matching**: If you specify a custom `hostname` in the Datadog Extension, it **must** match the `hostname` value in the Datadog Exporter configuration. The Datadog Extension does not have access to pipeline telemetry and cannot infer hostnames from incoming spans. It only obtains hostnames from system/cloud provider APIs or manual configuration. If telemetry has different [hostname attributes](http://localhost:1313/opentelemetry/config/hostname_tagging/?tab=host) than the hostname reported by the extension, the telemetry will not be correlated to the correct host, and you may see duplicate hosts in Datadog.
{% /alert %}

### Complete configuration example{% #complete-configuration-example %}

```yaml
extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: 
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
      site: 
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

## Viewing Collector configuration{% #viewing-collector-configuration %}

Once configured, you can view your OpenTelemetry Collector configuration and build information in two locations:

### Infrastructure List (Host List){% #infrastructure-list-host-list %}

1. Navigate to **[Infrastructure > Hosts](https://app.datadoghq.com/infrastructure)** in your Datadog account.
1. Click on any host running the OpenTelemetry Collector (**Note**: Filter by `field:apps:otel` to only show Collector instances).
1. In the host details panel, select the **OTel Collector** tab to see build info and full Collector configuration.

### Resource Catalog{% #resource-catalog %}

1. Navigate to **[Infrastructure > Resource Catalog](https://app.datadoghq.com/infrastructure/catalog)** in your Datadog account
1. Filter for hosts or search for your Collector instances.
1. Click on any host running the OpenTelemetry Collector.
1. Scroll down to **Collector** to see build info and full Collector configuration.

## Local HTTP server{% #local-http-server %}

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

## Troubleshooting{% #troubleshooting %}

### Configuration not appearing in Datadog{% #configuration-not-appearing-in-datadog %}

1. **Check hostname matching**: Ensure hostnames match between the Datadog Extension and Datadog Exporter.
1. **Verify API key**: Confirm the API key is valid and has appropriate permissions.
1. **Check Collector logs**: Look for extension initialization and data submission logs.
1. **Confirm extension is enabled**: Verify the extension is listed in the service configuration.

### HTTP server issues{% #http-server-issues %}

1. **Port conflicts**: Ensure port 9875 is available or configure a different port.
1. **Network access**: Verify the HTTP server is accessible from your debug location.
1. **Check logs**: Review extension logs for HTTP server startup issues.

## Further reading{% #further-reading %}

- [Setting Up the OpenTelemetry Collector](http://localhost:1313/opentelemetry/setup/collector_exporter/)
- [Infrastructure List](http://localhost:1313/infrastructure/list/)
- [Resource Catalog](http://localhost:1313/infrastructure/resource_catalog/)
