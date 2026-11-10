---
aliases:
- /es/graphing/functions/rollup/
description: Controle el desglose temporal y los intervalos de puntos de datos mediante
  funciones de resumen personalizadas y resúmenes móviles para métricas.
further_reading:
- link: /dashboards/guide/rollup-cardinality-visualizations
  tag: Documentación
  text: Comprensión de la función de resumen y la cardinalidad en las visualizaciones
title: Rollup
---
Cada consulta de métrica se agrega de forma inherente. Sin embargo, agregar la función `.rollup()` al final de una consulta le permite realizar un [desglose temporal][1] personalizado que anula los valores predeterminados. Esta función le permite definir:

* El resumen `<interval>`: el intervalo de tiempo sobre el cual se agregan sus datos ([si es mayor que el intervalo de resumen aplicado por la consulta](#rollup-interval-enforced-vs-custom)).
* El resumen `<aggregator>`: cómo se agregan sus puntos de datos dentro de un intervalo de tiempo de resumen determinado.

Para aplicar un resumen, navegue al botón {{< ui >}}Add function{{< /ui >}} (Σ) del editor de gráficos: 

{{< img src="dashboards/functions/rollup/rollup_option_1.mp4" alt="Seleccione la opción Promedio de resumen en el botón Agregar función" video=true >}}

**Nota**: El tipo de métrica de distribución no tiene un parámetro de resumen `aggregator`. Este tipo de métrica se agrega tanto en tiempo como en espacio. Consulte la documentación sobre [resumen para distribuciones con percentiles][2] para obtener más información.

La función toma dos parámetros, `<AGGREGATOR>` y opcionalmente `<INTERVAL>`: `.rollup(<AGGREGATOR>,<INTERVAL>)` o `.rollup(<AGGREGATOR>)`.

| Parámetro  | Descripción                                                                                                     |
|------------|-----------------------------------------------------------------------------------------------------------------|
| `<AGGREGATOR>` | Puede ser `avg`, `sum`, `min`, `max` o `count`, y define cómo se agregan los puntos de datos dentro de un intervalo de tiempo determinado. [Predeterminado aplicado](#rollup-interval-enforced-vs-custom): `avg`. |
| `<INTERVAL>`   | Tiempo (en segundos) del intervalo entre dos puntos de datos mostrados. Opcional.                                            |

Puede usarlos individualmente o juntos, por ejemplo `.rollup(sum,120)`. El siguiente gráfico de barras muestra una semana de uso de CPU para un servidor **sin** usar la función `.rollup()`:

{{< img src="dashboards/functions/rollup/smooth_1.png" alt="smooth_1" style="width:60%;" >}}

El siguiente gráfico de barras muestra la misma métrica, graficada usando un rollup de un día con `.rollup(avg,86400)`:

{{< img src="dashboards/functions/rollup/smooth_2.png" alt="smooth_2" style="width:60%;" >}}

## Rollup móvil {#moving-rollup}


| Función        | Descripción                                    | Ejemplo |
|------------------|------------------------------------------------|------------------|
| `moving_rollup` | Rollup para combinar los puntos en los últimos X segundos. | `moving_rollup(<METRIC_NAME>, <INTERVAL> , <AGGREGATOR>)` |


Aplicar la función `moving_rollup()` a una consulta le permite combinar puntos del rango de tiempo especificado más reciente, es decir, los últimos X segundos. Al igual que con `.rollup()`, `<AGGREGATOR>` puede ser `sum`/`min`/`max`/`count`/`avg` y define cómo se agregan los puntos de datos dentro del intervalo de tiempo dado.

## Intervalo de rollup: forzado vs personalizado {#rollup-interval-enforced-vs-custom}

Al graficar, Datadog establece un límite en la cantidad de puntos por series temporales. Para mantener la claridad visual, una serie puede tener hasta 1,500 puntos. Para respetar este límite, Datadog realiza el rollup de los puntos de datos automáticamente, utilizando de forma predeterminada el método `avg`, mostrando efectivamente el promedio de todos los puntos de datos dentro de un intervalo de tiempo para una métrica determinada. El intervalo de tiempo de rollup predeterminado varía según cómo se visualicen los datos. Consulte el siguiente gráfico para ver estos intervalos de tiempo predeterminados:

| Marco de tiempo          | Intervalo de rollup, gráfico de líneas | Intervalo de rollup, gráfico de barras | Intervalo de rollup, API |
|---------------------|-----------------------------|----------------------------|----------------------|
| El último minuto     | 1s                          | 1s                         | 1s                   |
| Últimos 5 minutos  | 2s                          | 5s                         | 2s                   |
| Últimos 15 minutos | 5s                          | 10s                        | 5s                   |
| Últimos 30 minutos | 10s                         | 30s                        | 10s                  |
| Última hora       | 20s                         | 1m                         | 20s                  |
| Últimas cuatro horas | 1m                          | 2m                         | 1m                   |
| Último día        | 5m                          | 20m                        | 5m                   |
| Últimos dos días   | 10m                         | 30m                        | 10m                  |
| Última semana       | 1h                         | 2h                        | 1h                  |
| Último mes      | 4h                         | 12h                       | 4h                  |
| Últimos 3 meses   | 12h                        | 1d                         | 12h                 |
| Últimos 6 meses   | 1d                          | 1d                         | 1d                   |
| El pasado año       | 1d                          | 1w                         | 1d                   |

Se puede usar una función `.rollup()` personalizada para especificar el tipo de desglose temporal aplicado (`avg`, `min`, `max`, `count` o `sum`) y, opcionalmente, el intervalo de tiempo para el rollup. Al usar esta función, puede establecer el intervalo de tiempo de rollup en un valor diferente a los predeterminados, hasta un límite de 1,500 puntos. Esto admite hasta un punto por minuto durante un día.

**Nota**:
- El [widget de valor de consulta][8] apunta a 150 puntos en lugar de los 1,500 puntos que usan los widgets de gráfico de líneas y gráfico de barras. Para la misma ventana de tiempo, esto resulta en un intervalo de rollup efectivo más amplio para los widgets de valor de consulta.
- Las consultas para métricas de tipo `COUNT` y `RATE` tienen el modificador `.as_count()` añadido automáticamente en la interfaz de usuario, lo que establece el método de rollup utilizado en `sum` y deshabilita la interpolación. Este `.as_count()` es explícitamente visible al final de la consulta:

  {{< img src="dashboards/functions/rollup/as_count_dropdown.png" alt="as_count" style="width:100%;">}}

Para obtener más detalles sobre cómo usar `.as_count()` y `.as_rate()`, consulte la publicación del blog [Visualize StatsD metrics][3], o aprenda más sobre los efectos de esas funciones con la documentación sobre [in-application modifiers][4].

## Rollup con consultas alineadas al calendario {#rollup-with-calendar-aligned-queries}

{{< img src="dashboards/functions/rollup/calendar_aligned_queries.png" alt="calendar_aligned_queries" style="width:100%;" >}}

Puede personalizar cómo se agrupan sus datos de métricas a lo largo del tiempo cuando usa la función `.rollup()` con consultas alineadas al calendario. Esta función le permite la flexibilidad de definir:

* Consultas mensuales alineadas al calendario con fecha de inicio y zonas horarias ajustables. Por ejemplo, puede comparar sus errores de cliente mensuales de febrero y diciembre del año pasado.
* Rollups semanales con fecha de inicio y zonas horarias ajustables. Por ejemplo, vea cuántas transacciones semanales están abiertas (si su semana comienza los lunes).
* Rollups diarios con fecha de inicio y zonas horarias ajustables. Por ejemplo, vea cuántos eventos de interés ocurrieron en el día actual (si su día comienza a la medianoche, hora del Pacífico).

La sintaxis de rollup alineada al calendario extiende `.rollup()` con una unidad de calendario y un día de alineación y zona horaria opcionales:

`.rollup(<AGGREGATOR>, <CALENDAR_UNIT>, <ALIGNMENT>, '<TIMEZONE>')`

| Parámetro        | Descripción                                                                                                          |
|------------------|----------------------------------------------------------------------------------------------------------------------|
| `<AGGREGATOR>`   | Puede ser `avg`, `sum`, `min`, `max` o `count`.                                                                       |
| `<CALENDAR_UNIT>`| `daily`, `weekly` o `monthly`.                                                                                     |
| `<ALIGNMENT>`    | Para `weekly`: el día de inicio como un nombre de día en minúsculas (`monday`, `tuesday`, ..., `sunday`). El valor predeterminado es `sunday` si se omite. Para `daily`: una hora de inicio como `12am`. Para `monthly`: una fecha de inicio. |
| `<TIMEZONE>`     | Opcional. Una cadena de [zona horaria de IANA][7] como `America/New_York` o `Europe/Paris`. El valor predeterminado es UTC si se omite.    |

**Ejemplos**:

Rollup semanal que comienza el lunes (UTC):

```
sum:requests.count{*}.as_count().rollup(sum, weekly, monday)
```

Rollup semanal que comienza el lunes en hora del Este:

```
sum:requests.count{*}.as_count().rollup(sum, weekly, monday, 'America/New_York')
```

Rollup diario que comienza a medianoche en hora del Pacífico:

```
sum:requests.count{*}.as_count().rollup(sum, daily, 12am, 'America/Los_Angeles')
```

## Rollups en seguimientos {#rollups-in-monitors}

Por lo general, se deben evitar los rollups en las consultas de seguimiento debido a la posibilidad de desalineación entre el intervalo de rollup y la ventana de evaluación del seguimiento. El inicio y el fin de los intervalos de rollup están alineados con el tiempo UNIX, no con el inicio y el fin de las consultas de seguimiento. Por lo tanto, un seguimiento puede evaluar (y activar) un intervalo de rollup incompleto que contenga solo una pequeña muestra de datos. Para evitar este problema, retrase la evaluación de su seguimiento por (al menos) la duración del intervalo de rollup de configuración.

Si las consultas de su seguimiento aparecen inesperadamente {{< ui >}}No Data{{< /ui >}}, revise la configuración de rollups y ventanas de evaluación. Para obtener más información, consulte [Solución de problemas de falta de datos en los seguimientos][6].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/functions/#add-a-function
[2]: /es/metrics/faq/rollup-for-distributions-with-percentiles/
[3]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[4]: /es/metrics/custom_metrics/type_modifiers/
[5]: /es/monitors/types/metric/
[6]: /es/monitors/guide/troubleshooting-no-data/
[7]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[8]: /es/dashboards/widgets/query_value/