---
title: Send OpenTelemetry Data to Datadog
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Send OpenTelemetry Data to Datadog
---

# Send OpenTelemetry Data to Datadog

This page describes all of the ways you can send OpenTelemetry (OTel) data to Datadog.

## DDOT Collector (Recommended){% #ddot-collector-recommended %}

The Datadog Distribution of OpenTelemetry (DDOT) Collector is an open source solution that combines the flexibility of OpenTelemetry with the comprehensive observability capabilities of Datadog.

This approach gives you full control over OpenTelemetry pipelines while also providing access to powerful, Datadog Agent-based features, including:

- Fleet Automation
- Live Container Monitoring
- Kubernetes Explorer
- Live Processes
- Cloud Network Monitoring
- Universal Service Monitoring
- 1,000+ Datadog integrations

- [
  ### Install the DDOT Collector
Follow our guided setup to install the Collector and start sending your OpenTelemetry data to Datadog.](http://localhost:1313/opentelemetry/setup/ddot_collector/install/)

## Other setup options{% #other-setup-options %}

Alternative methods are available for specific use cases, such as maintaining a vendor-neutral pipeline or running in non-Kubernetes environments.

- [
  ### Standalone OpenTelemetry Collector
Best for: Users who prefer to use OTel Collector distributions from the OpenTelemetry open source community or require advanced processing capabilities like tail-based sampling.](http://localhost:1313/opentelemetry/setup/collector_exporter/)
- [
  ### OTLP Ingest in the Agent
Best for: Users on platforms other than Kubernetes Linux, or those who prefer a minimal configuration without managing Collector pipelines.](http://localhost:1313/opentelemetry/setup/otlp_ingest_in_the_agent)
- [
  ### Direct OTLP Ingest (Preview)
Best for: Situations requiring direct data transmission to Datadog's intake endpoint without any intermediary components.](http://localhost:1313/opentelemetry/setup/agentless)

{% alert level="info" %}
**Still not sure which setup is right for you?**See the [Feature Compatibility](http://localhost:1313/opentelemetry/compatibility/) table to understand which Datadog features are supported.
{% /alert %}

## Further reading{% #further-reading %}

- [Instrument Your Applications](http://localhost:1313/opentelemetry/instrument/)
- [How to select your OpenTelemetry deployment](https://www.datadoghq.com/blog/otel-deployments/)
