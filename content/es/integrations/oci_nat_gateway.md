---
app_id: oci-nat-gateway
app_uuid: 80e00ce9-4129-4b76-9bd0-8eaecf0d52e4
assets:
  dashboards:
    OCI-NAT-Gateway-Overview: assets/dashboards/oci-nat-gateway-overview-dashboard.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.nat_gateway.bytes_from_natgw
      - oci.nat_gateway.bytes_to_natgw
      - oci.nat_gateway.connections_closed
      - oci.nat_gateway.connections_established
      - oci.nat_gateway.connections_timed_out
      - oci.nat_gateway.drops_to_natgw
      - oci.nat_gateway.packets_from_natgw
      - oci.nat_gateway.packets_to_natgw
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 24742485
    source_type_name: OCI NAT Gateway
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- la red
- nube
- oracle
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_nat_gateway
integration_id: oci-nat-gateway
integration_title: OCI NAT Gateway
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_nat_gateway
public_title: OCI NAT Gateway
short_description: OCI NAT Gateway garantiza un acceso seguro y controlado a Internet
  saliente para tus recursos dentro de una VCN.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Cloud
  - Category::Oracle
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI NAT Gateway garantiza un acceso seguro y controlado a Internet
    saliente para tus recursos dentro de una VCN.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI NAT Gateway
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Oracle Cloud Infrastructure (OCI) ofrece una solución de traducción de direcciones de red (NAT) fiable y de alta disponibilidad para tu Virtual Cloud Network (VCN) en forma de NAT gateway.

Esta integración te permite monitorizar y alertar sobre el tráfico y la pérdida de paquetes hacia y desde tu NAT gateway mediante la recopilación de métricas y etiquetas del espacio de nombres [`oci_nat_gateway`][1].

## Configuración

### Instalación

Después de configurar la integración de [Oracle Cloud  Infrastructure][2], asegúrate de que el espacio de nombres `oci_nat_gateway` está incluido en tu [Connector Hub][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci_nat_gateway" >}}


### Eventos

La integración de OCI NAT Gateway no incluye ningún evento.

### Checks de servicio

La integración de OCI NAT Gateway no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].


[1]: https://docs.oracle.com/en-us/iaas/Content/Network/Reference/nat-gateway-metrics.htm
[2]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_nat_gateway/metadata.csv
[5]: https://docs.datadoghq.com/es/help/