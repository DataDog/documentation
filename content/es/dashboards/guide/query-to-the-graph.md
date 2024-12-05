---
aliases:
- /es/dashboards/faq/query-to-the-graph
title: Consulta al gráfico
---

Esta página se centra en describir los pasos que realiza el sistema Crear gráficas de Datadog desde la consulta hasta la gráfica, para que te hagas una idea de cómo elegir los ajustes de tu gráfico.

Al crear un gráfico en [timeboard][1] o [screenboard][2], puedes utilizar el editor o la pestaña JSON para configurar consultas avanzadas. El ejemplo siguiente utiliza la métrica `system.disk.total` procedente de un servidor específico (`host:bubs`).

{{< img src="dashboards/faq/graph_metric.png" alt="graph_metric" style="width:80%;">}}

A continuación, sigue cada paso ejecutado por el backend Datadog para realizar la consulta y representar una línea gráfica en tu dashboard.

En cada paso, este artículo señala el efecto de cada parámetro de la consulta.
**Antes de la consulta, almacenamiento: los datos se almacenan por separado en función de las etiquetas (tags)**.

La métrica `system.disk.total` (recogida por defecto por el [datadog-agent][3]) es vista desde diferentes fuentes.

Esto se debe a que esta métrica es reportada por diferentes hosts, y también a que cada datadog-agent recoge esta métrica por dispositivo. Añade a la métrica `system.disk.total` la etiqueta `device:tmpfs` al enviar datos asociados al disco con el mismo nombre, etc.

Así, esta métrica se ve con diferentes combinaciones de etiquetas `{host, dispositivo}`.

Para cada fuente (definida por un host y un conjunto de etiquetas), los datos se almacenan por separado.
En este ejemplo, considera que `host:moby` tiene 5 dispositivos. Por consiguiente, Datadog almacena 5 series temporales (todos los puntos de datos enviados a lo largo del tiempo para una fuente) para:

* `{host:moby, device:tmpfs}`
* `{host:moby, device:cgroup_root}`
* `{host:moby, device:/dev/vda1}`
* `{host:moby, device:overlay}`
* `{host:moby, device:shm}`

A continuación, considera los pasos sucesivos seguidos por el backend para la consulta presentada anteriormente.

## Encontrar las series temporales necesarias para la consulta

En esta consulta, solo se han pedido datos asociados a `host:moby`. Por lo tanto, el primer paso para el backend de Datadog es escanear todas las fuentes (en este caso, todas las combinaciones de `{host, device}` con las que se envía la métrica `system.disk.total` ) y retener solo las correspondientes al contexto de la consulta.

Como habrás adivinado, el backend encuentra cinco fuentes coincidentes (ve el párrafo anterior).

{{< img src="dashboards/faq/metrics_graph_2.png" alt="metrics_graph_2" style="width:70%;">}}

La idea es agregar los datos desde estas fuentes para ofrecerte una métrica que represente el `system.disk.total` de tu host. Esto se hace en el [paso 3](#proceed-to-space-aggregation).

**Nota**: El sistema de etiquetado adoptado por Datadog es sencillo y potente. No es necesario conocer o especificar las fuentes que se van a combinar: basta con dar una etiqueta, como un ID, y Datadog combina todos los datos con este ID y no el resto. Por ejemplo, no necesitas saber el número de hosts o dispositivos que tienes cuando consultas `system.disk.total{*}`. Datadog agrega los datos de todas las fuentes por ti.

[Más información sobre series temporales y cardinalidad de etiquetas][4]

****Parameter involved: scope** (Parámetro implicado: contexto)
Puedes utilizar más de una etiqueta, como `{host:moby, device:udev}`, si deseas obtener datos que respondan a ambas etiquetas.

## Proceder a la agregación temporal

El backend Datadog selecciona todos los datos correspondientes al período de tu gráfico.

Sin embargo, antes de combinar todos los datos de las distintas fuentes (paso 3), Datadog debe proceder a la agregación temporal.

### ¿Por qué?

Dado que Datadog almacena los datos con una granularidad de 1 segundo, no puede mostrar todos los datos reales en los gráficos. Ve [metric aggregation (agregación de métrica)][5] para más detalles.

Para obtener un gráfico de una ventana temporal de 1 semana, sería necesario enviar cientos de miles de valores a tu navegador y, además, no se podrían representar gráficamente todos estos puntos en un widget que ocupa una pequeña parte de la pantalla. Por estas razones, Datadog se ve obligado a proceder a la agregación de datos y a enviar un número limitado de puntos a tu navegador para representar un gráfico.

### ¿Qué granularidad?

Por ejemplo, en una vista de un día con la visualización "líneas", hay un punto de datos cada 5 minutos. El backend Datadog divide el intervalo de un día en 288 buckets de 5 minutos. Para cada bucket, el backend agrupa todos los datos en un único valor. Por ejemplo, el punto de datos que aparece en el gráfico con la marca de tiempo 07:00 es en realidad un agregado de todos los puntos de datos reales enviados entre las 07:00:00 y las 07:05:00 de ese día.

### ¿Cómo?

Por defecto, el backend Datadog calcula el agregado rollup promediando todos los valores reales, lo que tiende a suavizar los gráficos a medida que se aleja el zoom. [Más información sobre por qué al alejar un marco temporal también se suavizan los gráficos][6].
La agregación de datos es necesaria tanto si se dispone de 1 como de 1000 fuentes, siempre que se observe una ventana temporal amplia. Lo que generalmente se ve en el gráfico no son los valores reales presentados, sino agregados locales.

{{< img src="dashboards/faq/metrics_graph_3.png" alt="metrics_graph_3" style="width:75%;">}}

El backend Datadog calcula una serie de agregados locales para cada fuente correspondiente a la consulta.

Sin embargo, puedes controlar cómo se realiza esta agregación.

**Parameter involved: rollup (optional)** (Parámetro implicado: rollup [opcional])
¿Cómo utilizar la [función 'rollup'][7]?

En este ejemplo, `rollup(avg,60)` define un período agregado de 60 segundos. Por lo tanto, el intervalo de X minutos se divide en Y intervalos de 1 minuto cada uno. Los datos dentro de un minuto determinado se agregan en un único punto que aparece en el gráfico (después del paso 3, la agregación espacial).

**Nota**: El backend Datadog intenta mantener el número de intervalos por debajo de ~300. Así que si haces `rollup(60)` en una ventana de tiempo de 2 meses, no obtendrás la granularidad de un minuto solicitada.

## Proceder a la agregación espacial

A continuación, puedes mezclar datos de distintas fuentes en una sola línea.

Tienes ~300 puntos por cada fuente. Cada uno de ellos representa un minuto.
En este ejemplo, para cada minuto, Datadog calcula la media de todas las fuentes, lo que da como resultado el siguiente gráfico:

{{< img src="dashboards/faq/metrics_graph_4.png" alt="metrics_graph_4" style="width:75%;">}}

El valor obtenido (25,74 GB) es la media de los valores comunicados por todas las fuentes (ve la imagen anterior).

**Nota**: Si solo hay una fuente (por ejemplo, si has elegido el contexto `{host:moby, device:/dev/disk}` para la consulta), el uso de `suma`/`prom.`/`máx.`/`mín.` no tiene ningún efecto, ya que no es necesario realizar ninguna agregación espacial. Ve FAQ en [switching between the sum/min/max/avg aggregators (cambiar entre los agregadores suma/mín./máx./prom.)][8].

**Parameter involved: space aggregator** (Parámetro implicado: aggregator de espacio)

Datadog ofrece 4 agregadores espaciales:

* `máx.`
* `mín.`
* `prom.`
* `suma`

## Aplica funciones (opcional)

Funciones puede aplicarse a la aritmética en el cuadro `Fórmula` cuando se crean gráficas de datos. La mayoría de las funciones se aplican en el último paso. A partir de los ~300 puntos obtenidos tras las agregaciones temporales (paso 2) y espaciales (paso 3), la función calcula nuevos valores que pueden verse en tu gráfico.

En este ejemplo la función `abs` asegura que tus resultados son números positivos.

**Parameter involved: function** (Parámetro implicado: función)

{{< whatsnext desc="Choose your type of functions" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorítmica: implementa la detección de anomalía en tu métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Aritmética: realiza operaciones aritméticas en tu métrica.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Recuento: cuenta los valores distintos de cero o no nulos de tu métrica. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolación: rellena o establece valores predeterminados para tu métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rango: selecciona solo un subconjunto de métricas. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Rango: calcula la derivada personalizada sobre tu métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regresión: aplica una función de machine learning a tu métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: controla el número de puntos brutos utilizados en tu métrica. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Suavizado: suaviza las variaciones de tu métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Desplazamiento: desplaza el punto de datos de métrica a lo largo de la línea de tiempo. {{< /nextlink >}}
{{< /whatsnext >}}

### Consultas agrupadas, aritmética, as_count/rango

#### Consultas agrupadas

{{< img src="dashboards/faq/metric_graph_6.png" alt="metric_graph_6" style="width:75%;">}}

La lógica es la misma:

1. El backend Datadog encuentra todos los diferentes dispositivos asociados a la fuente seleccionada.
2. Para cada dispositivo, el backend realiza la consulta `system.disk.total{host:example, dispositivo:<DEVICE>}` como se explica en este artículo.
3. Todos los resultados finales se representan en el mismo gráfico.

{{< img src="dashboards/faq/metric_graph_7.png" alt="metric_graph_2" style="width:75%;">}}

**Nota**: Los modificadores `rollup` o `as_count` deben colocarse después de la mención por {`dispositivo`}.

**Nota 2**: Puedes utilizar varias etiquetas, por ejemplo: `system.disk.in_use{*} por {host,dispositivo}`.

#### Aritmética

La aritmética se aplica también después de la agregación temporal y espacial ([paso 4: Aplicar función](#apply-functions-optional)).

{{< img src="dashboards/faq/metric_graph_8.png" alt="metric_graph_8" style="width:75%;">}}

#### Recuento y tasa

`as_count` y `as_rate` son agregadores de tiempo específicos para tasas y contadores enviados con StatsD o DogStatsD. Permiten ver métricas como tasa por segundo, o verlos como Counts en bruto.
Sintaxis: en lugar de añadir un rollup, puedes utilizar `.as_count()` o `.as_rate()`.

Para más información, ve [Visualize StatsD metrics with Counts Graphing (Visualiza métricas StatsD Crear gráficas Counts)][9].
Documentación sobre [StatsD/DogStatsD][10].

[1]: /es/dashboards/#timeboards
[2]: /es/dashboards/#screenboards
[3]: /es/agent/
[4]: /es/metrics/custom_metrics/
[5]: /es/dashboards/querying/#aggregate-and-rollup
[6]: /es/dashboards/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs/
[7]: /es/dashboards/functions/rollup/
[8]: /es/metrics/guide/different-aggregators-look-same/
[9]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[10]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/