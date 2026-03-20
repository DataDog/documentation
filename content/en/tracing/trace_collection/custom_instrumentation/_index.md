---
title: Code-Based Custom Instrumentation
description: Add custom spans, tags, and instrumentation to capture application-specific observability data using Datadog APIs and OpenTelemetry.
aliases:
    - /tracing/setup/php/manual-installation
    - /agent/apm/php/manual-installation
    - /tracing/guide/distributed_tracing/
    - /tracing/advanced/manual_instrumentation/
    - /tracing/advanced/opentracing/
    - /tracing/opentracing/
    - /tracing/manual_instrumentation/
    - /tracing/guide/adding_metadata_to_spans
    - /tracing/advanced/adding_metadata_to_spans/
    - /tracing/custom_instrumentation
    - /tracing/setup_overview/custom_instrumentation/undefined
    - /tracing/setup_overview/custom_instrumentation/
further_reading:
    - link: 'tracing/guide/instrument_custom_method'
      text: 'Instrument a custom method to get deep visibility into your business logic'
    - link: 'tracing/connect_logs_and_traces'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/visualization/'
      text: 'Explore your services, resources, and traces'
    - link: 'https://www.datadoghq.com/blog/opentelemetry-instrumentation/'
      text: 'Learn More about Datadog and the OpenTelemetry initiative'
algolia:
  tags: ['apm custom instrumentation']
---

## Overview

Code-based custom instrumentation allows for precise monitoring of specific components in your application. It allows you to capture observability data from in-house code or complex functions that aren't captured by automatic instrumentation. Automatic instrumentation includes [Single Step Instrumentation][5] or using [Datadog tracing libraries][6].

Code-based custom instrumentation involves embedding tracing code directly into your application code. This allows for the programmatic creation, modification, or deletion of traces to send to Datadog.

<div class="alert alert-info">To add custom instrumentation at specific application code locations from the Datadog UI, without code changes, see <a href="https://docs.datadoghq.com/tracing/dynamic_instrumentation/">Dynamic Instrumentation</a>.</div>

## Getting started

Before you begin, make sure you've already [installed and configured the Agent][7].

Follow the relevant documentation for your custom instrumentation approach to learn more:

{{< tabs >}}
{{% tab "OpenTelemetry API (Recommended)" %}}

Datadog tracing libraries provide an implementation of the OpenTelemetry API for instrumenting your code. This means you can maintain vendor-neutral instrumentation of all your services, while still taking advantage of Datadog's native implementation, features, and products. You can configure it to generate Datadog-style spans and traces to be processed by the Datadog tracing library for your language, and send those to Datadog.

{{< partial name="apm/apm-otel-instrumentation-custom.html" >}}

<br>

{{% /tab %}}

{{% tab "Datadog API" %}}

Use the Datadog API to add custom instrumentation that allows you to programmatically create, modify, or delete traces to send to Datadog. This is useful for tracing in-house code not captured by automatic instrumentation, removing unwanted spans from traces, and for providing deeper visibility and context into spans, including adding span tags.

{{< partial name="apm/apm-manual-instrumentation-custom.html" >}}

<br>

{{% /tab %}}

{{% tab "OpenTracing (Legacy)" %}}

If [OpenTelemetry][1] or [`ddtrace`][2] custom instrumentation doesn't work for you, each of the supported languages also has support for sending [OpenTracing][3] data to Datadog. OpenTracing is archived and the project is unsupported. 

{{< partial name="apm/apm-opentracing-custom.html" >}}

<br>

[1]: /tracing/trace_collection/otel_instrumentation/
[2]: /tracing/trace_collection/custom_instrumentation/
[3]: https://opentracing.io/docs/

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[5]: /tracing/trace_collection/single-step-apm
[6]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/
[7]: /tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent

