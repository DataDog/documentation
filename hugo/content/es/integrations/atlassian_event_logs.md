---
app_id: atlassian-event-logs
app_uuid: b2294505-ae3d-44d3-bbf2-174032e95be3
assets:
  dashboards:
    atlassian-event-logs: assets/dashboards/atlassian_organization_audit_logs.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 19256538
    source_type_name: Logs de eventos de Atlassian
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
git_integration_title: atlassian_event_logs
integration_id: atlassian-event-logs
integration_title: Logs de auditoría de la organización Atlassian
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: atlassian_event_logs
public_title: Logs de auditoría de la organización Atlassian
short_description: Monitoriza la actividad administrativa de la suscripción a Atlassian
  Guard de tu organización
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
  description: Monitoriza la actividad administrativa de la suscripción a Atlassian
    Guard de tu organización
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Logs de auditoría de la organización Atlassian
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

[Logs de auditoría de la organization][1] Atlassian realizan un seguimiento de los cambios de administrador en las configuraciones del y el acceso de producto de tu organización. Esta integración proporciona visibilidad en eventos de administrador a través de todos los productos de Atlassian, más allá de Jira y Confluence. Además de estas acciones administrativas, recomendamos instalar las integraciones de **Registros de auditoría de Jira y Confluence** para obtener eventos de usuario más detallados específicos del producto.

Esta integración también puede usarse para configurar reglas de detección de [Cloud SIEM][2] usando el pipeline de logs predefinidos.

Además, puedes:
- Controlar la retención de datos de tus productos de Atlassian.
- Crear widgets y dashboards personalizados.
- Establecer reglas de detección que desencadenen acciones específicas.
- Hacer una referencia cruzada de los eventos de producto de Atlassian con los datos de otros servicios.

Los logs se recopilan mediante la [API de logs de auditoría][1] de Atlassian y registran la siguiente información:

- **Gestión de grupos**: creaciones, eliminaciones, renombramientos y modificaciones de listas de usuarios de grupos.
- **Configuración de acceso a grupos**: cambios en el acceso a productos o administración de un grupo. Esto incluye la concesión y revocación de roles de acceso.
- **Configuración de acceso a productos**: cambios en la configuración de invitaciones y usuarios permitidos para el acceso a productos o sitios. Esto incluye habilitar y deshabilitar invitaciones de cuentas de terceros, así como crear o revocar tokens de API.

Para obtener detalles más específicos sobre las propiedades de estos logs, visita la documentación de [Rastreo de las actividades de la organización desde los logs de auditoría][3] de Atlassian. Si tu organización tiene [Atlassian Guard Premium Tier][4], tu cuenta puede generar eventos de logs de auditoría adicionales que rastrean el contenido creado por el usuario y la actividad de clasificación.

Busca `source:atlassian-event-logs` para ver tus logs de auditoría de la organización Atlassian en el [producto de gestión de logs][5] de Datadog.


## Configuración

1. Desde la pestaña **Configure** (Configuración) del cuadro Logs de auditoría de la organización Atlassian, haz clic en el botón **Add New** (Añadir nuevo).
2. Sigue las instrucciones del cuadro de Logs de auditoría de la organización Atlassian para autenticarse utilizando tu **ID de organización Atlassian** y **Token de portador de API**.

### Validación

En el Log Explorer de Datadog, busca tus logs utilizando la consulta: `source:atlassian-event-logs`. Si la integración se ha instalado y autenticado correctamente, los logs deberían aparecer en breve.

## Datos recopilados

### Métricas

Logs de auditoría de la organización Atlassian no incluye ninguna métrica.

### Checks de servicio

Logs de auditoría de la organización Atlassian no incluye ningún check de servicio.

### Eventos

Logs de auditoría de la organización Atlassian no incluye ningún evento.

### Logs

Logs de auditoría de la organización Atlassian recopila logs de auditoría.

## Solucionar problemas
#### Restricciones del límite de tasa
Las organizaciones con altos niveles de actividad administrativa pueden alcanzar el límite de tasa de la API. Consulta la documentación de [Límite de tasa de logs de auditoría][6] de Atlassian para conocer los límites actuales. Si la tasa de ingesta de logs se acerca al umbral máximo, puede ser la causa de que falten logs.


¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].


[1]: https://developer.atlassian.com/cloud/admin/organization/rest/api-group-events/#api-v1-orgs-orgid-events-get
[2]: https://www.datadoghq.com/product/cloud-siem/
[3]: https://support.atlassian.com/organization-administration/docs/track-organization-activities-from-the-audit-log/
[4]: https://support.atlassian.com/organization-administration/docs/track-organization-activities-from-the-audit-log/#:~:text=Atlassian%20Guard%20Standard-,Atlassian%20Guard%20Premium,-Cloud%20Enterprise
[5]: https://docs.datadoghq.com/es/logs/
[6]: https://developer.atlassian.com/cloud/admin/organization/rest/intro/#rate%20limits
[7]: https://docs.datadoghq.com/es/help/