---
app_id: microsoft_365
categories:
- recopilación de logs
- seguridad
custom_kind: integración
description: 'Visualiza los logs de auditoría de Microsoft 365 en Datadog desde servicios
  como: Microsoft Teams, Power BI, Azure Active Directory, Dynamics 365 y más'
further_reading:
- link: https://www.datadoghq.com/blog/microsoft-365-integration/
  tag: Blog
  text: Recopilar y monitorizar logs de auditoría de Microsoft 365 con Datadog
title: Logs de auditoría y seguridad de Microsoft 365
---
## Información general

<div class="alert alert-warning">
Si utilizas Cloud SIEM, Datadog recomienda utilizar la integración de <a href="https://docs.datadoghq.com/integrations/azure-active-directory/">Microsoft Entra ID</a> para una mejor cobertura de detección de seguridad.
</div>

Integra con Microsoft 365 para:

- Ver y analizar los logs de auditoría con el producto de registro de Datadog
- Configurar monitores en eventos desde la plataforma de Microsoft 365
- Aprovechar el conjunto de herramientas de seguridad de Datadog para establecer reglas de seguridad

## Configuración

### Instalación

Utiliza el [ícono de Datadog Microsoft 365](https://app.datadoghq.com/integrations/microsoft-365) para instalar la integración.

Haz clic en **Install a New Tenant** (Instalar un inquilino nuevo). Esto te indicará que debes iniciar sesión en tu cuenta de Microsoft 365 para obtener autorización. Debes iniciar sesión con una cuenta de administrador.

De manera opcional, añade etiquetas (tags) personalizadas separadas por comas que se adjunten a cada log para este inquilino recién configurado, por ejemplo, `environment:prod,team:us`. Estas etiquetas se pueden usar para filtrar o analizar logs.

**Nota**: Tu organización debe tener [activado el registro de auditoría](https://docs.microsoft.com/en-us/microsoft-365/compliance/turn-audit-log-search-on-or-off?view=o365-worldwide#turn-on-audit-log-search) para utilizar el registro de auditoría de Datadog.

## Datos recopilados

### Logs

Puedes recopilar logs de auditoría de todos los servicios mencionados en los [esquemas de la API de gestión de Office 365](https://learn.microsoft.com/en-us/office/office-365-management-api/office-365-management-activity-api-schema#office-365-management-api-schemas), como:

- Microsoft Teams
- Power BI
- Azure Active Directory
- Dynamics 365
- Exchange
- SharePoint

La integración de Microsoft 365 produce un evento de log por log de auditoría. Los logs recopilados se etiquetan con la fuente `microsoft-365`. Haz clic a continuación para obtener una lista de fuentes de log comunes con resúmenes y enlaces a consultas de log preestablecidas en Datadog.

<details>
  <summary><strong>Haz clic para ver las sources (fuentes) de logs habituales</strong></summary>

[`AirInvestigation`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AAirInvestigation%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Relacionado con investigaciones de Advanced eDiscovery y Advanced Threat Protection (ATP) en Microsoft 365. Estos logs contienen información sobre incidents (incidentes) de seguridad, investigaciones y medidas tomadas para mitigar amenazas, como alertas, steps (UI) / pasos (generic) de corrección y datos forenses.

[`Audit.AzureActiveDirectory`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AAzureActiveDirectory%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Representa logs generados Azure Active Directory (Azure AD), identidad basada en la nube de Microsoft y servicio de gestión de acceso. Los logs de Azure AD brindan información sobre las actividades de inicio de sesión del usuario, gestión de grupos y directorios, acceso a aplicaciones y eventos relacionados con la seguridad. Permite que las organizaciones gestionen el acceso del usuario y detecten posibles riesgos de seguridad.

[`Audit.Exchange`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AExchange%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Se relaciona con logs generados por Microsoft Exchange Server. Los logs de Exchange contienen información sobre entrega de correo electrónico, acceso al buzón, conexiones de clientes y acciones administrativas en el entorno de Exchange. Ayda a las organizaciones a monitorizar y solucionar problemas relacionados con el correo electrónico.

[`Audit.General`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Contiene información sobre distintas actividades y eventos que se producen en tu entorno de Microsoft 365, como actividades del usuario y del administrador, eventos del sistema, incidents (incidentes) de seguridad y otras medidas que no se relacionan directamente con servicios específicos como Exchange o SharePoint.

[`Audit.MicrosoftForms`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMicrosoftForms%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Representa logs generados por Microsoft Forms, una herramienta para crear encuestas, cuestionarios y formularios. Los logs de formularios incluyen información sobre creación de formularios, acceso, respuestas y actividades del usuario. Brinda asistencia a las organizaciones en el rastreo y la obtención de datos de sus formularios.

[`Audit.MicrosoftStream`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMicrosoftStream%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Se refiere a logs generados por Microsoft Stream, una plataforma para compartir videos en el ecosistema de Microsoft. Los logs de Stream contienen información sobre cargas de videos, acceso, compartir y actividades del usuario. Ayuda a las organizaciones a rastrear y obtener su contenido de video.

[`Audit.MicrosoftTeams`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMicrosoftTeams%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Comprende logs producidos por Microsoft Teams, una plataforma de colaboración y comunicación. Los logs de Teams incluyen información sobre actividades del usuario, gestión de equipos y canales, archivos compartidos y eventos de reuniones. Ayuda a las organizaciones a monitorizar interacciones de usuarios y garantizar una colaboración segura.

[`Audit.OneDrive`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AOneDrive%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Se refiere a logs generados por OneDrive, el servicio de almacenamiento y sincronización de archivos basado en la nube de Microsoft.  Los logs de OneDrive incluyen información sobre acceso a archivos, compartida, modificaciones y actividades del usuario. Ayuda a las organizaciones a monitorizar y obtener datos basados en la nube.

[`Audit.PowerBI`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3APowerBI%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Se refiere a logs producidos por Power BI, la herramienta de análisis comerciales y visualización de datos de Microsoft. Los logs de Power BI contienen información sobre acceso a datos, generación de informes, actividades de dashboard e interacciones de usuarios. Ayuda a las organizaciones a monitorizar y obtener sus datos de inteligencia comercial.

[`Audit.Project`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AProject%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Se refiere a logs de auditoría de Microsoft Project, una herramienta de gestión de projects (proyectos) en la serie Microsoft 365. Estos logs capturan eventos relacionados con actividades del usuario, medidas administrativas y eventos del sistema en Microsoft Project, como creación de projects (proyectos), actualizaciones de tareas, asignación de recursos y cambios de permisos.

[`Audit.SharePoint`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3ASharePoint%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Se refiere a logs producidos por Microsoft SharePoint. Los logs de SharePoint registran el acceso del usuario, modificaciones de documentos, administración de sitios y eventos relacionados con la seguridad. Permite que las organizaciones mantengan la integridad de los datos y obtengan sus sitios y contenido de SharePoint.

[`Audit.SkypeForBusiness`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3ASkypeForBusiness%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Se refiere a los logs de auditoría de actividades de Skype for Business. Estos logs capturan eventos relacionados con acciones del usuario y administrativas en el servicio de Skype for Business, como registros de detalles de llamadas, registros de detalles de conferencias, actividades de mensajería y medidas administrativas como actualizaciones de gestión y políticas del usuario.

[`Audit.Yammer`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AYammer%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Representa logs producidos por Yammer, una plataforma de redes sociales para empresas. Los logs de Yammer incluyen información sobre actividades del usuario, gestión de grupos y comunidades y contenido compartido. Ayuda a las organizaciones a monitorizar y obtener sus redes sociales internas.

[`ComplianceManager`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AComplianceManager%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Se relaciona con la herramienta Microsoft Compliance Manager, que ayuda a las organizaciones a evaluar, gestionar y rastrear sus actividades de cumplimiento en Microsoft 365. Estos logs contienen información sobre evaluaciones de complimiento, tareas, medidas de mejoramiento y progreso hacia requisitos regulatorios de reuniones.

`DLP.All`
: Captura eventos relacionados con políticas de DLP, detecciones y acciones en todos los servicios de Microsoft 365, incluidos Exchange, SharePoint, OneDrive, Microsoft Teams y otros. Estos logs brindan información sobre incumplimientos de políticas detecciones de información confidencial y las medidas tomadas para proteger los datos, como bloqueo de contenido, notificación a usuarios o administradores y más.

`Dynamics365`
: Recopila eventos de cualquiera de tus servicios y aplicaciones de [Microsoft Dynamics 365](https://learn.microsoft.com/dynamics365/).

[`MicrosoftFlow`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMicrosoftFlow%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Asociado con el servicio Microsoft Power Automate (anteriormente denominado Microsoft Flow), una plataforma basada en la nube que permite que los usuarios creen y gestionen workflows (UI) / procesos (generic) automatizados entre distintas aplicaciones y servicios. Estos logs capturan eventos relacionados con ejecuciones de workflows, errores y medidas administrativas, como la creación, actualización o eliminación de flujos.

[`Mip`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMip%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Se relaciona con logs generados por Microsoft Information Protection (MIP), una serie de herramientas y servicios para clasificar, etiquetar y proteger datos confidenciales. Los logs de MIP brindan información sobre eventos de clasificación, acceso y protección de datos. Permite que las organizaciones gestionen y aseguren su información confidencial.

[`MyAnalytics`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMyAnalytics%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Relacionado con el servicio Microsoft MyAnalytics, que brinda información sobre los hábitos laborales y las tendencias de productividad de una persona en la serie Microsoft 365. Estos logs contienen información sobre actividades de usuarios, el tiempo transcurrido en reuniones, correos electrónico, colaboración y tiempo de concentración.

[`PowerApps`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3APowerApps%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Se refiere a logs generados por Power Apps, la plataforma  de código mínimo para el desarrollo de aplicaciones de  Microsoft. Los logs de Power Apps contienen información sobre creación de aplicaciones, acceso, uso y actividades del usuario.

[`Quarantine`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AQuarantine%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Representa logs generados por sistemas de cuarentena de correo electrónico utilizados para aislar y revisar correos electrónicos posiblemente maliciosos o no deseados. Los logs de cuarentena incluyen información sobre correos electrónicos en cuarentena, datos del remitente y del destinatario y medidas tomadas. Ayuda a las organizaciones a gestionar la seguridad del correo electrónico email y a protegerse de amenazas.

[`Rdl`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3ARdl%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Relacionado con SQL Server Reporting Services (SSRS), una plataforma de informes basada en el servidor que permite que los usuarios creen, publiquen y gestionen informes en distintos formatos. La source (fuente) de logs de Rdl captura eventos relacionados con la ejecución de informes, el acceso y las medidas administrativas, como generar, actualizar o eliminar informes.

[`SecurityComplianceCenter`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3ASecurityComplianceCenter%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Se refiere a logs generados por Microsoft's Security & Compliance Center, una plataforma centralizada para gestionar funciones de seguridad y cumplimiento en todos los servicios de Microsoft 365. Estos logs brindan información sobre incidents (ncidentes) de seguridad, incumplimientos de políticas y actividades de gestión de cumplimiento. Ayuda a las organizaciones a mantener un entorno seguro y cumplidor de TI.

[`SecurityMonitoringEntityReducer`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3ASecurityMonitoringEntityReducer%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Asociado con logs de eventos de seguridad y actividades de agregación de alertas en Microsoft 365. Estos logs brindan informaciones sobre eventos de seguridad, anomalías y posibles amenazas detectadas en todo el entorno de Microsoft 365.

[`ThreatIntelligence`](https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AThreatIntelligence%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true)
: Comprende logs generados por sistemas o herramientas de inteligencia de amenazas que recopilan, analizan y comparten información sobre amenazas a la seguridad surgidas. Los logs de inteligencia de amenazas brindan información sobre posibles amenazas, vulnerabilidades e indicadores de compromiso. Ayuda a las organizaciones a defenderse en forma proactiva de ciberataques.

</details>

Consulta [Esquemas de la API de gestión de Office 365](https://learn.microsoft.com/en-us/office/office-365-management-api/office-365-management-activity-api-schema#office-365-management-api-schemas) para ver la lista completa de posibles sources (fuentes) de logs.

### Seguridad

Puedes utilizar [Cloud SIEM] de Datadog (https://docs.datadoghq.com/security/#cloud-siem) para detectar amenazas en tiempo real en tu entorno con logs de auditoría de Microsoft 365. Consulte la lista completa de [reglas de detección predefinidas de Microsoft 365](https://docs.datadoghq.com/security/default_rules/?category=cat-cloud-siem-log-detection&search=microsoft+365) o [crea una regla de detección personalizada](https://docs.datadoghq.com/security/detection_rules/#create-detection-rules).

{{< img src="integrations/microsoft_365/microsoft_365_rules.png" alt="La página de reglas de seguridad predefinidas con Cloud SIEM seleccionado y Microsoft 365 ingresado en la barra de búsqueda" style="width:80;" popup="true">}}

### Métricas

La integración de Microsoft 365 no recopila métricas.

### Checks de servicio

La integración de Microsoft 365 no recopila checks de servicio.

## Solucionar problemas

La entrada de logs de Datadog solo permite retrotraer eventos de log hasta 18 horas atrás. Se descartan los eventos de log con una marca de tiempo anterior.

Datadog no es compatible con los inquilinos de DoD, gobierno de CCG o gobierno de GCC High, porque requieren diferentes endpoints de Microsoft.

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}