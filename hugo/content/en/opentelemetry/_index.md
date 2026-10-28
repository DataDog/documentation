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

Datadog accepts [OpenTelemetry][1] (OTel) traces, metrics, and logs. Keep your OpenTelemetry instrumentation, and choose how your data reaches Datadog.

Datadog maps the `service.name`, `deployment.environment.name`, and `service.version` resource attributes to [unified service tags][2], and [correlates your traces, metrics, and logs][3] with your infrastructure.

## Choose a setup

Datadog recommends one of two setups. Both use OpenTelemetry instrumentation and send OTLP, the OpenTelemetry Protocol.

{{< img src="/opentelemetry/setup/otel-golden-paths.png" alt="Two recommended setups send OpenTelemetry data to Datadog. In DDOT, the DDOT SDK sends OTLP to the DDOT Collector, which sends it to Datadog with the Datadog Exporter. An optional Datadog Agent handles Agent-dependent features. In upstream OpenTelemetry, the OpenTelemetry SDK sends OTLP to the upstream OpenTelemetry Collector, which sends OTLP over HTTP to Datadog. The optional Full-Host Profiler works with either setup." caption="These are the two recommended combinations. You can also pair a DDOT SDK with an upstream Collector, or an OpenTelemetry SDK with the DDOT Collector." style="width:100%;" >}}

### DDOT

Datadog OpenTelemetry (DDOT) is a set of OpenTelemetry components that Datadog builds and supports. Each one takes the place of an upstream component, so you can adopt them one at a time:

- [DDOT SDK][4] (Preview): The Datadog SDK for your language, set up to export OTLP.
- [DDOT Collector][5] (Preview): An OpenTelemetry Collector that Datadog builds.
- [Full-Host Profiler][13] (Preview): Profiles every process on a host.

For example, you can run the Full-Host Profiler with an upstream OpenTelemetry pipeline.

Deploy them with standard OpenTelemetry tooling, such as the OpenTelemetry Operator and Helm charts. The Datadog Agent is optional. Add it only for the [features that need it][6].

**Choose DDOT if** you want Datadog to build and support your OpenTelemetry components.

To try it, follow the [DDOT path of the quickstart][14].

### Upstream OpenTelemetry

Use the [OpenTelemetry SDK][7] and the [upstream OpenTelemetry Collector][8], and send OTLP to the Datadog intake. Every component comes from the OpenTelemetry project.

**Choose upstream OpenTelemetry if** you already run an OpenTelemetry Collector, or your policy allows only OpenTelemetry project components.

To try it, follow the [Upstream path of the quickstart][15].

## Other setups

- **Serverless functions and managed platforms**: If you can't run a Collector, send OTLP from your applications straight to Datadog with [direct OTLP ingest][9].
- **The Datadog Agent**: If you already run the Agent, [send OpenTelemetry data through it][16].

To compare every option, see [Send OpenTelemetry Data to Datadog][11]. To choose an SDK, see [Instrument Your Applications][12].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: /getting_started/tagging/unified_service_tagging/
[3]: /opentelemetry/correlate/
[4]: /opentelemetry/instrument/dd_sdks/ddot_setup/
[5]: /opentelemetry/setup/ddot_collector/
[6]: /opentelemetry/setup/ddot_collector/kubernetes/#add-the-datadog-agent-optional
[7]: /opentelemetry/instrument/otel_sdks/
[8]: /opentelemetry/setup/collector_exporter/
[9]: /opentelemetry/setup/otlp_ingest/
[11]: /opentelemetry/setup/
[12]: /opentelemetry/instrument/
[13]: /profiler/enabling/full_host/
[14]: /opentelemetry/getting_started/kubernetes/?tab=ddot
[15]: /opentelemetry/getting_started/kubernetes/?tab=upstream
[16]: /opentelemetry/setup/agent/
