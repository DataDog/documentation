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

Find where you're starting from in the following table, then follow the page for your setup. Datadog accepts OpenTelemetry traces, metrics, and logs from the OpenTelemetry Collector, from the Datadog Agent, or straight from your applications.

## Where are you starting from?

| You... | Start here |
|---|---|
| Are new to OpenTelemetry and have a Kubernetes cluster | [Quickstart: OpenTelemetry on Kubernetes][1]: install OpenTelemetry with a script, instrument your application, and see your data in Datadog. |
| Already use OpenTelemetry SDKs or an OpenTelemetry Collector | [Set Up the OpenTelemetry Collector][2]: send your Collector's data to Datadog over OTLP. |
| Can't run a Collector, such as on serverless or managed platforms | [Datadog OTLP Intake Endpoint][3]: send data from your applications straight to Datadog. |
| Already use the Datadog Agent or Datadog SDKs | [OTLP Ingest in the Agent][4]: send OpenTelemetry data through your Agent.<br>[Using Datadog SDKs with OpenTelemetry][5]: instrument with a Datadog SDK. |

- To install for production with your own Helm values, see [Send OpenTelemetry Data to Datadog][6].
- To instrument your code, see [Instrument Your Applications][7].

## More tutorials

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/getting_started/otel_demo_to_datadog" >}}
    <h3>Set up the Official OpenTelemetry Demo</h3>
    Deploy the OpenTelemetry project's demo application: several microservices that send traces, metrics, and logs.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/getting_started/datadog_example" >}}
    <h3>Explore a Datadog Exporter example</h3>
    Follow a step-by-step tutorial using a Datadog-provided Java application and the Datadog Exporter.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/getting_started/kubernetes/
[2]: /opentelemetry/setup/collector_exporter/
[3]: /opentelemetry/setup/otlp_ingest/
[4]: /opentelemetry/setup/otlp_ingest_in_the_agent/
[5]: /opentelemetry/instrument/dd_sdks/
[6]: /opentelemetry/setup/
[7]: /opentelemetry/instrument/
