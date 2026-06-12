---
app_id: mongodb-atlas
app_uuid: d7f734da-a1f7-4e3f-a590-ea154018a8d8
assets:
  dashboards:
    MongoDB-Atlas-Overview: assets/dashboards/MongoDB-Atlas-Overview_dashboard.json
    MongoDB-Atlas-Vector-Search-Overview: assets/dashboards/MongoDB-Atlas-Vector-Search-Overview_dashboard.json
    MongoDB-dbStats-collStats-Dashboard: assets/dashboards/MongoDB-Atlas-dbStats-collStats_dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: mongodb.atlas.connections.current
      metadata_path: metadata.csv
      prefix: mongodb.atlas.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 230
    source_type_name: MongoDB Atlas
  monitors:
    CPU usage is higher than expected: assets/monitors/high_cpu.json
    Memory usage is higher than normal: assets/monitors/memory.json
    Query efficiency is degrading: assets/monitors/query_efficiency.json
    Read latency is higher than expected: assets/monitors/read_latency.json
    Write latency is higher than expected: assets/monitors/write_latency.json
author:
  homepage: https://www.mongodb.com
  name: MongoDB
  sales_email: field@mongodb.com
  support_email: frank.sun@mongodb.com
categories:
- ia/ml
- métricas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/mongodb_atlas/README.md
display_on_public_website: true
draft: false
git_integration_title: mongodb_atlas
integration_id: mongodb-atlas
integration_title: MongoDB Atlas
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: mongodb_atlas
public_title: MongoDB Atlas
short_description: Haz un seguimiento del rendimiento de lectura/escritura, de las
  métricas de búsqueda vectorial de Atlas y mucho más.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::IA/ML
  - Categoría::Métricas
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Haz un seguimiento del rendimiento de lectura/escritura, de las métricas
    de búsqueda vectorial de Atlas y mucho más.
  media:
  - caption: Dashboard de información general de MongoDB Atlas
    image_url: images/mongodb_atlas_dashboard.png
    media_type: imagen
  - caption: Dashboard de información general de búsqueda vectorial de MongoDB Atlas
    image_url: images/mongodb_atlas_vector_search_dashboard.png
    media_type: imagen
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-atlas-performance-metrics-with-datadog/
  - resource_type: otros
    url: https://www.mongodb.com/products/platform/atlas-for-government
  support: README.md#Soporte
  title: MongoDB Atlas
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Información general

MongoDB Atlas puede enviar métricas calculadas en Datadog a:

- Visualiza métricas clave de MongoDB Atlas.
- Visualiza métricas de búsqueda vectorial de MongoDB Atlas.
- Correlaciona el rendimiento general de MongoDB Atlas con el del resto de tus aplicaciones.

La integración incluye monitores y dashboards exclusivos predefinidos que te permiten ver el estado y el rendimiento de las métricas de Atlas. Puedes monitorizar métricas de rendimiento, realizar un seguimiento de la latencia media de las operaciones de lectura/escritura a lo largo del tiempo y crear monitores que te avisen cuando el número de conexiones actuales se aproxima al límite máximo.

Con las métricas de búsqueda vectorial de MongoDB Atlas también puedes utilizar con confianza la búsqueda vectorial MongoDB Atlas para indexar, recuperar y crear aplicaciones de IA generativa de alto rendimiento.

**Nota**: La integración MongoDB Atlas sólo está disponible en clústeres M10 o posteriores.

## Configuración

### Instalación

Puedes instalar la integración MongoDB Atlas iniciando sesión en tu portal Atlas.

### Configuración

1. Recupera o crea una [clave de API][1] Datadog.
2. En el [portal Atlas][2], introduce una clave de API Datadog en **Integraciones** -> **Parámetros de Datadog**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "mongodb_atlas" >}}


### Eventos

MongoDB Atlas puede enviar [alertas][4] a Datadog como eventos.

### Checks de servicio

La integración MongoDB Atlas no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorización de MongoDB Atlas con Datadog][6]
- [MongoDB Atlas para la Administración pública][7]

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://docs.atlas.mongodb.com/tutorial/monitoring-integrations/#procedure
[3]: https://github.com/DataDog/integrations-extras/blob/master/mongodb_atlas/metadata.csv
[4]: https://www.mongodb.com/docs/atlas/configure-alerts/#std-label-notification-options
[5]: https://docs.datadoghq.com/es/help/
[6]: https://www.datadoghq.com/blog/monitor-atlas-performance-metrics-with-datadog/
[7]: https://www.mongodb.com/products/platform/atlas-for-government