---
app_id: google-cloud-filestore
app_uuid: 3bc2c185-ddc3-4ba7-be31-22e926a6834c
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: gcp.file.nfs.server.free_bytes
      metadata_path: metadata.csv
      prefix: gcp.file.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 267
    source_type_name: Google Cloud Filestore
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
custom_kind: integración
dependencies: []
description: Realiza el seguimiento de las métricas clave de Google Cloud Filestore.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_filestore/
draft: false
git_integration_title: google_cloud_filestore
has_logo: true
integration_id: google-cloud-filestore
integration_title: Google Cloud Filestore
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_filestore
public_title: Google Cloud Filestore
short_description: Un servicio gestionado que proporciona un sistema de archivos compartido
  para aplicaciones que requieren una interfaz de sistema de archivos.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Almacenes de datos
  - Categoría::Google Cloud
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Un servicio gestionado que proporciona un sistema de archivos compartido
    para aplicaciones que requieren una interfaz de sistema de archivos.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Cloud Filestore
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Google Cloud Filestore es un servicio gestionado de almacenamiento de archivos para aplicaciones que requieren una interfaz de sistema de archivos y un sistema de archivos compartido para los datos.

Utiliza la integración Google Cloud Platform en Datadog para recopilar métricas de Google Cloud Filestore.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google Cloud Filestore se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Cloud Filestore de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de Google Cloud Filestore.
2. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloud_filestore" >}}


### Eventos

La integración Google Cloud Filestore no incluye eventos.

### Checks de servicios

La integración Google Cloud Filestore no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_file/google_cloud_filestore_metadata.csv
[5]: https://docs.datadoghq.com/es/help/