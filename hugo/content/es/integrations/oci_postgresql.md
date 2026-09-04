---
app_id: oci-postgresql
app_uuid: e6818b1a-f3a1-4c53-836f-8173c304c497
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.postgresql.buffer_cache_hit_ratio
      - oci.postgresql.connections
      - oci.postgresql.cpu_utilization
      - oci.postgresql.deadlocks
      - oci.postgresql.memory_utilization
      - oci.postgresql.read_iops
      - oci.postgresql.read_latency
      - oci.postgresql.read_throughput
      - oci.postgresql.used_storage
      - oci.postgresql.write_iops
      - oci.postgresql.write_latency
      - oci.postgresql.write_throughput
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 42264644
    source_type_name: OCI PostgreSql
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
- almacenes de datos
- nube
- oracle
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_postgresql
integration_id: oci-postgresql
integration_title: OCI PostgreSql
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_postgresql
public_title: OCI PostgreSql
short_description: OCI PostgreSQL ofrece una base de datos PostgreSQL totalmente gestionada
  para una gestión de datos fiable y segura.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Data Stores
  - Category::Cloud
  - Category::Oracle
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI PostgreSQL ofrece una base de datos PostgreSQL totalmente gestionada
    para una gestión de datos fiable y segura.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI PostgreSql
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general
OCI PostgreSQL es un servicio de base de datos PostgreSQL totalmente gestionado, escalable que garantiza una gestión de datos fiable y segura. Ofrece copias de seguridad, parches y escalado automatizados, lo que te permite centrarte en el desarrollo de aplicaciones sin la sobrecarga del mantenimiento de bases de datos.

Esta integración te permite monitorizar el estado, la capacidad y el rendimiento de tu base de datos mediante la recopilación de métricas y etiquetas (tags) del espacio de nombres de [oci_postgresql][1].

## Configuración

### Instalación

Una vez configurada la integración de [Oracle Cloud Infrastructure][2], asegúrate de que los espacios de nombres mencionados anteriormente estén incluidos en tu [Connector Hub][3].


## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci-postgresql" >}}


### Checks de servicio

OCI PostgreSql no incluye ningún check de servicio.

### Eventos

OCI PostgreSql no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [soporte de Datadog][5]

[1]: https://docs.oracle.com/en-us/iaas/Content/postgresql/metrics.htm
[2]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_postgresql/metadata.csv
[5]: https://docs.datadoghq.com/es/help/
