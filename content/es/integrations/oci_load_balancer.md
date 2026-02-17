---
app_id: oci-load-balancer
app_uuid: 4a90a892-952b-4b20-8152-c2d53da59a7d
assets:
  dashboards:
    OCI-Load-Balancer-Overview: assets/dashboards/oci-load-balancer-overview-dashboard.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.lbaas.accepted_connections
      - oci.lbaas.accepted_sslhandshake
      - oci.lbaas.active_connections
      - oci.lbaas.active_sslconnections
      - oci.lbaas.backend_servers
      - oci.lbaas.backend_timeouts
      - oci.lbaas.bytes_received
      - oci.lbaas.bytes_sent
      - oci.lbaas.closed_connections
      - oci.lbaas.failed_sslclient_cert_verify
      - oci.lbaas.failed_sslhandshake
      - oci.lbaas.handled_connections
      - oci.lbaas.http_requests
      - oci.lbaas.http_responses
      - oci.lbaas.http_responses_200
      - oci.lbaas.http_responses_2xx
      - oci.lbaas.http_responses_3xx
      - oci.lbaas.http_responses_4xx
      - oci.lbaas.http_responses_502
      - oci.lbaas.http_responses_504
      - oci.lbaas.http_responses_5xx
      - oci.lbaas.http_responses_200
      - oci.lbaas.http_responses_2xx
      - oci.lbaas.http_responses_3xx
      - oci.lbaas.http_responses_4xx
      - oci.lbaas.http_responses_502
      - oci.lbaas.http_responses_504
      - oci.lbaas.http_responses_5xx
      - oci.lbaas.invalid_header_responses
      - oci.lbaas.keep_alive_connections
      - oci.lbaas.peak_bandwidth
      - oci.lbaas.response_time_first_byte
      - oci.lbaas.response_time_http_header
      - oci.lbaas.unhealthy_backend_servers
      - oci.nlb.active_connections
      - oci.nlb.egress_packets_dropped_by_sl
      - oci.nlb.healthy_backends_per_nlb
      - oci.nlb.ingress_packets_dropped_by_sl
      - oci.nlb.nlbvtap_fwd_drops
      - oci.nlb.nlbvtap_received_bytes
      - oci.nlb.nlbvtap_received_packets
      - oci.nlb.nlbvtap_transmitted_bytes
      - oci.nlb.nlbvtap_transmitted_packets
      - oci.nlb.new_connections
      - oci.nlb.new_connections_tcp
      - oci.nlb.new_connections_udp
      - oci.nlb.processed_bytes
      - oci.nlb.processed_packets
      - oci.nlb.unhealthy_backends_per_nlb
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 24434732
    source_type_name: Balanceador de carga OCI
  monitors:
    A Load Balancer is experiencing an abnormally high error rate: assets/monitors/high-error-volume.json
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
git_integration_title: oci_load_balancer
integration_id: oci-load-balancer
integration_title: Balanceador de carga de OCI
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_load_balancer
public_title: Balanceador de carga de OCI
short_description: El balanceador de carga de OCI distribuye el tráfico entrante a
  través de múltiples instancias de computación para ofrecer una alta fiabilidad y
  disponibilidad.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Red
  - Categoría::Nube
  - Categoría::Oracle
  - Categoría::Métricas
  - Oferta::Integración
  configuration: README.md#Configuración
  description: El balanceador de carga de OCI distribuye el tráfico entrante a través
    de múltiples instancias de computación para ofrecer una alta fiabilidad y disponibilidad.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Balanceador de carga de OCI
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

El balanceador de carga flexible de Oracle Cloud infraestructura (OCI) es un servicio nativo de la nube diseñado para distribuir conexiones de aplicaciones a través de múltiples recursos de computación para mejorar la resistencia y el rendimiento.

Esta integración te permite monitorizar y generar alertas sobre el rendimiento, el desempeño y el estado de los servicios de tu balanceador de carga mediante la recopilación de métricas y etiquetas (tags) de los espacios de nombres [`oci_lbaas`][1] y [`oci_nlb`][2].

## Configuración

### Instalación

Después de configurar la integración [Oracle Cloud Infrastructure][3], asegúrate de que los espacios de nombres `oci_lbaas` y `oci_nlb` están incluidos en tu [Connector Hub][4].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci-load-balancer" >}}


### Eventos

La integración de la base de datos OCI no incluye eventos.

### Checks de servicio

La integración de la base de datos OCI no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].


[1]: https://docs.oracle.com/en-us/iaas/Content/Balance/Reference/loadbalancermetrics.htm
[2]: https://docs.oracle.com/en-us/iaas/Content/NetworkLoadBalancer/Metrics/metrics.htm
[3]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[4]: https://cloud.oracle.com/connector-hub/service-connectors
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_load_balancer/metadata.csv
[6]: https://docs.datadoghq.com/es/help/