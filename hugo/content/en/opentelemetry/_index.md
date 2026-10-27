---
title: OpenTelemetry in Datadog
description: Send OpenTelemetry traces, metrics, and logs to Datadog with one of two recommended setups, DDOT or upstream OpenTelemetry.
aliases:
- /tracing/setup_overview/open_standards/
- /opentelemetry/interoperability/
further_reading:
- link: "/opentelemetry/compatibility/"
  tag: "Documentation"
  text: "Feature Compatibility"
- link: "/opentelemetry/instrument/"
  tag: "Documentation"
  text: "Instrument Your Applications"
- link: "/opentelemetry/setup/"
  tag: "Documentation"
  text: "Send Data to Datadog"
- link: "/opentelemetry/setup/otlp_ingest_in_the_agent/"
  tag: "Documentation"
  text: "OTLP ingestion by the Datadog Agent"
- link: "https://www.datadoghq.com/blog/opentelemetry-instrumentation/"
  tag: "Blog"
  text: "Datadog's partnership with OpenTelemetry"
- link: "https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/"
  tag: "Blog"
  text: "Monitor OpenTelemetry-instrumented apps with support for W3C Trace Context"
- link: "https://www.datadoghq.com/blog/aws-opentelemetry-lambda-layer-datadog/"
  tag: "Blog"
  text: "Learn more about AWS's managed Lambda Layer for OpenTelemetry"
- link: "https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/"
  tag: "Blog"
  text: "Correlate Datadog RUM events with traces from OpenTelemetry-instrumented applications"
- link: "https://www.datadoghq.com/blog/opentelemetry-runtime-metrics-datadog/"
  tag: "Blog"
  text: "Monitor runtime metrics from OTel-instrumented apps with Datadog APM"
- link: "https://www.datadoghq.com/blog/otel-deployments/"
  tag: "Blog"
  text: "How to select your OpenTelemetry deployment"
- link: "https://learn.datadoghq.com/courses/otel-with-datadog"
  tag: "Learning Center"
  text: "Introduction to OpenTelemetry with Datadog"

- link: "https://learn.datadoghq.com/courses/understanding-opentelemetry"
  tag: "Learning Center"
  text: "Understanding OpenTelemetry"
- link: "https://www.datadoghq.com/blog/control-trace-volume-with-opentelemetry-tail-based-sampling/"
  tag: "Blog"
  text: "Control trace volume with OpenTelemetry tail-based sampling"
algolia:
  tags: ['opentelemetry', 'open telemetry', 'otel']
cascade:
    algolia:
        rank: 70
---

{{< learning-center-callout hide_image="true" header="Try \"Introduction to OTel with Datadog\" in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/otel-with-datadog">}}
  Learn how to configure OpenTelemetry to export metrics, traces, and logs to Datadog, and explore the collected data in the platform.
{{< /learning-center-callout >}}

## Overview

[OpenTelemetry][1] (OTel) standardizes how you collect traces, metrics, and logs. Datadog turns that telemetry into context: a slow request leads to the host it ran on, the logs it wrote, and the queries it made.

### Why send OpenTelemetry data to Datadog?

- **Works on day one**: Service pages, distributed tracing, and metric correlation work with standard OpenTelemetry telemetry, with no re-instrumentation. The `service.name`, `service.version`, and `deployment.environment.name` attributes map to Datadog's [unified service tags][2].
- **Every signal connected**: Your OpenTelemetry [traces, metrics, and logs][3] are correlated with your infrastructure data in one place.
- **One component at a time**: The DDOT SDK, DDOT Collector, and Host Profiler each replace an upstream OpenTelemetry component. Adopt them one at a time, using the same OpenTelemetry tooling.

## Choose a setup

Datadog recommends one of two setups. Both send standard OTLP to Datadog.

### DDOT

Use Datadog's OpenTelemetry components: the [DDOT SDK][4] (Preview), the [DDOT Collector][5], and the Host Profiler (Preview). They work with standard OpenTelemetry tooling, such as the OpenTelemetry Operator and Helm charts. Add the [Datadog Agent][6] only if you need features that require it.

**Choose DDOT if** you want Datadog to support the OpenTelemetry components in your pipeline.

### Upstream OpenTelemetry

Use the [OpenTelemetry SDK][7] and the [upstream OpenTelemetry Collector][8], and export to Datadog over OTLP. No Datadog software runs in your pipeline.

**Choose upstream OpenTelemetry if** you already run an OpenTelemetry Collector, or you want a pipeline with no Datadog software in it.

### Can't run a Collector?

For serverless functions, managed platforms, and environments with tight resource limits, send data straight to Datadog with [direct OTLP ingest][9].

To try either setup on a Kubernetes cluster, see [Getting Started][10]. For every setup option, including the Datadog Agent, see [Send OpenTelemetry Data to Datadog][11].

## Instrument your applications

You can instrument your applications with either SDK:

- **OpenTelemetry SDK**: The upstream SDK, for a fully upstream setup.
- **DDOT SDK** (Preview): Replaces the upstream SDK. It adds automatic instrumentation for more frameworks and turns on more Datadog features, while still emitting standard OTLP.

For more information, see [Instrument Your Applications][12].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: /getting_started/tagging/unified_service_tagging/
[3]: /opentelemetry/correlate/
[4]: /opentelemetry/instrument/dd_sdks/
[5]: /opentelemetry/setup/ddot_collector/
[6]: /opentelemetry/setup/ddot_collector/kubernetes/#add-the-datadog-agent-optional
[7]: /opentelemetry/instrument/otel_sdks/
[8]: /opentelemetry/setup/collector_exporter/
[9]: /opentelemetry/setup/otlp_ingest/
[10]: /opentelemetry/getting_started/
[11]: /opentelemetry/setup/
[12]: /opentelemetry/instrument/
