---
aliases:
- /es/service_management/incident_management/integrations/microsoft_teams/
- /es/incident_response/incident_management/integrations/microsoft_teams/
description: Integre Microsoft Teams con Datadog Incident Management para automatizar
  la creación de canales de incidentes, sincronizar mensajes y colaborar con su equipo
  directamente dentro de Microsoft Teams.
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/integrations
  tag: Documentación
  text: Configuración de Integrations de incidentes
- link: /integrations/microsoft-teams
  tag: Documentación
  text: Integración con Microsoft Teams
- link: https://www.datadoghq.com/blog/datadog-incident-response-ai-features/
  tag: Blog
  text: Acelere las investigaciones con IA en Datadog Incident Response
title: Integre Microsoft Teams con Datadog Incident Management
---
## Descripción general {#overview}

La integración de Microsoft Teams para Datadog Incident Management le permite declarar y gestionar incidentes, crear automáticamente canales de incidentes, sincronizar mensajes con líneas de tiempo y mantener a su equipo informado, todo desde Microsoft Teams.

## Requisitos previos {#prerequisites}

Para usar las funciones de Microsoft Teams de Incident Management, primero debe [instalar la integración de Microsoft Teams para Datadog][1] y conectar su cuenta de Microsoft Teams a su cuenta de Datadog.

Después de la instalación, vaya a **[Incident Response > Incident Management > Settings > Integrations][2]** para configurar las funciones de Microsoft Teams para Incident Management.

## Canales de incidentes {#incident-channels}

### Creación automática de canales {#automatic-channel-creation}

Puede configurar Incident Management para crear automáticamente un canal de Microsoft Teams para cada incidente o para los incidentes que cumplan con los criterios que usted defina. Para configurar la creación automática de canales de incidentes:

1. Vaya a [**Settings > Integrations**][2] y seleccione **Microsoft Teams**.
2. En el menú desplegable **Tenant**, seleccione su tenant de Microsoft Teams conectado.
3. Active **Automatically create a Microsoft Teams channel for every incidente**.
4. Seleccione el Teams en el que desea crear automáticamente nuevos canales.
5. Guarde su configuración.

Después de habilitar esta automatización, puede definir una **plantilla de nombre de canal** que Datadog seguirá al crear el canal. Para obtener descripciones completas, consulte [Variables disponibles solo en plantillas de nombre de canal][6].

### Sincronización de mensajes de canal {#channel-message-syncing}

Puede configurar Incident Management para enviar todos los mensajes del canal de Microsoft Teams del incidente a la línea de tiempo del incidente. Para habilitarlo, active **Enviar automáticamente los mensajes del canal de Microsoft Teams a la línea de tiempo del incidente**.

El autor de un mensaje sincronizado no necesita una licencia de Incident Management o Incident Response para que el mensaje se registre. En organizaciones con facturación basada en el uso para Incident Management, el autor no se cuenta como un usuario activo mensual.

### Archivado automático de canales {#automatic-channel-archiving}

Puede configurar Incident Management para archivar automáticamente un canal de incidentes después de que el incidente se resuelva.

## Canal global para actualizaciones de incidentes {#global-channel-for-incident-updates}

Utilice un canal de actualizaciones de incidentes para proporcionar a sus partes interesadas visibilidad en toda la organización sobre el estado de todos los incidentes directamente desde Microsoft Teams.
1. Vaya a [**Settings > Integrations**][2] y seleccione **Microsoft Teams**.
1. En la integración de Microsoft Teams, habilite **Enviar todas las actualizaciones de incidentes a un canal global**.
1. Seleccione el Teams y el canal donde desea que se publiquen las actualizaciones del incidente.

Datadog notifica automáticamente al canal seleccionado sobre cualquier incidente recién declarado, así como sobre cambios en los estados, la gravedad y el comandante del incidente.

Para personalizar este comportamiento, desactive esta configuración y [defina una regla de notificación][4] en su lugar.

## Destinos de notificación de Microsoft Teams {#microsoft-teams-notification-targets}

Las [reglas de notificación][4] tienen como destino un canal de Microsoft Teams con un identificador `@teams-<channel>`, el cual notifica al canal específico nombrado en el identificador. Utilice esto para notificar a un canal permanente, como el canal global de actualizaciones de incidentes.

Incident Management no proporciona un identificador que se resuelva en el canal creado automáticamente para un incidente. Las reglas de notificación de Slack pueden usar `@incident-slack-channel` para notificar al canal de Slack del incidente, pero Microsoft Teams no tiene un identificador equivalente. Como resultado, una regla de notificación que incluye `@-mentions` los envía al canal nombrado en el identificador `@teams-`, no al canal específico del incidente.

Para mantener informados a los responsables en el propio canal de un incidente, utilice la pestaña de Datadog y los comandos `@Datadog` dentro de ese canal. También puede publicar actualizaciones en la línea de tiempo del incidente, la cual se sincroniza con el canal cuando la [sincronización de mensajes del canal](#channel-message-syncing) está habilitada.

## Reuniones de Microsoft Teams {#microsoft-teams-meetings}

### Creación de reuniones con un solo clic {#one-click-meeting-creation}

Se requieren permisos delegados para las reuniones de Microsoft Teams con un solo clic. Para habilitar las reuniones de Microsoft Teams con un solo clic para incidentes:

1. Vaya a [**Settings > Integrations**][2] y seleccione **Microsoft Teams**.
2. En Microsoft Teams, seleccione su inquilino de Microsoft Teams conectado.
3. Active **Habilitar creación de reuniones** .
4. Guarde su configuración.

Después de habilitar las reuniones de Microsoft Teams con un solo clic, inicie una reunión haciendo clic en **Iniciar reunión de Teams** desde el encabezado del incidente. Se le redirige para unirse instantáneamente a la reunión a través del navegador.

### Creación automática de reuniones {#automatic-meeting-creation}

Se requieren permisos delegados para las reuniones automáticas de Microsoft Teams basadas en criterios. Para habilitar las reuniones automáticas de Microsoft Teams basadas en criterios para incidentes:

1. Vaya a [**Settings > Integrations**][2] y seleccione **Microsoft Teams**.
2. En Microsoft Teams, seleccione su inquilino de Microsoft Teams conectado.
3. Active **Habilitar creación de reuniones** .
   1. Active **Crear reuniones de Microsoft Teams automáticamente**.
   2. (Opcional) Especifique los criterios de incidente que crean una reunión de Microsoft Teams. Si se deja en blanco, cualquier cambio en un incidente sin una reunión de Microsoft Teams existente creará una reunión de Microsoft Teams.
4. Guarde su configuración.

### Sincronización de mensajes de reunión {#meeting-message-sync}
Puede configurar Incident Management para enviar todos los mensajes de la reunión de Microsoft Teams del incidente a la línea de tiempo del incidente. Para habilitar, active **Sincronizar chat de reunión con la línea de tiempo del incidente**.

El autor de un mensaje sincronizado no necesita una licencia de Incident Management o Incident Response para que el mensaje se registre. En organizaciones con facturación basada en el uso para Incident Management, el autor no se cuenta como un usuario activo mensual.

### Resúmenes de reuniones {#meeting-summaries}

Habilite los resúmenes de reuniones generados por IA para resumir automáticamente las reuniones de incidentes de Microsoft Teams. Durante una reunión, se publican resúmenes en vivo periódicamente en la línea de tiempo del incidente y en el canal de chat del incidente. Cuando finaliza la reunión, se publica un resumen final posterior a la reunión.

<div class="alert alert-info">Cuando los resúmenes de reuniones están habilitados, el audio de la reunión es grabado y transcrito por un <a href="https://www.datadoghq.com/legal/subprocessors/">subprocesador</a> de Datadog. Después de un período de retención de 7 días, todos los datos se eliminan automáticamente.</div>

Para habilitar los resúmenes de reuniones para las reuniones de incidentes de Microsoft Teams:

1. Vaya a [**Settings > Integrations**][2] y seleccione **Microsoft Teams**.
2. En Microsoft Teams, seleccione su inquilino de Microsoft Teams conectado.
3. Active **Habilitar creación de reuniones** .
4. Active **Generar resúmenes de reuniones con IA**.
5. (Opcional) Agregue condiciones para evitar la generación de resúmenes en incidentes específicos. De forma predeterminada, las reuniones de incidentes privados no se resumen.
6. Guarde su configuración.

Se generan resúmenes de reuniones para las reuniones de Microsoft Teams vinculadas a un incidente. Cuando comienza una reunión, un transcriptor de Datadog intenta unirse a la reunión de Microsoft Teams. Esto puede tardar de 10 a 30 segundos. Un participante de la reunión debe admitir al transcriptor de Datadog desde la sala de espera de la reunión antes de que pueda comenzar la transcripción. Después de admitir al transcriptor de Datadog, se publican resúmenes en vivo periódicamente en las siguientes ubicaciones durante la reunión:

- La **línea de tiempo del incidente**, bajo una entrada de **Resumen de reunión**.
- El **canal de chat de incidentes**, tanto en el hilo de la tarjeta de la reunión como en un mensaje al canal.

Cuando finaliza la reunión, se publica un resumen final posterior a la reunión en las mismas ubicaciones.

## Uso de la pestaña Datadog en Microsoft Teams {#using-the-datadog-tab-in-microsoft-teams}

En un canal de incidentes (un canal creado específicamente para un incidente), la pestaña Datadog muestra la información de ese incidente específico y le permite gestionarlo. En canales que no son de incidentes, solo puede declarar nuevos incidentes.

### Declaración y gestión de incidentes {#declaring-and-managing-incidents}

Para declarar un incidente desde un Teams específico:
1. [Agregue la aplicación Datadog][3] a Teams.
1. En cualquier canal **que no sea de incidentes**, haga clic en la pestaña **Datadog**.
1. Complete los detalles del incidente y haga clic en **Declarar incidente**.

Para gestionar un incidente desde un Teams específico:
1. En un **canal de incidentes**, haga clic en la pestaña **Datadog**.
1. Edite los detalles y atributos del incidente.

### Envío de mensajes a la línea de tiempo {#sending-messages-to-the-timeline}

Utilice el menú "Más acciones" en cualquier mensaje dentro de un Teams de incidentes en el extremo derecho para enviar ese mensaje a la línea de tiempo del incidente.

## Comandos de Microsoft Teams {#microsoft-teams-commands}

Para obtener una lista completa de los comandos `@Datadog` disponibles, consulte la [documentación de integración de Microsoft Teams][5].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/microsoft-teams/?tab=datadogapprecommended
[2]: https://app.datadoghq.com/incidents/settings?section=integrations
[3]: /es/integrations/microsoft-teams/?tab=datadogapprecommended#datadog-incident-management-in-microsoft-teams
[4]: /es/incident_response/incident_management/setup_and_configuration/notification_rules
[5]: /es/integrations/microsoft-teams/#datadog-incident-management-in-microsoft-teams
[6]: /es/incident_response/incident_management/setup_and_configuration/variables/#variables-available-only-in-channel-name-templates