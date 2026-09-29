---
aliases:
- /es/observability_pipelines/monitoring/
description: Aprenda a hacer un seguimiento del estado de sus pipelines, Workers y
  componentes con health graphs y out-of-the-box monitors.
disable_toc: false
further_reading:
- link: observability_pipelines/set_up_pipelines
  tag: Documentación
  text: Configure un pipeline
- link: /monitors/types/metric/
  tag: Documentación
  text: Configure un monitor de métricas
- link: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
  tag: Documentación
  text: Métricas de uso de Observability Pipelines
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: Blog
  text: Enrutar datos de OTel de aplicaciones de IA a ClickHouse y Datadog usando
    Observability Pipelines
title: Monitoreo de pipelines
---
## Descripción general {#overview}

Un pipeline consta de componentes que recopilan, procesan y enrutan sus datos de observabilidad. Puede hacer un seguimiento del estado de sus pipelines y componentes de las siguientes maneras:

- Ver gráficos de estado de sus [pipelines](#view-the-status-of-your-pipelines), [Workers](#view-the-status-of-your-workers) y [componentes](#view-the-status-of-your-pipeline-components) (fuentes, procesadores y destinos).
- Habilite [out-of-the-box monitors](#out-of-the-box-monitors) que le alerten si:
    - Un Worker de Observability Pipelines tiene un uso elevado de CPU o memoria, o está descartando datos.
    - Un componente está emitiendo errores.
    - Se ha alcanzado una cuota definida.
- Cree sus propios paneles, notebooks y monitores con las [métricas de Observability Pipelines][5] disponibles.

{{< img src="observability_pipelines/monitoring_and_troubleshooting/pipelines_list.png" alt="La página de lista de pipelines que muestra el estado, eventos/s y bytes/s para cada pipeline." style="width:100%;" >}}

## Ver el estado de sus pipelines {#view-the-status-of-your-pipelines}

1. Navegue a [Observability Pipelines][1] para ver cuántos eventos o bytes están recibiendo y enviando sus pipelines. Las métricas {{< ui >}}events/s{{< /ui >}} y {{< ui >}}bytes/s{{< /ui >}} que se muestran en esta página se basan en un promedio de 15 minutos.
1. Seleccione un pipeline.
1. Haga clic en la pestaña {{< ui >}}Health{{< /ui >}} para ver detalles sobre el pipeline y sus componentes. Puede ver gráficos de:
    - Cuánto se utiliza cada componente y el número total de eventos que el componente recibe y envía.
    - El número de solicitudes realizadas a destinos y el número de errores encontrados por esas solicitudes.
    - Cuántos eventos se descartan intencional e involuntariamente.
    - Cualquier cambio en el número de solicitudes y errores para cada componente durante la semana anterior.

Puede exportar un gráfico de estado a un dashboard, notebook o monitor. El gráfico exportado le muestra que la métrica está agrupada por las etiquetas específicas de pipeline y componente.

## Ver el estado de sus Workers {#view-the-status-of-your-workers}

Para ver gráficos del uso de recursos y datos enviados a través de Observability Pipelines Workers:

1. Navegue a [Observability Pipelines][1].
1. Seleccione un pipeline.
1. Haga clic en la pestaña {{< ui >}}Workers{{< /ui >}} para ver la utilización de memoria y CPU de los Workers, las estadísticas de tráfico y cualquier error.
    {{< img src="observability_pipelines/monitoring_and_troubleshooting/workers_tab.png" alt="La pestaña Workers muestra la utilización de memoria, la utilización de CPU, eventos/s, bytes/s y errores para cada Worker." style="width:100%;" >}}
1. Haga clic en la pestaña {{< ui >}}Latest Deployment & Setup{{< /ui >}} para ver el estado de implementación de sus Workers.
    {{< img src="observability_pipelines/monitoring_and_troubleshooting/worker_deployment_status.png" alt="La pestaña Latest Deployment and Setup muestra un estado de implementado para cada Worker." style="width:100%;" >}}

## Ver el estado de los componentes de su pipeline {#view-the-status-of-your-pipeline-components}

Para ver las métricas de una fuente, proceso o destino:

1. Navegue a [Observability Pipelines][1].
1. Seleccione un pipeline.
1. Haga clic en el engranaje junto al nombre de la fuente, del procesador o del destino y, a continuación, seleccione {{< ui >}}View details{{< /ui >}}. Datadog muestra gráficos de estado para el componente que seleccionó.
1. Si desea exportar un gráfico a un [incidente][2], [dashboard][3] o [notebook][4], haga clic en el icono de exportar en el gráfico. El gráfico exportado muestra que la métrica está agrupada por las etiquetas específicas de pipeline y componente.

{{< img src="observability_pipelines/monitoring_and_troubleshooting/pipeline_health_graphs.png" alt="Gráficos de salud que muestran eventos de entrada y salida, bytes de entrada y salida, errores, datos descartados, utilización y eventos de búfer para un pipeline." style="width:35%;" >}}

## out-of-the-box monitors {#out-of-the-box-monitors}

Para ver los out-of-the-box monitors disponibles:

1. Navegue a [Observability Pipelines][1].
1. Haga clic en {{< ui >}}Enable monitors{{< /ui >}} en la columna {{< ui >}}Monitors{{< /ui >}} para su pipeline.
1. Haga clic en {{< ui >}}Start{{< /ui >}} para configurar un monitor para uno de los casos de uso sugeridos.<br>
    La nueva página del metric monitor se configura según el caso de uso que seleccionó. Puede actualizar la configuración para personalizarla aún más. Consulte la [Metric monitor documentation][3] para obtener más información.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com//observability-pipelines/
[2]: /es/incident_response/incident_management/
[3]: /es/monitors/types/metric/
[4]: /es/notebooks/
[5]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/