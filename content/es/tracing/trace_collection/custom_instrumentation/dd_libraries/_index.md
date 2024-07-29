---
algolia:
  tags:
  - Instrumentación personalizada de APM
aliases:
- /es/tracing/setup/php/manual-installation
- /es/agent/apm/php/manual-installation
- /es/tracing/guide/distributed_tracing/
- /es/tracing/advanced/manual_instrumentation/
- /es/tracing/advanced/opentracing/
- /es/tracing/opentracing/
- /es/tracing/manual_instrumentation/
- /es/tracing/guide/adding_metadata_to_spans
- /es/tracing/advanced/adding_metadata_to_spans/
- /es/tracing/custom_instrumentation
- /es/tracing/setup_overview/custom_instrumentation/undefined
- /es/tracing/setup_overview/custom_instrumentation/
description: Personaliza tu instrumentación y la observabilidad en tus trazas (traces)
  de Datadog.
further_reading:
- link: tracing/guide/instrument_custom_method
  text: Instrumentar un método personalizado para obtener una visibilidad profunda
    de tu lógica de negocio
- link: tracing/connect_logs_and_traces
  text: Conecta tus logs y trazas juntos
- link: tracing/visualization/
  text: Explora tus servicios, recursos y trazas
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  text: Más información sobre Datadog y la iniciativa OpenTelemetry
title: Instrumentación personalizada con bibliotecas de Datadog
type: lenguaje multicódigo
---

La Instrumentación personalizada permite la creación, modificación o eliminación programática de trazas (traces) para enviarlas a Datadog. Esto es útil para rastrear el código interno no capturado por la instrumentación automática, eliminar tramos (spans) no deseados de trazas y proporcionar una visibilidad y contexto más profundos en los tramos, incluido añadir cualquier etiqueta (tag) de tramo deseada.

Antes de instrumentar tu aplicación, revisa la [Terminología de APM][2] de Datadog y familiarízate con los conceptos básicos de la APM de Datadog.

Si utilizas un estándar abierto para instrumentar tu código, consulta [Instrumentar con OpenTracing][3] o [Instrumentar con OpenTelemetry][4].

{{< nombre parcial="apm/apm-manual-instrumentation.html" >}}


<br>

## Leer más

{{< nombre parcial="whats-next/whats-next.html" >}}


[2]: /es/tracing/glossary
[3]: /es/tracing/trace_collection/opentracing/
[4]: /es/tracing/trace_collection/otel_instrumentation