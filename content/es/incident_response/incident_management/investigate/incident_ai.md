---
aliases:
- /es/bits_ai/managing_incidents/
- /es/bits_ai/bits_ai_sre/coordinate_incidents
- /es/service_management/incident_management/incident_ai/
- /es/incident_response/incident_management/incident_ai
description: Aprende a utilizar Incident AI para automatizar la coordinación de incidentes,
  generar resúmenes, enviar notificaciones y crear informes retrospectivos asistidos
  por IA.
further_reading:
- link: /bits_ai/bits_ai_sre/
  tag: Documentación
  text: Más información sobre la ingeniería de fiabilidad del sitio (SRE) de Bits
    AI
title: Incident AI
---

## Información general

Incident AI transforma el modo en que tu equipo gestiona incidentes automatizando las tareas de coordinación y proporcionando información inteligente a lo largo del ciclo de vida de incidente. Integrado en Datadog Incident Management, funciona en Slack y en la plataforma Datadog para ayudarte a responder más rápido y aprender de cada incidente.

Entre sus principales funciones figuran:
- **Resúmenes de incidentes**: Obtén resúmenes contextualizados cuando te unas a canales de incidentes.
- **Detección de incidentes relacionados**: Detección automática de incidentes relacionados para identificar problemas sistémicos y recurrentes.
- **Solicitar información o tomar medidas**: Declara incidentes, actualiza la gravedad y el estado, busca en el historial de incidente y mucho más, todo ello a través de mensajes conversacionales en Slack.
- **Notificaciones mejoradas por IA**: Rellena dinámicamente las actualizaciones de las partes interesadas con resúmenes generados por IA de los factores contribuyentes, del impacto y de las correcciones a través de correo electrónico, MS Teams, Slack y otros canales.
- **Seguimiento automatizado**: Incident AI recopila elementos de acción mencionados durante los incidentes y los sugiere como tareas de seguimiento cuando se resuelve el incidente.
- **Informes retrospectivos inteligentes**: Genera primeros borradores exhaustivos con secciones basadas en IA que cubren resúmenes ejecutivos, plazos, impacto en el cliente y lecciones aprendidas, para proporcionar a los intervinientes una base sólida sobre la que apoyarse.

## Empezar con la coordinación de incidentes

Incident AI ayuda a coordinar los incidentes, especialmente los que implican a varios equipos, sugiriendo los pasos a seguir a lo largo del ciclo de vida del incident). Esto agiliza la comunicación y mejora la gestión general de los procesos.

1. Conecta Datadog a Slack.
   1. En cualquier canal de Slack, ejecuta el comando `/dd connect`.
   1. Sigue las instrucciones en pantalla para completar el proceso de conexión.
1. Activa la integración Slack en Datadog Incident Management.
   1. En la sección [Integraciones][4] de la configuración de incidentes, busca la configuración de **Slack**.
   1. Activa los siguientes conmutadores:
      - **Enviar mensajes del canal Slack a la línea de tiempo del incidente**
      - **Activa las funciones de Incident AI en canales de incidentes de Slack de tu organización**.<br />
      **Nota**: Las funciones de gestión de incidentes de Incident AI solo pueden activarse para una organización Datadog dentro de un único espacio de trabajo de Slack.
1. Para interactuar con Incident AI en un canal de Slack, invítalo ejecutando el comando `@Datadog`.

## Personalizar las notificaciones a las partes interesadas

Incident AI puede rellenar dinámicamente detalles clave en las notificaciones a las partes interesadas, proporcionando actualizaciones más claras y rápidas a través de las herramientas que tu equipo ya utiliza. Las reglas de notificación admiten el envío a una amplia variedad de destinos, como correo electrónico, Datadog On-Call, MS Teams, Slack, etc., lo que garantiza que las actualizaciones mejoradas con IA lleguen a las personas adecuadas, en la plataforma adecuada y en el momento oportuno.

1. En la configuración de incidentes, ve a [Plantillas de notificación][1].
1. Crea una nueva plantilla o edita una existente.
1. En el cuerpo del mensaje, inserta cualquiera de las siguientes variables de IA:
   <table>
    <thead>
        <tr>
            <th>Campo</th>
            <th>Variable</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Factores contribuyentes IA</td>
            <td><code>{{incident.ai_contributing_factors}}</code></td>
        </tr>
        <tr>
            <td>Impacto IA</td>
            <td><code>{{incident.ai_impact}}</code></td>
        </tr>
        <tr>
            <td>Problema IA</td>
            <td><code>{{incident.ai_issue}}</code></td>
        </tr>
        <tr>
            <td>Corrección IA</td>
            <td><code>{{incident.ai_remediation}}</code></td>
        </tr>
    </tbody>
   </table>
   {{< img src="service_management/incidents/incident_ai/message_template_variables.png" alt="Plantilla de nuevo mensaje con variables de IA en ella" style="width:100%;" >}}
1. Haz clic en **Save** (Guardar) para guardar la plantilla.
1. Ve a las [reglas de notificación][2] de tu incidente.
1. Haz clic en **Nueva Regla**.
1. En **Con plantilla...**, selecciona la plantilla de mensaje que acabas de crear.
1. Haz clic en **Save** (Guardar) para guardar la regla de notificación.

## Resúmenes de incidente proactivos 

Al unirte a un canal de incidentes en Slack (conectado a Datadog Incident Management), Incident AI publica automáticamente un resumen con información clave del incidente, como los factores contribuyentes, el impacto, el problema y la solución. Esto también se puede solicitar ad-hoc utilizando `/dd incident (incidente) summary`. Este resumen solo es visible para ti.

Cuando un incidente pasa a resuelto, Incident AI publica un resumen final. Esto es visible para todos en el canal.

{{< img src="service_management/incidents/incident_ai/incident_summary.png" alt="Ejemplo de resumen de incidentes en Slack" style="width:100%;" >}}

## Sugerencia de tarea de seguimiento proactiva

Una vez resuelto un incidente, Incident AI recopila todas las tareas de seguimiento que los intervinientes hayan mencionado durante el incidente. A continuación, se te pide que las revises y las crees con un solo clic. Estas tareas se guardan como seguimientos de incidentes en Datadog Incident Management. Para obtener más información, consulta [Seguimientos de incidentes][5].

Para ver las tareas de seguimiento sugeridas:
1. Ve a un incidente pertinente en Datadog.
1. Abre la pestaña **Post-Incident** (Post incidente) para ver una lista de todas las tareas de seguimiento que has guardado desde Slack.

## Detección de incidentes relacionados

Incident AI señala automáticamente los incidentes relacionados si se declaran con menos de 20 minutos de diferencia, lo que te ayuda a identificar problemas sistémicos más amplios.

## Chatear con Incident AI

Utiliza mensajes en lenguaje natural para solicitar información o tomar medidas desde Slack:

| Funcionalidad                      | Ejemplo de mensaje                                                                                                                                  |
|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Declarar una incidencia                | `@Datadog Declare an incident`                                                                                                                  |
| Cambiar la gravedad                    | `@Datadog Update this incident to SEV-3`                                                                                                        |
| Cambiar el estado                      | `@Datadog Mark this incident as stable`<br />`@Datadog Resolve this incident`                                                                   |
| Solicitar un nuevo resumen                | `@Datadog Give me a summary of this incident`<br />`@Datadog Summarize incident-262`<br />**Nota**: Los incidentes privados no se resumen.       |
| Buscar el historial de incidentes            | `@Datadog How many incidents are currently ongoing?`<br />`@Datadog Show me all Sev-1 incidents that occurred in the past week.`                |
| Profundizar en incidentes concretos       | `@Datadog What was the root cause of incident-123?`<br />`@Datadog What remediation actions did the responders take in incident-123?`        |
| Buscar incidentes relacionados             | `@Datadog Are there any related incidents?`<br />`@Datadog Find me incidents related to DDoS attacks from the past month`                       |
| Investigación de detección precoz            | `@Datadog A customer is unable to check out. Is there an incident?`<br />`@Datadog Are there any incidents now impacting the payments service?` |

## Personaliza las plantillas retrospectivas con variables de incidentes IA

1. En Datadog, ve a las [plantillas retrospectivas][3] de tu incidente.
1. Haz clic en **New Postmortem Template** (Nueva plantilla retrospectiva).
1. Personaliza tu plantilla utilizando las siguientes variables de IA para obtener un contenido dinámico generado por AI:
   | Descripción                         | Variable                          |
   |-------------------------------------|-----------------------------------|
   | Resumen ejecutivo | `{{incident.ai_summary}}` |
   | Contexto y dependencias del sistema | `{{incident.ai_system_overview}}` |
   | Línea de tiempo de eventos clave | `{{incident.ai_key_timeline}}` |
   | Resumen del impacto en el cliente | `{{incident.ai_customer_impact}}` |
   | Acciones de seguimiento | `{{incident.ai_action_items}}` |
   | Lecciones clave para la prevención futura | `{{incident.ai_lessons_learned}}` |
   <p><strong>Nota</strong>: Las variables de IA deben ir precedidas de una cabecera de sección.</p>
1. Haz clic en **Save** (Guardar). Tu nueva plantilla aparecerá como una opción de plantilla durante la generación de la plantilla retrospectiva.

## Generar un primer borrador del análisis retrospectivo del incidente

Para generar un borrador de un análisis retrospectivo asistido por IA:
1. En Datadog, ve al incidente resuelto del que quieres generar un análisis retrospectivo.
1. Asegúrate de que la línea de tiempo del incidente contiene al menos 10 mensajes.
1. Haz clic en **Generate Postmortem** (Generar análisis retrospectivo).
1. En **Elegir plantilla**, selecciona la plantilla predefinida **Incidente general con contenido de IA** o una plantilla personalizada que hayas creado.
1. Haz clic en **Generate** (Generar). Espera hasta un minuto para que se genere el análisis retrospectivo. No cierres la pestaña durante este tiempo.
1. Revisa el borrador del análisis retrospectivo generado mediante IA. Sirve como punto de partida para los intervinientes en el incidente. Datadog recomienda revisar y perfeccionar el borrador antes de compartirlo.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings?section=message-templates
[2]: https://app.datadoghq.com/incidents/settings?section=notification-rules
[3]: https://app.datadoghq.com/incidents/settings?section=postmortem-templates
[4]: https://app.datadoghq.com/incidents/settings?section=integrations
[5]: /es/incident_response/incident_management/post_incident/follow-ups