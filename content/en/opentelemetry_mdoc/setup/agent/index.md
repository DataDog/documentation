---
title: Datadog Agent
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Send OpenTelemetry Data to Datadog > Datadog
  Agent
sourceUrl: https://docs.datadoghq.com/opentelemetry/setup/agent/index.html
---

# Datadog Agent

## Overview{% #overview %}

Sending data to Datadog using the Datadog Agent is a great option for existing Datadog users or teams requiring Agent-based features.

**Key benefits**:

- Access [900+ Datadog integrations](https://docs.datadoghq.com/integrations/), [Live Container Monitoring](https://docs.datadoghq.com/containers/), [Cloud Network Monitoring](https://docs.datadoghq.com/network_monitoring/cloud_network_monitoring/), [Universal Service Monitoring](https://docs.datadoghq.com/universal_service_monitoring/) (with eBPF), and more
- Leverage OpenTelemetry community-contributed integrations to collect telemetry in OTLP native format
- Benefit from Datadog's robust security practices, including regular vulnerability scans and analysis
- Access Datadog's global support team for assistance with onboarding and troubleshooting

The Datadog Agent provides two ways to ingest OpenTelemetry data:

- **Datadog Distribution of OpenTelemetry (DDOT) Collector**: Use the DDOT Collector embedded in the Datadog Agent.
- **OTLP Ingest in the Agent**: Send telemetry data to the Datadog Agent using OpenTelemetry Protocol (OTLP).

## Datadog Distribution of OpenTelemetry (DDOT) Collector{% #datadog-distribution-of-opentelemetry-ddot-collector %}

The DDOT Collector combines the Datadog Agent with a built-in OpenTelemetry Collector. This option is best suited for Kubernetes users who want to take full advantage of Collector capabilities, such as advanced data processing and exporting OTLP data to multiple destinations.

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/setup/ddot-collector-2.48e827fe0ea4d62cd26a81521e9fa584.png?auto=format"
   alt="Architecture overview for DDOT Collector, which is embedded in the Datadog Agent." /%}

**Use the DDOT Collector if**:

- You want full control over OpenTelemetry pipelines, including processors and exporters
- You plan to forward OTLP data to multiple backends beyond Datadog
- You're running in a Kubernetes Linux environment

- [Learn more about the DDOT Collector](https://docs.datadoghq.com/opentelemetry/agent/)

## OTLP Ingest in the Agent{% #otlp-ingest-in-the-agent %}

OTLP Ingest in the Agent is a way to send telemetry data directly from applications instrumented with OpenTelemetry SDKs to the Datadog Agent.

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/setup/dd-agent-otlp-ingest.5c618e65990e9be5954c60e908ab5f09.png?auto=format"
   alt="OpenTelemetry data flowing through the Datadog Agent" /%}

**Use OTLP Ingest in the Agent if**:

- You plan to send all OTLP telemetry data directly to Datadog without needing custom processing or multiple destinations
- You prefer an approach with minimal configuration that doesn't require managing OpenTelemetry pipelines
- You're running on platforms other than Kubernetes Linux, such as Windows, bare-metal EC2, VM environments, or [other supported platforms](https://docs.datadoghq.com/agent/basic_agent_usage/?tab=Linux#supported-platforms)

- [Learn more about OTLP Ingest in the Agent](https://docs.datadoghq.com/opentelemetry/setup/otlp_ingest_in_the_agent)

## Further reading{% #further-reading %}

- [Datadog Agent with DDOT Collector](https://docs.datadoghq.com/opentelemetry/agent/)
- [Install the Datadog Agent with DDOT OpenTelemetry Collector](https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/install/)
- [Use Custom OpenTelemetry Components with Datadog Agent](https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/custom_components)
- [Migrate to the Datadog Agent with DDOT OpenTelemetry Collector](https://docs.datadoghq.com/opentelemetry/guide/migrate/ddot_collector)
- [OTLP Ingest in the Agent](https://docs.datadoghq.com/opentelemetry/setup/otlp_ingest_in_the_agent)
