---
app_id: google-cloud-firestore
app_uuid: 16876032-6aa7-44a6-bc39-4c6d9a7f90c7
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: gcp.firestore.document.write_count
      metadata_path: metadata.csv
      prefix: gcp.firestore.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 268
    source_type_name: Google Cloud Firestore
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- almacenes de datos
- google cloud
- recopilación de logs
- mobile
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_cloud_firestore
integration_id: google-cloud-firestore
integration_title: Google Cloud Firestore
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_firestore
public_title: Google Cloud Firestore
short_description: Una base de datos flexible y escalable para el desarrollo móvil,
  web y de servidor de Firebase y Google Cloud.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Almacenes de datos
  - Categoría::Google Cloud
  - Category::Log Collection
  - Category::Mobile
  - Offering::Integration
  configuration: README.md#Setup
  description: Una base de datos flexible y escalable para el desarrollo móvil, web
    y de servidor de Firebase y Google Cloud.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Cloud Firestore
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Google Cloud Firestore es una base de datos flexible y escalable para el desarrollo móvil, web y de servidor de Firebase y Google Cloud Platform.

Utiliza la integración Google Cloud Platform en Datadog para recopilar métricas de Google Cloud Firestore.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google Cloud Firestore se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Cloud Firestore de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de Google Cloud Firestore.
2. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloud_firestore" >}}


### Eventos

La integración Google Cloud Firestore no incluye eventos.

### Checks de servicio

La integración Google Cloud Firestore no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_firestore/google_cloud_firestore_metadata.csv
[5]: https://docs.datadoghq.com/es/help/