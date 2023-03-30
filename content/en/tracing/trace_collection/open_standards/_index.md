---
title: OpenTracing Instrumentation Setup
kind: documentation
type: multi-code-lang
---

If [OpenTelemetry][1] or [`ddtrace`][2] custom instrumentation doesn't work for you, each of the supported languages also has support for sending [OpenTracing][3] data to Datadog. OpenTracing is archived and the project is unsupported. 

Read more for your language: 

{{< whatsnext desc="Set up your application to send traces using OpenTracing." >}}
    {{< nextlink href="/tracing/trace_collection/open_standards/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/open_standards/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/open_standards/ruby" >}}Ruby{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/open_standards/go" >}}Go{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/open_standards/nodejs" >}}NodeJS{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/open_standards/php" >}}PHP{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/open_standards/dotnet" >}}.NET{{< /nextlink >}}
{{< /whatsnext >}}

<br>

[1]: /tracing/trace_collection/otel_instrumentation/
[2]: /tracing/trace_collection/custom_instrumentation/
[3]: https://opentracing.io/docs/