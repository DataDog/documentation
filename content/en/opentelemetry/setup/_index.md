---
title: Send OpenTelemetry Data to Datadog
further_reading:
- link: "/opentelemetry/instrument/"
  tag: "Documentation"
  text: "Instrument Your Applications"
- link: "https://www.datadoghq.com/blog/otel-deployments/"
  tag: "Blog"
  text: "How to select your OpenTelemetry deployment"
---

This page describes all of the ways you can send OpenTelemetry (OTel) data to Datadog.

## DDOT Collector (Recommended)

The Datadog Distribution of OpenTelemetry (DDOT) Collector is an open source solution that combines the flexibility of OpenTelemetry with the comprehensive observability capabilities of Datadog.

This approach gives you full control over OpenTelemetry pipelines while also providing access to powerful, Datadog Agent-based features, including:

- Fleet Automation
- Live Container Monitoring
- Kubernetes Explorer
- Live Processes
- Cloud Network Monitoring
- Universal Service Monitoring
- {{< translate key="integration_count" >}}+ Datadog integrations

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/install/" >}}
    <h3>Install the DDOT Collector</h3>
    Follow our guided setup to install the Collector and start sending your OpenTelemetry data to Datadog.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Other setup options

Alternative methods are available for specific use cases, such as maintaining a vendor-neutral pipeline or running in non-Kubernetes environments.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/" >}}
    <h3>Standalone OpenTelemetry Collector</h3>
    Best for: Users who prefer to use OTel Collector distributions from the OpenTelemetry open source community or require advanced processing capabilities like tail-based sampling.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/otlp_ingest_in_the_agent" >}}
    <h3>OTLP Ingest in the Agent</h3>
    Best for: Users on platforms other than Kubernetes Linux, or those who prefer a minimal configuration without managing Collector pipelines.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/agentless" >}}
    <h3>Direct OTLP Ingest (Preview)</h3>
    Best for: Situations requiring direct data transmission to Datadog's intake endpoint without any intermediary components.
    {{< /nextlink >}}
{{< /whatsnext >}}

<div class="alert alert-info"><strong>Still not sure which setup is right for you?</strong><br> See the <a href="/opentelemetry/compatibility/">Feature Compatibility</a> table to understand which Datadog features are supported.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/setup/agent
[2]: /opentelemetry/setup/collector_exporter/
[3]: /opentelemetry/setup/agentless
[4]: /opentelemetry/ingestion_sampling#tail-based-sampling
[5]: /opentelemetry/agent
[6]: /opentelemetry/setup/otlp_ingest_in_the_agent
