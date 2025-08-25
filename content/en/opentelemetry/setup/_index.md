---
title: Send Data to Datadog
further_reading:
- link: "/opentelemetry/instrument/"
  tag: "Documentation"
  text: "Instrument Your Applications"
- link: "https://www.datadoghq.com/blog/otel-deployments/"
  tag: "Blog"
  text: "How to select your OpenTelemetry deployment"
---

There are several ways to send OpenTelemetry data to Datadog. For the most comprehensive experience with access to all Datadog features, use the Datadog Distribution of OpenTelemetry (DDOT) Collector

## DDOT Collector (Recommended)

The DDOT Collector is an open source solution that combines the flexibility of OpenTelemetry (OTel) with the comprehensive observability capabilities of Datadog. This approach is best for users who want to use the full potential of the Datadog platform in a Kubernetes environment.

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Architecture overview for DDOT Collector, which is embedded in the Datadog Agent." style="width:100%;" >}}

#### Key benefits

This approach gives you full control over OpenTelemetry pipelines while also providing access to powerful, Agent-based Datadog features, including:
* Fleet Automation
* Live Container Monitoring and Kubernetes Explorer
* Universal Service Monitoring (USM)
* Access to {{< translate key="integration_count" >}}+ Datadog integrations
* The ability to forward OTLP data to multiple backends

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/install/" >}}**Get Started with the DDOT Collector**{{< /nextlink >}}
{{< /whatsnext >}}

## Other setup options

Alternative methods are available for specific use cases, such as maintaining a vendor-neutral pipeline or running in non-Kubernetes environments.

### Standalone OpenTelemetry Collector
* **Best for**: Users who require a completely vendor-neutral setup to send data to multiple backends.
* **[Learn more about the OTel Collector →][2]**

### OTLP ingest in the Agent
* **Best for**: Users on platforms other than Kubernetes Linux, or those who prefer a minimal configuration without managing Collector pipelines.
* **[Learn more about OTLP Ingest →][6]**

### Agentless deployment
* **Best for**: Situations requiring direct data transmission to Datadog's intake endpoint without any intermediary components.
* **[Learn more about Agentless Deployment →][2]**

<div class="alert alert-info"><strong>Still not sure which setup is right for you?</strong><br> See the <a href="/opentelemetry/compatibility/">Feature Compatibility</a> table to understand which Datadog features are supported.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/setup/agent
[2]: /opentelemetry/setup/collector_exporter/
[3]: /opentelemetry/setup/agentless
[4]: /opentelemetry/ingestion_sampling#tail-based-sampling
[5]: /opentelemetry/agent
[6]: /opentelemetry/setup/otlp_ingest_in_the_agent
