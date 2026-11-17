---
title: Metrics v3 Intake
description: "Learn how the Datadog Agent and DDOT send metrics in the compact v3 format, when they use the v2 format, and how to configure it."
further_reading:
- link: "/agent/configuration/dual-shipping/"
  tag: "Documentation"
  text: "Dual Shipping"
- link: "/agent/configuration/proxy/"
  tag: "Documentation"
  text: "Agent Proxy Configuration"
- link: "/opentelemetry/guide/native_otel_histograms/"
  tag: "Guide"
  text: "Send Native OpenTelemetry Histograms"
---

## Overview

The Datadog Agent and DDOT (the [DDOT Collector][1] and the [Agent's Collector][2]) send metrics to Datadog in one of two formats:

- **v3**: a compact format that sends repeated values, such as metric names and tags, one time per request instead of with every metric. This reduces outbound network traffic from your hosts to Datadog.
- **v2**: the previous format, used for destinations that don't accept v3.

The format affects only how metrics travel to Datadog. Your metrics, dashboards, and monitors stay the same.

## Default behavior

For Datadog URLs, v3 is on by default in these versions:

| Metric type | Datadog Agent | DDOT |
|---|---|---|
| Series (counts, gauges, and rates) | 7.81.0 and later | 7.84.0 and later |
| [Distributions][3] (including OpenTelemetry histograms) | 7.86.0 and later | 7.86.0 and later |

A Datadog URL is a URL on a [Datadog site][4] domain, such as `https://app.datadoghq.com`. Agent versions 7.86.0 and later also recognize other Datadog-owned URLs, such as PrivateLink endpoints. Earlier versions recognize only `https://app.<DD_SITE>`.

If you send traffic through a proxy with the `proxy` settings, metrics still use v3. In DDOT 7.84 and 7.85, series use v2 in this case.

**Note**: In Agent 7.81.0 and 7.81.1, v3 is on for every destination, including non-Datadog URLs.

## When v2 is used

The Agent and DDOT use v2 in these cases:

- **The destination URL isn't a Datadog URL**, such as the URL of a reverse proxy or a custom URL in `additional_endpoints`. To use v3 for that destination, see [Configure one destination](#configure-one-destination).
- **Metrics go to the Observability Pipelines Worker.** Distributions always use v2. To send series in v3 to Worker 2.26.0 or later, set `observability_pipelines_worker.metrics.use_v3_api.series` to `true`.
- **Metrics compression is zlib** (`serializer_compressor_kind: zlib`). The v3 format requires zstd, which is the default.

## Configuration

Two settings control the format, one for each metric type:

| Setting | Environment variable | Default |
|---|---|---|
| `use_v3_api.series.enabled` | `DD_USE_V3_API_SERIES_ENABLED` | `datadog_only` |
| `use_v3_api.distributions.enabled` | `DD_USE_V3_API_DISTRIBUTIONS_ENABLED` | `datadog_only` |

Each setting accepts these values:

`datadog_only`
: v3 for Datadog URLs, v2 for other URLs.

`true`
: v3 for every destination except the Observability Pipelines Worker. Use it only if all your destinations accept v3.

`false`
: v2 for every destination.

Any other value is treated as `false`, and the Agent logs a warning.

Set these options in the Agent configuration file (`datadog.yaml`) or as environment variables. DDOT uses the same settings. If you run the DDOT Collector without the Agent, set the environment variables on the Collector container.

### Turn off v3

In `datadog.yaml`:

```yaml
use_v3_api:
  series:
    enabled: false
  distributions:
    enabled: false
```

### Configure one destination

To override the global setting for one destination, add its URL to `use_v3_api.series.endpoints` or `use_v3_api.distributions.endpoints`. The URL must exactly match the URL in `dd_url` or `additional_endpoints`. For DDOT, use the metrics endpoint of the Datadog Exporter (`metrics::endpoint`), which defaults to `https://api.<DD_SITE>`.

For example, if a proxy at `https://metrics-proxy.example.com` forwards metrics to Datadog unchanged, in `datadog.yaml`:

```yaml
additional_endpoints:
  "https://metrics-proxy.example.com":
    - <API_KEY>

use_v3_api:
  series:
    endpoints:
      "https://metrics-proxy.example.com": true
  distributions:
    endpoints:
      "https://metrics-proxy.example.com": true
```

<div class="alert alert-warning">Turn on v3 only for destinations that accept it. A destination that doesn't accept v3 rejects the requests, for example, with HTTP 404 errors, and those metrics don't reach Datadog.</div>

## Check which format the Agent uses

Run the Agent [`status` command][5]. In the **Forwarder** section, **Successes By Endpoint** lists `series_v3` and `sketches_v3` (distributions) for metrics sent in v3, and `series_v2` and `sketches_v2` for metrics sent in v2. This output covers the Agent only, not DDOT.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/setup/ddot_collector/
[2]: /opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/
[3]: /metrics/distributions/
[4]: /getting_started/site/
[5]: /agent/configuration/agent-commands/#agent-information
