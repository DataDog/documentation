---
app_id: oci-queue
app_uuid: d17dfabb-5838-487d-89f0-6324c5246cf5
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.queue.consumer_lag
      - oci.queue.messages_count
      - oci.queue.messages_in_queue_count
      - oci.queue.queue_size
      - oci.queue.request_success
      - oci.queue.requests_latency
      - oci.queue.requests_throughput
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 39303336
    source_type_name: OCI Queue
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- colas de mensajes
- nube
- oracle
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_queue
integration_id: oci-queue
integration_title: OCI Queue
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_queue
public_title: OCI Queue
short_description: OCI Queue proporciona una servicio de cola totalmente gestionado
  que permite una comunicación escalable y desacoplada entre aplicaciones.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Message Queues
  - Categoría::Nube
  - Categoría::Oracle
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Configuración
  description: OCI Queue proporciona una servicio de cola totalmente gestionado que
    permite una comunicación escalable y desacoplada entre aplicaciones.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: OCI Queue
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Oracle Cloud Infrastructure (OCI) Queue es un servicio para permitir la comunicación asíncrona (desacoplada) de una manera serverless.

Esta integración recopila métricas del espacio de nombres [oci_queue][1] para monitorizar y alertar sobre la salud y el tamaño de tus colas.

## Configuración

### Instalación

Después de configurar la integración de [Oracle Cloud Infrastructure][2], comprueba que cualquier espacio de nombres mencionado anteriormente está incluido en tu [Connector Hub][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci_queue" >}}


### Checks de servicios

OCI Queue no incluye checks de servicios.

### Eventos

OCI Queue no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.oracle.com/en-us/iaas/Content/queue/metrics.htm
[2]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_queue/metadata.csv
[5]: https://docs.datadoghq.com/es/help/