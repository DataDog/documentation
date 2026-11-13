---
aliases:
- /es/service_management/incident_management/incident_settings/notification_rules/
- /es/incident_response/incident_management/incident_settings/notification_rules/
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/templates
  tag: Documentación
  text: Personalice las plantillas de mensajes
- link: /incident_response/incident_management/setup_and_configuration/variables
  tag: Documentación
  text: Referencia de variables de incidente
title: Reglas de notificación
---
## Descripción general {#overview}

Las reglas de notificación automatizadas garantizan que las partes interesadas adecuadas reciban alertas sobre sus incidentes según los criterios que usted defina. Esto elimina la carga de los responsables de incidentes y garantiza la participación oportuna de las personas adecuadas, lo que acelera el proceso de resolución. Por ejemplo, puede establecer una regla de notificación para notificar automáticamente a las partes interesadas del equipo cada vez que se declare un incidente SEV-1 o SEV-2 para `service:web-store` Y `application:purchasing` y cuando ese incidente pase por diferentes estados de progresión.

Utilice las reglas de notificación para:
 - Asegure que las partes interesadas clave siempre estén al tanto de incidentes de alta prioridad
 - Notifique a los responsables específicos cuando un servicio o equipo en particular tenga un incidente
 - Active automatizaciones mediante [webhooks][6] o [Datadog Workflows][5]

## Creación de una regla de notificación {#creating-a-notification-rule}

Para crear y modificar reglas de notificación, debe tener el permiso `Incident Notification Settings Write`.

Puede administrar las reglas de notificación en [Incident Settings Notification Rules][1], donde puede buscar, eliminar, copiar, activar/desactivar y crear reglas. 

### Desencadenadores y condiciones {#triggers-and-conditions}

En **Cuando un incidente es...**, seleccione un desencadenador y defina las condiciones de la regla:

| Condición                              | Cuando la regla envía una notificación                                                                                                                                                                                                                     |
|--------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Declared`                           | Envía una notificación cuando se declara un incidente y cumple con las condiciones definidas. Si no se definen condiciones, envía una notificación para cada declaración de incidente.                                                                              |
| `Declared or attributes are updated` | Envía una notificación cuando se declara o actualiza un incidente de manera que cumpla con las condiciones. También envía una notificación cuando cualquier campo enumerado en **Volver a notificar sobre actualizaciones en...** se cambia y el incidente ya cumple con las condiciones. Las condiciones se unen mediante `AND` entre campos y `OR` dentro de cada campo. |




Por ejemplo, considere una regla que tiene las condiciones `severity:SEV-1`, `severity:SEV-2` y `team:shopping`. La regla también está configurada para volver a notificar sobre cambios en los campos `state` y `service`. Esta regla envía una notificación cuando usted:

* Agregue el equipo `shopping` al campo `teams` del incidente.
* Cambie la `severity` del incidente a `SEV-1` o `SEV-2` en lugar de otra gravedad.
* Cambie el campo `state` **si** el incidente ya tiene el equipo `shopping` **y** es `SEV-1` o `SEV-2`.
* Cambie el campo `service` **si** el incidente ya tiene Teams `shopping` **y** es `SEV-1` o `SEV-2`.

### Destinatarios de la notificación {#notification-recipients}

Al definir los destinatarios de una regla de notificación, puede usar identificadores `@` para cualquiera de las [integraciones de notificación compatibles][2] de Datadog. Esto le permite definir reglas de notificación que notifican a muchos tipos de destinos, incluidos:

| Tipo de notificación      | Identificador                         | Cómo usar                                                                                                                                                                                                                                 |
|------------------------|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Correos electrónicos**             | `@<email>`                     | Escriba `@` seguido de cualquier dirección de correo electrónico válida. Si es el correo electrónico de un usuario de Datadog, el usuario se agrega automáticamente como responsable de incidentes cuando la regla envía una notificación. Para incidentes privados, el usuario obtiene acceso.                            |
| **Dispositivos móviles**     | *(Seleccionado desde la interfaz de usuario)*           | Seleccione el nombre del usuario con **(Notificación push móvil)** El usuario debe tener habilitadas las notificaciones en la [aplicación móvil de Datadog][3] para que aparezca esta opción.                                                                                                      |
| **Slack channels**     | `@slack-<channel>`<br>`@incident-slack-channel`            | Utilice un identificador `@slack-`. Para notificar al canal de incidentes de Slack, utilice `@incident-slack-channel`.                                                                                                                                                |
| **On-Call Teams**      | `@oncall-<team>`               | Utilice un identificador `@oncall-` para avisar a un [Datadog on-call team][7].                                                                                                                                                                                            |
| **Microsoft Teams**    | `@teams-<channel>`             | Utilice un identificador `@teams-` para notificar a un canal de Microsoft Teams. No existe un equivalente de Microsoft Teams para `@incident-slack-channel`, por lo que un identificador `@teams-` no puede dirigirse al canal creado automáticamente para un incidente. Consulte [destinos de notificación de Microsoft Teams][8].                                                                                                                                                                                 |
| **Webhooks**           | `@webhook-<name>`              | Utilice un identificador `@webhook-` para activar un [webhook][6]. Debe definir el webhook con un tipo de carga útil de **incidente**.                                                                                                                          |
| **Workflows**          | `@workflows-<workflow_name>`   | Utilice un identificador `@workflows-` para activar un [Datadog Workflow][5]. Debe publicar el flujo de trabajo con un tipo de activador de **incidente**.                                                                                                             |


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings#Rules
[2]: /es/monitors/notifications/?tab=is_alert#configure-notifications-and-automations
[3]: /es/mobile/
[4]: /es/incident_response/on-call/
[5]: /es/actions/workflows/
[6]: /es/integrations/webhooks/
[7]: /es/incident_response/on-call/
[8]: /es/incident_response/incident_management/setup_and_configuration/integrations/microsoft_teams/#notification-targets