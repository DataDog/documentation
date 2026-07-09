---
title: OTLP Intake for Managed Platforms
description: Send traces, metrics, and logs from managed platforms like Cloudflare, Vercel, and Heroku directly to Datadog through dedicated OTLP endpoints.
aliases:
  - /opentelemetry/setup/agentless/managed_platforms
further_reading:
  - link: "/opentelemetry/compatibility/"
    tag: "Documentation"
    text: "OpenTelemetry Compatibility in Datadog"
  - link: "/opentelemetry/setup/otlp_ingest/"
    tag: "Documentation"
    text: "Datadog OTLP Intake Endpoint"
---

## Overview

Datadog provides dedicated OTLP intake endpoints for managed platforms, allowing you to send traces, metrics, and logs directly to Datadog with minimal configuration. Each supported platform has its own OTLP subdomain (for example, `cloudflare.integrations.otlp.datadoghq.com`). These dedicated endpoints allow Datadog to identify the traffic source and apply platform-specific processing and attribution. The generic OTLP endpoint assumes a host is present, which can cause unexpected behavior for managed platform traffic.

Use this option when you run workloads on a managed platform where installing a [Datadog Agent][1] or [OpenTelemetry Collector][2] is not feasible. If your platform is not in the table below and you run on AWS, Azure, or GCP serverless compute, see [Serverless][5].

<div class="alert alert-danger">Host metadata sent to managed platform endpoints does not populate the <a href="/infrastructure/list/">Infrastructure Host List</a>.</div>

Each endpoint supports the following signal paths:

| Signal  | Path          |
|---------|---------------|
| Traces  | `/v1/traces`  |
| Metrics | `/v1/metrics` |
| Logs    | `/v1/logs`    |

For signal-specific configuration (metric translation, log processing), see the [Logs][6] and [Metrics][7] endpoint pages.

## Configuration

To send OTLP data to Datadog through a managed platform endpoint, configure your OpenTelemetry exporter with the following environment variables. Replace `{platform}` with your platform's subdomain from the [supported platforms](#supported-platforms) table.

```shell
export OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_ENDPOINT="https://{platform}.integrations.otlp.{{< region-param key="dd_site" >}}"
export OTEL_EXPORTER_OTLP_HEADERS="dd-api-key=${DD_API_KEY}"
```

To send only traces:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="https://{platform}.integrations.otlp.{{< region-param key="dd_site" >}}/v1/traces"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY}"
```

<div class="alert alert-info">Managed platform endpoints do not use the <code>dd-otlp-source</code> header. If you migrate from the generic OTLP endpoint, remove this header from your configuration.</div>

## Supported platforms

All endpoints follow the pattern `https://{subdomain}.integrations.otlp.{{< region-param key="dd_site" >}}/`.

| Platform | Subdomain | Setup guide |
|---|---|---|
| AWX | `awx` | — |
| Buildkite | `buildkite` | [Buildkite OpenTelemetry][10] |
| Claude | `claude` | — |
| Cloudflare | `cloudflare` | [Cloudflare Workers observability][11] |
| Cribl | `cribl` | — |
| GitHub Actions | `github-actions` | — |
| Grafbase | `grafbase` | [Grafbase observability][12] |
| Heroku | `heroku` | [Heroku telemetry][13] |
| IBM | `ibm` | — |
| LangSmith | `langsmith` | — |
| LiveCloudKit | `livekit` | — |
| Modal | `modal` | [Modal OpenTelemetry][14] |
| MuleSoft | `mulesoft` | [MuleSoft Telemetry Exporter][15] |
| Netlify | `netlify` | — |
| OpenTofu | `opentofu` | — |
| Retool | `retool` | [Retool performance monitoring][16] |
| RWX | `rwx` | — |
| Salesforce | `sfdc` | — |
| Shopify | `shopify` | — |
| Solace | `solace` | — |
| Spacelift | `spacelift` | — |
| Supabase | `supabase` | — |
| Svix | `svix` | — |
| Trigger.dev | `triggerdev` | — |
| Vercel | `vercel` | [Vercel Marketplace][17] |

To enable OTLP export from a managed platform not listed above, contact your Customer Success Manager.

## Limitations

### No metadata enrichment

Without a Collector or Agent, telemetry is not enriched with host metadata. Features that depend on this metadata (for example, the [Infrastructure Host List][8]) are unavailable. See the [OpenTelemetry compatibility list][4] for the full list of affected features.

### Limited normalization

Some signal processing that a Collector or Agent performs automatically does not happen with direct ingest. For example, cumulative-to-delta metric conversion requires a stateful component. If your platform exports cumulative metrics, configure your SDK or pipeline to export delta temporality.

### Trace metrics

[Trace metrics][3] are computed by default for managed platform endpoints. Managed platforms may sample traffic before export, which can affect trace metric accuracy.

### Sampling

Sampling controls available in the Collector (tail-based sampling, probabilistic sampling) are not available with direct ingest. Managed platforms may apply their own sampling before export.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/otlp_ingest_in_the_agent/
[2]: /opentelemetry/setup/collector_exporter/
[3]: /tracing/metrics/
[4]: /opentelemetry/compatibility/
[5]: /opentelemetry/setup/otlp_ingest/serverless/
[6]: /opentelemetry/setup/otlp_ingest/logs/
[7]: /opentelemetry/setup/otlp_ingest/metrics/
[8]: /infrastructure/list/
[10]: https://buildkite.com/docs/pipelines/integrations/observability/opentelemetry
[11]: https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/
[12]: https://grafbase.com/docs/gateway/observability
[13]: https://devcenter.heroku.com/articles/heroku-telemetry
[14]: https://modal.com/docs/guide/otel-integration
[15]: https://docs.mulesoft.com/monitoring/telemetry-exporter
[16]: https://docs.retool.com/apps/guides/observability/performance-monitoring
[17]: https://vercel.com/marketplace/datadog
