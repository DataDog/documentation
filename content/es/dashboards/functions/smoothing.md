---
aliases:
- /es/graphing/functions/smoothing/
title: Suavizado
---

## Suavizado automático

| Función       | Descripción                                                           | Ejemplo                        |
| :----          | :-------                                                              | :---------                     |
| `autosmooth()` | Elimina automáticamente el ruido conservando la tendencia de métrica. | `autosmooth(<METRIC_NAME>{*})` |

La función `autosmooth()` aplica una media móvil con un tramo (span) seleccionado automáticamente. Esta hace un suavizado de una serie temporal a la vez que conserva su tendencia. En este ejemplo, la función elige el tramo óptimo para suavizar la serie temporal:

{{< img src="dashboards/functions/smoothing/autosmooth_illustration.png" alt="Ilustración del suavizado automático" style="width:80%;">}}

Cuando se utiliza en una consulta `group by`, como `avg by`, se aplica el mismo tramo a todas las series temporales. Si se utiliza en varias métricas del mismo gráfico, se pueden seleccionar diferentes tramos para suavizar de forma óptima cada una de las series temporales de métrica.

El algoritmo se inspira en el [algoritmo ASAP][1] (puedes leer más sobre el algoritmo en esta [entrada de blog])[2].

La función `autosmooth()` no puede utilizarse en monitores. Dado que el tramo se elige de forma dinámica, el resultado de aplicar la función podría cambiar de un minuto a otro, lo que dificultaría el establecimiento de umbrales y provocaría la variación frecuente de alertas.

## Media móvil ponderada exponencialmente

### Ewma 3

| Función   | Descripción                                                         | Ejemplo                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_3()` | Calcula la media móvil ponderada exponencialmente en un tramo de 3. | `ewma_3(<METRIC_NAME>{*})` |

Nota: El valor del tramo es el número de puntos de datos. Así que `ewma_3()` utiliza los 3 últimos puntos de datos para calcular la media.

Por ejemplo:

Si una métrica `10 + x%10 {*}` se incrementa en 1 empezando por 10 hasta que vuelve a caer a 10 después de 10 puntos de datos, entonces `ewma3(10 + x%10 {*})` tiene la siguiente forma:

{{< img src="dashboards/functions/smoothing/ewma3.png" alt="EWMA3" style="width:80%;">}}

### Ewma 5

| Función   | Descripción                                                         | Ejemplo                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_5()` | Calcula la media móvil ponderada exponencialmente en un tramo de 5. | `ewma_5(<METRIC_NAME>{*})` |

Nota: El valor tramo (span) es el número de puntos de datos. Así que `ewma_5()` utiliza los últimos 5 puntos de datos para calcular la media.

Por ejemplo:

Si una métrica `10 + x%10 {*}` se incrementa en 1 empezando por 10 hasta que vuelve a caer a 10 después de 10 puntos de datos, entonces `ewma5(10 + x%10 {*})` tiene la siguiente forma:

{{< img src="dashboards/funciones/smoothing/ewma5.png" alt="EWMA5" style="width:80%;">}}

### Ewma 7

| Función   | Descripción                                                         | Ejemplo                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_7()` | Calcula la media móvil ponderada exponencialmente en un tramo de 7. | `ewma_7(<METRIC_NAME>{*})` |

Nota: El valor del tramo es el número de puntos de datos. Así que `ewma_7()` utiliza los 7 últimos puntos de datos para calcular la media.

### Ewma 10

| Función    | Descripción                                                          | Ejemplo                     |
| :----       | :-------                                                             | :---------                  |
| `ewma_10()` | Calcula la media móvil ponderada exponencialmente en un tramo de 10. | `ewma_10(<METRIC_NAME>{*})` |

Nota: El valor del tramo es el número de puntos de datos. Así que `ewma_10()` utiliza los 10 últimos puntos de datos para calcular la media.

Por ejemplo:

Si una métrica `10 + x%10 {*}` se incrementa en 1 empezando por 10 hasta que vuelve a caer a 10 después de 10 puntos de datos, entonces `ewma10(10 + x%10 {*})` tiene la siguiente forma:

{{< img src="dashboards/funciones/smoothing/ewma10.png" alt="EWMA10" style="width:80%;">}}

### Ewma 20

| Función    | Descripción                                                          | Ejemplo                     |
| :----       | :-------                                                             | :---------                  |
| `ewma_20()` | Calcula la media móvil ponderada exponencialmente en un tramo de 20. | `ewma_20(<METRIC_NAME>{*})` |

Nota: El valor del tramo es el número de puntos de datos. Así que `ewma_20()` utiliza los últimos 20 puntos de datos para calcular la media.

Por ejemplo:

Si una métrica `10 + x%10 {*}` se incrementa en 1 empezando por 10 hasta que vuelve a caer a 10 después de 10 puntos de datos, entonces `ewma20(10 + x%10 {*})` tiene la siguiente forma:

{{< img src="dashboards/funciones/smoothing/ewma20.png" alt="EWMA20" style="width:80%;">}}

## Mediana

### Mediana 3

| Función     | Descripción                      | Ejemplo                      |
| :----        | :-------                         | :---------                   |
| `median_3()` | Mediana móvil con un tramo de 3. | `median_3(<METRIC_NAME>{*})` |

Nota: El valor del tramo es el número de puntos de datos. Así que `median_3()` utiliza los 3 últimos puntos de datos para calcular la mediana.

### Mediana 5

| Función     | Descripción                      | Ejemplo                      |
| :----        | :-------                         | :---------                   |
| `median_5()` | Mediana móvil con un tramo de 5. | `median_5(<METRIC_NAME>{*})` |

Nota: El valor del tramo es el número de puntos de datos. Así que `median_5()` utiliza los últimos 5 puntos de datos para calcular la mediana.

### Mediana 7

| Función     | Descripción                      | Ejemplo                      |
| :----        | :-------                         | :---------                   |
| `median_7()` | Mediana móvil con un tramo de 7. | `median_7(<METRIC_NAME>{*})` |

Nota: El valor del tramo es el número de puntos de datos. Así que `median_7()` utiliza los últimos 7 puntos de datos para calcular la mediana.

### Mediana 9

| Función     | Descripción                      | Ejemplo                      |
| :----        | :-------                         | :---------                   |
| `median_9()` | Mediana móvil con un tramo de 9. | `median_9(<METRIC_NAME>{*})` |

Nota: El valor del tramo es el número de puntos de datos. Así que `median_9()` utiliza los últimos 9 puntos de datos para calcular la mediana.

## Ponderado 
<div class="alert alert-info">Weighted() (Ponderado) solo está disponible cuando se consulta `SUM BY` en métricas de tipo gauge.</div> 

| Función       | Descripción                                                           | Ejemplo                        |
| :----          | :-------                                                              | :---------                     |
| `weighted()`   | Elimina automáticamente el ruido conservando la ponderación adecuada de las etiquetas transitorias. | `sum:(<gauge_METRIC_NAME>{*}).weighted()` |

La función `weighted()` tiene en cuenta la corta vida de los valores transitorios y cambiantes de las etiquetas al sumar métricas de gauge en el espacio para evitar picos artificiales. 

Esta función se añade automáticamente a las consultas en métricas de gauge si se cumplen las dos condiciones siguientes: 
1. La métrica tiene un intervalo de presentación regular y coherente que también se especifica en el resumen de métricas
2. La métrica se agrega con `SUM by` (por ejemplo, `sum: mygaugemetric{*}`)

Aquí puedes ver un gráfico de ejemplo de la consulta original con picos inexactos (en morado) y la consulta con el cálculo ponderado correctamente (en verde): 

{{< img src="dashboards/functions/smoothing/weighted.png" alt="Gráfico de ejemplo que compara consultas con y sin el modificador weighted()" style="width:80%;">}}

Para obtener más información sobre el modificador weighted(), consulta [¿Cómo funciona weighted()?][3].

## Otras funciones

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmic: Implement Anomaly or Outlier detection on your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmetic: Perform Arithmetic operation on your metric.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Count: Count non zero or non null value of your metric. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion: Exclude certain values of your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation: Fill or set default values for your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rank: Select only a subset of metrics. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Rate: Calculate custom derivative over your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regression: Apply some machine learning function to your metric.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: Control the number of raw points used in your metric. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Timeshift: Shift your metric data point along the timeline. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://github.com/stanford-futuredata/ASAP
[2]: https://www.datadoghq.com/blog/auto-smoother-asap
[3]: /es/dashboards/guide/how-weighted-works