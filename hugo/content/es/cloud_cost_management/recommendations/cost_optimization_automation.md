---
description: Configure automatizaciones que actúan continuamente sobre Cloud Cost
  Recommendations para limpiar recursos en la nube no utilizados o que generan gastos
  innecesarios en un horario recurrente.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Cloud Cost Management
- link: /cloud_cost_management/recommendations/
  tag: Documentación
  text: Recomendaciones de Cloud Cost
- link: /service_management/workflows/
  tag: Documentación
  text: Workflow Automation
title: Automatización de Optimización de Costos
---
## Descripción General {#overview}

La Automatización de Optimización de Costos te permite actuar continuamente sobre las [Recomendaciones de Cloud Cost][1] sin limpieza manual. Usted define una **automatización**, la delimita a las cuentas, regiones y recursos que desea, y Datadog ejecuta la acción recomendada en un horario recurrente. Cada ejecución puede requerir aprobación humana en Slack o Microsoft Teams antes de que Datadog realice cualquier cambio, por lo que su equipo mantiene el control de cada cambio.

Cada automatización se dirige a un único tipo de recomendación e incluye lo siguiente:

- Un horario (semanal, quincenal, cada 30 días o cada 90 días)
- Un contexto (cuenta de AWS, región, etiquetas y un número máximo de recursos por ejecución)
- Salvaguardias específicas para el tipo de recomendación (por ejemplo, una instantánea previa a la eliminación)
- Un paso opcional de aprobación humana dirigido a través de Slack o Microsoft Teams

Las recomendaciones sobre las que actúa una automatización se mueven a {{< ui >}}Completed{{< /ui >}} automáticamente y contribuyen a los ahorros realizados en la página de [Cloud Cost Recommendations][1].

La Automatización de Optimización de Costos es diferente de las acciones de Workflow Automation de un clic descritas en [Toma de acción de recomendación][2]. Las acciones de un clic ejecutan un único cambio a demanda desde el panel lateral de recomendaciones. Las automatizaciones se ejecutan en un horario recurrente y actúan sobre cada recurso coincidente en el contexto.

**Nota**: La Automatización de Optimización de Costos utiliza Workflow Automation de Datadog y genera costos adicionales. Para obtener información detallada sobre precios, consulte la [página de precios de Workflow Automation][3].

## Tipos de recomendaciones soportados {#supported-recommendation-types}

La Automatización de Optimización de Costos soporta los siguientes tipos de recomendaciones de AWS:

| Tipo de recomendación | Salvaguardias integradas |
|---------------------|---------------------|
| Terminar volumen EBS no adjunto | Se toma una instantánea de EBS antes de eliminar cada volumen. |
| Transitar objetos S3 Standard a Amazon S3 Intelligent-Tiering | Reversible. La configuración del ciclo de vida se puede eliminar en cualquier momento. |
| Terminar instancia RDS no utilizada | Se toma una instantánea final de RDS antes de terminar cada instancia. |
| Eliminar copias de seguridad adicionales bajo demanda (DynamoDB) | Las dos copias de seguridad más recientes se preservan en cada ejecución. |
| Establecer política de retención de registros de CloudWatch | Reversible. El período de retención se puede ajustar o eliminar en cualquier momento. |
| Eliminar instantáneas antiguas de EBS | Las instantáneas referenciadas por un AMI se omiten. |

## Requisitos previos {#prerequisites}

- Una cuenta de AWS configurada con [Recomendaciones de Cloud Cost][4] y generando activamente recomendaciones.
- El permiso **Cloud Cost Management - Cloud Cost Management Write** para crear o editar una automatización.
- Una [conexión de Workflow Automation][5] a cada cuenta de AWS sobre la que desea que actúe una automatización. Datadog utiliza esta conexión para asumir un rol de IAM con los permisos de escritura necesarios para la acción recomendada. Datadog otorga solo los permisos requeridos para el tipo de recomendación seleccionado.
- (Opcional) Una conexión de Slack o Teams si desea que los mensajes de aprobación se dirijan a un canal.

## Configurar una automatización {#set-up-an-automation}

Para configurar una automatización en un horario recurrente para un tipo de recomendación:

1. Navegar a [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Optimize{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}][6].
1. En el lado izquierdo de la página, seleccione el tipo de recomendación.
1. Haga clic en **Crear Nueva Automatización**.
1. En el menú desplegable {{< ui >}}AWS Connection{{< /ui >}}, seleccione o cree una [conexión][7]. Para actuar en múltiples cuentas con una automatización, seleccione o cree un [grupo de conexiones][8].
1. En la sección {{< ui >}}Define scope{{< /ui >}}:
    1. Ingrese etiquetas para restringir la automatización a recursos que coincidan con esas etiquetas, como `env`, `service` y `team`.
    1. Ingrese el número máximo de recursos por ejecución para limitar cuántos recursos la automatización actúa durante una sola ejecución. La automatización prioriza los recursos por el mayor ahorro potencial.
1. En la sección {{< ui >}}Set schedule{{< /ui >}}, seleccione la frecuencia de automatización y el tiempo de ejecución.
1. (Opcional) Habilite el interruptor {{< ui >}}Require approval before execution{{< /ui >}} para requerir revisión humana antes de la ejecución. Si está habilitado, seleccione {{< ui >}}Slack{{< /ui >}} o {{< ui >}}Microsoft Teams{{< /ui >}}, y complete los campos de notificación del canal. Ver [Salvaguardas](#safeguards).
1. Ingrese un nombre para la automatización.
1. Haga clic en {{< ui >}}Save Policy{{< /ui >}}.

### Salvaguardas {#safeguards}

Cada tipo de recomendación tiene salvaguardas integradas. Por ejemplo, la automatización **Terminar volumen EBS no adjunto** toma una instantánea de EBS antes de eliminar cada volumen. Revise las salvaguardas listadas en el formulario de automatización y active las que son opcionales para su entorno.

Si {{< ui >}}Require approval before execution{{< /ui >}} está habilitado en la [configuración de automatización](#set-up-an-automation), Datadog publica en el canal designado un resumen de los recursos objetivo en cada ejecución. La automatización solo se ejecuta después de que un usuario aprueba la solicitud en el canal.

## Gestionar automatizaciones {#manage-automations}

La {{< ui >}}Automations{{< /ui >}} página lista cada automatización en tu organización, agrupada por tipo de recomendación. Desde esta página usted puede:

- Pausar o reanudar una automatización
- Editar el contexto, el horario o las salvaguardas de una automatización
- Renombrar una automatización
- Eliminar una automatización

## Historial de ejecuciones {#execution-history}

Abra una automatización y seleccione la {{< ui >}}Activity{{< /ui >}} pestaña para ver ejecuciones pasadas y próximas. Cada registro de ejecución incluye:

- Tiempo de ejecución y estado (éxito, fallo o pendiente de aprobación)
- Los recursos sobre los que se actuó
- Ahorros estimados realizados por la ejecución
- Un enlace a la ejecución subyacente de Workflow Automation

Utiliza los filtros en la parte superior de la vista {{< ui >}}Activity{{< /ui >}} para encontrar ejecuciones por estado, tipo de recomendación o rango de fechas.

## Historial de versiones {#version-history}

Datadog registra una nueva versión de una automatización cada vez que se crea, edita, habilita, deshabilita o elimina. Abra una automatización y seleccione la pestaña {{< ui >}}History{{< /ui >}} para ver quién realizó cada cambio y qué cambió. Utilice esta visualización para auditar cambios o retroceder a una versión anterior.

## Estado de recomendación {#recommendation-status}

Cuando una automatización actúa exitosamente sobre un recurso, la recomendación correspondiente se mueve a {{< ui >}}Completed{{< /ui >}} y se etiqueta como completada por la automatización. Sus ahorros cuentan para los totales de ahorros realizados en la página de [Cloud Cost Recommendations][1].

Si establece una recomendación en {{< ui >}}Dismissed{{< /ui >}}, las automatizaciones la omiten en ejecuciones futuras hasta que expire la desestimación.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloud_cost_management/recommendations/
[2]: /es/cloud_cost_management/recommendations/#recommendation-action-taking
[3]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[4]: /es/cloud_cost_management/recommendations/#prerequisites
[5]: /es/service_management/workflows/connections/
[6]: https://app.datadoghq.com/cost/optimize/automations
[7]: /es/actions/connections/
[8]: /es/service_management/workflows/connections/#connection-groups