---
description: Utilice las acciones de Slack para gestionar incidentes, On-Call, monitores,
  Dashboard, flujos de trabajo, formularios y cuentas directamente desde un espacio
  de trabajo de Slack con la aplicación de Datadog instalada.
further_reading:
- link: /integrations/slack/?tab=datadogforslack
  tag: Documentación
  text: Integración de Slack
title: Acciones de Slack
---
## Descripción general {#overview}

Las acciones de Slack están disponibles en cualquier espacio de trabajo de Slack que tenga instalada la aplicación de Datadog. Escriba `/dd` en el espacio de trabajo para abrir una bandeja de acciones que enumera todas las acciones disponibles. Alternativamente, escriba el comando completo directamente.

## Incidentes {#incidents}
Utilice los siguientes comandos para la navegación de incidentes. Todos los comandos pueden usar `/dd in` como alias para `/dd incident`. Para obtener más detalles, consulte [Integrate Slack with Datadog Incident Management][2].

| Comando | Descripción|
| ------------------ | ---------- |
| `/dd in` o `/dd incident` | Declarar un incidente.|
| `/dd in test` | Declarar un incidente de prueba.|
| `/dd in update` o `/dd in edit`| Actualizar el título, el estado, la gravedad y los atributos del incidente.|
| `/dd in responders`| Gestionar el equipo de respuesta del incidente.|
| `/dd in investigate` | Activar Bits Investigation. |
| `/dd in summary` | Generar el resumen del incidente con IA. No disponible en las regiones Gov y Gov2.|
| `/dd in notify` | Notificar a los @-handles sobre el incidente. |
| `/dd in list` | Listar incidentes abiertos.|
| `/dd in private`| Archive el canal actual, cree un canal privado y agregue a todos los respondedores existentes.|
| `/dd in public` | Haga que el incidente y su cronología sean visibles para cualquier persona con permisos de lectura de incidentes. |
| `/dd followup` | Cree un nuevo seguimiento.|
| `/dd followup list`  | Listar seguimientos de incidentes.|
| `/dd task` | Cree una tarea de incidente.|
| `/dd task list` | Listar tareas de incidente.|
| `/dd shortcuts` | Visualice las acciones de incidente.|

## On-Call {#on-call}
Utilice los siguientes comandos para On-Call. Para obtener más detalles, consulte [Páginas de On-Call][3].

| Comando | Descripción|
| ------------------ | ---------- |
| `/dd page` | Envíe una notificación a un equipo On-Call.|
| `/dd shifts`| Vea sus próximos turnos On-Call.|
| `/dd override`| Solicite a alguien que cubra un turno On-Call. |

## Seguimientos {#monitors}
Utilice los siguientes comandos para Monitors. Para obtener más información sobre cómo agregar Slack a Monitors, consulte [Monitor Notifications][4].

| Comando | Descripción|
| ------------------ | ---------- |
| `/dd monitors` | Listar Monitors que están actualmente en alerta.|


## Dashboard {#dashboard}
Utilice los siguientes comandos para [Dashboards][5].

| Comando | Descripción|
| ------------------ | ---------- |
| `/dd dashboard` | Comparta un widget de Dashboard en este canal.|


## Flujos de trabajo {#workflows}
Utilice los siguientes comandos para Workflows. Para obtener más información sobre el uso de Slack en Workflows, consulte [Trigger a workflow][6].

| Comando | Descripción|
| ------------------ | ---------- |
| `/dd workflow` | Ejecute un flujo de trabajo de automatización.|


## Forms {#forms}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">
La acción de Slack <strong>Share a Form</strong> no es compatible en el {{< region-param key="dd_site_name" >}} sitio.
</div>
{{% /site-region %}}

Utilice los siguientes comandos para Forms. Para obtener más información, consulte [Forms][8].

| Comando | Descripción|
| ------------------ | ---------- |
| `/dd`, luego seleccione **Share a Form** | Busque un formulario de Datadog y compártalo en este canal, donde los destinatarios pueden completarlo en Slack o abrirlo en Datadog. |


## Accounts {#accounts}
Utilice los siguientes comandos para [gestión de cuentas][7].

| Comando | Descripción|
| ------------------ | ---------- |
| `/dd accounts` | Administre sus cuentas de Datadog vinculadas. |


[1]: /es/integrations/slack/?tab=datadogforslack
[2]: /es/incident_response/incident_management/setup_and_configuration/integrations/slack/#slack-commands
[3]: /es/incident_response/on-call/pages/#through-slack
[4]: /es/monitors/notify/#notification-recipients
[5]: /es/dashboards/
[6]: /es/actions/workflows/trigger/#slack-triggers
[7]: /es/account_management/
[8]: /es/actions/forms/