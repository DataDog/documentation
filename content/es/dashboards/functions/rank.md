---
aliases:
- /es/graphing/functions/rank/
title: Clasificación
---

## Principal

| Función | Descripción               | Ejemplo                                              |
| :----    | :-------                  | :---------                                           |
| `top()`  | Grafica los elementos N principales. | `top(<METRIC_NAME>{*}, <LIMIT_TO>, '<BY>', '<DIR>')` |

La función `top()` tiene tres parámetros:

* `LIMIT_TO`: la cantidad de series que se mostrarán; elige entre:
    - `5`
    - `10`
    - `25`
    - `50`
    - `100`
* `BY`: método de agregación; elige entre:
    - `max`: máximo de todos los valores de métrica.
    - `mean`: media de todos los valores de métrica.
    - `min`: mínimo de todos los valores de métrica.
    - `sum`: suma de todos los valores de métrica.
    - `last`: último valor de métrica.
    - `l2norm`: utiliza la [norma][1] de la serie temporal, que siempre es positiva, para clasificar la serie.
    - `area`: área con signo bajo la curva que se representa gráficamente y puede ser negativa.

* `DIR`: la dirección de la clasificación; elige entre:
    - `asc`: clasifica los resultados de forma ascendente.
    - `desc`: clasifica los resultados de forma descendente.

El método `top()` también tiene funciones de conveniencia que se presentan de la siguiente manera, todas las cuales toman una única lista de series como entrada:

`[top, bottom][5, 10, 15, 20]_[mean, min, max, last, area, l2norm][2]`

Por ejemplo, `bottom10_min()` recupera las 10 series de menor valor mediante la métrica `min`.

## Otras funciones

{{< whatsnext desc="Consulta las demás funciones disponibles:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorítmica: implementa la detección de anomalías o outliers en la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Aritmética: realiza operaciones aritméticas en la métrica.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Conteo: cuenta el valor distinto de cero o no nulo de la métrica. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusión: excluye ciertos valores de la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolación: rellena o establece valores predeterminados para la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Tasa: calcula una derivada personalizada sobre la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regresión: aplica una función de machine learning a la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: controla la cantidad de puntos de datos sin procesar utilizados en la métrica. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Suavizado: suaviza las variaciones métricas.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Cambio de tiempo: cambia el punto de datos de la métrica a lo largo de la línea de tiempo. {{< /nextlink >}}
{{< /whatsnext >}}


[1]: http://en.wikipedia.org/wiki/Norm_(mathematics)