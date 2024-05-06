---
aliases:
- /es/monitors/incident_management/
description: Crear y gestionar incidencias
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Incident%20Management
  tag: Notas de versiones
  text: Consulta las últimas versiones de Gestión de incidencias. (Es necesario iniciar
    sesión en la aplicación).
- link: dashboards/querying/#incident-management-analytics
  tag: Documentación
  text: Análisis de la gestión de incidencias
- link: https://dtdg.co/fe
  tag: Habilitar los fundamentos
  text: Participa en una sesión interactiva para mejorar su gestión de incidencias
- link: https://www.datadoghq.com/blog/pair-programming-coscreen-datadog/
  tag: Blog
  text: Programación en pareja más eficaz con Datadog CoScreen
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: Blog
  text: Prácticas recomendadas para redactar informes retrospectivos de incidencias
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: blog
  text: Automatiza tareas de seguridad habituales y protégete frente a las amenazas
    con Datadog Workflows y Cloud SIEM
kind: documentation
title: Incident Management
---

Cualquier evento que pueda provocar una interrupción en la actividad de los servicios de tu organización puede describirse como una incidencia, y a menudo es necesario disponer de un marco establecido para gestionar estos eventos. La función de gestión de incidencias de Datadog ofrece un sistema a través del cual tu organización puede identificar y mitigar las incidencias de forma eficaz.

Las incidencias se almacenan en Datadog junto con los datos de métricas, trazas (traces) y logs que estés recopilando. Puedes ver y filtrar las incidencias que sean relevantes para ti.

En el paradigma de Datadog, cualquiera de las siguientes situaciones es apropiada para declarar una incidencia:

* Un problema afecta o puede afectar a los clientes o a servicios.
* No sabes si debes avisar de una incidencia. Avisa a otras personas y aumenta la gravedad según corresponda.

## Uso

La gestión de incidencias no requiere instalación. Para ver tus incidencias, ve a la página [Incidencias][1] para ver una lista de todas las incidencias en curso. Puedes configurar campos adicionales disponibles para todas las incidencias en [Configuración de incidencias][2].

**Nota**: Consulta tu lista de incidencias en la pantalla de inicio de tu dispositivo móvil y gestiona/crea incidencias descargando la [Datadog Mobile App][3], disponible en [Apple App Store][4] y [Google Play Store][5].

{{< img src="service_management/incidents/incidents-list-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Incidencias en Mobile App">}}

### Crear una incidencia

#### A partir de un gráfico

Puedes declarar una incidencia directamente desde un gráfico al hacer clic en el botón de exportación del gráfico y, a continuación, en **Declare incident** (Declarar incidencia). Aparecerá el modo de creación de incidencias y el gráfico se añadirá a la incidencia como una señal.

{{< img src="service_management/incidents/from-a-graph.png" alt="Crear una incidencia desde un gráfico" style="width:80%;">}}

#### Desde el portapapeles

Utiliza el portapapeles de Datadog para reunir varios monitores y gráficos y generar una incidencia. Para añadir un dashboard al portapapeles, copia cualquier gráfico y, a continuación, selecciona **Open Clipboard** (Abrir portapapeles). Añade todos los gráficos y monitores relevantes al portapapeles y, a continuación, haz clic en **Add to New Incident** (Añadir a nueva incidencia). Todo lo que hay en el portapapeles se añade a la incidencia como una señal.

{{< img src="service_management/incidents/from-clipboard.png" alt="Añade un dashboard al portapapeles" style="width:80%;">}}

{{< img src="service_management/incidents/clipboard.png" alt="Crea una incidencia desde el portapapeles" style="width:80%;">}}

**Nota**: Además de exportar desde una incidencia, los datos del portapapeles pueden exportarse a un nuevo dashboard o a un notebook.

#### Desde un monitor

Puede declarar una incidencia directamente desde un monitor al hacer clic en **Declare incident** (Declarar incidencia). Aparecerá el modal de creación de incidencias, y el monitor se añadirá a la incidencia como una señal.

{{< img src="service_management/incidents/incident-from-monitor.png" alt="Crear una incidencia desde un monitor" style="width:80%;">}}

También puedes añadir un monitor a una incidencia existente.

{{< img src="service_management/incidents/existing.png" alt="Añadir un monitor a una incidencia existente" style="width:80%;">}}

#### Desde una señal de seguridad

Declara una incidencia directamente desde una señal de Cloud SIEM o Cloud Security Management Threats, al hacer clic en el botón de kebab en la parte superior derecha del panel lateral, y haciendo clic en **Declare incident** (Declarar incidencia).

Declara una incidencia desde una señal de Application Security Management al seleccionar el botón de exportación en la parte superior derecha del panel lateral y hacer clic en **Export to incident** (Exportar a la incidencia).

{{< img src="service_management/incidents/security-signal-incidents.png" alt="Crear una incidencia desde una señal de seguridad" style="width:80%;">}}

#### Desde la página de incidencias

En la [interfaz de usuario de Datadog][1], haz clic en **Declare Incident** (Declarar incidencia) para crear una incidencia.

{{< img src="/service_management/incidents/declare_incident_make_private.png" alt="Modal de declaración de incidencias" style="width:80%;">}}

El modal de creación de incidencias proporciona a los involucrados un panel lateral plegable que contiene texto de ayuda y descripciones para la gravedad y los estados utilizados por tu organización. El texto de ayuda y las descripciones se pueden personalizar en la [Configuración de la incidencia][6]. También tienes la opción de hacer que la incidencia sea privada para limitar el acceso solo a los involucrados.

#### Desde Slack

Una vez que tengas habilitada la [integración de Datadog en Slack][7], desde cualquier canal de Slack puedes utilizar el comando de barra `/datadog incident` para declarar una nueva incidencia.

En el modal de creación, se añade un título descriptivo, se selecciona si los clientes se han visto afectados (sí, no o desconocido) y se elige un nivel de gravedad (1-5, desconocido).

Si el usuario que declara la incidencia ha conectado su Slack a su cuenta de Datadog, entonces, por defecto, ese usuario se convertirá en el Encargado de la incidencia. El Encargado de la incidencia (CI) puede cambiarse posteriormente dentro de la aplicación si es necesario. Si la persona que declara una incidencia no es miembro de una cuenta de Datadog, el CI se asigna a una cuenta genérica `Slack app user` y puede asignarse a otro CI dentro de la aplicación.

Más información sobre el uso de la aplicación Slack en Datadog [aquí][8].

{{< img src="service_management/incidents/from-slack.png" alt="Crear una incidencia desde Slack" style="width:60%;">}}

Si el usuario que declara la incidencia forma parte de tu cuenta de Datadog, entonces ese usuario se convierte por defecto en el Encargado de la incidencia (CI). Si la persona que declara una incidencia no forma parte de tu cuenta de Datadog, entonces el CI se asigna a un `Slack app user` genérico. El CI puede cambiarse en la [página de incidencias][1] de la aplicación de Datadog.

Una vez declarada una incidencia desde Slack, se genera un canal de incidencias.

Para más información sobre la integración de Slack y Datadog, consulta [los documentos][7].

{{< site-region region="eu" >}}
Para los clientes de {{< region-param key="dd_site_name" >}} que utilizan Slack, mantente informado sobre la aplicación Slack mediante un ticket en https://help.datadoghq.com/.
{{< /site-region >}}

## Descripción de la incidencia

Independientemente de dónde crees una incidencia, es importante describirla lo más detalladamente posible para compartir la información con otras personas implicadas en el proceso de gestión de incidencias de tu empresa.

Cuando se crea una incidencia, aparece un modal de incidencia. Este modal tiene varios elementos básicos:

| Elementos de la incidencia    | Descripción |
| ----------- | ----------- |
| Título | (Obligatorio) Da a tu incidencia un título descriptivo. |
| Nivel de gravedad| (Obligatorio) Indica la gravedad de la incidencia, desde SEV-1 (la gravedad más alta) hasta SEV-5 (la gravedad más baja). Si tu incidencia se encuentra en fase de investigación inicial y aún no conoces la gravedad, selecciona UNKNOWN (DESCONOCIDO). <br> **Nota**: Puedes personalizar la descripción de cada nivel de gravedad para que se ajuste a los requisitos de tu organización.|
| Encargado de la incidencia | Es la persona designada como encargado de la investigación de la incidencia. |
| Atributos (Teams) | Asigna el grupo de usuarios adecuado a una incidencia mediante [Datadog Teams][9]. Los miembros del equipo asignado son invitados automáticamente a los canales de Slack. |
| Notificaciones | Especifica un usuario, canal de Slack o correo electrónico externo al que enviar notificaciones de esta incidencia.  |
| Notas y enlaces | Puedes personalizar la descripción de cada nivel de gravedad para adaptarla a los requisitos de tu organización. Incluye enlaces a gráficos, monitores, o señales de seguridad para una mayor concientización. |

### Actualización de la incidencia y de la línea temporal de la incidencia

El estado de una incidencia puede actualizarse directamente en la página de resumen de la incidencia, o desde Slack dentro del canal dedicado a la incidencia. Para actualizar una incidencia desde tu canal de Slack, utiliza este comando de barra para abrir el modal de actualización: `/datadog incident update`

Actualiza la sección de impacto para especificar el impacto en el cliente, la hora de inicio y fin del impacto y si la incidencia sigue activa. Esta sección también requiere que se complete una descripción del contexto del impacto.

En el título de la incidencia, puedes ver el estado, la gravedad, la marca de tiempo, el impacto y la duración de la incidencia, así como quién ha respondido a ella. También puedes notificar las actualizaciones a quienes hayan respondido. Hay enlaces rápidos a los canales de chat (si no se utiliza la aplicación Datadog Slack App, conferencia por vídeo y análisis retrospectivo adjunto (si se ha añadido uno).

Los datos de la línea de tiempo se categorizan automáticamente, por lo que puedes utilizar las facetas para filtrar el contenido de la línea de tiempo. Esto es especialmente útil para incidencias largas con investigaciones de larga duración. Esto facilita a los CI y a los involucrados filtrar quién está implicado, qué progresos se han realizado y qué ya se ha investigado. Como autor de las notas de la línea de tiempo, puedes editar las marcas de tiempo y las notas de los mensajes a medida que se crean. También puedes marcar las llamadas de la línea de tiempo para destacarlas para otras personas que monitorizan la incidencia.

#### Niveles de estado

Por defecto incluye los estados **Activo**, **Estable** y **Resuelto**. **Completado** puede activarse o desactivarse. Puedes personalizar la descripción de cada nivel de estado para que se ajuste a los requisitos de tu organización.

* Activo: incidencia que afecta a otros.
* Estable: la incidencia ya no afecta a otros, pero las investigaciones están incompletas.
* Resuelto: la incidencia ya no afecta a otros y las investigaciones han concluido.
* Completado: toda la remediación ha sido completada.

A medida que cambia el estado de una incidencia, Datadog realiza el seguimiento del tiempo de resolución de la siguiente manera:

| Estado de transición | Marca de tiempo de resolución |
| ------------------ | -----------|
| `Active` a `Resolved`, `Active` a `Completed` | Hora actual |
| `Active` a `Resolved` a `Completed`, `Active` a `Completed` a `Resolved` | Sin cambios |
| `Active` a `Completed` a `Active` a `Resolved` | Anulado en la última transición |

#### Campos de evaluación

Los campos de evaluación son los metadatos y el contexto que puedes definir por incidencia. Estos campos son [etiquetas de métrica clave:valor][10]. Estas claves de campo se añaden en la configuración, y los valores están disponibles cuando se evalúa el impacto de una incidencia en la página de resumen. Por ejemplo, puedes añadir un campo de Aplicación. Los siguientes campos están disponibles para su evaluación en todas las incidencias:

* **Causa raíz**: este campo de texto te permite introducir la descripción de la causa raíz, los desencadenantes y los factores contribuyentes de la incidencia.
* **Método de detección**: especifica cómo se detectó la incidencia con estas opciones predeterminadas: cliente, empleado, monitor, otro o desconocido.
* **Servicios**: si tienes configurado APM, tus servicios de APM están disponibles para la evaluación de incidencias. Para obtener más información sobre cómo configurar tus servicios en APM, consulta [los documentos][11].
    * Si no utilizas Datadog APM, puedes cargar los nombres de servicio como CSV. Los valores cargados mediante CSV solo estarán disponibles en la gestión de incidencias para la evaluación de incidencias.
    * Datadog deduplica los nombres de servicio sin tener en cuenta mayúsculas y minúsculas, de modo que si utilizas "Mi servicio" o "mi servicio", solo se mostrará el añadido manualmente.
    * Datadog anula los nombres de servicio de APM en favor de la lista cargada manualmente.
    * Ten en cuenta que si el servicio es un servicio de APM y no se ha publicado ninguna métrica en los últimos siete días, no aparecerá en los resultados de búsqueda.
    * Integra mejor los productos de Datadog y evalúa con precisión el impacto de servicio. El campo de propiedad Servicios se rellena automáticamente con los servicios de APM para los clientes que utilizan Datadog APM .
* **Teams**: elige entre los [Teams][9] definidos en tu organización. No es necesario cargar un lista de Teams desde un archivo CSV.

## Datos recopilados

La gestión de incidencias recoge las siguientes medidas analíticas:

* Recuento de incidencias
* Duración del impacto en el cliente
* Duración del estado activo
* Duración del estado estable
* Tiempo de reparación (hora de finalización del impacto en el cliente-hora de creación)
* Tiempo de resolución (hora de resolución-hora de creación)

Para obtener más información sobre los gráficos de gestión de incidencias, consulta [Análisis de gestión de incidencias][12].

## Integraciones

Además de integrarse con [Slack][7], la gestión de incidencias también se integra con:

- [PagerDuty][13] y [OpsGenie][14] para enviar notificaciones de incidencias a tus ingenieros de guardia.
- [Jira][15] para crear un ticket de Jira para una incidencia.
- [Webhooks][16] para enviar notificaciones de incidencias mediante webhooks (por ejemplo, [envío de SMS a Twilio][17]).
- [Statuspage][19] para crear y actualizar incidencias de Statuspage.

## ¿Listo para probarlo?

Trabaje con un flujo de trabajo de ejemplo en la guía [Empezando con gestión de incidencias][18].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents
[2]: https://app.datadoghq.com/incidents/settings
[3]: /es/mobile
[4]: https://apps.apple.com/app/datadog/id1391380318
[5]: https://play.google.com/store/apps/details?id=com.datadog.app
[6]: /es/service_management/incident_management/incident_settings#information
[7]: /es/integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[8]: /es/integrations/slack/
[9]: /es/account_management/teams/
[10]: /es/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments#overview
[11]: /es/tracing/#2-instrument-your-application
[12]: /es/service_management/incident_management/analytics/#overview
[13]: /es/integrations/pagerduty/
[14]: /es/integrations/opsgenie/
[15]: /es/integrations/jira/
[16]: /es/integrations/webhooks/
[17]: /es/integrations/webhooks/#sending-sms-through-twilio
[18]: /es/getting_started/incident_management
[19]: /es/integrations/statuspage/