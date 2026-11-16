---
title: Send OpenTelemetry Data to Datadog
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

This page describes all of the ways you can send OpenTelemetry (OTel) data to Datadog.

## DDOT Collector

The Datadog OpenTelemetry (DDOT) Collector is an open source distribution of the OpenTelemetry Collector, built and maintained by Datadog. Deploy it on Kubernetes with the OpenTelemetry Operator or Helm charts, and configure it with standard OpenTelemetry configuration. It doesn't require the Datadog Agent. For more, see [DDOT Collector](/opentelemetry/setup/ddot_collector/).

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/kubernetes/" >}}
    <h3>Install the DDOT Collector on Kubernetes</h3>
    Deploy and configure the Collector with the OpenTelemetry Operator or the Collector Helm chart.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Other setup options

Alternative methods are available for specific use cases, such as running your own OpenTelemetry Collector distribution or operating in non-Kubernetes environments.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/" >}}
    <h3>Upstream OpenTelemetry Collector</h3>
    Best for: Users who manage their own OpenTelemetry Collector or require advanced processing capabilities like tail-based sampling.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/agent/" >}}
    <h3>Datadog Agent</h3>
    Best for: Teams that want Agent-based features, such as Fleet Automation, Live Container Monitoring, Live Processes, Cloud Network Monitoring, Universal Service Monitoring, and {{< translate key="integration_count" >}}+ Datadog integrations. Send OTLP to the Agent's OTLP endpoint, or run the Agent's Collector.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/agentless" >}}
    <h3>Direct OTLP Ingest</h3>
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
