---
app_id: amazon-backup
app_uuid: 03abb29f-67fa-4740-8c5f-17c1ab15cbe2
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: aws.backup.number_of_backup_jobs_created
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.backup.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 342
    source_type_name: Amazon Backup
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de AWS Backup.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_backup/
draft: false
git_integration_title: amazon_backup
has_logo: true
integration_id: amazon-backup
integration_title: AWS Backup
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_backup
public_title: AWS Backup
short_description: Centraliza y automatiza la protección de datos para los servicios
  de AWS y las cargas de trabajo híbridas.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::AWS
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Configuración
  description: Centraliza y automatiza la protección de datos para los servicios de
    AWS y las cargas de trabajo híbridas.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: AWS Backup
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

AWS Backup te permite centralizar y automatizar la protección de datos entre servicios de AWS
y cargas de trabajo híbridas.

Activa esa integración para ver tus métricas de Backup en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura [la integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `Backup` está activada en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y AWS Backup][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_backup" >}}


### Eventos

La integración de AWS Backup no incluye ningún evento.

### Checks de servicio

La integración de AWS Backup no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-backup
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_backup/assets/metrics/metric-spec.yaml
[5]: https://docs.datadoghq.com/es/help/