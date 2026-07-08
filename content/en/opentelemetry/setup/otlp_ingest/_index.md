---
title: Datadog OTLP Intake Endpoint
aliases:
- /opentelemetry/setup/intake_endpoint/
- /opentelemetry/setup/agentless/
further_reading:
- link: "/opentelemetry/setup"
  tag: "Documentation"
  text: "Send Data to Datadog"
---

## Overview

For production workloads, Datadog recommends sending OpenTelemetry data through a [Datadog Agent][1] or [OpenTelemetry Collector with the Datadog Exporter][2]. These components provide metadata enrichment, signal normalization, and centralized sampling.

<div class="alert alert-info">You can also send data from an OpenTelemetry Collector without Datadog-specific components. This experience is <a href="https://www.datadoghq.com/product-preview/otel-native-instrumentation/">in Preview</a>.</div>

Use the direct OTLP intake endpoints on this page when deploying a Collector or Agent is not feasible. Examples include serverless functions, managed platforms that export telemetry on your behalf, and environments with strict resource constraints.

{{< img src="/opentelemetry/setup/direct-ingest.png" alt="Diagram: OpenTelemetry SDK sends data directly to Datadog through the intake endpoint." style="width:100%;" >}}

<div class="alert alert-danger">Host metadata sent to this endpoint does not populate the <a href="/infrastructure/list/">Infrastructure Host List</a>.</div>

Your setup depends on where your telemetry is coming from. Check the [Managed platforms][6] list first; if your platform has a dedicated endpoint, use it. Otherwise, use the serverless or signal-specific pages.

| If your telemetry comes from... | Start here |
|---|---|
| A managed platform (Cloudflare, Vercel, Heroku, Netlify, Modal, and [others][6]) | [Managed platforms][6] |
| A serverless environment sending traces (Lambda, ECS Fargate, Azure Functions, Cloud Run, GKE Autopilot) | [Serverless][7] |
| Your own app, host, or container | [Logs][3], [Metrics][4], or [Traces][8] |

See also: [Instrumenting for Agent Observability][5].

## Intake limits

Datadog enforces a maximum payload size per request on each OTLP intake endpoint. Requests that exceed the limit are rejected with an `HTTP 413 Request Entity Too Large` response. If you receive a 413, reduce the export batch size or flush more frequently so each request stays under the limit.

| Signal  | Endpoint path   | Maximum payload size    |
|---------|-----------------|-------------------------|
| Metrics | `/v1/metrics`   | 512 KiB (compressed)    |
| Logs    | `/v1/logs`      | 5.1 MiB (uncompressed)  |
| Traces  | `/v1/traces`    | 15 MiB (uncompressed)   |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/otlp_ingest_in_the_agent/
[2]: /opentelemetry/setup/collector_exporter/
[3]: /opentelemetry/setup/otlp_ingest/logs/
[4]: /opentelemetry/setup/otlp_ingest/metrics/
[5]: /llm_observability/instrumentation/otel_instrumentation/?tab=python#setup
[6]: /opentelemetry/setup/otlp_ingest/managed_platforms/
[7]: /opentelemetry/setup/otlp_ingest/serverless/
[8]: /opentelemetry/setup/otlp_ingest/traces/
