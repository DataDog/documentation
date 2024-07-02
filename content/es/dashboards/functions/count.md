---
aliases:
- /es/graphing/functions/count/
title: Conteo
---

## Conteo de valores distintos de cero

| Función          | Descripción                           | Ejemplo                           |
| :----             | :-------                              | :---------                        |
| `count_nonzero()` | Calcula todos los valores distintos de cero. | `count_nonzero(<METRIC_NAME>{*})` |

En el caso de una consulta agrupada por una o más [claves de etiqueta][1], calcula la cantidad de valores de etiqueta con valores de métrica distintos de cero en cada punto.

Ejemplo: `count_nonzero(system.cpu.user{*} by {host})` devuelve una serie temporal que representa la cantidad de hosts con carga del sistema distinta de cero en cada punto.

{{< img src="dashboards/functions/count/count_nonzero.png" alt="Conteo de valores distintos de cero" style="width:80%;">}}

Nota: `count_nonzero_finite()` se puede utilizar como alias de `count_nonzero()`.

## Conteo de valores no nulos

| Función           | Descripción                           | Ejemplo                            |
| :----              | :-------                              | :---------                         |
| `count_not_null()` | Calcula todos los valores no nulos. | `count_not_null(<METRIC_NAME>{*})` |

En el caso de una consulta agrupada por una o más [claves de etiqueta][1], calcula la cantidad de valores de etiqueta con valores de métrica no nulos en cada punto. Un valor de métrica nulo se produce cuando no hay un valor finito.

Ejemplo: `count_not_null(system.cpu.user{*} by {host})` devuelve una serie temporal que representa la cantidad de hosts con carga del sistema no nula en cada punto.

{{< img src="dashboards/funciones/count/count_not_null.png" alt="Conteo de valores no nulos" style="width:80%;">}}

## Otras funciones

{{< whatsnext desc="Consulta las demás funciones disponibles:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorítmica: implementa la detección de anomalías o outliers en la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Aritmética: realiza operaciones aritméticas en la métrica.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusión: excluye ciertos valores de la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolación: rellena o establece valores predeterminados para la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Clasificación: solo selecciona un subconjunto de métricas. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Tasa: calcula una derivada personalizada sobre la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regresión: aplica una función de machine learning a la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: controla la cantidad de puntos de datos sin procesar utilizados en la métrica. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Suavizado: suaviza las variaciones métricas.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Cambio de tiempo: cambia el punto de datos de la métrica a lo largo de la línea de tiempo. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /es/getting_started/tagging/