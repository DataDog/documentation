---
app_id: azure-applicationgateway
app_uuid: f797ba91-33c8-49e8-9316-159ca6c83764
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.network_applicationgateways.current_connections
      metadata_path: metadata.csv
      prefix: azure.network_applicationgateways
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 280
    source_type_name: Azure Application Gateway
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
git_integration_title: azure_application_gateway
integration_id: azure-applicationgateway
integration_title: Azure Application Gateway
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_application_gateway
public_title: Azure Application Gateway
short_description: Rastrea las métricas principales de Azure Application Gateway.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Categoría::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas principales de Azure Application Gateway.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Application Gateway
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Application Gateway es un equilibrador de carga de tráfico web que te permite gestionar el tráfico a tus aplicaciones web.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Application Gateway.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_application_gateway" >}}


### Eventos

La integración Azure Application Gateway no incluye ningún evento.

### Checks de servicio

La integración Azure Application Gateway no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_application_gateway/azure_application_gateway_metadata.csv
[3]: https://docs.datadoghq.com/es/help/