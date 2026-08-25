---
app_id: oci-media-streams
app_uuid: 69a676e9-750f-42bf-81a7-a1a2fdbf235d
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.mediastreams.egress_bytes
      - oci.mediastreams.request_count
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 42264479
    source_type_name: OCI Media Streams
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
git_integration_title: oci_media_streams
integration_id: oci-media-streams
integration_title: OCI Media Streams
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_media_streams
public_title: OCI Media Streams
short_description: OCI Media Streams permite la transmisión en tiempo real de vídeo
  con baja latencia, lo que admite la distribución de contenidos en directo y a petición.
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
  description: OCI Media Streams permite la transmisión en tiempo real de vídeo con
    baja latencia, lo que admite la distribución de contenidos en directo y a petición.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI Media Streams
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

OCI Media Streams es un servicio totalmente gestionado que permite entregar a los espectadores contenidos digitales de vídeo en formatos como HTTP Live Streaming (HLS). Admite streaming en directo y a petición, lo que permite una integración perfecta con redes de distribución de contenidos para una distribución escalable. 


Esta integración te permite monitorizar tu rendimiento de streaming de medios mediante la recopilación de métricas y etiquetas (tags) del espacio de nombres [oci_mediastreams][1].

## Configuración

### Instalación

Una vez configurada la integración de [Oracle Cloud Infrastructure][2], asegúrate de que los espacios de nombres mencionados anteriormente estén incluidos en tu [Connector Hub][3].


## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci_media_streams" >}}



### Checks de servicio

OCI Media Streams no incluye ningún check de servicio.

### Eventos

OCI Media Streams no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.oracle.com/en-us/iaas/Content/dms-mediastream/mediastreams_metrics.htm?
[2]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_media_streams/metadata.csv
[5]: https://docs.datadoghq.com/es/help/