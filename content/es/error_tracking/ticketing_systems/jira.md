---
further_reading:
- link: /error_tracking/explorer/
  tag: Documentación
  text: Explorer de Error Tracking
- link: /error_tracking/issue_states/
  tag: Documentación
  text: Estados de incidentes en Error Tracking
- link: /integrations/jira/
  tag: Documentación
  text: Integración con Jira
is_beta: false
private: false
site_support_id: jira_error_tracking
title: Integrar Jira con Error Tracking
---

## Información general

Integra Jira con Error Tracking para crear y vincular tickets de Jira a problemas de Error Tracking. Con Jira para Error Tracking, puedes:

- Crear tickets de Jira directamente desde el panel de problemas de Error Tracking 
- Agrupar varios problemas de Error Tracking en un único ticket
- Dirigir automáticamente los problemas a paneles específicos de Jira mediante reglas de automatización
- Crear automáticamente tickets de Jira para los problemas de Error Tracking que coincidan con criterios específicos.

## Requisitos previos

Sigue [estos steps (UI) / pasos (generic)][7] para configurar la integración de Jira para Datadog.

<div class="alert alert-info">La creación de tickets a partir de un problema de Error Tracking está disponible para Jira Cloud y Data Center. La sincronización doble entre Jira y Error Tracking solo está disponible para Jira Cloud.</div>

Necesitas los siguientes [permisos][1] para utilizar la integración de Jira para Error Tracking:

- Lectura de Error Tracking
- Escritura de problemas de Error Tracking
- Lectura de cases (incidencias)
- Escritura de cases (incidencias)

## Crear un ticket a partir de un problema

Puedes crear un ticket de Jira directamente desde el panel de problemas para agrupar los esfuerzos de investigación sobre ese problema:

1. Ve al [Explorer de Error Tracking][2].
2. Haz clic en un problema para abrir el panel de problemas.
3. En el panel de problemas, en el menú desplegable **Actions** (Acciones), haz clic en **Add Jira ticket** (Añadir ticket de Jira).
4. Selecciona la cuenta de y el project (proyecto) de Jira en el que debe crearse el ticket. A continuación, selecciona el tipo de ticket que desees crear.
5. Opcionalmente, accede a los ajustes de Sincronización de datos para configurar cómo deben sincronizarse los datos entre Datadog y Jira.
6. Haz clic en **Create** (Crear) para crear el ticket.

{{< img src="error_tracking/create-ticket.png" alt="Crear un ticket de Jira a partir de un problema de Error Tracking" style="width:100%;" >}}

Una vez creado, el ticket se vincula al problema de Error Tracking. El vínculo del ticket aparece en el panel de problemas y el estado del problema cambia automáticamente a **REVIEWED** (REVISADO).

Cuando se vincula un problema a un ticket, su estado, cesionario y comentarios se sincronizan bidireccionalmente. Consulta [Sincronización bidireccional del estado entre los problemas y los tickets](#state-dual-way-sync-between-issues-and-tickets) para obtener más información sobre cómo se sincronizan el estado del problema y el estado del ticket.

## Agrupar varios problemas en un único ticket

Puedes adjuntar varios problemas de Error Tracking a un único ticket de Jira para agrupar problemas correlacionados en una única unidad de trabajo:

1. Ve al [Explorer de Error Tracking][2].
2. Haz clic en un problema para abrir el panel de problemas.
3. En el panel de problemas, en el menú desplegable **Actions** (Acciones), haz clic en **Add Jira ticket** (Añadir ticket de Jira).
4. En la pestaña **Add to Existing** (Añadir a existente), pega la URL del ticket en el que desees agrupar tus problemas.
5. Opcionalmente, accede a los ajustes de Sincronización de datos para configurar cómo deben sincronizarse los datos entre Datadog y Jira.
6. Haz clic en **Link to Issue** (Vincular a problema) para adjuntar el problema al ticket.
7. Repite estas acciones en todos los problemas que desees añadir a este grupo.

{{< img src="error_tracking/add-to-existing-ticket.png" alt="Añadir un problema de Error Tracking a un ticket existente de Jira" style="height:300px;" >}}

Cuando varios problemas están vinculados a un mismo ticket, su estado, cesionario y comentarios se sincronizan bidireccionalmente. Consulta [Sincronización bidireccional de estados entre problemas y tickets](#state-dual-way-sync-between-issues-and-tickets) para obtener más información sobre cómo se sincronizan los estados de los problemas y el estado de los tickets.

La relación entre los tickets y los problemas es una relación 1:N. Un único ticket puede estar vinculado a múltiples problemas, pero un problema solo puede estar vinculada a un único ticket de Jira.

## Sincronización bidireccional entre problemas y tickets

Si la sincronización bidireccional está activada y configurada entre los projects (proyectos) de Datadog y Jira, los estados de los problemas de Error Tracking y los tickets de Jira se reflejan. Si encuentras algún comportamiento inesperado en esta sincronización de estados, consulta la sección [Soluciar problemas](#troubleshooting) para saber cómo reparar tu configuración.

### Un único problema de Error Tracking vinculada a un único ticket de Jira

Cuando un problema de Error Tracking está vinculado a un ticket de Jira, sus estados se sincronizan bidireccionalmente. La asignación entre estos estados puede configurarse en los ajustes de Sincronización de datos de los formularios de creación de tickets o de reglas de automatización:

{{< img src="error_tracking/jira-status-mapping.png" alt="Asignar estados de problemas de Error Tracking a estados de tickets de Jira" style="width:100%;" >}}

### Varios problemas de Error Tracking vinculados a un único ticket de Jira

Cuando varios problemas de Error Tracking están vinculadas al mismo ticket de Jira, también se produce una sincronización entre sus estados, en función de la situación. Si actualizas el estado del ticket, todos los problemas vinculados se actualizan para reflejar este estado según tu asignación.

Suponiendo que tu asignación esté definida de la siguiente manera:

| Grupo de estados de Case Management | Estado del ticket de Jira |
|------------------------------|--------------------|
| `Open`                       | `To Do`            |
| `In Progress`                | `In Progress`      |
| `Closed`                     | `Done`             |

Si actualizas el estado de un problema, el estado resultante de otros problemas vinculados y del ticket de Jira sigue estas reglas:

| Estado inicial                                                      | Acción                                                 | Estado resultante                                                                                    |
|--------------------------------------------------------------------|--------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| El billete está `Done` y todos los problemas están `Resolved`.                | Actualizas un problema a `For Review`.                  | El ticket es `To Do`, pero todos los demás problemas siguen estando `Resolved`.                                      |
| El billete es `To Do` y todos los problemas están `For Review`.             | Actualizas un problema a `Resolved`.                    | El billete es `To Do`, un problema está `Resolved`, todos los demás problemas siguen estando `For Review`.              |
| El ticket es `Done` y tienes un problema no vinculado `For Review`. | Vinculas el problema `For Review` a tu ticket `Done`. | El ticket es `Done` y todos los problemas están `Resolved` (incluido el nuevo problema vinculado).             |
| El billete es `To Do` y tienes un problema no vinculado `Resolved`.  | Vinculas el problema `Resolved` a tu ticket `To Do`.  | El ticket es `To Do` y todos los problemas están `For Review` excepto el nuevo, que sigue estando `Resolved`. |

## Reglas de automatización

Puedes configurar reglas para hacer coincidir problemas específicos con paneles de Jira. Cuando un problema coincide con una regla, cualquier ticket creado manual o automáticamente para ese problema se enviará en forma predeterminada al panel especificado por la regla.

### Instalación

Para crear reglas de automatización para tus problemas de Error Tracking, necesitas uno (1) de los siguientes [permisos][1] :
- Escritura de Error Tracking
- Escritura de ajustes de Error Tracking

### Crear una regla de automatización

Para crear una regla de automatización para Jira:

1. Ve a [Configuración de Error Tracking][3], en la sección **Ticketing & Automation** (Emisión de tickets y automatización).
2. Haz clic en **New Rule** (Nueva Regla).
3. Configura la regla:
    - **Criterios de coincidencia**: Definir las condiciones que deben cumplir los problemas para activar la regla.
    - **Destino**: Selecciona la cuenta de Jira de destino y el project (proyecto) cuando se creen tickets a partir de problemas que coincidan con la regla. Selecciona el tipo de ticket que desees crear y proporciona valores para cualquier campo obligatorio del ticket.
    - **Creación automática**: Activar opcionalmente la creación automática de tickets cuando los problemas coincidan
4. Haz clic en **Save Rule** (Guardar regla).

{{< img src="error_tracking/create-jira-automation-rule.png" alt="Crear una regla de automatización de Jira" style="width:100%;" >}}

### Criterios de coincidencia

Configura reglas basadas en los siguientes atributos:

- **Servicio**: Empareja problemas a partir de servicios específicos (por ejemplo, `service:web-store`)
- **Equipo**: Empareja problemas en función de la [Propiedad del equipo de problemas][4] (por ejemplo, `team:Shopist`)

Puedes combinar varios criterios para crear reglas de enrutamiento precisas. La consulta de coincidencia de problemas admite los siguientes operadores:

- `AND`Y lógico (por ejemplo, `service:web-store AND team:Shopist`)
- `OR`O lógico (por ejemplo, `service:web-store OR team:Shopist`)
- `-`NO lógico (por ejemplo, `service:web-store -team:Shopist`)

<div class="alert alert-info">Las reglas están ordenadas. Se aplica la primera regla que coincida con un problema.</div>

### Creación automática de tickets

Al añadir una regla de automatización, puedes activar la creación automática de tickets de Jira para las problemas que coincidan con tu regla.

{{< img src="error_tracking/enable-auto-ticket-creation.png" alt="Activar la creación automática de case (incidencia)" style="height:300px;" >}}

Cuando se crea una nuevo problema en Error Tracking, se evalúan las reglas y se aplica la primera que coincida. Si la creación automática de tickets está activada en esa regla coincidente, se creará un nuevo ticket de Jira en el panel de Jira especificado en la regla y se adjuntará al problema coincidente.

## Solucionar problemas

Si experimentas comportamientos inesperados al utilizar sistemas de tickets con Error Tracking, los siguientes steps (UI) / pasos (generic) de solución de problemas pueden ayudarte a resolver el problema rápidamente. Si sigues teniendo problemas, ponte en contacto con [asistencia técnica de Datadog][5].

### Se interrumpe la sincronización entre Jira y Error Tracking

Si experimentas problemas de sincronización entre tus tickets de Jira y los correspondientes problemas de Error Tracking (como que el estado del problema no se actualiza al cerrar el ticket de Jira), comprueba que los siguientes steps (UI) / pasos (generic) estén configurados correctamente:

1. En el panel de problemas, asegúrate de que el problema esté correctamente vinculado al ticket de Jira.
2. Datadog creó automáticamente un case (incidencia) de Case Management para actuar como punto de enlace entre el problema de Error Tracking y el ticket de Jira. Puedes acceder a este case (incidencia) desde el panel de problemas, para encontrar el project (proyecto) de Case Management en el que se creó. En los ajustes de Case Management, asegúrate de que la integración de Jira esté activada para este project (proyecto) y de que estén configurados la cuenta y el panal de Jira correctos.

{{< img src="error_tracking/enable-jira-for-case-management-project.png" alt="Activa Jira para tu project (proyecto) de Case Management" style="width:100%;" >}}

3. En la configuración de Case Management, asegúrate de que la sincronización entre Case Management y Jira esté activada para este project (proyecto). Check que los campos que deseas sincronizar estén configurados para la sincronización bidireccional entre Datadog y Jira.

{{< img src="error_tracking/sync-data-between-case-management-and-jira.png" alt="Datos de la sincronización entre Case Management y Jira" style="width:100%;" >}}

4. Debes configurarse un webhook para sincronizar automáticamente las actualizaciones entre Datadog y Jira. En la configuración de Jira, check si existe este webhook. Si falta el webhook, sigue [estos steps (UI) / pasos (generic)][6] para añadirlo y reparar la sincronización entre Datadog y Jira.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/permissions/
[2]: https://app.datadoghq.com/error-tracking/
[3]: https://app.datadoghq.com/error-tracking/settings/automation/
[4]: /es/error_tracking/issue_team_ownership/
[5]: /es/help/
[6]: /es/integrations/jira/#configure-a-jira-webhook
[7]: /es/integrations/jira/#setup