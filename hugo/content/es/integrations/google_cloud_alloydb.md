---
app_id: google-cloud-alloydb
app_uuid: aa103fc1-cc2c-4996-a250-d77061a57291
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: gcp.alloydb.cluster.storage.usage
      metadata_path: metadata.csv
      prefix: gcp.alloydb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 356
    source_type_name: Google Cloud AlloyDB
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
description: Realiza un seguimiento del recuento de consultas, tiempos de ejecución,
  bytes cargados y más.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_alloydb/
draft: false
git_integration_title: google_cloud_alloydb
has_logo: true
integration_id: google-cloud-alloydb
integration_title: Google Cloud AlloyDB
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_alloydb
public_title: Google Cloud AlloyDB
short_description: AlloyDB es una base de datos compatible con PostgreSQL totalmente
  gestionada para cargas de trabajo transaccionales exigentes.
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
  description: AlloyDB es una base de datos compatible con PostgreSQL totalmente gestionada
    para cargas de trabajo transaccionales exigentes.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Cloud AlloyDB
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

AlloyDB es una base de datos compatible con PostgreSQL totalmente gestionada para cargas de trabajo transaccionales exigentes. 
Ofrece un rendimiento y una disponibilidad de nivel empresarial al tiempo que mantiene una compatibilidad del 100 % con PostgreSQL de código abierto.

Obtén métricas de Google AlloyDB para:

- Visualizar el rendimiento de tus clústeres de AlloyDB.
- Correlacionar el rendimiento de tus instancias de AlloyDB con tus bases de datos.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google AlloyDB se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Pub/Sub de Cloud. Si aún no lo has hecho, [configura el registro con la plantilla de Datadog Dataflow][2].

Una vez hecho esto, exporta tus logs de Google AlloyDB desde Google Cloud Logging al tema Pub/Sub:

1. Accede a la página [Google Cloud Logging][3] y filtra los logs de Google AlloyDB.
2. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{&lt; get-metrics-from-git "google_cloud_alloydb" &gt;}}


### Eventos

La integración de Google AlloyDB no incluye ningún evento.

### Checks de servicios

La integración de Google AlloyDB no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_alloydb/google_cloud_alloydb_metadata.csv
[5]: https://docs.datadoghq.com/es/help/