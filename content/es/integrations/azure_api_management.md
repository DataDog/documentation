---
app_id: azure-apimanagement
app_uuid: 122539f9-dc11-4099-9d64-cbd6f50159a5
assets:
  dashboards:
    azure_api_management: assets/dashboards/azure_api_management.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.apimanagement_service.capacity
      metadata_path: metadata.csv
      prefix: azure.apimanagement_service
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 277
    source_type_name: Azure API Management
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- azure
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_api_management
integration_id: azure-apimanagement
integration_title: Azure API Management
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_api_management
public_title: Azure API Management
short_description: Rastrea las métricas principales de Azure API Management.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Azure
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Rastrea las métricas principales de Azure API Management.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Azure API Management
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure API Management es un servicio totalmente gestionado que permite a los clientes publicar, proteger, transformar, mantener y monitorizar las API.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure API Management.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_api_management" >}}


### Eventos

La integración Azure API Management no incluye ningún evento.

### Checks de servicio

La integración Azure API Management no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_api_management/azure_api_management_metadata.csv
[3]: https://docs.datadoghq.com/es/help/