---
further_reading:
- link: /tracing/trace_explorer/trace_queries/
  tag: Documentación
  text: Consultas de traza
title: Consultas de traza de datos de origen
---

## Información general

Con las Consultas de traza, puedes encontrar trazas (traces) enteras basadas en las propiedades de múltiples tramos (spans) y las relaciones entre esos tramos dentro de la estructura de la traza. Para saber más, lee la [documentación de Consultas de traza][1].

{{< img src="tracing/trace_queries/trace_queries.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Interfaz de usuario de Consultas de traza" >}}

## Cómo usar las Consultas de traza con datos de origen

Datadog utiliza el [Filtro de retención inteligente][6] para indexar los datos de las Consultas de traza. Para ello realiza las siguientes acciones:

- [Muestreo plano](#1-flat-sampling): una muestra uniforme del 1% de los tramos ingeridos.
- [Muestreo diverso](#diversity-sampling): una selección representativa y diversa de trazas para mantener la visibilidad sobre cada entorno, servicio, operación y recurso.

Estos 2 mecanismos de muestreo capturan las **trazas completas**, lo que significa que todos los tramos de una traza están siempre indexados para garantizar el buen funcionamiento de las consultas de traza.

{{< img src="tracing/trace_queries/trace_queries_new_dataset.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Muestreo plano del 1% y muestreo diverso" >}}

**Nota**: Los tramos indexados por muestreo plano y muestreo diverso no cuentan para el uso de tramos indexados y, por lo tanto, **no repercuten en tu factura**.

### Muestreo plano del 1%
`retained_by:flat_sampled`

El muestreo plano del 1% se aplica sobre la base de `trace_id`, lo que significa que todos los tramos pertenecientes a la misma traza comparten la misma decisión de muestreo. Para obtener más información, lee la [documentación sobre el muestreo plano del 1%][2].

### Muestreo diverso
`retained_by:diversity_sampling`

Cada 15 minutos, el muestreo diverso retiene al menos un tramo y la traza asociada para cada combinación de entorno, servicio, operación y recurso. Esto ocurre para el percentil de latencias `p75`, `p90` y `p95` para asegurar que siempre se puede encontrar un ejemplo de trazas en servicio y páginas de recursos, incluso para endpoints con poco tráfico. Para obtener más información, lee la [documentación sobre el muestreo diverso][3].

## Impacto de activar Consultas de traza

Desde el momento en que se activan las Consultas de traza en tu cuenta (encuentra la fecha exacta en el evento publicado en el Flujo de eventos), el filtro de retención inteligente comienza a indexar más datos a medida que empieza a capturar trazas completas.

Puedes consultar los tramos indexados por el filtro de retención inteligente en el [Trace Explorer][4]. Como resultado, es posible que observes un pico en el número de tramos indexados en las consultas del Trace Explorer. Este cambio se indica mediante una superposición de evento que muestra un evento **Intelligent Retention Filter change** (Cambio del filtro de retención inteligente).

Para encontrar tramos muestreados por los métodos de muestreo plano del 1% o de muestreo diverso, añade un parámetro de consulta `retained_by:(flat_sampled OR diversity_sampling)` en el Trace Explorer.

{{< img src="tracing/trace_queries/intelligent_retention_filter_change.png" style="width:90%; background:none; border:none; box-shadow:none;" alt="Superposición de evento en el filtro de retención inteligente" >}}

Los tramos indexados por el filtro de retención inteligente se excluyen de las consultas de APM en las evaluaciones del [monitor de análisis de trazas][5]. Por lo tanto, los monitores **no se ven afectados** por este cambio.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tracing/trace_explorer/trace_queries/
[2]: /es/tracing/trace_pipeline/trace_retention/#one-percent-flat-sampling
[3]: /es/tracing/trace_pipeline/trace_retention/#diversity-sampling
[4]: /es/tracing/trace_explorer/
[5]: /es/monitors/types/apm/?tab=traceanalytics
[6]: /es/tracing/trace_pipeline/trace_retention/#datadog-intelligent-retention-filter