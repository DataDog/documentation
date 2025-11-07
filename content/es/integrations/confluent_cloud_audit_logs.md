---
app_id: confluent-cloud-audit-logs
app_uuid: c74afba8-201e-4ea4-9cd1-5607fb908949
assets:
  dashboards:
    Confluent-Cloud-Audit-Logs-Overview: assets/dashboards/confluent-cloud-audit-logs-overview-dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: true
    source_type_id: 21251477
    source_type_name: Logs de auditorías de Confluent Cloud
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- seguridad
- recopilación de logs
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: confluent_cloud_audit_logs
integration_id: confluent-cloud-audit-Logs
integration_title: Logs de auditorías de Confluent Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: confluent_cloud_audit_logs
public_title: Logs de auditorías de Confluent Cloud
short_description: Recopila logs de auditorías para tus recursos de Confluent Cloud.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Security
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Recopila logs de auditorías para tus recursos de Confluent Cloud.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Logs de auditorías de Confluent Cloud
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-internal-core -->


## Información general
Esta integración permite la recopilación de [logs de auditorías de Confluent Cloud][1] para capturar la actividad en tu cuenta de Confluent. 

Esto te permite:

- Rastrear y atribuir los accesos a tus recursos de Confluent Cloud.
- Identificar actividades anómalas o sospechosas.
- Monitorizar y resolver en forma proactiva los riesgos de seguridad.

La integración de logs de auditorías de Datadog y Confluent Cloud recopila eventos de tu tema de logs de auditorías de Confluent Cloud y los ingiere en Datadog como logs. Para obtener una vista completa de todos los tipos de eventos de logs de auditorías, consulta el [esquema de métodos de eventos auditables de Confluent Cloud][2].

Busca `source:confluent-cloud-audit-logs` para ver tus logs de auditorías de Confluent Cloud en el [producto de gestión de logs][3] de Datadog.

## Configuración

### Instalación

Consulta las [instrucciones de configuración de logs de auditorías de Confluent][4]. Aunque esta documentación proporciona fragmentos de código de Java, sólo tienes que copiar los valores necesarios para configurar el ícono.

1. Utiliza la CLI de Confluent para generar la clave de la API y el par de secretos de la API para tu clúster de logs de auditorías. Ten en cuenta que se necesitan permisos [OrganizationAdmin][5] para ingerir los logs de auditorías.
2. Copia la cadena `bootstrap.servers`.
3. Introduce la clave de la API, el token de la API y la cadena `bootstrap.servers` en el [ícono de integración][6].
4. Haz clic en "Save" (Guardar). 

Tus logs de auditorías de Confluent Cloud deberían comenzar a ingerirse automáticamente en 5 minutos.


## Datos recopilados

### Métricas

Los logs de auditorías de Confluent Cloud no incluyen ninguna métrica.

### Checks de servicio

Los logs de auditorías de Confluent Cloud no incluyen ningún check de servicio.

### Logs

Los logs de auditorías de Confluent Cloud recopilan datos del tema [confluent-audit-log-events][2] de Confluent Cloud.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].

[1]: https://docs.confluent.io/cloud/current/monitoring/audit-logging/cloud-audit-log-concepts.html
[2]: https://docs.confluent.io/cloud/current/monitoring/audit-logging/event-methods/index.html
[3]: https://docs.datadoghq.com/es/logs/
[4]: https://docs.confluent.io/cloud/current/monitoring/audit-logging/configure.html#consume-with-java
[5]: https://docs.confluent.io/cloud/current/security/access-control/rbac/predefined-rbac-roles.html#organizationadmin-role
[6]: https://app.datadoghq.com/integrations/cloudflare
[7]: https://docs.datadoghq.com/es/help/