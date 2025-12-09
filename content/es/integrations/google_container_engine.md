---
app_id: google-container-engine
app_uuid: 46c7568e-d9e3-46de-ab24-a377d79c75fe
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: gcp.container.uptime
      metadata_path: metadata.csv
      prefix: gcp.container.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 190
    source_type_name: Google Container Engine
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- containers
- google cloud
- log collection
custom_kind: integración
dependencies: []
description: Monitoriza el uso de recursos de tus contenedores GCE.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_container_engine/
draft: false
git_integration_title: google_container_engine
has_logo: true
integration_id: google-container-engine
integration_title: Google Container Engine
integration_version: ""
is_public: true
manifest_version: "2.0.0"
name: google_container_engine
public_title: Google Container Engine
short_description: Google Contenedor Engine es un potente gestor de clúster y un sistema de orquestación para ejecutar tus contenedores Docker.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Contenedores
  - Category::Google Cloud
  - Category::Recopilación de logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Google Contenedor Engine es un potente gestor de clúster y un sistema de orquestación para ejecutar tus contenedores Docker.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Container Engine
version: "1.0"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

<div class="alert alert-danger">
Esta integración está obsoleta. En su lugar, consulta la <a href="https://docs.datadoghq.com/integrations/google_kubernetes_engine">documentación de la integración Google Kubernetes Engine</a>. Para obtener más información sobre métricas obsoletas, consulta la documentación de <a href="https://cloud.google.com/monitoring/api/metrics_gcp#gcp-container">métricas de Google Cloud</a>.
</div>

## Configuración

Esta integración está obsoleta.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_container_engine" >}}


### Eventos

La integración Google Container Engine no incluye eventos.

### Checks de servicios

La integración Google Container Engine no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][2].

[1]: https://github.com/DataDog/dogweb/blob/prod/integration/google_container_engine/google_container_engine_metadata.csv
[2]: https://docs.datadoghq.com/help/

