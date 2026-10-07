---
app_id: azure-containerservice
app_uuid: 6146f70c-cb70-419e-afbc-318b79b70864
assets:
  dashboards:
    azure_container_service: assets/dashboards/azure_container_service.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.containerservice_managedclusters.kube_pod_status_ready
      metadata_path: metadata.csv
      prefix: azure.containerservice_managedclusters
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 284
    source_type_name: Azure Container Service
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- rastreo
- azure
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_containerservice
integration_id: azure-containerservice
integration_title: Azure Container Service
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_containerservice
public_title: Azure Container Service
short_description: Rastrea las métricas clave de Azure Container Service.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Categoría::Contenedores
  - Categoría::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas clave de Azure Container Service.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Container Service
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Kubernetes Service te permite implementar rápidamente un clúster de Kubernetes listo para la producción.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Kubernetes Service.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_containerservice" >}}


### Eventos

La integración Azure Kubernetes Service no incluye eventos.

### Checks de servicio

La integración Azure Kubernetes Service no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_service/azure_container_service_metadata.csv
[3]: https://docs.datadoghq.com/es/help/