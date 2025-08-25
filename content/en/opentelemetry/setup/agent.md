---
title: Datadog Agent
further_reading:
- link: "opentelemetry/agent/"
  tag: "Documentation"
  text: "Datadog Agent with DDOT Collector"
- link: "/opentelemetry/setup/ddot_collector/install/"
  tag: "Documentation"
  text: "Install the Datadog Agent with DDOT OpenTelemetry Collector"
- link: "/opentelemetry/setup/ddot_collector/custom_components"
  tag: "Documentation"
  text: "Use Custom OpenTelemetry Components with Datadog Agent"
- link: "/opentelemetry/guide/migrate/ddot_collector"
  tag: "Documentation"
  text: "Migrate to the Datadog Agent with DDOT OpenTelemetry Collector"
- link: "/opentelemetry/setup/otlp_ingest_in_the_agent"
  tag: "Documentation"
  text: "OTLP Ingest in the Agent"
---

## Overview

Sending data to Datadog using the Datadog Agent is a great option for existing Datadog users or teams requiring Agent-based features.

**Key benefits**:
- Access [{{< translate key="integration_count" >}}+ Datadog integrations][1], [Live Container Monitoring][3], [Cloud Network Monitoring][7], [Universal Service Monitoring][5] (with eBPF), and more
- Leverage OpenTelemetry community-contributed integrations to collect telemetry in OTLP native format
- Benefit from Datadog's robust security practices, including regular vulnerability scans and analysis
- Access Datadog's global support team for assistance with onboarding and troubleshooting

The Datadog Agent provides two ways to ingest OpenTelemetry data:

- **[Datadog Distribution of OpenTelemetry (DDOT) Collector](#datadog-distribution-of-opentelemetry-ddot-collector)**: Use the DDOT Collector embedded in the Datadog Agent.
- **[OTLP Ingest in the Agent](#otlp-ingest-in-the-agent)**: Send telemetry data to the Datadog Agent using OpenTelemetry Protocol (OTLP).

## Datadog Distribution of OpenTelemetry (DDOT) Collector

The DDOT Collector combines the Datadog Agent with a built-in OpenTelemetry Collector. This option is best suited for Kubernetes users who want to take full advantage of Collector capabilities, such as advanced data processing and exporting OTLP data to multiple destinations.

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Architecture overview for DDOT Collector, which is embedded in the Datadog Agent." style="width:100%;" >}}

**Use the DDOT Collector if**:

- You want full control over OpenTelemetry pipelines, including processors and exporters
- You plan to forward OTLP data to multiple backends beyond Datadog
- You're running in a Kubernetes Linux environment

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/agent/" >}}Learn more about the DDOT Collector{{< /nextlink >}}
{{< /whatsnext >}}

## OTLP Ingest in the Agent

OTLP Ingest in the Agent is a way to send telemetry data directly from applications instrumented with OpenTelemetry SDKs to the Datadog Agent.

{{< img src="/opentelemetry/setup/dd-agent-otlp-ingest.png" alt="OpenTelemetry data flowing through the Datadog Agent" style="width:100%;" >}}

**Use OTLP Ingest in the Agent if**:

- You plan to send all OTLP telemetry data directly to Datadog without needing custom processing or multiple destinations
- You prefer an approach with minimal configuration that doesn't require managing OpenTelemetry pipelines
- You're running on platforms other than Kubernetes Linux, such as Windows, bare-metal EC2, VM environments, or [other supported platforms][8]

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/otlp_ingest_in_the_agent" >}}Learn more about OTLP Ingest in the Agent{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/
[3]: /containers/
[5]: /universal_service_monitoring/
[7]: /network_monitoring/cloud_network_monitoring/
[8]: /agent/basic_agent_usage/?tab=Linux#supported-platforms