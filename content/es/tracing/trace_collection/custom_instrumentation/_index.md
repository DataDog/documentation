---
algolia:
  tags:
  - Instrumentación personalizada de APM
further_reading:
- link: tracing/guide/instrument_custom_method
  text: Instrumentar un método personalizado para obtener una visibilidad profunda
    de tu lógica de negocio
- link: tracing/connect_logs_and_traces
  text: Conectar tu logs y trazas juntos
- link: tracing/visualization/
  text: Explora tus servicios, recursos y trazas
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  text: Leer más sobre Datadog y la iniciativa OpenTelemetry
title: Instrumentación personalizada
---

## Información general

La instrumentación personalizada permite una monitorización precisa de componentes específicos de tu aplicación. Permite capturar datos de observabilidad de código interno o funciones complejas que no captura la instrumentación automática. La instrumentación automática incluye la [Instrumentación de un paso][5] o el uso de [Bibliotecas de rastreo de Datadog][6].

La instrumentación personalizada implica incrustar el código de rastreo directamente en el código de tu aplicación. Esto permite crear, modificar o eliminar mediante programación trazas (traces) para enviarlo a Datadog.

## Casos de uso

Algunas situaciones en las que podrías utilizar la instrumentación personalizada incluyen las siguientes:

- Recopilar datos de observabilidad del código personalizado con lógica de negocio única o compleja.
- Proporcionar una visibilidad y un contexto más profundos en tramos (spans), incluido añadir etiquetas (tags) de tramos][1].
- Monitorizar con precisión secuencias específicas de operaciones o interacciones de usuario que requieren un control específico.
- Eliminar tramos no deseados de trazas (traces).

## Empezando

Antes de empezar, asegúrate de haber [instalado y configurado el Agent][7].

Para más información, consulta la documentación relevante para tu método de instrumentación personalizada:

{{< tabs >}}
{{% tab "Datadog API" %}}

Utiliza la API Datadog para añadir una instrumentación personalizada que te permita crear, modificar o eliminar mediante programación trazas para enviar a Datadog. Esto es útil para rastrear el código interno no capturado por la instrumentación automática, eliminar tramos no deseados de trazas y para proporcionar una visibilidad y un contexto más profundos en tramos, incluido añadir etiquetas de tramos.

{{< nombre parcial="apm/apm-manual-instrumentation-custom.html" >}}

<br>

{{% /tab %}}

{{% tab "OpenTelemetry API" %}}

Las bibliotecas de rastreo de Datadog proporcionan una implementación de la API OpenTelemetry para instrumentar tu código. Esto significa que puedes mantener una instrumentación independiente del proveedor de todos tus servicios, sin dejar de aprovechar la implementación nativa, las funciones y los productos de Datadog. Puedes configurarla para generar tramos y trazas del estilo de Datadog que han de ser procesados por la biblioteca de rastreo de Datadog para tu lenguaje y enviar estos a Datadog.

{{< nombre parcial="apm/apm-otel-instrumentation-custom.html" >}}

<br>

{{% /tab %}}

{{% tab "OpenTracing (legacy)" %}}

Si la instrumentación personalizada de [OpenTelemetry][1] o [`ddtrace`][2] no funciona para ti, cada uno de los lenguajes compatibles también tiene soporte técnico para enviar datos de [OpenTracing][3] a Datadog. OpenTracing está archivado y el proyecto no tiene soporte técnico. 

{{< nombre parcial="apm/apm-opentracing-custom.html" >}}

<br>

[1]: /es/tracing/trace_collection/otel_instrumentation/
[2]: /es/tracing/trace_collection/custom_instrumentation/
[3]: https://opentracing.io/docs/

{{% /tab %}}
{{< /tabs >}}

## Leer más

{{< nombre parcial="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[2]: /es/tracing/trace_collection/custom_instrumentation/dd_libraries/
[3]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation
[4]: /es/tracing/trace_collection/custom_instrumentation/opentracing/
[5]: /es/tracing/trace_collection/single-step-apm
[6]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[7]: /es/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent