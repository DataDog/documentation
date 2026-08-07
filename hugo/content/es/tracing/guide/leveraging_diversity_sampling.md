---
further_reading:
- link: /tracing/trace_pipeline/trace_retention/
  tag: Documentación
  text: Control de la indexación de trazas para la retención
title: Comprender la política de retención de Datadog para retener eficazmente los
  datos de traza
---

## Ingerir y retener las trazas que te interesan

La mayoría de las trazas (traces) generadas por tus aplicaciones son repetitivas, y no es necesariamente relevante ingerirlas y retenerlas a todas. En el caso de las solicitudes satisfactorias, basta con conservar una **muestra representativa** del tráfico de tus aplicaciones, ya que no es posible analizar decenas de solicitudes rastreadas cada segundo.

Las más importante son las trazas que contienen indicios de posibles problemas en tu infraestructura, es decir, **trazas con errores o latencia inusual**. Además, para **endpoints específicos que son críticos para tu negocio**, es posible que desees retener el 100% del tráfico, para asegurarte de investigar y solucionar cualquier problema del cliente en detalle.

{{< img src="/tracing/guide/leveraging_diversity_sampling/relevant_traces.png" alt=" Las trazas relevantes se retienen al almacenar una combinación de trazas de alta latencia, trazas de errores y trazas críticas para el negocio." style="width:80%;" >}}


## Cómo la política de retención de Datadog te ayuda a retener lo importante

Datadog ofrece dos formas principales de retener los datos por más de 15 minutos:
- El [Filtro de retención inteligente](#diversity-sampling-algorithm-intelligent-retention-filter) que siempre está activado.
- [Filtros de retención personalizados basados en etiquetas](#tag-based-retention-filters) que puedes configurar manualmente.

{{< img src="/tracing/guide/leveraging_diversity_sampling/datadog_captures_relevant_traces.png" alt="Datadog captura trazas de errores y latencia relevantes mediante el filtro de retención inteligente, y trazas críticas para el negocio mediante filtros de retención personalizados." style="width:80%;" >}}


### Algoritmo de muestreo de diversidad: filtro de retención inteligente

Por defecto, el filtro de retención inteligente mantiene una selección representativa de trazas sin necesidad de crear decenas de filtros de retención personalizados.

Conserva al menos un tramo (y la traza distribuida asociada) para cada combinación de `environment`, `service`, `operation` y `resource` cada 15 minutos como máximo para los percentiles de latencia `p75`, `p90` y `p95`, así como una selección representativa de errores, para cada código de estado de respuesta distinto.

Para saber más, lee la [documentación del filtro de retención inteligente][1].

### Filtros de retención basados en etiquetas

Los [filtros de retención basados en etiquetas][2] proporcionan la flexibilidad necesaria para conservar las trazas más importantes para tu empresa. Cuando se indexan tramos con filtros de retención, también se almacena la traza asociada, lo que asegura que se mantenga la visibilidad de toda la solicitud y su contexto distribuido.

## Búsqueda y análisis eficaces de datos de tramo indexados

El conjunto de datos recopilados por el muestreo de diversidad **no está muestreado de forma uniforme** (es decir, no es proporcionalmente representativo del tráfico completo). Está sesgado hacia los errores y las trazas de alta latencia. Si deseas hacer un análisis solo sobre un conjunto de datos muestreados de forma uniforme, excluye estos tramos que se muestrean por razones de diversidad añadiendo el parámetro de consulta `-retained_by:diversity_sampling` en el Trace Explorer.

Por ejemplo, para medir el número de operaciones de pago agrupadas por nivel de comerciante en tu aplicación, **excluir el conjunto de datos de muestreo de diversidad** asegura que realizas este análisis sobre un conjunto de datos representativo, y así las proporciones de pagos `basic`, `enterprise` y `premium` son realistas:

{{< img src="/tracing/guide/leveraging_diversity_sampling/checkout_ops_by_tier.png" alt="Número de operaciones de pago por nivel, análisis que excluye los datos de muestreo de diversidad" style="width:80%;" >}}

Por otro lado, si deseas medir el número de comerciantes únicos por nivel de comerciante, **incluye el conjunto de datos de muestreo de diversidad** que podría capturar IDs de comerciantes adicionales no detectados por los filtros de retención personalizados:

{{< img src="/tracing/guide/leveraging_diversity_sampling/nb_merchants_by_merchant_tier.png" alt="Número de comerciantes por nivel, análisis que incluye los datos de muestreo de diversidad" style="width:80%;" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_pipeline/trace_retention#datadog-intelligent-retention-filter
[2]: /es/tracing/trace_pipeline/trace_retention