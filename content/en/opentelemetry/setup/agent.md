---
title: Datadog Agent
further_reading:
- link: "opentelemetry/agent/"
  tag: "Documentation"
  text: "Datadog Agent with DDOT Collector"
- link: "/opentelemetry/agent/install_agent_with_collector"
  tag: "Documentation"
  text: "Install the Datadog Agent with DDOT OpenTelemetry Collector"
- link: "/opentelemetry/agent/agent_with_custom_components"
  tag: "Documentation"
  text: "Use Custom OpenTelemetry Components with Datadog Agent"
- link: "/opentelemetry/agent/migration"
  tag: "Documentation"
  text: "Migrate to the Datadog Agent with DDOT OpenTelemetry Collector"
- link: "/opentelemetry/setup/otlp_ingest_in_the_agent"
  tag: "Documentation"
  text: "OTLP Ingest in the Agent"
---

## Overview

Sending data to Datadog using the Datadog Agent is a great option for existing Datadog users or teams requiring Agent-based features.

**Key benefits**:
- Access {{< translate key="integration_count" >}}+ Datadog integrations, [Live Container Monitoring][3], [Cloud Network Monitoring][7], and [Universal Service Monitoring][5] (with eBPF) and more
- Leverage OpenTelemetry community-contributed integrations to collect telemetry in OTLP native format
- Benefit from Datadog's robust security practices, including regular vulnerability scans and analysis
- Access Datadog's global support team for assistance with onboarding and troubleshooting

The Datadog Agent provides two ways to ingest OpenTelemetry data:

- **[Datadog Distribution of OpenTelemetry (DDOT) Collector](#datadog-distribution-of-opentelemetry-ddot-collector)**: Use the DDOT Collector embedded in the Datadog Agent.
- **[OTLP Ingest in the Agent](#otlp-ingest-in-the-agent)**: Send telemetry data to the Datadog Agent using OpenTelemetry Protocol (OTLP).

## Datadog Distribution of OpenTelemetry (DDOT) Collector

The **DDOT Collector** combines the Datadog Agent with a built-in OpenTelemetry Collector.

{{< img src="/opentelemetry/setup/ddot-collector.png" alt="Architecture overview for DDOT Collector, which is embedded in the Datadog Agent." style="width:100%;" >}}

**Best for**: Existing Datadog users or teams requiring Agent-based features **using** Kubernetes

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/agent/" >}}Learn more about the DDOT Collector{{< /nextlink >}}
{{< /whatsnext >}}

## OTLP Ingest in the Agent

OTLP Ingest in the Agent is a way to send telemetry data directly from applications instrumented with OpenTelemetry SDKs to the Datadog Agent.

{{< img src="/opentelemetry/setup/dd-agent-otlp-ingest.png" alt="OpenTelemetry data flowing through the Datadog Agent" style="width:100%;" >}}

**Best for**: Existing Datadog users or teams requiring Agent-based features **not using** Kubernetes

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/otlp_ingest_in_the_agent" >}}Learn more about OTLP Ingest in the Agent{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: /containers/
[5]: /universal_service_monitoring/
[7]: /network_monitoring/cloud_network_monitoring/

