---
title: Using Upstream OpenTelemetry SDKs
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

<div class="alert alert-info">Datadog feature availability depends on your SDK and deployment configuration. See <a href="/opentelemetry/compatibility/">Feature Compatibility</a> for supported features when using upstream OpenTelemetry SDKs.</div>

## Deployment methods

An existing upstream OpenTelemetry SDK can send telemetry to Datadog without being replaced. For a new installation, follow the OpenTelemetry documentation for your environment and language.

| Environment | Method | Best for |
|---|---|---|
| Kubernetes | [OpenTelemetry Operator][3] | Centrally managed auto-instrumentation and configuration through Kubernetes resources and workload annotations. |
| Kubernetes, other containers, hosts, or serverless | [Language-specific SDK installation][4] | Installing the SDK or auto-instrumentation in the application build or deployment. |

## Send telemetry to Datadog

For telemetry routing and setup instructions, see [Send OpenTelemetry Data to Datadog][7]. SDK installation and telemetry routing are separate choices.

## View your telemetry

View your application's traces in [Trace Explorer][10], metrics in [Metrics Explorer][11], and logs in [Log Explorer][12]. For missing telemetry, see [OpenTelemetry troubleshooting][13].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://opentelemetry.io/docs/platforms/kubernetes/operator/automatic/
[4]: https://opentelemetry.io/docs/languages/
[7]: /opentelemetry/setup/
[10]: /tracing/trace_explorer/
[11]: /metrics/explorer/
[12]: /logs/explorer/
[13]: /opentelemetry/troubleshooting/
