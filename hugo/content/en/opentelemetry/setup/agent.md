---
title: Send OpenTelemetry Data Through the Datadog Agent
description: Use the Datadog Agent to receive OTLP data from your applications, or run an OpenTelemetry Collector inside the Agent with OTel in the Agent.
further_reading:
- link: "/opentelemetry/setup/otlp_ingest_in_the_agent"
  tag: "Documentation"
  text: "OTLP Ingest in the Agent"
- link: "/opentelemetry/setup/ddot_collector/install/"
  tag: "Documentation"
  text: "Set Up OTel in the Agent"
- link: "/opentelemetry/setup/ddot_collector/custom_components"
  tag: "Documentation"
  text: "Use Custom OpenTelemetry Components with OTel in the Agent"
- link: "/opentelemetry/migrate/ddot_collector"
  tag: "Documentation"
  text: "Migrate to OTel in the Agent"
---

## Overview

If you run the Datadog Agent, you can send your OpenTelemetry data through it. The Agent adds Datadog features that need it, such as [{{< translate key="integration_count" >}}+ Datadog integrations][1], [Live Container Monitoring][3], [Cloud Network Monitoring][7], and [Universal Service Monitoring][5].

The Agent handles OpenTelemetry data in two ways:

- **[OTLP Ingest in the Agent](#otlp-ingest-in-the-agent)**: The Agent receives OTLP data from your applications.
- **[OTel in the Agent](#otel-in-the-agent)**: An OpenTelemetry Collector runs inside the Agent, so you can configure your own pipelines.

To send OpenTelemetry data without the Agent, see [Send OpenTelemetry Data to Datadog][9].

## OTLP Ingest in the Agent

With OTLP Ingest in the Agent, applications instrumented with OpenTelemetry SDKs send telemetry to the Datadog Agent over OTLP.

{{< img src="/opentelemetry/setup/dd-agent-otlp-ingest.png" alt="OpenTelemetry data flowing through the Datadog Agent" style="width:100%;" >}}

**Choose OTLP Ingest in the Agent if**:

- You send all of your OTLP data to Datadog, with no custom processing or other destinations.
- You want minimal configuration, without OpenTelemetry pipelines to manage.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/otlp_ingest_in_the_agent" >}}Set up OTLP Ingest in the Agent{{< /nextlink >}}
{{< /whatsnext >}}

## OTel in the Agent

OTel in the Agent is an OpenTelemetry Collector that runs inside the Datadog Agent. You configure it with standard OpenTelemetry Collector configuration.

{{< callout url="https://www.datadoghq.com/product-preview/remote-configuration-for-datadogs-distribution-of-opentelemetry-collector-ddot/" >}}
Remote Configuration for OTel in the Agent is <strong>in Preview</strong>. Use this form to request access.
{{< /callout >}}

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Architecture overview of OTel in the Agent, an OpenTelemetry Collector that runs inside the Datadog Agent." style="width:100%;" >}}

**Choose OTel in the Agent if**:

- You want control over your OpenTelemetry pipelines, including processors and exporters.
- You plan to send OTLP data to other backends as well as Datadog.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/install/" >}}Set up OTel in the Agent{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/custom_components" >}}Use custom OpenTelemetry components{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/migrate/ddot_collector" >}}Migrate to OTel in the Agent{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/
[3]: /containers/
[5]: /universal_service_monitoring/
[7]: /network_monitoring/cloud_network_monitoring/
[9]: /opentelemetry/setup/
