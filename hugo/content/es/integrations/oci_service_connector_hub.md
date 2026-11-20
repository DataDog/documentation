---
app_id: oci-service-connector-hub
app_uuid: c7144268-2a76-4578-964d-5e59f7619d8d
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.service_connector_hub.bytes_read_from_source
      - oci.service_connector_hub.bytes_read_from_task
      - oci.service_connector_hub.bytes_written_to_target
      - oci.service_connector_hub.bytes_written_to_task
      - oci.service_connector_hub.data_freshness
      - oci.service_connector_hub.errors_at_source
      - oci.service_connector_hub.errors_at_target
      - oci.service_connector_hub.errors_at_task
      - oci.service_connector_hub.latency_at_source
      - oci.service_connector_hub.latency_at_target
      - oci.service_connector_hub.latency_at_task
      - oci.service_connector_hub.messages_read_from_source
      - oci.service_connector_hub.messages_read_from_task
      - oci.service_connector_hub.messages_written_to_target
      - oci.service_connector_hub.messages_written_to_task
      - oci.service_connector_hub.service_connector_hub_errors
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 39303353
    source_type_name: OCI Service Connector Hub
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
git_integration_title: oci_service_connector_hub
integration_id: oci-service-connector-hub
integration_title: OCI Service Connector Hub
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_service_connector_hub
public_title: OCI Service Connector Hub
short_description: OCI Service Connector Hub conecta y enruta los datos entre servicios
  de OCI, agilizando las operaciones en la nube.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Categoría::Nube
  - Categoría::Oracle
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Configuración
  description: OCI Service Connector Hub conecta y enruta los datos entre servicios
    de OCI, agilizando las operaciones en la nube.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: OCI Service Connector Hub
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Connector Hub ayuda a los ingenieros de la nube a gestionar y mover datos entre servicios de Oracle Cloud Infrastructure (OCI) y desde OCI a servicios de terceros.

Esta integración te permite monitorizar y alertar sobre el rendimiento, la latencia y los errores de tu Connector Hub recopilando métricas y etiquetas del espacio de nombres [oci_service_connector_hub][1].

## Configuración

### Instalación

Una vez configurada la integración de [Oracle Cloud Infrastructure][2], asegúrate de que los espacios de nombres mencionados anteriormente están incluidos en tu [Connector Hub][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci_service_connector_hub" >}}


### Checks de servicios

OCI Service Connector Hub no incluye ningún check de servicio.

### Eventos

OCI Service Connector Hub no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.oracle.com/en-us/iaas/Content/connector-hub/metrics-reference.htm
[2]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_service_connector_hub/metadata.csv
[5]: https://docs.datadoghq.com/es/help/