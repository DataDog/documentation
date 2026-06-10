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

Datadog's OpenTelemetry protocol (OTLP) intake API endpoint allows you to send observability data directly to Datadog. With this feature, you don't need to run the [Datadog Agent][1] or [OpenTelemetry Collector + Datadog Exporter][2].

{{< img src="/opentelemetry/setup/direct-ingest.png" alt="Diagram: OpenTelemetry SDK sends data directly to Datadog through the intake endpoint." style="width:100%;" >}}

<div class="alert alert-danger">Host metadata sent to this endpoint will not populate the <a href="/infrastructure/list/">Infrastructure Host List</a>.</div>

<!-- TODO: Add Preview sign-up link once product provides it. -->

Your setup depends on where your telemetry is coming from. Some environments require a dedicated endpoint or additional headers before you configure signal-specific options. Check the [Managed platforms][6] list first; if your platform has a dedicated endpoint, use it. If not, use the serverless or signal-specific pages.

| If your telemetry comes from... | Start here |
|---|---|
| A managed platform (Cloudflare, Vercel, Heroku, Netlify, Modal, and [others][6]) | [Managed platforms][6] |
| A serverless environment sending traces (Lambda, ECS Fargate, Azure Functions, Cloud Run, GKE) | [Serverless Traces][7] (Preview) |
| Your own app, host, container, or OpenTelemetry Collector | [Logs][3], [Metrics][4], or Traces (in Preview; contact your Customer Success Manager) |

See also: [Instrumenting for Agent Observability][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/otlp_ingest_in_the_agent/
[2]: /opentelemetry/setup/collector_exporter/
[3]: /opentelemetry/setup/intake_endpoint/otlp_logs
[4]: /opentelemetry/setup/intake_endpoint/otlp_metrics
[5]: /llm_observability/instrumentation/otel_instrumentation/?tab=python#setup
[6]: /opentelemetry/setup/otlp_ingest/managed_platforms/
[7]: /opentelemetry/setup/otlp_ingest/serverless/
