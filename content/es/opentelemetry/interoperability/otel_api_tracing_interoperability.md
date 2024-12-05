---
aliases:
- /opentelemetry/guide/otel_api_tracing_interoperability/
further_reading:
- link: /tracing/trace_collection/otel_instrumentation/
  tag: Documentación
  text: Instrumentación personalizada con la API de OpenTelemetry
- link: /tracing/trace_collection/trace_context_propagation/
  tag: Documentación
  text: Propagación de contextos de trazas en Datadog
title: Interoperabilidad de la API de OpenTelemetry y trazas de Datadog instrumentadas
---

## Instrumentación personalizada con la API de OpenTelemetry

Las bibliotecas de rastreo de Datadog proporcionan una implementación de la [API de OpenTelemetry][1] para instrumentar tu código. Esto significa que puedes mantener una instrumentación de proveedor neutral de todos tus servicios, sin dejar de aprovechar la implementación nativa, las características y los productos de Datadog.

Con [la instrumentación de tu código con la API de OpenTelemetry][2]:

- Tu código permanece libre de llamadas a la API específicas del proveedor.
- Tu código no depende de las bibliotecas de rastreo de Datadog en el tiempo de compilación (solo en el tiempo de ejecución).
- Tu código no utiliza la API de OpenTracing obsoleta.

Sustituye el SDK de OpenTelemetry por la biblioteca de rastreo de Datadog en la aplicación instrumentada, y las trazas (traces) producidas por tu código en ejecución pueden ser procesadas, analizadas y monitorizadas junto con las trazas de Datadog y en los productos propiedad de Datadog como [Continuous Profiler][3], [Data Streams Monitoring][4], [Application Security Management][5], y [Live Processes][6].

## Propagación de contexto de trazas W3C

Para facilitar el manejo fluido de los datos de traza de OpenTelemetry dentro de Datadog y correlacionarlos con los datos de traza generados por la instrumentación de Datadog, las versiones más recientes de las bibliotecas de rastreo de Datadog admiten ambos [estilos de propagación, Datadog (`datadog`) y W3C (`tracecontext`)][8] por defecto. [Actualiza tus dependencias de la biblioteca de rastreo de tiempo de ejecución][7] a la versión más reciente.

Este estilo de propagación de contexto permite a los rastreadores de Datadog operar en el mismo entorno de aplicación con los SDKs de OpenTelemetry y otros rastreadores conformes con W3C.


## Identificadores de traza de 128 bits

Las trazas W3C contienen implícitamente identificadores de traza de 128 bits, en lugar de los identificadores de traza de 64 bits que las trazas de Datadog han utilizado históricamente. La configuración de las bibliotecas de rastreo de Datadog más reciente por defecto utiliza el ajuste `DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED=True` para que también produzcan datos de traza con IDs de traza de 128 bits. 

Siguiendo las [recomendaciones de contexto de traza W3C][9], los IDs de traza de 128 bits de Datadog tienen aleatoriedad en los 64 bits de orden inferior. Esta restricción proporciona compatibilidad con versiones anteriores para los sistemas que entremezclan bibliotecas que generan IDs de traza de 64 bits con otras más recientes que admiten IDs de 128 bits. En tales sistemas, los tramos (spans) con el ID de traza completo de 128 bits y los tramos con el ID de traza truncado de 64 bits de orden inferior pueden llegar al backend y ser tratados como coincidentes y parte de la misma traza.

{{< img src="opentelemetry/guide/otel_api_tracing_interop/128-62-bit-trace-ids.png" alt="IDs de traza de 128 bits pueden pasarse con un contexto de traza para codificar aquellas bibliotecas de rastreo que generan IDs de traza de 64 bits, y Datadog puede correlacionarlos correctamente en el backend." style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://opentelemetry.io/docs/specs/otel/trace/api/
[2]: /es/tracing/trace_collection/otel_instrumentation/
[3]: /es/profiler/
[4]: /es/data_streams/
[5]: /es/security/application_security/
[6]: /es/infrastructure/process
[7]: /es/tracing/trace_collection/dd_libraries/
[8]: /es/tracing/trace_collection/trace_context_propagation/
[9]: https://www.w3.org/TR/trace-context/#handling-trace-id-for-compliant-platforms-with-shorter-internal-identifiers