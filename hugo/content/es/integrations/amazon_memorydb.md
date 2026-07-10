---
app_id: amazon-memorydb
app_uuid: 1e1fabb3-32b3-4d8e-866d-79b8d09207e7
assets:
  dashboards:
    amazon-memorydb: assets/dashboards/amazon_memorydb_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.memorydb.cpuutilization
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.memorydb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10425
    source_type_name: Amazon MemoryDB
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- nube
- métricas
- almacenes de datos
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_memorydb
integration_id: amazon-memorydb
integration_title: Amazon MemoryDB
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_memorydb
public_title: Amazon MemoryDB
short_description: Amazon MemoryDB es un servicio de base de datos en memoria compatible
  con Redis totalmente administrado.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Cloud
  - Category::Metrics
  - Category::Data Stores
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Amazon MemoryDB es un servicio de base de datos en memoria compatible
    con Redis totalmente administrado.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/amazon-memorydb-integration/
  support: README.md#Support
  title: Amazon MemoryDB
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Amazon MemoryDB para Redis es un servicio de base de datos duradera en memoria que ofrece rendimiento en memoria y durabilidad en varias zonas de disponibilidad.

Habilita esta integración para ver todas tus métricas de MemoryDB en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `MemoryDB` se encuentre habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon MemoryDB][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon-memorydb" >}}


### Eventos

La integración de Amazon MemoryDB no incluye ningún evento.

### Checks de servicio

La integración de Amazon MemoryDB no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorizar Amazon MemoryDB con Datadog][6]

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-memorydb
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_memorydb/assets/metrics/metric-spec.yaml
[5]: https://docs.datadoghq.com/es/help/
[6]: https://www.datadoghq.com/blog/amazon-memorydb-integration/