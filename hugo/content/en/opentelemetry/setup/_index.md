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

This page describes all of the ways you can send OpenTelemetry (OTel) data to Datadog, grouped by the kind of pipeline you want. Each group lists a recommended option first. You can also mix components, for example the Datadog SDK with the upstream OpenTelemetry Collector.

<!-- TODO: Update the options and labels on this page after the recommended setups and component names are finalized. -->

<div class="alert alert-info"><strong>Not sure which setup is right for you?</strong><br> See the <a href="/opentelemetry/compatibility/">Feature Compatibility</a> table to understand which Datadog features each setup supports.</div>

## You want Datadog to support your pipeline

### DDOT Collector (Recommended)

The Datadog Distribution of OpenTelemetry (DDOT) Collector is an OpenTelemetry Collector distribution that Datadog builds and supports. It includes a curated set of OpenTelemetry components, and you can add others.

When you run the DDOT Collector in the Datadog Agent, you also get Agent features, including:

- Fleet Automation
- Live Container Monitoring
- Kubernetes Explorer
- Live Processes
- Cloud Network Monitoring
- Universal Service Monitoring
- {{< translate key="integration_count" >}}+ Datadog integrations

You can also install the DDOT Collector on Kubernetes with the OpenTelemetry Operator or the OpenTelemetry Helm chart (Preview).

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/install/" >}}
    <h3>Install the DDOT Collector</h3>
    Follow the guided setup to install the Collector and start sending your OpenTelemetry data to Datadog.
    {{< /nextlink >}}
{{< /whatsnext >}}

### Alternative: OTLP Ingest in the Agent

Use this option if you run the Datadog Agent and want it to receive OTLP data from your applications without managing Collector pipelines.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/otlp_ingest_in_the_agent" >}}
    <h3>OTLP Ingest in the Agent</h3>
    Enable the OTLP receiver in the Datadog Agent.
    {{< /nextlink >}}
{{< /whatsnext >}}

## You want no Datadog software in your pipeline

### OpenTelemetry Collector (Recommended)

Use the upstream OpenTelemetry Collector with the OTLP HTTP exporter and `span_metrics` connector. This option suits teams that manage their own Collector or need processing such as tail-based sampling.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/" >}}
    <h3>Upstream OpenTelemetry Collector</h3>
    Configure the Collector to send traces, metrics, and logs to Datadog.
    {{< /nextlink >}}
{{< /whatsnext >}}

### Alternative: Datadog Exporter

Use this option if your Collector configuration already uses the Datadog Exporter and Datadog Connector. For new configurations, use the OTLP HTTP exporter.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/datadog_exporter/" >}}
    <h3>Datadog Exporter</h3>
    Send data with the Datadog Exporter and Datadog Connector.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Your platform already sends OTLP, or you can't run a Collector

### Direct OTLP Ingest (Recommended)

Send data straight to the Datadog OTLP intake endpoints. Use this option for platforms that already send OTLP, serverless functions, managed platforms, and other environments where you can't run a Collector.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/otlp_ingest/" >}}
    <h3>Direct OTLP Ingest</h3>
    Find the endpoints, protocols, and authentication for traces, metrics, and logs.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/setup/agent
[2]: /opentelemetry/setup/collector_exporter/
[3]: /opentelemetry/setup/agentless
[4]: /opentelemetry/ingestion_sampling#tail-based-sampling
[5]: /opentelemetry/agent
[6]: /opentelemetry/setup/otlp_ingest_in_the_agent
