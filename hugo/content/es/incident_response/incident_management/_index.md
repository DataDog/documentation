---
aliases:
- /es/monitors/incident_management/
- /es/service_management/incident_management/
description: Cree y gestione incidentes
further_reading:
- link: dashboards/querying/#incident-management-analytics
  tag: Documentación
  text: Análisis de Incident Management
- link: https://learn.datadoghq.com/courses/getting-started-incident-management
  tag: Centro de aprendizaje
  text: Introducción a Incident Management
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Únase a una sesión interactiva para mejorar su Incident Management
- link: https://www.datadoghq.com/blog/mobile-incident-management-datadog/
  tag: Blog
  text: Gestione y resuelva incidentes sobre la marcha con la aplicación móvil de
    Datadog
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: Blog
  text: Mejores prácticas para redactar análisis post mortem de incidentes
- link: https://www.datadoghq.com/blog/incident-response-with-datadog/
  tag: Blog
  text: Incident Management con Datadog
- link: https://www.datadoghq.com/blog/datadog-service-management/
  tag: Blog
  text: Garantice una alta disponibilidad del servicio con Datadog Service Management
- link: https://www.datadoghq.com/blog/how-datadog-manages-incidents/
  tag: Blog
  text: Cómo gestionamos incidentes en Datadog
- link: https://www.datadoghq.com/blog/incidents-ai-workbench-status-page/
  tag: Blog
  text: Unifique la remediación y la comunicación con Datadog Incident Response
- link: https://www.datadoghq.com/blog/servicenow-datadog-incident-response
  tag: Blog
  text: Integre ServiceNow ITSM con Datadog para acelerar Incident Response
- link: https://app.datadoghq.com/release-notes?category=Incident%20Management
  tag: Notas de la versión
  text: ¡Eche un vistazo a las últimas versiones de Incident Management! (Se requiere
    inicio de sesión en la aplicación).
title: Incident Management
---
{{< learning-center-callout header="Únase a una sesión de seminario web de habilitación" hide_image="true" btn_title="Registrarse" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Incidents">}}
  Explore y regístrese en las sesiones de Foundation Enablement. Aprenda cómo Datadog Incident Management permite a los equipos de DevOps y SRE gestionar de manera más efectiva sus flujos de trabajo de respuesta a incidentes de principio a fin, ahorrando tiempo y reduciendo la frustración cuando más importa.
{{< /learning-center-callout >}}

Datadog Incident Management ayuda a los miembros de su equipo a identificar, mitigar y analizar interrupciones y amenazas a los servicios de su organización. Con Incident Management, puede diseñar un proceso de respuesta mejorado con automatización que ayuda a sus equipos a reunirse en torno a un marco y un conjunto de herramientas compartidos. También puede utilizar el análisis de incidentes para evaluar la eficacia de su proceso de respuesta a incidentes.

Los incidentes residen en Datadog junto con sus métricas, trazas y registros. Sus equipos pueden declarar incidentes a partir de alertas de seguimiento, señales de seguridad, eventos, casos y más. También puede configurar seguimientos para [declarar incidentes automáticamente][30].

## Comience {#get-started}

Incident Management no requiere instalación. Comience realizando un curso del Learning Center, leyendo nuestra guía paso a paso o declarando un incidente.

{{< whatsnext desc="Obtenga más información sobre Incident Management:">}}
    {{< nextlink href="https://learn.datadoghq.com/courses/intro-to-incident-management" >}}Aprenda sobre Datadog Incident Management mediante ejemplos prácticos{{< /nextlink >}}
    {{< nextlink href="https://docs.datadoghq.com/getting_started/incident_management/" >}}Tutorial guiado de un flujo de trabajo de incidentes{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/investigate/declare" >}}Declarar un incidente{{< /nextlink >}}
{{< /whatsnext >}}

## Facturación {#billing}

Incident Management es un SKU basado en puestos. Para obtener más información sobre cómo se factura Incident Management y cómo administrar los puestos dentro de Datadog, visite nuestra [página de precios][31] y la [documentación de facturación de Incident Response][32].

## Visualizar y buscar incidentes {#view-and-search-for-incidents}

Para visualizar sus incidentes, vaya a la página [Incidents][1] para ver un feed de todos los incidentes en curso. Puede filtrar sus incidentes a través de las propiedades enumeradas a la izquierda, exportar sus resultados de búsqueda y configurar campos adicionales que aparecen para todos los incidentes en [Incident Settings][2].

### Ejemplos de búsqueda {#search-examples}

La búsqueda de incidentes utiliza la misma [sintaxis de búsqueda][33] basada en eventos que Logs y Event Management. Combine pares de `key:value` con operadores booleanos (`AND`, `OR`, `-`) para filtrar incidentes.

| Consulta | Descripción |
|-------|-------------|
| `severity:SEV-1` | Mostrar todos los incidentes SEV-1 |
| `severity:(SEV-1 OR SEV-2) state:active` | Mostrar todos los incidentes SEV-1 o SEV-2 activos |
| `services:checkout AND -state:resolved` | Mostrar incidentes no resueltos que afectan al servicio de pago |
| `teams:platform` | Mostrar incidentes asignados al equipo de plataforma |
| `services:web*` | Mostrar incidentes que afectan a servicios que comienzan con "web" |
| `Root\ Cause\ Category:Bug ` | Mostrar incidentes con un atributo de causa raíz específico |
| `responder:john.smith@datadoghq.com ` | Mostrar incidentes donde John Smith sea un respondedor |

### Filtrar y exportar {#filter-and-export}

- **Filtrar por propiedades**: Utilice el panel de facetas a la izquierda para filtrar por Estado, Gravedad, Tiempo de reparación (horas) y otras propiedades configuradas.
- **Exportar resultados de búsqueda**: Exporte sus resultados de búsqueda utilizando el botón Exportar en la parte superior de la lista de incidentes.
- **Guardar vistas**: Guarde sus consultas de búsqueda y filtros utilizados con frecuencia para un acceso rápido.

### Acceso móvil {#mobile-access}

También puede visualizar su lista de Incidents desde la pantalla de inicio de su dispositivo móvil y gestionar/crear incidentes descargando la [aplicación móvil de Datadog][3], disponible en la [Apple App Store][4] y [Google Play Store][5].

{{< img src="incident_response/incident_management/iOS_Incident_V2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Dos vistas en la aplicación móvil de Datadog: una que muestra una lista de incidentes con detalles de alto nivel sobre cada incidente, y otra que muestra un panel detallado para un solo incidente.">}}

## Describir el incidente {#describing-the-incident}

Al declarar un incidente, es fundamental proporcionar una descripción completa, detallando qué sucedió, por qué ocurrió y los atributos relacionados para garantizar que todas las partes interesadas en el proceso de gestión de incidentes estén completamente informadas. Los elementos esenciales de una declaración de incidente incluyen un título, nivel de gravedad y comandantes de incidente. La documentación eficaz de Incident Management incluye:
- Actualizar los detalles del incidente, incluyendo su estado, impacto, causa raíz, métodos de detección e impactos en el servicio.
- Formar y gestionar un equipo de respuesta, utilizando roles de respondedor personalizados y aprovechando los atributos de metadatos para una evaluación detallada del incidente.
- Configurar notificaciones para mantener a todas las partes interesadas informadas durante todo el proceso de resolución del incidente.

Para obtener más información, consulte la documentación [Describe an Incident][20].

## Evaluar datos de incidentes {#evaluate-incident-data}

Incident Analytics proporciona información sobre la eficiencia y el rendimiento de su proceso de respuesta a incidentes al permitirle agregar y analizar estadísticas de incidentes pasados. Las métricas clave, como el tiempo de resolución y el impacto en el cliente, se pueden rastrear a lo largo del tiempo. Puede consultar estos análisis utilizando widgets de gráficos en Dashboards y Notebooks. Datadog ofrece plantillas personalizables, como el Incident Management Overview Dashboard y un Notebook Incident Report, para ayudarle a empezar.

Para obtener más detalles sobre las métricas recopiladas y las configuraciones de gráficos paso a paso para visualizar sus datos, consulte [Incident Management Analytics][10].

## Integrations {#integrations}

Incident Management se integra estrechamente con otros productos de Datadog, incluidos:

- [Datadog Status Pages][26] para crear páginas de estado públicas o privadas y conectarlas a incidentes.
- [Datadog On-Call][27] para escalar avisos a incidentes y avisar a los equipos de forma manual o automática desde un incidente.
- [Datadog Notebooks][28] para redactar y revisar [postmortems][34].
- [Datadog Workflow Automation][29] para crear y ejecutar automatizaciones.

### Integraciones de terceros {#third-party-integrations}

Incident Management se integra con aplicaciones de terceros, incluidas:

- [Atlassian Statuspage][25] para crear y actualizar incidentes de Statuspage.
- [Confluence][22] para generar [postmortems][34] de incidentes.
- [CoTerm][21] para seguir las actividades de remediación de incidentes basadas en terminal en tiempo real.
- [Jira][15] para crear un ticket de Jira para un incidente.
- [Microsoft Teams][23] para crear canales y reuniones de video para incidentes.
- [PagerDuty][12] y [OpsGenie][13] para avisar a sus ingenieros de guardia y resolver automáticamente los avisos tras la resolución del incidente.
- [ServiceNow][19] para crear tickets de ServiceNow para incidentes.
- [Slack][11] para crear canales para incidentes.
- [Webhooks][16] para enviar notificaciones de incidentes mediante webhooks (por ejemplo, [enviar SMS a Twilio][17]).
- [Zoom][24] para iniciar videollamadas para incidentes.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents
[2]: https://app.datadoghq.com/incidents/settings
[3]: /es/mobile
[4]: https://apps.apple.com/app/datadog/id1391380318
[5]: https://play.google.com/store/apps/details?id=com.datadog.app
[6]: /es/incident_response/incident_management/investigate/declare
[7]: /es/account_management/teams/
[8]: /es/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments#overview
[9]: /es/tracing/#2-instrument-your-application
[10]: /es/incident_response/incident_management/analytics_and_reporting/
[11]: /es/integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[12]: /es/integrations/pagerduty/
[13]: /es/integrations/opsgenie/
[15]: /es/integrations/jira/
[16]: /es/integrations/webhooks/
[17]: /es/integrations/webhooks/#sending-sms-through-twilio
[18]: /es/integrations/statuspage/
[19]: /es/integrations/servicenow/
[20]: /es/incident_response/incident_management/investigate/describe
[21]: /es/coterm
[22]: /es/integrations/confluence/
[23]: /es/integrations/microsoft-teams/?tab=datadogapprecommended#datadog-incident-management-in-microsoft-teams
[24]: /es/integrations/zoom-incident-management/
[25]: /es/integrations/statuspage/
[26]: /es/incident_response/status_pages/
[27]: /es/incident_response/on-call/
[28]: /es/notebooks/
[29]: /es/actions/workflows/
[30]: /es/incident_response/incident_management/investigate/declare#from-a-monitor
[31]: https://www.datadoghq.com/pricing/?product=incident-response#products
[32]: /es/account_management/billing/incident_response/
[33]: /es/getting_started/search/#event-based-queries
[34]: /es/incident_response/incident_management/post_incident/postmortems