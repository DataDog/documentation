---
aliases:
- /opentelemetry/runtime_metrics/
title: Métricas de tiempo de ejecución de OpenTelemetry
type: multi-code-lang
---

## Información general

Las métricas de tiempo de ejecución son métricas de aplicación sobre el uso de memoria, la recopilación de elementos no usados o paralelización. Las bibliotecas de rastreo de Datadog proporcionan [la recopilación de métricas de tiempo de ejecución][5] para cada lenguaje compatible pero, además, OpenTelemetry (OTel) recopila métricas de tiempo de ejecución, que pueden ser enviadas a Datadog a través de los SDKs de OpenTelemetry.

Datadog recopila métricas de tiempo de ejecución de OpenTelemetry en los siguientes lenguajes:
- Java
- .NET
- Go

## Convenciones de nomenclatura de la métrica

La métricas de tiempo de ejecución siguen diferentes convenciones de nomenclatura en función de su fuente: OpenTelemetry Collector y Exportador de Datadog, ingesta OTLP del Datadog Agent, o bibliotecas de rastreo de Datadog. Al utilizar las métricas de tiempo de ejecución de OpenTelemetry con Datadog, recibirás tanto las métricas de tiempo de ejecución original de OpenTelemetry como las métricas de tiempo de ejecución de Datadog asignadas para métricas equivalente. Las métricas de tiempo de ejecución tienen los siguientes prefijos que indican su fuente:

| OTel Collector y Exportador de Datadog | Ingesta OTLP de Datadog Agent |  Biblioteca de rastreo de Datadog |
| --- | --- | --- |
| `otel.process.runtime.*` | `process.runtime.*` | `runtime.<LANG>.*` |

**Nota**: Las métricas de tiempo de ejecución de OpenTelemetry se asignan a Datadog por el nombre de métrica. No cambies el nombre de asignación de las métricas de host para las métricas de tiempo de ejecución de OpenTelemetry  o se romperá.

Para más información sobre la asignación de métricas de host y contenedor, consulta [Asignación de métricas de OpenTelemetry][1].

## Configuración

Selecciona tu lenguaje para ver las instrucciones de instalación y configuración del SDK de OpenTelemetry para enviar métricas de tiempo de ejecución:

{{< partial name="opentelemetry/otel-runtime-metrics.html" >}}
<br/>

## Ver dashboards de métricas de tiempo de ejecución

Una vez finalizada la configuración, ve tus métricas de tiempo de ejecución en la página de detalles del servicio (consulta el ejemplo de Java más abajo), la pestaña de métricas de la gráfica de llamas y en [dashboards de tiempo de ejecución predeterminados][7].

{{< img src="opentelemetry/otel_runtime_metrics_service_page.png" alt="Página de servicios que muestra las métricas de tiempo de ejecución de OpenTelemetry en la pestaña de Métricas de JVM" style="width:100%;" >}}

[1]: /es/opentelemetry/guide/metrics_mapping/
[5]: /es/tracing/metrics/runtime_metrics/
[7]: https://app.datadoghq.com/dash/integration/256/jvm-metrics