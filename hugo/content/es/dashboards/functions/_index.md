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
description: Aplica funciones matemáticas y estadísticas para modificar los resultados
  de la consulta métrica en los tableros y visualizaciones de Datadog.
further_reading:
- link: /metrics/#querying-metrics
  tag: Documentación
  text: Consultando métricas
title: Funciones
---
## Descripción general {#overview}

Las funciones pueden modificar cómo se devuelven los resultados de una consulta métrica para las visualizaciones. La mayoría de las funciones se aplican después de que se devuelven los resultados de la consulta métrica, pero las funciones también pueden cambiar los parámetros antes de que se realice la consulta. 

Por ejemplo, la función Rollup cambia la agregación temporal de una consulta antes de que se devuelvan los resultados. Alternativamente, las funciones aritméticas aplican cambios a los resultados devueltos de la consulta métrica. Consulta la página de [Metrics][3] para aprender más sobre cómo consultar métricas. Para aprender más sobre las diferentes funciones, consulta los [tipos de funciones](#function-types).

## Agregar una función {#add-a-function}

Las funciones se pueden aplicar a sus consultas haciendo clic en el ícono Add Function `Σ` en el editor de gráficos. La mayoría de las funciones se aplican después de [desglose temporal][1] y [desglose espacial][2].

{{< img src="dashboards/functions/sigmaaddingfunctions.png" alt="Símbolo de Sigma mayúscula para Add Function" style="width:100%;" >}}

## Tipos de funciones {#function-types}

{{< whatsnext desc="Elija un tipo de función:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorítmica: Implementar detección de anomalías o valores anómalos.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Aritmética: Realizar operaciones aritméticas.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Contar: Contar valores no cero o no nulos.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusión: Excluir ciertos valores de su métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolación: Llenar o establecer valores predeterminados.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Clasificación: Seleccionar solo un subconjunto de métricas. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Tasa: Calcular una derivada personalizada sobre su métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regresión: Aplicar una función de aprendizaje automático.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: Controlar el número de puntos de datos en bruto utilizados. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Suavizado: Suavizar las variaciones de su métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/telemetry_source" >}}Fuente de Telemetría: Elegir la fuente de telemetría de sus datos métricos.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Desplazamiento temporal: Desplazar su punto de datos métrico a lo largo de la línea de tiempo. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/beta" >}}Beta: Calcular el promedio móvil de una métrica.{{< /nextlink >}}
{{< /whatsnext >}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/#time-aggregation
[2]: /es/metrics/#space-aggregation
[3]: /es/metrics/#anatomy-of-a-metric-query