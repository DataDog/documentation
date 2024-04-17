---
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-incident-management
  tag: Centro de aprendizaje
  text: Introducción a la gestión de incidencias
- link: /service_management/incident_management/datadog_clipboard
  tag: Documentación
  text: Clipboard de Datadog
- link: https://www.youtube.com/watch?v=QIambwILy_M
  tag: Vídeo
  text: Gestión de incidencias con Datadog
- link: /monitors/incident_management
  tag: Documentación
  text: Gestión de incidencias
- link: https://dtdg.co/fe
  tag: Habilitar los fundamentos
  text: Participa en una sesión interactiva para mejorar tu gestión de incidencias
- link: https://www.datadoghq.com/blog/incident-response-with-datadog/
  tag: Blog
  text: Gestión de incidencias con Datadog
- link: /service_management/incident_management/incident_settings
  tag: Documentación
  text: Reglas de notificación
- link: /integrations/slack/?tab=slackapplicationus#using-datadog-incidents
  tag: Documentación
  text: Integración de Slack en las incidencias
- link: https://www.datadoghq.com/blog/pair-programming-coscreen-datadog/
  tag: Blog
  text: Programación por pares más eficaz con Datadog CoScreen
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: Blog
  text: Prácticas recomendadas para redactar informes retrospectivos de incidencias
- link: https://www.datadoghq.com/blog/how-datadog-manages-incidents/
  tag: Blog
  text: Cómo gestionamos las incidencias en Datadog
kind: documentación
title: Empezando con la gestión de incidencias
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">La gestión de incidencias no está disponible para el sitio de Datadog que has seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{% /site-region %}}

## Información general

La herramienta de gestión de incidencias de Datadog permite rastrear y establecer comunicaciones sobre cualquier problema que hayas identificado con tus métricas, trazas (traces) o logs.

En esta guía, te enseñaremos a utilizar el sitio de Datadog para declarar una incidencia, actualizarla durante el proceso de investigación y solución, y generar un informe retrospectivo una vez resuelta. Ten en cuenta que el siguiente ejemplo presupone que se ha habilitado la [integración de Slack][1].

## Fases de una incidencia desde la detección del problema hasta su resolución

### Declarar una incidencia

**Situación:** Un monitor alerta de un número elevado de errores que pueden estar ralentizando varios servicios. No está claro si esto afecta a los clientes.

Esta guía explica cómo utilizar el [Clipboard de Datadog][2] para declarar una incidencia. El Clipboard permite recopilar información de distintas fuentes, como gráficos, monitores, dashboards completos o [notebooks][3]. De este modo, podrás aportar la máxima información posible al declarar una incidencia.

1. En Datadog, navega hasta [**Dashboard List**][15] (Lista de dashboards) y selecciona **System - Metrics** (Sistema - Métricas).
2. Pasa el cursor sobre uno de los gráficos y cópialo en el Clipboard con uno de los siguientes comandos:
    - **Ctrl**/**Cmd** + **C**
    - Haz clic en el icono **Export** (Exportar) del gráfico y selecciona **Copy** (Copiar).
3. En el menú Datadog de la izquierda, ve a [**Monitors** > **Monitors List**][16] (Monitores > Lista de monitores) y selecciona  **[Auto] Clock in sync with NTP** (Autorreloj sincronizado con NTP).
4. Abre el Clipboard: **Ctrl**/**Cmd** + **Shift** + **K**.
5. En el Clipboard, haz clic en **Add current page** (Añadir la página actual) para añadir el monitor al Clipboard.
{{< img src="getting_started/incident_management/copy_to_clipboard.png" alt="Copiar en el Clipboard" responsive="true" style="width:100%;">}}
6. Haz clic en **Select All** (Seleccionar todo) y, después, en **Export items to…** (Exportar los elementos a…).
7. Selecciona **Declare Incident** (Declarar incidencia).
8. Describe el problema:
|                          |                                                                                                                                                                                                                                                                                                        |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Título                    | Utiliza las convenciones de nomenclatura que tu equipo estime oportunas para los títulos de las incidencias. Dado que no se trata de una incidencia real, puedes incluir la palabra `TEST` para dejar en claro que es una prueba. Ejemplo: `[TEST] My incident test`                                                                      |
| Gravedad           | Selecciona la opción **Unknown** (Desconocida), ya que no está claro si esto afecta a los clientes ni cuál está siendo el impacto en los servicios relacionados. Consulta el significado de cada nivel de gravedad en la descripción de la aplicación y sigue las directrices de tu equipo.                                                                                |
| Responsable de la incidencia       | Déjala asignada a tu nombre. Si se tratara de una incidencia real, se asignaría a la persona a cargo de su investigación. Según avance la investigación de la incidencia, otras personas o tú podréis actualizar quién es su responsable.                                                                                 |
| Notificaciones            | Deja este campo en blanco porque esto es solo una prueba, así que no es necesario enviar una alerta a nadie más ni a ningún otro servicio. Cuando se trate de una incidencia real, añade a las personas y los servicios a los que se debe informar para que colaboren en la investigación y la búsqueda de soluciones. Si lo deseas, también puedes enviar estas notificaciones a Slack y PagerDuty. |
| Notas y enlaces            | Añade información para reflejar los motivos por los que declaras la incidencia. Pueden ser gráficos, logs u otros elementos visuales clave. El gráfico y el monitor que has seleccionado ya están incluidos, pero puedes añadir señales adicionales. Por ejemplo, copia y pega la URL de esta guía.
9. Haz clic en **Declare Incident** (Declarar incidencia) para crear la incidencia.
   Además, se puede declarar una incidencia desde un [gráfico][4], un [monitor][5] o la [API de incidencias][6]. En el caso de los usuarios de APM, basta con hacer clic en el icono de incidencias de cualquier gráfico de APM para declarar una incidencia.
Gracias a la integración de Slack, también puedes utilizar el atajo `/datadog incident` para declarar una incidencia y establecer el título, la gravedad y el impacto causado al cliente.
10. Haz clic en **Slack Channel** (Canal de Slack), en la página de la incidencia, para acceder a su canal de Slack.

Con cada nueva incidencia, se creará automáticamente un nuevo canal de Slack específico para simplificar las comunicaciones con el equipo y comenzar a solucionar los problemas. Si la integración de Slack de tu organización está configurada para actualizar la incidencia en un canal general, este se actualizará con la nueva incidencia.

En este ejemplo, eres la única persona que se ha añadido al nuevo canal de la incidencia. En una incidencia real, al incluir personas o servicios en _Notifications_ (Notificaciones), se añadirán todos los destinatarios al canal de la incidencia de forma automática.

Si no has activado la integración de Slack, haz clic en **Add Chat** (Añadir chat) para añadir el enlace al servicio de chat que estés utilizando para abordar la incidencia.

Haz clic en **Add Video Call** (Añadir videollamada) para añadir un enlace a la llamada en la que se está tratando la incidencia.

### Solucionar problemas y actualizar la incidencia

La página de la incidencia tiene cuatro secciones principales: _Overview_ (Información general), _Timeline_ (Cronología), _Remediation_ (Solución) y _Notifications_ (Notificaciones). Recuerda actualizar estas secciones a medida que avance la investigación de la incidencia para mantener a todo el mundo al tanto de su estado actual.

#### Información general

**Situación:** Tras investigar un poco, descubres que la causa principal es un host que se está quedando sin memoria. Además, te informan de que esto afecta a un pequeño subconjunto de clientes y observas que las páginas se cargan con lentitud. La primera notificación de un cliente llegó hace 15 minutos. Se trata de una incidencia SEV-3 (nivel de gravedad: 3).

En la sección _Overview_ (Información general), puedes actualizar los campos de la incidencia y el impacto en el cliente a medida que avanza la investigación.

Para actualizar el nivel de gravedad y la causa principal:
1. Haz clic en el menú desplegable _Severity_ (Gravedad) y selecciona **SEV-3**.
2. En _What happened_ (Qué ocurrió), selecciona **Monitor** en el menú desplegable _Detection Method_ (Método de detección), ya que la primera alerta que recibiste sobre el problema provenía de un monitor.
1. Indica que el host que se está quedando sin memoria en el campo _Why it happened_ (Por qué ocurrió). Ejemplo: `TEST: Host is running out of memory.`
4. Haz clic en **Save** (Guardar) para actualizar las propiedades.
    Desde Slack, también puedes actualizar el título, la gravedad o el estado de una incidencia en curso utilizando el comando `/datadog incident update`.

Para añadir la información sobre cómo ha afectado el problema al cliente:
1. Haz clic en **+ Add** (Añadir), en la sección _Impact_ (Impacto).
2. Cambia la marca de tiempo a 15 minutos antes, dado que fue en ese momento cuando llegó la primera notificación de un cliente.
3. Indica la información que te han dado los clientes en el campo de descripción. Ejemplo: `TEST: Some customers seeing pages loading slowly.`
4. Haz clic en **Save** (Guardar) para actualizar los campos. Puedes consultar durante cuánto tiempo esta situación afectó al cliente en la sección _Impact_ (Impacto). Todos los cambios realizados en la página _Overview_ (Información general) se añaden a _Timeline_ (Cronología).

#### Cronología

La sección _Timeline_ (Cronología) muestra en orden cronológico las adiciones y modificaciones de campos e información sobre la incidencia.

{{< img src="getting_started/incident_management/flag_event.png" alt="Evento con bandera" responsive="true" style="width:50%;">}}

1. Haz clic en la pestaña **Timeline**.
2. Busca el evento _Impact added_ (Impacto añadido) y haz clic en el icono de la bandera para marcarlo como _importante_.
3. Añade una nota a la cronología para dejar constancia de que has encontrado el host que causa el problema. Ejemplo: `I found the host causing the issue.`
4. Pasa el cursor por encima del evento de la nota y haz clic en el icono del lápiz para cambiar la marca de tiempo, ya que en realidad encontraste el host causante del problema hace 10 minutos.
5. Marca la nota como **importante** con una bandera.
6. Haz clic en **Slack Channel** (Canal de Slack) para volver al canal de Slack de la incidencia.
7. Publica un mensaje en el canal para informar de que estás buscando una solución. Ejemplo: `I am working on a fix.`
8. Haz clic en el icono del comando de acciones del mensaje (al pasar el cursor por encima de un mensaje, aparecen tres puntos a la derecha).
9. Selecciona **Add to Incident** (Añadir a la incidencia) para enviar el mensaje a la cronología.

{{< img src="getting_started/incident_management/add_from_slack.png" alt="Añadir desde Slack" responsive="true" style="width:40%;">}}

Para poder unificar las comunicaciones importantes relacionadas con la investigación y la mitigación de la incidencia, puedes añadir cualquier comentario del canal de Slack sobre la incidencia a la cronología.

#### Solución

**Situación**: Hay un notebook sobre cómo tratar este tipo de problemas, donde se recogen las tareas que hay que realizar para solucionarlos.

 En la sección _Remediation_ (Solución), se puede hacer un seguimiento de las tareas y documentos relacionados con la investigación de la incidencia o con las medidas correctivas posteriores.

1. Haz clic en la pestaña **Remediation** (Solución).
2. Haz clic en el icono `+` en el cuadro _Documents_ (Documentos) y añade un enlace a un [notebook de Datadog][7]. Todas las actualizaciones de la sección _Documents_ se añaden a la línea de tiempo como un tipo de _Incident Update_ (Actualización de incidencia).
3. Para añadir una tarea, basta con introducir su descripción en el recuadro _Incident Tasks_ (Tareas de la incidencia). Ejemplo: `Run the steps in the notebook.`
4. Haz clic en **Create Task** (Crear tarea).
5. Haz clic en **Assign To** (Asignar a) y asígnatela a ti.
6. Haz clic en *Set Due Date** (Configurar fecha de vencimiento) y pon la fecha de hoy.
    Todas las adiciones y modificaciones de tareas se registrarán en _Timeline_ (Cronología).
    También puedes añadir tareas posteriores a la incidencia en la sección _Remediation_ (Solución) para llevar un seguimiento.

#### Notificaciones

**Situación**: El problema se ha mitigado, y el equipo está monitorizando la situación. El estado de la incidencia es estable.

En la sección _Notifications_ (Notificaciones), puedes enviar una notificación para actualizar el estado de la incidencia.

1. Vuelve a la sección _Overview_ (Información general).
2. En el menú desplegable, cambia el estado de _ACTIVE_ (Activo) a _STABLE_ (Estable).
4. Dirígete a la pestaña _Notificaciones_.
5. Haz clic en **New Notification** (Nueva notificación).
    El mensaje predeterminado tiene el título de la incidencia en el asunto y la información sobre su estado actual en el cuerpo del mensaje.
    En una incidencia real, tendrías que enviar actualizaciones a las personas implicadas en la incidencia. Para este ejemplo, envía una notificación que solo te llegue a ti.
6. Añádete a ti mismo en el campo _Recipients_ (Destinatarios).
7. Haz clic en **Send** (Enviar).
    Deberías recibir un correo electrónico con el mensaje.
    Puedes crear [plantillas de mensajes][8] personalizadas. Las plantillas se pueden agrupar mediante el campo _Category_ (Categoría).

### Resolución e informe retrospectivo

**Situación:** Se confirma que el problema ya no afecta a los clientes y que has resuelto la incidencia. El equipo quiere un informe retrospectivo para ver qué ha fallado.

1. Dirígete a la sección _Overview_ (Información general).
3. Cambia el estado de _STABLE_ (Estable) a _RESOLVED_ (Resuelto) para que la incidencia deje de estar activa. También puedes modificar la fecha y la hora si la incidencia dejó de afectar a los clientes antes de resolverse.
7. El botón _Generate Postmortem_ (Generar informe retrospectivo) aparecerá en la parte superior de la página cuando el estado de una incidencia se haya configurado como resuelto.
8. Desde la sección de cronología, selecciona **Marked as Important** (Marcado como importante) para que solo se añadan al informe retrospectivo los eventos _importantes_.
9. Haz clic en **Generate** (Generar).

El informe retrospectivo se genera como un notebook de Datadog e incluye los eventos de la cronología y los recursos a los que se hizo referencia durante la investigación y la fase de búsqueda de soluciones. De este modo, resulta más fácil revisar y documentar con mayor detalle la causa del problema y se puede determinar cómo evitarlo en el futuro. El notebook de Datadog es compatible con la colaboración en tiempo real, así que tu equipo y tú podéis editarlo al mismo tiempo.

Si es necesario hacer tareas de seguimiento para garantizar que el problema no se repita, añádelas para tenerlas bajo control en la sección _Incident Tasks_ (Tareas de la incidencia) de la sección Remediation (Solución).

{{< img src="getting_started/incident_management/generate_postmortem.png" alt="Generate Postmortem (Generar informe retrospectivo)" responsive="true" style="width:80%;">}}
## Personalizar el flujo de trabajo de la gestión de incidencias

Según las necesidades de tu organización, la gestión de incidencias de Datadog puede personalizarse con diferentes niveles de gravedad y estado, e incluye información adicional, como los servicios de APM y los equipos relacionados con la incidencia. Para obtener más información, consulta esta [sección][9] de la página de Gestión de incidencias.

También puedes configurar reglas de notificación para avisar automáticamente a personas o servicios concretos según el nivel de gravedad de una incidencia. Para obtener más información, consulta la documentación [Configuración de incidencias][10].

Para personalizar la gestión de incidencias, visita la [página de configuración de incidencias][11]. En el menú de Datadog de la izquierda, dirígete a **Monitors** > **Incidents** (Monitores > Incidencias); si aparece una pantalla de bienvenida a la gestión de incidencias, haz clic en **Get Started** (Comenzar). A continuación, en la parte superior, haz clic en **Settings** (Configuración).

## Crear y gestionar incidencias desde un dispositivo móvil

La [aplicación móvil de Datadog][12], disponible en el [App Store de Apple][13] y en [Google Play][14], permite a los usuarios crear, ver, buscar y filtrar todas las incidencias a las que tienes acceso en la aplicación con tu cuenta de Datadog. La finalidad es garantizar una respuesta y resolución rápidas sin necesidad de abrir el portátil.

Asimismo, puedes declarar y editar incidencias y comunicarte rápidamente con tus equipos gracias a las integraciones con Slack, Zoom y muchas otras herramientas.

{{< img src="service_management/incidents/incidents-list-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Monitores en Mobile App">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/slack/
[2]: /es/service_management/incident_management/datadog_clipboard
[3]: /es/notebooks/#overview
[4]: /es/service_management/incident_management/#from-a-graph
[5]: /es/service_management/incident_management/#from-a-monitor
[6]: /es/api/latest/incidents/#create-an-incident
[7]: https://app.datadoghq.com/notebook/list
[8]: https://app.datadoghq.com/incidents/settings#Messages
[9]: /es/service_management/incident_management/#status-levels
[10]: /es/service_management/incident_management/incident_settings
[11]: https://app.datadoghq.com/incidents/settings
[12]: /es/service_management/mobile/
[13]: https://apps.apple.com/app/datadog/id1391380318
[14]: https://play.google.com/store/apps/details?id=com.datadog.app
[15]: https://app.datadoghq.com/dashboard/lists
[16]: https://app.datadoghq.com/monitors/manage