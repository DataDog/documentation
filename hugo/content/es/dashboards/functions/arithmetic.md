---
aliases:
- /es/graphing/functions/arithmetic/
title: Aritmética
---

## Absoluto

| Función | Descripción                             | Ejemplo                 |
| :----    | :-------                                | :---------              |
| `abs()`  | Grafica el valor absoluto de la métrica. | `abs(<METRIC_NAME>{*})` |

Transforma esta serie temporal sinusoidal `sin{*}`:

{{< img src="dashboards/functions/arithmetic/sinus.png" alt="Función seno" style="width:80%;">}}

en esta `abs(sin{*})`:

{{< img src="dashboards/functions/arithmetic/sinus_abs.png" alt="Función seno con valores absolutos" style="width:80%;">}}

## Logaritmo

### Base de log 2

| Función | Descripción                               | Ejemplo                  |
| :----    | :-------                                  | :---------               |
| `log2()` | Grafica el logaritmo de base 2 de la métrica. | `log2(<METRIC_NAME>{*})` |

Por ejemplo:

Si una métrica, `x{*}`, se incrementa en 1 por cada punto de datos, `log2(x{*})` tiene la siguiente forma:

{{< img src="dashboards/functions/arithmetic/log2.png" alt=" Función log2" style="width:80%;">}}

### Base de log 10

| Función  | Descripción                                | Ejemplo                   |
| :----     | :-------                                   | :---------                |
| `log10()` | Grafica el logaritmo de base 10 de la métrica. | `log10(<METRIC_NAME>{*})` |

Por ejemplo:

Si una métrica, `x{*}`, se incrementa en 1 por cada punto de datos, `log10(x{*})` tiene la siguiente forma:

{{< img src="dashboards/functions/arithmetic/log10.png" alt="Función log10" style="width:80%;">}}

## Suma acumulada

| Función   | Descripción                                                          | Ejemplo                    |
| :----      | :-------                                                             | :---------                 |
| `cumsum()` | Grafica la suma acumulada de la métrica durante el período de tiempo visible. | `cumsum(<METRIC_NAME>{*})` |

Por ejemplo:

Si una métrica, `const_1{*}`, es una constante con el valor de `1`, `cumsum(const_1{*})` tiene la siguiente forma:

{{< img src="dashboards/functions/arithmetic/cumsum.png" alt="Función de suma acumulada con valores absolutos" style="width:80%;">}}

## Suma acumulada en monitores

Se debe evitar la suma acumulada en las consultas de monitor, ya que la función de suma acumulada es una función visual. Cuando se utiliza en un dashboard o notebook, los puntos reflejan valores basados en el período de tiempo seleccionado. Esto no se traduce bien en un monitor, ya que este no sabe qué período de tiempo utilizar.

En su lugar, configura los [períodos de tiempo acumulados][1] en tu período de evaluación del monitor.

## Integral

| Función     | Descripción                       | Ejemplo                             |
| :----        | :-------                          | :---------                          |
| `integral()` | Grafica la integral de la métrica. | `integral(<METRIC_NAME>{*})` |

**Nota**: `integral()` de Datadog es la suma acumulada de `[time delta] x [value delta]` sobre todos los pares consecutivos de puntos en el período de tiempo visible de una métrica determinada.

{{< img src="dashboards/funciones/arithmetic/integral.png" alt="Función integral con valores absolutos" style="width:80%;">}}

## Otras funciones

{{< whatsnext desc="Consulta las demás funciones disponibles:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorítmica: implementa la detección de anomalías o outliers en la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Conteo: cuenta el valor distinto de cero o no nulo de la métrica. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusión: excluye ciertos valores de la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolación: rellena o establece valores predeterminados para la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Clasificación: solo selecciona un subconjunto de métricas. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Tasa: calcula una derivada personalizada sobre la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regresión: aplica una función de machine learning a la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: controla la cantidad de puntos de datos sin procesar utilizados en la métrica. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Suavizado: suaviza las variaciones métricas.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Cambio de tiempo: cambia el punto de datos de la métrica a lo largo de la línea de tiempo. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /es/monitors/configuration/?tab=thresholdalert#cumulative-time-windows