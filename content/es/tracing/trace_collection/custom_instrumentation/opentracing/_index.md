---
algolia:
  tags:
  - opentracing
aliases:
- /es/tracing/trace_collection/open_standards/
- /es/tracing/trace_collection/opentracing/
kind: documentación
title: Configuración de la instrumentación de OpenTracing
type: multi-code-lang
---

Si la instrumentación personalizada de [OpenTelemetry][1] o [`ddtrace`][2] no funciona para tu caso, cada uno de los lenguajes compatibles también sirven para enviar datos de [OpenTracing][3] a Datadog. OpenTracing está archivado y el proyecto no es compatible.

Lea más para tu lenguaje:

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

[1]: /es/tracing/trace_collection/otel_instrumentation/
[2]: /es/tracing/trace_collection/custom_instrumentation/
[3]: https://opentracing.io/docs/