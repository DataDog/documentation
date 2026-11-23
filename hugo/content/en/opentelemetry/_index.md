---
title: OpenTelemetry in Datadog
description: Send OpenTelemetry traces, metrics, and logs to Datadog. Use the recommended DDOT setup, the upstream OpenTelemetry setup if you use only OpenTelemetry project components, or another way to send your data.
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

Use Datadog to monitor service health and investigate problems with your [OpenTelemetry][1] (OTel) data. Bring traces, metrics, logs, and infrastructure data together to understand where a problem occurs and what might be causing it.

- **Monitor your services**: Track request rates, errors, and latency, and create dashboards and alerts from your OpenTelemetry data.
- **Investigate across signals**: Follow a slow request across services, examine related logs, and check resource usage on the hosts and containers involved.
- **Keep your OpenTelemetry instrumentation**: Send data over the OpenTelemetry Protocol (OTLP) from upstream OpenTelemetry SDKs and Collectors, or adopt Datadog OpenTelemetry (DDOT) components one at a time.

Datadog maps the `service.name`, `deployment.environment.name`, and `service.version` resource attributes to [unified service tags][2], so you can filter telemetry by service, environment, and version. For correlation requirements and configuration, see [Correlate OpenTelemetry Data][3].

## Choose a setup

Every setup has two parts: an SDK in your application, and a route that sends your data to Datadog. Datadog recommends the DDOT setup. If you use only OpenTelemetry project components, use the upstream OpenTelemetry setup. You can also mix components from the two setups: for example, a DDOT SDK can send to an upstream Collector. See [Send OpenTelemetry Data to Datadog][13]. To choose your SDK first, see [Instrument Your Applications][15].

### DDOT (recommended)

Datadog OpenTelemetry (DDOT) is a set of OpenTelemetry components that Datadog builds and supports. Each one takes the place of an upstream component, so you can adopt them one at a time. DDOT components send standard OTLP, so you can also send your data to other OTLP-compatible backends.

{{< img src="/opentelemetry/setup/otel-path-ddot.png" alt="The DDOT SDK sends OTLP to the DDOT Collector, which sends telemetry to Datadog, with a recommended Datadog Agent alongside." style="width:100%;" >}}

| Component | What it does |
|---|---|
| [DDOT SDKs][4] (Preview) | Instrument your application. A DDOT SDK is Datadog's version of the OpenTelemetry SDK for your language. |
| [DDOT Collector][5] (Preview) | Receives your telemetry, processes it, and sends it to Datadog. It's an OpenTelemetry Collector that Datadog builds. |
| [Full-Host Profiler][6] (Preview) | Profiles every process on a host. |

Deploy DDOT components with standard OpenTelemetry tooling, such as the OpenTelemetry Operator and Helm charts. Datadog recommends [running the Datadog Agent alongside them][7]. Some Datadog features need the Agent. See [Feature Compatibility][14].

**Best for**: Teams that want Datadog to build and support their OpenTelemetry components.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/getting_started/kubernetes/?tab=ddot" >}}Install DDOT with the Kubernetes quickstart{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/" >}}Learn about the DDOT Collector{{< /nextlink >}}
{{< /whatsnext >}}

### Upstream OpenTelemetry

Use the [upstream OpenTelemetry SDK][8] and the [upstream OpenTelemetry Collector][9], and send OTLP to the Datadog OTLP intake. Every component comes from the OpenTelemetry project.

{{< img src="/opentelemetry/setup/otel-path-upstream.png" alt="The upstream OpenTelemetry SDK sends OTLP to the upstream OpenTelemetry Collector, which sends OTLP over HTTP to Datadog." style="width:100%;" >}}

**Best for**: Teams that already run an upstream OpenTelemetry Collector, or that use only OpenTelemetry project components.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/getting_started/kubernetes/?tab=upstream" >}}Install upstream OpenTelemetry with the Kubernetes quickstart{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/" >}}Set up the upstream OpenTelemetry Collector{{< /nextlink >}}
{{< /whatsnext >}}

## Other setups

| If you | Use |
|---|---|
| Can't run a Collector, such as on serverless functions or managed platforms | [Direct OTLP ingest][10]: Your applications send OTLP straight to Datadog. |
| Already run the Datadog Agent | [The Datadog Agent][11]: The Agent receives OTLP at the Agent's OTLP endpoint, or runs the [Agent's Collector][16], an OpenTelemetry Collector that runs alongside the Agent. |
| Run a Collector that uses the Datadog Exporter | [Datadog Exporter][12]: Keep your existing configuration. |

To compare every setup, see [Send OpenTelemetry Data to Datadog][13]. To check which Datadog features each setup supports, see [Feature Compatibility][14].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: /getting_started/tagging/unified_service_tagging/
[3]: /opentelemetry/correlate/
[4]: /opentelemetry/instrument/ddot_sdks/
[5]: /opentelemetry/setup/ddot_collector/
[6]: /profiler/enabling/full_host/
[7]: /opentelemetry/setup/ddot_collector/kubernetes/#install-the-core-datadog-agent-alongside-ddot
[8]: /opentelemetry/instrument/upstream_otel_sdks/
[9]: /opentelemetry/setup/collector_exporter/
[10]: /opentelemetry/setup/otlp_ingest/
[11]: /opentelemetry/setup/agent/
[12]: /opentelemetry/setup/collector_exporter/datadog_exporter/
[13]: /opentelemetry/setup/
[14]: /opentelemetry/compatibility/
[15]: /opentelemetry/instrument/
[16]: /opentelemetry/setup/agent/#agents-collector
