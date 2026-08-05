---
algolia:
  tags:
  - opentracing
aliases:
- /fr/tracing/trace_collection/open_standards/
- /fr/tracing/trace_collection/opentracing/
title: Configuration de l'instrumentation OpenTracing
type: multi-code-lang
---

Si l'instrumentation personnalisée avec [OpenTelemetry][1] ou [`ddtrace`][2] ne vous convient pas, chaque langage pris en charge permet également d'envoyer des données [OpenTracing][3] à Datadog. OpenTracing est un projet archivé et non pris en charge.

En savoir plus selon votre langage :

{{< whatsnext desc="Configurez votre application pour envoyer des traces avec OpenTracing." >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/opentracing/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/opentracing/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/opentracing/ruby" >}}Ruby{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/opentracing/nodejs" >}}Node.js{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/opentracing/php" >}}PHP{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/opentracing/dotnet" >}}.NET{{< /nextlink >}}
{{< /whatsnext >}}

<br>

[1]: /fr/tracing/trace_collection/otel_instrumentation/
[2]: /fr/tracing/trace_collection/custom_instrumentation/
[3]: https://opentracing.io/docs/