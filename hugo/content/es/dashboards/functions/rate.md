---
aliases:
- /es/graphing/functions/rate/
description: Calcula tasas, derivadas y diferencias de tiempo para analizar cambios
  en métricas por segundo, minuto u hora.
further_reading:
- link: /monitors/guide/alert-on-no-change-in-value/
  tag: Documentación
  text: Alertar en caso de que no cambie el valor
title: Tasa
---

## Por segundo

| Función       | Descripción                                                | Ejemplo                        |
|:---------------|:-----------------------------------------------------------|:-------------------------------|
| `per_second()` | Grafica la tasa en la que cambia la métrica por segundo. | `per_second(<METRIC_NAME>{*})` |

## Por minuto

| Función       | Descripción                                                | Ejemplo                        |
|:---------------|:-----------------------------------------------------------|:-------------------------------|
| `per_minute()` | Grafica la tasa en la que cambia la métrica por minuto. | `per_minute(<METRIC_NAME>{*})` |

## Por hora

| Función     | Descripción                                              | Ejemplo                      |
|:-------------|:---------------------------------------------------------|:-----------------------------|
| `per_hour()` | Grafica la tasa en la que cambia la métrica por hora. | `per_hour(<METRIC_NAME>{*})` |

## Diferencia horaria

| Función | Descripción                                                    | Ejemplo                |
|:---------|:---------------------------------------------------------------|:-----------------------|
| `dt()`   | Grafica la diferencia de tiempo en segundos entre los puntos enviados. | `dt(<METRIC_NAME>{*})` |

La función dt() solo devuelve una serie temporal, independientemente de la cantidad de grupos implicados. Dentro de esa serie temporal, considera la diferencia de tiempo de todos los puntos enviados a través de los distintos grupos.

## Diferencia de valor

| Función | Descripción                    | Ejemplo                  |
|:---------|:-------------------------------|:-------------------------|
| `diff()` | Grafica el delta de la métrica. | `diff(<METRIC_NAME>{*})` |

Calcula la diferencia entre cada intervalo por intervalo. Por ejemplo, una métrica envía puntos de datos con un intervalo de 15 segundos, el modificador `diff()` los mostraría en una tasa de 15 segundos. **Nota:** El cálculo se realiza después de aplicar la agregación temporal y antes de que tenga lugar la agregación espacial.

## Diferencia monótona

| Función           | Descripción                                                                     | Ejemplo                            |
|:-------------------|:--------------------------------------------------------------------------------|:-----------------------------------|
| `monotonic_diff()` | Grafica el delta de la métrica como `diff()`, pero solo si este es positivo. | `monotonic_diff(<METRIC_NAME>{*})` |

## Derivada

| Función       | Descripción                                   | Ejemplo                        |
|:---------------|:----------------------------------------------|:-------------------------------|
| `derivative()` | Grafica la derivada (diff/dt) de la métrica. | `derivative(<METRIC_NAME>{*})` |

## Rendimiento

| Función       | Descripción                                                                                                                                        | Ejemplo                          |
|:---------------|:---------------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------|
| `throughput()` | Convierte una serie temporal en una tasa por segundo, dividiendo cada valor por el número de segundos en el bucket de tiempo para generar el valor por segundo. | `throughput(<METRIC_NAME>{*})` |

## Otros funciones

{{< whatsnext desc="Consulta otras funciones disponibles:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorítmica: implementa la detección de anomalías o outliers en tu métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Aritmética: realiza operaciones aritméticas en tu métrica.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Recuento: realiza el recuento de valores no cero o no nulos en tu métrica. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusión: excluye determinados valores de tu métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolación: rellena o define valores por defecto para tu métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Clasificación: selecciona sólo un subconjunto de métricas. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regresión: aplica alguna función de machine learning a tu métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: controla el número de puntos sin procesar utilizados en tu métrica. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Suavizado: suaviza las variaciones de tu métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Cambio temporal: cambia el punto de datos de tu métrica dentro de la línea de tiempo. {{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}