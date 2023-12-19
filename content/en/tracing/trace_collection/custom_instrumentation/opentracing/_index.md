---
title: OpenTracing Instrumentation Setup
kind: documentation
type: multi-code-lang
aliases:
- /tracing/trace_collection/open_standards/
- /tracing/trace_collection/opentracing/
algolia:
  tags: ['opentracing']
---

If [OpenTelemetry][1] or [`ddtrace`][2] custom instrumentation doesn't work for you, each of the supported languages also has support for sending [OpenTracing][3] data to Datadog. OpenTracing is archived and the project is unsupported. 

Read more for your language: 

{{< whatsnext desc="Set up your application to send traces using OpenTracing." >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/opentracing/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/opentracing/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/opentracing/ruby" >}}Ruby{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/opentracing/go" >}}Go{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/opentracing/nodejs" >}}NodeJS{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/opentracing/php" >}}PHP{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/opentracing/dotnet" >}}.NET{{< /nextlink >}}
{{< /whatsnext >}}

<br>

[1]: /tracing/trace_collection/otel_instrumentation/
[2]: /tracing/trace_collection/custom_instrumentation/
[3]: https://opentracing.io/docs/