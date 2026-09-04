---
app_id: amazon-pcs
app_uuid: 437d6d87-a4d8-4064-a624-d977c455922a
assets:
  dashboards:
    amazon-pcs: assets/dashboards/amazon_pcs_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.pcs.actual_capacity
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.pcs.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 30323961
    source_type_name: Amazon PCS
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
git_integration_title: amazon_pcs
integration_id: amazon-pcs
integration_title: AWS PCS
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_pcs
public_title: AWS PCS
short_description: AWS Parallel Computing Service (PCS) proporciona herramientas para
  crear y gestionar clústeres para una computación de alto rendimiento (HPC).
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  - Offering::Integration
  configuration: README.md#Configuración
  description: AWS Parallel Computing Service (PCS) proporciona herramientas para
    crear y gestionar clústeres para una computación de alto rendimiento (HPC).
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: AWS PCS
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

AWS Parallel Computing Service (AWS PCS) es un servicio gestionado que le facilita la ejecución y el escalado de tus cargas de trabajo de computación de alto rendimiento (HPC) y la creación de modelos científicos y de ingeniería en AWS.

Activa esta integración para ver todas tus métricas de PCS en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Configuración

1. En la [página de la integración AWS][2], asegúrate de que AWS PCS está activado en la pestaña **Recopilación de métricas**.
2. Instala la [integración AWS PCS en Datadog][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon-pcs" >}}


### Checks de servicio

La integración AWS PCS no incluye checks de servicios.

### Eventos

La integración AWS PCS no incluye eventos.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-pcs
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_pcs/assets/metrics/metric-spec.yaml
[5]: https://docs.datadoghq.com/es/help/