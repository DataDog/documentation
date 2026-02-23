---
app_id: google-cloud-anthos
app_uuid: ae7e2e76-77be-446b-a7e4-b341ba20473a
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: gcp.anthos.kube_node_status_capacity
      metadata_path: metadata.csv
      prefix: gcp.anthos.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 345
    source_type_name: Google Cloud Anthos
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- orquestación
- google cloud
- recopilación de logs
custom_kind: integración
dependencies: []
description: Recopila métricas y logs de clústeres de Anthos y analízalos en Datadog.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_anthos/
draft: false
git_integration_title: google_cloud_anthos
has_logo: true
integration_id: google-cloud-anthos
integration_title: Google Cloud Anthos
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_anthos
public_title: Google Cloud Anthos
short_description: Crea y ejecuta aplicaciones modernas a gran escala.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Category::Orchestration
  - Categoría::Google Cloud
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Crea y ejecuta aplicaciones modernas a gran escala.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Cloud Anthos
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Google Cloud Anthos es una plataforma de desarrollo de infraestructuras y aplicaciones que se aloja on-premises
y en varias nubes públicas con un plano de control respaldado por Google Cloud.

Utiliza la integración de Google Cloud Platform con Datadog para recopilar métricas de Google Cloud Anthos.

## Configuración

### Recopilación de métricas

#### Instalación

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google Cloud Anthos pueden recopilarse con Google Cloud Logging y enviarse a un trabajo de Dataflow a través de un tema de Cloud Pub/Sub. Si aún no lo hiciste, [configura la generación de logs con la plantilla de Dataflow de Datadog][2].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloud_anthos" >}}


### Eventos

La integración de Google Cloud Anthos no incluye eventos.

### Checks de servicio

La integración de Google Cloud Anthos no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://cloud.google.com/architecture/partners/monitoring-anthos-with-datadog#collecting_logs_with_stackdriver_logging
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_anthos/google_cloud_anthos_metadata.csv
[4]: https://docs.datadoghq.com/es/help/