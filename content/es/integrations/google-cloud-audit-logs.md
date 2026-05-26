---
aliases:
- /es/integrations/google_cloud_audit_logs
app_id: logs_auditoría_google_cloud
categories:
- nube
- google cloud
- recopilación de logs
- seguridad
custom_kind: integración
description: Un dashboard preajustado para la seguridad GCP que se activa automáticamente
  cuando se envían logs de auditoría GCP a Datadog.
media: []
title: Logs de auditoría de Google Cloud
---
## Información general

La monitorización de logs de auditoría de GCP permite comprender mejor quién accede a un recurso, cómo lo hace y si el acceso estaba permitido o no.

Existen cuatro tipos de logs de auditoría.

- **Logs de auditoría de eventos del sistema**: Generados por defecto por GCP, los logs de auditoría de eventos del sistema contienen entradas de log de acciones de Google Cloud que modifican la configuración de los recursos. Los logs de auditoría de eventos del sistema son generados por los sistemas de Google, no son guiados por la acción directa del usuario.
- **Logs de auditoría de la actividad del administrador**: Generados por defecto por GCP, los logs de auditoría de la actividad del administrador contienen entradas de log de llamadas a la API u otras acciones que modifican la configuración o los metadatos de los recursos. Por ejemplo, estos logs registran cuando los usuarios crean instancias de máquina virtual (VM) o cambian los permisos de gestión de identidad y acceso.
- **Logs de auditoría de acceso a datos**: [activados por separado](https://cloud.google.com/logging/docs/audit/configure-data-access) por recurso, los logs de auditoría de acceso a datos contienen las llamadas a la API que leen la configuración o los metadatos de los recursos, así como las llamadas a la API controladas por el usuario que crean, modifican o leen datos de recursos proporcionados por el usuario. Los logs de auditoría de acceso a datos no registran las operaciones de acceso a datos en recursos que se comparten públicamente.
- **Logs de auditoría de políticas denegadas**: generados de forma predeterminada, el registro en la nube registra los logs de auditoría de política denegada cuando un servicio de Google Cloud deniega el acceso a un usuario o [cuenta de servicio](https://cloud.google.com/iam/docs/service-accounts) debido a una infracción de la política de seguridad.

## Configuración

### Instalación

Puedes reenviar estos logs a través de un tema Pub/Sub utilizando las [instrucciones de recopilación de logs](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection) en la página de integración de Google Cloud Platform.

Para más información, consulta [Comprender los logs de auditoría](https://cloud.google.com/logging/docs/audit/understanding-audit-logs) o [Prácticas recomendadas para la monitorización de logs de auditoría de GCP](https://www.datadoghq.com/blog/monitoring-gcp-audit-logs/).

## Datos recopilados

### Métricas

La integración de logs de auditoría de Google Cloud no incluye métricas.

### Eventos

La integración de logs de auditoría de Google Cloud no incluye eventos.

### Checks de servicio

La auditoría de Google Cloud Logs integración no incluye ninguna servicio checks .

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).