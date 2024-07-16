---
algolia:
  tags:
  - seguimiento de errores
description: Aprende a buscar y gestionar los errores de los servicios de backend.
further_reading:
- link: https://www.datadoghq.com/blog/service-page/
  tag: Blog
  text: Explorar una vista centralizada de la telemetría de los servicios, el seguimiento
    de errores, los SLOs y más
- link: /tracing/trace_explorer/trace_view/
  tag: Documentación
  text: Más información sobre Trace Explorer
- link: /tracing/error_tracking/explorer
  tag: Documentación
  text: Más información sobre Error Tracking Explorer
- link: /monitors/types/error_tracking/
  tag: Documentación
  text: Crear un monitor de seguimiento de errores
kind: documentación
title: Seguimiento de errores para servicios de backend
---

## Información general

{{< img src="error_tracking/error-tracking-overview.png" alt="Los detalles de un problema en Error Tracking Explorer" style="width:100%;" >}}

{{% error-tracking-description %}}

## Ajuste

El seguimiento de errores está disponible para todos los idiomas que admite APM y no requiere el uso de un SDK diferente.

Opcionalmente, para ver fragmentos de código en las stack traces, configura la [integración de GitHub][4].

{{< img src="tracing/error_tracking/inline_code_snippet.png" alt="Un fragmento de código en línea en una stack trace" style="width:70%;" >}}

Para empezar a configurar tu repositorio, consulta la [documentación sobre la integración del código fuente][6].

## Utilizar etiquetas (tags) de tramos (spans) para realizar un seguimiento de los tramos (spans) de errores

Los rastreadores de Datadog recogen errores a través de las integraciones y la instrumentación manual del código fuente de los servicios de backend. Los tramos (spans) de errores dentro de una traza (trace) son procesados por el seguimiento de errores **si el error se encuentra en un tramo (span) de entrada de servicio** (el tramo [span] del servicio superior). Este tramo (span) también debe contener las [etiquetas (tags) de tramos (spans)][1] `error.stack`, `error.message` y `error.type` para ser rastreado.

{{< img src="tracing/error_tracking/flamegraph_with_errors.png" alt="Gráfica de llamas con errores. style="width:100%;" >}}

El seguimiento de errores computa una huella digital para cada tramo (span) de error. Procesa el tipo de error, el mensaje de error y los marcos que forman la stack trace. Los errores con la misma huella digital se agrupan y pertenecen al mismo problema. Para obtener más información, consulta la [documentación de Trace Explorer][2].

## Examinar los problemas para comenzar a solucionarlos o a depurar

El seguimiento de errores categoriza automáticamente los errores de los problemas de los servicios de backend en [Error Tracking Explorer][5]. Consulta la [documentación de Error Tracking Explorer][3] para conocer las principales funciones.

Los temas creados a partir de APM incluyen la distribución de tramos (spans) afectados, la última stack trace más relevante, etiquetas (tags) de tramos (spans), etiquetas (tags) de hosts, etiquetas (tags) de contenedores y métricas.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/visualization/trace/?tab=spantags#more-information
[2]: /es/tracing/trace_explorer/trace_view/?tab=spantags
[3]: /es/tracing/error_tracking/explorer
[4]: /es/tracing
[5]: https://app.datadoghq.com/apm/error-tracking
[6]: /es/integrations/guide/source-code-integration