---
title: NGINX Metrics
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/nginx_metrics.png" alt="OpenTelemetry NGINX metrics in a NGINX dashboard" style="width:100%;" >}}

The [NGINX receiver][1] collects NGINX metrics that populate the [NGINX Overview][4] dashboard.

For more information, see the OpenTelemetry project documentation for the [NGINX receiver][1].

## Setup

This example uses component identifiers from OpenTelemetry Collector Contrib v0.154.0. For other versions or distributions, use the identifiers that distribution supports.

The NGINX receiver reads the status page from the [`ngx_http_stub_status_module`][6] module. Before you start, enable the module and expose a status page.

Add the following lines to your Collector configuration, and set `endpoint` to the address of your status page:

```yaml
receivers:
  nginx:
    endpoint: http://localhost:80/status
```

Add `nginx` to the `receivers` list of the metrics pipeline in your configuration. Keep the processors already in that pipeline. The Datadog OTLP metrics intake accepts only delta metrics, and this receiver produces cumulative sums, so the pipeline needs `cumulativetodelta`. The [recommended Collector setup][5] includes it.

For all configuration options, see the [NGINX receiver documentation][1].

## Data collected

{{< mapping-table resource="nginx.csv">}}

For the full mapping between OpenTelemetry and Datadog metric names, see [OpenTelemetry Metrics Mapping][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/nginxreceiver
[2]: /opentelemetry/guide/metrics_mapping/
[4]: https://app.datadoghq.com/dash/integration/21/nginx---overview
[5]: /opentelemetry/setup/collector_exporter/
[6]: https://nginx.org/en/docs/http/ngx_http_stub_status_module.html
