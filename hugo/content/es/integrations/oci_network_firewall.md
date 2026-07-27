---
app_id: oci-network-firewall
app_uuid: abfc894c-e77c-40fa-bf1f-45a2f66fad4b
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.network_firewall.byte_received_count
      - oci.network_firewall.byte_sent_count
      - oci.network_firewall.decryption_rule_hit_count
      - oci.network_firewall.icmp_fragment_attacks_count
      - oci.network_firewall.ip_spoof_count
      - oci.network_firewall.land_attacks_count
      - oci.network_firewall.mac_spoof_count
      - oci.network_firewall.packet_drop_count
      - oci.network_firewall.packet_received_count
      - oci.network_firewall.packet_received_in_error_count
      - oci.network_firewall.packet_sent_count
      - oci.network_firewall.ping_of_death_attacks_count
      - oci.network_firewall.security_rule_hit_count
      - oci.network_firewall.teardrop_attacks_count
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 42264195
    source_type_name: OCI Network Firewall
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- red
- nube
- oracle
- métricas
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_network_firewall
integration_id: oci-network-firewall
integration_title: OCI Network Firewall
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_network_firewall
public_title: OCI Network Firewall
short_description: OCI Network Firewall proporciona protección de cortafuegos escalable
  con funciones de seguridad avanzadas.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Cloud
  - Category::Oracle
  - Category::Metrics
  - Category::Security
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI Network Firewall proporciona protección de cortafuegos escalable
    con funciones de seguridad avanzadas.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI Network Firewall
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

OCI Network Firewall es un servicio de cortafuegos gestionado que ofrece detección y prevención de intrusiones para tu Virtual Cloud Network (VCN). Proporciona funciones de seguridad avanzadas para monitorizar y controlar el tráfico de red, garantizando una sólida protección frente a las ciberamenazas.

Esta integración te permite monitorizar el estado, la capacidad y el rendimiento de tu cortafuegos mediante la recopilación de métricas y etiquetas (tags) del espacio de nombres de [oci_network_firewall][1].

## Configuración

### Instalación

Una vez configurada la integración de [Oracle Cloud Infrastructure][2], asegúrate de que los espacios de nombres mencionados anteriormente estén incluidos en tu [Connector Hub][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci_network_firewall" >}}


### Checks de servicio

OCI Network Firewall no incluye ningún check de servicio.

### Eventos

OCI Network Firewall no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.oracle.com/en-us/iaas/Content/network-firewall/metrics.htm
[2]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_network_firewall/metadata.csv
[5]: https://docs.datadoghq.com/es/help/