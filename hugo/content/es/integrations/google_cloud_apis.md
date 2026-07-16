---
app_id: google-cloud-apis
app_uuid: b2dc9b16-68b8-47c0-a9e0-351d9c356baa
assets:
  dashboards:
    google-cloud-apis: assets/dashboards/google_cloud_apis_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - gcp.serviceruntime.api.request_count
      metadata_path: metadata.csv
      prefix: gcp.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 262
    source_type_name: API Google Cloud
  monitors:
    Instances per VPC approaching limit: assets/monitors/compute_instance_vpc_quota.json
    Service Quota utilization is high: assets/monitors/serviceruntime_rate_quota.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- google cloud
- métricas
- nube
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_cloud_apis
integration_id: google-cloud-apis
integration_title: API Google Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_apis
public_title: API Google Cloud
short_description: Las API Google Cloud te permiten acceder a los productos de la
  Google Cloud Platform desde tu código.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Google Cloud
  - Categoría::Métricas
  - Categoría::Nube
  - Tipo de datos consultados::Métricas
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Las API Google Cloud te permiten acceder a los productos de la Google
    Cloud Platform desde tu código.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: API Google Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Información general

Las API Google Cloud te permiten acceder a los productos de la Google Cloud Platform desde tu código.

Utiliza la integración de Google Cloud Platform con Datadog para recopilar métricas de las API Google Cloud.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google-cloud-apis" >}}


### Eventos

La integración de las API Google Cloud no incluyen eventos.

### Checks de servicio

La integración de las API Google Cloud no incluyen checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_apis/google_cloud_apis_metadata.csv
[3]: https://docs.datadoghq.com/es/help/