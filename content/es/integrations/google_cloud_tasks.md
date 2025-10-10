---
app_id: google-cloud-tasks
app_uuid: 8da251a0-4cbd-490b-93cf-cea5c73d6135
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: gcp.cloudtasks.api.request_count
      metadata_path: metadata.csv
      prefix: gcp.cloudtasks.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 274
    source_type_name: Google Cloud Tasks
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- google cloud
- recopilación de logs
custom_kind: integración
dependencies: []
description: Realiza el seguimiento de las métricas clave de Google Cloud Tasks.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_tasks/
draft: false
git_integration_title: google_cloud_tasks
has_logo: true
integration_id: google-cloud-tasks
integration_title: Google Cloud Tasks
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_tasks
public_title: Google Cloud Tasks
short_description: Un servicio gestionado para gestionar la ejecución, el envío y
  la entrega de un gran número de tareas distribuidas.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Google Cloud
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Configuración
  description: Un servicio gestionado para gestionar la ejecución, el envío y la entrega
    de un gran número de tareas distribuidas.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Google Cloud Tasks
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Google Cloud Tasks es un servicio totalmente gestionado que permite administrar la ejecución, el envío y la entrega de un gran número de tareas distribuidas.

Utiliza la integración de Google Cloud Platform con Datadog para recopilar métricas de Google Cloud Tasks.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google Cloud Tasks se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Cloud Tasks de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de Google Cloud Tasks.
2. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloud_tasks" >}}


### Eventos

La integración Google Cloud Tasks no incluye eventos.

### Checks de servicios

La integración Google Cloud Tasks no checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_tasks/google_cloud_tasks_metadata.csv
[5]: https://docs.datadoghq.com/es/help/