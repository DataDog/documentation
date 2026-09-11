---
app_id: amazon-athena
app_uuid: 99ab7fc9-5c16-4411-b0e9-a8e8ebe55792
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: aws.athena.total_execution_time
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.athena.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 239
    source_type_name: Amazon Athena
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
description: Rastrea métricas clave de Amazon Athena.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_athena/
draft: false
git_integration_title: amazon_athena
has_logo: true
integration_id: amazon-athena
integration_title: Amazon Athena
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_athena
public_title: Amazon Athena
short_description: Un servicio de consulta interactivo que simplifica el análisis
  de datos en Amazon S3 mediante SQL estándar.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::AWS
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Un servicio de consulta interactivo que simplifica el análisis de datos
    en Amazon S3 mediante SQL estándar.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon Athena
version: '1.0'
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-internal-core -->
## Información general

Amazon Athena es un servicio de consulta interactivo que facilita el análisis de datos directamente en Amazon Simple Storage Service (Amazon S3) mediante SQL estándar.

Activa esta integración para ver todas tus métricas de Athena en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de integración de AWS][2], asegúrate de que `Athena` está activada en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon Athena][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_athena" >}}


### Eventos

La integración de Amazon Athena no incluye ningún evento.

### Checks de servicio

La integración de Amazon Athena no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-athena
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_athena/assets/metrics/metric-spec.yaml
[5]: https://docs.datadoghq.com/es/help/