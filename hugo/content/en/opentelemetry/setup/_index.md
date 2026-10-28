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

Choose how to send your OpenTelemetry traces, metrics, and logs to Datadog: through a Collector, through the Datadog Agent, or directly from your applications. You choose your SDK separately. See [Instrument Your Applications][10].

To try OpenTelemetry on a test cluster first, see [Getting Started][1].

{{< img src="/opentelemetry/setup/otel-send-data-options.png" alt="Four alternative ways to send OpenTelemetry data from your application to Datadog, one per row: through the DDOT Collector, which uses the Datadog Exporter and can run with an optional Datadog Agent; through the upstream OpenTelemetry Collector, over OTLP/HTTP; directly to the Datadog OTLP intake; or through the Datadog Agent, with OTLP ingest or the Collector in the Agent." caption="Each row is a separate setup. Choose one." style="width:100%;" >}}

## Compare the options

| Option | What you run | Datadog Agent | Platforms | Start here |
|---|---|---|---|---|
| [DDOT Collector](#ddot-collector) (Preview) | The Datadog OpenTelemetry (DDOT) Collector, an OpenTelemetry Collector that Datadog builds | Optional | Kubernetes | [Install the DDOT Collector on Kubernetes][2] |
| [Upstream OpenTelemetry Collector](#upstream-opentelemetry-collector) | The OpenTelemetry Collector, from the OpenTelemetry project or your own build | Not used | Hosts, VMs, Docker, and Kubernetes | [Set up the OpenTelemetry Collector][3] |
| [Direct OTLP ingest](#direct-otlp-ingest) | Nothing extra: your applications send OTLP to Datadog | Not used | Serverless, managed platforms, and any application that can reach Datadog | [Datadog OTLP intake endpoint][4] |
| [Datadog Agent](#datadog-agent) | The Datadog Agent, which receives OTLP or runs a Collector inside the Agent | Required | Wherever you run the Agent | [Send data through the Datadog Agent][5] |

## DDOT Collector

**Choose the DDOT Collector if** you run on Kubernetes and want Datadog to build and support your Collector. You deploy it with standard OpenTelemetry tooling, such as the OpenTelemetry Operator and Helm charts. The Datadog Agent is optional: you can [add it][6] later for features that need it.

To get started, see [Install the DDOT Collector on Kubernetes][2].

## Upstream OpenTelemetry Collector

**Choose the upstream Collector if** you already run an OpenTelemetry Collector, or your policy allows only OpenTelemetry project components. For existing configurations that use the Datadog Exporter, see [Datadog Exporter][7].

To get started, see [Set up the OpenTelemetry Collector][3].

## Direct OTLP ingest

**Choose direct OTLP ingest if** you can't run a Collector, such as on serverless functions or managed platforms. Your SDKs send OTLP straight to the Datadog intake. Without a Collector or the Agent, you don't get their metadata enrichment, processing, or centralized sampling.

To get started, see [Datadog OTLP intake endpoint][4].

## Datadog Agent

**Choose the Datadog Agent if** you already run the Agent and want to add OpenTelemetry data to it. The Agent can receive OTLP from your applications ([OTLP Ingest in the Agent][8]) or run an OpenTelemetry Collector inside the Agent ([Collector in the Agent][9]). You also get Agent-based features, such as integrations and Live Container Monitoring.

To get started, see [Send OpenTelemetry data through the Datadog Agent][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/getting_started/kubernetes/
[2]: /opentelemetry/setup/ddot_collector/install/kubernetes_standalone/
[3]: /opentelemetry/setup/collector_exporter/
[4]: /opentelemetry/setup/otlp_ingest/
[5]: /opentelemetry/setup/agent/
[6]: /opentelemetry/setup/ddot_collector/install/kubernetes_standalone/#install-the-core-datadog-agent-alongside-ddot
[7]: /opentelemetry/setup/collector_exporter/datadog_exporter/
[8]: /opentelemetry/setup/otlp_ingest_in_the_agent/
[9]: /opentelemetry/setup/ddot_collector/install/
[10]: /opentelemetry/instrument/
