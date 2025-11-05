---
aliases:
- /es/bits_ai/managing_incidents/
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-for-incident-management/
  tag: Blog
  text: Mantenerse al día de los últimos incidentes con Bits AI
title: Coordinar incidentes
---

En el momento en que ocurre un incidente, Bits AI SRE se encarga de la coordinación general del incidente para que tú puedas centrarte en su resolución. Desde actualizaciones proactivas hasta análisis retrospectivos asistidos por IA, Bits agiliza tu flujo de respuesta ante incidentes en Slack y Datadog.

## Empezar con la coordinación de incidentes

Bits AI El SRE ayuda a coordinar los incidentes, especialmente aquellos que involucran a varios equipos, sugiriendo los pasos siguientes a lo largo del ciclo de vida del incidente. Esto agiliza la comunicación y mejora la gestión general del proceso.

<div class="alert alert-info">Estas funciones requieren <a href="/service_management/incident_management/">Datadog Incident Management</a>.</div>

1. Conecta Datadog a Slack.
   1. En Slack, ejecuta el comando `/dd connect`.
   1. Sigue las instrucciones en pantalla para finalizar el proceso de conexión.
1. Activa la integración Slack en Datadog Incident Management.
   1. En la sección [Integraciones][4] de la configuración de incidentes, busca la configuración de **Slack**.
   1. Activa los siguientes conmutadores:
      - **Enviar mensajes del canal Slack a la línea de tiempo del incidente**
      - **Activar funciones de Bits AI en los canales de Slack de incidentes de tu organización**<br />
      **Nota**: Las funciones de gestión de incidentes de Bits AI sólo pueden activarse para una organización de Datadog en un único espacio de trabajo de Slack.
      {{< img src="bits_ai/coordinate_incidents_slack_settings.png" alt="Configuración de la integración Slack con los conmutadores específicos activados" style="width:100%;" >}}
1. Para interactuar con Bits AI en un canal de Slack, invítalo ejecutando el comando `@Datadog`.

## Personalizar las notificaciones a las partes interesadas 

Bits puede rellenar dinámicamente detalles clave en las notificaciones a las partes interesadas, proporcionando actualizaciones más claras y rápidas a las herramientas que tu equipo ya utiliza. Las reglas de notificación admiten la entrega a una amplia variedad de destinos, incluyendo el correo electrónico, Datadog On-Call, MS Teams, Slack, etc., para garantizar que las actualizaciones mejoradas con IA lleguen a las personas adecuadas, en la plataforma apropiada y en el momento oportuno.

1. En tu configuración de incidentes, ve a las [plantillas de mensajes][1].
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
   {{< img src="bits_ai/message_template_variables.png" alt="Nueva plantilla de mensaje que incluye variables de IA" style="width:100%;" >}}
1. Haz clic en **Save** (Guardar) para guardar la plantilla.
1. Ve a las [reglas de notificación][2] de tu incidente.
1. Haz clic en **Nueva Regla**.
1. En **Con plantilla...**, selecciona la plantilla de mensaje que acabas de crear.
1. Haz clic en **Save** (Guardar) para guardar la regla de notificación.

## Resúmenes de incidente proactivos 

Cuando te unes a un canal de incidentes en Slack (conectado a Datadog Incident Management), Bits publica automáticamente un resumen con información clave sobre el incidente, como factores contribuyentes, impacto, problema y corrección. Este resumen sólo es visible para ti.

Cuando un incidente pasa al estado resuelto, Bits publica un resumen final. Esto es visible para todos en el canal.

{{< img src="bits_ai/incident_summary.png" alt="Ejemplo de resumen de incidentes en Slack" style="width:100%;" >}}

## Detección de incidentes relacionados

Bits señala automáticamente los incidentes relacionados, si se declaran con menos de 20 minutos de diferencia entre sí, lo que te ayuda a identificar problemas sistémicos más amplios. 

## Chatea con Bits AI SRE acerca de los incidentes

Utiliza mensajes en lenguaje natural para solicitar información o tomar medidas desde Slack:

| Funcionalidad                      | Ejemplo de mensaje                                                                                                                                  |
|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Declarar una incidencia                | `@Datadog Declare an incident`                                                                                                                  |
| Cambiar la gravedad                    | `@Datadog Update this incident to SEV-3`                                                                                                        |
| Cambiar el estado                      | `@Datadog Mark this incident as stable`<br />`@Datadog Resolve this incident`                                                                   |
| Solicitar un nuevo resumen                | `@Datadog Give me a summary of this incident`<br />`@Datadog Summarize incident-262`<br />**Nota**: Los incidentes privados no se resumen.       |
| Buscar el historial de incidentes            | `@Datadog How many incidents are currently ongoing?`<br />`@Datadog Show me all Sev-1 incidents that occurred in the past week.`                |
| Profundizar en incidentes concretos       | `@Datadog What was the root cause of incident-123?` o<br />`@Datadog What remediation actions did the responders take in incident-123?`        |
| Buscar incidentes relacionados             | `@Datadog Are there any related incidents?`<br />`@Datadog Find me incidents related to DDOS attacks from the past month`                       |
| Investigación de detección precoz            | `@Datadog A customer is unable to check out. Is there an incident?`<br />`@Datadog Are there any incidents now impacting the payments service?` |
| Crear borrador de la actualización de la página de estado de Datadog | `@Datadog Create a Status Page`                                                                                                                 |

## Sugerencia de tarea de seguimiento proactiva

Una vez resuelto un incidente, Bits recopila todas las tareas de seguimiento que los intervinientes hayan mencionado durante el incidente. A continuación, te pide que las revises y las crees con un solo clic. Estas tareas se guardan como seguimientos de incidentes en Datadog Incident Management.

Para ver las tareas de seguimiento sugeridas:
1. Ve a un incidente pertinente en Datadog.
1. Abre la pestaña **Corrección** para ver una lista de todas las tareas de seguimiento que hayas guardado desde Slack.

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