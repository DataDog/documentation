---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /es/service_management/workflows/track
description: Haga un seguimiento de la actividad de flujo de trabajo, las métricas
  y los costos utilizando Dashboard, Audit Trail, gestión de eventos y atribución
  de uso.
disable_toc: false
further_reading:
- link: /actions/workflows/build
  tag: Documentación
  text: Crear flujos de trabajo
- link: /account_management/audit_trail/
  tag: Documentación
  text: Datadog Audit Trail
- link: /account_management/billing/usage_attribution/
  tag: Documentación
  text: Atribución de uso
title: Hacer un seguimiento de los flujos de trabajo
---
{{< site-region region="gov2" >}}
<div class="alert alert-info">Workflow Automation está en versión preliminar en su sitio de Datadog seleccionado ({{< region-param key=dd_site_name >}}).</div>
{{< /site-region >}}

Esta página explica cómo hacer un seguimiento de diferentes tipos de actividad y costos de flujos de trabajo.

## Dashboard preconfigurado {#out-of-the-box-dashboard}

El Dashboard de Descripción general de flujos de trabajo proporciona una visión general de alto nivel de sus flujos de trabajo y ejecuciones de Datadog. Para encontrar el Dashboard, vaya a su [lista de Dashboards][2] y busque {{< ui >}}Workflows Overview{{< /ui >}}.

{{< img src="actions/workflows/workflows-dashboard.png" alt="El Dashboard de Descripción general de flujos de trabajo" style="width:80%;" >}}


## Vea las ediciones y ejecuciones de flujos de trabajo en el Audit Trail {#view-workflow-edits-and-runs-in-audit-trail}

Puede visualizar las ediciones y ejecuciones de flujos de trabajo mediante el Audit Trail.

Por ejemplo, para visualizar quién editó un flujo de trabajo:

1. Desde su flujo de trabajo, haga clic en el <i class="icon-cog-2"></i> **(engranaje)** en la esquina superior derecha y haga clic en {{< ui >}}View audit events{{< /ui >}}.<br>Se abrirá una búsqueda en el Audit Trail filtrada por su flujo de trabajo.
1. A la izquierda, bajo los filtros {{< ui >}}Core{{< /ui >}}, expanda {{< ui >}}Action{{< /ui >}}.
1. Pase el cursor sobre {{< ui >}}Modified{{< /ui >}} y haga clic en {{< ui >}}Only{{< /ui >}} para filtrar los resultados y mostrar solo las ediciones de flujos de trabajo.<br>La columna {{< ui >}}User ID{{< /ui >}} muestra el nombre de usuario de la persona que realizó cada edición.


## Notificar sobre ejecuciones.{#notify-about-runs}

Consulte [Notificaciones de flujos de trabajo][3] para obtener instrucciones sobre el uso de las notificaciones de flujo de trabajo integradas.


## Haga un seguimiento de las métricas de flujos de trabajo con un monitor de Datadog {#track-workflow-metrics-with-a-datadog-monitor}

Puede usar monitores de Datadog para hacer un seguimiento de varias métricas de flujos de trabajo.

La lista de métricas disponibles es:

| Métrica | Descripción |
| ------ | ----------- |
| `datadog.workflows.count`                      | Número de flujos de trabajo no eliminados.                       |
| `datadog.workflows.executions.started`         | Número de instancias de flujo de trabajo que se han iniciado.   |
| `datadog.workflows.executions.completed`       | Número de instancias de flujo de trabajo que se han completado.      |
| `datadog.workflows.steps.executions.started`   | Número de pasos de instancia de flujo de trabajo que se han iniciado.   |
| `datadog.workflows.steps.executions.completed` | Número de pasos de instancia de flujo de trabajo que se han completado. |

Para crear un monitor que rastree si las ejecuciones diarias de flujo de trabajo exceden un cierto umbral, realice los siguientes pasos:

1. Vaya a [New Monitor][4] y seleccione el tipo de monitor {{< ui >}}Metric{{< /ui >}}
1. En {{< ui >}}Define the metric{{< /ui >}}, para {{< ui >}}a{{< /ui >}}, complete `datadog.workflows.executions.started`.
1. _Opcionalmente_, para restringir el monitor a un flujo de trabajo específico, para {{< ui >}}from{{< /ui >}}, complete `workflow_id:[WORKFLOW-ID]`, reemplazando `[WORKFLOW-ID]` con el ID de su flujo de trabajo.
1. Para {{< ui >}}Evaluation Details{{< /ui >}}, utilice los siguientes valores:
    - {{< ui >}}Evaluate the{{< /ui >}}: `sum`
    - {{< ui >}}Of the query over the{{< /ui >}}: `last 1 day`.
1. Para {{< ui >}}Set alert conditions{{< /ui >}}, elija {{< ui >}}above{{< /ui >}}, luego complete un umbral de alerta y de advertencia. Por ejemplo, podría completar un {{< ui >}}Alert threshold{{< /ui >}} de `200` y un {{< ui >}}Warning threshold{{< /ui >}} de `150`.
1. En {{< ui >}}Configure notifications & automations{{< /ui >}}, nombre su flujo de trabajo, luego complete el texto del mensaje. Por ejemplo, podría usar un texto de mensaje como el siguiente:

    {{< code-block lang="none" >}}@slack-alert-channel

{{#is_warning}}
Workflow has executed {{warn_threshold}} times in the last day; manual action might be needed to avoid alerting.
{{/is_warning}}
{{#is_alert}}
Workflow has executed {{threshold}} times in the last day, which is our budget threshold for workflows. We should unpublish the workflow to avoid any more automatic executions for the day.
{{/is_alert}}
{{< /code-block >}}
1. Haga clic en {{< ui >}}Create{{< /ui >}}.


## Visualice eventos de flujo de trabajo en el Administrador de eventos {#view-workflow-events-in-event-manager}

Puede usar [Event Manager][5] para visualizar los eventos de inicio y finalización de flujos de trabajo filtrando por `source:workflow_automation`.

Para visualizar eventos de un flujo de trabajo específico, en el cuadro {{< ui >}}Search facets{{< /ui >}}, busque `workflow.workflow_id`. Puede seleccionar un conjunto específico de ID para visualizar solo los eventos de esos flujos de trabajo.

También puede filtrar la salida por {{< ui >}}Status{{< /ui >}} para visualizar solo mensajes de `info`, `warn` o `error`.


## Realice un seguimiento de la facturación de flujos de trabajo en Atribución de uso {#track-workflow-billing-in-usage-attribution}

<div class="alert alert-danger">
Atribución de uso es una función avanzada incluida en el plan Enterprise. Para todos los demás planes, comuníquese con su representante de cuenta o <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> para solicitar esta función.
</div>

Para realizar un seguimiento de la facturación de sus ejecuciones de flujo de trabajo, realice los siguientes pasos:

1. Navegue a la página [Atribución de uso][6].
1. Debajo de {{< ui >}}Products{{< /ui >}} a la izquierda, busque {{< ui >}}Workflow Executions{{< /ui >}}.
1. Pase el cursor sobre {{< ui >}}Workflow Executions{{< /ui >}} y haga clic en {{< ui >}}Only{{< /ui >}} para visualizar la atribución de uso solo para flujos de trabajo.


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal **#workflows** en el [Datadog Community Slack][1].


[1]: https://chat.datadoghq.com/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /es/actions/workflows/build/#workflow-notifications
[4]: https://app.datadoghq.com/monitors/create
[5]: https://app.datadoghq.com/event/explorer?query=source%3Aworkflow_automation
[6]: https://app.datadoghq.com/billing/usage-attribution