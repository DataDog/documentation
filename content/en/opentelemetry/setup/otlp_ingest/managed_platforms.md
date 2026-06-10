---
title: Managed Platforms
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

Datadog provides dedicated OTLP intake endpoints for managed platforms, allowing you to send traces, metrics, and logs directly to Datadog with minimal configuration. Each supported platform has its own OTLP subdomain (for example, `cloudflare.integrations.otlp.datadoghq.com`).

Use this option when you run workloads on a managed platform where installing a [Datadog Agent][1] or [OpenTelemetry Collector][2] is not feasible. If your platform is not in the table below and you run on AWS, Azure, or GCP serverless compute, see [Serverless Traces][5].

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

To send only traces with [trace metrics][3] enabled:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="https://{platform}.integrations.otlp.{{< region-param key="dd_site" >}}/v1/traces"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},compute_stats=true"
```

<div class="alert alert-info">Managed platform endpoints do not use the <code>dd-otlp-source</code> header. If you previously configured this header on the generic OTLP endpoint, remove it. Managed platform endpoints silently drop it.</div>

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
<!-- TODO: Clarify what the gcp and gae managed platform endpoints cover vs. Cloud Run/Functions/GKE on the serverless page. A Cloud Run user could pick either path and get a different endpoint. -->
| Google App Engine | `gae` | — |
| Google Cloud | `gcp` | — |
| Grafbase | `grafbase` | [Grafbase observability][12] |
| Heroku | `heroku` | [Heroku telemetry][13] |
| IBM | `ibm` | — |
| LangSmith | `langsmith` | — |
| LiveCloudKit | `livecloudkit` | — |
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

## Limitations

### No client-side buffering or retry

Because there is no client-side component, managed platform endpoints do not support buffering, batching, or retry logic. If network connectivity drops or traffic spikes, data loss may occur. The [OpenTelemetry Collector][2] and [Datadog Agent][1] handle these scenarios automatically.

### Trace metrics

Trace metrics are not computed by default because traffic from managed platforms may already be sampled at the source. To enable trace metrics, add `compute_stats=true` to your exporter headers.

### Feature coverage

Some Datadog features depend on metadata added by the Collector or Agent (for example, the Infrastructure Host List). See the [OpenTelemetry compatibility list][4] for features that are unavailable when using direct ingest endpoints.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/otlp_ingest_in_the_agent/
[2]: /opentelemetry/setup/collector_exporter/
[3]: /tracing/metrics/
[4]: /opentelemetry/compatibility/
[5]: /opentelemetry/setup/otlp_ingest/serverless/
[6]: /opentelemetry/setup/otlp_ingest/logs/
[7]: /opentelemetry/setup/otlp_ingest/metrics/
[10]: https://buildkite.com/docs/pipelines/integrations/observability/opentelemetry
[11]: https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/
[12]: https://grafbase.com/docs/gateway/observability
[13]: https://devcenter.heroku.com/articles/heroku-telemetry
[14]: https://modal.com/docs/guide/otel-integration
[15]: https://docs.mulesoft.com/monitoring/telemetry-exporter
[16]: https://docs.retool.com/apps/guides/observability/performance-monitoring
[17]: https://vercel.com/marketplace/datadog
