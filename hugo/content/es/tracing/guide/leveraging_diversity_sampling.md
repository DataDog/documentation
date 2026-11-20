---
further_reading:
- link: /tracing/trace_pipeline/trace_retention/
  tag: Documentación
  text: Control de la indexación de trazas para la retención
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: Centro de arquitectura
  text: 'Dominio del rastreo distribuido: desafíos de volumen de datos y el enfoque
    de Datadog para un muestreo eficiente'
title: Comprenda la política de retención de Datadog para retener datos de trazas
  de manera eficiente
---
## Ingesta y retención de las trazas que le interesan {#ingesting-and-retaining-the-traces-you-care-about}

La mayoría de las trazas generadas por sus aplicaciones son repetitivas y no es necesariamente relevante ingerirlas y retenerlas todas. Para las solicitudes exitosas, retener una **muestra representativa** del tráfico de sus aplicaciones es suficiente, ya que no es posible analizar docenas de solicitudes trazadas individuales cada segundo.

Lo más importante son las trazas que contienen síntomas de posibles problemas en su infraestructura, es decir, **trazas con errores o latencia inusual**. Además, para **endpoints específicos que son críticos para su negocio**, es posible que desee retener el 100% del tráfico, para asegurarse de poder investigar y solucionar cualquier problema del cliente con gran detalle. 

{{< img src="/tracing/guide/leveraging_diversity_sampling/relevant_traces.png" alt="Las trazas relevantes se retienen almacenando una combinación de trazas de alta latencia, trazas de error y trazas críticas para el negocio." style="width:80%;" >}}


## Cómo le ayuda la política de retención de Datadog a retener lo que importa {#how-datadogs-retention-policy-helps-you-retain-what-matters}

Datadog ofrece dos formas principales de retener datos más allá de los 15 minutos: 
- El [filtro de retención inteligente](#diversity-sampling-algorithm-intelligent-retention-filter) que siempre está habilitado.
- [Filtros de retención personalizados basados en etiquetas](#tag-based-retention-filters) que puede configurar manualmente.

{{< img src="/tracing/guide/leveraging_diversity_sampling/datadog_captures_relevant_traces.png" alt="Datadog captura trazas relevantes de errores y latencia a través del filtro de retención inteligente, y trazas críticas para el negocio a través de filtros de retención personalizados." style="width:80%;" >}}


### Algoritmo de muestreo de diversidad: filtro de retención inteligente {#diversity-sampling-algorithm-intelligent-retention-filter}

De forma predeterminada, el filtro de retención inteligente mantiene una selección representativa de trazas sin que tenga que crear docenas de filtros de retención personalizados.

Mantiene al menos un tramo (y la traza distribuida asociada) para cada combinación de `environment`, `service`, `operation` y `resource` cada 15 minutos como máximo para los percentiles de latencia `p75`, `p90` y `p95`, así como una selección representativa de errores, para cada código de estado de respuesta distinto.

Para obtener más información, lea la [documentación del filtro de retención inteligente][1].

### Filtros de retención basados en etiquetas {#tag-based-retention-filters}

Los [filtros de retención basados en etiquetas][2] ofrecen la flexibilidad de conservar las trazas que son más críticas para su negocio. Al indexar tramos con filtros de retención, también se almacena la traza asociada, lo que garantiza que mantenga la visibilidad de toda la solicitud y su contexto distribuido.

## Búsqueda y análisis eficaces de datos de tramos indexados {#searching-and-analyzing-indexed-span-data-effectively}

El conjunto de datos capturado por el muestreo de diversidad **no se muestrea de manera uniforme** (es decir, no es proporcionalmente representativo de todo el tráfico). Está sesgado hacia errores y rastreos de alta latencia. Si desea crear análisis solo a partir de un conjunto de datos muestreado de manera uniforme, excluya estos tramos que se muestrean por motivos de diversidad agregando el parámetro de consulta `-retained_by:diversity_sampling` en Trace Explorer.

Por ejemplo, para medir la cantidad de operaciones de pago agrupadas por nivel de comerciante en su aplicación, **excluir el conjunto de datos de muestreo de diversidad** garantiza que realice este análisis a partir de un conjunto de datos representativo, por lo que las proporciones de `basic`, `enterprise` y `premium` pagos son realistas:

{{< img src="/tracing/guide/leveraging_diversity_sampling/checkout_ops_by_tier.png" alt="Cantidad de operaciones de pago por nivel, análisis que excluyen los datos muestreados por diversidad" style="width:80%;" >}}

Por otro lado, si desea medir la cantidad de comerciantes únicos por nivel de comerciante, **incluya el conjunto de datos de muestreo de diversidad** que podría capturar identificadores de comerciante adicionales no detectados por los filtros de retención personalizados:

{{< img src="/tracing/guide/leveraging_diversity_sampling/nb_merchants_by_merchant_tier.png" alt="Cantidad de comerciantes únicos por nivel. análisis que incluyen datos muestreados por diversidad" style="width:80%;" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_pipeline/trace_retention#datadog-intelligent-retention-filter
[2]: /es/tracing/trace_pipeline/trace_retention