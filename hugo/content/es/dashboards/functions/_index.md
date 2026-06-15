---
aliases:
- /es/examples/
- /es/examples/aws-metrics/
- /es/examples/month_before/
- /es/examples/graphing-functions/
- /es/examples/day_before/
- /es/examples/json-editing/
- /es/examples/nginx-metrics/
- /es/examples/dashboards/
- /es/examples/hour_before/
- /es/examples/os-metrics/
- /es/examples/week_before/
- /es/examples/cassandra-metrics/
- /es/graphing/miscellaneous/functions
- /es/graphing/miscellaneous/
- /es/getting_started/from_the_query_to_the_graph
- /es/graphing/miscellaneous/from_the_query_to_the_graph
- /es/graphing/functions/
further_reading:
- link: /metrics/#querying-metrics
  tag: Documentación
  text: Consulta de métricas
title: Funciones
---

## Información general

Las funciones pueden modificar la forma en que se devuelven los resultados de una consulta de métricas para las visualizaciones. La mayoría de las funciones se aplican después de que se devuelven los resultados de la consulta de métricas, pero estas también pueden modificar los parámetros antes de realizar la consulta. 

Por ejemplo, la función de rollup cambia la agregación temporal de una consulta antes de que se devuelvan los resultados. De manera alternativa, las funciones aritméticas aplican cambios a los resultados devueltos de la consulta de métricas. Consulta la página de [Métricas][3] para obtener más información sobre la consulta de métricas. Para obtener más información sobre las diferentes funciones, consulta la página de [tipos de funciones](#function-types).

## Añadir un función

Las funciones se pueden aplicar a tus consultas al hacer clic en el icono `Σ` de Add Function (Añadir función) en el editor de gráficas. La mayoría de las funciones se aplican después de la [agregación temporal][1] y [espacial][2].

{{< img src="dashboards/functions/sigmaaddingfunctions.png" alt="Símbolo sigma mayúscula de añadir función" style="width:100%;" >}}

## Tipos de funciones

{{< whatsnext desc="Elige un tipo de función:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorítmica: implementa la detección de anomalías o valores atípicos.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Aritmética: realiza operaciones aritméticas.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Conteo: cuenta valores distintos de cero o no nulos.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusión: excluye ciertos valores de la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolación: rellena o establece valores predeterminados.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Clasificación: solo selecciona un subconjunto de métricas. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Tasa: calcula una derivada personalizada sobre la métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regresión: aplica una función de machine learning.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: controla la cantidad de puntos de datos sin procesar utilizados. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Suavizado: suaviza las variaciones métricas.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Cambio de tiempo: cambia el punto de datos de la métrica a lo largo de la línea de tiempo. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/beta" >}}Beta: calcula el promedio móvil de una métrica.{{< /nextlink >}}
{{< /whatsnext >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/#time-aggregation
[2]: /es/metrics/#space-aggregation
[3]: /es/metrics/#anatomy-of-a-metric-query