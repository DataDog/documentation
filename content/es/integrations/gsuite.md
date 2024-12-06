---
app_id: gsuite
app_uuid: a1ec70d4-dbe1-4e76-8e40-062df1fff1a5
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 601
    source_type_name: Google Workspace
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- colaboración
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: gsuite
integration_id: gsuite
integration_title: Google Workspace
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: gsuite
public_title: Google Workspace
short_description: Importación de tus logs de auditoría y seguridad de Google Workspace
  a Datadog
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Categoría::Colaboración
  - Categoría::Seguridad
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Importación de tus logs de auditoría y seguridad de Google Workspace
    a Datadog
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Google Workspace
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Información general

Importa tus logs de auditoría y seguridad de Google Workspace a Datadog. Cuando se habilita esta integración, Datadog empieza a extraer automáticamente logs para los siguientes servicios Google Workspace:

|Servicio|Descripción|
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|Transparencia del acceso|Los informes de actividad de Transparencia del acceso de Google Workspace devuelven información sobre distintos tipos de eventos de actividad de Transparencia del acceso.|
|Administración|Los informes de actividad de la aplicación Consola de administración devuelven información sobre diferentes tipos de eventos de actividad del administrador.|
|Calendario|Los informes de actividad de la aplicación Google Calendar devuelven información sobre diferentes eventos de actividad del Calendar.|
|Chrome|El informe de actividad de Chrome devuelve información sobre la actividad de ChromeOS de todos los usuarios de tu cuenta. Cada informe utiliza la solicitud de endpoint básica y proporciona parámetros específicos del informe, como inicios de sesión, adición o eliminación de usuarios o eventos de navegación insegura.|
|Acceso contextual|El informe de actividad de acceso contextual devuelve información sobre denegaciones de acceso a aplicaciones a los usuarios de tu cuenta. Utiliza la solicitud de endpoint de informe básico y proporciona parámetros específicos como el ID del dispositivo y la aplicación a la que se denegó el acceso.|
|Google Drive|Los informes de actividad de la aplicación Google Drive devuelven información sobre diferentes eventos de actividad de Google Drive. El informe de actividad de Drive sólo está disponible para los clientes de Google Workspace Business.|
|Google Chat|El informe de actividad de Google Chat devuelve información sobre cómo los usuarios de tu cuenta utilizan y gestionan Spaces. Cada informe utiliza la solicitud de endpoint básica con parámetros específicos del informe, como cargas u operaciones de mensajes.|
|Google Cloud|El informe de actividad de Google Cloud devuelve información sobre diferentes eventos de actividad relacionados con la API de inicio de sesión en sistemas operativos en la nube (Cloud OS).|
|Google Keep|El informe de actividad de Google Keep devuelve información sobre cómo los usuarios de tu cuenta gestionan y modifican sus notas. Cada informe utiliza la solicitud de endpoint básica con parámetros específicos del informe, como información de carga de archivos adjuntos u operaciones de notas.|
|Google Meet|El informe de actividad Google Meet devuelve información sobre diferentes aspectos de eventos de llamadas. Cada informe utiliza la solicitud de endpoint básica con parámetros específicos del informe, como datos de informes de abuso o datos de observación de transmisiones en directo.|
|GPlus|Los informes de actividad de la aplicación GPlus devuelven información sobre diferentes eventos de actividad de GPlus.|
|Grupos|Los informes de actividad de la aplicación Grupos de Google proporcionan información sobre diferentes eventos de actividad de Grupos.|
|Grupos de empresas|Los informes de actividad de Grupos de empresas devuelven información sobre diferentes eventos de actividad de Grupos de empresa.|
|Jamboard|El informe de actividad de Jamboard devuelve información sobre los cambios en los parámetros del dispositivo Jamboard. Cada informe utiliza la solicitud de endpoint básica con parámetros específicos del informe, como la licencia o los parámetros de emparejamiento de dispositivos.|
|Inicio de sesión|Los informes de actividad de la aplicación de Inicio de sesión devuelven información contable sobre diferentes tipos de eventos de actividad de Inicio de sesión.|
|Móvil|Los informes de actividad de Auditoría móvil devuelven información sobre diferentes tipos de eventos de actividad de Auditoría móvil.|
|Reglas|Los informes de actividad de Reglas devuelven información sobre diferentes tipos de eventos de actividad de Reglas.|
|Token|Los informes de actividad de la aplicación Token devuelven información contable sobre distintos tipos de eventos de actividad de Token.|
|SAML|El informe de actividad de SAML devuelve información sobre los resultados de los intentos de inicio de sesión SAML. Cada informe utiliza la solicitud de endpoint básica con parámetros específicos del informe, como el tipo de fallo y el nombre de la aplicación SAML.|
|Cuentas de usuario|Los informes de actividad de la aplicación Cuentas de usuario ofrecen información sobre diferentes tipos de eventos de actividad de Cuentas de usuario.|

## Configuración
### Instalación

Sigue la documentación [API de informes: Requisitos previos][1] del SDK de administración de Google Workspace antes de configurar la integración Google Workspace en Datadog.

**Nota**: Es posible que la configuración requiera ciertos contextos OAuth. Consulta la documentación [Autorizar solicitudes][2] del SDK de administración de Google Workspace.

Para configurar la integración Google Workspace en Datadog, haz clic en el botón *Connect a new Google Workspace domain* (Conectar un nuevo dominio de Google Workspace) en el [cuadro de tu integración Google Workspace en Datadog][3] y autoriza a Datadog a acceder a la API de administración de Google Workspace.

## Datos recopilados
### Logs

Para obtener información detallada de los logs y su contenido, consulta la [documentación del SDK de administración de Google Workspace][4].

**Nota**: Los logs de Groups, Grupos de empresa, Inicio de sesión, Token y Calendar se rastrean cada 90 minutos debido a una limitación en la frecuencia con la que Google sondea estos logs. Los logs de esta integración solo se envían cada 1,5-2 horas.

### Métricas

La integración Google Workspace no incluye métricas.

### Eventos

La integración Google Workspace no incluye eventos.

### Checks de servicio

La integración Google Workspace no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://developers.google.com/admin-sdk/reports/v1/guides/prerequisites
[2]: https://developers.google.com/admin-sdk/reports/v1/guides/authorizing#OAuth2Authorizing
[3]: https://app.datadoghq.com/account/settings#integrations/gsuite
[4]: https://developers.google.com/admin-sdk/reports/v1/reference/activities/list
[5]: https://docs.datadoghq.com/es/help/