---
title: Send OpenTelemetry Data Through the Datadog Agent
description: Use the Datadog Agent to receive OTLP data from your applications, or run an OpenTelemetry Collector alongside the Agent.
further_reading:
- link: "/opentelemetry/setup/otlp_ingest_in_the_agent"
  tag: "Documentation"
  text: "Agent's OTLP Endpoint"
- link: "/opentelemetry/setup/ddot_collector/install/"
  tag: "Documentation"
  text: "Set Up the Agent's Collector"
- link: "/opentelemetry/setup/ddot_collector/custom_components"
  tag: "Documentation"
  text: "Use Custom OpenTelemetry Components with the Agent's Collector"
- link: "/opentelemetry/migrate/ddot_collector"
  tag: "Documentation"
  text: "Migrate to the Agent's Collector"
---

## Overview

If you run the Datadog Agent, you can send your OpenTelemetry data through it. The Agent adds Datadog features that need it, such as [{{< translate key="integration_count" >}}+ Datadog integrations][1], [Live Container Monitoring][3], [Cloud Network Monitoring][7], and [Universal Service Monitoring][5].

The Agent handles OpenTelemetry data in two ways:

- **[Agent's OTLP endpoint](#otlp-ingest-in-the-agent)**: The Agent receives OTLP data from your applications.
- **[Agent's Collector](#agents-collector)**: An OpenTelemetry Collector runs alongside the Agent as a separate process, so you can configure your own pipelines.

To send OpenTelemetry data without the Agent, see [Send OpenTelemetry Data to Datadog][9].

## Agent's OTLP endpoint {#otlp-ingest-in-the-agent}

Your applications, instrumented with OpenTelemetry SDKs, send telemetry to the Datadog Agent over OTLP.

{{< img src="/opentelemetry/setup/dd-agent-otlp-ingest.png" alt="Your application, instrumented with an OpenTelemetry SDK, sends OTLP to the Datadog Agent, which sends it to Datadog." style="width:100%;" >}}

**Best for**: Teams that want to send OTLP to Datadog with little configuration and no pipelines to manage.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/otlp_ingest_in_the_agent" >}}Set up the Agent's OTLP endpoint{{< /nextlink >}}
{{< /whatsnext >}}

## Agent's Collector {#agents-collector}

The Agent's Collector is the OpenTelemetry Collector that runs alongside the Datadog Agent as a separate process. Configure it with standard OpenTelemetry Collector configuration.

**Note**: The setup pages for the Agent's Collector were previously titled "DDOT Collector." For the DDOT Collector that runs without the Agent, see [DDOT Collector][10].

{{< callout url="https://www.datadoghq.com/product-preview/remote-configuration-for-datadogs-distribution-of-opentelemetry-collector-ddot/" >}}
Remote Configuration for the Agent's Collector is <strong>in Preview</strong>. Use this form to request access.
{{< /callout >}}

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Architecture overview of the Agent's Collector, an OpenTelemetry Collector deployed with the Datadog Agent." style="width:100%;" >}}

**Best for**: Teams that want to control their OpenTelemetry pipelines, or send OTLP to other destinations as well as Datadog.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/install/" >}}Set up the Agent's Collector{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/custom_components" >}}Use custom OpenTelemetry components{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/migrate/ddot_collector" >}}Migrate to the Agent's Collector{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/
[3]: /containers/
[5]: /universal_service_monitoring/
[7]: /network_monitoring/cloud_network_monitoring/
[9]: /opentelemetry/setup/
[10]: /opentelemetry/setup/ddot_collector/
