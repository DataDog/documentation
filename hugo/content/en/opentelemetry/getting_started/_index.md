---
title: Getting Started with OpenTelemetry at Datadog
disable_toc: false
further_reading:
- link: "/opentelemetry/instrument/"
  tag: "Documentation"
  text: "Instrument Your Applications"
- link: "/opentelemetry/setup/"
  tag: "Documentation"
  text: "Send Data to Datadog"
- link: "/opentelemetry/guide"
  tag: "Documentation"
  text: "OpenTelemetry Guides"
- link: "https://www.datadoghq.com/blog/native-otel-with-datadog/"
  tag: "Blog"
  text: "Use OpenTelemetry-native observability with Datadog from ingestion to investigation"
---

{{< learning-center-callout header="Try \"Understanding OpenTelemetry\" in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/understanding-opentelemetry" hide_image="false" >}}
  Learn the fundamentals of OpenTelemetry, including its capabilities and benefits, key components, and how OTel and Datadog work together.
{{< /learning-center-callout >}}

## Overview

OpenTelemetry is an open source framework that provides standardized tools for collecting observability data from your applications. Datadog fully supports OpenTelemetry, allowing you to send your metrics, traces, and logs for powerful analysis and monitoring.

For a new production OpenTelemetry Collector configuration, start with the recommended OTLP HTTP exporter and `span_metrics` connector setup. The additional tutorials use the fully supported Datadog Exporter and Datadog Connector to demonstrate OpenTelemetry concepts and sample applications.

## Getting started tutorials

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/install" >}}
    <h3>Set up the OpenTelemetry Collector</h3>
    Configure the OpenTelemetry Collector Contrib distribution to send telemetry to Datadog with the recommended OTLP HTTP exporter and <code>span_metrics</code> connector setup.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/getting_started/datadog_example" >}}
    <h3>Explore a Datadog Exporter example</h3>
    Follow a step-by-step tutorial using a Datadog-provided Java application and the supported Datadog Exporter setup.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/getting_started/otel_demo_to_datadog" >}}
    <h3>Set up the Official OpenTelemetry Demo</h3>
    Deploy the community-maintained microservices demo application. This is a more comprehensive example that showcases a realistic, multi-service environment with traces, metrics, and logs.
    {{< /nextlink >}}
{{< /whatsnext >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}
