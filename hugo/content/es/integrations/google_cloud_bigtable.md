---
app_id: google-cloud-bigtable
app_uuid: 6450fe6b-bd5b-4957-9974-3e2615ff0d19
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: gcp.bigtable.cluster.cpu_load
      metadata_path: metadata.csv
      prefix: gcp.bigtable.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 263
    source_type_name: Google Cloud Bigtable
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- google cloud
- almacenes de datos
- recopilación de logs
custom_kind: integración
dependencies: []
description: Realiza el seguimiento de las métricas de Google Bigtable.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_bigtable/
draft: false
git_integration_title: google_cloud_bigtable
has_logo: true
integration_id: google-cloud-bigtable
integration_title: Google Cloud Bigtable
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_bigtable
public_title: Google Cloud Bigtable
short_description: El servicio de la base de datos de Big Data NoSQL de Google, que
  alimenta los principales servicios de Google como Buscar, Análisis, Mapas y Gmail.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Google Cloud
  - Categoría::Almacenes de datos
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: El servicio de la base de datos de Big Data NoSQL de Google, que alimenta
    los principales servicios de Google como Buscar, Análisis, Mapas y Gmail.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Cloud Bigtable
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Bigtable es el servicio de base de datos de grandes datos NoSQL de Google. Es la misma base de datos que alimenta muchos de los principales servicios de Google como Buscadores, Analytics, Maps y Gmail.

Utiliza la integración de Google Cloud Platform con Datadog para recopilar métricas de Google Bigtable.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google Bigtable se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Bigtable desde Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de Google Bigtable.
2. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloud_bigtable" >}}


### Eventos

La integración Google Bigtable no incluye eventos.

### Checks de servicios

La integración Google Bigtable no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_bigtable/google_cloud_bigtable_metadata.csv
[5]: https://docs.datadoghq.com/es/help/