---
aliases:
- /es/graphing/functions/beta/
title: Funciones beta
---

Las funciones beta se encuentran disponibles al editar directamente el JSON de la consulta.

## Media móvil

| Función          | Descripción                                    | Ejemplo                           |
|-------------------|------------------------------------------------|-----------------------------------|
| `rollingavg_5()`  | Calcula la media móvil en un tramo (span) de 5.  | `rollingavg_5(system.load.1{*})`  |
| `rollingavg_13()` | Calcula la media móvil en un tramo de 13. | `rollingavg_13(system.load.1{*})` |
| `rollingavg_21()` | Calcula la media móvil en un tramo de 21. | `rollingavg_21(system.load.1{*})` |
| `rollingavg_29()` | Calcula la media móvil en un tramo de 29. | `rollingavg_29(system.load.1{*})` |

## Otras funciones

{{< whatsnext desc="Consulta las demás funciones disponibles:" >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Aritmética: realiza operaciones aritméticas en la métrica.  {{< /nextlink >}}
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