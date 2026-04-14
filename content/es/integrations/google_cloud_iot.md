---
app_id: google-cloud-iot
app_uuid: 2300095b-84ca-465f-9d8e-79f3939be55b
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: gcp.cloudiot.device.active_devices
      metadata_path: metadata.csv
      prefix: gcp.cloudiot.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 270
    source_type_name: Google Cloud IoT
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- google cloud
- iot
- recopilación de logs
custom_kind: integración
dependencies: []
description: Realiza el seguimiento de las métricas clave de Google Cloud IoT.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_iot/
draft: false
git_integration_title: google_cloud_iot
has_logo: true
integration_id: google-cloud-iot
integration_title: Google Cloud IoT
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_iot
public_title: Google Cloud IoT
short_description: Conecta, gestiona e ingiere datos de forma fácil y segura desde
  millones de dispositivos dispersos por todo el mundo.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Google Cloud
  - Category::IoT
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Conecta, gestiona e ingiere datos de forma fácil y segura desde millones
    de dispositivos dispersos por todo el mundo.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Cloud IoT
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Cloud IoT es un servicio totalmente gestionado que permite conectar, gestionar e ingerir datos de forma fácil y segura desde millones de dispositivos dispersos por todo el mundo.

Utiliza la integración de Google Cloud Platform con Datadog para recopilar métricas de Google Cloud IoT.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google Cloud IoT se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Cloud IoT de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de Google Cloud IoT.
2. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloud_iot" >}}


### Eventos

La integración Google Cloud IoT no incluye eventos.

### Checks de servicios

La integración Google Cloud IoT no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_iot/google_cloud_iot_metadata.csv
[5]: https://docs.datadoghq.com/es/help/