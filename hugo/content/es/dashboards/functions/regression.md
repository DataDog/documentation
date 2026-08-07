---
aliases:
- /es/graphing/functions/regression/
title: Regresión
---

## Tendencia robusta

| Función         | Descripción                                          | Ejemplo                              |
| :----            | :-------                                             | :---------                           |
| `robust_trend()` | Ajusta una línea de tendencia de regresión robusta mediante la pérdida de Huber. | `robust_trend(avg:<METRIC_NAME>{*})` |

El tipo más común de regresión lineal, los mínimos cuadrados ordinarios (MCO), puede verse muy influido por un pequeño número de puntos con valores extremos. La regresión robusta es un método alternativo para ajustar una línea de regresión; no está tan influenciada por ese pequeño número de valores extremos. Como ejemplo, consulta el siguiente gráfico.

{{< img src="dashboards/functions/regression/robust_trend.png" alt="Tendencia robusta" style="width:80%;">}}

La métrica original se muestra como una línea azul sólida. La línea discontinua morada es una línea de regresión de MCO, y la amarilla es una línea de regresión robusta. El pico de corta duración de la métrica hace que la línea de regresión de MCO tenga una tendencia al alza, pero la línea de regresión robusta ignora el pico y se ajusta mejor a la tendencia general de la métrica.

## Línea de tendencia

| Función       | Descripción                                                              | Ejemplo                            |
| :----          | :-------                                                                 | :---------                         |
| `trend_line()` | Ajusta una línea de regresión de mínimos cuadrados ordinarios a través de los valores de la métrica. | `trend_line(avg:<METRIC_NAME>{*})` |

Por ejemplo:

La función `sin(x) * x/2 + x`, luego `trend_line(sin(x) * x/2 + x)`, tiene la siguiente forma:

{{< img src="dashboards/functions/regression/trend_line_function.png" alt="Función de línea de tendencia" style="width:80%;">}}

## Constante por partes

| Función               | Descripción                                                                            | Ejemplo                                    |
| :----                  | :-------                                                                               | :---------                                 |
| `piecewise_constant()` | Aproxima la métrica con una función por partes compuesta de segmentos de valor constante. | `piecewise_constant(avg:<METRIC_NAME>{*})` |

Por ejemplo:

La función `x`, luego `piecewise_constant(x)`, tiene la siguiente forma:

{{< img src="dashboards/funciones/regression/piecewise_constant.png" alt="Constante por partes" style="width:80%;">}}

## Otras funciones

{{< whatsnext desc="Consulta las demás funciones disponibles:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorítmica: implementa la detección de anomalías o outliers en la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Aritmética: realiza operaciones aritméticas en la métrica.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Conteo: cuenta el valor distinto de cero o no nulo de la métrica. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusión: excluye ciertos valores de la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolación: rellena o establece valores predeterminados para la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Clasificación: solo selecciona un subconjunto de métricas. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Tasa: calcula una derivada personalizada sobre la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: controla la cantidad de puntos de datos sin procesar utilizados en la métrica. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Suavizado: suaviza las variaciones métricas.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Cambio de tiempo: cambia el punto de datos de la métrica a lo largo de la línea de tiempo. {{< /nextlink >}}
{{< /whatsnext >}}