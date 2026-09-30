---
aliases:
- /es/graphing/functions/telemetry_source/
description: Controla si una consulta de métrica utiliza solo la métrica consultada
  o combina métricas equivalentes de Datadog y OpenTelemetry.
further_reading:
- link: /metrics/open_telemetry/query_metrics
  tag: Documentación
  text: Consulta entre métricas de Datadog y OpenTelemetry
title: Fuente de Telemetría
---
El modificador de consulta de la fuente de telemetría controla si una consulta de métrica utiliza solo la métrica consultada o combina métricas equivalentes de Datadog y OpenTelemetry. Para más información sobre cómo consultar entre ambas fuentes, consulta [Consulta entre métricas de Datadog y OpenTelemetry][1].

En el editor de consultas, selecciona **Modificar** y luego elige una opción en la sección **Fuentes de telemetría**.

{{< img src="dashboards/functions/telemetry_source_combined.png" alt="Modificador de consulta de fuentes de telemetría mostrando Telemetría combinada seleccionada." style="width:75%;" >}}

| Opción de UI | Valor JSON | Comportamiento |
|---|---|---|
| **Telemetría nativa** (predeterminado) | `"semantic_mode": "native"` | Devuelve solo la métrica consultada. No incluye métricas equivalentes de otra fuente de telemetría. |
| **Telemetría combinada** | `"semantic_mode": "combined"` | Combina métricas equivalentes de Datadog y OpenTelemetry en un solo resultado de consulta. |

Para establecer la fuente de telemetría en el editor JSON, agregue la clave `semantic_mode` a su objeto de consulta:

{{< highlight json "hl_lines=6" >}}
"queries": [
    {
        "name": "query1",
        "data_source": "metrics",
        "query": "sum:go.goroutine.count{*}",
        "semantic_mode": "combined"
    }
]
{{< /highlight >}}

## Otras funciones {#other-functions}

{{< whatsnext desc="Consulte las otras funciones disponibles:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorítmica: Implemente detección de anomalías o valores anómalos.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Aritmética: Realice operaciones aritméticas.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Contar: Cuente valores no cero o no nulos.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusión: Excluya ciertos valores de su métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolación: Rellene o establezca valores predeterminados.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Clasificación: Seleccione solo un subconjunto de métricas. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Tasa: Calcule una derivada personalizada sobre su métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regresión: Aplique una función de aprendizaje automático.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Consolidación: Controle el número de puntos de datos en bruto utilizados. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Suavizado: Suavice las variaciones de su métrica.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Desplazamiento temporal: Desplace su punto de datos de métrica a lo largo de la línea de tiempo. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/beta" >}}Beta: Calcule el promedio móvil de una métrica.{{< /nextlink >}}
{{< /whatsnext >}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/open_telemetry/query_metrics