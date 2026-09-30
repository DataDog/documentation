---
aliases:
- /es/service_management/incident_management/integrations/google_chat/
- /es/incident_response/incident_management/integrations/google_chat/
description: Gestiona incidentes de Datadog directamente desde Google Chat.
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/integrations
  tag: Documentación
  text: Configuración de integraciones para incidentes
- link: /integrations/google-hangouts-chat
  tag: Documentación
  text: Integración con Google Chat
title: Integración del chat de Google con Datadog Incident Management
---

## Información general

La integración de Google Chat para Datadog Incident Management conecta tus flujos de trabajo de respuesta a incidentes directamente con Google Chat. Cuando tu equipo declara un incidente de Datadog, la integración crea automáticamente un espacio de Google Chat para la colaboración.

## Requisitos previos

Instala la integración a través del [cuadro de la integración con Google Chat][1]. Un administrador de Google Workspace debe configurar los permisos de usuario delegados, y definir un público de destino y añadirlo al cuadro de la integración. Para obtener más información, consulta la documentación de la [integración con Google Chat][2].

## Declarar incidentes desde Google Chat

Después de conectar un espacio de trabajo de Google Chat a una organización de Datadog, los usuarios pueden gestionar incidentes mediante comandos slash de Google Chat.

Solo los usuarios de Google Chat que estén conectados a una organización Datadog pueden declarar incidentes. Una vez que un administrador configura la integración con Google Chat, los usuarios conectan sus cuentas de Google Chat a Datadog ejecutando `/dd_account`.

Para declarar un incidente, ejecuta:
```
/dd_incident
```

## Espacios para incidentes

Puedes configurar Incident Management para crear automáticamente un espacio exclusivo de Google para cada incidente que cumpla los criterios que definas. A continuación, tus destinatarios pueden gestionar el incidente directamente en Google Chat desde el espacio para incidentes.

Para utilizar los espacios para incidentes:

1. En Datadog, ve a **[Incident Response > Incident Management > Settings > Integrations > Google Chat (Respuesta a incidentes > Incident Management > Configuración > Integraciones > Google Chat)][3]** y activa **Automatically create Google Chat spaces for incidents** (Crear automáticamente espacios de Google Chat para incidentes).

2. Selecciona una **Organización** del menú desplegable. Si no ves ninguna opción, ponte en contacto con tu administrador de Google Workspace para conectar tu organización de Google a Datadog.
3. Selecciona un **Público de destino** del menú desplegable. **Default** (Predeterminado) es el público de destino predeterminado definido por el administrador de Google Workspace, que puede ser un grupo de público de destino privado o público. Ponte en contacto con tu administrador de Google Workspace si tienes dudas.

4. La **plantilla de nombres de canales** que definas determina cómo Datadog nombra los canales para incidentes que crea. Las siguientes variables están disponibles en las plantillas de nombres de canales:
   * `{{public_id}}`: Identificador numérico del incident (incidente)
   * `{{title}}`: título del incident (incidente)
   * `{{created}}`: Fecha de creación del incidente en formato `MM_DD_YYYY`
   * `{{yyyy}}`: año de creación de cuatro dígitos del incident (incidente)
   * `{{mm}}`: mes de creación de dos dígitos del incident (incidente)
   * `{{dd}}`: día de creación de dos dígitos del mes del incident (incidente)
   * `{{severity}}`: Gravedad del incidente
   * `{{random_adjective}}`: Adjetivo aleatorio
   * `{{random_noun}}`: Sustantivo aleatorio
   * `{{slug}}`: Slug (cuando la fuente del slug está configurada como `servicenow`, se mostrará el número de registro de ServiceNow)

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/google-hangouts-chat
[2]: /es/integrations/google-hangouts-chat/
[3]: https://app.datadoghq.com/incidents/settings?section=integrations