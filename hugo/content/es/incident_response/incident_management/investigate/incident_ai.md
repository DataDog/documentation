---
aliases:
- /es/bits_ai/managing_incidents/
- /es/bits_ai/bits_ai_sre/coordinate_incidents
- /es/service_management/incident_management/incident_ai/
- /es/incident_response/incident_management/incident_ai
description: Aprenda a usar Incident AI para investigar incidentes activos, recibir
  resúmenes proactivos, detectar problemas relacionados y activar el análisis de causa
  raíz impulsado por IA.
further_reading:
- link: /bits_ai/bits_investigation/
  tag: Documentación
  text: Conozca Bits Investigation
- link: /incident_response/incident_management/post_incident/postmortems
  tag: Documentación
  text: Genere postmortems asistidos por IA
- link: /incident_response/incident_management/setup_and_configuration/templates
  tag: Documentación
  text: Configure variables de IA en plantillas de notificación y postmortem
- link: https://www.datadoghq.com/blog/datadog-incident-response-ai-features/
  tag: Blog
  text: Acelere las investigaciones con IA en Datadog Incident Response
title: IA para incidentes
---
## Descripción general {#overview}

Incident AI ayuda a los respondedores a investigar incidentes activos más rápido mediante la automatización de la recopilación de información y la presentación de contexto relevante. Al trabajar en Slack y en la plataforma Datadog, proporciona resúmenes proactivos, detecta incidentes relacionados y permite consultas conversacionales sobre el historial de incidentes para que su equipo pueda concentrarse en la resolución.

Para habilitar Incident AI, conecte Datadog a Slack y active Bits AI en sus canales de incidentes de Slack. Para obtener instrucciones de configuración, consulte la [integración de Slack para Incident Management][1].

Para funciones de IA que se aplican fuera de la fase de investigación, consulte:
- [Plantillas][2]: Agregue variables de IA a las plantillas de notificación y postmortem
- [Postmortems][3]: Genere borradores de postmortem asistidos por IA

## Resúmenes proactivos de incidentes {#proactive-incident-summaries}

Cuando se une a un canal de incidentes en Slack (conectado a Datadog Incident Management), Incident AI publica automáticamente un resumen que contiene información clave sobre el incidente, como los factores contribuyentes, el impacto, el problema y la remediación. Esto también se puede solicitar cuando sea necesario usando `/dd incident summary`. Este resumen solo es visible para usted.

Cuando un incidente cambia a resuelto, Incident AI publica un resumen final. Esto es visible para todos en el canal.

{{< img src="incident_response/incident_management/investigate/incident_ai/incident_summary.png" alt="Ejemplo de resumen de incidente en Slack" style="width:100%;" >}}

## Resúmenes de reuniones {#meeting-summaries}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Los resúmenes de reuniones no están disponibles para el sitio de Datadog seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Incident AI puede resumir automáticamente las reuniones de incidentes en Zoom, Google Meet y Microsoft Teams. Durante una reunión, publica periódicamente resúmenes en vivo en la línea de tiempo del incidente y en el canal de chat del incidente. Cuando finaliza la reunión, publica un resumen final posterior a la reunión.

<div class="alert alert-info">Cuando los resúmenes de reuniones están habilitados, un <a href="https://www.datadoghq.com/legal/subprocessors/">subprocesador</a> de Datadog graba y transcribe el audio de la reunión. Después de un período de retención de siete días, el subprocesador elimina automáticamente todos los datos.</div>

Su organización debe tener habilitadas las funciones de IA antes de que Datadog Transcriber pueda unirse a las reuniones. Para activar los resúmenes de reuniones, habilite **Generate AI meeting summaries** en la configuración de integración de su plataforma de reuniones:

- [Zoom][4]
- [Google Meet][5]
- [Microsoft Teams][6]

De forma predeterminada, Incident AI no resume las reuniones de incidentes privados. Puede agregar condiciones en la configuración de integración para evitar la generación de resúmenes para otros incidentes también.

### Cómo funcionan los resúmenes de reuniones {#how-meeting-summaries-work}

Cuando comienza una reunión vinculada a un incidente, Datadog Transcriber intenta unirse a la reunión. Esto puede tardar de 10 a 30 segundos. Si la reunión tiene una antesala o sala de espera, un participante debe admitir a Datadog Transcriber antes de que pueda comenzar la transcripción. Después de que Datadog Transcriber se une, publica periódicamente resúmenes en vivo en las siguientes ubicaciones durante la reunión:

- La **línea de tiempo del incidente**, bajo una entrada de **Resumen de reunión**.
- El **canal de chat de incidentes**, tanto en el hilo de la tarjeta de la reunión como en un mensaje al canal.

Cuando finaliza la reunión, publica un resumen final posterior a la reunión en las mismas ubicaciones.

### Revisión de un resumen {#reviewing-a-summary}

Una vez que se publique un resumen, puede aprobarlo, editar su texto o rechazarlo. Puede realizar estas acciones desde la línea de tiempo del incidente en Datadog, o desde el canal de chat del incidente si el resumen se transmitió allí.

Para revisar un resumen desde la línea de tiempo del incidente:

1. Abra el incidente en Datadog y busque la entrada **Meeting Summary** en la línea de tiempo.
2. Haga clic en el icono de marca de verificación para aprobar el resumen, en el icono del lápiz para editar su texto o en el icono de rechazo para eliminarlo de la línea de tiempo.

Cuando un usuario aprueba o edita un resumen, Datadog registra quién lo hizo. Una vez que se edita un resumen, no se puede aprobar; la versión editada tiene prioridad. Rechazar un resumen lo elimina de la línea de tiempo del incidente para todos y oculta su contenido en los canales de chat conectados. Datadog solicita confirmación antes de rechazar, porque esa acción no se puede deshacer.

Si el resumen se transmitió al canal de chat del incidente, utilice los botones **Approve**, **Edit** o **Reject summary** en el mensaje.

### Volver a invitar al transcriptor {#re-inviting-the-transcriber}

Si Datadog Transcriber abandona una reunión, vuelva a invitarlo a la misma reunión vinculada para reanudar la generación de resúmenes:

1. Abra el incidente en Datadog.
2. En el encabezado del incidente, abra el menú de la reunión vinculada.
3. Haga clic en **Add Transcriber** (el icono del robot) junto a la reunión.
4. Si es necesario, admita a Datadog Transcriber desde la antesala o la sala de espera de la reunión para que pueda comenzar la transcripción.

El icono del robot muestra si el transcriptor se está uniendo o si ya está en la reunión. Si no puede agregar al transcriptor, pase el cursor sobre el icono para ver el motivo.

También puede aparecer un aviso para volver a invitar en el hilo de la tarjeta de reunión de Slack o Microsoft Teams del incidente después de que el transcriptor se vaya. Esto puede suceder después de un tiempo de espera mientras se espera la admisión o a los participantes, después de que todos abandonan la reunión o cuando alguien elimina al transcriptor. Seleccione **Sí** para volver a invitar al transcriptor o **No** para descartar el aviso.

Volver a invitar requiere permiso para editar el incidente y, para organizaciones con facturación basada en puestos, una [licencia de Incident Management o Incident Response][7]. Volver a invitar no anula las condiciones que impiden el resumen, incluida la exclusión predeterminada para incidentes privados.

## Detección de incidentes relacionados {#related-incident-detection}

Incident AI marca automáticamente los incidentes relacionados si se declaran dentro de los 20 minutos entre sí, lo que le ayuda a identificar problemas sistémicos más amplios.

## Chatear con Incident AI {#chat-with-incident-ai}

Utilice prompts en lenguaje natural para solicitar información o realizar acciones desde Slack:

| Funcionalidad                      | Ejemplo de prompt                                                                                                                                  |
|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Declarar un incidente                | `@Datadog Declare an incident`                                                                                                                  |
| Cambiar gravedad                    | `@Datadog Update this incident to SEV-3`                                                                                                        |
| Cambiar estado                      | `@Datadog Mark this incident as stable`<br />`@Datadog Resolve this incident`                                                                   |
| Solicitar nuevo resumen                | `@Datadog Give me a summary of this incident`<br />`@Datadog Summarize incident-262`<br />**Nota**: Los incidentes privados no se resumen.       |
| Buscar historial de incidentes            | `@Datadog How many incidents are currently ongoing?`<br />`@Datadog Show me all Sev-1 incidents that occurred in the past week.`                |
| Profundizar en incidentes específicos       | `@Datadog What was the root cause of incident-123?`<br />`@Datadog What remediation actions did the responders take in incident-123?`        |
| Buscar incidentes relacionados             | `@Datadog Are there any related incidents?`<br />`@Datadog Find me incidents related to DDoS attacks from the past month`                       |
| Consulta de detección temprana            | `@Datadog A customer is unable to check out. Is there an incident?`<br />`@Datadog Are there any incidents now impacting the payments service?` |

## Activar una Bits Investigation {#bits-ai-investigation}

Inicie una Bits Investigation directamente desde el canal de Slack de su incidente o desde la interfaz web de Datadog Incident Management, sin abandonar su flujo de trabajo de respuesta a incidentes. Esto reduce el cambio de contexto durante incidentes activos y permite que el agente de IA investigue junto a su equipo utilizando el mismo contexto compartido.

Bits Investigation debe estar habilitada para su organización y solo puede activar una investigación desde un **canal de Slack de Datadog Incident Management configurado correctamente**. El flujo de investigación de incidentes solo se activa cuando el sistema detecta un canal de incidentes válido.

Desde Slack, inicie una investigación durante un incidente activo de cualquiera de estas maneras:

- Haga clic en **Investigate with Bits AI** en las acciones del incidente.
- Ejecute el comando de barra `/dd incident investigate`.
- Escriba `@Datadog investigate` en el canal del incidente.

Cuando utiliza `@Datadog investigate`, puede incluir contexto adicional en línea para ayudar al agente a delimitar el contexto de su investigación desde el principio:

| Prompt                      | Comportamiento                                    |
|-----------------------------|---------------------------------------------|
| `@Datadog investigate we're seeing high error rates in the payments service since the deploy at 2pm` | Inicia una investigación con un área de enfoque proporcionada por el respondedor |
| `@Datadog investigate, I think this is related to the redis cache` | Inicia una investigación con una hipótesis inicial |

Cuando se activa, el agente extrae automáticamente la línea de tiempo del incidente, las señales de telemetría vinculadas (rastreos, métricas y registros) y cualquier contexto que usted proporcione en el prompt. Luego, publica actualizaciones en el canal como una respuesta en el hilo, con un resumen final de la causa raíz y los siguientes pasos recomendados que se muestran en el canal general cuando se completa la investigación.

{{< img src="incident_response/incident_management/investigate/incident_ai/Triggering_investigations_slack.png" alt="Un canal de Slack de incidentes de Datadog que muestra una Bits Investigation completada con hallazgos sobre la causa raíz y un botón \"View Full Investigation\"." >}}

**Desde la interfaz web**, puede iniciar una investigación directamente desde la sección "Investigation" de la página de resumen del incidente.

{{< img src="incident_response/incident_management/investigate/incident_ai/Triggering_investigations_web.png" alt="La página de resumen de Incident Management que muestra una Bits Investigation completada en la sección \"Investigation\" con un botón \"View Investigation\"." >}}

Cuando se inicia, la investigación se integra en la interfaz web del incidente y Bits Investigation aparece como responsable de respuesta en la sección "Responder Roles" de la página.

Para obtener un recorrido completo del flujo de trabajo de investigación, consulte [Bits Investigation][8].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/incident_response/incident_management/setup_and_configuration/integrations/slack
[2]: /es/incident_response/incident_management/setup_and_configuration/templates
[3]: /es/incident_response/incident_management/post_incident/postmortems
[4]: /es/incident_response/incident_management/setup_and_configuration/integrations/zoom_integration/#meeting-summaries
[5]: /es/incident_response/incident_management/setup_and_configuration/integrations/google_meet/#meeting-summaries
[6]: /es/incident_response/incident_management/setup_and_configuration/integrations/microsoft_teams/#meeting-summaries
[7]: /es/account_management/billing/incident_response/#allocate-seats
[8]: /es/bits_ai/bits_investigation