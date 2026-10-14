---
description: Configure automatizaciones que actúen continuamente sobre las Recomendaciones
  de Cloud Cost para limpiar recursos en la nube no utilizados o innecesarios en un
  horario recurrente.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Cloud Cost Management
- link: /cloud_cost_management/recommendations/
  tag: Documentación
  text: Recomendaciones de Cloud Cost
- link: /cloud_cost_management/recommendations/notifications/
  tag: Documentación
  text: Notifications
- link: /actions/workflows/
  tag: Documentación
  text: Workflow Automation
title: Automatizaciones de optimización de costos
---
## Descripción general {#overview}

Las Automatizaciones de optimización de costos le permiten actuar continuamente sobre las [Recomendaciones de Cloud Cost][1] sin necesidad de limpieza manual. En la página {{< ui >}}Automations{{< /ui >}}, se encuentran en la pestaña {{< ui >}}Remediation{{< /ui >}}. Usted define una **automatización**, la limita al contexto de las cuentas, regiones y recursos que desee, y Datadog ejecuta la acción recomendada de forma recurrente. Cada ejecución puede requerir aprobación humana en Slack o Microsoft Teams antes de que Datadog realice cualquier cambio, por lo que su equipo mantiene el control de cada cambio.

Cada automatización se dirige a un único tipo de recomendación e incluye lo siguiente:

- Un horario (semanal, quincenal, cada 30 días o cada 90 días)
- Un contexto (cuenta, región, etiquetas y un número máximo de recursos por ejecución)
- Salvaguardas específicas para el tipo de recomendación (por ejemplo, una instantánea previa a la eliminación)
- Un paso opcional de aprobación humana enviado a través de Slack o Microsoft Teams

Las recomendaciones sobre las que actúa una automatización se mueven automáticamente a {{< ui >}}Completed{{< /ui >}} y contribuyen a los ahorros realizados en la página de [Recomendaciones de Cloud Cost][1].

Las automatizaciones son diferentes de las acciones de Workflow Automation de 1 clic descritas en [Realización de acciones de recomendación][2]. Las acciones de 1 clic ejecutan un solo cambio bajo demanda desde el panel lateral de recomendaciones. Las automatizaciones se ejecutan en un horario recurrente y actúan sobre cada recurso coincidente dentro del contexto.

Las automatizaciones también son diferentes de las [Notifications][8], que envían un resumen recurrente de Slack o Microsoft Teams de las recomendaciones coincidentes, pero no realizan ninguna acción.

**Nota**: Las automatizaciones utilizan Datadog Workflows e incurren en costos adicionales. Para obtener información detallada sobre precios, consulte la [página de precios de Workflow Automation][3].

## Tipos de recomendaciones admitidas {#supported-recommendation-types}

La pestaña {{< ui >}}Remediation{{< /ui >}} admite los siguientes tipos de recomendaciones:

| Proveedor | Tipo de recomendación | Salvaguardas integradas |
|----------|---------------------|---------------------|
| AWS | Eliminar volumen de EBS sin adjuntar | (Opcional) Toma una instantánea de EBS antes de eliminar cada volumen. |
| AWS | Migración de volumen de EBS de gp2 a gp3 | Reversible. La migración no causa pérdida de datos. |
| AWS | Eliminar instantáneas de EBS sin usar | Se omiten las instantáneas referenciadas por una AMI. |
| AWS | Eliminar copias de seguridad bajo demanda adicionales (DynamoDB) | Las dos copias de seguridad más recientes se conservan en cada ejecución. |
| AWS | Migración de tabla de DynamoDB a la clase de tabla de acceso poco frecuente | Reversible. La clase de tabla puede cambiarse de nuevo en cualquier momento. |
| AWS | Eliminar tabla de DynamoDB sin usar | Se realiza una copia de seguridad antes de eliminar cada tabla. |
| AWS | Establecer política de retención de registros de CloudWatch | Reversible. El período de retención puede ajustarse o eliminarse en cualquier momento. |
| AWS | Eliminar instancia de RDS sin usar | Se realiza una instantánea final de RDS antes de eliminar cada instancia. |
| AWS | Eliminar puerta de enlace NAT sin usar | Ninguna. La eliminación es irreversible. |
| AWS | Transicionar objetos de S3 Standard a Amazon S3 Intelligent-Tiering | Reversible. Las reglas de ciclo de vida existentes se conservan y la regla añadida puede eliminarse en cualquier momento. |
| AWS | Eliminar instancia de EC2 sin usar | (Opcional) Crea una AMI antes de eliminar cada instancia. |
| AWS | Eliminar clúster de Redshift sin usar | Se realiza una instantánea final antes de eliminar cada clúster. |
| GCP | Eliminar disco de Compute Engine sin adjuntar | (Opcional) Toma una instantánea antes de eliminar cada disco. |
| GCP | Habilitar Autoclass en un bucket de Cloud Storage | Reversible. Autoclass se puede deshabilitar en cualquier momento. |
| Azure | Eliminar disco administrado sin adjuntar | (Opcional) Toma una instantánea antes de que se elimine cada disco. |
| Azure | Eliminar base de datos SQL no utilizada | Ninguna. La eliminación es irreversible. |

Las salvaguardas marcadas como (Opcional) están habilitadas de forma predeterminada y se pueden desactivar en el formulario de automatización. Todas las demás salvaguardas enumeradas se aplican siempre y no se pueden deshabilitar.

## Requisitos previos {#prerequisites}

- Una cuenta de AWS, GCP o Azure configurada con [Cloud Cost Recommendations][4] y que genere recomendaciones activamente.
- El permiso **Cloud Cost Management - Cloud Cost Management Write** para acceder a la página {{< ui >}}Automations{{< /ui >}}, y el permiso **App Builder & Workflow Automation - Workflows Write** para crear o editar una automatización.
- Una conexión a cada cuenta en la que desea que actúe una automatización, configurada desde {{< ui >}}Manage Connections{{< /ui >}} en la página {{< ui >}}Automations{{< /ui >}}. Datadog utiliza esta conexión para asumir un rol con los permisos de escritura necesarios para la acción recomendada, y otorga solo los permisos requeridos para el tipo de recomendación seleccionado. Para actuar en varias cuentas con una automatización, cree un [grupo de conexión][7].
- (Opcional) Una conexión de Slack o Microsoft Teams si desea que los mensajes de aprobación se envíen a un canal.

## Configurar una automatización {#set-up-an-automation}

Para configurar una automatización en un horario recurrente para un tipo de recomendación:

1. Navegue a [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Optimize{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}][6].
1. Seleccione la pestaña {{< ui >}}Remediation{{< /ui >}}.
1. En el lado izquierdo de la página, seleccione el tipo de recomendación.
1. Haga clic en {{< ui >}}Create New Automation{{< /ui >}}.
1. En el menú desplegable {{< ui >}}Connection{{< /ui >}}, seleccione una conexión o grupo de conexión configurado en [{{< ui >}}Manage Connections{{< /ui >}}][5].
1. En la sección {{< ui >}}Define scope{{< /ui >}}:
    1. Ingrese etiquetas para restringir la automatización a los recursos que coincidan con esas etiquetas, como `env`, `service` y `team`.
    1. Ingrese el máximo de recursos por ejecución para limitar cuántos recursos procesa la automatización durante una sola ejecución. La automatización prioriza los recursos según el mayor ahorro potencial.
1. En la sección {{< ui >}}Set schedule{{< /ui >}}, seleccione la frecuencia de automatización y la hora de ejecución.
1. (Opcional) Habilite el interruptor {{< ui >}}Require approval before execution{{< /ui >}} para requerir revisión humana antes de la ejecución. Si está habilitado, seleccione {{< ui >}}Slack{{< /ui >}} o {{< ui >}}Microsoft Teams{{< /ui >}} y complete los campos de notificación del canal. Consulte [Salvaguardas](#safeguards).
1. Ingrese un nombre para la automatización.
1. Haga clic en {{< ui >}}Save Automation{{< /ui >}}.

### Salvaguardas {#safeguards}

Cada tipo de recomendación tiene salvaguardas integradas. Por ejemplo, la automatización **Eliminar volumen de EBS no adjunto** puede tomar una instantánea de EBS antes de eliminar cada volumen. Consulte [Tipos de recomendación admitidos](#supported-recommendation-types) para obtener la lista completa de salvaguardas por tipo de recomendación.

Si {{< ui >}}Require approval before execution{{< /ui >}} está habilitado en la [configuración de la automatización](#set-up-an-automation), Datadog publica en el canal designado un resumen de los recursos seleccionados en cada ejecución. La automatización solo se ejecuta después de que un usuario aprueba la solicitud en el canal.

## Administrar automatizaciones {#manage-automations}

La pestaña {{< ui >}}Remediation{{< /ui >}} lista todas las automatizaciones de su organización, agrupadas por tipo de recomendación. Las automatizaciones se etiquetan como **políticas** en esta vista. Utilice los filtros {{< ui >}}Provider{{< /ui >}}, {{< ui >}}Resource Type{{< /ui >}} y {{< ui >}}Recommendation Type{{< /ui >}} en la parte superior de la página para limitar la lista. Desde esta página, usted puede:

- Pausar o reanudar una automatización
- Editar el contexto, el horario o las salvaguardas de una automatización
- Cambiar el nombre de una automatización
- Eliminar una automatización

## Historial de ejecución {#execution-history}

Abra una automatización y seleccione la pestaña {{< ui >}}Activity{{< /ui >}} para ver las ejecuciones pasadas y próximas. Cada registro de ejecución incluye:

- Hora y estado de la ejecución (éxito, error o pendiente de aprobación)
- Los recursos sobre los que se actuó
- Ahorros estimados obtenidos por la ejecución
- Un enlace a la ejecución de Workflow Automation subyacente

Utilice los filtros en la parte superior del "visualizar" {{< ui >}}Activity{{< /ui >}} para encontrar ejecuciones por estado, tipo de recomendación o rango de fechas.

## Historial de versiones {#version-history}

Datadog registra una nueva versión de una automatización cada vez que se crea, edita, habilita, deshabilita o elimina. Abra una automatización y seleccione la pestaña {{< ui >}}History{{< /ui >}} para ver quién realizó cada cambio y qué se cambió. Utilice el "visualizar" para auditar cambios o volver a una versión anterior.

## Estado de la recomendación {#recommendation-status}

Cuando una automatización actúa correctamente sobre un recurso, la recomendación correspondiente pasa a {{< ui >}}Completed{{< /ui >}} y se etiqueta como completada por la automatización. Sus ahorros cuentan para los totales de ahorros realizados en la página [Cloud Cost Recommendations][1].

Si establece una recomendación en {{< ui >}}Dismissed{{< /ui >}}, las automatizaciones la omitirán en ejecuciones futuras hasta que expire el descarte.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloud_cost_management/recommendations/
[2]: /es/cloud_cost_management/recommendations/#recommendation-action-taking
[3]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[4]: /es/cloud_cost_management/recommendations/#prerequisites
[5]: /es/actions/connections/
[6]: https://app.datadoghq.com/cost/optimize/automations
[7]: /es/actions/connections/#connection-groups
[8]: /es/cloud_cost_management/recommendations/notifications/