---
aliases:
- /es/graphing/functions/timeshift/
description: Compara los valores actuales de las métricas con los datos históricos
  mediante las funciones de cambio temporal, desplazamiento de calendario y comparación
  basada en el tiempo.
further_reading:
- link: /dashboards/faq/how-can-i-graph-the-percentage-change-between-an-earlier-value-and-a-current-value/
  tag: FAQ
  text: Haz un gráfico del cambio porcentual entre un valor anterior y un valor actual.
title: Monitorización dinámica
---

Aquí puedes ver un conjunto de funciones que realizan un desplazamiento temporal de tus datos. Estas funciones muestran los valores del periodo correspondiente en el gráfico. Por sí solos, pueden no ser de gran valor, pero junto con los valores actuales pueden proporcionar una visión útil sobre el rendimiento de tu aplicación.

## Timeshift

| Función      | Descripción                                                                                    | Ejemplo                                          |
|:--------------|:-----------------------------------------------------------------------------------------------|:-------------------------------------------------|
| `timeshift()` | Haz un gráfico de los valores de un `<TIME_IN_SECOND>` arbitrario antes de la marca de tiempo actual para la métrica. | `timeshift(<METRIC_NAME>{*}, -<TIME_IN_SECOND>)` |

Por ejemplo, si deseas utilizar el patrón para comparar la carga actual del sistema con la carga de hace 2 semanas (60\*60\*24\*14 = 1209600), tu consulta sería:

```text
timeshift(avg:system.load.1{*}, -1209600)
```

## Cambio de calendario


| Función           | Descripción                                                                                   | Ejemplo                            |
|:-------------------|:----------------------------------------------------------------------------------------------|:-----------------------------------|
| `calendar_shift()` | Haz un gráfico de los valores del día, semana o mes anterior a partir de la hora actual para la métrica. | `calendar_shift(<METRIC_NAME>{*}, "<TIME_SHIFT_STRING>", "<TIME_ZONE_CODE>")` |

Para acceder a la función `calendar_shift()`, haz clic en el botón **Add function** (Añadir función), selecciona **Timeshift > Month before** (Desplazamiento temporal > Mes anterior). El desplazamiento de calendario te permite comparar la misma métrica a través de marcos temporales equivalentes. A continuación, se muestra un ejemplo de la métrica de coste de la nube `aws.cost.net.amortized` con el valor de calendar_shift() de hace dos semanas comparado con el valor actual.

{{< img src="dashboards/functions/timeshift/calendar_shift_two_weeks.png" alt="Ejemplo de la función calendar_shift() utilizada para comparar el valor de la métrica `aws.cost.net.amortized ` de hace dos semanas con el valor actual" style="width:80%;" >}}

Los valores válidos de `TIME_SHIFT_STRING` son números enteros negativos seguidos de "d" para días, "w" para semanas o "mo" para meses.
Algunos ejemplos son `-1d`, `-7d`, `-1mo`, `-30d` y `-4w`.

Los valores válidos de `TIME_ZONE_CODE` son los códigos de zona horaria de IANA para una ciudad específica, o `UTC`.
Por ejemplo, `UTC`, `America/New_York`, `Europe/Paris` o `Asia/Tokyo`.

## Hora anterior

| Función        | Descripción                                                            | Ejemplo                         |
|:----------------|:-----------------------------------------------------------------------|:--------------------------------|
| `hour_before()` | Haz un gráfico de los valores de una hora antes de la hora actual para la métrica. | `hour_before(<METRIC_NAME>{*})` |

Este es un ejemplo de `system.load.1` con el valor `hour_before()` mostrado como una línea punteada. En este ejemplo en particular, puedes ver que la máquina se puso en marcha a las 6:30 a.m. y los valores de `hour_before()` aparecen a las 7:30 a.m. Por supuesto, este ejemplo fue creado específicamente para que puedas ver que los valores de `hour_before()` coinciden con los valores reales.

{{< img src="dashboards/functions/timeshift/simple_hour_before_example.png" alt="Ejemplo simple de hora anterior" style="width:80%;">}}

## Día anterior

<div class="alert alert-warning">La función de día anterior está obsoleta. En su lugar, utiliza el desplazamiento de calendario con un valor de "-1d".</div>

| Función       | Descripción                                                          | Ejemplo                        |
|:---------------|:---------------------------------------------------------------------|:-------------------------------|
| `day_before()` | Haz un gráfico de los valores de un día antes de la hora actual para la métrica. | `day_before(<METRIC_NAME>{*})` |

Este es un ejemplo de `nginx.net.connections` con el valor de `day_before()` mostrado como una línea más clara y delgada. En este ejemplo, puedes ver una semana de datos, lo que hace que los datos de `day_before()` sean más fáciles de identificar.

{{< img src="dashboards/funciones/timeshift/simple_day_before_example.png" alt="Ejemplo simple de día anterior" style="width:80%;">}}

## Semana anterior

<div class="alert alert-warning">La función de semana anterior está obsoleta. En su lugar, utiliza el desplazamiento de calendario con un valor de "-7d".</div>

| Función        | Descripción                                                                    | Ejemplo                         |
|:----------------|:-------------------------------------------------------------------------------|:--------------------------------|
| `week_before()` | Haz un gráfico de los valores de una semana (7 días) antes de la hora actual para la métrica. | `week_before(<METRIC_NAME>{*})` |

Este es un ejemplo de `cassandra.db.read_count` con el valor de `week_before()` mostrado como línea de puntos. En este ejemplo, puedes ver datos de unas tres semanas, lo que facilita la identificación de los datos de `week_before()`.

{{< img src="dashboards/functions/timeshift/simple_week_before_example.png" alt="Ejemplo simple de semana anterior" style="width:80%;">}}

## Mes anterior

<div class="alert alert-warning">La función de mes anterior está obsoleta. En su lugar, utiliza el desplazamiento de calendario con un valor de "-1mo", "-30d" o "-4w", en función de tu caso de uso.</div>

| Función         | Descripción                                                                                | Ejemplo                          |
|:-----------------|:-------------------------------------------------------------------------------------------|:---------------------------------|
| `month_before()` | Haz un gráfico de los valores de un mes (28 días/4 semanas) antes de la hora actual para la métrica. | `month_before(<METRIC_NAME>{*})` |

Este es un ejemplo de `aws.ec2.cpuutilization` con el valor `month_before()` mostrado como una línea fina e ininterrumpida.

{{< img src="dashboards/functions/timeshift/simple_month_before_example.png" alt="Ejemplo simple de mes anterior" style="width:80%;">}}


## Otros funciones

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
    {{< nextlink href="/dashboards/functions/smoothing" >}}Smoothing: Smooth your metric variations.{{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}