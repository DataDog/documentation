---
disable_toc: false
further_reading:
- link: observability_pipelines/set_up_pipelines
  tag: Documentación
  text: Configurar un pipeline
- link: /monitors/types/metric/
  tag: Documentación
  text: Configurar un monitor de métricas
- link: /observability_pipelines/monitoring/metrics/
  tag: Documentación
  text: Métricas de pipelines de observabilidad
title: Monitorización
---

## Información general

Un pipeline consta de componentes que recopilan, procesan y enrutan tus datos de observabilidad. Puedes realizar un seguimiento del estado de tus pipelines y componentes de las siguientes maneras:

- Observando los gráficos de estado de tus [pipelines](#view-the-status-of-your-pipelines), [workers](#view-the-status-of-your-workers) y [componentes](#view-the-status-of-your-pipeline-components) (fuentes, procesadores y destinos).
- Activando [monitores predefinidos](#out-of-the-box-monitors) que te alertan si:
    - Un worker de pipelines de observabilidad tiene un uso elevado de CPU o de memoria, o está perdiendo datos.
    - Un componente emite errores.
    - Se ha alcanzado una cuota definida.
- Crea tus propios dashboards, notebooks y monitores con las [métricas de pipelines de observabilidad][5] disponibles.

## Ver el estado de tus pipelines

1. Ve a [Pipelines de observabilidad][1] para ver cuántos bytes están recibiendo y enviando tus pipelines.
1. Selecciona un pipeline.
1. Haz clic en la pestaña **Estado** para ver detalles del pipeline y sus componentes. Puedes ver gráficos de:
    - Cuánto se utiliza cada componente y el número total de eventos que el componente recibe y envía.
    - El número de solicitudes realizadas a los destinos y el número de errores encontrados por esas solicitudes.
    - Cuántos eventos se desechan de forma intencionada y no intencionada.
    - Cualquier cambio en el número de solicitudes y errores para cada componente durante la semana anterior.

Puedes exportar un gráfico de estado a un dashboard, notebook o monitor. El gráfico exportado muestra que la métrica está agrupada por las etiquetas (tags) de pipelines y componentes específicas.

## Ver el estado de tus workers

Para ver gráficos del uso de recursos y datos enviados a través de workers de pipelines de observabilidad:

1. Ve a [Pipelines de observabilidad][1].
1. Selecciona un pipeline.
1. Haz clic en la pestaña **Workers** para ver el uso de memoria y CPU de los workers, las estadísticas de tráfico y cualquier error.

## Ver el estado de los componentes de tu pipeline

Para ver métricas de un origen, proceso, o destino:

1. Ve a [Pipelines de observabilidad][1].
1. Selecciona un pipeline.
1. Haz clic en el engranaje situado junto al nombre de la fuente, del procesador o del destino y, a continuación, selecciona **View details** (Ver detalles). Datadog muestra gráficos de estado del componente seleccionado.
1. Si quieres exportar un gráfico a un [incidente][2], [dashboard][3], o [notebook][4], haz clic en el icono de exportación en el gráfico. El gráfico exportado muestra que la métrica está agrupada por las etiquetas de pipelines y componentes específicas.

## Monitores predefinidos

Para ver los monitores predefinidos disponibles:

1. Ve a [Pipelines de observabilidad][1].
1. Haz clic en **Enable monitors** (Habilitar monitores) en la columna **Monitors** (Monitores) de tu pipeline.
1. Haz clic en **Start** (Iniciar) para configurar un monitor para uno de los casos de uso sugeridos.<br>
   La nueva página del monitor de métricas estará configurada en función del caso de uso que hayas seleccionado. Puedes actualizar la configuración para personalizarla aún más. Para obtener más información, consulta la [documentación del monitor de métricas][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com//observability-pipelines/
[2]: /es/service_management/incident_management/
[3]: /es/getting_started/dashboards/
[4]: /es/notebooks/
[5]: /es/observability_pipelines/monitoring/metrics/