---
algolia:
  tags:
  - metric types
aliases:
- /es/developers/metrics/counts/
- /es/developers/metrics/distributions/
- /es/developers/metrics/gauges/
- /es/developers/metrics/histograms/
- /es/developers/metrics/rates/
- /es/developers/metrics/sets/
- /es/developers/metrics_type/
- /es/developers/metrics/metrics_type/
- /es/developers/metrics/types/
further_reading:
- link: extend/dogstatsd
  tag: Documentación
  text: Aprende más sobre DogStatsD
- link: /metrics/units
  tag: Documentación
  text: Unidades de Métricas
- link: extend/libraries
  tag: Documentación
  text: Bibliotecas cliente de API y DogStatsD, creadas oficialmente y por la comunidad
title: Tipos de Métricas
---
## Resumen {#overview}

Cada métrica enviada a Datadog debe tener un tipo. El tipo de una métrica afecta cómo se muestran los valores de la métrica al consultarlos, así como las posibilidades de graficación asociadas dentro de Datadog utilizando [modificadores][1] y [funciones][2]. El tipo de una métrica se muestra en el panel lateral de detalles para la métrica dada en la [Metrics Summary page][3].

**Nota**: Cambiar el tipo de métrica en este panel lateral de detalles puede cambiar el comportamiento de la métrica en todas las visualizaciones y monitores existentes, lo que potencialmente puede hacer que los datos históricos sean incomprensibles.

Los siguientes tipos de envío de métricas son aceptados:

- [COUNT](?tab=count#metric-types)
- [TASA](?tab=rate#metric-types)
- [GAUGE](?tab=gauge#metric-types)
- [CONJUNTO][4]
- [HISTOGRAMA](?tab=histogram#metric-types)
- [DISTRIBUCIÓN](?tab=distribution#metric-types)

Estos diferentes tipos de envío de métricas se asignan a cuatro tipos de métricas en la aplicación que se encuentran dentro de la aplicación web de Datadog:

- CUENTA
- TASA
- GAUGE
- DISTRIBUCIÓN

**Nota**: Si envías una métrica a Datadog sin un tipo, el tipo de métrica aparece como `Not Assigned` dentro de Datadog. El tipo de métrica `Not Assigned` no puede ser cambiado a otro tipo en la aplicación hasta que se envíe un tipo de métrica inicial.

## Envío vs. tipo en la aplicación {#submission-vs-in-app-type}

Las métricas se envían a Datadog de tres maneras principales:

- [Verificación del agente][5]
- [DogStatsD][6]
- [API HTTP de Datadog][7]

La mayoría de los datos que Datadog recibe son enviados por el Agente, ya sea a través de una verificación del Agente o DogStatsD. Para estos métodos de envío, el tipo de una métrica determina cómo se agregan múltiples valores recolectados en un Agente en [a flush time interval][8]. El Agente combina estos valores en un único valor métrico representativo para ese intervalo. Este valor combinado se almacena con una única marca de tiempo en Datadog.

Los datos enviados directamente a la API de Datadog no son agregados por Datadog, con la excepción de las métricas de distribución. Los valores crudos enviados a Datadog se almacenan tal como están.

Lee la sección [Tipos de envío y tipos en la aplicación de Datadog](#submission-types-and-datadog-in-app-types) para aprender cómo se mapean los diferentes tipos de envío de métricas a sus tipos correspondientes en la aplicación.

## Tipos de métricas {#metric-types}

### Definición {#definition}

{{< tabs >}}
{{% tab "COUNT" %}}

El tipo de envío de métrica COUNT representa el número total de ocurrencias de eventos en un intervalo de tiempo. Un COUNT se puede utilizar para rastrear el número total de conexiones realizadas a una base de datos o el número total de solicitudes a un punto de conexión. Este número de eventos puede acumularse o disminuir con el tiempo; no es monotónicamente creciente.

**Nota**: Un COUNT es diferente del tipo de métrica RATE, que representa el número de ocurrencias de eventos normalizadas por segundo según el intervalo de tiempo definido.

{{% /tab %}}
{{% tab "RATE" %}}

El tipo de envío de métrica RATE representa el número total de ocurrencias de eventos por segundo en un intervalo de tiempo. Un RATE se puede utilizar para rastrear con qué frecuencia ocurre algo, como la frecuencia de conexiones realizadas a una base de datos o el flujo de solicitudes realizadas a un punto de conexión.

**Nota**: Un RATE es diferente del tipo de envío de métrica COUNT, que representa el número total de ocurrencias de eventos en el intervalo de tiempo dado.

{{% /tab %}}
{{% tab "GAUGE" %}}

El tipo de envío de métrica GAUGE representa una instantánea de eventos en un intervalo de tiempo. Este valor de instantánea representativa es el último valor enviado al Agente durante un intervalo de tiempo. Un GAUGE se puede utilizar para medir algo que reporta continuamente, como el espacio en disco disponible o la memoria utilizada.

{{% /tab %}}
{{% tab "HISTOGRAMA" %}}

El tipo de envío de métrica HISTOGRAMA representa la distribución estadística de un conjunto de valores calculados del lado del Agente en un intervalo de tiempo. El tipo de métrica HISTOGRAMA de Datadog es una extensión del tipo de métrica de tiempo StatsD. El Agente agrega los valores que se envían en un intervalo de tiempo definido y produce diferentes métricas que representan el conjunto de valores.

Si envías `X` valores para una métrica HISTOGRAMA `<METRIC_NAME>` en un intervalo de tiempo dado, las siguientes métricas son producidas por el Agente por defecto:

`<METRIC_NAME>.avg`
: Representa el promedio de esos `X` valores en el intervalo de tiempo.<br>
**Datadog In-App Type**: GAUGE

`<METRIC_NAME>.count`
: Representa el número de valores enviados durante el intervalo, `X`. El Agente envía este número como un RATE para que se muestre en la aplicación el valor de `X/interval`. <br>
**Datadog In-App Type**: RATE

`<METRIC_NAME>.median`
: Representa la mediana de esos `X` valores en el intervalo de tiempo.<br>
**Tipo In-App de Datadog**: GAUGE

`<METRIC_NAME>.95percentile` 
: Representa el percentil 95 de esos `X` valores en el intervalo de tiempo.<br>
**Tipo In-App de Datadog**: GAUGE

`<METRIC_NAME>.max`
: Representa el valor máximo de esos `X` valores enviados durante el intervalo de tiempo.<br>
**Tipo en la aplicación de Datadog**: GAUGE

**Notas**:

- Configura qué agregaciones deseas enviar a Datadog con el parámetro `histogram_aggregates` en tu [`datadog.yaml` archivo de configuración][1]. Por defecto, solo se envían a Datadog las agregaciones `max`, `median`, `avg` y `count`. `sum` y `min` también están disponibles.
- Configura qué agregación de percentil deseas enviar a Datadog con el parámetro `histogram_percentiles` en tu [`datadog.yaml` archivo de configuración][2]. Por defecto, solo se envía a Datadog el `95percentile`.


[1]: https://github.com/DataDog/datadog-agent/blob/04d8ae9dd4bc6c7a64a8777e8a38127455ae3886/pkg/config/config_template.yaml#L106-L114
[2]: https://github.com/DataDog/datadog-agent/blob/04d8ae9dd4bc6c7a64a8777e8a38127455ae3886/pkg/config/config_template.yaml#L116-L121
{{% /tab %}}
{{% tab "DISTRIBUCIÓN" %}}

El tipo de envío de métrica de DISTRIBUCIÓN representa la distribución estadística global de un conjunto de valores calculados a través de toda su infraestructura distribuida en un intervalo de tiempo. Una DISTRIBUTION puede ser utilizada para instrumentar objetos lógicos, como servicios, independientemente de los servidores subyacentes.

A diferencia del tipo de métrica HISTOGRAM, que agrega en el Agente durante un intervalo de tiempo dado, una métrica de DISTRIBUTION envía todos los datos en bruto durante un intervalo de tiempo a Datadog. Las agregaciones ocurren del lado del servidor. Debido a que la estructura de datos subyacente representa datos en bruto, no agregados, las distribuciones proporcionan dos características principales:

- Cálculo de agregaciones percentiles
- Personalización de etiquetado

Si envía `X` valores para una métrica de DISTRIBUCIÓN `<METRIC_NAME>` en un intervalo de tiempo dado, las siguientes agregaciones están disponibles para consulta por defecto:

`avg:<METRIC_NAME>`
: Representa el promedio de esos `X` valores en el intervalo de tiempo.<br>
**Tipo en la aplicación de Datadog**: GAUGE

`count:<METRIC_NAME>`
: Representa el número de puntos enviados en el intervalo de tiempo, `X`. El Agente luego lo envía como un COUNT.<br>
**Tipo en la aplicación de Datadog**: COUNT

`max:<METRIC_NAME>`
: Representa el valor máximo de esos `X` valores enviados en el intervalo de tiempo.<br>
**Tipo en la aplicación de Datadog**: GAUGE

`min:<METRIC_NAME>`
: Representa el valor mínimo de aquellos `X` enviados en el intervalo de tiempo.<br>
**Tipo en la aplicación de Datadog**: GAUGE

`sum:<METRIC_NAME>`
: Representa la suma de todos los valores `X` enviados en el intervalo de tiempo.<br>
**Tipo en la aplicación de Datadog**: COUNT

**Nota**: Mientras que las diferentes agregaciones de los valores de métricas de distribución están _representadas_ como GAUGE o COUNT en la aplicación, la métrica en sí mantiene el tipo `DISTRIBUTION`.

{{% /tab %}}
{{< /tabs >}}

### Ejemplo {#example}

{{< tabs >}}
{{% tab "COUNT" %}}

Supongamos que estás enviando una métrica de COUNT, `notifications.sent`, desde un único servidor que ejecuta el Datadog Agent. Este host emite los siguientes valores en un intervalo de tiempo de flush: `[1,1,1,2,2,2,3,3]`.

El Agente suma todos los valores recibidos en un intervalo de tiempo. Luego, envía el número total, en este caso `15`, como el valor de la métrica CUENTA.

{{% /tab %}}
{{% tab "RATE" %}}

Supongamos que estás enviando una métrica TASA, `queue_messages.rate`, desde un único host que ejecuta el Datadog Agent. Este host emite los siguientes valores en un intervalo de tiempo de flush: `[1,1,1,2,2,2,3,3]`.

El Agente suma todos los valores recibidos en un intervalo de tiempo. Luego, envía el número total dividido por el número total de segundos en este intervalo de tiempo. En este caso, si el intervalo de flush es de 10 segundos, el valor enviado sería `1.5` como el valor de la métrica TASA.

{{% /tab %}}
{{% tab "GAUGE" %}}

Supongamos que estás enviando una métrica GAUGE, `temperature`, desde un único host que ejecuta el Datadog Agent. Este host emite los siguientes valores en un intervalo de tiempo de flush: `[71,71,71,71,71,71,71.5]`.

El Agente envía el último número reportado, en este caso `71.5`, como el valor de la métrica GAUGE.

{{% /tab %}}
{{% tab "HISTOGRAMA" %}}

Por ejemplo, supongamos que estás enviando una métrica HISTOGRAM, `request.response_time.histogram`, desde un servidor web que reporta los valores `[1,1,1,2,2,2,3,3]` en un intervalo de tiempo de flush de 10 segundos. Por defecto, el Agente envía las siguientes métricas a Datadog que representan la distribución estadística de estos valores en este intervalo de tiempo:

| Nombre de la Métrica                                    | Valor  | Tipo de In-App de Datadog |
| ---------------------------------------------- | ------ | ------------------- |
| `request.response_time.histogram.avg`          | `1.88` | GAUGE               |
| `request.response_time.histogram.count`        | `0.8`  | RATE                |
| `request.response_time.histogram.median`       | `2`    | GAUGE               |
| `request.response_time.histogram.95percentile` | `3`    | GAUGE               |
| `request.response_time.histogram.max`          | `3`    | GAUGE               |

{{% /tab %}}
{{% tab "DISTRIBUCIÓN" %}}

Supongamos que estás enviando una métrica DISTRIBUCIÓN, `request.response_time.distribution`, desde dos servidores web: `webserver:web_1` y `webserver:web_2`. Supongamos que en un intervalo de tiempo de flush dado, `webserver:web_1` informa la métrica con los valores `[1,1,1,2,2,2,3,3]`, y `webserver:web_2` informa la misma métrica con los valores `[1,1,2]`. Durante este intervalo de tiempo, las siguientes cinco agregaciones representarán la distribución estadística global de todos los valores recopilados de ambos servidores web:

| Nombre de la métrica                                | Valor  | Tipo In-App de Datadog |
| ------------------------------------------ | ------ | ------------------- |
| `avg:request.response_time.distribution`   | `1.73` | GAUGE               |
| `count:request.response_time.distribution` | `11`   | COUNT               |
| `max:request.response_time.distribution`   | `3`    | GAUGE               |
| `min:request.response_time.distribution`   | `1`    | GAUGE               |
| `sum:request.response_time.distribution`   | `19`   | COUNT               |

#### Cálculo de agregaciones percentiles {#calculation-of-percentile-aggregations}

Al igual que otros tipos de métricas, como GAUGE o HISTOGRAMA, el tipo de métrica de DISTRIBUCIÓN tiene las siguientes agregaciones disponibles: `count`, `min`, `max`, `sum` y `avg`. Las métricas de distribución se etiquetan inicialmente de la misma manera que otras métricas (con etiquetas personalizadas establecidas en el código).

Agregaciones percentiles adicionales (`p50`, `p75`, `p90`, `p95`, `p99`) se pueden agregar a las métricas de distribución desde el [panel lateral de detalles][2] de la métrica. Si agregas agregaciones percentiles a tu métrica DISTRIBUCIÓN en la aplicación, las siguientes cinco agregaciones adicionales están disponibles para consulta:

| Nombre de Métrica                              | Valor | Tipo In-app de Datadog |
| ---------------------------------------- | ----- | ------------------- |
| `p50:request.response_time.distribution` | `2`   | GAUGE               |
| `p75:request.response_time.distribution` | `2`   | GAUGE               |
| `p90:request.response_time.distribution` | `3`   | GAUGE               |
| `p95:request.response_time.distribution` | `3`   | GAUGE               |
| `p99:request.response_time.distribution` | `3`   | GAUGE               |

Es decir, para una métrica de distribución con agregaciones percentiles añadidas durante un intervalo de tiempo dado, las siguientes 10 agregaciones están disponibles: `count`, `sum`, `min`, `max`, `avg`, `p50`, `p75`, `p90`, `p95` y `p99`.

**Nota**: Mientras que las diferentes agregaciones de los valores de la métrica de distribución están _representadas_ como gauges o cuentas en la aplicación, la métrica en sí mantiene el tipo `DISTRIBUTION`.

#### Personalización de etiquetas {#customization-of-tagging}

Esta funcionalidad te permite controlar las etiquetas para métricas donde la granularidad a nivel de host no es necesaria. Aprende más sobre [Métricas sin Límites™][1].

**Nota**: La exclusión de etiquetas no es compatible en la personalización de etiquetas basada en la lista permitida. No se aceptan etiquetas que comiencen con `!`.

[1]: /es/metrics/metrics-without-limits/
[2]: /es/metrics/summary/#metric-details-sidepanel
{{% /tab %}}
{{< /tabs >}}

### Envío {#submission}

{{< tabs >}}
{{% tab "CUENTA" %}}

Envía tus métricas de tipo CUENTA desde una de las siguientes fuentes:

| Fuente de Envío | Método de Envío (python)           | Tipo de Envío | Tipo In-App de Datadog |
| ----------------- | ------------------------------------ | --------------- | ------------------- |
| [Verificación de agente][1]  | `self.count(...)`                    | CUENTA           | CUENTA               |
| [Verificación de agente][2]  | `self.monotonic_count(...)`          | CUENTA           | CUENTA               |
| [API][3]          | `api.Metric.send(type="count", ...)` | CUENTA           | CUENTA               |
| [DogStatsD][4]    | `dog.count(...)`                     | CUENTA           | TASA                |
| [DogStatsD][4]    | `dog.increment(...)`                 | CUENTA           | TASA                |
| [DogStatsD][4]    | `dog.decrement(...)`                 | CUENTA           | TASA                |

**Nota**: Al enviar un tipo de métrica de CUENTA a través de DogStatsD, la métrica aparece como una TASA en la aplicación para asegurar una comparación relevante entre diferentes Agentes. En consecuencia, los conteos de StatsD pueden aparecer con un valor decimal dentro de Datadog (ya que están normalizados sobre un intervalo de tiempo para reportar unidades por segundo).


[1]: /es/metrics/custom_metrics/agent_metrics_submission/?tab=count#count
[2]: /es/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic-count
[3]: /es/api/latest/metrics/#submit-metrics
[4]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#count
{{% /tab %}}
{{% tab "TASA" %}}

Envía tus métricas de tipo TASA desde una de las siguientes fuentes:

| Fuente de envío | Método de envío (python)          | Tipo de envío | Tipo en la aplicación de Datadog |
| ----------------- | ----------------------------------- | --------------- | ------------------- |
| [Verificación de agente][1]  | `self.rate(...)`                    | TASA            | GAUGE               |
| [API][2]          | `api.Metric.send(type="rate", ...)` | TASA            | TASA                |

**Nota**: Para obtener métricas de TASA a través de DogStatsD, envía ya sea una métrica CUENTA [16] o HISTOGRAMA [18]. Los valores de la métrica CUENTA y los valores de `<HISTOGRAM>.count` son deltas normalizados en el tiempo del valor de la métrica durante el período de vaciado de StatsD.


[1]: /es/metrics/custom_metrics/agent_metrics_submission/?tab=rate
[2]: /es/api/latest/metrics/#submit-metrics
{{% /tab %}}
{{% tab "GAUGE" %}}

Envía tus métricas de tipo GAUGE desde una de las siguientes fuentes:

| Fuente de envío | Método de envío (Python)           | Tipo de envío | Tipo en la aplicación de Datadog |
| ----------------- | ------------------------------------ | --------------- | ------------------- |
| [Verificación de agente][1]  | `self.gauge(...)`                    | GAUGE           | GAUGE               |
| [API][2]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE               |
| [DogStatsD][3]    | `dog.gauge(...)`                     | GAUGE           | GAUGE               |


[1]: /es/metrics/custom_metrics/agent_metrics_submission/?tab=gauge
[2]: /es/api/latest/metrics/#submit-metrics
[3]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#gauge
{{% /tab %}}
{{% tab "HISTOGRAMA" %}}

Envía tus métricas de tipo HISTOGRAMA desde una de las siguientes fuentes:

| Fuente de envío | Método de envío (Python) | Tipo de envío | Tipo In-App de Datadog |
| ----------------- | -------------------------- | --------------- | -------------------- |
| [Verificación de agente][1]  | `self.histogram(...)`      | HISTOGRAMA       | GAUGE, RATE          |
| [DogStatsD][2]    | `dog.histogram(...)`       | HISTOGRAMA       | GAUGE, RATE          |

Enviar una métrica TIMER al Agente de Datadog es equivalente a enviar una métrica HISTOGRAMA dentro de DogStatsD (no debe confundirse con los temporizadores en el StatsD estándar). [DogStatsD `TIMER`][3] representa solo datos de duración. Por ejemplo, la cantidad de tiempo que tarda una sección de código en ejecutarse o cuánto tiempo toma renderizar completamente una página.


[1]: /es/metrics/custom_metrics/agent_metrics_submission/?tab=histogram
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#histogram
[3]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#timer
{{% /tab %}}
{{% tab "DISTRIBUCIÓN" %}}

Envía tus métricas de tipo DISTRIBUCIÓN desde la siguiente fuente:

| Fuente de envío | Método de envío (Python) | Tipo de envío | Tipo In-App de Datadog |
| ----------------- | -------------------------- | --------------- | -------------------- |
| [DogStatsD][1]    | `dog.distribution(...)`    | DISTRIBUCIÓN    | GAUGE, COUNT         |
| [API][2]          | `api_instance.submit_distribution_points(...)` | DISTRIBUCIÓN           | GAUGE, COUNT               |

**Nota**: Mientras que las diferentes agregaciones de los valores de métrica de distribución se _representan_ como gauges o COUNT en la aplicación, la métrica en sí retiene el tipo `DISTRIBUTION`.

[1]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#distribution
[2]: /es/api/latest/metrics/#submit-distribution-points
{{% /tab %}}
{{< /tabs >}}

## Tipos de envío y tipos en la aplicación de Datadog {#submission-types-and-datadog-in-app-types}

A continuación se presenta un resumen de todas las fuentes y métodos de envío de métricas disponibles. Esta tabla muestra la correspondencia entre el tipo de envío métrico correspondiente y los tipos en la aplicación:

| Fuente de Envío | Método de Envío (Python)           | Tipo de Envío | Tipos en la Aplicación de Datadog |
| ----------------- | ------------------------------------ | --------------- | -------------------- |
| [Agent check][9]  | `self.count(...)`                    | COUNT           | COUNT                |
| [Agent check][10] | `self.monotonic_count(...)`          | COUNT           | COUNT                |
| [Agent check][11] | `self.gauge(...)`                    | GAUGE           | GAUGE                |
| [Agent check][12] | `self.histogram(...)`                | HISTOGRAM       | GAUGE, RATE          |
| [Agent check][13] | `self.rate(...)`                     | RATE            | GAUGE                |
| [API][7]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT                |
| [API][7]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE                |
| [API][7]          | `api.Metric.send(type="rate", ...)`  | RATE            | RATE                 |
| [DogStatsD][14]   | `dog.gauge(...)`                     | GAUGE           | GAUGE                |
| [DogStatsD][15]   | `dog.distribution(...)`              | DISTRIBUCIÓN    | DISTRIBUCIÓN         |
| [DogStatsD][16]   | `dog.count(...)`                     | COUNT           | RATE                 |
| [DogStatsD][16]   | `dog.increment(...)`                 | COUNT           | RATE                 |
| [DogStatsD][16]   | `dog.decrement(...)`                 | COUNT           | RATE                 |
| [DogStatsD][17]   | `dog.set(...)`                       | SET             | GAUGE                |
| [DogStatsD][18]   | `dog.histogram(...)`                 | HISTOGRAM       | GAUGE, RATE          |

**Nota**: Mientras que las diferentes agregaciones de los valores métricos de distribución se _representan_ como gauges o COUNT en la aplicación, la métrica en sí mantiene el tipo `DISTRIBUTION`. Consulte la sección de [Definiciones][19] de esta página para más información.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/custom_metrics/type_modifiers/
[2]: /es/dashboards/functions/
[3]: /es/metrics/summary/
[4]: https://statsd.readthedocs.io/en/v3.3/types.html#sets
[5]: /es/metrics/custom_metrics/agent_metrics_submission/
[6]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[7]: /es/api/latest/metrics/#submit-metrics
[8]: /es/extend/dogstatsd/#how-it-works
[9]: /es/metrics/custom_metrics/agent_metrics_submission/?tab=count#count
[10]: /es/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic-count
[11]: /es/metrics/custom_metrics/agent_metrics_submission/?tab=gauge
[12]: /es/metrics/custom_metrics/agent_metrics_submission/?tab=histogram
[13]: /es/metrics/custom_metrics/agent_metrics_submission/?tab=rate
[14]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#gauge
[15]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#distribution
[16]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#count
[17]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#set
[18]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#histogram
[19]: /es/metrics/types/?tab=distribution#definition