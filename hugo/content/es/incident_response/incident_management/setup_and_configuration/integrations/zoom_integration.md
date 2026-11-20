---
aliases:
- /es/service_management/incident_management/zoom_integration/
- /es/incident_response/incident_management/zoom_integration
description: Cree reuniones de Zoom para incidentes de Datadog con un solo clic o
  automáticamente, y genere resúmenes de reuniones con IA y notebooks de transcripción
  en vivo.
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/integrations
  tag: Documentación
  text: Configuración de Integrations de incidentes
- link: /integrations/zoom-incident-management/
  tag: Documentación
  text: Integración de Zoom para Incident Management
- link: /incident_response/incident_management/investigate/meeting_summaries_and_transcripts
  tag: Documentación
  text: Resúmenes y transcripciones de reuniones
title: Integre Zoom con Datadog Incident Management
---
## Descripción general {#overview}

La integración de Zoom para Datadog Incident Management permite a su equipo iniciar una reunión de Zoom para un incidente. Puede crear reuniones con un solo clic o automáticamente, según los criterios que defina. También puede generar notebooks de transcripción en vivo y resúmenes con IA de las reuniones de Zoom de incidentes.

## Requisitos previos {#prerequisites}

Para usar las funciones de Zoom de Incident Management, primero debe [instalar la integración de Zoom para Incident Management][1].

Después de la instalación, vaya a **[Incident Response > Incident Management > Settings > Integrations][2]** para configurar las funciones de Zoom para Incident Management.

## Reuniones de Zoom {#zoom-meetings}

### Creación de reuniones con un solo clic {#one-click-meeting-creation}

Para habilitar las reuniones de Zoom con un solo clic para incidentes:

1. Vaya a [**Settings > Integrations**][2] y seleccione **Zoom**.
2. Active **Enable Zoom meeting creation**.
3. Guarde su configuración.

Después de habilitar las reuniones de Zoom con un solo clic, inicie una reunión haciendo clic en **Create Zoom Meeting** desde el encabezado del incidente. También puede ejecutar el comando `/zoom` en un canal de Slack de incidentes. Se le redirige para unirse a la reunión a través del navegador o del cliente de Zoom.

Datadog utiliza el correo electrónico del usuario que crea la reunión como el correo electrónico del anfitrión. Este correo electrónico debe estar asociado con una cuenta de Zoom autorizada. Si no lo está, Datadog utiliza el [usuario de Zoom de respaldo](#fallback-zoom-user), si está configurado.

### Creación automática de reuniones {#automatic-meeting-creation}

Para habilitar las reuniones automáticas de Zoom basadas en criterios para incidentes:

1. Vaya a [**Settings > Integrations**][2] y seleccione **Zoom**.
2. Active **Enable Zoom meeting creation**.
   1. Active **Automatically create Zoom meetings**.
   2. (Opcional) Especifique los criterios de incidente que desencadenan la creación de una reunión de Zoom. Si deja los criterios en blanco, cualquier cambio en un incidente sin una reunión de Zoom existente creará una reunión de Zoom.
3. Guarde su configuración.

Cuando un incidente cumple con los criterios, Datadog crea una reunión de Zoom utilizando el correo electrónico del Incident Commander como el correo electrónico del anfitrión. Si no hay un Incident Commander, o su correo electrónico no está asociado con una cuenta de Zoom autorizada, Datadog utiliza el [usuario de Zoom de respaldo](#fallback-zoom-user), si está configurado.

**Nota**: Para usar la creación automática de reuniones de Zoom en un [incidente de prueba][3], seleccione **Execute integrations** en el modal de creación de incidentes de prueba. De lo contrario, Datadog no crea la reunión.

### Usuario de Zoom de respaldo {#fallback-zoom-user}

Configure un usuario de Zoom de respaldo para alojar reuniones cuando Datadog no pueda identificar el correo electrónico del anfitrión en la cuenta de Zoom autorizada. Por ejemplo:

- El usuario de Datadog que crea una reunión no tiene una cuenta en la cuenta de Zoom autorizada.
- El incidente no tiene un Incident Commander cuando Datadog crea una reunión automáticamente.
- El Incident Commander no tiene una cuenta en la cuenta de Zoom autorizada cuando Datadog crea una reunión automáticamente.

Para configurar un usuario de Zoom de respaldo:

1. Vaya a [**Settings > Integrations**][2] y seleccione **Zoom**.
2. Active **Enable Zoom meeting creation**.
3. En **Fallback user account**, ingrese un correo electrónico asociado con la cuenta de Zoom autorizada. Para evitar problemas cuando un empleado deja la empresa, utilice un usuario compartido.
4. (Opcional) Para usar el usuario de respaldo como anfitrión de todas las reuniones de Zoom, active **Always use this account as the meeting host**.
5. Guarde su configuración.

### Marcador de Slack {#slack-bookmark}

Para agregar la reunión de Zoom del incidente a los marcadores del canal de Slack del incidente:

1. Vaya a [**Settings > Integrations**][2] y seleccione **Slack**.
2. Active **Add important links to the incident channel's bookmarks**.
3. Guarde su configuración.

Si el incidente tiene un canal de Slack, Datadog agrega un marcador para la reunión de Zoom a ese canal.

Para obtener más funciones de Slack, consulte [Integrar Slack con Datadog Incident Management][4].

### Resúmenes y transcripciones de reuniones {#meeting-summaries}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Los resúmenes de reuniones y las transcripciones de reuniones en vivo no están disponibles para el sitio de Datadog seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Incident AI puede generar resúmenes de las reuniones de Zoom de incidentes y, opcionalmente, guardar transcripciones de reuniones en vivo en los notebooks de Datadog.

<div class="alert alert-info">Cuando los resúmenes de reuniones están habilitados, un <a href="https://www.datadoghq.com/legal/subprocessors/">subprocesador</a> de Datadog graba y transcribe el audio de la reunión. Para obtener detalles sobre la retención, consulte <a href="/incident_response/incident_management/investigate/meeting_summaries_and_transcripts/#retention-and-deletion">Retención y eliminación</a> en Resúmenes y transcripciones de reuniones.</div>

#### Requisitos previos {#prerequisites-1}

- Las funciones de IA deben estar habilitadas para su organización.
- Debe utilizar una cuenta con permiso para editar la configuración de incidentes.
- Para guardar transcripciones de reuniones en vivo, su organización debe tener acceso a las transcripciones de reuniones en vivo. Si la configuración **Generate meeting transcripts** no está disponible, comuníquese con [Soporte de Datadog][5].
- Los subtítulos de las reuniones deben estar habilitados en Zoom para que Incident AI pueda generar resúmenes.

#### Habilitar resúmenes y transcripciones de reuniones {#enable-meeting-summaries-and-transcripts}

Para habilitar los resúmenes y transcripciones de las reuniones de Zoom de incidentes:

1. Vaya a [**Settings > Integrations**][2] y seleccione **Zoom**.
2. Active **Enable Zoom meeting creation**.
3. Active **Generate AI meeting summaries**.
4. (Opcional) Para guardar las transcripciones de reuniones en vivo, active **Generate meeting transcripts**, que aparece debajo de **Generate AI meeting summaries**.
5. (Opcional) Agregue condiciones para evitar la generación de resúmenes en incidentes específicos.
6. Guarde su configuración.

Para revisar resúmenes, ver transcripciones, administrar el acceso al notebook de transcripciones y volver a invitar al transcriptor, consulte [Resúmenes y transcripciones de reuniones][6].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/zoom-incident-management/
[2]: https://app.datadoghq.com/incidents/settings?section=integrations
[3]: /es/incident_response/incident_management/guides/test_incidents
[4]: /es/incident_response/incident_management/setup_and_configuration/integrations/slack
[5]: /es/help/
[6]: /es/incident_response/incident_management/investigate/meeting_summaries_and_transcripts