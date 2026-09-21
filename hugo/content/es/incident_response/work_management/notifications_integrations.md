---
aliases:
- /es/service_management/case_management/create_notifications_and_third_party_tickets
- /es/service_management/case_management/notifications_integrations/
- /es/incident_response/case_management/notifications_integrations/
further_reading:
- link: /incident_response/work_management/troubleshooting
  tag: Documentación
  text: Solución de problemas de Integrations de terceros
- link: https://www.datadoghq.com/blog/servicenow-datadog-incident-response
  tag: Blog
  text: Integre ServiceNow ITSM con Datadog para acelerar Incident Response
- link: https://www.datadoghq.com/blog/forms-case-management-requests/
  tag: Blog
  text: Simplifique los flujos de solicitudes con Datadog Forms y Case Management
- link: https://www.datadoghq.com/blog/work-management/
  tag: Blog
  text: Centralice el trabajo humano y agente con Datadog Work Management
title: Notifications e Integrations
---
## Descripción general {#overview}

Work Management ofrece la capacidad de crear Integrations de terceros para generar Notifications o tickets de forma automática o manual:
- Automáticamente: Cada vez que se crea un nuevo elemento de trabajo, se genera un nuevo ticket o Notifications.
- Manualmente: Los usuarios eligen crear tickets o Notifications para elementos de trabajo específicos.

Al vincular Work Management con sistemas de terceros, puede integrar las soluciones de Datadog en sus flujos de trabajo y procesos existentes. Con las Integrations de Jira y ServiceNow, puede resolver elementos de trabajo utilizando telemetría de pila completa en Datadog mientras mantiene un registro en estos sistemas de terceros.


## Notifications {#notifications}

Para recibir Notifications cuando se cree un nuevo elemento de trabajo, cree una visualización:
1. Navegue al proyecto del cual desea recibir Notifications.
1. Si aún no es miembro del proyecto, haga clic en **Join This Project**.
1. Click **Add view**.
1. Give the view a name in the **Name** field.
1. En el cuadro de búsqueda, ingrese una consulta filtrada para recuperar los elementos de trabajo sobre los que desea recibir Notifications.
1. Seleccione cómo desea recibir las Notifications dentro del campo de destinatarios.
1. Haga clic en **Guardar**.

### Opciones de notificación {#notification-options}

| Integration     | Configuration    |
| --------------- | ---------------- |
| Correo electrónico           | Seleccione una o más direcciones de correo electrónico. |
| Slack           | Seleccione un espacio de trabajo y un canal de Slack. |
| Microsoft Teams | Si ha conectado inquilinos de Microsoft Teams a Datadog, seleccione un inquilino, un equipo y un canal. De lo contrario, seleccione un conector.|
| PagerDuty       | Seleccione un servicio. |
| Webhooks        | Seleccione el nombre de un webhook. |

## Reglas de notificación {#notification-rules}

Puede configurar reglas de notificación en la configuración de su proyecto para recibir alertas sobre actualizaciones clave de elementos de trabajo. Para crear una regla de notificación:

1. Vaya a [**Project Settings**][1] y haga clic en un proyecto para expandir su configuración.
1. En el menú expandido, haga clic en **Notifications**.
1. Click **+ Create Rule** para agregar una regla de notificación.
1. En el campo de consulta, ingrese un filtro para limitar las Notifications a elementos de trabajo específicos. Por ejemplo:
   ```
   priority:P1 OR priority:P2
   ```
   Para recibir Notifications de **todos los elementos de trabajo**, deje la consulta en blanco.
1. Seleccione qué condiciones activarán Notifications. Puede elegir una o más de las siguientes:
   - Creación de elementos de trabajo
   - Transiciones de estado
   - Cambios de prioridad
   - Cambios de asignatario
   - Nueva correlación de alerta (para elementos de trabajo de gestión de eventos)
1. Elija un destino para Notifications. Los destinos admitidos incluyen:
   - Correo electrónico
   - Slack
   - Microsoft Teams
   - PagerDuty
   - Webhook
1. Haga clic en **Save** para activar la regla.

## On-Call paging rules {#on-call-paging-rules}

Desde los elementos de trabajo, puede enviar páginas a los usuarios de forma manual o automática con [Datadog On-Call][4].

Para activar una página manualmente:
1. Abra los detalles del elemento de trabajo.
2. Click the **Page** button.

Para activar una página automáticamente, configure reglas de paginación automatizadas en la configuración de su proyecto:
1. Vaya a [**Project Settings**][1] y haga clic en un proyecto para expandir su configuración.
1. En el menú expandido, haga clic en **Integrations** > **Datadog On-Call**.
1. Toggle on **Automatically page work items to On-Call**. Esto abre el modal de Regla de paginación, donde puede definir su primera regla.
1. En el modal, ingrese una consulta. Si un elemento de trabajo coincide con la consulta especificada en cualquier momento de su ciclo de vida, Datadog envía una página automáticamente al Team designado.
1. Seleccione a qué Team enviar la página:
   - **Specific Team**: Seleccione un Team en particular para que siempre se le envíe una página cuando se active la regla.
   - **Dynamic Team Selection**: Notifique automáticamente al Team asociado con el elemento de trabajo a través del `Team` atributo.
1. Haga clic en **Agregar regla**.
1. Visualice su regla en la página de configuración de Datadog On-Call. **New Paging Rule**.
1. (Opcional) Active la capacidad de asignar automáticamente el elemento de trabajo al usuario On-Call cuando se active una page.

## Tickets de terceros {#third-party-tickets}
En Project Settings, puede administrar la membresía, configurar el cierre automático de elementos de trabajo y configurar Integrations de terceros como Jira y ServiceNow.

{{% collapse-content title="Jira Configuration" level="h3" expanded=false id="jira" %}}
1. Asegúrese de que la Jira Integration esté configurada.
1. En Work Management project settings, habilite **Jira** para la creación manual de incidencias de Jira desde el proyecto.
1. Seleccione una cuenta de Jira, un proyecto en el que crear incidencias y el tipo de incidencia deseado (como story, epic, bug o task).
1. Puede optar por la creación automática de una incidencia de Jira para cada elemento de trabajo creado en el proyecto.
1. Para los siguientes atributos (título del elemento de trabajo, descripción, usuario, comentarios, estado y prioridad), seleccione una de las opciones a continuación:
  | Opción                              | Descripción                                                                                                                                   |
  |-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
  | Once to Jira at work item creation  | El campo se sincroniza de Work Management a Jira solo en el momento en que se crea el elemento de trabajo. Los cambios posteriores no se reflejan en ninguno de los lados.  |
  | Sincronización bidireccional       | Los cambios en Work Management se reflejan en Jira, y viceversa                                                                              |
  | No sincronizar                          | El campo no se sincroniza con Jira.                                                                                                              |
1. Para el estado y la prioridad del elemento de trabajo, seleccione a qué valores se asignan en el lado de Jira.
1. Guardar cambios.

**Notas**:
- Un elemento de trabajo solo puede sincronizarse con un recurso externo a la vez, por proyecto. Para habilitar la sincronización con Jira, se debe deshabilitar la creación y sincronización automática de ServiceNow.
- Solo los elementos de trabajo que utilizan los estados principales de "Abierto", "En progreso" y "Cerrado" pueden sincronizarse con Jira.
- La sincronización bidireccional requiere [soporte para Webhooks][2].
- La creación de incidentes está disponible para Jira Cloud y Data Center. La sincronización de campos solo está disponible para Jira Cloud.
{{% /collapse-content %}}

{{% collapse-content title="ServiceNow Configuration" level="h3" expanded=false id="servicenow" %}}
1. Configure the ServiceNow Integration siguiendo las [instrucciones de configuración de ITOM e ITSM][3].
1. In Work Management project settings, enable ServiceNow for manual ServiceNow incident creation from the project.
1. Seleccione una instancia y un grupo de asignación de ServiceNow.
1. Puede optar por la creación automática de un incidente de ServiceNow para cada elemento de trabajo creado en el proyecto.
1. Para los siguientes atributos (estado, comentarios), seleccione una de las opciones a continuación:
  | Opción     | Descripción    |
  | ---  | ----------- |
  |Una vez a ServiceNow al crear el elemento de trabajo|El campo se sincroniza de Work Management a ServiceNow solo en el momento en que se crea el elemento de trabajo. Los cambios posteriores no se reflejan en ninguno de los lados.|
  |Todas las actualizaciones a ServiceNow |Los cambios en Work Management se reflejan en ServiceNow, pero los cambios en ServiceNow no se reflejan en Work Management.|
  |Sincronización bidireccional|Los cambios en Work Management se reflejan en ServiceNow, y viceversa.|
  |No sincronizar|El campo no se sincroniza con ServiceNow.|
1. Seleccione los valores de estado de ServiceNow a los que deben asignarse los valores de estado de Work Management.
1. Guardar cambios.

**Nota**: Un elemento de trabajo solo puede sincronizarse con un recurso externo a la vez, por proyecto. Para habilitar la sincronización con ServiceNow, la creación y sincronización automática de Jira deben estar deshabilitadas. Solo los elementos de trabajo que utilizan los estados principales de "Abierto", "En curso" y "Cerrado" pueden sincronizarse con ServiceNow.
{{% /collapse-content %}}

{{% collapse-content title="Configuración de Linear" level="h3" expanded=false id="linear" %}}
1. Asegúrese de que la [integración de Linear][5] esté configurada.
1. En la configuración del proyecto de Work Management, habilite **Linear** para la creación manual de incidencias de Linear desde el proyecto.
1. Seleccione un espacio de trabajo y un equipo de Linear en los cuales crear incidencias.
1. Puede optar por la creación automática de una incidencia de Linear para cada elemento de trabajo creado en el proyecto.
1. Para los siguientes atributos (título del elemento de trabajo, descripción, usuario, comentarios, estado y prioridad), seleccione una de las opciones a continuación:
  | Opción                                  | Descripción                                                                                                                                    |
  |-----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
  | Una vez a Linear al crear el elemento de trabajo    | El campo se sincroniza de Work Management a Linear solo en el momento en que se crea el elemento de trabajo. Los cambios posteriores no se reflejan en ninguno de los lados.  |
  | Sincronización bidireccional           | Los cambios en Work Management se reflejan en Linear y viceversa.                                                                            |
  | No sincronizar                              | El campo no se sincroniza con Linear.                                                                                                             |
1. Para el estado del elemento de trabajo, seleccione a qué estados se asignan en el lado de Linear.
1. Guardar cambios.

**Notas**:
- Solo los elementos de trabajo que utilizan los estados principales de "Abierto", "En curso" y "Cerrado" pueden sincronizarse con Linear.
- La sincronización bidireccional requiere [soporte para webhook][6].
{{% /collapse-content %}}

## Autoescalado de incidentes {#incident-auto-escalation}

La declaración manual de incidentes durante volúmenes elevados de eventos puede causar retrasos y aumentar la exposición al riesgo durante situaciones críticas. El autoescalado de incidentes desde Work Management le permite declarar incidentes automáticamente cuando los elementos de trabajo coinciden con sus criterios definidos, eliminando la necesidad de intervención manual.

Vaya a la [página de Configuración del proyecto][1], haga clic en **Integrations** > **Datadog Incidents** y active **Autoescalar elementos de trabajo a incidentes**.

Cuando está habilitado, cualquier elemento de trabajo que cumpla con los criterios de consulta especificados (en cualquier punto de su ciclo de vida) activa automáticamente un incidente, lo que permite tiempos de respuesta más rápidos para su equipo.

## Duplicación de Slack {#slack-mirroring}
Con la integración de Slack, las respuestas en los hilos de notificación de Slack vinculados a un elemento de trabajo se duplican automáticamente en la línea de tiempo de actividad del elemento de trabajo. Esto mantiene actualizado el contexto del elemento de trabajo sin necesidad de realizar actualizaciones manuales en Datadog. La duplicación de hilos de Slack en elementos de trabajo es compatible con:
- [Notificaciones de Slack][8] generadas desde Work Management
- Notificaciones de Slack generadas desde Monitors usando [manejadores de incidencias][7]
- Hilos de Slack para elementos de trabajo creados directamente desde Slack usando la [integración de Slack][9]

**Para configurar la duplicación de hilos de Slack**:

Asegúrese de que la [integración de Slack][9] esté configurada para su organización de Datadog.

La duplicación de hilos de Slack está habilitada de forma predeterminada para todos los proyectos de Work Management. Para deshabilitarla en un proyecto específico:
1. Vaya a [**Configuración del proyecto**][1] y haga clic en un proyecto para expandir su configuración.
1. En el menú expandido, haga clic en **Integrations** > **Slack**.
1. Desactive **Duplicación de hilos de Slack**.

### Cómo funciona {#how-it-works}

- Para cualquier notificación de elemento de trabajo enviada a Slack, la actividad en el hilo de notificación se duplica en el elemento de trabajo.
- La actividad duplicada incluye cualquier respuesta de texto (los archivos adjuntos no son compatibles). Cada mensaje duplicado muestra el nombre del usuario de Slack y Slack como fuente.
- Varios hilos de Slack pueden reflejar comentarios en un solo elemento de trabajo.
- La duplicación es unidireccional: los mensajes fluyen de Slack al elemento de trabajo, no del elemento de trabajo a Slack.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/work/settings
[2]: /es/integrations/jira/#configure-a-jira-webhook
[3]: /es/integrations/servicenow/#itom-and-itsm-setup
[4]: /es/incident_response/on-call/
[5]: /es/integrations/linear/
[6]: /es/integrations/linear/#configure-a-linear-webhook
[7]: /es/incident_response/work_management/create_work_item#automatic-work-item-creation
[8]: /es/incident_response/work_management/notifications_integrations#notifications
[9]: /es/integrations/slack/?tab=datadogforslack