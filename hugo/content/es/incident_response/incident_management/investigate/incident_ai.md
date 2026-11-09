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

Para obtener un recorrido completo del flujo de trabajo de investigación, consulte [Bits Investigation][4].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/incident_response/incident_management/setup_and_configuration/integrations/slack
[2]: /es/incident_response/incident_management/setup_and_configuration/templates
[3]: /es/incident_response/incident_management/post_incident/postmortems
[4]: /es/bits_ai/bits_investigation