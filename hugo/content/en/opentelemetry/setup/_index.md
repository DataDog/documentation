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

Datadog accepts OpenTelemetry traces, metrics, and logs over OTLP. You can send them through a Collector, straight from your applications, or through the Datadog Agent. None of these options needs a Datadog SDK, and only the last one needs the Datadog Agent.

To try OpenTelemetry on a test cluster first, see [Getting Started][1].

## Compare the options

| Option | What you run | Datadog software in your pipeline | Datadog Agent | Platforms | Start here |
|---|---|---|---|---|---|
| [DDOT Collector](#ddot-collector) | Datadog's distribution of the OpenTelemetry Collector | The DDOT Collector | Optional | Kubernetes | [Install the DDOT Collector on Kubernetes][2] |
| [Upstream OpenTelemetry Collector](#upstream-opentelemetry-collector) | The OpenTelemetry Collector from the OpenTelemetry project, or your own build | None | Not used | Any platform the Collector runs on | [Set up the OpenTelemetry Collector][3] |
| [Direct OTLP ingest](#direct-otlp-ingest) | Nothing extra: your applications send OTLP to Datadog | None | Not used | Serverless, managed platforms, and any application that can reach Datadog | [Datadog OTLP intake endpoint][4] |
| [Datadog Agent](#datadog-agent) | The Datadog Agent, which receives OTLP or runs a Collector inside the Agent | The Datadog Agent | Required | Linux, Windows, Kubernetes, and Amazon ECS and EKS Fargate | [Send data through the Datadog Agent][5] |

## DDOT Collector

The DDOT Collector is Datadog's distribution of the OpenTelemetry Collector. You deploy it with standard OpenTelemetry tooling, such as the OpenTelemetry Operator and Helm charts, and it sends your telemetry to Datadog. Datadog builds and supports it. You can [add the Datadog Agent][6] later for features that need the Agent.

**Choose the DDOT Collector if** you want a Collector that Datadog supports, and you run Kubernetes.

To get started, see [Install the DDOT Collector on Kubernetes][2].

## Upstream OpenTelemetry Collector

Use the OpenTelemetry Collector you already run or build, and export to Datadog over OTLP. No Datadog software runs in your pipeline. If your configuration already uses the [Datadog Exporter][7], it keeps working.

**Choose the upstream Collector if** you already run an OpenTelemetry Collector, or you want a pipeline with no Datadog software in it.

To get started, see [Set up the OpenTelemetry Collector][3].

## Direct OTLP ingest

Your applications' OpenTelemetry SDKs send OTLP straight to the Datadog intake, with nothing to deploy. Without a Collector or the Agent, you don't get their metadata enrichment, processing, or centralized sampling.

**Choose direct OTLP ingest if** you can't run a Collector, for example on serverless functions or managed platforms.

To get started, see [Datadog OTLP intake endpoint][4].

## Datadog Agent

If you run the Datadog Agent, it can receive OTLP from your applications ([OTLP Ingest in the Agent][8]), or run an OpenTelemetry Collector inside the Agent ([OTel in the Agent][9]). The Agent adds Datadog features that need it, such as integrations and Live Containers.

**Choose the Datadog Agent if** you already run the Agent and want to add OpenTelemetry data to it.

To get started, see [Send OpenTelemetry data through the Datadog Agent][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/getting_started/
[2]: /opentelemetry/setup/ddot_collector/kubernetes/
[3]: /opentelemetry/setup/collector_exporter/
[4]: /opentelemetry/setup/otlp_ingest/
[5]: /opentelemetry/setup/agent/
[6]: /opentelemetry/setup/ddot_collector/kubernetes/#add-the-datadog-agent-optional
[7]: /opentelemetry/setup/collector_exporter/datadog_exporter/
[8]: /opentelemetry/setup/otlp_ingest_in_the_agent/
[9]: /opentelemetry/setup/ddot_collector/install/
