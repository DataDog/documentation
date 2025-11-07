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
title: Seguimiento de errores para servicios de backend
---

## Información general

{{< img src="error_tracking/error-tracking-overview-2.png" alt="Información detallada de un problema en el Explorador de seguimiento de errores" style="width:100%;" >}}

{{% error-tracking-description %}}

## Configuración

El seguimiento de errores está disponible para todos los idiomas que admite APM y no requiere el uso de un SDK diferente.

Opcionalmente, para ver fragmentos de código en trazas (traces) de stack tecnológico, configura la [integración de GitHub][4].

{{< img src="tracing/error_tracking/inline_code_snippet.png" alt="Un fragmento de código en línea en una traza de stack tecnológico," style="width:70%;" >}}

Para empezar a configurar tu repositorio, consulta la [documentación sobre la integración del código fuente][6].

## Uso de los atributos de tramos (spans) para realizar el seguimiento de tramos de errores

Los rastreadores de Datadog recopilan errores a través de las integraciones y de la instrumentación manual del código fuente de tus servicios backend. Un tramo de error debe contener los [atributos de tramo][1] `error.stack`, `error.message` y `error.type` para ser rastreado. Si un error se notifica varias veces dentro de un servicio, sólo se conserva el error más destacado.

{{< img src="tracing/error_tracking/flamegraph_with_errors.png" alt="Gráfica de llamas con errores." style="width:100%;" >}}

El seguimiento de errores computa una huella digital para cada tramo de error. Procesa el tipo de error, el mensaje de error y los marcos que forman la traza de stack tecnológico,. Los errores con la misma huella digital se agrupan y pertenecen al mismo problema. Para obtener más información, consulta la [documentación de Trace Explorer][2].

## Examinar los problemas para comenzar a solucionarlos o a depurar

El seguimiento de errores categoriza automáticamente los errores de los problemas de los servicios de backend en [Error Tracking Explorer][5]. Consulta la [documentación de Error Tracking Explorer][3] para conocer las principales funciones.

Los problemas creados a partir de APM incluyen la distribución de los tramos afectados, la última traza de stack tecnológico más relevante, los atributos de tramos, las etiquetas (tags) de hosts, las etiquetas de contenedores y las métricas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tracing/visualization/trace/?tab=spantags#more-information
[2]: /es/tracing/trace_explorer/trace_view/?tab=spantags
[3]: /es/tracing/error_tracking/explorer
[4]: /es/tracing
[5]: https://app.datadoghq.com/apm/error-tracking
[6]: /es/integrations/guide/source-code-integration