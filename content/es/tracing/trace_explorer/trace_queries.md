---
aliases:
- /es/tracing/trace_queries
description: Consultas de trazas
further_reading:
- link: https://www.datadoghq.com/blog/trace-queries/
  tag: Blog
  text: Analiza las causas raíz y el impacto empresarial de los problemas de producción
    con Consultas de trazas
- link: tracing/trace_explorer
  tag: Documentación
  text: Trace Explorer
- link: /tracing/trace_explorer/query_syntax/
  tag: Documentación
  text: Sintaxis de consulta de tramo
title: Consultas de trazas
---

## Información general

Con las Consultas de trazas, puedes encontrar trazas (traces) enteras basándose en las propiedades de varios tramos (spans) y las relaciones entre esos tramos dentro de la estructura de la traza. Para crear una consulta de traza, define dos o más [consultas de tramo][1] y, a continuación, especifica la relación dentro de la estructura de la traza buscada de los tramos que devuelve cada consulta de tramo.

Puede buscar, filtrar, agrupar y visualizar las trazas desde el explorador de Consultas de trazas.

Con la consulta de trazas basada en estructuras, puedes responder a preguntas como las siguientes:
- ¿Qué trazas incluye una dependencia entre dos servicios (`service A` tiene una llamada descendente a `service B`)?
- ¿Qué endpoints de la API se ven afectados por el error de mi servicio de backend?

Utiliza Consultas de trazas para acelerar tus investigaciones y encontrar información de trazas relevante.
## Editor de consultas de trazas

{{< img src="tracing/trace_queries/trace_query_editor.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Editor de consulta de trazas" >}}

Una consulta de trazas se compone de dos o más [consultas de tramo](#span-queries), unidas por [operadores de consulta de traza](#trace-query-operators).

### Consultas de tramo

Consulta tramos desde un entorno, servicio, o endpoint específico utilizando la [sintaxis de consulta de tramo][1]. Utiliza las sugerencias de autocompletar para ver las facetas y las consultas recientes.

Haz clic en **Add another span query** (Añadir otra consulta de tramo) para añadir una consulta de tramo y utilizarla en la sentencia de consulta de traza.

### Operadores de consulta de trazas

Combina varias consultas de tramo, etiquetadas como `a`, `b`, `c`, etc., en una consulta de trazas en el campo **Traces matching** (Coincidencia de trazas), utilizando operadores entre las letras que representan cada consulta de tramo:

{{< img src="/tracing/trace_queries/traces_matching.png" alt="Consultas de tramo combinadas en una consulta de traza" style="width:50%;" >}}

| Operador | Descripción | Ejemplo |
|-----|-----|-----|
| `&&` | **And**: ambos tramos están en la traza | Trazas que contienen tramos del servicio `web-store` y tramos del servicio `payments-go`: <br/>`service:web-store && service:payments-go` |
| `\|\|` | **Or**: uno u otro tramo están en la traza | Trazas que contienen tramos del servicio `web-store` o del servicio `mobile-store`: <br/>`service:web-store \|\| service:mobile-store` |
| `->` | **Relación indirecta**: trazas que contienen un tramo que coincide con la consulta de la izquierda y que es anterior a tramos que coinciden con la consulta de la derecha. | Trazas donde el servicio `checkoutservice` se encuentra en el flujo ascendente del servicio `quoteservice`: <br/>`service:checkoutservice -> service:quoteservice` |
| `=>` | **Relación directa**: trazas que contienen un tramo que coincide con la consulta de la izquierda y que es el tramo principal directo de un tramo que coincide con la consulta de la derecha. | Trazas donde el servicio `checkoutservice` llama directamente al servicio `shippingservice`: <br/>`service:checkoutservice => service:shippingservice` |
| `NOT` | **Exclusión**: trazas que **no** contienen tramos que coinciden con la consulta | Trazas que contienen tramos del servicio `web-store`, pero no del servicio `payments-go`: <br/>`service:web-store && NOT(service:payments-go)` |

### Filtros de nivel de traza

Filtra aún más el conjunto de resultados de trazas aplicando filtros en atributos de nivel de traza como el número de tramos o la duración de extremo a extremo de la traza en la sentencia **Where**:

{{< img src="/tracing/trace_queries/where_statement.png" alt="Ejemplo de filtros de nivel de traza" style="width:100%;" >}}


| Filtro | Descripción | Ejemplo |
|-----|-----|-----|
| `span_count(a)` | Número de apariciones de un tramo | Trazas que contienen más de 10 llamadas a una base de datos de Mongo: <br/>- **queryA**:`service:web-store-mongo @db.statement:"SELECT * FROM stores`<br/> - **Traces matching**:`a`<br/> - **Where**:`span_count(a):>10`|
| `total_span_count` | Número de tramos en la traza | Trazas que contengan más de 1000 tramos: <br/>**Where**`total_span_count:>1000` |
| `trace_duration` | Duración de la traza de extremo a extremo | Trazas cuyo tiempo de ejecución de extremo a extremo es superior a 5 segundos : <br/>**Where**:`trace_duration:>2s` |

## Mapa de flujo

{{< img src="tracing/trace_queries/trace_flow_map.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Mapa de flujo de trazas" >}}

El Mapa de flujo te ayuda a entender la ruta de la solicitud y las dependencias de servicio de las trazas resultantes que coinciden con la consulta de traza. Utiliza el mapa para identificar rutas de error, dependencias de servicio inusuales o tasas de solicitud anormalmente altas a una base de datos.

**Nota**: El Mapa de flujo se alimenta de [una muestra del tráfico ingerido](#the-data-that-trace-queries-are-based-on).

Los nodos de servicio que coinciden con las consultas de tramo aparecen resaltados para mostrarte a qué partes de la traza se dirigen tus condiciones de consulta.

Para obtener más información sobre **un solo servicio**, pasa el ratón sobre el nodo de servicio para ver sus métricas para la tasa de solicitud y la tasa de error. Para ver métricas para la tasa de solicitudes y la tasa de error **entre dos servicios**, sitúa el cursor sobre una esquina que conecte los dos servicios.

Para filtrar trazas que no contengan una dependencia de un servicio en particular, haz clic en el nodo del servicio en el mapa.

## Lista de traza

{{< img src="tracing/trace_queries/trace_list.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Lista de traza" >}}

La lista de traza muestra hasta cincuenta muestras de trazas que coinciden con la consulta y se encuentran dentro del intervalo de tiempo seleccionado.
Pasa el ratón sobre el Desglose de latencia para tener una idea de dónde (en qué servicios) se emplea el tiempo durante la ejecución de la solicitud.

**Nota**: La información mostrada en la tabla son atributos del tramo raíz de la traza, incluida la duración, que **no** representa la duración de extremo a extremo de la traza.

## Análisis

Selecciona una de las otras visualizaciones, como `Timeseries`, `Top List`, o `Table` para agregar resultados a lo largo del tiempo, agrupados por una o varias dimensiones. Lee [Visualizaciones de tramo][2] para obtener más información sobre las opciones de agregación. 

Además de estas opciones de agregación, también debes seleccionar la consulta de tramo (`a`, `b`, `c`, etc.) a partir de la cual deseas agregar tramos. Selecciona la consulta que coincida con los tramos a partir de la cual estás utilizando las etiquetas y los atributos en las opciones de agregación.

Por ejemplo, si consultas trazas que contengan un tramo del servicio `web-store` (consulta `a`) y un tramo del servicio `payments-go` con algunos errores (consulta `b`), y visualizad un recuento de tramos agrupados por `@merchant.tier`, utiliza tramos de la consulta `a`, porque `merchant.tier` es un atributo de los tramos del servicio `web-store`, no del servicio `payments-go`.

{{< img src="tracing/trace_queries/timeseries_using_spans_from.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Vista de series temporales" >}}


## Cómo usar las Consultas de traza con datos de origen

Datadog utiliza el [Filtro de retención inteligente][3] para indexar los datos de las Consultas de traza. Para ello realiza las siguientes acciones:

- [Muestreo plano](#1-flat-sampling): una muestra uniforme del 1% de los tramos ingeridos.
- [Muestreo diverso](#diversity-sampling): una selección representativa y diversa de trazas para mantener la visibilidad sobre cada entorno, servicio, operación y recurso.

Estos dos mecanismos de muestreo capturan las **trazas completas**, lo que significa que todos los tramos de una traza están siempre indexados para asegurar resultados correctos de las consultas de traza.

{{< img src="tracing/trace_queries/trace_queries_new_dataset.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Muestreo plano del 1% y muestreo diverso" >}}

**Nota**: Los tramos indexados por muestreo plano y muestreo diverso no cuentan para el uso de tramos indexados y, por lo tanto, **no repercuten en tu factura**.

### Muestreo plano del 1%
`retained_by:flat_sampled`

El muestreo plano del 1% se aplica sobre la base de `trace_id`, lo que significa que todos los tramos pertenecientes a la misma traza comparten la misma decisión de muestreo. Para obtener más información, lee la [documentación sobre el muestreo plano del 1%][4].

### Muestreo por diversidad
`retained_by:diversity_sampling`

Cada 15 minutos, el muestreo diverso retiene al menos un tramo y la traza asociada para cada combinación de entorno, servicio, operación y recurso. Esto ocurre para el percentil de latencias `p75`, `p90` y `p95` para asegurar que siempre se puede encontrar un ejemplo de trazas en servicio y páginas de recursos, incluso para endpoints con poco tráfico. Para obtener más información, lee la [documentación sobre el muestreo diverso][5].


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tracing/trace_explorer/query_syntax/
[2]: /es/tracing/trace_explorer/visualize/#timeseries
[3]: /es/tracing/trace_pipeline/trace_retention/#datadog-intelligent-retention-filter
[4]: /es/tracing/trace_pipeline/trace_retention/#one-percent-flat-sampling
[5]: /es/tracing/trace_pipeline/trace_retention/#diversity-sampling