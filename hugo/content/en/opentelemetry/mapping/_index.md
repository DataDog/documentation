---
title: How Datadog Uses OpenTelemetry Data
aliases:
 - /opentelemetry/schema_semantics/
further_reading:
- link: "/opentelemetry/correlate/"
  tag: "Documentation"
  text: "Correlate Data"
- link: "/opentelemetry/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting"
---

Datadog reads the resource attributes, span attributes, and metric names in your OpenTelemetry data to decide which service, environment, and host the data belongs to, and where it appears in Datadog. Use these pages to check how your data maps to Datadog.

<!-- TODO: Consolidate host-related guidance into one page, including how resource attributes affect host counts. -->

## Services and environments

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/correlate/#prerequisite-unified-service-tagging" >}}Unified service tagging{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/mapping/semantic_mapping/" >}}Resource Attribute Mapping{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/mapping/service_entry_spans/" >}}Service-entry Spans Mapping{{< /nextlink >}}
{{< /whatsnext >}}

## Hosts

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/config/hostname_tagging/" >}}Hostname and Tagging{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/mapping/hostname/" >}}Hostname Mapping{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/mapping/host_metadata/" >}}Infrastructure Host Mapping{{< /nextlink >}}
{{< /whatsnext >}}

## Metrics

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/mapping/metrics_mapping/" >}}Metrics Mapping{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
