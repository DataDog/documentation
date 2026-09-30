---
algolia:
  tags:
  - error tracking
description: Aprenda a buscar y gestionar los errores recopilados de sus servicios
  de backend.
further_reading:
- link: https://www.datadoghq.com/blog/service-page/
  tag: Blog
  text: Explore una vista centralizada de la telemetría de servicios, Error Tracking,
    SLOs, y más
- link: /tracing/trace_explorer/trace_view/
  tag: Documentación
  text: Aprenda sobre el Trace Explorer
- link: /tracing/error_tracking/explorer
  tag: Documentación
  text: Aprenda sobre Error Tracking Explorer
- link: /monitors/types/error_tracking/
  tag: Documentación
  text: Cree un monitor de Error Tracking
title: Error Tracking para servicios de backend
---
## Descripción general {#overview}

{{< img src="error_tracking/error-tracking-overview-3.png" alt="Los detalles de un problema en Error Tracking Explorer" style="width:100%;" >}}

{{% error-tracking-description %}}

## Configuración {#setup}

Error Tracking está disponible para todos los lenguajes compatibles con APM. No requiere SDK adicional ni cambios de configuración.

Opcionalmente, para ver fragmentos de código en sus trazas de pila, configure la [integración con GitHub][4].

{{< img src="tracing/error_tracking/inline_code_snippet_2.png" alt="Un fragmento de código en línea en una traza de pila" style="width:70%;" >}}

Para comenzar a configurar su repositorio, consulte la [documentación de integración de código fuente][6].

## Utilice atributos de tramo para realizar el seguimiento de tramos de error {#use-span-attributes-to-track-error-spans}

Los SDK de Datadog recopilan errores a través de integraciones y la instrumentación manual del código fuente de sus servicios de backend. Un tramo de error debe contener los [atributos de tramo][1] `error.stack`, `error.message` y `error.type`, y pertenecer a una traza completa para ser rastreado. Si un error se reporta varias veces dentro de un servicio, solo se conserva el error superior.

<div class="alert alert-warning">
El tracer de Go introdujo un cambio en los atributos utilizados para reportar trazas de pila en su versión v2.7.0.
Para versiones anteriores del tracer de Go (anteriores a la v2.7.0), la traza de pila se reporta en el <code>error.stack</code> atributo de tramo.
A partir de la versión v2.7.0, el tracer de Go reporta la traza de pila de manejo en el <code>error.handling_stack</code> atributo de tramo (con <code>error.stack</code> ahora transporta la traza de pila de lanzamiento cuando está disponible).
Consulte <a href="/tracing/error_tracking/stack_traces/">Stack Traces in Error Tracking</a> para obtener más detalles.
</div>

{{< img src="tracing/error_tracking/flamegraph_with_errors.png" alt="Flame graph con errores" style="width:100%;" >}}

Error Tracking calcula una huella digital para cada tramo de error que procesa. La huella digital utiliza el tipo de error, el mensaje de error y los marcos que forman la traza de pila. Los errores con la misma huella digital se agrupan y pertenecen al mismo problema. Para obtener más información, consulte la [documentación de Trace Explorer][2].

## Controle qué errores se rastrean {#control-which-errors-are-tracked}

Error Tracking procesa automáticamente todos los tramos de error, pero usted puede controlar qué errores se ingieren y cómo se gestionan:

- **Filtre errores con reglas de inclusión y exclusión**: Defina reglas para incluir o excluir errores según atributos como servicio, entorno o tipo de error. Consulte [Manage Data Collection][7].
- **Establezca límites de tasa**: Controle el volumen de errores ingeridos por día para gestionar los costos. Consulte [Manage Data Collection][7].
- **Excluya problemas específicos**: Marque los problemas recurrentes que no requieren acción como `EXCLUDED` para dejar de recopilarlos. Consulte [Issue States][8].
- **Filtre trazas completas**: Evite que las trazas se envíen a Datadog (en lugar de filtrar errores). Consulte [Ignoring Unwanted Resources in APM][9].

## Examine los problemas para comenzar a solucionar o depurar {#examine-issues-to-start-troubleshooting-or-debugging}

Error Tracking categoriza automáticamente los errores en problemas recopilados de sus servicios de backend en el [Error Tracking Explorer][5]. Consulte la [documentación del Error Tracking Explorer][3] para obtener un recorrido por las funciones clave.

Los problemas creados a partir de APM incluyen la distribución de los tramos afectados, la traza de pila más relevante y reciente, los atributos de tramo, las etiquetas de servidor, las etiquetas de contenedor y las métricas.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/visualization/trace/?tab=spantags#more-information
[2]: /es/tracing/trace_explorer/trace_view/?tab=spantags
[3]: /es/tracing/error_tracking/explorer
[4]: /es/tracing
[5]: https://app.datadoghq.com/apm/error-tracking
[6]: /es/integrations/guide/source-code-integration
[7]: /es/error_tracking/manage_data_collection/
[8]: /es/error_tracking/issue_states/
[9]: /es/tracing/guide/ignoring_apm_resources/