---
app_id: oci-vcn
app_uuid: 9bea50e7-6c44-48aa-b46e-66a98c0df1b3
assets:
  dashboards:
    OCI-VCN-Overview: assets/dashboards/oci-vcn-overview-dashboard.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.vcn.smartnic_buffer_drops_from_host
      - oci.vcn.smartnic_buffer_drops_from_network
      - oci.vcn.vnic_conntrack_is_full
      - oci.vcn.vnic_conntrack_util_percent
      - oci.vcn.vnic_egress_drops_conntrack_full
      - oci.vcn.vnic_egress_drops_security_list
      - oci.vcn.vnic_egress_drops_throttle
      - oci.vcn.vnic_from_network_bytes
      - oci.vcn.vnic_from_network_packets
      - oci.vcn.vnic_ingress_drops_conntrack_full
      - oci.vcn.vnic_ingress_drops_security_list
      - oci.vcn.vnic_ingress_drops_throttle
      - oci.vcn.vnic_to_network_bytes
      - oci.vcn.vnic_to_network_packets
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 24743904
    source_type_name: OCI VCN
  monitors:
    A Connection Tracking Table is full: assets/monitors/full-connections.json
    A VCN is experiencing a volume of egress packet drops: assets/monitors/high-egress-drops.json
    A VCN is experiencing a volume of ingress packet drops: assets/monitors/high-ingress-drops.json
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
git_integration_title: oci_vcn
integration_id: oci-vcn
integration_title: OCI VCN
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_vcn
public_title: OCI VCN
short_description: OCI Virtual Cloud Network (VCN) te permite crear redes de nube
  aislada segura para gestionar y segmentar tus recursos.
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
  description: OCI Virtual Cloud Network (VCN) te permite crear redes de nube aislada
    segura para gestionar y segmentar tus recursos.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI VCN
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Las Virtual Cloud Networks (VCNs) de Oracle Cloud Infrastructure (OCI) son centros de datos privados y flexibles en la nube con políticas de seguridad y administración integrada y solución de problemas.

Esta integración te permite monitorizar el rendimiento, la producción y el estado de tus VCNs mediante la recopilación de métricas y etiquetas del espacio de nombres [`oci_vcn`][1].

## Configuración

### Instalación

Después de configurar la integración de [Oracle Cloud  Infrastructure][2], asegúrate de que el espacio de nombres `oci_vcn` está incluido en tu [Connector Hub][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci-vcn" >}}


### Eventos

La integración de OCI VPN no incluye eventos.

### Checks de servicio

La integración de OCI VCN no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].


[1]: https://docs.oracle.com/en-us/iaas/Content/Network/Reference/vnicmetrics.htm#VNIC_Metrics
[2]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_vcn/metadata.csv
[5]: https://docs.datadoghq.com/es/help/