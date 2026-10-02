---
aliases:
- /es/service_management/incident_management/integrations/slack/
- /es/incident_response/incident_management/integrations/slack/
description: Administre incidentes de Datadog directamente desde Slack.
further_reading:
- link: integrations/slack/
  tag: Documentación
  text: Instale la Slack Integration
- link: https://www.datadoghq.com/blog/slack-incident-management/
  tag: Blog
  text: Administre incidentes sin problemas con la integración de Datadog para Slack
- link: https://www.datadoghq.com/blog/datadog-incident-response-ai-features/
  tag: Blog
  text: Acelere las investigaciones con IA en Datadog Incident Response
- link: https://app.datadoghq.com/integrations/slack
  tag: Aplicación
  text: Mosaico de integración de Slack en la aplicación
title: Integre Slack con Datadog Incident Management
---
## Descripción general {#overview}

Slack es una plataforma de mensajería y colaboración ampliamente utilizada por los equipos para comunicarse en tiempo real. La integración de Datadog con Slack conecta sus flujos de trabajo de respuesta a incidentes directamente con Slack, para que los equipos puedan declarar, administrar y resolver incidentes sin salir de su entorno de chat.

Con la integración, usted puede:

- Responda más rápido declarando incidentes de Datadog directamente desde Slack.
- Cree automáticamente canales de Slack para colaborar cuando se declaren incidentes de Datadog.
- Ejecute su respuesta a incidentes en Slack. Por ejemplo, avise a los equipos de guardia, asigne roles de respuesta o actualice la gravedad.

La documentación de la integración de Slack está organizada en torno al ciclo de vida típico del uso de Slack con Incident Management:

1. [**Instale y conecte Slack**](#setup): Configure la integración entre su espacio de trabajo de Slack y Datadog.
2. [**Declare incidentes**](#declaring-incidents-from-slack): Aprenda a declarar incidentes mediante comandos de Slack o acciones de mensajes.
3. [**Administre incidentes desde canales de incidentes**](#incident-channels): Utilice canales de Slack dedicados con comandos, sincronización y automatizaciones.
4. [**Configure notificaciones globales**](#global-slack-notifications): Mantenga a su organización informada con actualizaciones automáticas.
5. **[Consulte las opciones de configuración de Slack](#additional-slack-configurations) y los [comandos de Slack](#slack-incident-commands)**: Explore las opciones de configuración detalladas y vea la lista completa de comandos de Slack disponibles para adaptar y optimizar sus flujos de trabajo de respuesta a incidentes.

## Requisitos previos {#prerequisites}

Instale la integración a través del [mosaico de integración de Slack][1] con los [ámbitos de OAuth][6] adecuados. Para obtener más información, consulte la documentación de [integración de Slack][2].

Una vez instalada la integración, navegue a [**Incidents** > **Settings** > **Integrations**][3] para habilitar las capacidades de Slack para Incident Management.

## Declarar incidentes desde Slack {#declaring-incidents-from-slack}

Cuando conecta un espacio de trabajo de Slack a una organización de Datadog, los usuarios en el espacio de trabajo pueden usar atajos de Slack relacionados con Incident Management.

Puede declarar un incidente con el siguiente comando de barra diagonal:

```
/datadog incident
```

Para declarar un incidente desde un mensaje de Slack, pase el cursor sobre el mensaje, haga clic en **Más acciones** (los tres puntos verticales) y seleccione **Declarar incidente**. Datadog publica un mensaje en el hilo del mensaje confirmando la creación del incidente.

De forma predeterminada, solo los usuarios de Slack conectados a una organización de Datadog pueden declarar incidentes. Los usuarios de Slack pueden conectarse a una organización de Datadog ejecutando `/datadog connect`.

Para permitir que cualquier usuario de Slack en el espacio de trabajo declare incidentes, habilite **Permitir que los usuarios de Slack declaren incidentes sin una cuenta de Datadog conectada** en la configuración de Incident Management.

## Canales de incidentes {#incident-channels}

Puede configurar Incident Management para crear automáticamente un canal de Slack dedicado para cada incidente que cumpla con los criterios que usted defina. Luego, sus encargados de la respuesta pueden gestionar el incidente directamente en Slack desde el canal del incidente.

Para usar canales de incidentes, vaya a **[Incident Response > Incident Management > Settings > Integrations][3]** y habilite **Crear canales de Slack para incidentes**.

La **plantilla de nombre de canal** que usted defina determina cómo Datadog nombra los canales de incidentes que crea. Para obtener descripciones completas, consulte [Variables disponibles solo en plantillas de nombre de canal][7].


### Sincronización de mensajes (duplicación de Slack) {#message-syncing-slack-mirroring}

Después de habilitar la creación automática de canales, puede configurar Incident Management para sincronizar mensajes entre un canal de Slack de incidentes y la línea de tiempo del incidente en Datadog.

Para habilitar la sincronización, habilite **Enviar mensajes del canal de Slack a la línea de tiempo del incidente** en la configuración de Incident Management y, luego, seleccione una de las siguientes opciones:

* **Duplicar todos los mensajes en tiempo real**: Datadog sincroniza todos los mensajes publicados por los usuarios de Slack en el canal del incidente.
* **Enviar mensaje cuando se añade 📌 como reacción**: Datadog sincroniza los mensajes solo cuando los usuarios de Slack reaccionan a ellos con pushpins (📌).

Para ambas opciones, el autor de un mensaje no necesita estar conectado a la organización de Datadog para que Datadog sincronice el mensaje. Para fijar mensajes, la persona que fija **sí** necesita estar conectada a la organización de Datadog para que el mensaje fijado se sincronice.

En organizaciones con facturación de Incident Management basada en el uso:

* Crear un mensaje que se sincroniza con Datadog **no** lo convierte en un usuario facturable para el mes actual.
* Fijar un mensaje que luego se sincroniza **sí** lo convierte en un usuario facturable.

En organizaciones con facturación de Incident Management basada en asientos:

* Usted **no** necesita un seat para que Datadog sincronice sus mensajes con Incident Management.
* Cuando fija un mensaje, **debe** tener un seat para que Datadog sincronice el mensaje que fijó.

### Comandos de Slack en el canal de incidentes {#slack-commands-in-the-incident-channel}

En un canal de Slack de incidentes, puede ejecutar comandos de Slack para modificar el estado y la gravedad del incidente, asignar roles de respuesta, avisar a los equipos de guardia y más.

Para obtener una lista completa de los comandos de Slack, consulte [Comandos de Slack](#slack-commands).

### Otras opciones de configuración del canal de incidentes {#other-incident-channel-configuration-options}

Acceda a todas las opciones de configuración de Slack en Incident Management a través de la página [**Incidents** > **Settings** > **Integrations**][3].

| Funcionalidad                                                   | Descripción y notas                                                                                                                             |
|-----------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **Enviar mensajes de la cronología del incidente a Slack**              | Enviar automáticamente las actualizaciones de la cronología del incidente desde Datadog al canal de Slack.<br><br>Mantiene a los participantes del canal sincronizados con las actualizaciones de Datadog. |
| **Añadir enlaces importantes a los marcadores del canal**              | Publicar enlaces relacionados con el incidente en los marcadores del canal de Slack.<br><br>Proporciona un acceso conveniente a los recursos.                                     |
| **Añadir miembros del equipo automáticamente**                        | Cuando se añade un equipo de Datadog al incidente, sus miembros se añaden al canal de Slack.                                                       |
| **Enviar actualizaciones del incidente al canal de Slack**            | Actualizar el tema del canal con el estado del incidente, la gravedad y el comandante del incidente.                                                                |
| **Enviar una notificación de Slack cuando comience una reunión**       | Notificar al canal de Slack cuando se inicie una reunión, incluyendo a los participantes y un enlace para unirse.<br><br>Proporciona un acceso conveniente a las llamadas de incidentes.     |
| **Activar Bits AI en canales de Slack de incidentes**           | Habilitar funciones de IA que utilizan el contexto de incidentes de Datadog.<br><br>Se aplica a todos los tipos de incidentes en el espacio de trabajo de Slack seleccionado.                |
| **Archivar automáticamente los canales de Slack después de la resolución** | Archivar los canales de Slack de incidentes una vez que el incidente esté resuelto.<br><br>Ayuda a reducir el desorden en los canales.                                             |
| **Personalizar las acciones de Slack para incidentes**                       | Personalizar qué acciones aparecen en la bandeja de acciones de incidentes para cada estado.<br><br>Aumenta la visibilidad de las acciones comunes.                      |

## Canal global para actualizaciones de incidentes {#global-channel-for-incident-updates}

Puede configurar Incident Management para publicar automáticamente actualizaciones sobre incidentes en un canal de Slack seleccionado. Para habilitar esto:

1. En Datadog, navegue a **[Incident Response > Incident Management > Settings > Integrations][3]**.
1. En la sección de Slack, habilite **Enviar todas las actualizaciones de incidentes a un canal global**.
1. Seleccione el espacio de trabajo de Slack y el canal de Slack donde desea que se publiquen las actualizaciones de incidentes.

Datadog notifica automáticamente al canal seleccionado sobre cualquier incidente recién declarado, así como sobre cambios en los estados, la gravedad y el comandante del incidente.

Internamente, esta función es una [regla de notificación de incidentes][5] integrada y oculta. Si desea personalizar el mensaje o sus activadores, desactívela y defina su propia regla de notificación.

## Comandos de Slack {#slack-commands}

Puede visualizar la lista completa de comandos de Slack disponibles en cualquier momento escribiendo `/datadog` (o `/dd`) en Slack para abrir el modal de comandos, explorar y ejecutar cualquier acción de Datadog, o `/dd help` para visualizar esas opciones como una lista. Para abrir la bandeja de acciones para acciones comunes de gestión de incidentes, escriba `/dd shortcuts`.

### Comandos globales (ejecutar en cualquier lugar) {#global-commands-run-anywhere}

| Comando | Descripción |
| ------- | ----------- |
| `/datadog incident` | Declarar un nuevo incidente. |
| `/datadog incident test` | Declare un nuevo incidente de prueba (si los incidentes de prueba están habilitados para el tipo de incidente). |
| `/datadog incident list` | Liste todos los incidentes abiertos (activos y estables). |

### Comandos del canal de incidentes {#incident-channel-commands}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
| Comando | Descripción |
| ------- | ----------- |
| `/datadog` | Abra el modal de comandos para ver todas las acciones de Datadog disponibles. |
| `/datadog shortcuts` | Abra la bandeja de acciones de incidentes para realizar acciones comunes. |
| `/datadog help` | Muestre un mensaje efímero que enumere todos los comandos de Slack disponibles. |
| `/datadog incident update` | Actualice un atributo para el incidente, como el estado o la gravedad. |
| `/datadog incident notify` | Notifique a los `@`-handles sobre el incidente. |
| `/datadog incident private` | Haga que el incidente sea privado (si los incidentes privados están habilitados). |
| `/datadog incident public` | Haga que el incidente sea público. |
| `/datadog incident responders` | Administre el equipo de respuesta del incidente (agregue responsables y asigne roles de respuesta). |
| `/datadog task` | Cree una tarea de incidente. |
| `/datadog task list` | Liste las tareas de incidente existentes. |
| `/datadog followup` | Cree un seguimiento para el incidente. |
| `/datadog followup list` | Visualice y administre los seguimientos existentes para el incidente. |
| `/datadog incident summary` | Obtenga un resumen del incidente generado por IA que solo sea visible para usted. |
{{< /site-region >}}
{{< site-region region="gov,gov2" >}}
| Comando | Descripción |
| ------- | ----------- |
| `/datadog` | Abra el modal de comandos para ver todas las acciones de Datadog disponibles. |
| `/datadog shortcuts` | Abra la bandeja de acciones de incidentes para realizar acciones comunes. |
| `/datadog help` | Muestre un mensaje efímero que enumere todos los comandos de Slack disponibles. |
| `/datadog incident update` | Actualice un atributo para el incidente, como el estado o la gravedad. |
| `/datadog incident notify` | Notifique a los `@`-handles sobre el incidente. |
| `/datadog incident private` | Haga que el incidente sea privado (si los incidentes privados están habilitados). |
| `/datadog incident public` | Haga que el incidente sea público. |
| `/datadog incident responders` | Administre el equipo de respuesta del incidente (agregue responsables y asigne roles de respuesta). |
| `/datadog task` | Cree una tarea de incidente. |
| `/datadog task list` | Liste las tareas de incidente existentes. |
| `/datadog followup` | Cree un seguimiento para el incidente. |
| `/datadog followup list` | Visualice y administre los seguimientos existentes para el incidente. |
{{< /site-region >}}

### Botones de la bandeja de acciones {#action-tray-buttons}

Datadog publica la bandeja de acciones directamente en el canal de Slack del incidente cuando cambia el estado, para que los responsables puedan realizar acciones comunes, como actualizar la gravedad o el estado, sin tener que escribir un comando. También puede abrir la bandeja de acciones escribiendo `/dd shortcuts` en Slack.

Los siguientes botones están disponibles en la bandeja de acciones. Los tipos de incidentes se inicializan con estos botones predeterminados. Para personalizar qué botones aparecen y su orden para cada estado de incidente, vaya a **Incidentes** > **Settings** > [**Integrations**][3] > **Slack Settings** y configure **Incident Slack Actions**.

| Botón                              | Descripción                                                             | Predeterminado activo | Predeterminado estable | Predeterminado resuelto |
|--------------------------------------|---------------------------------------------------------------------------|:---:|:---:|:---:|
| ⚙️ **Edit Incident**                |  Actualice estado, gravedad, impacto y todos los demás atributos | {{< X >}} | {{< X >}} |   |
| 🧑‍🚒 **Edit Responders**             | Asignar roles y agregar compañeros de equipo al incidente | {{< X >}} |   |   |
| 🔍 **View All Actions**             | Abrir la lista completa de acciones de Slack disponibles para este incidente | {{< X >}} | {{< X >}} | {{< X >}} |
| 🏠 **View Web App**                 | Abrir el incidente en Datadog Incident Management | {{< X >}} | {{< X >}} | {{< X >}} |
| ☎️ **Page On-Call**                 | Avisar a un equipo sobre el incidente en curso usando su servicio preferido | {{< X >}} |   |   |
| 🔔 **Notify**                       | Notificar a las partes interesadas sobre un incidente por correo electrónico, notificación push o servicios |   | {{< X >}} | {{< X >}} |
| ▶️ **Create/Join Zoom**             | Iniciar una reunión nueva o unirse si ya existe una | {{< X >}} |   |   |
| ▶️ **Create/Join Google Meet**      | Iniciar una reunión nueva o unirse si ya existe una | {{< X >}} |   |   |
| ▶️ **Run Workflow**                 | Seleccionar y ejecutar flujos de trabajo predefinidos para el incidente | {{< X >}} |   |   |
| 🟨 **Set to Stable**                | Marcar el incidente como estable después de mitigar el impacto | {{< X >}} |   |   |
| ✅ **Resolve Incident**             | Marcar el incidente como resuelto |   | {{< X >}} |   |
| ✨ **Investigate with Bits AI**     | Usar Bits AI para investigar el incidente | {{< X >}} |   |   |
| 📋 **Create Follow-Up**             | Crear tareas de seguimiento identificadas durante la respuesta al incidente |   | {{< X >}} | {{< X >}} |
| 📋 **List Follow-Ups**              | Ver y realizar seguimiento de las tareas de seguimiento para el incidente |   |   | {{< X >}} |
| 📝 **Create/View Postmortem**       | Crear o ver el postmortem para el incidente |   |   | {{< X >}} |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/slack/
[2]: /es/integrations/slack/?tab=datadogforslack
[3]: https://app.datadoghq.com/incidents/settings?section=integrations
[4]: /es/integrations/jira/
[5]: /es/incident_response/incident_management/setup_and_configuration/notification_rules/
[6]: /es/integrations/slack/?tab=datadogforslack#permissions
[7]: /es/incident_response/incident_management/setup_and_configuration/variables/#variables-available-only-in-channel-name-templates