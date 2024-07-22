---
aliases:
- /es/metrics/otlp
further_reading:
- link: metrics/distributions
  tag: Documentación
  text: Obtener más información sobre distribuciones
- link: opentelemetry/
  tag: Documentación
  text: Obtener más información sobre OpenTelemetry
- link: /opentelemetry/guide/otlp_delta_temporality/
  tag: Guía
  text: Producción de métricas de temporalidad delta con OpenTelemetry
title: Tipos de métricas OTLP
---

## Información general

El Datadog Agent y el exportador Datadog del recopilador OpenTelemetry pueden consumir métricas en el formato OpenTelemetry (OTLP), que puede ser generado por aplicaciones instrumentadas por OpenTelemetry. 

Los siguientes tipos de métricas OTLP pueden ser consumidos por el Datadog Agent y el exportador Datadog del recopilador OpenTelemetry:
- Suma
- Indicadores
- Histogramas
- Resúmenes

Estos tipos de métricas OTLP se asignan a los tipos de métricas de Datadog:

- RECUENTO
- INDICADOR
- DISTRIBUCIÓN

Una única métrica OTLP puede asignarse a varias métricas de Datadog con un sufijo que indica su significado.

**Nota**: OpenTelemetry proporciona instrumentos API de métricas (`Gauge`, `Counter`, `UpDownCounter`, `Histogram`, y así sucesivamente), cuyas mediciones se pueden exportar como métricas OTLP (Suma, Indicador, Histograma). Pueden existir otros orígenes de métricas OTLP. Las aplicaciones y bibliotecas pueden aportar una personalización a las métricas OTLP que producen. Para entender las métricas OTLP generadas y cómo personalizarlas, consulta la documentación de tu SDK OpenTelemetry o de la aplicación generadora de OTLP.

**Nota**: El protocolo OpenTelemetry admite dos formas de representar métricas en el tiempo: [Temporalidad Acumulativa y Delta][2], que afectan a las métricas descritas a continuación. Configura la preferencia de temporalidad de la aplicación OpenTelemetry como **DELTA**, ya que configurarla como "ACUMULATIVA" puede descartar algunos puntos de datos durante el inicio de la aplicación (o del recopilador). Para obtener más información, consulta [Generación de métricas de temporalidad Delta con OpenTelemetry][3].

## Tipos de métricas

### Asignación


{{< tabs >}}
{{% tab "Sum" (Suma) %}}

Una suma OTLP representa una suma de las mediciones notificadas a lo largo de un periodo de tiempo. Por ejemplo, una suma puede utilizarse para registrar el número total de conexiones realizadas a una base de datos o el número total de solicitudes a un endpoint. Las sumas tienen dos características que influyen en la asignación:

- *Temporalidad de agregación*. Puede ser Acumulativa o Delta. Las métricas delta no se solapan en el periodo de tiempo, mientras que las métricas acumulativas representan un periodo de tiempo a partir de un punto de partida fijo en el tiempo.
- *Monotonicidad*. Las sumas monótonas nunca decrecen y sólo admiten la adición al recuento subyacente.

La asignación por defecto es la siguiente:
1. Para sumas monotónicas acumulativas, se calcula delta entre puntos consecutivos y se informa a Datadog como un recuento. El primer punto se almacena pero se omite. Para recuperar el valor en la carga útil OTLP, utiliza la [función aritmética `cumsum`][1].
2. Las sumas acumulativas no monotónicas se exportan como indicadores de Datadog.
3. Las sumas delta se exportan como recuentos de Datadog.

[1]: /es/dashboards/functions/arithmetic/#cumulative-sum
{{% /tab %}}
{{% tab "Gauge" (Indicador) %}}

Un indicador OTLP representa un valor muestreado en un momento dado. Sólo se incluye en las métricas OTLP el último valor de un periodo de tiempo determinado.

Los indicadores OTLP se asignan a indicadores Datadog, ya que no proporcionan una semántica de agregación. Los puntos de datos de indicador, tanto enteros como de coma flotante, se asignan a números de coma flotante en el formato Datadog. 

{{% /tab %}}
{{% tab "Histogram" (Histograma) %}}

Un histograma OTLP representa la distribución estadística de un conjunto de valores en un periodo de tiempo determinada, almacenando ciertas métricas de agregación como la suma o el recuento de la población junto con una serie de recuentos de buckets. Los histogramas tienen una característica que influye en la asignación:

- *Temporalidad de agregación*. Puede ser Acumulativa o Delta. Las métricas delta no se solapan en el periodo de tiempo, mientras que las métricas acumulativas representan un periodo de tiempo a partir de un punto de partida fijo en el tiempo.

La asignación por defecto es la siguiente:
1. Los histogramas delta se presentan como distribuciones Datadog. Para comprender las agregaciones disponibles, [consulta más literatura sobre distribuciones][1]. Los histogramas con un recuento de 0 se descartan.
2. En los histogramas acumulativos, se calcula el delta entre puntos consecutivos y se envía a Datadog como distribución. Los deltas con un recuento de 0 no se informan. Puedes utilizar la [función aritmética `cumsum`][2] en agregaciones individuales para recuperar el valor en la carga útil OTLP.

**Nota**: Las métricas de histogramas en OTLP se asignan por defecto a métricas de distribución. Debido a la forma en que OTLP envía estos datos, las agregaciones de percentiles y los máximos y mínimos (si no están disponibles en los datos OTLP originales) son aproximaciones, no cálculos exactos.

El Datadog Agent y el exportadores Datadog del recopilador OpenTelemetry permiten cambiar la exportación de histogramas en la subsección `histogram`.
- Si el `mode` se configura en `counters`, se generan las siguientes métricas:

`<METRIC_NAME>.bucket`, etiquetado por `lower_bound` y `upper_bound`
: Recuento de buckets en el periodo de tiempo para el bucket con los límites inferior y superior especificados.<br>
**Datadog In-App Type**: RECUENTO

- Si se activa la marca `send_aggregation_metrics`, se generan las siguientes métricas:

`<METRIC_NAME>.sum`
: Suma de los valores enviados durante el periodo de tiempo.<br>
**Datadog In-App Type**: RECUENTO

`<METRIC_NAME>.count`
: Suma de los valores enviados durante el periodo de tiempo.<br>
**Datadog In-App Type**: RECUENTO

`<METRIC_NAME>.min`
: Mínimo de valores enviados durante el periodo de tiempo. Sólo disponible para los histogramas OTLP delta. Disponible desde: el exportador Datadog v0.75.0 y el Datadog Agent v6.45.0 y v7.45.0. <br>
**Datadog In-App Type**: INDICADOR

`<METRIC_NAME>.max`
: Máximo de valores enviados durante el periodo de tiempo. Sólo disponible para los histogramas OTLP delta. Disponible desde: el exportador Datadog v0.75.0 y el Datadog Agent v6.45.0 y v7.45.0. <br>
**Datadog In-App Type**: INDICADOR

**Nota**: `send_aggregation_metrics` sólo es útil cuando no se utiliza el modo de distribución. Antes del exportador de Datadog v0.75.0 y del Datadog Agent v6.45.0 y v7.45.0, utiliza `send_count_sum_metrics`.

[1]: /es/metrics/distributions
[2]: /es/dashboards/functions/arithmetic/#cumulative-sum
{{% /tab %}}
{{% tab "Summary" (Resumen) %}}

Un Resumen OTLP es un tipo heredado que transmite información cuantílica sobre una población durante un periodo de tiempo. Los tipos de resumen OTLP no son generados por los SDK de OpenTelemetry, pero pueden ser generados por otros componentes para la compatibilidad con versiones anteriores.

`<METRIC_NAME>.sum`
: Suma de los valores enviados desde que la aplicación comenzó a generar métricas.<br>
**Datadog In-App Type**: RECUENTO

`<METRIC_NAME>.count`
: Suma de los valores de una población.<br>
**Datadog In-App Type**: RECUENTO

`<METRIC_NAME>.quantile`, etiquetado por `quantile`
: Valor de un cuantil dado.<br>
**Datadog In-App Type**: INDICADOR

{{% /tab %}}
{{< /tabs >}}

### Asignación de atributos

OTLP admite dos tipos de atributos: atributos a nivel de punto de datos y atributos de recursos. Estos atributos pueden seguir las convenciones semánticas de OpenTelemetry y tener una semántica bien conocida.

El Datadog Agent y el exportador Datadog del recopilador OpenTelemetry asignan los atributos de nivel de puntos de datos como etiquetas. Los atributos de recursos que siguen las convenciones semánticas de OpenTelemetry se asignan a las convenciones equivalentes de Datadog, si existen.

Puedes añadir todos los atributos de recursos como etiquetas utilizando la marca `resource_attributes_as_tags`.

### Ejemplo

{{< tabs >}}
{{% tab "Sum" (Suma) %}}

Supongamos que estás utilizando un instrumento de recuento OpenTelemetry desde una sola aplicación, que, por defecto, exporta métricas de tipo suma **monotónica** acumulativa. La siguiente tabla resume el comportamiento de Datadog:

| Período de recopilación | Valores de contador    | Valor de la suma OTLP | Valor informado a Datadog | Tipo Datadog en aplicación | Notas                                          |
|-------------------|-------------------|----------------|---------------------------| ------------------- |------------------------------------------------|
| #1                | [1,1,1,2,2,2,3,3] | 15             | Ninguno                      |  RECUENTO              | No se indica el valor del primer periodo de recopilación. |
| #2                | [3,4,1,2]         | 25             | 10                        |  RECUENTO              | Se informa la diferencia entre los valores.     |
| #3                | []                | 25             | 0                         |  RECUENTO              | No se informaron nuevos valores en este periodo.    |

Supón que estás utilizando un instrumento de recuento OpenTelemetry desde una sola aplicación, que, por defecto, exporta métricas de tipo suma acumulativa. La siguiente tabla resume el comportamiento de Datadog:

| Período de recopilación | Valores de UpDownCounter | Valor de la suma OTLP | Valor informado a Datadog | Tipo Datadog en aplicación |
|-------------------|----------------------|----------------|---------------------------| ------------------- |
| #1                | [1,1,1,2,2,2,3,3]    | 15             | 15                        | INDICADOR               |
| #2                | [3,-4,1,2]           | 17             | 17                        | INDICADOR               |
| #3                | [-1]                 | 16             | 16                        | INDICADOR               |

{{% /tab %}}
{{% tab "Gauge" (Indicador) %}}

Supón que estás utilizando un instrumento indicador OpenTelemetry, `temperature`, desde una sola aplicación.
La siguiente tabla resume el comportamiento de Datadog:

| Período de recopilación | Instrumento indicador | Valor del indicador OTLP | Valor informado a Datadog | Tipo Datadog en aplicación |
|-------------------|------------------|------------------|---------------------------| ------------------- |
| #1                | 71.5             | 71.5             | 71.5                      | INDICADOR               |
| #2                | 72               | 72               | 72                        | INDICADOR               |
| #3                | 70               | 70               | 70                        | INDICADOR               |

{{% /tab %}}
{{% tab "Histogram" (Histograma) %}}

Supón que estás utilizando un instrumento de histograma OpenTelemetry, `request.response_time.histogram`, desde dos servidores web: `webserver:web_1` y `webserver:web_2`. Supón que en un periodo de recopilación determinado, `webserver:web_1` informa la métrica con los valores `[1,1,1,2,2,2,3,3]` y que `webserver:web_2` informa la misma métrica con los valores `[1,1,2]`. Durante este periodo de recopilación, las cinco agregaciones siguientes representan la distribución estadística global de todos los valores recopilados de ambos servidores web:

| Nombre de la métrica                                | Valor  | Tipo Datadog en aplicación |
| ------------------------------------------ | ------ | ------------------- |
| `avg:request.response_time.distribution`   | `1.73` | INDICADOR               |
| `count:request.response_time.distribution` | `11`   | RECUENTO               |
| `max:request.response_time.distribution`   | `3`    | INDICADOR               |
| `min:request.response_time.distribution`   | `1`    | INDICADOR               |
| `sum:request.response_time.distribution`   | `19`   | RECUENTO               |

Para saber cómo configurar más agregaciones, [consulta la literatura sobre distribuciones][1].

Alternativamente, si estás utilizando el modo `counters`, la marca `send_aggregation_metrics` está habilitada y los límites del bucket de histogramas se configuran en `[-inf, 2, inf]`. Se informan las siguientes métricas:

| Nombre de la métrica                                 | Valor  | Etiquetas                                | Tipo Datadog en aplicación |
| ------------------------------------------- | ------ | ------------------------------------| ------------------- |
| `request.response_time.distribution.count`  | `8`    | n/a                                 | RECUENTO               |
| `request.response_time.distribution.sum`    | `15`   | n/a                                 | RECUENTO               |
| `request.response_time.distribution.max`    | `3`    | n/a                                 | INDICADOR               |
| `request.response_time.distribution.min `   | `1`    | n/a                                 | INDICADOR               |
| `request.response_time.distribution.bucket` | `6`    | `lower_bound:-inf`, `upper_bound:2` | INDICADOR               |
| `request.response_time.distribution.bucket` | `2`    | `lower_bound:2`, `upper_bound:inf`  | INDICADOR               |

[1]: /es/metrics/distributions
{{% /tab %}}
{{% tab "Summary" (Resumen) %}}

Supón que estás enviando una métrica de resumen OTLP heredada, `request.response_time.summary`, desde un servidor web. Supón que en un periodo de recopilación determinado, el servidor web informa la métrica con los valores `[1,1,1,2,2,2,3,3]`. Las siguientes métricas serán informadas, si los cuantiles mínimo, máximo y medio están activados:

| Nombre de la métrica                                   | Valor  | Etiquetas                                | Tipo Datadog en aplicación |
| --------------------------------------------- | ------ | ------------------------------------| ------------------- |
| `request.response_time.distribution.count`    | `8`    | n/a                                 | RECUENTO               |
| `request.response_time.distribution.sum`      | `15`   | n/a                                 | RECUENTO               |
| `request.response_time.distribution.quantile` | `1`    | `quantile:0`                        | INDICADOR               |
| `request.response_time.distribution.quantile` | `2`    | `quantile:0.5`                      | INDICADOR               |
| `request.response_time.distribution.quantile` | `3`    | `quantile:1.0`                      | INDICADOR               |


{{% /tab %}}
{{< /tabs >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/opentelemetry/schema_semantics/hostname/
[2]: https://opentelemetry.io/docs/reference/specification/metrics/data-model/#temporality
[3]: /es/opentelemetry/guide/otlp_delta_temporality/