---
algolia:
  tags:
  - Tipos de métricas
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
- link: developers/dogstatsd
  tag: Documentación
  text: Más información sobre DogStatsD
- link: desarrolladores/bibliotecas
  tag: Documentación
  text: API oficial y creada por la comunidad y bibliotecas cliente de DogStatsD
title: Tipos de métricas
---

## Información general

Cada métrica enviada a Datadog debe tener un tipo. El tipo de métrica afecta a la forma en que se muestran los valores de la métrica cuando se consulta, así como a las posibilidades asociadas de creación de gráficas dentro de Datadog utilizando [modificadores][1] y [funciones][2] adicionales. El tipo de métrica se muestra en el panel lateral de detalles de la métrica en la [página Resumen de métricas][3].

**Nota**: Al cambiar el tipo de métrica en este panel lateral de detalles se puede cambiar el comportamiento de la métrica en todas las visualizaciones y monitores existentes, lo que puede llevar a que los datos históricos no tengan sentido.

Se aceptan los siguientes tipos de envíos de métricas:

- [COUNT](?tab=count#metric-types)
- [RATE](?tab=rate#metric-types)
- [GAUGE](?tab=gauge#metric-types)
- [SET][4]
- [HISTOGRAM](?tab=histogram#metric-types)
- [DISTRIBUTION](?tab=distribution#metric-types)

Estos diferentes tipos de envíos de métricas se asignan a cuatro tipos de métricas dentro de la aplicación, que se encuentran en la aplicación web Datadog:

- COUNT
- RATE
- GAUGE
- DISTRIBUTION

**Nota**: Si envías una métrica a Datadog sin un tipo, el tipo de la métrica aparece como `Not Assigned` en Datadog. El tipo de métrica `Not Assigned` no se puede cambiar a otro tipo dentro de la aplicación hasta que se envíe un tipo inicial de métrica.

## Envío comparado con tipo dentro de la aplicación

Las métricas se envían a Datadog de tres formas principales:

- [Check del Agent][5]
- [DogStatsD][6]
- [API HTTP Datadog][7]

La mayoría de los datos que recibe Datadog son enviados por el Agent, ya sea a través de un check del Agent o DogStatsD. Para estos métodos de envío, el tipo de métrica determina cómo se agregan los múltiples valores recopilados en un Agent en [un intervalo de tiempo de descarga][8]. El Agent combina estos valores en un único valor de métrica representativo para ese intervalo. Este valor combinado se almacena con una única marca de tiempo en Datadog.

Los datos enviados directamente a la API Datadog no son agregados por Datadog, a excepción de las métricas de distribución. Los valores brutos enviados a Datadog se almacenan tal cual.

Para saber cómo se asignan los distintos tipos de envíos de métricas a sus correspondientes tipos dentro de la aplicación, consulta la sección [Tipos de envío y tipos dentro de la aplicación de Datadog](#submission-types-and-datadog-in-app-types).

## Tipos de métricas

### Definición

{{< tabs >}}
{{% tab "COUNT" %}}

El tipo de envío de métricas COUNT representa el número total de ocurrencias de eventos en un intervalo de tiempo. Un COUNT puede utilizarse para realizar un seguimiento del número total de conexiones realizadas a una base de datos o del número total de solicitudes a un endpoint. Este número de eventos puede acumularse o disminuir con el tiempo y no se incrementa monotónicamente.

**Nota**: Un COUNT es diferente del tipo de métrica RATE, que representa el número de ocurrencias de eventos normalizadas por segundo dado el intervalo de tiempo definido.

{{% /tab %}}
{{% tab "RATE" %}}

El tipo de envío de métricas RATE representa el número total de ocurrencias de eventos por segundo en un intervalo de tiempo. Un RATE se puede utilizar para realizar un seguimiento de la frecuencia con la que ocurre algo, como la frecuencia de las conexiones realizadas a una base de datos o el flujo de solicitudes realizadas a un endpoint.

**Nota**: Un RATE es diferente del tipo de envío de métricas COUNT, que representa el número total de ocurrencias de eventos en el intervalo de tiempo dado.

{{% /tab %}}
{{% tab "GAUGE" %}}

El tipo de envío de métricas GAUGE representa un snapshot de eventos en un intervalo de tiempo. Este valor representativo de snapshot es el último valor enviado al Agent durante un intervalo de tiempo. Un GAUGE se puede utilizar para tomar una medida de algo que informa continuamente, como el espacio disponible en disco o la memoria utilizada.

{{% /tab %}}
{{% tab "HISTOGRAM" %}}

El tipo de envío de métricas HISTOGRAM representa la distribución estadística de un conjunto de valores calculados del lado del Agent en un intervalo de tiempo. El tipo de métrica HISTOGRAM es una extensión del tipo de métrica de temporización StatsD. El Agent agrega los valores que se envían en un intervalo de tiempo definido y produce diferentes métricas que representan el conjunto de valores.

Si envías valores `X` para una métrica HISTOGRAM `<METRIC_NAME>` en un intervalo de tiempo dado, las siguientes métricas son producidas por el Agent por defecto:

`<METRIC_NAME>.avg`
: Representa la media de los valores `X` en un intervalo de tiempo.<br>
**Tipo dentro de la aplicación de Datadog**: GAUGE

`<METRIC_NAME>.count`
: Representa el número de valores enviados durante el intervalo, `X`. El Agent envía este número como un RATE por lo que mostraría en el valor `X/interval` en la aplicación. <br>
**Tipo dentro de la aplicación de Datadog**: RATE

`<METRIC_NAME>.median`
: Representa la mediana de los valores `X` en un intervalo de tiempo.<br>
**Tipo dentro de la aplicación de Datadog**: GAUGE

`<METRIC_NAME>.95percentile` 
: Representa el percentil 95 de esos valores `X` en un intervalo de tiempo.<br>
**Tipo dentro de la aplicación de Datadog**: GAUGE

`<METRIC_NAME>.max`
: Representa el valor máximo de los valores de `X` enviados durante el intervalo de tiempo.<br>
**Tipo dentro de la aplicación de Datadog**: GAUGE

**Nota**:

- Configura qué agregaciones quieres enviar a Datadog con el parámetro `histogram_aggregates` en tu [archivo de configuración `datadog.yaml`][1]. Por defecto, sólo se envían a Datadog las agregaciones `max`, `median`, `avg` y `count`. También están disponibles las agregaciones `sum` y `min`.
- Configura qué agregación de percentiles quieres enviar a Datadog con el parámetro `histogram_percentiles` en tu [archivo de configuración `datadog.yaml`][2]. Por defecto, sólo se envía el `95percentile` a Datadog.


[1]: https://github.com/DataDog/datadog-agent/blob/04d8ae9dd4bc6c7a64a8777e8a38127455ae3886/pkg/config/config_template.yaml#L106-L114
[2]: https://github.com/DataDog/datadog-agent/blob/04d8ae9dd4bc6c7a64a8777e8a38127455ae3886/pkg/config/config_template.yaml#L116-L121
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

El tipo de envío de métricas DISTRIBUTION representa la distribución estadística global de un conjunto de valores calculados en toda tu infraestructura distribuida en un intervalo de tiempo. Una DISTRIBUTION puede utilizarse para instrumentar objetos lógicos, como servicios, independientemente de los hosts subyacentes.

A diferencia del tipo de métrica HISTOGRAM, que agrega en el Agent durante un intervalo de tiempo determinado, una métrica DISTRIBUTION envía todos los datos brutos a Datadog durante un intervalo de tiempo. La agregación se realiza en el servidor. Dado que la estructura de datos subyacente representa datos brutos, no agregados, las distribuciones ofrecen dos características principales:

- Cálculo de agregaciones de percentiles
- Personalización del etiquetado

Si envías valores `X` para una métrica DISTRIBUTION `<METRIC_NAME>` en un intervalo de tiempo determinado, las siguientes agregaciones están disponibles para consultas por defecto:

`avg:<METRIC_NAME>`
: Representa la media de los valores `X` en el intervalo de tiempo.<br>
**Tipo dentro de la aplicación Datadog**: GAUGE

`count:<METRIC_NAME>`
: Representa el número de puntos enviados en el intervalo de tiempo, `X`. A continuación, el Agent lo envía como COUNT.<br>
**Tipo dentro de la aplicación Datadog**: COUNT

`max:<METRIC_NAME>`
: Representa el valor máximo de los valores de `X` enviados en el intervalo de tiempo.<br>
**Tipo dentro de la aplicación Datadog**: GAUGE

`min:<METRIC_NAME>`
: Representa el valor mínimo de los `X` enviados en el intervalo de tiempo.<br>
**Tipo dentro de la aplicación Datadog**: GAUGE

`sum:<METRIC_NAME>`
: Representa la suma de todos los valores de `X` enviados en el intervalo de tiempo.<br>
**Tipo dentro de la aplicación Datadog**: COUNT

{{% /tab %}}
{{< /tabs >}}

### Ejemplo

{{< tabs >}}
{{% tab "COUNT" %}}

Supongamos que estás enviando una métrica COUNT `notifications.sent`, desde un único host que ejecuta el Datadog Agent. Este host emite los siguientes valores en un intervalo de tiempo de descarga: `[1,1,1,2,2,2,3,3]`.

El Agent suma todos los valores recibidos en un intervalo de tiempo. A continuación, envía el número total, en este caso `15`, como el valor de métrica COUNT.

{{% /tab %}}
{{% tab "RATE" %}}

Supongamos que estás enviando una métrica RATE `queue_messages.rate`, desde un único host que ejecuta el Datadog Agent. Este host emite los siguientes valores en un intervalo de tiempo de descarga: `[1,1,1,2,2,2,3,3]`.

El Agent suma todos los valores recibidos en un intervalo de tiempo. A continuación, envía el número total dividido por el número total de segundos de este intervalo de tiempo. En este caso, si el intervalo de descarga es de 10 segundos, el valor enviado sería `1.5` como el valor de métrica RATE.

{{% /tab %}}
{{% tab "GAUGE" %}}

Supongamos que estás enviando una métrica GAUGE `temperature`, desde un único host que ejecuta el Datadog Agent. Este host emite los siguientes valores en un intervalo de tiempo de descarga: `[71,71,71,71,71,71,71.5]`.

El Agent envía el último número reportado, en este caso `71.5`, como el valor de métrica GAUGE.

{{% /tab %}}
{{% tab "HISTOGRAM" %}}

Por ejemplo, supongamos que estás enviando una métrica HISTOGRAM, `request.response_time.histogram`, desde un servidor web que informa de los valores `[1,1,1,2,2,2,3,3]` en un intervalo de tiempo de descarga. Por defecto, el Agent envía las siguientes métricas a Datadog, que representan la distribución estadística de estos valores en este intervalo de tiempo:

| Nombre de la métrica                                    | Valor  | Tipo dentro de la aplicación Datadog |
| ---------------------------------------------- | ------ | ------------------- |
| `request.response_time.histogram.avg`          | `1.88` | GAUGE               |
| `request.response_time.histogram.count`        | `0.8`  | RATE                |
| `request.response_time.histogram.median`       | `2`    | GAUGE               |
| `request.response_time.histogram.95percentile` | `3`    | GAUGE               |
| `request.response_time.histogram.max`          | `3`    | GAUGE               |

{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

Supongamos que estás enviando una métrica DISTRIBUTION, `request.response_time.distribution`, desde dos servidores web: `webserver:web_1` y `webserver:web_2`. Supongamos que en un periodo de descarga determinado, `webserver:web_1` informa la métrica con los valores `[1,1,1,2,2,2,3,3]` y que `webserver:web_2` informa la misma métrica con los valores `[1,1,2]`. Durante este intervalo de tiempo, las cinco agregaciones siguientes representan la distribución estadística global de todos los valores recopilados de ambos servidores web:

| Nombre de la métrica                                | Valor  | Tipo dentro de la aplicación Datadog |
| ------------------------------------------ | ------ | ------------------- |
| `avg:request.response_time.distribution`   | `1.73` | GAUGE               |
| `count:request.response_time.distribution` | `11`   | COUNT               |
| `max:request.response_time.distribution`   | `3`    | GAUGE               |
| `min:request.response_time.distribution`   | `1`    | GAUGE               |
| `sum:request.response_time.distribution`   | `19`   | COUNT               |

#### Cálculo de agregaciones de percentiles

Al igual que otros tipos de métricas, como GAUGE or HISTOGRAM, el tipo de métrica DISTRIBUTION dispone de las siguientes agregaciones: `count` `min` , `max`, `sum` y `avg`. Las métricas de distribución se etiquetan inicialmente del mismo modo que las demás métricas (con etiquetas (tags) personalizadas definidas en el código).

Se pueden añadir agregaciones de percentiles adicionales (`p50`, `p75`, `p90`, `p95`, `p99`) a las métricas de distribución. Si se añadieran agregaciones de percentiles a tu métrica de distribución dentro de la aplicación, las siguientes cinco agregaciones adicionales estarían disponibles para consultas:

| Nombre de la métrica                              | Valor | Tipo dentro de la aplicación Datadog |
| ---------------------------------------- | ----- | ------------------- |
| `p50:request.response_time.distribution` | `2`   | GAUGE               |
| `p75:request.response_time.distribution` | `2`   | GAUGE               |
| `p90:request.response_time.distribution` | `3`   | GAUGE               |
| `p95:request.response_time.distribution` | `3`   | GAUGE               |
| `p99:request.response_time.distribution` | `3`   | gauge               |

Es decir, para una métrica de distribución con agregaciones de percentiles añadidos durante un intervalo de tiempo determinado, están disponibles las 10 agregaciones siguientes: `count`, `sum`, `min`, `max`, `avg`, `p50`, `p75`, `p90`, `p95` y `p99`.

#### Personalización del etiquetado

Esta funcionalidad te permite controlar el etiquetado de métricas donde la granularidad a nivel de host no es necesaria. Consulta más información sobre [Metrics without LimitsTM][1].

**Nota**: La exclusión de etiquetas con `!` no se admite con esta función.


[1]: /es/metrics/metrics-without-limits/
{{% /tab %}}
{{< /tabs >}}

### Envío

{{< tabs >}}
{{% tab "COUNT" %}}

Envía tu tipo de métrica COUNT de una de las siguientes fuentes:

| Fuente de envío | Método de envío (Python)           | Tipo de envío | Tipo dentro de la aplicación Datadog |
| ----------------- | ------------------------------------ | --------------- | ------------------- |
| [Check del Agent][1]  | `self.count(...)`                    | COUNT           | COUNT               |
| [Check del Agent][2]  | `self.monotonic_count(...)`          | COUNT           | COUNT               |
| [API][3]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT               |
| [DogStatsD][4]    | `dog.count(...)`                     | COUNT           | RATE                |
| [DogStatsD][4]    | `dog.increment(...)`                 | COUNT           | RATE                |
| [DogStatsD][4]    | `dog.decrement(...)`                 | COUNT           | RATE                |

**Nota**: Cuando se envía un tipo de métrica COUNT a través de DogStatsD, la métrica aparece como RATE dentro de la aplicación para asegurar una comparación relevante a través de diferentes Agents. Consecuentemente, los recuentos de StatsD pueden aparecer con un valor decimal en Datadog (ya que están normalizados dentro de un intervalo de tiempo para reportar unidades por segundo).


[1]: /es/metrics/custom_metrics/agent_metrics_submission/?tab=count#count
[2]: /es/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic-count
[3]: /es/api/v1/metrics/#submit-metrics
[4]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#count
{{% /tab %}}
{{% tab "RATE" %}}

Envía tu tipo de métrica RATE de una de las siguientes fuentes:

| Fuente de envío | Método de envío (Python)          | Tipo de presentación | Tipo dentro de la aplicación Datadog |
| ----------------- | ----------------------------------- | --------------- | ------------------- |
| [Check del Agent][1]  | `self.rate(...)`                    | RATE            | GAUGE               |
| [API][2]          | `api.Metric.send(type="rate", ...)` | RATE            | RATE                |

**Nota**: Al enviar un tipo de métrica RATE a través de DogStatsD, la métrica aparece como GAUGE dentro de la aplicación para garantizar una comparación pertinente entre diferentes Agents.


[1]: /es/metrics/custom_metrics/agent_metrics_submission/?tab=rate
[2]: /es/api/v1/metrics/#submit-metrics
{{% /tab %}}
{{% tab "GAUGE" %}}

Envía tu tipo de métrica GAUGE de una de las siguientes fuentes:

| Fuente de envío | Método de envío (Python)           | Tipo de envío | Tipo dentro de la aplicación Datadog |
| ----------------- | ------------------------------------ | --------------- | ------------------- |
| [Check del Agent][1]  | `self.gauge(...)`                    | GAUGE           | GAUGE               |
| [API][2]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE               |
| [DogStatsD][3]    | `dog.gauge(...)`                     | GAUGE           | GAUGE               |


[1]: /es/metrics/custom_metrics/agent_metrics_submission/?tab=gauge
[2]: /es/api/v1/metrics/#submit-metrics
[3]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#gauge
{{% /tab %}}
{{% tab "HISTOGRAM" %}}

Envía tu tipo de métrica HISTOGRAM de una de las siguientes fuentes:

| Fuente de envío | Método de envío (Python) | Tipo de envío | Tipos dentro de la aplicación Datadog |
| ----------------- | -------------------------- | --------------- | -------------------- |
| [Check del Agent][1]  | `self.histogram(...)`      | HISTOGRAM       | GAUGE, RATE          |
| [DogStatsD][2]    | `dog.histogram(...)`       | HISTOGRAM       | GAUGE, RATE          |

Enviar una métrica TIMER al Datadog Agent equivale a enviar un tipo de métrica HISTOGRAM en DogStatsD (no confundir con los temporizadores del StatsD estándar). El [`TIMER` de DogStatsD][3] representa sólo datos de duración. Por ejemplo, el tiempo que tarda en ejecutarse una sección de código o el tiempo que tarda en renderizarse completamente una página.


[1]: /es/metrics/custom_metrics/agent_metrics_submission/?tab=histogram
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#histogram
[3]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#timer
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

Envía tu tipo de métrica DISTRIBUTION de una de las siguientes fuentes:

| Fuente de envío | Método de envío (Python) | Tipo de envío | Tipos dentro de la aplicación Datadog |
| ----------------- | -------------------------- | --------------- | -------------------- |
| [DogStatsD][1]    | `dog.distribution(...)`    | DISTRIBUTION    | GAUGE, COUNT         |


[1]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#distribution
{{% /tab %}}
{{< /tabs >}}

## Tipos de envío y tipos dentro de la aplicación Datadog

A continuación se muestra un resumen de todas las fuentes y los métodos de envío de métricas disponibles. Esta tabla muestra la correspondencia entre el tipo de envío de métrica correspondiente y los tipos dentro de la aplicación:

| Fuente de envío | Método de envío (Python)           | Tipo de envío | Tipos dentro de la aplicación Datadog |
| ----------------- | ------------------------------------ | --------------- | -------------------- |
| [Check del Agent][9]  | `self.count(...)`                    | COUNT           | COUNT                |
| [Check del Agent][10] | `self.monotonic_count(...)`          | COUNT           | COUNT                |
| [Check del Agent][11] | `self.gauge(...)`                    | GAUGE           | GAUGE                |
| [Check del Agent][12] | `self.histogram(...)`                | HISTOGRAM       | GAUGE, RATE          |
| [Check del Agent][13] | `self.rate(...)`                     | RATE            | GAUGE                |
| [API][7]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT                |
| [API][7]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE                |
| [API][7]          | `api.Metric.send(type="rate", ...)`  | RATE            | RATE                 |
| [DogStatsD][14]   | `dog.gauge(...)`                     | GAUGE           | GAUGE                |
| [DogStatsD][15]   | `dog.distribution(...)`              | DISTRIBUCIÓN    | GAUGE, COUNT         |
| [DogStatsD][16]   | `dog.count(...)`                     | COUNT           | RATE                 |
| [DogStatsD][16]   | `dog.increment(...)`                 | COUNT           | RATE                 |
| [DogStatsD][16]   | `dog.decrement(...)`                 | COUNT           | RATE                 |
| [DogStatsD][17]   | `dog.set(...)`                       | SET (Conjunto)             | GAUGE                |
| [DogStatsD][18]   | `dog.histogram(...)`                 | HISTOGRAM       | gaugeTARIFA          |
## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/custom_metrics/type_modifiers/
[2]: /es/dashboards/functions/
[3]: /es/metrics/summary/
[4]: https://statsd.readthedocs.io/en/v3.3/types.html#sets
[5]: /es/metrics/custom_metrics/agent_metrics_submission/
[6]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[7]: /es/api/v1/metrics/#submit-metrics
[8]: /es/developers/dogstatsd/#how-it-works
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