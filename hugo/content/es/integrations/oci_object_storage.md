---
app_id: oci-object-storage
app_uuid: 360a1cb0-ba5e-4913-9659-f56f08071fea
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.objectstorage.all_requests
      - oci.objectstorage.client_errors
      - oci.objectstorage.enabled_olm
      - oci.objectstorage.first_byte_latency
      - oci.objectstorage.object_count
      - oci.objectstorage.post_requests
      - oci.objectstorage.put_requests
      - oci.objectstorage.stored_bytes
      - oci.objectstorage.total_request_latency
      - oci.objectstorage.uncommitted_parts
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 39303208
    source_type_name: OCI Object Storage
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenes de datos
- nube
- oracle
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_object_storage
integration_id: oci-object-storage
integration_title: OCI Object Storage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_object_storage
public_title: OCI Object Storage
short_description: OCI Object Storage ofrece almacenamiento seguro y escalable para
  datos no estructurados, compatible con diversas aplicaciones en la nube.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Almacenes de datos
  - Categoría::Nube
  - Categoría::Oracle
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Configuración
  description: OCI Object Storage ofrece almacenamiento seguro y escalable para datos
    no estructurados, compatible con diversas aplicaciones en la nube.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: OCI Object Storage
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Oracle Cloud Infrastructure (OCI) Object Storage brinda almacenamiento escalable, duradero y de bajo coste para cualquier tipo de datos.

Esta integración te permite monitorizar y obtener alertas sobre la cantidad de almacenamiento que estás utilizando y la latencia de solicitud para tus buckets y objetos mediante la recopilación de métricas y etiquetas (tags) del espacio de nombres [oci_objectstorage][1].

## Configuración

### Instalación

Una vez configurada la integración de [Oracle Cloud Infrastructure][2], asegúrate de que los espacios de nombres mencionados anteriormente están incluidos en tu [Connector Hub][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci-object-storage" >}}


### Checks de servicios

OCI Object Storage no incluye checks de servicio.

### Eventos

OCI Object Storage no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].
[1]: https://docs.oracle.com/en-us/iaas/Content/Object/Reference/objectstoragemetrics.htm
[2]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_object_storage/metadata.csv
[5]: https://docs.datadoghq.com/es/help/