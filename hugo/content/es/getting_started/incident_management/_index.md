---
description: Realice un seguimiento y comunique los problemas desde la declaración
  hasta la resolución con flujos de trabajo colaborativos, cronogramas y análisis
  post mortem.
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-incident-management
  tag: Centro de aprendizaje
  text: Introducción a Incident Management
- link: https://www.youtube.com/watch?v=QIambwILy_M
  tag: Video
  text: Datadog sobre Incident Management
- link: /monitors/incident_management
  tag: Documentación
  text: Incident Management
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Únase a una sesión interactiva para mejorar su Incident Management
- link: https://www.datadoghq.com/blog/incident-response-with-datadog/
  tag: Blog
  text: Incident Management con Datadog
- link: /incident_response/incident_management/incident_settings
  tag: Documentación
  text: Reglas de notificación
- link: /integrations/slack/?tab=slackapplicationus#using-datadog-incidents
  tag: Documentación
  text: Integración de Slack con incidentes
- link: https://www.datadoghq.com/blog/mobile-incident-management-datadog/
  tag: Blog
  text: Gestione y resuelva incidentes sobre la marcha con la aplicación móvil de
    Datadog
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: Blog
  text: Mejores prácticas para redactar análisis post mortem de incidentes
- link: https://www.datadoghq.com/blog/how-datadog-manages-incidents/
  tag: Blog
  text: Cómo gestionamos los incidentes en Datadog
title: Introducción a Incident Management
---
## Descripción general {#overview}

Datadog Incident Management sirve para realizar un seguimiento y comunicarse sobre un problema que ha identificado con sus métricas, trazas o registros.

Esta guía lo lleva a través del uso del sitio de Datadog para declarar un incidente, actualizar el incidente a medida que avanza la investigación y la remediación, y generar un análisis post mortem cuando el incidente se haya resuelto. El ejemplo asume que la [integración de Slack][1] está habilitada.

## Recorrido de un incidente desde la detección del problema hasta la resolución {#walking-through-an-incident-from-issue-detection-to-resolution}

### Declaración de un incidente {#declaring-an-incident}

**Escenario:** Un monitor está alertando sobre una gran cantidad de errores que pueden estar ralentizando varios servicios. No está claro si los clientes se están viendo afectados.

Esta guía describe el uso del [Portapapeles de Datadog][2] para declarar un incidente. Al usar el Portapapeles, puede recopilar información de diferentes fuentes, como gráficos, monitores, paneles completos o [notebook][3]. Esto le ayuda a proporcionar la mayor cantidad de información posible al declarar un incidente.

1. En Datadog, navegue a [{{< ui >}}Dashboard List{{< /ui >}}][15] y seleccione {{< ui >}}System - Metrics{{< /ui >}}.
2. Pase el cursor sobre uno de los gráficos y cópielo al Portapapeles con uno de los siguientes comandos:
    - {{< ui >}}Ctrl{{< /ui >}}/{{< ui >}}Cmd{{< /ui >}} + {{< ui >}}C{{< /ui >}}
    - Haga clic en el icono {{< ui >}}Export{{< /ui >}} en el gráfico y seleccione {{< ui >}}Copy{{< /ui >}}.
3. En el menú de Datadog a la izquierda, vaya a [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}Monitors List{{< /ui >}}][16] y seleccione {{< ui >}}[Auto] Clock in sync with NTP{{< /ui >}}.
4. Abra el portapapeles: {{< ui >}}Ctrl{{< /ui >}}/{{< ui >}}Cmd{{< /ui >}} + {{< ui >}}Shift{{< /ui >}} + {{< ui >}}K{{< /ui >}}.
5. En el portapapeles, haga clic en {{< ui >}}Add current page{{< /ui >}} para agregar el monitor al portapapeles.
{{< img src="getting_started/incident_management/copy_to_clipboard.png" alt="Copiar al portapapeles" responsive="true" style="width:100%;">}}
6. Haga clic en {{< ui >}}Select All{{< /ui >}} y luego en {{< ui >}}Export items to…{{< /ui >}}
7. Seleccione {{< ui >}}Declare Incident{{< /ui >}}.
8. Describa lo que está sucediendo:
|                          |                                                                                                                                                                                                                                                                                                        |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| {{< ui >}}Title{{< /ui >}}                    | Siga cualquier convención de nomenclatura que su equipo desee utilizar para los títulos de incidentes. Debido a que este no es un incidente real, incluya la palabra `TEST` para dejar claro que se trata de un incidente de prueba. Un ejemplo de título: `[TEST] My incident test`                                                                      |
| {{< ui >}}Severity Level{{< /ui >}}           | Establezca en {{< ui >}}Unknown{{< /ui >}} ya que no está claro si los clientes están siendo afectados y cómo están siendo afectados los servicios relacionados. Consulte la descripción en la aplicación de lo que significa cada nivel de gravedad y siga las pautas de su equipo.                                                                                |
| {{< ui >}}Incident Commander{{< /ui >}}       | Déjelo asignado a usted. En un incidente real, esto se asignaría al líder de la investigación del incidente. Usted u otros pueden actualizar quién es el comandante del incidente a medida que avanza la investigación del incidente.                                                                                 |
9. Haga clic en {{< ui >}}Declare Incident{{< /ui >}} para crear el incidente.
   También puede declarar un incidente desde un [graph][4], [monitor][5] o la [incidents API][6]. Para los usuarios de APM, puede hacer clic en el icono de incidentes en cualquier gráfico de APM para declarar un incidente.
Como parte de la integración con Slack, también puede usar el atajo `/datadog incident` para declarar un incidente y establecer el título, la gravedad y el impacto en el cliente.
10. Haga clic en {{< ui >}}Slack Channel{{< /ui >}} en la página del incidente para ir al canal de Slack del incidente.
   
Se crea automáticamente un nuevo canal de Slack dedicado al incidente para cualquier incidente nuevo, de modo que pueda consolidar la comunicación con su equipo y comenzar a solucionar problemas. Si la integración de Slack de su organización está configurada para actualizar un canal de incidentes global, entonces el canal se actualiza con el nuevo incidente.

Si no tiene habilitada la integración con Slack, haga clic en {{< ui >}}Add Chat{{< /ui >}} para agregar el enlace al servicio de chat que está utilizando para discutir el incidente.

Haga clic en {{< ui >}}Add Video Call{{< /ui >}} para agregar un enlace a la llamada donde se están llevando a cabo las discusiones sobre el incidente. 

### Solución de problemas y actualización del incidente {#troubleshooting-and-updating-the-incident}

La página de Incidentes tiene cuatro secciones principales: {{< ui >}}Overview{{< /ui >}}, {{< ui >}}Timeline{{< /ui >}}, {{< ui >}}Post-Incident{{< /ui >}} y {{< ui >}}Notifications{{< /ui >}}. Actualice estas secciones a medida que avance el incidente para mantener a todos informados sobre el estado actual.

#### Descripción general {#overview-1}

**Escenario:** Después de investigar un poco, descubre que la causa raíz es un servidor que se quedó sin memoria. También le informaron que un pequeño subconjunto de clientes se está viendo afectado y experimenta una carga lenta de las páginas. El primer informe de cliente llegó hace 15 minutos. Es un incidente SEV-3.

En la sección {{< ui >}}Overview{{< /ui >}}, puede actualizar los campos del incidente y el impacto en el cliente a medida que continúa la investigación.

Para actualizar el nivel de gravedad y la causa raíz:
1. Haga clic en el {{< ui >}}Severity{{< /ui >}} desplegable y seleccione {{< ui >}}SEV-3{{< /ui >}}.
2. En {{< ui >}}What happened{{< /ui >}}, seleccione {{< ui >}}Monitor{{< /ui >}} en el {{< ui >}}Detection Method{{< /ui >}} desplegable (está seleccionado Unknown), porque fue alertado primero por un monitor sobre el problema.
1. Agregue al campo {{< ui >}}Why it happened{{< /ui >}}: `TEST: Host is running out of memory.`
4. Haga clic en {{< ui >}}Save{{< /ui >}} para actualizar las propiedades.
    Desde Slack, también puede actualizar el título, la gravedad o el estado de un incidente en curso mediante el comando `/datadog incident update`.

Para agregar el impacto al cliente:
1. Haga clic en {{< ui >}}\+ Add{{< /ui >}} en la sección {{< ui >}}Impact{{< /ui >}}.
2. Cambie la marca de tiempo a 15 minutos antes, porque fue cuando llegó el primer informe del cliente.
3. Agregue al campo de descripciones: `TEST: Some customers seeing pages loading slowly.`
4. Haga clic en {{< ui >}}Save{{< /ui >}} para actualizar los campos. La sección {{< ui >}}Impact{{< /ui >}} se actualiza para mostrar cuánto tiempo ha estado ocurriendo el impacto al cliente. Todos los cambios realizados en la página {{< ui >}}Overview{{< /ui >}} se agregan a la {{< ui >}}Timeline{{< /ui >}}.

#### Línea de tiempo {#timeline}

La {{< ui >}}Timeline{{< /ui >}} muestra las adiciones y los cambios en los campos de incidentes y la información en orden cronológico.

{{< img src="getting_started/incident_management/flag_event.png" alt="Marcar evento" responsive="true" style="width:50%;">}}

1. Haga clic en la pestaña {{< ui >}}Timeline{{< /ui >}}.
2. Busque el evento {{< ui >}}Impact added{{< /ui >}} y márquelo como {{< ui >}}Important{{< /ui >}} haciendo clic en el icono de bandera.
3. Agregue una nota a la línea de tiempo: `I found the host causing the issue.`
4. Pase el cursor sobre el evento de la nota y haga clic en el icono de lápiz para cambiar la marca de tiempo de la nota, ya que en realidad encontró el servidor que causó el problema hace 10 minutos.
5. Marque la nota como {{< ui >}}Important{{< /ui >}}.
6. Haga clic en {{< ui >}}Slack Channel{{< /ui >}} para volver al canal de Slack del incidente.
7. Publique un mensaje en el canal diciendo `I am working on a fix.`
8. Haga clic en el icono de comandos de acciones del mensaje (tres puntos a la derecha después de pasar el cursor sobre un mensaje).
9. Seleccione {{< ui >}}Add to Incident{{< /ui >}} para enviar el mensaje a la línea de tiempo.

{{< img src="getting_started/incident_management/add_from_slack.png" alt="Agregar desde Slack" responsive="true" style="width:40%;">}}

Puede agregar cualquier comentario de Slack en el canal de incidentes a la línea de tiempo para que pueda consolidar las comunicaciones importantes relacionadas con la investigación y mitigación del incidente.

#### Post-incidente {#post-incident}

**Escenario:** Hay un notebook sobre cómo manejar este tipo de problema, que incluye tareas que deben realizarse para solucionarlo.

 En la sección {{< ui >}}Post-Incident{{< /ui >}}, puede realizar un seguimiento de los documentos y tareas para investigar el problema o para tareas de remediación post-incidente.

1. Haga clic en la pestaña {{< ui >}}Post-Incident{{< /ui >}}.
2. Haga clic en el icono de más `+` en el cuadro {{< ui >}}Documents{{< /ui >}} y agregue un enlace a un [Datadog notebook][7]. Todas las actualizaciones en la sección {{< ui >}}Documents{{< /ui >}} se agregan a la línea de tiempo como un tipo de {{< ui >}}Incident Update{{< /ui >}}.
3. Agregue una tarea añadiendo una descripción de la tarea en el cuadro {{< ui >}}Incident Tasks{{< /ui >}}, por ejemplo: `Run the steps in the notebook.`
4. Haga clic en {{< ui >}}Create Task{{< /ui >}}.
5. Haga clic en {{< ui >}}Assign To{{< /ui >}} y asígnese la tarea.
6. Haga clic en {{< ui >}}Set Due Date{{< /ui >}} y establezca la fecha para hoy.
    Todas las adiciones y cambios de tareas se registran en el {{< ui >}}Timeline{{< /ui >}}.
    También puede agregar tareas de post-incidente en la sección {{< ui >}}Post-Incident{{< /ui >}} para realizar un seguimiento de ellas.

#### Notifications {#notifications}

**Escenario:** El problema ha sido mitigado y el equipo está monitoreando la situación. El estado del incidente es estable.

En la sección {{< ui >}}Notifications{{< /ui >}}, puede enviar una notificación actualizando el estado del incidente.

1. Regrese a la sección {{< ui >}}Overview{{< /ui >}}.
2. Cambie el estado en el menú desplegable de {{< ui >}}ACTIVE{{< /ui >}} a {{< ui >}}STABLE{{< /ui >}}.
4. Vaya a la pestaña {{< ui >}}Notifications{{< /ui >}}.
5. Haga clic en {{< ui >}}New Notification{{< /ui >}}.
    El mensaje predeterminado tiene el título del incidente en el asunto y información sobre el estado actual del incidente en el cuerpo.
    En un incidente real, usted enviaría actualizaciones a las personas involucradas en el incidente. Para este ejemplo, envíe una notificación solo a usted mismo.
6. Agréguese al campo {{< ui >}}Recipients{{< /ui >}}.
7. Haga clic en {{< ui >}}Send{{< /ui >}}.
    Debería recibir un correo electrónico con el mensaje.
    Puede crear [plantillas de mensaje][8] personalizadas. Agrupe las plantillas utilizando el campo {{< ui >}}Category{{< /ui >}}.

### Resolución y postmortem {#resolution-and-postmortem}

**Escenario:** Se ha confirmado que el problema ya no afecta a los clientes y que usted lo ha resuelto. El equipo desea un postmortem para analizar qué salió mal.

1. Vaya a la sección {{< ui >}}Overview{{< /ui >}}.
3. Cambie el estado de {{< ui >}}STABLE{{< /ui >}} a {{< ui >}}RESOLVED{{< /ui >}} para que ya no esté activo. También puede cambiar la fecha y la hora en que finalizó el impacto en el cliente si ocurrió antes.
7. Cuando el estado de un incidente se establece como resuelto, aparece un botón {{< ui >}}Generate Postmortem{{< /ui >}} en la parte superior. Haga clic en {{< ui >}}Generate Postmortem{{< /ui >}}.
8. Para la sección de cronología, seleccione {{< ui >}}Marked as Important{{< /ui >}} de modo que solo se agreguen los eventos {{< ui >}}Important{{< /ui >}} al postmortem.
9. Haga clic en {{< ui >}}Generate{{< /ui >}}.

El postmortem incluye los eventos de la cronología y los recursos referenciados durante la investigación y la remediación. Esto facilita la revisión y la documentación adicional de lo que causó el problema y cómo evitarlo en el futuro. Para obtener más información, consulte [Incident Postmortems][17].

Si hay tareas de seguimiento que usted y su equipo deben completar para garantizar que el problema no vuelva a ocurrir, agréguelas y haga seguimiento de ellas en la sección {{< ui >}}Incident Tasks{{< /ui >}} del Post-incidente.

{{< img src="getting_started/incident_management/generate_postmortem.png" alt="Generar postmortem" responsive="true" style="width:80%;">}}
## Personalización de su flujo de trabajo de gestión de incidentes {#customizing-your-incident-management-workflow}

Datadog Incident Management se puede personalizar con diferentes niveles de gravedad y estado, según las necesidades de su organización, y también incluir información adicional, como servicios de APM y equipos relacionados con el incidente. Para obtener más información, consulte esta [sección][9] de la página de Incident Management.

También puede configurar reglas de notificación para notificar automáticamente a personas o servicios específicos según el nivel de gravedad de un incidente. Para obtener más información, consulte la documentación de [Incident Settings][10].

Para personalizar Incident Management, vaya a la [Incident Settings page][11]. Desde el menú de Datadog en el lado izquierdo, vaya a {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}Incidents{{< /ui >}} (si aparece una pantalla de bienvenida de Incident Management, haga clic en {{< ui >}}Get Started{{< /ui >}}). Luego, en la parte superior, haga clic en {{< ui >}}Settings{{< /ui >}}.

## Crear y gestionar incidentes en dispositivos móviles {#create-and-manage-incidents-on-mobile}

La [aplicación móvil de Datadog][12], disponible en [Apple App Store][13] y [Google Play Store][14], permite a los usuarios crear, visualizar, buscar y filtrar todos los incidentes a los que tiene acceso en su cuenta de Datadog desde la aplicación móvil de Datadog para garantizar una respuesta y resolución rápidas sin abrir su computadora portátil.

También puede declarar y editar incidentes, y comunicarse rápidamente con sus equipos a través de integraciones con Slack, Zoom y muchas más.

{{< img src="incident_response/incident_management/iOS_Incident_V2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Dos vistas en la aplicación móvil de Datadog: una que muestra una lista de incidentes con detalles de alto nivel sobre cada incidente, y otra que muestra un panel detallado para un solo incidente">}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/slack/
[2]: /es/dashboards/guide/datadog_clipboard
[3]: /es/notebooks/#overview
[4]: /es/incident_response/incident_management/#from-a-graph
[5]: /es/incident_response/incident_management/#from-a-monitor
[6]: /es/api/latest/incidents/#create-an-incident
[7]: https://app.datadoghq.com/notebook/list
[8]: https://app.datadoghq.com/incidents/settings#Messages
[9]: /es/incident_response/incident_management/#status-levels
[10]: /es/incident_response/incident_management/incident_settings
[11]: https://app.datadoghq.com/incidents/settings
[12]: /es/mobile/
[13]: https://apps.apple.com/app/datadog/id1391380318
[14]: https://play.google.com/store/apps/details?id=com.datadog.app
[15]: https://app.datadoghq.com/dashboard/lists
[16]: https://app.datadoghq.com/monitors/manage
[17]: /es/incident_response/incident_management/post_incident/postmortems