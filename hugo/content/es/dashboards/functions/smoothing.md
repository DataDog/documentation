---
aliases:
- /es/graphing/functions/smoothing/
description: Reduzca el ruido en los datos de métricas mediante autosmooth, promedios
  móviles ponderados exponencialmente, filtros de mediana y funciones ponderadas.
title: Suavizado
---
## Autosmooth {#autosmooth}

| Función       | Descripción                                                           | Ejemplo                        |
| :----          | :-------                                                              | :---------                     |
| `autosmooth()` | Elimina automáticamente el ruido mientras preserva la tendencia de la métrica. | `autosmooth(<METRIC_NAME>{*})` |

La función `autosmooth()` aplica un promedio móvil con un tramo seleccionado automáticamente. Suaviza una serie temporal mientras preserva su tendencia. En este ejemplo, la función elige el tramo óptimo para suavizar la serie temporal:

{{< img src="dashboards/functions/smoothing/autosmooth_illustration.png" alt="ilustración de autosmooth" style="width:80%;">}}

Cuando se utiliza en una consulta `group by`, como `avg by`, se aplica el mismo tramo a todas las series temporales. Si se utiliza en varias métricas en el mismo gráfico, se pueden seleccionar diferentes tramos para suavizar de forma óptima cada una de las series temporales de las métricas.

El algoritmo está inspirado en el [algoritmo ASAP][1]; puede leer más al respecto en esta [publicación de blog][2].

La función `autosmooth()` no se puede utilizar en monitores. Dado que el tramo se elige de forma dinámica, el resultado de aplicar la función podría cambiar de un minuto a otro, lo que dificultaría el establecimiento de umbrales y podría provocar alertas intermitentes.

## Promedio móvil ponderado exponencialmente {#exponentially-weighted-moving-average}

### Ewma 1 {#ewma-1}

| Función   | Descripción                                                         | Ejemplo                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_1()` | Calcula el promedio móvil ponderado exponencialmente en un tramo de 1. | `ewma_1(<METRIC_NAME>{*})` |

### Ewma 3 {#ewma-3}

| Función   | Descripción                                                         | Ejemplo                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_3()` | Calcula el promedio móvil ponderado exponencialmente en un tramo de 3. | `ewma_3(<METRIC_NAME>{*})` |

Nota: El valor del tramo es el doble de la edad promedio ponderada de la serie. Por lo tanto, `ewma_3()` es comparable a un promedio móvil de 3 días.

Ejemplo:

Si una métrica `10 + x%10 {*}` se incrementa en 1 comenzando desde 10 hasta que vuelve a caer a 10 después de 10 puntos de datos, entonces `ewma3(10 + x%10 {*})` tiene la siguiente forma:

{{< img src="dashboards/functions/smoothing/ewma3.png" alt="EWMA3" style="width:80%;">}}

### Ewma 5 {#ewma-5}

| Función   | Descripción                                                         | Ejemplo                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_5()` | Calcula el promedio móvil ponderado exponencialmente en un tramo de 5. | `ewma_5(<METRIC_NAME>{*})` |

Nota: El valor del tramo es el doble de la edad promedio ponderada de la serie. Por lo tanto, `ewma_5()` es comparable a un promedio móvil de 5 días.

Ejemplo:

Si una métrica `10 + x%10 {*}` se incrementa en 1 comenzando desde 10 hasta que vuelve a caer a 10 después de 10 puntos de datos, entonces `ewma5(10 + x%10 {*})` tiene la siguiente forma:

{{< img src="dashboards/functions/smoothing/ewma5.png" alt="EWMA5" style="width:80%;">}}

### Ewma 7 {#ewma-7}

| Función   | Descripción                                                         | Ejemplo                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_7()` | Calcula el promedio móvil ponderado exponencialmente en un tramo de 7. | `ewma_7(<METRIC_NAME>{*})` |

Nota: El valor del tramo es el doble de la edad promedio ponderada de la serie. Por lo tanto, `ewma_7()` es comparable a un promedio móvil de 7 días.

### Ewma 10 {#ewma-10}

| Función    | Descripción                                                          | Ejemplo                     |
| :----       | :-------                                                             | :---------                  |
| `ewma_10()` | Calcula el promedio móvil ponderado exponencialmente en un tramo de 10. | `ewma_10(<METRIC_NAME>{*})` |

Nota: El valor del tramo es el doble de la edad promedio ponderada de la serie. Por lo tanto, `ewma_10()` es comparable a un promedio móvil de 10 días.

Ejemplo:

Si una métrica `10 + x%10 {*}` se incrementa en 1 comenzando desde 10 hasta que vuelve a caer a 10 después de 10 puntos de datos, entonces `ewma10(10 + x%10 {*})` tiene la siguiente forma:

{{< img src="dashboards/functions/smoothing/ewma10.png" alt="EWMA10" style="width:80%;">}}

### Ewma 20 {#ewma-20}

| Función    | Descripción | Ejemplo |
| :----       | :-------    | :------ |
| `ewma()`    | Calcula el promedio móvil ponderado exponencialmente en el tramo predeterminado de 20. | `ewma(<METRIC_NAME>{*})` |
| `ewma_20()` | Calcula el promedio móvil ponderado exponencialmente en un tramo de 20. | `ewma_20(<METRIC_NAME>{*})` |

`ewma()` y `ewma_20()` funcionan de manera idéntica.

Nota: El valor del tramo es el doble de la edad promedio ponderada de la serie. Por lo tanto, `ewma()` y `ewma_20()` son comparables a un promedio móvil de 20 días.

Ejemplo:

Si una métrica `10 + x%10 {*}` se incrementa en 1 comenzando desde 10 hasta que vuelve a caer a 10 después de 10 puntos de datos, entonces `ewma20(10 + x%10 {*})` tiene la siguiente forma:

{{< img src="dashboards/functions/smoothing/ewma20.png" alt="EWMA20" style="width:80%;">}}

## Mediana {#median}

### Mediana 3 {#median-3}

| Función     | Descripción | Ejemplo |
| :----        | :-------    | :------ |
| `median()`   | Mediana móvil con el tramo predeterminado de 3. | `median(<METRIC_NAME>{*})` |
| `median_3()` | Mediana móvil con un tramo de 3. | `median_3(<METRIC_NAME>{*})` |

`median()` y `median_3()` funcionan de manera idéntica.

Nota: El valor del tramo es el número de puntos de datos. Por lo tanto, `median()` y `median_3()` utilizan los últimos 3 puntos de datos para calcular la mediana.

### Mediana 5 {#median-5}

| Función     | Descripción                      | Ejemplo                      |
| :----        | :-------                         | :---------                   |
| `median_5()` | Mediana móvil con un tramo de 5. | `median_5(<METRIC_NAME>{*})` |

Nota: El valor del tramo es el número de puntos de datos. Por lo tanto, `median_5()` utiliza los últimos 5 puntos de datos para calcular la mediana.

### Mediana 7 {#median-7}

| Función     | Descripción                      | Ejemplo                      |
| :----        | :-------                         | :---------                   |
| `median_7()` | Mediana móvil con un tramo de 7. | `median_7(<METRIC_NAME>{*})` |

Nota: El valor del tramo es el número de puntos de datos. Por lo tanto, `median_7()` utiliza los últimos 7 puntos de datos para calcular la mediana.

### Mediana 9 {#median-9}

| Función     | Descripción                      | Ejemplo                      |
| :----        | :-------                         | :---------                   |
| `median_9()` | Mediana móvil con un tramo de 9. | `median_9(<METRIC_NAME>{*})` |

Nota: El valor del tramo es el número de puntos de datos. Por lo tanto, `median_9()` utiliza los últimos 9 puntos de datos para calcular la mediana.

## Ponderada {#weighted}
<div class="alert alert-info">Weighted() solo está disponible al realizar consultas <code>SUM BY</code> en métricas de tipo gauge.</div> 

| Función       | Descripción                                                           | Ejemplo                        |
| :----          | :-------                                                              | :---------                     |
| `weighted()`   | Elimina automáticamente el ruido mientras preserva el peso adecuado de las etiquetas transitorias. | `sum:(<GAUGE_METRIC_NAME>{*}).weighted()` |

La función `weighted()` toma en cuenta la corta vida útil de los valores de etiqueta transitorios y cambiantes al sumar métricas de tipo gauge en el espacio para evitar picos artificiales. 

Esta función se añade automáticamente a las consultas sobre métricas de tipo gauge si se cumplen ambas condiciones siguientes: 
1. La métrica tiene un intervalo de envío regular y consistente que también se especifica en Metrics Summary
2. La métrica se agrega con `SUM by` (por ejemplo, `sum: mygaugemetric{*}`)

Aquí hay un gráfico de ejemplo de la consulta original con picos inexactos (en morado) y la consulta con el cálculo ponderado correctamente (en verde): 

{{< img src="dashboards/functions/smoothing/weighted.png" alt="Gráfico de ejemplo que compara consultas con y sin el modificador ponderado" style="width:80%;">}}

Para obtener más información sobre el modificador weighted(), consulte [¿Cómo funciona weighted()?][3].

## Otras funciones {#other-functions}

{{< whatsnext desc="Consulte las otras funciones disponibles:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmic: Implemente la detección de anomalías o valores anómalos en su métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmetic: Realice operaciones aritméticas en su métrica.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Count: Cuente los valores distintos de cero o distintos de nulo de su métrica. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion: Excluya ciertos valores de su métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation: Rellene o establezca valores predeterminados para su métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rank: Seleccione solo un subconjunto de métricas. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Rate: Calcule una derivada personalizada sobre su métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regression: Aplique alguna función de aprendizaje automático a su métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: Controle la cantidad de puntos sin procesar utilizados en su métrica. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Timeshift: Desplace su punto de datos de métrica a lo largo de la línea de tiempo. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://github.com/stanford-futuredata/ASAP
[2]: https://www.datadoghq.com/blog/auto-smoother-asap
[3]: /es/dashboards/guide/how-weighted-works