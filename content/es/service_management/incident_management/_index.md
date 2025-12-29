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
  tag: Blog
  text: Automatiza tareas de seguridad habituales y protégete frente a las amenazas
    con Datadog Workflows y Cloud SIEM
- link: https://www.datadoghq.com/blog/datadog-service-management/
  tag: Blog
  text: Garantizar una alta disponibilidad del servicio con Datadog Service Management
- link: https://www.datadoghq.com/blog/datadogs-approach-sre-security/
  tag: Blog
  text: 'Seguridad y SRE: El enfoque combinado de Datadog para afrontar los retos
    de seguridad y fiabilidad'
- link: https://www.datadoghq.com/blog/incidents-ai-workbench-status-page/
  tag: Blog
  text: Unificar la corrección y la comunicación con Datadog Incident Response
title: Incident Management
---



{{< learning-center-callout header="Únete a una sesión web de capacitación" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Incidents">}}
  Explora e inscríbete en las sesiones de Foundation Enablement. Descubre cómo Datadog Incident Management permite a equipos y SRE de DevOps gestionar más eficazmente sus flujos de trabajo de respuesta ante incidentes de principio a fin, ahorrando tiempo y reduciendo la frustración cuando más importa.
{{< /learning-center-callout >}}

Incident Management de Datadog ayuda a los miembros de tu equipo a identificar, mitigar y analizar las interrupciones y amenazas a los servicios de tu organización. Con Incident Management, puedes diseñar un proceso de respuesta mejorado mediante automatización que ayude a tu equipo a reunirse en torno de un marco y un kit de herramientas compartidos. También puedes utilizar análisis de incident (incidente) para evaluar la eficacia de tu proceso de respuesta de incident (incidente). 

Los incidents (incidentes) conviven en Datadog con tus métricas, traces (trazas) y logs. Tus equipos pueden declarar incidentes desde alertas de monitor (noun), señales de seguridad, eventos, casos y más. También puedes configurar monitores para que [declaren incidentes automáticamente][30].

## Para empezar

Incident Management no requiere instalación. Para empezar, sigue un curso del Centro de aprendizaje, lee nuestro tutorial guiado o declara un incidente.

{{< whatsnext desc="Más información sobre de Incident Management:">}}
    {{< nextlink href="https://learn.datadoghq.com/courses/intro-to-incident-management" >}}Obtener más información sobre Datadog Incident Management trabajando con ejemplos prácticos{{< /nextlink >}}
    {{< nextlink href="https://docs.datadoghq.com/getting_started/incident_management/" >}}Recorrido guiado de un flujo de trabajo de incidente {{< /nextlink >}}
    {{< nextlink href="/service_management/incident_management/declare" >}}Declarar un (incidente{{< /nextlink >}}
{{< /whatsnext >}}

## Ver tus incidentes

Para ver tus incidentes, ve a la page (página) [Incidentes][1] para ver una fuente de todos los incidentes en curso.
- Filtra tus incidentes a través de las propiedades enumeradas a la izquierda, incluidas Estado, Gravedad y Tiempo de reparación (horas).
- Utiliza el campo Buscar para introducir atributos de etiqueta (tag) o palabras clave.
- Exporta los resultados de tu búsqueda con el botón Exportar situado en la parte superior de la lista de incidentes.
- Configura los campos adicionales que aparecen para todos los incidentes en [Configuración de incidentes][2].

También puedes ver tu lista de incidentes desde la pantalla de inicio de tu dispositivo móvil y gestionar/crear incidentes descargando la [aplicación móvil de Datadog][3], disponible en [Apple App Store][4] y [Google Play Store][5].

{{< img src="service_management/mobile/iOS_Incident_V2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Dos vistas en la aplicación móvil de Datadog: una que muestra una lista de incidentes con detalles muy claros sobre cada incidente y una que muestra un panel detallado para un incidente único">}}


## Descripción de la incidencia

Al declarar un incident (incidente), es fundamental proporcionar una descripción exhaustiva, detallando lo ocurrido, por qué ha ocurrido y los atributos relacionados para garantizar que todas las partes interesadas en el proceso de gestión de incident (incidente) estén plenamente informadas. Los elementos esenciales de una declaración de incident (incidente) incluyen un título, el nivel de gravedad y los responsables del incident (incidente). Una documentación de gestión eficaz de incident (incidente) incluye:
- Actualización de los detalles de incident (incidente), incluido su estado, efecto, causa raíz, métodos de detección y efecto en el servicio.
- Formación y gestión de un equipo de respuesta, uso de roles personalizados de respondedor y aprovechamiento de los atributos de metadatos para una evaluación detallada de incident (incidente).
- Configuración de notificaciones para mantener informadas a todas las partes interesadas a lo largo del proceso de resolución de incidentes.

Para obtener más información, consulta la documentación [Describir un incidente][20].

## Evalúe datos de incidentes

Incident Analytics te proporciona información de la eficacia y el rendimiento de tu proceso de respuesta ante incidentes, ya que te permite agregar y analizar estadísticas de incidentes anteriores. Las métricas clave, como el tiempo de resolución y el impacto en el cliente, pueden rastrearse a lo largo del tiempo. Puedes consultar estos análisis a través de widgets gráficos en dashboards y notebooks. Datadog ofrece plantillas personalizables, como el dashboard de información general de Incident Management y un informe de incidentes de notebooks, para ayudarte a empezar.

Para ver más detalles sobre las medidas recopiladas y las configuraciones de gráficos paso a paso para visualizar tus datos, consulta [Incident Management Analytics][10].

## Integraciones

Incident Management se integra estrechamente con otros productos de Datadog, entre ellos:

- [Pages (páginas) de estado de Datadog][26] para crear páginas de estado públicas o privadas y conectarlas a incidentes.
- [Datadog On-Call][27] para escalar páginas a incidentes y paginar manual o automáticamente equipos desde un incident (incidente).
- [Notebooks de Datadog][28] para redactar y revisar las autopsias.
- [Workflow Automation (automatización de procesos) de Datadog][29] para crear y ejecutar automatizaciones.

### Integraciones de terceros

Incident Management se integra con aplicaciones de terceros, como:

- [Atlassian Statuspage][25] para crear y actualizar incidentes de Statuspage.
- [Confluence][22] para generar informes retrospectivos de incidentes.
- [CoScreen][14] para poner en marcha reuniones de colaboración multiusuario de pantalla compartida, control remoto, y chat de audio y vídeo integrado.
- [CoTerm][21] para seguir en tiempo real las actividades de corrección de incidentes basadas en terminales.
- [Jira][15] para crear un ticket de Jira para una incidencia.
- [Microsoft Teams][23] para crear canales y reuniones de vídeo para incidencias.
- [PagerDuty][12] y [OpsGenie][13] para paginar tus ingenieros de guardia y auto-resolver páginas tras la resolución de incident (incidente).
- [ServiceNow][19] para crear un ticket de ServiceNow para los incidentes.
- [Slack][11] para crear canales de incidentes.
- [Webhooks][16] para enviar notificaciones de incidencias mediante webhooks (por ejemplo, [envío de SMS a Twilio][17]).
- [Zoom][24] para lanzar videollamadas para incidentes.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents
[2]: https://app.datadoghq.com/incidents/settings
[3]: /es/mobile
[4]: https://apps.apple.com/app/datadog/id1391380318
[5]: https://play.google.com/store/apps/details?id=com.datadog.app
[6]: /es/service_management/incident_management/declare
[7]: /es/account_management/teams/
[8]: /es/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments#overview
[9]: /es/tracing/#2-instrument-your-application
[10]: /es/service_management/incident_management/analytics/
[11]: /es/integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[12]: /es/integrations/pagerduty/
[13]: /es/integrations/opsgenie/
[14]: /es/coscreen
[15]: /es/integrations/jira/
[16]: /es/integrations/webhooks/
[17]: /es/integrations/webhooks/#sending-sms-through-twilio
[18]: /es/integrations/statuspage/
[19]: /es/integrations/servicenow/
[20]: /es/service_management/incident_management/describe
[21]: /es/coterm
[22]: /es/integrations/confluence/
[23]: /es/integrations/microsoft-teams/?tab=datadogapprecommended#datadog-incident-management-in-microsoft-teams
[24]: /es/integrations/zoom-incident-management/
[25]: /es/integrations/statuspage/
[26]: /es/service_management/status_pages/
[27]: /es/service_management/on-call/
[28]: /es/notebooks/
[29]: /es/actions/workflows/
[30]: /es/service_management/incident_management/declare#from-a-monitor