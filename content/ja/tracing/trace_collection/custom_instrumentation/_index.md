---
title: Custom Instrumentation
further_reading:
    - link: tracing/guide/instrument_custom_method
      text: Instrument a custom method to get deep visibility into your business logic
    - link: tracing/connect_logs_and_traces
      text: Connect your Logs and Traces together
    - link: tracing/visualization/
      text: Explore your services, resources, and traces
    - link: "https://www.datadoghq.com/blog/opentelemetry-instrumentation/"
      text: Learn More about Datadog and the OpenTelemetry initiative
algolia:
  tags: [apm custom instrumentation]
---

## 概要

Custom instrumentation allows for precise monitoring of specific components in your application. It allows you to capture observability data from in-house code or complex functions that aren't captured by automatic instrumentation. Automatic instrumentation includes [Single Step Instrumentation][5] or using [Datadog tracing libraries][6].

Custom instrumentation involves embedding tracing code directly into your application code. This allows for the programmatic creation, modification, or deletion of traces to send to Datadog.

## ユースケース

Some situations when you might use custom instrumentation include:

- Collecting observability data from custom code with unique or complex business logic.
- Providing deeper visibility and context into spans, including adding [span tags][1].
- Precisely monitoring specific sequences of operations or user interactions that require fine-grained control.
- Removing unwanted spans from traces.

## はじめに

Before you begin, make sure you've already [installed and configured the Agent][7].

Follow the relevant documentation for your custom instrumentation approach to learn more:

{{< tabs >}}
{{% tab "Datadog API" %}}

Use the Datadog API to add custom instrumentation that allows you to programmatically create, modify, or delete traces to send to Datadog. This is useful for tracing in-house code not captured by automatic instrumentation, removing unwanted spans from traces, and for providing deeper visibility and context into spans, including adding span tags.

{{< partial name="apm/apm-manual-instrumentation-custom.html" >}}

<br>

{{% /tab %}}

{{% tab "OpenTelemetry API" %}}

Datadog tracing libraries provide an implementation of the OpenTelemetry API for instrumenting your code. This means you can maintain vendor-neutral instrumentation of all your services, while still taking advantage of Datadog's native implementation, features, and products. You can configure it to generate Datadog-style spans and traces to be processed by the Datadog tracing library for your language, and send those to Datadog.

{{< partial name="apm/apm-otel-instrumentation-custom.html" >}}

<br>

{{% /tab %}}

{{% tab "OpenTracing (legacy)" %}}

[OpenTelemetry][1] や [`ddtrace`][2] のカスタムインスツルメンテーションがうまく機能しない場合、サポートされている各言語は [OpenTracing][3] データを Datadog に送信するサポートも備えています。OpenTracing はアーカイブされ、プロジェクトはサポートされていません。

{{< partial name="apm/apm-opentracing-custom.html" >}}

<br>

[1]: /tracing/trace_collection/otel_instrumentation/
[2]: /tracing/trace_collection/custom_instrumentation/
[3]: https://opentracing.io/docs/

{{% /tab %}}
{{< /tabs >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[2]: /tracing/trace_collection/custom_instrumentation/dd_libraries/
[3]: /tracing/trace_collection/custom_instrumentation/otel_instrumentation
[4]: /tracing/trace_collection/custom_instrumentation/opentracing/
[5]: /tracing/trace_collection/single-step-apm
[6]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/
[7]: /tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent

