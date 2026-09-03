---
app_id: google-cloud-interconnect
app_uuid: c71c0d27-7a32-488b-8df2-7d242407c0b7
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: gcp.interconnect.network.attachment.capacity
      metadata_path: metadata.csv
      prefix: gcp.interconnect.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 269
    source_type_name: Google Cloud Interconnect
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- google cloud
- recopilación de logs
- la red
custom_kind: integración
dependencies: []
description: Realiza el seguimiento de las métricas clave de Google Cloud Interconnect.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_interconnect/
draft: false
git_integration_title: google_cloud_interconnect
has_logo: true
integration_id: google-cloud-interconnect
integration_title: Google Cloud Interconnect
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_interconnect
public_title: Google Cloud Interconnect
short_description: Extiende tu red on-premises a la red de Google a través de una
  connection (conexión) de alta disponibilidad y baja latencia.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Google Cloud
  - Category::Log Collection
  - Category::Network
  - Offering::Integration
  configuration: README.md#Setup
  description: Extiende tu red on-premises a la red de Google a través de una connection
    (conexión) de alta disponibilidad y baja latencia.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Cloud Interconnect
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Google Cloud Interconnect amplía tu red on-premises a red de Google a través de una conexión de alta disponibilidad y baja latencia.

Utiliza la integración Google Cloud Platform en Datadog para recopilar métricas de Google Cloud Interconnect.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google Cloud Interconnect se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Cloud Interconnect de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de Google Cloud Interconnect.
2. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloud_interconnect" >}}


### Eventos

La integración Google Cloud Interconnect no incluye eventos.

### Checks de servicios

La integración Google Cloud Interconnect no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_interconnect/google_cloud_interconnect_metadata.csv
[5]: https://docs.datadoghq.com/es/help/