---
app_id: oci-vpn
app_uuid: 5dc51055-a401-4489-82d9-2b37e881985c
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.vpn.bytes_received
      - oci.vpn.bytes_sent
      - oci.vpn.packets_error
      - oci.vpn.packets_received
      - oci.vpn.packets_sent
      - oci.vpn.tunnel_state
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 38638772
    source_type_name: OCI VPN
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
- nube
- oracle
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_vpn
integration_id: oci-vpn
integration_title: OCI VPN
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_vpn
public_title: OCI VPN
short_description: OCI VPN extiende de forma segura tu red on-premises a Oracle Cloud
  a través de una conexión cifrada de Virtual Private Network.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Categoría::Nube
  - Categoría::Oracle
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI VPN extiende de forma segura tu red on-premises a Oracle Cloud
    a través de una conexión cifrada de Virtual Private Network.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI VPN
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Oracle Cloud Infrastructure (OCI) Site-to-Site Virtual Private Network (VPN) utiliza el protocolo IPSec estándar del sector para garantizar una conectividad privada y segura desde tus redes corporativas a OCI a través de tu conexión a Internet existente.

Esta integración te permite monitorizar y alertar sobre el estado de la VPN, el rendimiento y los errores mediante la recopilación de métricas del espacio de nombres [oci_vpn][1].

## Configuración

### Instalación

Después de configurar la integración [Oracle Cloud Infrastructure][2], comprueba que los espacios de nombres mencionados anteriormente están incluidos en tu [Connector Hub][3].


## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci_vpn" >}}


### Checks de servicio

OCI VPN no incluye ningún check de servicio.

### Eventos

OCI VPN no incluye ningún evento.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].


[1]: https://docs.oracle.com/en-us/iaas/Content/Network/Reference/ipsecmetrics.htm
[2]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_vpn/metadata.csv
[5]: https://docs.datadoghq.com/es/help/