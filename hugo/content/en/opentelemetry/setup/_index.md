---
title: Send OpenTelemetry Data to Datadog
description: Compare the ways to send OpenTelemetry data to Datadog, through the DDOT Collector, an upstream OpenTelemetry Collector, direct OTLP ingest, or the Datadog Agent.
further_reading:
- link: "/opentelemetry/instrument/"
  tag: "Documentation"
  text: "Instrument Your Applications"
- link: "https://www.datadoghq.com/blog/otel-deployments/"
  tag: "Blog"
  text: "How to select your OpenTelemetry deployment"
- link: "https://learn.datadoghq.com/courses/otel-with-datadog"
  tag: "Learning Center"
  text: "Introduction to OpenTelemetry with Datadog"
- link: "https://learn.datadoghq.com/courses/using-ddot"
  tag: "Learning Center"
  text: "Using the Datadog Distribution of OpenTelemetry Collector"

---

## Overview

Send OpenTelemetry traces, metrics, and logs to Datadog through a Collector, through the Datadog Agent, or directly from your applications. These options describe how you send telemetry. For application instrumentation, see [Instrument Your Applications][1].

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/getting_started/kubernetes/" >}}Get started on Kubernetes with the quickstart{{< /nextlink >}}
{{< /whatsnext >}}

## Compare the options

| Option | When to use it | Datadog Agent | Platforms |
|---|---|---|---|
| [DDOT Collector](#ddot-collector) (Preview) | You want a Datadog-supported Collector on Kubernetes | Optional | Kubernetes |
| [Upstream OpenTelemetry Collector](#upstream-opentelemetry-collector) | You use an upstream Collector, or your own build | Not used | Hosts, VMs, Docker, and Kubernetes |
| [Direct OTLP ingest](#direct-otlp-ingest) | You can't run a Collector | Not used | Serverless functions, managed platforms, and any application that can reach Datadog |
| [Datadog Agent](#datadog-agent) | You already run the Datadog Agent | Required | [Datadog Agent-supported platforms][7] |

To check which Datadog features each option supports, see [Feature Compatibility][8].

## DDOT Collector

{{< img src="/opentelemetry/setup/otel-ddot-collector.png" alt="Your application, instrumented with a DDOT SDK or an OpenTelemetry SDK, sends OTLP to the DDOT Collector, which sends your telemetry to Datadog with the Datadog Exporter. An optional Datadog Agent runs alongside it for features that need the Agent." style="width:100%;" >}}

Deploy the Datadog OpenTelemetry (DDOT) Collector on Kubernetes with OpenTelemetry tooling, such as the OpenTelemetry Operator or Helm charts. It receives, processes, and sends your telemetry to Datadog. The Datadog Agent is optional; you can [add it][3] later.

**Best for**: Teams on Kubernetes that want Datadog to build and support their Collector.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/kubernetes/" >}}Install the DDOT Collector on Kubernetes{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/" >}}Learn about the DDOT Collector{{< /nextlink >}}
{{< /whatsnext >}}

## Upstream OpenTelemetry Collector

{{< img src="/opentelemetry/setup/otel-route-upstream-collector.png" alt="Your application, instrumented with OpenTelemetry, sends OTLP to the upstream OpenTelemetry Collector, which sends OTLP over HTTP to the Datadog OTLP intake." style="width:100%;" >}}

Your OpenTelemetry Collector sends OTLP over HTTP to the Datadog OTLP intake. If your Collector uses the Datadog Exporter, see [Datadog Exporter][4].

**Best for**: Teams that want to use an upstream OpenTelemetry Collector and send telemetry to Datadog over OTLP.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/" >}}Set up the upstream OpenTelemetry Collector{{< /nextlink >}}
{{< /whatsnext >}}

## Direct OTLP ingest

{{< img src="/opentelemetry/setup/otel-route-direct-otlp.png" alt="Your application, instrumented with OpenTelemetry, sends OTLP straight to the Datadog OTLP intake, with no Collector or Agent in between." style="width:100%;" >}}

Your applications send OTLP directly to Datadog, without a Collector or Agent. This option omits the enrichment, processing, and centralized sampling that those components provide.

**Best for**: Workloads that can't run a Collector, such as serverless functions and managed platforms.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/otlp_ingest/" >}}Send data to the Datadog OTLP intake{{< /nextlink >}}
{{< /whatsnext >}}

## Datadog Agent

{{< img src="/opentelemetry/setup/otel-route-datadog-agent.png" alt="Your application, instrumented with OpenTelemetry, sends OTLP to the Datadog Agent, which receives it with OTLP Ingest or the Collector in the Agent, and sends it to Datadog." style="width:100%;" >}}

The Datadog Agent receives OTLP from your applications ([OTLP Ingest in the Agent][5]), or runs an OpenTelemetry Collector inside the Agent ([Collector in the Agent][6]). You also get Agent-based features, such as integrations and Live Container Monitoring.

**Best for**: Teams that already run the Datadog Agent.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/agent/" >}}Send OpenTelemetry data through the Datadog Agent{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/instrument/
[3]: /opentelemetry/setup/ddot_collector/kubernetes/#install-the-core-datadog-agent-alongside-ddot
[4]: /opentelemetry/setup/collector_exporter/datadog_exporter/
[5]: /opentelemetry/setup/otlp_ingest_in_the_agent/
[6]: /opentelemetry/setup/ddot_collector/install/
[7]: /agent/supported_platforms/
[8]: /opentelemetry/compatibility/#feature-compatibility
