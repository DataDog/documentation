---
app_id: oci-fastconnect
app_uuid: 24bb3f3f-03f6-4733-9f01-34838e3eed72
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.fastconnect.bits_received
      - oci.fastconnect.bits_sent
      - oci.fastconnect.bytes_received
      - oci.fastconnect.bytes_sent
      - oci.fastconnect.connection_state
      - oci.fastconnect.ipv_4bgp_session_state
      - oci.fastconnect.ipv_6bgp_session_state
      - oci.fastconnect.packets_discarded
      - oci.fastconnect.packets_error
      - oci.fastconnect.packets_received
      - oci.fastconnect.packets_sent
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 39303293
    source_type_name: OCI FastConnect
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
git_integration_title: oci_fastconnect
integration_id: oci-fastconnect
integration_title: OCI FastConnect
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_fastconnect
public_title: OCI FastConnect
short_description: OCI FastConnect ofrece una conexión dedicada y privada entre tu
  red local y Oracle Cloud.
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
  description: OCI FastConnect ofrece una conexión dedicada y privada entre tu red
    local y Oracle Cloud.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: OCI FastConnect
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Oracle Cloud Infrastructure (OCI) FastConnect es una conexión dedicada y privada entre OCI y tu entorno. 

Esta integración te permite monitorizar y obtener alertas sobre el estado, la capacidad y el rendimiento de tu conexión FastConnect mediante la recopilación de métricas y etiquetas (tags) del espacio de nombres [oci_fastconnect][1].

## Configuración

### Instalación

Una vez configurada la integración de [Oracle Cloud Infrastructure][2], asegúrate de que los espacios de nombres mencionados anteriormente están incluidos en tu [Connector Hub][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci-fastconnect" >}}


### Checks de servicios

OCI FastConnect no incluye checks de servicio.

### Eventos

OCI FastConnect no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].
[1]: https://docs.oracle.com/en-us/iaas/Content/Network/Reference/fastconnectmetrics.htm
[2]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_fastconnect/metadata.csv
[5]: https://docs.datadoghq.com/es/help/