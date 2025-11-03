---
categories:
- recopilación de logs
- seguridad
custom_kind: integration
dependencies: []
description: Conéctate a Microsoft 365 para extraer los logs de auditoría de una organización
  a la plataforma de registro de Datadog.
doc_link: https://docs.datadoghq.com/integrations/microsoft_365/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/microsoft-365-integration/
  tag: Blog
  text: Recopilar y monitorizar logs de auditoría de Microsoft 365 con Datadog
git_integration_title: microsoft_365
has_logo: true
integration_id: ''
integration_title: Logs de auditoría y seguridad de Microsoft 365
integration_version: ''
is_public: true
manifest_version: '1.0'
name: microsoft_365
public_title: Logs de auditoría y seguridad de Microsoft 365 y Datadog
short_description: 'Visualiza los logs de auditoría de Microsoft 365 en Datadog desde
  servicios como: Microsoft Teams, Power BI, Azure Active Directory, Dynamics 365
  y más'
team: web-integrations
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/dogweb -->
## Información general

Integra con Microsoft 365 para:

- Ver y analizar los logs de auditoría con el producto de registro de Datadog
- Configurar monitores en eventos desde la plataforma de Microsoft 365
- Aprovechar el conjunto de herramientas de seguridad de Datadog para establecer reglas de seguridad

## Configuración

### Instalación

Usa el [cuadro de Microsoft 365 y Datadog][1] para instalar la integración.

Haz clic en **Install a New Tenant** (Instalar un inquilino nuevo). Esto te indicará que debes iniciar sesión en tu cuenta de Microsoft 365 para obtener autorización. Debes iniciar sesión con una cuenta de administrador.

De manera opcional, añade etiquetas (tags) personalizadas separadas por comas que se adjunten a cada log para este inquilino recién configurado, por ejemplo, `environment:prod,team:us`. Estas etiquetas se pueden usar para filtrar o analizar logs.

**Nota**: Tu organización debe tener el [registro de auditoría habilitado][2] para usar el registro de auditoría de Datadog.

## Datos recopilados

### Logs

Puedes recopilar logs de auditoría para todos los servicios que se mencionan en los [esquemas de la API de gestión de Office 365][3], como:

- Microsoft Teams
- Power BI
- Azure Active Directory
- Dynamics 365
- Exchange
- SharePoint

La integración de Microsoft 365 produce un evento de log por log de auditoría. Los logs recopilados se etiquetan con la fuente `microsoft-365`. Haz clic a continuación para obtener una lista de fuentes de log comunes con resúmenes y enlaces a consultas de log preestablecidas en Datadog.

<details>
  <summary><strong>Haz clic para ver las fuentes de log comunes</strong></summary>

[`AirInvestigation`][4]
: Relacionado con las investigaciones de Advanced eDiscovery y Advanced Threat Protection (ATP) dentro de Microsoft 365. Estos logs contienen información sobre incidencias de seguridad, investigaciones y acciones tomadas para mitigar amenazas, como alertas, pasos de corrección y datos forenses.

[`Audit.AzureActiveDirectory`][5]
: Representa a los logs que genera Azure Active Directory (Azure AD), el servicio de gestión de identidad y acceso basado en la nube de Microsoft. Los logs de Azure AD proporcionan información sobre las actividades de inicio de sesión de los usuarios, la gestión de directorios y grupos, el acceso a las aplicaciones, y los eventos relacionados con la seguridad. Permite a las organizaciones gestionar el acceso de los usuarios y detectar posibles riesgos de seguridad.

[`Audit.Exchange`][6]
: Se refiere a los logs que genera Microsoft Exchange Server. Los logs de Exchange contienen información sobre la entrega de correos electrónicos, el acceso al buzón, las conexiones de clientes y las acciones administrativas dentro del entorno de Exchange. Ayuda a las organizaciones a monitorizar y solucionar problemas relacionados con correos electrónicos.

[`Audit.General`][7]
: Contiene información sobre diversas actividades y eventos que se producen en tu entorno de Microsoft 365, como actividades de usuarios y administradores, eventos del sistema, incidencias de seguridad y otras acciones que no están directamente asociadas con servicios específicos como Exchange o SharePoint.

[`Audit.MicrosoftForms`][8]
: Representa a los logs que genera Microsoft Forms, una herramienta para crear encuestas, cuestionarios y formularios. Los logs de Forms incluyen información sobre la creación de formularios, el acceso, las respuestas y las actividades de los usuarios. Ayuda a las organizaciones a rastrear y proteger los datos de sus formularios.

[`Audit.MicrosoftStream`][9]
: Hace referencia a los logs que genera Microsoft Stream, una plataforma para compartir vídeos dentro del ecosistema de Microsoft. Los logs de Stream contienen información sobre las cargas de vídeos, el acceso, el uso compartido y las actividades de los usuarios. Ayuda a las organizaciones a rastrear y proteger su contenido de vídeos.

[`Audit.MicrosoftTeams`][10]
: Incluye los logs que genera Microsoft Teams, una plataforma de colaboración y comunicación. Los logs de Teams incluyen información sobre las actividades de los usuarios, la gestión de equipos y canales, el uso compartido de archivos, y los eventos de reuniones. Ayuda a las organizaciones a monitorizar las interacciones de los usuarios y garantizar una colaboración segura.

[`Audit.OneDrive`][11]
: Hace referencia a los logs que genera OneDrive, el servicio de sincronización y almacenamiento de archivos basado en la nube de Microsoft. Los logs de OneDrive incluyen información sobre el acceso a los archivos, el uso compartido, las modificaciones y las actividades de los usuarios. Ayuda a las organizaciones a monitorizar y proteger sus datos basados ​​en la nube.

[`Audit.PowerBI`][12]
: Hace referencia a los logs que genera Power BI, la herramienta de análisis empresarial y visualización de datos de Microsoft. Los logs de Power BI contienen información sobre el acceso a los datos, la generación de informes, las actividades del dashboard y las interacciones de los usuarios. Ayuda a las organizaciones a monitorizar y proteger sus datos de inteligencia empresarial.

[`Audit.Project`][13]
: Hace referencia a los logs de auditoría de Microsoft Project, una herramienta de gestión de proyectos dentro del conjunto de aplicaciones de Microsoft 365. Estos logs capturan eventos relacionados con actividades de los usuarios, acciones administrativas y eventos del sistema dentro de Microsoft Project, como la creación de proyectos, actualizaciones de tareas, asignación de recursos y cambios de permisos.

[`Audit.SharePoint`][14]
: Hace referencia a los logs que genera Microsoft SharePoint. Los logs de SharePoint registran el acceso de los usuarios, las modificaciones de documentos, la administración del sitio y los eventos relacionados con la seguridad. Permite a las organizaciones mantener la integridad de los datos y proteger sus sitios y contenidos de SharePoint.

[`Audit.SkypeForBusiness`][15]
: Hace referencia a los logs de auditoría de las actividades de Skype Empresarial. Estos logs capturan eventos relacionados con acciones administrativas y de usuarios dentro del servicio de Skype Empresarial, como registros de detalles de llamadas, registros de detalles de conferencias, actividades de mensajería y acciones de administración, como la administración de usuarios y actualizaciones de políticas.

[`Audit.Yammer`][16]
: Representa a los logs que genera Yammer, una plataforma de redes sociales para empresas. Los logs de Yammer incluyen información sobre las actividades de los usuarios, la gestión de grupos y comunidades, y el uso compartido de contenido. Ayuda a las organizaciones a monitorizar y proteger sus redes sociales internas.

[`ComplianceManager`][17]
: Relacionado con la herramienta Microsoft Compliance Manager, que ayuda a las organizaciones a evaluar, gestionar y rastrear sus actividades de cumplimiento en Microsoft 365. Estos logs contienen información sobre evaluaciones de cumplimiento, tareas, acciones de mejora y progreso hacia el cumplimiento de los requisitos normativos.

`DLP.All`
: Captura eventos relacionados con políticas, detecciones y acciones de DLP en todos los servicios de Microsoft 365, incluidos Exchange, SharePoint, OneDrive, Microsoft Teams y otros. Estos logs proporcionan información sobre infracciones de políticas, detecciones de información confidencial y acciones tomadas para proteger los datos, como bloquear contenido, notificar a usuarios o administradores, y más.

`Dynamics365`
: Recopila eventos de cualquiera de tus servicios y aplicaciones de [Microsoft Dynamics 365][18].

[`MicrosoftFlow`][19]
: Asociado con el servicio de Microsoft Power Automate (antes conocido como Microsoft Flow), una plataforma basada en la nube que permite a los usuarios crear y gestionar flujos de trabajo automatizados entre varias aplicaciones y servicios. Estos logs capturan eventos relacionados con ejecuciones de flujos de trabajo, errores y acciones administrativas, como la creación, actualización o eliminación de flujos.

[`Mip`][20]
: Se refiere a los logs que genera Microsoft Information Protection (MIP), un conjunto de herramientas y servicios para clasificar, etiquetar y proteger datos confidenciales. Los logs de MIP proporcionan información sobre la clasificación de datos, el acceso y los eventos de protección. Permite a las organizaciones gestionar y proteger su información confidencial.

[`MyAnalytics`][21]
: Relacionado con el servicio de Microsoft MyAnalytics, que proporciona información sobre los hábitos de trabajo y las tendencias de productividad de una persona dentro del conjunto de aplicaciones de Microsoft 365. Estos logs contienen información sobre las actividades de los usuarios, como el tiempo dedicado a reuniones, correos electrónicos, colaboración y tiempo de concentración.

[`PowerApps`][22]
: Hace referencia a los logs que genera Power Apps, la plataforma de desarrollo de aplicaciones de poco código de Microsoft. Los logs de Power Apps contienen información sobre la creación de aplicaciones, el acceso, el uso y las actividades del usuario.

[`Quarantine`][23]
: Representa a los logs que generan los sistemas de cuarentena de correos electrónicos que se usan para aislar y revisar los correos electrónicos potencialmente maliciosos o no deseados. Los logs de cuarentena incluyen información sobre los correos electrónicos en cuarentena, los detalles del remitente y el destinatario, y las medidas adoptadas. Ayuda a las organizaciones a gestionar la seguridad de los correos electrónicos y a prevenir amenazas.

[`Rdl`][24]
: Relacionado con SQL Server Reporting Services (SSRS), una plataforma de generación de informes basada en servidores que permite a los usuarios crear, publicar y gestionar informes en varios formatos. La fuente de log Rdl captura eventos relacionados con la ejecución de informes, el acceso y las acciones administrativas, como la generación, actualización o eliminación de informes.

[`SecurityComplianceCenter`][25]
: Se refiere a los logs que genera el Centro de seguridad y cumplimiento de Microsoft, una plataforma centralizada para gestionar las funciones de seguridad y cumplimiento en todos los servicios de Microsoft 365. Estos logs proporcionan información sobre incidencias de seguridad, infracciones de políticas y actividades de gestión del cumplimiento. Ayuda a las organizaciones a mantener un entorno de TI seguro y que cumpla con las normas.

[`SecurityMonitoringEntityReducer`][26]
: Asociado con logs de eventos de seguridad y actividades de agregación de alertas en Microsoft 365. Estos logs proporcionan información sobre eventos de seguridad, anomalías y posibles amenazas detectadas en el entorno de Microsoft 365.

[`ThreatIntelligence`][27]
: Incluye logs que generan los sistemas o herramientas de inteligencia de amenazas que recopilan, analizan y comparten información sobre amenazas de seguridad emergentes. Los logs de inteligencia de amenazas proporcionan información sobre posibles amenazas, vulnerabilidades e indicadores de riesgo. Ayuda a las organizaciones a defenderse de manera proactiva contra los ciberataques.

</details>

Consulta los [esquemas de la API de gestión de Office 365][3] para obtener la lista completa de posibles fuentes de log.

### Seguridad

Puedes usar [Cloud SIEM][28] de Datadog para detectar amenazas en tiempo real en tu entorno con logs de auditoría de Microsoft 365. Consulta la lista completa de [reglas de detección de Microsoft 365 predefinidas][29] o [crea una regla de detección personalizada][30].

{{< img src="integrations/microsoft_365/microsoft_365_rules.png" alt="La página de reglas de seguridad predefinidas con Cloud SIEM seleccionado y Microsoft 365 ingresado en la barra de búsqueda" style="width:80;" popup="true">}}

### Métricas

La integración de Microsoft 365 no recopila métricas.

### Checks de servicios

La integración de Microsoft 365 no recopila checks de servicio.

## Resolución de problemas

La entrada de logs de Datadog solo permite retrotraer eventos de log hasta 18 horas atrás. Se descartan los eventos de log con una marca de tiempo anterior.

Datadog no es compatible con los inquilinos de DoD, gobierno de CCG o gobierno de GCC High, porque requieren diferentes endpoints de Microsoft.

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][31].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/microsoft-365
[2]: https://docs.microsoft.com/en-us/microsoft-365/compliance/turn-audit-log-search-on-or-off?view=o365-worldwide#turn-on-audit-log-search
[3]: https://learn.microsoft.com/en-us/office/office-365-management-api/office-365-management-activity-api-schema#office-365-management-api-schemas
[4]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AAirInvestigation%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[5]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AAzureActiveDirectory%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[6]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AExchange%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[7]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[8]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMicrosoftForms%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[9]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMicrosoftStream%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[10]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMicrosoftTeams%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[11]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AOneDrive%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[12]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3APowerBI%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[13]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AProject%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[14]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3ASharePoint%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[15]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3ASkypeForBusiness%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[16]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AYammer%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[17]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AComplianceManager%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[18]: https://learn.microsoft.com/dynamics365/
[19]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMicrosoftFlow%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[20]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMip%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[21]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMyAnalytics%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[22]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3APowerApps%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[23]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AQuarantine%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[24]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3ARdl%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[25]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3ASecurityComplianceCenter%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[26]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3ASecurityMonitoringEntityReducer%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[27]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AThreatIntelligence%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[28]: https://docs.datadoghq.com/es/security/#cloud-siem
[29]: https://docs.datadoghq.com/es/security/default_rules/?category=cat-cloud-siem-log-detection&search=microsoft+365
[30]: https://docs.datadoghq.com/es/security/detection_rules/#create-detection-rules
[31]: https://docs.datadoghq.com/es/help/