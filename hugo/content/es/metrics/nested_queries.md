---
further_reading:
- link: /dashboards/querying/
  tag: Documentación
  text: Consulta de dashboards
- link: https://www.datadoghq.com/blog/nested-queries/
  tag: Blog
  text: Descubre información útil con consultas de métricas anidadas
title: Consultas anidadas
---

## Información general

Por defecto, toda consulta de métrica en Datadog consta de dos capas de agregación. Las consultas anidadas permiten reutilizar los resultados de una consulta anterior en otra posterior.

{{< img src="metrics/nested_queries/nested-queries-example-video.mp4" alt="Cómo configurar las consultas anidadas en la interfaz de usuario" video=true style="width:100%" >}}

Las consultas anidadas desbloquean varias funciones potentes:

- [Agregación multicapa][6]
- [Percentiles y desviación típica en métricas de tipo count/rate/gauge][7]
- [Consultas de mayor resolución en periodos históricos][8]

## Agregación multicapa

En Datadog, cada consulta de métrica en Datadog se evalúa con dos capas de agregación: primero temporal y luego espacial. La agregación multicapa permite aplicar capas adicionales de agregación temporal o espacial. Para más información sobre la agregación, consulta la [anatomía de una consulta de métrica][5].

{{< img src="/metrics/nested_queries/nested-queries-before-after.png" alt="ejemplo de aplicación de consultas anidadas antes y después" style="width:100%;" >}}



### Agregación temporal multicapa

Accede a la agregación temporal multicapa con la función `rollup`. Cada consulta de métrica ya contiene un `rollup` inicial (agregación temporal) que controla el nivel de detalle de los puntos de datos mostrados en el gráfico. Para más información, consulta la documentación [rollup][1]. 

Puedes aplicar capas adicionales de agregación temporal con rollups posteriores.

El primer rollup admite los siguientes agregadores:
- `prom.`
- `sum`
- `mín.`
- `máx.`
- `count`

Las capas adicionales proporcionadas por la agregación temporal multicapa admiten los siguientes agregadores temporales: 

- `prom.`
- `sum`
- `mín.`
- `máx.`
- `count`
- `arbitrary percentile pxx` (`p78, p99, p99.99, etc.`)
- `stddev`

La agregación temporal multicapa puede utilizarse con las siguientes funciones:

| Funciones compatibles   | Descripción                                                                                    |
|-----------------------|-----------------------------------------------------------------------------------------------|
| Operadores aritméticos   | `+, -, *, /`                                                                                  |
| Funciones de cambio temporal    | `<METRIC_NAME>{*}, -<TIME_IN_SECOND>`<br> `hour_before(<METRIC_NAME>{*})`<br> `day_before(<METRIC_NAME>{*})`<br> `week_before(<METRIC_NAME>{*})`<br> `month_before(<METRIC_NAME>{*})` |
| Selección Top-k        | `top(<METRIC_NAME>{*}, <LIMIT_TO>, '<BY>', '<DIR>')`                                         |

Cualquier función que no figure en la lista anterior no puede combinarse con la agregación temporal multicapa. 

{{% collapse-content title="Consulta de ejemplo de agregación temporal" level="h5" %}}
Esta consulta calcula primero el uso medio de la CPU para cada instancia de EC2 agrupado por `env` y `team`, agrupado en intervalos de 5 minutos. A continuación, se aplica la agregación temporal multicapa para calcular el percentil 95 en tiempo de esta consulta anidada en intervalos de 30 m.


{{< img src="/metrics/nested_queries/multilayer-time-agg-ui.png" alt="ejemplo de agregación temporal multicapa en JSON" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/multilayer-time-agg-json.png" alt="ejemplo de agregación temporal multicapa en el JSON" style="width:100%;" >}}
{{% /collapse-content %}} 


### Agregación espacial multicapa

Después de especificar etiquetas en tu primera capa de agregación espacial para agrupar por, accede a la agregación espacial multicapa con la función `Group By`.

Puedes aplicar capas adicionales de agregación espacial con `Group Bys` posteriores.
Nota: Si no especificas etiquetas para agrupar en tu capa de agregación espacial inicial, la agregación espacial multicapa no estará disponible.

La primera capa de agregación espacial admite los siguientes agregadores:

- `avg by`
- `sum by`
- `min by`
- `max by`

Capas adicionales de soporte de agregación espacial:

- `avg by`
- `sum by`
- `min by`
- `max by`
- `arbitrary percentile pXX` (`p75, p99, p99.99, etc.`)
- `stddev by`

La agregación espacial multicapa puede utilizarse con las siguientes funciones: 
| Funciones compatibles | Descripción |
|-----------------------|-----------------------------------------------------------------------------------------------|
| Operadores aritméticos `+, -, *, /` 
| Funciones de cambio temporal `<METRIC_NAME>{*}, -<TIME_IN_SECOND>` <br> `hour_before(<METRIC_NAME>{*})` <br> `day_before(<METRIC_NAME>{*})` <br> `week_before(<METRIC_NAME>{*})` <br> `month_before(<METRIC_NAME>{*})` 
| Selección Top-k `top(<METRIC_NAME>{*}, <LIMIT_TO>, '<BY>', '<DIR>')` 

Cualquier función que no figure en la lista anterior no puede combinarse con la agregación espacial multicapa.

Todas las agregaciones espaciales, con la excepción de las agregaciones espaciales percentiles, tienen un argumento, que es la clave o las claves de etiqueta por las que deseas agrupar. Las agregaciones espaciales percentiles requieren dos argumentos: 
- El percentil arbitrario pXX
- Las etiquetas para agrupar por


{{% collapse-content title="Consultas de ejemplo de agregación espacial" level="h5" %}}
Esta consulta inicial, `avg:aws.ec2.cpuutilization{*} by {env,host}.rollup(avg, 300)` calcula la suma del uso medio de la CPU, agrupado por `env` y `host` cada 5 minutos. A continuación, se aplica la agregación espacial multicapa para calcular el valor máximo del uso medio de la CPU por `env`.


En la interfaz de usuario o la pestaña JSON, tendría el siguiente aspecto:

{{< img src="/metrics/nested_queries/multilayer-space-agg-ui.png" alt="ejemplo de agregación espacial multicapa en la interfaz de usuario" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/multilayer-space-agg-json.png" alt="ejemplo de agregación espacial multicapa en el JSON" style="width:100%;" >}}
{{% /collapse-content %}} 


## Percentiles y desviación típica de los counts, rates y gauges agregados

Puedes utilizar la agregación multicapa (temporal y espacial) para consultar los percentiles y la desviación estándar de las consultas en counts, rates y gauges. Te permiten comprender mejor la variabilidad y la dispersión de tus grandes conjuntos de datos y te permiten identificar mejor outliers. 

**Nota**: Los agregadores de percentiles o desviaciones estándar en las consultas anidadas se calculan utilizando los resultados de una métrica count, rate o gauge existente y agregada. Para obtener percentiles globalmente precisos que se calculen sobre valores brutos no agregados de una métrica, utiliza en su lugar [métricas de distribución][9]. 

 {{% collapse-content title="Percentiles en la consulta de ejemplo de agregación temporal multicapa " level="h5" %}}

Podemos utilizar percentiles en la agregación temporal multicapa para resumir los resultados de nuestra consulta anidada (uso medio de la CPU por `env` y `team` cada 5 minutos) calculando el valor p95 de esta consulta anidada cada 30 minutos. 

 {{< img src="/metrics/nested_queries/percentiles-time-agg-ui.png" alt="ejemplo de los percentiles de agregación temporal MLA usando consultas anidadas en la interfaz de usuario" style="width:100%;" >}}

 {{< img src="/metrics/nested_queries/percentiles-time-agg-json.png" alt="ejemplo de los percentiles de agregación temporal MLA usando consultas anidadas en el JSON" style="width:100%;" >}}

 {{% /collapse-content %}} 


{{% collapse-content title="Percentiles en la consulta de ejemplo de agregación espacial multicapa" level="h5" %}}

Podemos utilizar percentiles en la agregación espacial multicapa para resumir los resultados de nuestra consulta anidada (uso medio de la CPU por `env` y `team` cada 5 minutos) calculando el valor p95 de esta consulta anidada para cada valor único de `env`. 

En la interfaz de usuario o la pestaña JSON, tendría el siguiente aspecto:

 {{< img src="/metrics/nested_queries/percentiles-space-agg-ui.png" alt="ejemplo de percentiles de agregación espacial de MLA usando consultas anidadas en la interfaz de usuario" style="width:100%;" >}}

 {{< img src="/metrics/nested_queries/percentiles-space-agg-json.png" alt="ejemplo de percentiles de agregación espacial de MLA usando consultas anidadas en el JSON" style="width:100%;" >}}

  {{% /collapse-content %}} 



{{% collapse-content title="Consulta de ejemplo de desviación estándar" level="h5" %}}

La desviación estándar ayuda a medir la variabilidad o dispersión de un conjunto de datos. La siguiente consulta utiliza la desviación estándar con agregación temporal multicapa para calcular la desviación estándar de nuestra consulta anidada (suma de counts de solicitudes a la API, promediada en 4 horas) en periodos más largos de doce horas:

En la interfaz de usuario o la pestaña JSON, tendría el siguiente aspecto:

 {{< img src="/metrics/nested_queries/nested-queries-std-ui.png" alt="ejemplo de una desviación estándar con consultas anidadas en la interfaz de usuarios" style="width:100%;" >}}

 {{< img src="/metrics/nested_queries/nested-queries-std-json.png" alt="ejemplo de desviación estándar con consultas anidadas en JSON" style="width:100%;" >}}
{{% /collapse-content %}} 


## Consultas de mayor resolución en periodos históricos

Cada consulta de métrica contiene una capa inicial de agregación temporal (rollup) que controla el nivel de detalle de los puntos de datos mostrados. Datadog proporciona intervalos rollup por defecto que aumentan a medida que crece el marco temporal global de la consulta. Las consultas anidadas permiten acceder a datos más detallados y de mayor resolución en periodos históricos más largos.

 {{< img src="/metrics/nested_queries/higher-res-query-example.png" alt="ejemplos de consultas de mayor resolución en periodos históricos en la interfaz de usuario" style="width:100%;" >}}

{{% collapse-content title="Ejemplo de consulta de mayor resolución" level="h5" %}}

Históricamente, cuando se consultaba una métrica durante el último mes, se veían los datos con un nivel de detalle de 4 horas por defecto. Puedes utilizar consultas anidadas para acceder a datos de mayor detalle en este periodo histórico. Aquí encontrarás un ejemplo de consulta graficada sobre el mes pasado donde el recuento de lotes de consulta se despliega inicialmente en intervalos de 5 minutos. A continuación, se aplica la agregación temporal multicapa para calcular la desviación estándar en el tiempo de esta consulta anidada en intervalos de 4 horas para obtener un gráfico más legible.

Nota: Datadog recomienda que definas tu rollup inicial con el intervalo rollup más detallado y utiliza la agregación temporal multicapa con intervalos rollup más amplios para obtener gráficos más legibles para el usuario.

En la interfaz de usuario o la pestaña JSON, tendría el siguiente aspecto:

{{< img src="/metrics/nested_queries/nested-queries-higher-res-ui.png" alt="ejemplo de consultas de mayor resolución usando consultas anidadas en las interfaz de usuarios" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/nested-queries-higher-res-json.png" alt="ejemplo de consultas de mayor resolución usando consultas anidadas en JSON" style="width:100%;" >}}
{{% /collapse-content %}} 

## Rollup en movimiento
Datadog proporciona un función `moving_rollup` que permite la agregación de puntos de datos en un periodo especificado. Para más información, consulta [moving-rollup][10]. Mediante el uso de consultas anidadas, puedes ampliar su funcionalidad para incorporar el modo de vista histórica, lo que te permite analizar puntos de datos más allá del periodo de consulta original. Esto proporciona una visión más completa de las tendencias y patrones de tu consulta a lo largo del periodo especificado.

{{< img src="/metrics/nested_queries/moving-rollup-diagram.png" alt="ejemplo de funciones moving_rollup antiguas frente a funciones moving_rollup nuevas" style="width:100%;" >}}

La versión actual de la función `moving_rollup` sólo admite los siguientes agregadores:
- `prom.`
- `sum`
- `mín.`
- `máx.`
- `median`

Al anidar consultas, sólo puede utilizarse la versión en modo visión histórica de la función `moving_rollup`. Esta versión de la función admite los siguientes agregadores:
- `prom.`
- `sum`
- `mín.`
- `máx.`
- `count`
- `count by`
- `arbitrary percentile pxx` (`p78, p99, p99.99, etc.`)
- `stddev`

{{% collapse-content title="Movimiento máximo de rollup con el modo de visión histórica activado" level="h5" %}}
Al anidar estas `moving_rollups`, los intervalos rollup proporcionados deben hacerse más grandes como se muestra en la interfaz de usuario o la pestaña JSON:

{{< img src="/metrics/nested_queries/moving_rollup1_ui.png" alt="ejemplo de moving rollup en la interfaz de usuarios" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/moving_rollup1_json.png" alt="ejemplo de moving rollup en JSON" style="width:100%;" >}}


{{% /collapse-content %}} 


{{% collapse-content title="Desviación estándar de moving rollup con el modo de visión histórica activado" level="h5" %}}
También puedes utilizar percentiles y desviación estándar con la nueva función moving rollup, que admite el modo de visión histórica y permite el anidamiento de moving rollups con el modo de visión histórica activado.

En la interfaz de usuario o la pestaña JSON, tendría el siguiente aspecto:

{{< img src="/metrics/nested_queries/moving_rollup2_ui.png" alt="ejemplo de moving rollup con la desviación estándar en la interfaz de usuarios" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/moving_rollup2_json.png" alt="ejemplo de moving rollup con desviación estándar en JSON" style="width:100%;" >}}

{{% /collapse-content %}} 


## Funciones de reasignación de umbral booleano

La reasignación de funciones permite refinar y transformar los resultados de las consultas en función de condiciones específicas, ampliando la funcionalidad de monitorización y el análisis. Las consultas anidadas desbloquean las tres nuevas siguientes funciones:

- `is_greater` (`<QUERY>, <THRESHOLD>`)
- `is_less` (`<QUERY>, <THRESHOLD>`)
- `is_between` (`<QUERY>, <LOWER THRESHOLD>, <UPPER THRESHOLD>`)


{{% collapse-content title="ejemplo de consulta is_greater()" level="h5" %}}
`is_greater()` devuelve 1.0 para cada punto donde la consulta es mayor que una constante de 30 y 0.0 en el resto.

En la interfaz de usuario o la pestaña JSON, tendría el siguiente aspecto:
{{< img src="/metrics/nested_queries/is_greater_ui.png" alt="ejemplo de la función de asignación is_greater en la interfaz de usuario" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/is_greater_json.png" alt="ejemplo de función de asignación is_greater en JSON" style="width:100%;" >}}

{{% /collapse-content %}} 

{{% collapse-content title="ejemplo de consulta is_less()" level="h5" %}}
`is_less()` devuelve 1.0 para cada punto donde la consulta es menor que una constante de 30 y 0.0 en el resto.

En la interfaz de usuario o la pestaña JSON, tendría el siguiente aspecto:
{{< img src="/metrics/nested_queries/is_less_ui.png" alt="ejemplo de la función de asignación is_less en la interfaz de usuario" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/is_less_json.png" alt="ejemplo de la función de asignación is_less en JSON" style="width:100%;" >}}


{{% /collapse-content %}} 

{{% collapse-content title="ejemplo de consulta is_between()" level="h5" %}}
`is_between()` devuelve 1.0 para cada punto en el que la consulta esté entre 10 y 30 (exclusivo), y 0.0 en el resto.

En la interfaz de usuario o la pestaña JSON, tendría el siguiente aspecto:
{{< img src="/metrics/nested_queries/is_between_ui.png" alt="ejemplo de la función de asignación is_between en la interfaz de usuarios" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/is_between_json.png" alt="ejemplo de la función de asignación is_between en JSON" style="width:100%;" >}}


{{% /collapse-content %}} 


## Utilizar consultas anidadas con la API de Datadog
Puedes utilizar la funcionalidad de consultas anidadas de nuestra [API pública para la consulta de datos de series temporales][3]. Cambia el contenido del objeto **formula**


 {{< img src="/metrics/nested_queries/nested-queries-using-api.png" alt="ejemplo de consultas de mayor resolución usando consultas anidadas en JSON" style="width:100%;" >}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/functions/rollup/
[2]: /es/metrics/#configure-time-aggregation
[3]: /es/metrics/#query-timeseries-data-across-multiple-products
[4]: /es/metrics/distributions/
[5]: /es/metrics/#anatomy-of-a-metric-query
[6]: /es/metrics/nested_queries/#multilayer-aggregation
[7]: /es/metrics/nested_queries/#percentiles-and-standard-deviation-for-aggregated-counts-rates-and-gauges
[8]: /es/metrics/nested_queries/#higher-resolution-queries-over-historical-time-frames
[9]: /es/metrics/distributions/
[10]: /es/dashboards/functions/rollup/#moving-rollup