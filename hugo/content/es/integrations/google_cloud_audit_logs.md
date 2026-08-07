---
app_id: logs_auditoría_google_cloud
app_uuid: cadf465e-c3fa-4c62-8998-39e7149c2225
assets:
  dashboards:
    gcp_audit_logs: assets/dashboards/gcp_audit_logs.json
  integration:
    auto_install: true
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 702
    source_type_name: Logs de auditoría de Google Cloud
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- google cloud
- recopilación de logs
- seguridad
custom_kind: integración
dependencies: []
description: Visualiza el dashboard de logs de auditoría.
display_on_public_website: true
doc_link: ''
draft: false
git_integration_title: logs_auditoría_google_cloud
has_logo: true
integration_id: logs_auditoría_google_cloud
integration_title: Logs de auditoría de Google Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: logs_auditoría_google_cloud
public_title: Logs de auditoría de Google Cloud
short_description: Un dashboard preajustado para la seguridad GCP que se activa automáticamente
  cuando se envían logs de auditoría GCP a Datadog.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Google Cloud
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  configuration: README.md#Configuración
  description: Un dashboard preajustado para la seguridad GCP que se activa automáticamente
    cuando se envían logs de auditoría GCP a Datadog.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Logs de auditoría de Google Cloud
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

La monitorización de logs de auditoría de GCP permite comprender mejor quién accede a un recurso, cómo lo hace y si el acceso estaba permitido o no.

Existen cuatro tipos de logs de auditoría.
* **Logs de auditoría de eventos del sistema**: Generados por defecto por GCP, los logs de auditoría de eventos del sistema contienen entradas de log de acciones de Google Cloud que modifican la configuración de los recursos. Los logs de auditoría de eventos del sistema son generados por los sistemas de Google, no son guiados por la acción directa del usuario.
* **Logs de auditoría de la actividad del administrador**: Generados por defecto por GCP, los logs de auditoría de la actividad del administrador contienen entradas de log de llamadas a la API u otras acciones que modifican la configuración o los metadatos de los recursos. Por ejemplo, estos logs registran cuando los usuarios crean instancias de máquina virtual (VM) o cambian los permisos de gestión de identidad y acceso.
* **Logs de auditoría del acceso a datos**: [Habilitados por separado][1] para cada recurso, los logs de auditoría del acceso a datos contienen llamadas a la API que leen la configuración o los metadatos de los recursos, así como las llamadas a la API dirigidas por el usuario que crean, modifican o leen datos de recursos proporcionados por el usuario. Los logs de auditoría del acceso a datos no registran las operaciones de acceso a los datos en recursos que se comparten públicamente.
* **Logs de auditoría denegados por políticas**: Generados de forma predeterminada, la generación de logs en la nube registra los logs de auditoría denegados por políticas cuando el servicio Google Cloud deniega el acceso a un usuario o [cuenta de servicio][2] debido a la infracción de una política de seguridad.

## Configuración

### Instalación
Puedes reenviar estos logs a través de un tema Pub/Sub utilizando las [instrucciones de recopilación de logs][3] de la página de la integración Google Cloud Platform.

Para obtener más información, consulta [Comprender logs de auditoría][4] o [Prácticas recomendadas para la monitorización de logs de auditoría de GCP][5].

## Datos recopilados

### Métricas

La integración de logs de auditoría de Google Cloud no incluye métricas.

### Eventos

La integración de logs de auditoría de Google Cloud no incluye eventos.

### Checks de servicios

La auditoría de Google Cloud Logs integración no incluye ninguna servicio checks .

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].

[1]: https://cloud.google.com/logging/docs/audit/configure-data-access
[2]: https://cloud.google.com/iam/docs/service-accounts
[3]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[4]: https://cloud.google.com/logging/docs/audit/understanding-audit-logs
[5]: https://www.datadoghq.com/blog/monitoring-gcp-audit-logs/
[6]: https://docs.datadoghq.com/es/help/