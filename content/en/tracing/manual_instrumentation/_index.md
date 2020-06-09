---
title: Manual Instrumentation
kind: documentation
decription: 'Manually instrument your application to send custom traces to Datadog.'
aliases:
    - /tracing/setup/php/manual-installation
    - /agent/apm/php/manual-installation
    - /tracing/guide/distributed_tracing/
    - /tracing/advanced/manual_instrumentation/
further_reading:
    - link: 'tracing/guide/instrument_custom_method'
      text: 'Instrument a custom method to get deep visibility into your business logic'
    - link: 'tracing/connect_logs_and_traces'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/opentracing'
      text: 'Implement Opentracing across your applications'
    - link: 'tracing/visualization/'
      text: 'Explore your services, resources, and traces'
    - link: 'https://www.datadoghq.com/blog/opentelemetry-instrumentation/'
      text: 'Learn More about Datadog and the OpenTelemetry initiative'
---

Manual instrumentation allows programmatic creation of traces to send to Datadog. This is useful for tracing in-house code not captured by automatic instrumentation, as well as for providing deeper visibility and context into spans, including adding any desired [span tags][1].

Before instrumenting your application, review Datadog’s [APM Terminology][2] and familiarize yourself with the core concepts of Datadog APM.

If you’re already using OpenTracing [click here][3] for configuration instructions.

Select your language below to discover how to manually instrument your application:

{{< partial name="apm/apm-manual-instrumentation.html" >}}


[1]: /tracing/guide/adding_metadata_to_spans/
[2]: /tracing/visualization
[3]: /tracing/opentracing
