---
aliases:
- /es/incident_response/case_management/approvals/
further_reading:
- link: /incident_response/work_management/automation_rules
  tag: Documentación
  text: Reglas de automatización de elementos de trabajo
- link: /incident_response/work_management
  tag: Documentación
  text: Work Management
title: Aprobaciones de elementos de trabajo
---
## Descripción general {#overview}

Las aprobaciones de elementos de trabajo le permiten solicitar la autorización de uno o más miembros del equipo antes de realizar una acción en un elemento de trabajo, lo que respalda los flujos de trabajo de gestión de cambios. Esta función está disponible en todos los tipos de trabajo estándar y personalizados. Toda la actividad de aprobación se rastrea en la línea de tiempo de actividad del elemento de trabajo.

## Solicitud de aprobaciones {#requesting-approvals}

Para solicitar la aprobación de un elemento de trabajo:
1. Desde un elemento de trabajo, haga clic en el icono **More Options** en el lado derecho.
1. Seleccione **Request approval**.
1. Utilice el menú desplegable **Add reviewer** para seleccionar uno o más usuarios.
1. (Opcional) Ingrese un mensaje en el campo **Describe your request**.
1. Haga clic en **Request**.

**Nota**: La solicitud no se puede editar después de que algún revisor haya respondido.

Después de solicitar la aprobación, aparece una sección de **Reviewers** en el panel de detalles del elemento de trabajo. Se muestra el nombre de cada revisor y su estado actual (Requested, Approved, or Declined). Para modificar la lista de Reviewers, haga clic en el icono de edición junto a **Reviewers**. Todos los eventos de aprobación se registran en la línea de tiempo de actividad del elemento de trabajo.

### Notifications {#notifications}

- Los aprobadores reciben una notificación por correo electrónico cuando se solicita su aprobación.
- El solicitante recibe una notificación cada vez que se recibe una aprobación o un rechazo.

### Permisos{#permissions}

| Action | Required permission |
|---|---|
| Request approval on a work item | Cases Write |
| Be added as an approver on a work item | Cases Read |
| Approve or decline a work item | Cases Read |

Para obtener más información, consulte [Datadog Role Permissions][2].

## Reglas de automatización {#automation-rules}

Puede activar reglas de automatización de elementos de trabajo basadas en eventos de aprobación de elementos de trabajo. Por ejemplo, puede activar un flujo de trabajo para actualizar automáticamente el estado de un elemento de trabajo una vez que se reciban todas las aprobaciones.

Los activadores disponibles incluyen:
- La primera, cada una o todas las aprobaciones que recibe un elemento de trabajo
- El primer o cada rechazo que recibe un elemento de trabajo

Consulte [Reglas de automatización de elementos de trabajo][1] para obtener instrucciones de configuración.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/incident_response/work_management/automation_rules
[2]: /es/account_management/rbac/permissions/#case-and-incident-management