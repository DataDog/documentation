---
app_id: amazon-globalaccelerator
app_uuid: 344106fe-9dc6-4ca5-a386-6811332f174c
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.globalaccelerator.processed_bytes_in
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.globalaccelerator.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10431
    source_type_name: Amazon GlobalAccelerator
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- métricas
- nube
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_globalaccelerator
integration_id: amazon-globalaccelerator
integration_title: Amazon Global Accelerator
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_globalaccelerator
public_title: Amazon Global Accelerator
short_description: Global Accelerator utiliza aceleradores para mejorar el rendimiento
  de las aplicaciones.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Global Accelerator utiliza aceleradores para mejorar el rendimiento
    de las aplicaciones.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon Global Accelerator
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

AWS Global Accelerator es un servicio en el que puedes crear aceleradores para mejorar el rendimiento de tus aplicaciones para usuarios locales y globales.

Activa esta integración para ver todas tus métricas de Global Accelerator en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que Global Accelerator está activado en la pestaña **Metric Collection** (Recopilación de métricas).
2. Instala la [integración de Datadog y AWS Global Accelerator][3].


## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon-globalaccelerator" >}}


### Checks de servicio

AWS Global Accelerator no incluye ningún check de servicio.

### Eventos

AWS Global Accelerator no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-globalaccelerator
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_globalaccelerator/assets/metrics/metric-spec.yaml
[5]: https://docs.datadoghq.com/es/help/