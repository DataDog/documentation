---
app_id: zoom-activity-logs
app_uuid: 2297e963-5129-4711-bf04-767d5c929f5e
assets:
  dashboards:
    zoom-activity-logs: assets/dashboards/zoom_activity_logs_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10394
    source_type_name: Logs de actividades de Zoom
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: zoom_activity_logs
integration_id: zoom-activity-logs
integration_title: Logs de actividades de Zoom
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: zoom_activity_logs
public_title: Logs de actividades de Zoom
short_description: Consumir logs de operaciones y actividades de Zoom
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Consumir logs de operaciones y actividades de Zoom
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Logs de actividades de Zoom
---

<!--  FUENTE https://github.com/DataDog/integrations-internal-core -->


## Información general
Esta integración permite la recopilación de Logs de actividades de Zoom para capturar la actividad dentro de tu cuenta de Zoom. Esto te permite hacer lo siguiente:

- cruzar las referencias de los eventos de Zoom con los datos de otros servicios en tu entorno, 
- crear widgets y dashboards personalizados con los datos de tus eventos de Zoom, 
- configurar las reglas de detección de [Cloud SIEM][1] mediante el pipeline de logs predefinidos.

La integración de Zoom de Datadog recopila logs mediante [actividades de inicio y cierre de sesión][1] y [logs de operaciones][2], que proporcionan información sobre la actividad de administradores y usuarios, entre otras cosas:
  - añadir un nuevo usuario,
  - cambiar la configuración de la cuenta,
  - borrar grabaciones.
  - Actividades de inicio y cierre de sesión


## Configuración

### Instalación

1. Navega hasta la página de integraciones y busca la integración "Zoom Activity Log" (Log de actividades de Zoom). 
3. Haz clic en el cuadro. 
4. Para añadir una cuenta para instalar la integración, haz clic en el botón "Add Account" (Añadir cuenta). 
5. Después de leer las instrucciones del modal, haz clic en el botón "Authorize" (Autorizar), que te redirige a una página de inicio de sesión de Zoom. 
6. Con una cuenta de administrador de Zoom, inicia sesión en Zoom. 
7. Aparece una pantalla de solicitud de acceso al 
contexto `report:read:admin` que permite a Datadog ver los datos de los informes de auditoría. Haz clic en "Accept" (Aceptar).
8. Se te redirige de nuevo al cuadro Zoom Activity Log (Log de actividades de Zoom) de Datadog con una nueva cuenta. Se recomienda cambiar el 'Account Name' (Nombre de cuenta) a algo más fácil de recordar. 


## Permisos

Datadog para Zoom requiere los siguientes contextos de OAuth. Para obtener más información, consulta la [documentación de contextos de OAuth para Zoom][3].

### Contextos a nivel de usuario

| Contextos                   | Motivo de la solicitud                                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------------------------|
| `report:read:admin`          | Lectura de los logs de actividades de auditoría del administrador y del usuario que incluye eventos como añadir un nuevo usuario, cambiar la configuración de la cuenta y eliminar grabaciones. Lectura de los logs de actividades de inicio y cierre de sesión de los usuarios de una cuenta de Zoom.                        |


### Eliminar la aplicación
Para desinstalar la integración de Logs de actividades de Zoom, navega al cuadro Zoom Activity Log (Log de actividades de Zoom) y elimina cualquier cuenta existente que aparezca en la tabla de cuentas.


## Datos recopilados

### Métricas

Logs de actividades de Zoom no incluye métricas.

### Checks de servicio

Logs de actividades de Zoom no incluye checks de servicio.

### Logs
Logs de actividades de Zoom recopila los datos de los endpoints [Log de actividades de inicio y cierre de sesión][1] y [Logs de operaciones][2] de Zoom.

### Eventos

Logs de actividades de Zoom no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].


[1]: https://developers.zoom.us/docs/api/rest/reference/zoom-api/methods/#operation/reportSignInSignOutActivities
[2]: https://developers.zoom.us/docs/api/rest/reference/zoom-api/methods/#operation/reportOperationLogs
[3]: https://developers.zoom.us/docs/integrations/oauth-scopes-granular/#reports
[4]: https://docs.datadoghq.com/es/help/