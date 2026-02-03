---
aliases:
- /es/integrations/confluent_cloud_audit_logs
app_id: confluent-cloud-audit-Logs
categories:
- seguridad
- recopilación de logs
custom_kind: integración
description: Recopila logs de auditorías para tus recursos de Confluent Cloud.
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Logs de auditorías de Confluent Cloud
---
## Información general

Esta integración permite la recopilación de [logs de auditoría de Confluent Cloud](https://docs.confluent.io/cloud/current/monitoring/audit-logging/cloud-audit-log-concepts.html) para capturar la actividad dentro de tu cuenta de Confluent.

Esto te permite:

- Rastrear y atribuir los accesos a tus recursos de Confluent Cloud.
- Identificar actividades anómalas o sospechosas.
- Monitorizar y resolver en forma proactiva los riesgos de seguridad.

La integración de logs de auditoría de Datadog y Confluent Cloud recopila eventos de tu tema de logs de auditoría de Confluent Cloud y los ingiere en Datadog como logs. Para obtener una vista completa de todos los tipos de eventos de logs de auditoría, consulta el [esquema de métodos de eventos auditables de Confluent Cloud](https://docs.confluent.io/cloud/current/monitoring/audit-logging/event-methods/index.html).

Busca `source:confluent-cloud-audit-logs` para ver tus logs de auditoría de Confluent Cloud en el [producto Logs Management](https://docs.datadoghq.com/logs/) de Datadog.

## Configuración

### Instalación

Consulta las [instrucciones de configuración de logs de auditoría de Confluent](https://docs.confluent.io/cloud/current/monitoring/audit-logging/configure.html#consume-with-java). Aunque esta documentación proporciona fragmentos de código Java, solo es necesario copiar los valores necesarios para configurar el cuadro.

1. Utiliza la CLI de Confluent para generar la clave de API y el par de secretos de API para tu clúster de logs de auditoría. Ten en cuenta que se necesitan permisos [OrganizationAdmin](https://docs.confluent.io/cloud/current/security/access-control/rbac/predefined-rbac-roles.html#organizationadmin-role) para ingerir logs de auditoría.
1. Copia la cadena `bootstrap.servers`.
1. Introduce la clave de API, el token de API y la cadena `bootstrap.servers` en el [cuadro de integración](https://app.datadoghq.com/integrations/cloudflare).
1. Haz clic en "Save" (Guardar).

Tus logs de auditorías de Confluent Cloud deberían comenzar a ingerirse automáticamente en 5 minutos.

## Datos recopilados

### Métricas

Los logs de auditorías de Confluent Cloud no incluyen ninguna métrica.

### Checks de servicio

Los logs de auditorías de Confluent Cloud no incluyen ningún check de servicio.

### Logs

Los logs de auditoría de Confluent Cloud recopilan datos del tema [confluent-audit-log-events](https://docs.confluent.io/cloud/current/monitoring/audit-logging/event-methods/index.html) de Confluent Cloud.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).