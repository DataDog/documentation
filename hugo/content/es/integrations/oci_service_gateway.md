---
app_id: oci-service-gateway
app_uuid: 8f64cdf9-ed18-4b5d-8159-b358e01306be
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.service_gateway.bytes_from_service
      - oci.service_gateway.bytes_to_service
      - oci.service_gateway.packets_from_service
      - oci.service_gateway.packets_to_service
      - oci.service_gateway.sgw_drops_from_service
      - oci.service_gateway.sgw_drops_to_service
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 39303366
    source_type_name: OCI Service Gateway
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
- network
- nube
- oracle
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_service_gateway
integration_id: oci-service-gateway
integration_title: OCI Service Gateway
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_service_gateway
public_title: OCI Service Gateway
short_description: OCI Service Gateway permite el acceso privado y seguro a servicios
  de Oracle Cloud dentro de tu Virtual Cloud Network (VCN).
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Network
  - Categoría::Nube
  - Categoría::Oracle
  - Offering::Integration
  configuration: README.md#Configuración
  description: OCI Service Gateway permite el acceso privado y seguro a servicios
    de Oracle Cloud dentro de tu Virtual Cloud Network (VCN).
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: OCI Service Gateway
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Oracle Cloud Infrastructure (OCI) Service Gateway proporciona acceso privado y seguro a varios servicios de Oracle Cloud. Puedes acceder a servicios de Oracle Cloud simultáneamente desde dentro de una virtual cloud network (VCN) o en la red on-premises a través de una única gateway sin atravesar Internet.

Esta integración te permite monitorizar y alertar sobre el estado, el rendimiento y los errores de tu Service Gateway mediante la recopilación de métricas y etiquetas del espacio de nombres [oci_service_gateway][1].

## Configuración

### Instalación

Después de configurar la integración de [Oracle Cloud Infrastructure][2], comprueba que cualquier espacio de nombres mencionado anteriormente está incluido en tu [Connector Hub][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci_service_gateway" >}}


### Checks de servicios

OCI Service Gateway no incluye ningún check de servicio.

### Eventos

OCI Service Gateway no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.oracle.com/en-us/iaas/Content/Network/Reference/SGWmetrics.htm
[2]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_service_gateway/metadata.csv
[5]: https://docs.datadoghq.com/es/help/