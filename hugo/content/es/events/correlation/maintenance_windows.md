---
aliases:
- /es/service_management/events/correlation/maintenance_windows/
further_reading:
- link: events/correlation/
  tag: Documentación
  text: Obtenga información sobre la correlación de eventos
title: Ventanas de mantenimiento
---
## Descripción general {#overview}
Datadog Event Management admite ventanas de mantenimiento para suprimir las notificaciones de elementos de trabajo durante el mantenimiento programado del sistema. Un elemento de trabajo que coincida con una condición de mantenimiento y ocurra dentro de la ventana de tiempo de mantenimiento se archivará automáticamente.

## Crear una Ventana de mantenimiento {#create-a-maintenance-window}
<div class="alert alert-danger">Debe tener permisos de Escritura en la Configuración compartida de gestión de trabajo (cases_shared_settings_write). Para obtener más información, consulte <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#case_management">Permisos de rol de Datadog</a>.</div>

Para crear una [Ventana de mantenimiento][2]:
1. Vaya a {{< ui >}}Event Management Settings{{< /ui >}}.
1. Seleccione {{< ui >}}Maintenance Windows{{< /ui >}} junto a **Atributos de elemento de trabajo** en la barra de navegación izquierda.
1. Haga clic en {{< ui >}}New Maintenance Window{{< /ui >}} en la parte superior derecha.
1. Ingrese un nombre para la Ventana de mantenimiento.
1. Establezca las condiciones para los elementos de trabajo que deben verse afectados por esta ventana de mantenimiento mediante etiquetas o atributos. De forma predeterminada, los elementos de trabajo de Event Management heredan las etiquetas de las alertas con las que se correlacionan.
1. Seleccione las horas de inicio y finalización de la Ventana de mantenimiento.
1. Revise los detalles de la Ventana de mantenimiento y haga clic en {{< ui >}}Save{{< /ui >}}.

Después de guardar, su Ventana de mantenimiento se agregará a la lista de Ventanas de mantenimiento, donde podrá revisar sus detalles, actualizarla seleccionando su fila o eliminarla seleccionando el icono de papelera a la derecha de la fila.

## Sincronice las Ventanas de mantenimiento con los cambios de ServiceNow {#sync-maintenance-windows-with-servicenow-changes}

Para sincronizar las Ventanas de mantenimiento con los cambios de ServiceNow de modo que sus cambios de ServiceNow creen, actualicen o eliminen Ventanas de mantenimiento de elementos de trabajo:
1. Consulte [Reenviar solicitudes de cambio a Datadog][3] y siga los pasos para ingerir los cambios de ServiceNow.
1. Vaya a {{< ui >}}Event Management Settings{{< /ui >}}.
1. Seleccione {{< ui >}}Maintenance Windows{{< /ui >}} junto a **Atributos de elemento de trabajo** en la barra de navegación izquierda.
1. Haga clic en {{< ui >}}Sync from ServiceNow{{< /ui >}} en la parte superior derecha
1. Opcionalmente, defina un filtro para los cambios de ServiceNow que deberían crear, actualizar o eliminar ventanas de mantenimiento.
1. Establezca las condiciones para los elementos de trabajo que deben verse afectados por esta ventana de mantenimiento mediante etiquetas o atributos. Puede hacer referencia dinámicamente a un valor de sus cambios de ServiceNow anteponiendo `$` al atributo.
1. Establezca los campos de fecha y hora de cambio de ServiceNow que deben utilizarse para las horas de inicio y finalización de la ventana de mantenimiento.


[1]: https://docs.datadoghq.com/es/account_management/rbac/permissions/#case_management
[2]: https://app.datadoghq.com/event/settings/maintenance-windows
[3]: https://docs.datadoghq.com/es/integrations/servicenow/?tab=changerequesteventforwarding#forward-change-request-events-to-datadog