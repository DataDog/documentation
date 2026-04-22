---
algolia:
  tags:
  - flujo de trabajo
  - rastreo
  - automatización del flujo de trabajo
aliases:
- /es/service_management/workflows/track
description: Monitoriza la actividad, métricas y costes del proceso mediante dashboards,
  registros de auditoría, gestión de eventos y atribución de uso.
disable_toc: false
further_reading:
- link: /service_management/workflows/build
  tag: Documentación
  text: Crear flujos de trabajo
- link: /account_management/audit_trail/
  tag: Documentación
  text: Audit Trail de Datadog
- link: /account_management/billing/usage_attribution/
  tag: Documentación
  text: Atribución de uso
title: Seguimiento de los procesos
---

En esta página se explica cómo hacer un seguimiento de los distintos tipos de actividad del proceso y de los costes del proceso.

## Dashboard predefinido

El dashboard de Información general de procesos proporciona una descripción superficial de tus procesos y ejecuciones en Datadog. Para encontrar el dashboard, ve a tu [Lista de dashboards][2] y busca **Workflows Overview** (Información general de procesos).

{{< img src="service_management/workflows/workflows-dashboard.png" alt="El dashboard de Información general de procesos" style="width:80%;" >}}


## Ver ediciones y ejecuciones de procesos en Audit Trail

Puedes ver las ediciones y ejecuciones de procesos utilizando Audit Trail.

Por ejemplo, para ver quién ha editado un proceso:

1. En tu proceso, haz clic en el <i class="icon-cog-2"></i> **(engranaje)** en la esquina superior derecha y haz clic en **View audit events** (Ver eventos de auditoría).<br>Se abre una búsqueda de Audit Trail filtrada por tu proceso.
1. A la izquierda, en los filtros **Core** (Central), expande **Action** (Acción).
1. Pasa el ratón por encima de **Modified** (Modificado) y haz clic en **Only** (Solo) para filtrar los resultados y mostrar solo las ediciones de proceso.<br>La columna **User ID** (ID de usuario) muestra el nombre de usuario de la persona que realizó cada edición.


## Notificación de ejecuciones

Consulta [notificaciones de proceso][3] para obtener instrucciones sobre el uso de las notificaciones de proceso integradas.


## Sigue las métricas de proceso con un monitor de Datadog

Puedes utilizar los monitores de Datadog para realizar un seguimiento de diversas métricas de proceso.

La lista de métricas disponibles es:

| Métrica | Descripción |
| ------ | ----------- |
| `datadog.workflows.count`                      | Número de procesos no eliminados.                       |
| `datadog.workflows.executions.started`         | Número de instancias de proceso que se han iniciado.   |
| `datadog.workflows.executions.completed`       | Número de instancias de proceso que han finalizado.      |
| `datadog.workflows.steps.executions.started`   | Número de pasos de instancia de proceso que se han iniciado.   |
| `datadog.workflows.steps.executions.completed` | Número de pasos de la instancia de proceso que se han completado. |

Para crear un monitor que controle si las ejecuciones diarias de un proceso superan un determinado umbral, realiza los siguientes pasos:

1. Ve a [New Monitor][4] (Nuevo monitor) y selecciona el tipo de monitor de **Metric** (Métrica).
1. En **Define the metric** (Definir la métrica), para **a**, rellena `datadog.workflows.executions.started`.
1. _Opcionalmente_, para restringir el monitor a un proceso específico, para **de**, rellena `workflow_id:[WORKFLOW-ID]`, sustituyendo `[WORKFLOW-ID]` por el ID de tu proceso.
1. Para **Evaluation Details** (Detalles de evaluación), utiliza los siguientes valores:
    - **Evaluar la**: `sum`
    - **De la consulta sobre el**: `last 1 day`.
1. Para **Set alert conditions** (Establecer condiciones de alerta), selecciona **above** (arriba) y, a continuación, introduce un umbral de alerta y advertencia. Por ejemplo, puedes introducir un **Alert threshold** (Umbral de alerta) de `200` y un **Warning threshold** (Umbral de advertencia) de `150`.
1. En **Configure notifications & automations** (Configurar notificaciones y automatizaciones), asigna un nombre a un proceso y, a continuación, introduce el texto del mensaje. Por ejemplo, puedes utilizar un texto de mensaje como el siguiente:

    {{< code-block lang="none" >}}@slack-alert-channel

{{#is_warning}}
Workflow has executed {{warn_threshold}} times in the last day; manual action might be needed to avoid alerting.
{{/is_warning}}
{{#is_alert}}
Workflow has executed {{threshold}} times in the last day, which is our budget threshold for workflows. We should unpublish the workflow to avoid any more automatic executions for the day.
{{/is_alert}}
{{< /code-block >}}
1. Haz clic en **Create** (Crear).


## Ver los eventos de proceso en el gestor de eventos

Puedes utilizar el [Gestor de eventos][5] para ver los eventos de inicio y finalización de procesos filtrando en `source:workflow_automation`.

Para ver los eventos de un proceso específico, en el cuadro **Search facets** (Buscar facetas), busca `workflow.workflow_id`. Puedes seleccionar un conjunto específico de IDs para ver solo los eventos de esos procesos.

También puedes filtrar la salida por **Status** (Estado) para ver solo los mensajes `info`, `warn`, o `error`.


## Hacer un seguimiento de la facturación de proceso en la Atribución de uso

<div class="alert alert-danger">
Usage Attribution es una función avanzada incluida en el plan Enterprise. Para el resto de planes, ponte en contacto con tu representante de cuenta o <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> para solicitar esta función.
</div>

Para realizar un seguimiento de la facturación de tus ejecuciones de proceso, sigue estos pasos:

1. Navega hasta la página de [Atribución de uso][6].
1. En **Products** (Productos), a la izquierda, busca **Workflow Executions** (Ejecuciones de proceso).
1. Pasa el ratón por encima de **Workflow Executions** (Ejecuciones de proceso) y haz clic en **Only** (Solo) para ver la atribución de uso solo para los procesos.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tienes preguntas o comentarios? Únete al canal **#workflows** en [Datadog Community Slack][1].


[1]: https://chat.datadoghq.com/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /es/service_management/workflows/build/#workflow-notifications
[4]: https://app.datadoghq.com/monitors/create
[5]: https://app.datadoghq.com/event/explorer?query=source%3Aworkflow_automation
[6]: https://app.datadoghq.com/billing/usage-attribution