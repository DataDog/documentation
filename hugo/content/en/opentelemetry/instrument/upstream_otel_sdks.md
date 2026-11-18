---
title: Using Upstream OTel SDKs
description: Deploy upstream OpenTelemetry SDKs with the OpenTelemetry Operator, application builds, or deployment automation, and send telemetry to Datadog.
aliases:
    - /opentelemetry/instrument/otel_sdks/
further_reading:
    - link: 'https://opentelemetry.io/docs/languages/'
      text: 'OpenTelemetry language SDKs'
      tag: 'External Site'
    - link: '/opentelemetry/setup/'
      text: 'Send OpenTelemetry data to Datadog'
      tag: 'Documentation'
    - link: '/opentelemetry/compatibility/'
      text: 'OpenTelemetry feature compatibility'
      tag: 'Documentation'
---

Upstream OpenTelemetry SDKs use the API, SDK, and instrumentation maintained by the OpenTelemetry project. They follow the community project's release life cycle and export telemetry with OTLP.

## Deployment methods

An existing upstream OpenTelemetry SDK can send telemetry to Datadog without being replaced. For a new installation, follow the OpenTelemetry documentation for your environment and language.

| Environment | Method | Best for |
|---|---|---|
| Kubernetes | [OpenTelemetry Operator][3] | Centrally managed auto-instrumentation and configuration through Kubernetes resources and workload annotations. |
| Kubernetes, other containers, hosts, or serverless | [Language-specific SDK installation][4] | Installing the SDK or auto-instrumentation in the application build or deployment. |

## Choose how telemetry reaches Datadog

The SDK installation method and telemetry route are independent decisions.

| Route | Use when | Considerations |
|---|---|---|
| [DDOT or an upstream OpenTelemetry Collector][7] | You need centralized batching, enrichment, transformation, sampling, or routing. | Configure the SDK's OTLP exporter to reach the Collector. Install and operate the Collector separately from the application SDK. |
| [Datadog Agent OTLP endpoint][8] | You already run the Agent and want a local OTLP receiver without managing a separate pipeline. | The application must be able to reach the Agent endpoint. Review feature compatibility for this route. |
| [Direct OTLP ingest][9] | An intermediary is impractical, such as in supported serverless or managed environments. | Configure authentication and required resource attributes in the workload. Centralized Collector processing is not available. |

With a Collector, the telemetry pipeline is:

{{< img src="/opentelemetry/setup/oss-collector.png" alt="An upstream OpenTelemetry SDK sends OTLP data to an OpenTelemetry Collector, which processes and exports the data to Datadog." style="width:100%;" >}}

The Collector receives OTLP data, applies configured processors such as batching or resource enrichment, and exports the result to Datadog. It is not required for every upstream SDK deployment.

## View your telemetry

View your application's traces in [Trace Explorer][10], metrics in [Metrics Explorer][11], and logs in [Log Explorer][12]. For missing telemetry, see [OpenTelemetry troubleshooting][13].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://opentelemetry.io/docs/platforms/kubernetes/operator/automatic/
[4]: https://opentelemetry.io/docs/languages/
[7]: /opentelemetry/setup/
[8]: /opentelemetry/setup/agent/#otlp-ingest-in-the-agent
[9]: /opentelemetry/setup/otlp_ingest/
[10]: /tracing/trace_explorer/
[11]: /metrics/explorer/
[12]: /logs/explorer/
[13]: /opentelemetry/troubleshooting/
