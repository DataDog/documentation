---
app_id: google-cloud-redis
app_uuid: 7ced78ef-948d-475d-9a3d-2a5c2f4e52c2
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: gcp.redis.clients.connected
      metadata_path: metadata.csv
      prefix: gcp.redis.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 272
    source_type_name: Google Cloud Redis
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
description: Realiza el seguimiento de las métricas clave de Google Cloud Memorystore.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_redis/
draft: false
git_integration_title: google_cloud_redis
has_logo: true
integration_id: google-cloud-redis
integration_title: Google Cloud Redis
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_redis
public_title: Google Cloud Redis
short_description: Un servicio de almacén de datos en memoria gestionado en infraestructura
  escalable, seguro y de alta disponibilidad.
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
  description: Un servicio de almacén de datos en memoria gestionado en infraestructura
    escalable, seguro y de alta disponibilidad.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Cloud Redis
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Google Cloud Memorystore para Redis proporciona un servicio de almacén de datos en memoria totalmente gestionado construido sobre una infraestructura escalable, segura y de alta disponibilidad.

Utiliza la integración Google Cloud Platform en Datadog para recopilar métricas de Google Cloud Memorystore para Redis.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google Cloud Memorystore para Redis se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Cloud Memorystore para Redis de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de Google Cloud Memorystore para Redis.
2. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloud_redis" >}}


### Eventos

La integración Google Cloud Memorystore para Redis no incluye eventos.

### Checks de servicios

La integración Google Cloud Memorystore para Redis no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_redis/google_cloud_redis_metadata.csv
[5]: https://docs.datadoghq.com/es/help/